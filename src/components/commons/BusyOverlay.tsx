import React, { Component } from "react";
import { Text, View, Spinner } from "native-base";
import { StyleSheet, Modal } from "react-native";

type Props = {
  cancelable?: boolean;
  text?: string;
  spinnerColor?: string;
  overlayColor?: string;
};

export default class BusyOverlay extends Component<Props> {
  close() {
    this.setState({ visible: false });
  }

  _handleOnRequestClose() {
    if (this.props.cancelable) {
      this.close();
    }
  }

  _renderDefaultContent() {
    return (
      <View style={styles.background}>
        <Spinner
          color={this.props.spinnerColor || "green"}
          size={"large"}
          style={{ flex: 1 }}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.textContent]}>{this.props.text}</Text>
        </View>
      </View>
    );
  }

  _renderSpinner() {
    const spinner = (
      <View
        style={[
          styles.container,
          { backgroundColor: this.props.overlayColor || "rgba(0, 0, 0, 0.5)" }
        ]}
        key={`spinner_${Date.now()}`}
      >
        {this.props.children
          ? this.props.children
          : this._renderDefaultContent()}
      </View>
    );

    return (
      <Modal
        animationType="fade"
        onRequestClose={() => this._handleOnRequestClose()}
        supportedOrientations={["landscape", "portrait"]}
        transparent
        visible={true}
      >
        {spinner}
      </Modal>
    );
  }

  render() {
    return this._renderSpinner();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute"
  },
  textContent: {
    top: 80,
    height: 50,
    fontSize: 20,
    fontWeight: "bold"
  }
});
