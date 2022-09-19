import React, { Component } from "react";
import { Alert } from "react-native";
import { Header, Icon } from "react-native-elements";
import { COLORS } from "../../../constants/colors";
import { isMobilePlatform } from "../../../generalUtils/systemUtils";
import { DefaultHeaderStyles } from "../HeaderStyles";
export default class GameHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      navigation: props.navigation,
      route: props.route,
    };
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
    // TODO: insert game exit logic or alert the game to exit.
    this.state.navigation.navigate("MainMenu", {});
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
