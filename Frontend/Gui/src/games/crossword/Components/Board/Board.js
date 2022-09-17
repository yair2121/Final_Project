import {
  View,
  FlatList,
  Keyboard,
  BackHandler,
  TouchableOpacity,
  TextInput,
} from "react-native";

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
    this.clientplayerindex = props.clientplayerindex;
    this.state = {
      boardHandler: boardHandler,
      isKeyboardHidden: true,
      flattedBoard: boardHandler.board.flat(), // For rendering
    };
  }

  initSocketListener() {
    this.socket.on("Update move", async (move_description, s_id) => {
      let { type, body } = move_description;
      if (type === "move") {
        //apply move (body)
        this.applyMove(body);
      } else {
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        // this.updateWordColoring();
      }
    });
  }

  applyMove(move_body) {
    let { letter, position, index, player } = move_body;
    let cell_position = this.state.boardHandler.getWord(position - 1);
    cell_position = cell_position.positions[index];
    let cell = this.state.boardHandler.getCell(cell_position);
    this.setCellValue(cell, letter);
  }

  updateBoard(newBoard) {}

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
    this.state.boardHandler.setPlayerIndex(this.clientplayerindex);
    this.initSocketListener();
    //this.updateWordColoring(); // Update board rendering to the current server state.

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
  }

  getCell(position) {
    return this.state.boardHandler.getCell(position);
  }

  setCellValue = (cell, value) => {
    cell.ref.setCellValue(value);
    cell.value = value;
  };

  /**
   * Update the color of given cell to given color.
   * @param {Cell} cell
   * @param {*} color
   */
  paintCell(cell, color) {
    // No need to repaint if cell is already in the given color.
    // delete the condition later
    if (cell.ref != undefined) {
      if (color !== cell.ref.state.color) {
        cell.ref.setCellColor(color);
      }
    } else {
      console.warn("should have broken");
    }
  }

  setCellFocusState(cell, isFocus) {
    cell.ref.setCellFocus(isFocus);
  }

  // shouldRepaint(prevCellPosition, prevWord) {
  //   // Not used- might delete.
  //   let didWordChanged = prevWord !== this.state.boardHandler.focusedWordIndex;
  //   let didPositionChanged = !this.state.boardHandler.isSamePosition(
  //     prevCellPosition,
  //     this.state.boardHandler.focusedCellPosition
  //   );
  //   if (
  //     prevCellPosition[0] !== -1 &&
  //     this.state.boardHandler.focusedCellPosition[0] !== -1
  //   ) {
  //     return didWordChanged || didPositionChanged;
  //   }
  //   return false;
  // }

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

    this.updateWordColoring();
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
          player: this.clientplayerindex,
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

  renderCell = (renderObject) => {
    const cell = renderObject.item;
    return (
      <TouchableOpacity
        activeOpacity={cell.state ? 0.4 : 1} // Black cell should not have graphics for responding to touches.
        style={{ flex: 1 }}
        onPress={() => {
          this.cellPressed([cell.row, cell.column]);
        }}
      >
        <Cell
          key={this.keyExtractor(cell)}
          cellInfo={cell}
          isFocused={cell.isFocused}
          value={cell.value}
          ref={(ref) => {
            cell["ref"] = ref;
          }}
        />
      </TouchableOpacity>
    );
  };

  render() {
    this.clientplayerindex = this.props.clientplayerindex;
    this.state.boardHandler.setPlayerIndex(this.clientplayerindex);
    return (
      <View style={{ flex: 1 }}>
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
        <View className="Board" style={boardStyle.board}>
          <FlatList
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="on-drag"
            scrollEnabled={false}
            data={this.state.flattedBoard}
            keyExtractor={this.keyExtractor}
            numColumns={this.state.boardHandler.getColumnCount()}
            renderItem={this.renderCell}
          />
        </View>
      </View>
    );
  }
}

Board.contextType = SocketContext;
