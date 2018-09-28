import React, { Component } from "react";
import { Text, View } from "native-base";
import SettingsForm from "./SettingsForm";
type Props = {
  category: categories.Single;
  categoryId: string;
  onSubmit: (categoryId: string, data: categories.SingleSettings) => void;
};
export default class CategorySettings extends Component<Props> {
  render() {
    return (
      <View>
        <SettingsForm
          initialValues={this.props.category}
          onSubmit={data => {
            this.props.onSubmit(this.props.categoryId, data);
          }}
        />
      </View>
    );
  }
}
