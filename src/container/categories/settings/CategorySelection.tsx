import { connect } from "react-redux";
import { StoreState } from "../../../reducers";
import { Dispatch } from "redux";
import * as actions from "../../../actions";
import React, { Component } from "react";
import { Form, Picker, Item } from "native-base";
import { selectCategory } from "../../../actions";

type Props = {
  categories: { [key: string]: categories.Single };
  selectedCategory: string;
  handleValueChange: (itemValue: string) => void;
};
class CategorySelector extends Component<Props> {
  render() {
    return (
      <Form>
        <Item>
          <Picker
            mode="dropdown"
            style={{ width: undefined }}
            selectedValue={this.props.selectedCategory}
            onValueChange={this.props.handleValueChange}
          >
            {this.renderCategoryItems()}
          </Picker>
        </Item>
      </Form>
    );
  }

  renderCategoryItems() {
    return Object.keys(this.props.categories).map((key: string) => (
      <Picker.Item
        label={this.props.categories[key].name}
        value={key}
        key={key}
      />
    ));
  }
}

function mapStateToProps({
  category: { categorySettings, categories }
}: StoreState) {
  return {
    categories,
    selectedCategory: categorySettings.selectedCategory
  };
}

function mapDispatchToProps(dispatch: Dispatch<actions.CategoryAction>) {
  return {
    handleValueChange: (itemValue: string) =>
      dispatch(selectCategory(itemValue))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategorySelector);
