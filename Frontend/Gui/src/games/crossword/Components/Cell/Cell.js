import React, { Component } from "react";
import { Text, Input } from "react-native-elements";
import { cellStyle } from "../../CrosswordStyles";
import { CellState } from "./cellStates";
import AspectView from "../../../../components/AspectView";
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/colors";

export default class Cell extends Component {
  constructor(props) {
    super(props);
    let style = cellStyle(props.cellInfo.cellState);
    this.state = {
      cellInfo: props.cellInfo,
      cellStyle: style,
      cellColor:
        props.cellInfo.cellState === CellState.ACTIVE
          ? COLORS.white
          : COLORS.black,
    };
  }

  setCellColor = (color) => {
    this.setState({ cellColor: color });
  };
  render() {
    return (
      <AspectView
        key={`$this.state.cellInfo.row}-{$this.state.cellInfo.column}`}
        className={`Cell-{$this.state.cellInfo.row}-{$this.state.cellInfo.column}`}
        style={
          cellStyle(this.state.cellInfo.cellState, this.state.cellColor).cell
        }
      >
        {this.state.cellInfo.cellState === CellState.ACTIVE && (
          <Text
            style={cellStyle(this.state.cellInfo.cellState).cellContent}
            maxLength={1}
          >
            {this.state.cellInfo.value}
          </Text>
        )}
      </AspectView>
    );
  }
}
