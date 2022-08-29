import React, { useContext, Component } from "react";
import { TouchableOpacity, View } from "react-native";
import { SocketContext } from "../../contexts/SocketContext";
import { USER_KEY, SESSION_ID, SESSION_STATE } from "../../constants/keys";
import { clueStyle, mainViewStyle } from "./CrosswordStyles";
import Board from "./Components/Board";
import { Text } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isMobilePlatform } from "../../generalUtils/systemUtils";

/*
Crossword GUI class.
*/
class Crossword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardDescription: props.initial_state.boardDescription,
      players: props.initial_state.players,
      currentClue: "",
      player: { id: "", name: "" },
      clueFont: [10, 15, 20, 25],
      fontIndex: 0,
    };
  }

  changeFontSize() {
    let newFontIndex = (this.state.fontIndex + 1) % this.state.clueFont.length;
    this.setState({ fontIndex: newFontIndex });
  }

  updateClientPlayerIndex() {
    console.log(this.state.player.id);
    for (var index = 0; index < this.state.players.length; index++) {
      console.log(this.state.players[index]);
      if (this.state.players[index].id == this.state.player.id) {
        if (this.state.clientplayerindex != index) {
          this.setState({ clientplayerindex: index });
        }
        break;
      }
    }
    console.log("Updated client player index:" + this.state.clientplayerindex);
  }
  componentDidMount() {
    this.socket = this.context;
    AsyncStorage.getItem(USER_KEY).then((item) => {
      this.setState({ player: JSON.parse(item) });
      this.updateClientPlayerIndex();
    });
    this.state.clientplayerindex = -1;

    this.socket.on("Update state", (game_state, s_id) => {
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
      this.updateClientPlayerIndex();
    });
  }

  setClue(wordPosition, clue) {
    this.setState({ currentClue: wordPosition + ": " + clue });
  }
  render() {
    return (
      <View style={mainViewStyle.container}>
        <TouchableOpacity
          onPress={() => this.changeFontSize()}
          style={clueStyle.clueContainer}
          activeOpacity={0.7}
        >
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={3}
            style={[
              clueStyle.clueText,
              {
                fontSize: isMobilePlatform
                  ? this.state.clueFont[this.state.fontIndex]
                  : 20,
              },
            ]}
          >
            {this.state.currentClue
              ? this.state.currentClue
              : isMobilePlatform
              ? "CLUES: press here to change font size" // Changing font only for Mobile (Web does not support adjustsFontSizeToFit).
              : "clues"}
          </Text>
        </TouchableOpacity>

        <View style={mainViewStyle.boardFrame}>
          <Board
            boardDescription={this.state.boardDescription}
            setClue={(wordPosition, clue) => {
              this.setClue(wordPosition, clue);
            }}
            clientplayerindex={this.state.clientplayerindex}
          />
        </View>
      </View>
    );
  }
}
Crossword.contextType = SocketContext;
export default Crossword;
