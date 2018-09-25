import React, { Component } from "react";
import { View } from "native-base";
import CardView from "./CardView";
import { SingleCategory } from "../../reducers/category";
import Categories from "../../container/categories/Categories";
type Props = {
  categories: SingleCategory[];
};

export default class CardList extends Component<Props> {
  render() {
    return <View>{this.renderContent()}</View>;
  }

  renderContent() {
    return this.props.categories.map(singleCategory => (
      <CardView category={singleCategory} key={singleCategory.name} />
    ));
  }
}
