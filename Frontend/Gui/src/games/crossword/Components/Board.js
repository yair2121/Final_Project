import { View } from "react-native";

import React, { Component } from "react";
import Cell from "./Cell";
import { map, range } from "ramda";
import { boardStyle } from "../Crossword.styles";
// const CELLS = [];
// // const DIMENSIONS = [9, 9];
// // const [width, height] = DIMENSIONS;

// for (const key of Array(81).keys()) {
//   CELLS.push({ key: key });
// }

export default class Board extends Component {
  constructor(props) {
    super(props);
    const [width, height] = props.boardDimensions;
    this.state = {
      width: width,
      height: height,
    };
  }
  render() {
    // const { cells, size } = this.props.universe;
    const allCells = map((x) => {
      return map((y) => {
        return [x, y];
      }, range(0, this.state.height));
    }, range(0, this.state.width));
    return (
      <View className="Board" style={boardStyle.board}>
        {allCells.map((row) => {
          const rowId = "" + row[0][0];
          return (
            <View key={rowId} className={`Row-${rowId}`} style={boardStyle.row}>
              {row.map(([x, y]) => {
                return <Cell key={`${x}-${y}`} position={[x, y]} />;
              })}
            </View>
          );
        })}
      </View>
    );
  }
}
