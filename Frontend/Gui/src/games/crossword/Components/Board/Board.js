import { Text, View, FlatList, Keyboard, TouchableOpacity } from "react-native";

import React, { Component } from "react";
// import { useKeyboard } from "@react-native-community/hooks";
import { map, prop, range } from "ramda";
import { boardStyle } from "../../CrosswordStyles";
import Cell from "../Cell";
import { createBoard } from "./boardUtils";
import { TextInput } from "react-native";
import { CellState } from "../Cell/cellStates";
var english = /^[A-Za-z]*$/;

export default class Board extends Component {
  constructor(props) {
    super(props);
    const boardDescription = props.boardDescription;
    const [rowCount, columnCount] = boardDescription.dimensions;
    const board = createBoard(
      rowCount,
      columnCount,
      boardDescription.boardWords
    );
    this.state = {
      columnCount: columnCount,
      rowCount: rowCount,
      isCellFocus: false,
      focusedCell: [-1, -1],
    };
    board.forEach((rowDescription) => {
      rowDescription.forEach((description) => {
        this.state[`cell(${description.cellRow}-${description.cellColumn})`] =
          description;
      });
    });
  }
  getCell = (row, column) => {
    return this.state[`cell(${row}-${column})`];
  };
  setCellValue = (row, column, value) => {
    let stateObj = this.state[`cell(${row}-${column})`];
    stateObj.value = value;
    this.setState(stateObj);
  };

  cellPressed = (row, column) => {
    let cell = this.getCell(row, column);
    if (cell.cellState === CellState.ACTIVE) {
      this.state.focusedCell = [row, column];
    }
    if (!this.state.isCellFocus && cell.cellState === CellState.ACTIVE) {
      // Should open keyboard
      this.textInput.focus();
      this.state.isCellFocus = true;
      return;
    }
    if (this.state.isCellFocus && cell.cellState === CellState.NONACTIVE) {
      // Should dismiss keyboard.
      Keyboard.dismiss();
      this.state.isCellFocus = false;
      this.state.focusedCell = [-1, -1];
      return;
    } else {
      this.textInput.focus();
    }
  };

  onKeyboardInput = (key) => {
    if (this.state.isCellFocus && english.test(key)) {
      let [row, column] = this.state.focusedCell;
      this.setCellValue(row, column, key);
    }
    this.textInput.setNativeProps({ text: "" });
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
                data={range(0, this.state.rowCount)}
                keyExtractor={({ index }) => {
                  return `${rowId}-${index}`;
                }}
                numColumns={this.state.columnCount}
                renderItem={({ item }) => {
                  let column = item;
                  let cell = this.getCell(row, column);
                  return (
                    <TouchableOpacity
                      keyboardShouldPersistTaps={"always"}
                      style={{ flex: 1 }}
                      // disabled={!cell.cellState}
                      onPress={() => {
                        this.cellPressed(row, item);
                      }}
                    >
                      <Cell
                        key={`${row}-${column}`}
                        cellInfo={this.getCell(row, column)}
                        position={{
                          row: row,
                          column: column,
                        }}
                        cellState={cell.cellState}
                        value={cell.value}
                      />
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
