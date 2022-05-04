// import { Text, View } from "react-native";
import React, { Component } from "react";
import { Text, Input } from "react-native-elements";
import { View } from "react-native";
import { cellStyle } from "../../Crossword.styles";
import { CellState } from "./cellStates";

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    const { position } = this.props;
    this.state = {
      position: position,
      cellState: props.cellState,
    };
  }

  render() {
    return (
      <View
        key={`$this.state.position.row}-${this.state.position.column}`}
        className={`Cell-${this.state.position.column}-${this.state.position.column}`}
        style={cellStyle(this.state.cellState).cell}
      >
        {this.state.cellState === CellState.ACTIVE && (
          <Input
            style={cellStyle.cellContent}
            textAlign="center"
            maxLength={1}
            autoCapitalize="characters"
            showSoftInputOnFocus={false}
            defaultValue="A"
          ></Input>
        )}
      </View>
    );
  }
}
