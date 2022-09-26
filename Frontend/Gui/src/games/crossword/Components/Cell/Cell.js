import React, { Component } from "react";
import { Text } from "react-native-elements";
import { cellStyle } from "../../CrosswordStyles";
import { CellState } from "./cellStates";
import AspectView from "../../../../components/AspectView";
import { COLORS } from "../../../../constants/colors";
import { ORIENTATION } from "../../consts/orientation";
import { TouchableOpacity } from "react-native";

/**
 * This class component handle the cell rendering for Crossword game.
 */
export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.onPress = props.onPress;
    let initialCellColor =
      props.cellInfo.state === CellState.ACTIVE ? COLORS.white : COLORS.black;
    this.cellInfo = props.cellInfo;
    this.state = {
      color: initialCellColor,
      isFocused: props.isFocused,
      value: props.value,
    };
  }

  componentWillUnmount() {
    this.cellInfo.resetCell();
  }

  componentDidMount() {
    this.cellInfo.setCellColor = (color) => {
      this.setCellColor(color);
    };

    this.cellInfo.setCellValue = (value) => {
      this.setCellValue(value);
    };

    this.cellInfo.setCellFocus = (newFocus) => {
      this.setCellFocus(newFocus);
    };
  }

  shouldComponentUpdate() {
    return this.cellInfo.state === CellState.ACTIVE; // Rerender only Active cells.
  }

  setCellFocus(newFocus) {
    this.isFocused = newFocus;
    this.setState({ isFocused: newFocus });
  }

  setCellColor(color) {
    this.state.color = color;
    this.setState({ color: color });
  }

  keyExtractor(cell) {
    return `${cell.row}-${cell.column}`;
  }

  setCellValue(newValue) {
    this.setState({ value: newValue });
  }

  getStartWordPosition(orientation) {
    if (orientation === ORIENTATION.ACROSS && this.cellInfo.isAcrossWordStart) {
      return this.cellInfo.getWordPosition(orientation);
    }
    if (orientation === ORIENTATION.DOWN && this.cellInfo.isDownWordStart) {
      return this.cellInfo.getWordPosition(orientation);
    }
    return "";
  }

  ActiveCellInput() {
    return (
      <Text
        style={cellStyle(this.cellInfo.state).cellInput}
        maxLength={1} // One letter per cell.
        adjustsFontSizeToFit={true}
      >
        {this.state.value}
      </Text>
    );
  }

  ActiveCellWord(orientation) {
    let style =
      orientation === ORIENTATION.ACROSS
        ? cellStyle(this.cellInfo.state).cellAcrossWord
        : cellStyle(this.cellInfo.state).cellDownWord;
    return (
      <Text adjustsFontSizeToFit={true} style={style}>
        {this.getStartWordPosition(orientation)}
      </Text>
    );
  }

  render() {
    return (
      <AspectView
        key={`$this.cellInfo.row}-{$this.cellInfo.column}`}
        className={`Cell-{$this.cellInfo.row}-{$this.cellInfo.column}`}
        style={
          cellStyle(this.cellInfo.state, this.state.color, this.state.isFocused)
            .cell
        }
      >
        <TouchableOpacity
          onPress={this.onPress}
          style={{ flex: 1 }}
          activeOpacity={this.cellInfo.state ? 0.4 : 1} // Black cell should not have graphics for responding to touches.
        >
          {this.cellInfo.isAcrossWordStart &&
            this.ActiveCellWord(ORIENTATION.ACROSS)}
          {this.cellInfo.isDownWordStart &&
            this.ActiveCellWord(ORIENTATION.DOWN)}
          {this.cellInfo.state === CellState.ACTIVE &&
            // Render cell current value.
            this.ActiveCellInput()}
        </TouchableOpacity>
      </AspectView>
    );
  }
}
