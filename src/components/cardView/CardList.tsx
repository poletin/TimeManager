import React, { Component } from "react";
import { View } from "native-base";
import CardView from "./CardView";
import Categories from "../../container/categories/Categories";
type Props = {
  categories: categories.Single[];
  onCategoryStart: (id: string) => void;
  onCategoryPause: (id: string) => void;
};

export default class CardList extends Component<Props> {
  render() {
    return <View>{this.renderContent()}</View>;
  }

  renderContent() {
    return this.props.categories.map(singleCategory => (
      <CardView
        category={singleCategory}
        key={singleCategory.name}
        onStart={this.props.onCategoryStart}
        onPause={this.props.onCategoryPause}
      />
    ));
  }
}
