import React, { Component } from "react";
import { Text } from "react-native-elements";
import { cellStyle } from "../../CrosswordStyles";
import { CellState } from "./cellStates";
import AspectView from "../../../../components/AspectView";
import { COLORS } from "../../../../constants/colors";
// import { prop } from "ramda";

export default class Cell extends Component {
  constructor(props) {
    super(props);
    let cellColor =
      props.cellInfo.state === CellState.ACTIVE ? COLORS.white : COLORS.black;
    this.state = {
      cellInfo: props.cellInfo,
      color: cellColor,
      isFocused: props.isFocused,
    };
  }

  updateFocus() {
    this.setState({ isFocused: this.state.isFocused });
  }
  // flipFocus() {
  //   this.setState({ isFocused: !this.state.isFocused });
  // }

  setCellColor(color) {
    this.setState({ color: color });
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
          <Text
            style={cellStyle(this.state.cellInfo.state).cellContent}
            maxLength={1}
          >
            {this.state.cellInfo.value}
          </Text>
        )}
      </AspectView>
    );
  }
}
