import React, { Component } from "react";

import { Platform, View } from "react-native";
import { mainViewStyle } from "./CrosswordStyles";
import AspectView from "../../components/AspectView";
import Board from "./Components/Board";
function isMobilePlatform() {
  return Platform.OS === "android" || Platform.OS == "ios";
}

export default class Crossword extends Component {
  constructor(props) {
    super(props);
    const boardJSON = Crossword.getBoardJSON();
    this.state = {
      boardDescription: JSON.parse(boardJSON),
    };
  }

  static getBoardJSON() {
    return '{"dimensions":[9,10],"boardWords":[{"clue":"the collective designation of items for a particular purpose","answer":"equipment","startx":1,"starty":4,"position":1,"orientation":"across"},{"clue":"an opening or entrance to an inclosed place","answer":"port","startx":5,"starty":4,"position":2,"orientation":"down"},{"clue":"that which is established as a rule or model by authority, custom, or general consent","answer":"standard","startx":8,"starty":1,"position":3,"orientation":"down"},{"clue":"a machine that computes","answer":"computer","startx":3,"starty":2,"position":4,"orientation":"across"},{"clue":"a point where two things can connect and interact","answer":"interface","startx":1,"starty":1,"position":5,"orientation":"down"}]}';
  }

  render() {
    return (
      <View style={mainViewStyle.container}>
        <AspectView style={mainViewStyle.boardFrame}>
          <Board boardDescription={this.state.boardDescription} />
        </AspectView>

        {/* <Text style={{ flex: 0.5 }}>Crossword</Text> */}
      </View>
    );
  }
}
