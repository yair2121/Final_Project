import React, { Component } from "react";
import { Text } from "react-native-elements";
import { cellStyle } from "../../CrosswordStyles";
import { CellState } from "./cellStates";
import AspectView from "../../../../components/AspectView";
import { COLORS } from "../../../../constants/colors";
import { ORIENTATION } from "../../../../constants/orientation";
import { View } from "react-native";

export default class Cell extends Component {
  constructor(props) {
    super(props);
    let cellColor =
      props.cellInfo.state === CellState.ACTIVE ? COLORS.white : COLORS.black;
    this.state = {
      cellInfo: props.cellInfo,
      color: cellColor,
      isFocused: props.isFocused,
      value: props.value,
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.cellInfo.state === CellState.ACTIVE;
  }

  setCellFocus(newFocus) {
    this.setState({ isFocused: newFocus });
  }

  setCellColor(color) {
    this.setState({ color: color });
    this.state.color = color;
  }

  setCellValue(newValue) {
    // if (newValue !== this.state.value) {
    this.setState({ value: newValue });
    // }
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
          <View>
            {this.state.cellInfo.isStartOfWord() && (
              <Text>{this.getStartOfWordText()}</Text>
            )}
            <Text
              style={cellStyle(this.state.cellInfo.state).cellContent}
              maxLength={1}
            >
              {this.state.value}
            </Text>
          </View>
        )}
      </AspectView>
    );
  }
}
