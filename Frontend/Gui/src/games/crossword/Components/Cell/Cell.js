import React, { Component } from "react";
import { Text, Input } from "react-native-elements";
import { cellStyle } from "../../CrosswordStyles";
import { CellState } from "./cellStates";
import AspectView from "../../../../components/AspectView";

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      cellInfo: props.cellInfo,
    };
  }

  render() {
    return (
      <AspectView
        key={`$this.state.cellInfo.cellRow}-{$this.state.cellInfo.cellColumn}`}
        className={`Cell-{$this.state.cellInfo.cellRow}-{$this.state.cellInfo.cellColumn}`}
        style={cellStyle(this.state.cellInfo.cellState).cell}
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
