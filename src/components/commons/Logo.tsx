import React, { Component } from "react";
import { Image, View, StyleSheet } from "react-native";

type Props = {
  width?: number | string | undefined;
  height?: number | string | undefined;
};
export default class Logo extends Component<Props> {
  render() {
    return (
      <View>
        <Image
          resizeMode="contain"
          source={require("../../assets/logo.png")}
          style={[
            styles.drawerCover,
            this.props.width ? { width: this.props.width } : {},
            this.props.height ? { height: this.props.height } : {}
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerCover: {
    width: undefined,
    height: 150,
    marginBottom: 10,
    marginTop: 10
  }
});
