import React, { Component } from "react";
import { Form, Picker, Icon, Item } from "native-base";
type Props = {
  categories: { [key: string]: categories.Single };
  selectedCategory: string;
  handleValueChange: (itemValue: string) => void;
};

export default class CategorySelector extends Component<Props> {
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
