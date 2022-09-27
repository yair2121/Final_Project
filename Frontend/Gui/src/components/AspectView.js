/*
This tool allows to use aspect ratio on the web.
 */

import * as React from "react";
import { View, StyleSheet, Platform } from "react-native";

export default function AspectView(props) {
  const [layout, setLayout] = React.useState(null);

  const { aspectRatio = 1, ...inputStyle } =
    StyleSheet.flatten(props.style) || {};
  const style = [inputStyle, { aspectRatio }];
  if (Platform.OS === "web") {
    if (layout) {
      const { width = 0, height = 0 } = layout;
      if (width === 0) {
        style.push({ width: height * aspectRatio, height });
      } else {
        style.push({ width, height: width * aspectRatio });
      }
    }
  }

  return (
    <View
      {...props}
      style={style}
      onLayout={({ nativeEvent: { layout } }) => setLayout(layout)}
    />
  );
}
