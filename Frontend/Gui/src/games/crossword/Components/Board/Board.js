import { View, FlatList, Keyboard, BackHandler, TextInput } from "react-native";

import React, { Component } from "react";
import { boardStyle } from "../../CrosswordStyles";
import Cell from "../Cell";
import { BoardHandler } from "./boardHandler";
import { COLORS } from "../../../../constants/colors";
import { LANGUAGE } from "../../../../constants/languageRegex";
import { CellState } from "../Cell/cellStates";
import { SocketContext } from "../../../../contexts/SocketContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_KEY, SESSION_ID } from "../../../../constants/keys";
const playersColors = [
  COLORS.white,
  COLORS.green,
  COLORS.pink,
  COLORS.grey,
  COLORS.lightBrown,
];

/**
 * This class component handle the Board rendering for Crossword game.
 */
export default class Board extends Component {
  constructor(props) {
    super(props);
    const boardDescription = props.boardDescription;
    const boardHandler = new BoardHandler(
      boardDescription,
      props.setClue,
      () => {
        this.updateWordColoring();
      }
    );
    this.clientPlayerIndex = props.clientPlayerIndex;
    let flattedBoard = boardHandler.board.flat();
    this.state = {
      boardHandler: boardHandler,
      isKeyboardHidden: true,
      flattedBoard: flattedBoard, // For rendering
    };
  }

  initSocketListener() {
    this.socket.on("Update move", async (move_description, s_id) => {
      let { type, body } = move_description;
      if (type === "move") {
        this.applyMove(body);
      }
    });
  }

  applyMove(moveBody) {
    let { letter, position, index, player } = moveBody;
    let cellPosition = this.state.boardHandler.getWord(position - 1);
    cellPosition = cellPosition.positions[index];
    let cell = this.state.boardHandler.getCell(cellPosition);
    this.setCellValue(cell, letter);
  }

  /**
   * Used to prevent back button on Android from changing screens.
   */
  handleBackButton() {
    return true;
  }

  componentDidMount() {
    this.socket = this.context;

    AsyncStorage.getItem(USER_KEY).then((item) => {
      this.setState({ player: JSON.parse(item) });
    });
    AsyncStorage.getItem(SESSION_ID).then((item) => {
      this.setState({ sessionId: item });
      this.state.boardHandler.setSessionId(item);
    });

    this.state.boardHandler.setSocket(this.socket);
    this.state.boardHandler.setPlayerIndex(this.clientPlayerIndex);
    this.initSocketListener();

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);

    this.keyboardDidShowSubscription = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        this.setState({ isKeyboardHidden: false });
      }
    );

    this.keyboardDidHideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        this.setState({ isKeyboardHidden: true });
      }
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton); // Remove keyboard
    this.keyboardDidShowSubscription.remove();
    this.keyboardDidHideSubscription.remove();

    this.socket.off("Update move");
  }

  getCell(position) {
    return this.state.boardHandler.getCell(position);
  }

  setCellValue = (cell, value) => {
    cell.setCellValue(value);
  };

  /**
   * Update the color of given cell to given color.
   * @param {Cell} cell
   * @param {*} color
   */
  paintCell(cell, color) {
    // No need to repaint if cell is already in the given color.
    if (color !== cell.color) {
      cell.setColor(color);
    }
  }

  setCellFocusState(cell, isFocus) {
    cell.setCellFocus(isFocus);
  }

  ComponentDidUpdate() {
    this.updateWordColoring();
  }

  /*
     Handle user press on a cell.
  */
  cellPressed(position) {
    let cell = this.getCell(position);
    let prevCell;
    if (this.state.boardHandler.isCellFocused()) {
      prevCell = this.state.boardHandler.getFocusedCell();
    }

    cell.state === CellState.ACTIVE
      ? this.handleActiveCellPress(cell)
      : this.handleInactiveCellPress();

    // Remove focus from previous cell if needed.
    if (prevCell) {
      this.setCellFocusState(prevCell, false);
    }

    // If there is a new focused cell- focus the Cell component.
    if (this.state.boardHandler.isCellFocused()) {
      let newCell = this.state.boardHandler.getFocusedCell();
      this.setCellFocusState(newCell, true);
    }
  }

  handleActiveCellPress(cell) {
    if (this.state.isKeyboardHidden) {
      Keyboard.dismiss(); // Keyboard need to be locally dismissed if It was hidden by OS(pressing back button on Android).
    }
    this.textInput.focus(); // Make sure that keyboard focus is maintained.
    this.state.boardHandler.handleWordChange(cell);
  }

  handleInactiveCellPress() {
    Keyboard.dismiss();
    this.state.boardHandler.handleFocusedWordFreeing();
  }

  onKeyboardInput(input) {
    if (
      LANGUAGE.ENGLISH.test(input) &&
      this.state.boardHandler.isCellFocused()
    ) {
      let { position, index } =
        this.state.boardHandler.getFocusedPositionAndIndex();

      let currentCell = this.state.boardHandler.getFocusedCell();
      this.setCellValue(currentCell, input);
      this.state.boardHandler.advanceFocusedWordIndex();
      let nextCell = this.state.boardHandler.getFocusedCell();
      this.setCellFocusState(currentCell, false);
      this.setCellFocusState(nextCell, true);

      this.socket.emit("update_move", "Crossword", this.state.sessionId, {
        type: "move",
        body: {
          letter: input,
          position: position + 1,
          index: index,
          player: this.clientPlayerIndex,
        },
      });
    }

    this.textInput.setNativeProps({ text: "" });
  }

  /**
   * Change the color of each cell in given word to given color.
   */
  colorWord(wordDescription, color) {
    wordDescription.positions.forEach((position) => {
      let cell = this.getCell(position);
      this.paintCell(cell, color);
    });
  }

  /**
   * Paint all the words on the board based on their current state
   */
  updateWordColoring() {
    let occupiedWords = [];
    this.state.boardHandler.words.forEach((wordDescription) => {
      let wordIndex = this.state.boardHandler.getWordIndex(wordDescription);
      if (this.state.boardHandler.isWordFree(wordIndex)) {
        // Paint unoccupied words first.
        this.colorWord(wordDescription, playersColors[0]);
      } else {
        occupiedWords.push(wordDescription);
      }
    });

    occupiedWords.forEach((wordDescription) => {
      this.colorWord(wordDescription, playersColors[wordDescription.state]);
    });
  }

  keyExtractor(cell) {
    return `${cell.row}-${cell.column}`;
  }
  getItemLayout = (data, index) => {
    let rows = this.state.boardHandler.getRowCount() * 4;
    return {
      length: rows,
      offset: rows * index,
      index,
    };
  };

  renderCell = (renderObject) => {
    const cell = renderObject.item;
    return (
      <Cell
        cellInfo={cell}
        isFocused={cell.isFocused}
        value={cell.value}
        onPress={() => this.cellPressed([cell.row, cell.column])}
      />
    );
  };

  /**
   * Workaround to listen and control the keyboard- creating an invisible TextInput and using
   * it's onChangeText event.
   * @returns
   */
  InvisibleKeyboard = () => {
    return (
      <TextInput // Invisible textInput to control Android keyboard.
        blurOnSubmit={false}
        autoFocus={true} // Get keyboard to show automatically on start(for Android).
        style={{ height: 0, width: 0, flex: 0 }} // Invisible.
        onChangeText={(text) => {
          this.onKeyboardInput(text);
        }}
        ref={(ref) => {
          this.textInput = ref;
        }}
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={1} // One letter per cell.
      />
    );
  };

  render() {
    this.clientPlayerIndex = this.props.clientPlayerIndex;
    this.state.boardHandler.setPlayerIndex(this.clientPlayerIndex);
    return (
      <View style={{ flex: 1 }}>
        <this.InvisibleKeyboard />
        <FlatList
          className="Board"
          style={boardStyle.board}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          scrollEnabled={true}
          scrollToOverflowEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={this.state.flattedBoard}
          keyExtractor={this.keyExtractor}
          numColumns={this.state.boardHandler.getColumnCount()}
          initialNumToRender={
            this.state.boardHandler.getColumnCount() *
            this.state.boardHandler.getRowCount()
          }
          renderItem={this.renderCell}
          getItemLayout={this.getItemLayout}
        />
      </View>
    );
  }
}

Board.contextType = SocketContext;
