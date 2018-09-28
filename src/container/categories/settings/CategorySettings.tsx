import { connect } from "react-redux";
import { StoreState } from "../../../reducers";
import { Dispatch } from "redux";
import * as actions from "../../../actions";
import { changeCategorySettings } from "../../../actions";
import React, { Component } from "react";
import { View } from "native-base";
import CategorySettingsForm from "../../../forms/CategorySettingsForm";

type Props = {
  category: categories.Single;
  categoryId: string;
  onSubmit: (categoryId: string, data: categories.SingleSettings) => void;
};
class CategorySettings extends Component<Props> {
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

function mapStateToProps({
  category: { categorySettings, categories }
}: StoreState) {
  return {
    category: categories[categorySettings.selectedCategory],
    categoryId: categorySettings.selectedCategory
  };
}

function mapDispatchToProps(dispatch: Dispatch<actions.CategoryAction>) {
  return {
    onSubmit: (categoryId: string, data: categories.SingleSettings) =>
      dispatch(changeCategorySettings(categoryId, data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategorySettings);
