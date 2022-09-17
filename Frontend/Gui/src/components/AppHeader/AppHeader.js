import React, { Component, useEffect, useState } from "react";
import { LogBox, StyleSheet, View } from "react-native";
import { Header, Icon } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_KEY } from "../../constants/keys";
import { HeaderStyles } from "./HeaderStyles";
import { CellState } from "../../games/crossword/Components/Cell/cellStates";
import { COLORS } from "../../constants/colors";
export default class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      navigation: props.navigation,
    };
  }

  LeftHeader = () => {
    return (
      <Icon
        name="arrow-back"
        color={COLORS.white}
        onPress={() => {
          this.state.navigation.canGoBack() && this.state.navigation.goBack();
        }}
      />
    );
  };
  RightHeader = () => {
    return (
      <FontAwesome
        rendered="#{false}"
        name="sign-out"
        size={24}
        color={COLORS.white}
        onPress={() => {
          this.state.navigation.navigate("LoginScreen", {}); //TODO: change this back before merging crossword
        }}
      />
    );
  };
  render() {
    return (
      <Header
        containerStyle={HeaderStyles.container}
        backgroundColor="black"
        backgroundImageStyle={{ flex: 1 }}
        barStyle="default"
        centerComponent={{
          text: this.state.playerName,
          style: HeaderStyles.heading,
        }}
        leftComponent={this.LeftHeader}
        leftContainerStyle={{}}
        placement="center"
        rightComponent={this.RightHeader}
      />
    );
  }
}
