import React, { Component } from "react";

import HEADERS, { HEADER_TYPES } from "./HeaderTypes";

import DefaultHeader from "./headersComponents/DefaultHeader";
import { View } from "react-native";
export default class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      navigation: props.navigation,
      route: props.route,
      headerView: this.getHeaderView(props),
    };
  }

  getHeaderView = (props) => {
    let headerView = HEADERS[props.route.params.header];
    if (headerView === undefined) {
      headerView = HEADERS[HEADER_TYPES.DEFAULT];
    }
    return headerView;
  };

  render() {
    return (
      <this.state.headerView
        navigation={this.state.navigation}
        route={this.state.route}
      />
    );
  }
}
