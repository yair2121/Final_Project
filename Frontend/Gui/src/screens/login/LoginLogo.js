import React from "react";
import { Image } from "react-native-elements";
import logo from "../../../assets/logo/controllerLogo.png";
import { LoginStyles } from "./LoginStyles";

export default function LoginLogo() {
  return <Image style={LoginStyles.logo} source={logo} />;
}
