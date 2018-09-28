import React, { Component } from "react";
import { Text, View } from "native-base";
import CategorySettingsForm from "../../../forms/CategorySettingsForm";
type Props = {
  category: categories.Single;
  categoryId: string;
  onSubmit: (categoryId: string, data: categories.SingleSettings) => void;
};
export default class CategorySettings extends Component<Props> {
  render() {
    return (
      <View>
        <CategorySettingsForm
          initialValues={this.props.category}
          onSubmit={data => {
            this.props.onSubmit(this.props.categoryId, data);
          }}
        />
      </View>
    );
  }
}
