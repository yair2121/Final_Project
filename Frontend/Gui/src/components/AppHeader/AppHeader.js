import React, { Component, useEffect, useState } from "react";

import { Header } from "react-native-elements";

// import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_KEY } from "../../constants/keys";

import { COLORS } from "../../constants/colors";
import { HEADER_TYPES } from "./HeaderTypes";
import DefaultHeader from "./headersComponents/DefaultHeader";
import { View } from "react-native";
export default class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      navigation: props.navigation,
      route: props.route,
      headerType: HEADER_TYPES.DEFAULT,
    };
  }

  // LeftHeader = () => {
  //   return (
  //     <Icon
  //       name="arrow-back"
  //       color={COLORS.white}
  //       onPress={() => {
  //         this.state.navigation.canGoBack() && this.state.navigation.goBack();
  //       }}
  //     />
  //   );
  // };
  // RightHeader = () => {
  //   return (
  //     <FontAwesome
  //       rendered="#{false}"
  //       name="sign-out"
  //       size={24}
  //       color={COLORS.white}
  //       onPress={() => {
  //         this.state.navigation.navigate("LoginScreen", {}); //TODO: change this back before merging crossword
  //       }}
  //     />
  //   );
  // };
  render() {
    return (
      <View>
        {this.state.headerType === HEADER_TYPES.DEFAULT && (
          <DefaultHeader navigation={this.state.navigation} />
        )}
      </View>

      // <Header
      //   containerStyle={HeaderStyles.container}
      //   backgroundColor="black"
      //   backgroundImageStyle={{ flex: 1 }}
      //   barStyle="default"
      //   centerComponent={{
      //     text: this.state.playerName,
      //     style: HeaderStyles.heading,
      //   }}
      //   leftComponent={this.LeftHeader}
      //   leftContainerStyle={{}}
      //   placement="center"
      //   rightComponent={this.RightHeader}
      // />
    );
  }
}
