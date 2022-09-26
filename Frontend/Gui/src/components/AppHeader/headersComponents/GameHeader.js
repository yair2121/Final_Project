import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SESSION_ID, GAME_NAME } from "../../../constants/keys";
import { Alert } from "react-native";
import { Header, Icon } from "react-native-elements";
import { COLORS } from "../../../constants/colors";
import { isMobilePlatform } from "../../../generalUtils/systemUtils";
import { DefaultHeaderStyles } from "../HeaderStyles";
import { SocketContext } from "../../../contexts/SocketContext";
export default class GameHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      navigation: props.navigation,
      route: props.route,
    };
  }

  componentDidMount() {
    this.socket = this.context;
  }
  exitPopup = () => {
    Alert.alert("Exit game?", "", [
      {
        text: "No",
        onPress: () => {},
        style: "cancel",
      },
      { text: "Yes", onPress: this.exitGame },
    ]);
  };

  exitGame = () => {
    AsyncStorage.getItem(SESSION_ID).then((s_id) => {
      AsyncStorage.getItem(GAME_NAME).then((game_name) => {
        if (s_id !== null && game_name !== null) {
          this.socket.emit("leave_game", game_name, s_id);
        }
        this.state.navigation.navigate("MainMenu", {});
      });
    });
  };

  ExitButton = () => {
    return (
      <Icon
        name="close"
        color={COLORS.white}
        onPress={isMobilePlatform ? this.exitPopup : this.exitGame} // Alert does not work on Web
      />
    );
  };
  render() {
    return (
      <Header
        containerStyle={DefaultHeaderStyles.container}
        backgroundColor="black"
        barStyle="default"
        rightComponent={this.ExitButton}
        placement="center"
      />
    );
  }
}

GameHeader.contextType = SocketContext;
