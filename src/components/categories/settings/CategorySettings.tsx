import React, { Component } from "react";
import { Text, View } from "native-base";
type Props = {
  category: categories.Single;
  categoryId: string;
};
export default class CategorySettings extends Component<Props> {
  render() {
    return (
      <View>
        <Text> {this.props.category.name} </Text>
      </View>
    );
  }
}
