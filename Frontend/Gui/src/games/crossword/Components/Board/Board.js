import {
  View,
  FlatList,
  Keyboard,
  BackHandler,
  TouchableOpacity,
  TextInput,
} from "react-native";

import React, { Component } from "react";
import { map, range } from "ramda";
import { boardStyle } from "../../CrosswordStyles";
import Cell from "../Cell";
import { BoardHandler } from "./boardHandler";
import { COLORS } from "../../../../constants/colors";
import { LANGUAGE } from "../../../../constants/languageRegex";

const ITEM_HEIGHT = 65; // fixed height of item component

const playersColors = [
  COLORS.white,
  COLORS.green,
  COLORS.darkgrey,
  COLORS.grey,
  COLORS.secondary,
];
export default class Board extends Component {
  constructor(props) {
    super(props);
    const boardDescription = props.boardDescription;
    const boardHandler = new BoardHandler(boardDescription, props.setClue);

    boardHandler.words[2].state = 2; // TODO: this is only for debugging.
    boardHandler.words[1].state = 4;

    this.state = {
      boardHandler: boardHandler,
      isKeyboardHidden: true,
    };
  }

  handleBackButton() {
    return true;
  }
  componentDidMount() {
    this.updateWordColoring();
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
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  getCell(position) {
    return this.state.boardHandler.board[position[0]][position[1]];
  }

  setCellValue = (position, value) => {
    let stateObj = this.getCell(position);
    stateObj.value = value;
    this.setState(stateObj);
  };
  paintCell(cell, color) {
    cell.ref.setCellColor(color);
  }

  updateCellFocus(prevFocusedCell) {
    let focusedCell = this.state.boardHandler.focusedCell;
    if (this.state.boardHandler.isActivePosition(focusedCell)) {
      this.getCell(focusedCell).ref.updateFocus();
    }
    if (this.state.boardHandler.isActivePosition(prevFocusedCell)) {
      this.getCell(prevFocusedCell).ref.updateFocus();
    }
  }

  cellPressed = (position) => {
    let cell = this.getCell(position);
    cell.state
      ? this.handleActiveCellPress(cell)
      : this.handleInactiveCellPress();
    this.updateWordColoring();
  };

  handleActiveCellPress(cell) {
    if (this.state.isKeyboardHidden) {
      Keyboard.dismiss(); // Keyboard need to be dismissed if It was hidden by OS(pressing back button).
    }
    this.textInput.focus(); // Make sure that focus is maintained.
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
      this.setCellValue(this.state.boardHandler.focusedCell, input);
      this.state.boardHandler.updateFocusedWordIndex();
      this.updateWordColoring();
    }
    this.textInput.setNativeProps({ text: "" });
  }

  colorWord(wordDescription, color) {
    wordDescription.positions.forEach((position) => {
      let cell = this.getCell(position);
      this.paintCell(cell, color);
    });
  }
  /**
   * Paint all the words on the board based on there current state
   */
  updateWordColoring() {
    let occupiedWords = [];
    this.state.boardHandler.words.forEach((wordDescription) => {
      if (wordDescription.state === -1) {
        // Paint unoccupied words first.
        this.colorWord(wordDescription, playersColors[wordDescription.state]);
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
  getItemLayout(data, index) {
    return {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * data.length,
      index,
    };
  }

  renderCell = (renderObject) => {
    const cell = renderObject.item;
    return (
      <TouchableOpacity
        activeOpacity={cell.state ? 0.7 : 1} // Black cell should not respond to touches.
        style={{ flex: 1 }}
        onPress={() => {
          this.cellPressed([cell.row, cell.column]);
        }}
      >
        <Cell
          key={`${cell.row}-${cell.column}`}
          cellInfo={cell}
          ref={(ref) => {
            this.getCell([cell.row, cell.column])["ref"] = ref;
          }}
          isFocused={cell.isFocused}
          position={{
            row: cell.row,
            column: cell.column,
          }}
          cellState={cell.state}
          value={cell.value}
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View className="Board" style={boardStyle.board}>
        <TextInput
          blurOnSubmit={false}
          autoFocus={true}
          returnKeyType={"next"}
          style={{ height: 0, width: 0 }}
          onChangeText={(text) => {
            this.onKeyboardInput(text);
          }}
          ref={(ref) => {
            this.textInput = ref;
          }}
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={1}
        />
        {map((row) => {
          const rowId = "" + row;
          return (
            <View key={rowId} style={boardStyle.row}>
              <FlatList
                keyboardShouldPersistTaps="always"
                keyboardDismissMode="on-drag"
                scrollEnabled={false}
                className={`Row-${rowId}`}
                data={this.state.boardHandler.board[rowId]}
                keyExtractor={this.keyExtractor}
                numColumns={this.state.boardHandler.getColumnCount()}
                renderItem={this.renderCell}
                // getItemLayout={this.getItemLayout}
              />
            </View>
          );
        }, range(0, this.state.boardHandler.getRowCount()))}
      </View>
    );
  }
}
