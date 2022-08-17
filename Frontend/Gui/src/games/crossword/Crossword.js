import React, { Component } from "react";
import { Platform, View, Text } from "react-native";
import { SocketContext } from "../../contexts/SocketContext";
import { USER_KEY, SESSION_ID, SESSION_STATE } from "../../constants/keys";
import AspectView from "../../components/AspectView";

import { clueStyle, mainViewStyle } from "./CrosswordStyles";
import Board from "./Components/Board";

// function isMobilePlatform() { // Might not be needed.
//   return Platform.OS === "android" || Platform.OS == "ios";
// }

/*
Crossword GUI class.
*/
export default class Crossword extends Component {
  constructor(props) {
    const socket = useContext(SocketContext);
    super(props);

    //unused variable
    //const boardJSON = props.initial_state.boardDescription;

    this.state = {
      boardDescription: props.initial_state.boardDescription,
      players: props.initial_state.players,
      currentClue: "",
      player: {},
      sessionId: "",
    };
  }

  componentDidMount() {
    AsyncStorage.getItem(USER_KEY).then((item) => {
      this.setState({ player: JSON.parse(item) });
    });
    AsyncStorage.getItem(SESSION_ID).then((item) => {
      this.setState({ sessionId: item });
    });
    socket.on("Update state", (game_state, s_id) => {
      players_changed = false;
      if (this.state.players.length == game_state.players.length) {
        for (var i = 0; i < this.state.players.length; i++) {
          if (this.state.players[i].id != game_state.players[i].id) {
            players_changed = true;
            break;
          }
        }
      } else {
        players_changed = true;
      }
      if (players_changed) {
        this.setState({ players: game_state });
      }
      if (game_state.boardDescription != this.state.boardDescription) {
        this.setState({ boardDescription: game_state.boardDescription });
      }
    });
  }

  // TODO: change this to get the board from the server
  static getBoardJSON() {
    return '{"dimensions":[9,10],"boardWords":[{"clue":"the collective designation of items for a particular purpose","answer":"equipment","startx":1,"starty":4,"position":1,"orientation":"across"},{"clue":"an opening or entrance to an inclosed place","answer":"port","startx":5,"starty":4,"position":2,"orientation":"down"},{"clue":"that which is established as a rule or model by authority, custom, or general consent","answer":"standard","startx":8,"starty":1,"position":3,"orientation":"down"},{"clue":"a machine that computes","answer":"computer","startx":3,"starty":2,"position":4,"orientation":"across"},{"clue":"a point where two things can connect and interact","answer":"interface","startx":1,"starty":1,"position":5,"orientation":"down"}]}';
  }

  setClue(wordPosition, clue) {
    this.setState({ currentClue: wordPosition + ":" + clue });
  }

  render() {
    return (
      <View style={mainViewStyle.container}>
        <AspectView style={mainViewStyle.boardFrame}>
          <Board
            boardDescription={this.state.boardDescription}
            setClue={(wordPosition, clue) => {
              this.setClue(wordPosition, clue);
            }}
          />
          <Text style={clueStyle.clue}>{this.state.currentClue}</Text>
        </AspectView>
      </View>
    );
  }
}
