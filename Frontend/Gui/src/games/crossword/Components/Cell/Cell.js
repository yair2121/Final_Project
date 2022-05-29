import React, { Component } from "react";
import { Text } from "react-native-elements";
import { cellStyle } from "../../CrosswordStyles";
import { CellState } from "./cellStates";
import AspectView from "../../../../components/AspectView";
import { COLORS } from "../../../../constants/colors";
import { CellUtils } from "./cellUtils";

export default class Cell extends Component {
  constructor(props) {
    super(props);
    let cellColor =
      props.cellInfo.cellState === CellState.ACTIVE
        ? COLORS.white
        : COLORS.black;
    this.state = {
      cellInfo: props.cellInfo,
      color: cellColor,
    };
  }

  setCellColor = (color) => {
    this.setState({ color: color });
  };
  render() {
    return (
      <AspectView
        key={`$this.state.cellInfo.row}-{$this.state.cellInfo.column}`}
        className={`Cell-{$this.state.cellInfo.row}-{$this.state.cellInfo.column}`}
        style={cellStyle(this.state.cellInfo.cellState, this.state.color).cell}
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
