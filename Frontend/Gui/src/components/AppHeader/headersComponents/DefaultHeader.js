import React, { Component } from "react";
import { Header, Icon } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
// import { USER_KEY } from "../../../constants/keys";
// import { HeaderStyles } from "../HeaderStyles";

import { COLORS } from "../../../constants/colors";
import { HeaderStyles } from "../HeaderStyles";
export default class DefaultHeader extends Component {
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
          this.state.navigation.navigate("LoginScreen", {});
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
