// import { Text, View } from "react-native";
import React, { Component } from "react";
import { Text } from "react-native-elements";
import { View } from "react-native";
import { cellStyle } from "../Crossword.styles";
import AspectView from "../../../components/AspectView";

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    this.state = {};
  }
  render() {
    const { position } = this.props;
    const [x, y] = position;
    return (
      <View
        key={`${x}-${y}`}
        className={`Cell-${x}-${y}`}
        style={cellStyle.cell}
      >
        <Text style={cellStyle.cellContent}>{"A"}</Text>
      </View>
    );
  }
}
