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
import { CellState } from "../Cell/cellStates";

const ITEM_HEIGHT = 65; // fixed height of item component

const playersColors = [
  COLORS.white,
  COLORS.green,
  COLORS.darkgrey,
  COLORS.grey,
  COLORS.secondary,
];
/**
 * This class handle the Board rendering and the board data handling(using BoardUtils) for Crossword game.
 */
export default class Board extends Component {
  constructor(props) {
    super(props);
    const boardDescription = props.boardDescription;
    const boardHandler = new BoardHandler(boardDescription, props.setClue);

    this.state = {
      boardHandler: boardHandler,
      isKeyboardHidden: true,
      flattedBoard: boardHandler.board.flat(), // For rendering
    };

    this.initSocketListener();
  }

  /*
    TODO: add Function which have a socket listener to update the board according to the server current state.
    Events:
    1. A player captured a new word.
    2. A player Freed a word.
    3. A player wrote a letter.
  */

  initSocketListener() {}
  updateBoard(newBoard) {}

  /**
   * Disab
   * le back button on Android.
   */
  handleBackButton() {
    return true;
  }

  componentDidMount() {
    this.updateWordColoring(); // Update board rendering to the current server state.

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
    if (color !== cell.ref.state.color) {
      cell.ref.setCellColor(color);
    }
  }

  setCellFocus(cell, isFocus) {
    cell.ref.setCellFocus(isFocus);
    // let focusedCellPosition = this.state.boardHandler.focusedCellPosition;
    // if (this.state.boardHandler.isActivePosition(focusedCellPosition)) {
    //   this.getCell(focusedCellPosition).ref.updateFocus();
    // }
    // if (this.state.boardHandler.isActivePosition(prevFocusedCell)) {
    //   this.getCell(prevFocusedCell).ref.updateFocus();
    // }
  }

  shouldRepaint(prevCellPosition, prevWord) {
    // Not used- might delete.
    let didWordChanged = prevWord !== this.state.boardHandler.focusedWordIndex;
    let didPositionChanged = !this.state.boardHandler.isSamePosition(
      prevCellPosition,
      this.state.boardHandler.focusedCellPosition
    );
    if (
      prevCellPosition[0] !== -1 &&
      this.state.boardHandler.focusedCellPosition[0] !== -1
    ) {
      return didWordChanged || didPositionChanged;
    }
    return false;
  }

  cellPressed(position) {
    let cell = this.getCell(position);
    let prevCell = undefined;
    if (this.state.boardHandler.isCellFocused()) {
      prevCell = this.state.boardHandler.getFocusedCell();
    }
    // let prevCellPosition = this.state.boardHandler.focusedCellPosition;
    cell.state === CellState.ACTIVE
      ? this.handleActiveCellPress(cell)
      : this.handleInactiveCellPress();
    if (prevCell !== undefined) {
      this.setCellFocus(prevCell, false);
    }
    if (this.state.boardHandler.isCellFocused()) {
      let newCell = this.state.boardHandler.getFocusedCell();
      this.setCellFocus(newCell, true);
    }
    // if (this.shouldRepaint(prevCellPosition, prevFocusedWord)) {
    this.updateWordColoring();
  }

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
      let currentCell = this.state.boardHandler.getFocusedCell();
      this.setCellValue(currentCell, input);
      this.state.boardHandler.advanceFocusedWordIndex();
      let nextCell = this.state.boardHandler.getFocusedCell();
      this.setCellFocus(currentCell, false);
      this.setCellFocus(nextCell, true);
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
   * Paint all the words on the board based on there current state
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
        activeOpacity={cell.state ? 0.7 : 1} // Black cell should not respond to touches.
        style={{ flex: 1 }}
        onPress={() => {
          this.cellPressed([cell.row, cell.column]);
        }}
      >
        <Cell
          key={`${cell.row}-${cell.column}`}
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
    return (
      <View className="Board" style={boardStyle.board}>
        <TextInput
          blurOnSubmit={false}
          autoFocus={true}
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
        <FlatList
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="on-drag"
          scrollEnabled={false}
          data={this.state.flattedBoard}
          keyExtractor={this.keyExtractor}
          numColumns={this.state.boardHandler.getColumnCount()}
          renderItem={this.renderCell}
          // getItemLayout={this.getItemLayout} // this will optimize Flatlist performance.
        />
      </View>
    );
  }
}
