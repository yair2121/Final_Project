import React, { Component } from "react";
import { Text } from "react-native-elements";
import { cellStyle } from "../../CrosswordStyles";
import { CellState } from "./cellStates";
import AspectView from "../../../../components/AspectView";
import { COLORS } from "../../../../constants/colors";
import { TextInput, View } from "react-native";
import { ORIENTATION } from "../../consts/orientation";

/**
 * This class component handle the cell rendering for Crossword game.
 */
export default class Cell extends Component {
  constructor(props) {
    super(props);
    let initialCellColor =
      props.cellInfo.state === CellState.ACTIVE ? COLORS.white : COLORS.black;
    this.state = {
      cellInfo: props.cellInfo,
      color: initialCellColor,
      isFocused: props.isFocused,
      value: props.value,
    };
  }

  shouldComponentUpdate() {
    return this.state.cellInfo.state === CellState.ACTIVE; // Rerender only Active cells.
  }

  setCellFocus(newFocus) {
    this.setState({ isFocused: newFocus });
  }

  setCellColor(color) {
    this.state.color = color;
    this.setState({ color: color });
  }

  setCellValue(newValue) {
    this.setState({ value: newValue });
  }

  getStartOfWordText() {
    let text = "";
    text += this.state.cellInfo.isAcrossWordStart
      ? this.state.cellInfo.getWordPosition(ORIENTATION.ACROSS)
      : "";
    text += this.state.cellInfo.isDownWordStart
      ? this.state.cellInfo.getWordPosition(ORIENTATION.DOWN)
      : "";
    return text;
  }
  render() {
    return (
      <AspectView
        key={`$this.state.cellInfo.row}-{$this.state.cellInfo.column}`}
        className={`Cell-{$this.state.cellInfo.row}-{$this.state.cellInfo.column}`}
        style={
          cellStyle(
            this.state.cellInfo.state,
            this.state.color,
            this.state.cellInfo.isFocused
          ).cell
        }
      >
        {this.state.cellInfo.state === CellState.ACTIVE && (
          <View style={cellStyle(this.state.cellInfo.state).activeCell}>
            {this.state.cellInfo.isStartOfWord() && (
              <Text style={cellStyle(this.state.cellInfo.state).cellWord}>
                {this.getStartOfWordText()}
              </Text>
            )}
            <Text
              style={cellStyle(this.state.cellInfo.state).cellInput}
              maxLength={1} // One letter per cell.
              adjustsFontSizeToFit={true}
            >
              {this.state.value}
            </Text>
          </View>
        )}
      </AspectView>
    );
  }
}
