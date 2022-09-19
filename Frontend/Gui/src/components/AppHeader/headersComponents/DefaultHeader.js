import React, { Component } from "react";
import { Header, Icon } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

import { COLORS } from "../../../constants/colors";
import { DefaultHeaderStyles } from "../HeaderStyles";
export default class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      navigation: props.navigation,
      route: props.route,
    };
  }

  logOut = () => {
    //TODO: disconnect client from server here.
    console.log("TODO: implement logging out");
    this.state.navigation.navigate("LoginScreen", {});
  };

  goBack = () => {
    if (!this.state.navigation.canGoBack()) {
      return;
    }

    if (this.state.route.name === "MainMenu") {
      this.logOut();
    } else {
      this.state.navigation.goBack();
    }
  };

  LeftHeader = () => {
    return (
      <Icon name="arrow-back" color={COLORS.white} onPress={this.goBack} />
    );
  };
  RightHeader = () => {
    return (
      <FontAwesome
        rendered="#{false}"
        name="sign-out"
        size={24}
        color={COLORS.white}
        onPress={this.logOut}
      />
    );
  };
  render() {
    return (
      <Header
        containerStyle={DefaultHeaderStyles.container}
        backgroundColor="black"
        backgroundImageStyle={{ flex: 1 }}
        barStyle="default"
        centerComponent={{
          text: this.state.playerName,
          style: DefaultHeaderStyles.heading,
        }}
        leftComponent={this.LeftHeader}
        leftContainerStyle={{}}
        placement="center"
        rightComponent={this.RightHeader}
      />
    );
  }
}
