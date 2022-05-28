import { View, FlatList, Keyboard, TouchableOpacity } from "react-native";

import React, { Component } from "react";
import { map, range } from "ramda";
import { boardStyle } from "../../CrosswordStyles";
import Cell from "../Cell";
import { BoardHandler } from "./boardHandler";
import { TextInput } from "react-native";
import { COLORS } from "../../../../constants/colors";
const english = /^[A-Za-z-0-9]*$/;

const UNOCCUPIED = -1; // TODO: move this to the const directory
const UNDEFINEDPOSITION = [-1, -1]; // TODO: move this to the const directory.

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
    const [rowCount, columnCount] = boardDescription.dimensions;
    const boardHandler = new BoardHandler(boardDescription);
    const board = boardHandler.board;
    this.state = {
      columnCount: columnCount,
      rowCount: rowCount,
      // isCellFocus: false,
      focusedCell: [-1, -1],
      boardHandler: boardHandler,
    };

    // Create state for each cell.
    board.forEach((rowDescription) => {
      rowDescription.forEach((description) => {
        this.state[`cell(${description.row}-${description.column})`] =
          description;
      });
    });
  }

  getCell = (row, column) => {
    return this.state[`cell(${row}-${column})`];
  };
  getNextCell(cell) {
    return;
  }
  setCellValue = (row, column, value) => {
    let stateObj = this.getCell(row, column);
    stateObj.value = value;
    this.setState(stateObj);
  };
  paintCell(cell, color) {
    cell.ref.setCellColor(color);
  }
  cellPressed = (row, column) => {
    let cell = this.getCell(row, column);
    cell.cellState
      ? this.handleActiveCellPress(cell)
      : this.handleInactiveCellPress(cell);
  };
  handleActiveCellPress = (cell) => {
    this.state.focusedCell = [cell.row, cell.column];
    this.textInput.focus(); // Make sure that focus is maintained.
    let wordIndex = Object.values(cell.words)[0] - 1; // TODO: make this works return different orientation.
    if (this.state.boardHandler.canOccupyWord(wordIndex)) {
      this.state.boardHandler.occupyWord(wordIndex);
    }
    this.updateWordColoring();
  };
  handleInactiveCellPress = (cell) => {
    Keyboard.dismiss();
    this.state.boardHandler.freeFocusedWord();
    // this.state.isCellFocus = false;
    this.state.focusedCell = UNDEFINEDPOSITION;
    this.updateWordColoring();
  };

  onKeyboardInput = (input) => {
    if (english.test(input)) {
      let [row, column] = this.state.focusedCell;
      this.setCellValue(row, column, input);
      // this.state.focusedCell = this.boardHandler.getNextWordIndex(row, column);
    }
    this.textInput.setNativeProps({ text: "" });
  };

  colorWord(wordDescription, color) {
    wordDescription.positions.forEach((position) => {
      let [row, column] = position;
      let cell = this.getCell(row, column);
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

  renderCell = (cell) => {
    return (
      <Cell
        key={`${cell.row}-${cell.column}`}
        cellInfo={cell}
        ref={(ref) => {
          this.state[`cell(${cell.row}-${cell.column})`]["ref"] = ref;
        }}
        position={{
          row: cell.row,
          column: cell.column,
        }}
        cellState={cell.cellState}
        value={cell.value}
      />
    );
  };

  render() {
    return (
      <View className="Board" style={boardStyle.board}>
        <TextInput
          blurOnSubmit={false}
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
                data={range(0, this.state.columnCount)}
                keyExtractor={({ index }) => {
                  return `${rowId}-${index}`;
                }}
                numColumns={this.state.columnCount}
                renderItem={({ item }) => {
                  let column = item;
                  let cell = this.getCell(row, column);
                  return (
                    <TouchableOpacity
                      activeOpacity={cell.cellState ? 0.2 : 1} // Black cell should not respond to touches.
                      style={{ flex: 1 }}
                      onPress={() => {
                        this.cellPressed(row, item);
                      }}
                    >
                      {this.renderCell(cell)}
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          );
        }, range(0, this.state.rowCount))}
      </View>
    );
  }
}
