import React, { Component } from "react";
import { Text, ListItem, Left, Right, H3, View } from "native-base";
import { formatMinutes } from "../../../utils/TimeFunctions";
import { StyleSheet } from "react-native";

type Props = times.DisplayTime & {
  max: number;
};
export default class InsightListItem extends Component<Props> {
  render() {
    return (
      <ListItem>
        <View
          style={[
            styles.bar,
            { width: `${(this.props.minutes / this.props.max) * 100}%` }
          ]}
        />
        <Left style={{ marginLeft: 10 }}>
          <H3>{this.props.date}</H3>
        </Left>
        <Right style={{ marginRight: 10 }}>
          <Text>{formatMinutes(this.props.minutes)}</Text>
        </Right>
      </ListItem>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: "lightgray",
    position: "absolute",
    width: "100%",
    height: "100%",
    paddingTop: 20,
    paddingBottom: 20
  }
});
