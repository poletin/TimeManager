import React, { Component } from "react";
import { View } from "native-base";
import CardView from "./CardView";
type Props = {
  categories: { [key: string]: categories.Single };
  onCategoryStart: (id: string) => void;
  onCategoryPause: (id: string) => void;
};

export default class CardList extends Component<Props> {
  render() {
    return <View>{this.renderContent()}</View>;
  }

  renderContent() {
    console.log(this.props.categories);
    return Object.keys(this.props.categories).map((key: string) => (
      <CardView
        category={this.props.categories[key]}
        key={key}
        id={key}
        onStart={this.props.onCategoryStart}
        onPause={this.props.onCategoryPause}
      />
    ));
  }
}
