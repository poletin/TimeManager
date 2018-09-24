import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

export default class HorizontalLine extends Component {
  render() {
    return <View style={styles.lineStyle} />;
  }
}

const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 0.5,
    borderColor: "black",
    margin: 10
  }
});
