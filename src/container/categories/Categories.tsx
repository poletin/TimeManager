import * as actions from "../../actions";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { Dispatch } from "redux";
import React, { Component } from "react";
import { View } from "native-base";
import CardView from "../../components/cardView/CardView";

type Props = {
  categories: { [key: string]: categories.Single };
  onCategoryStart: (id: string) => void;
  onCategoryPause: (id: string) => void;
};
class CardList extends Component<Props> {
  render() {
    return <View>{this.renderContent()}</View>;
  }

  renderContent() {
    console.log(this.props.categories);
    return Object.keys(this.props.categories)
      .sort()
      .map((key: string) => (
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

function mapStateToProps({ category }: StoreState) {
  return {
    categories: category.categories
  };
}

function mapDispatchToProps(dispatch: Dispatch<actions.CategoryAction>) {
  return {
    onCategoryStart: (id: string) =>
      dispatch(actions.categoryStartRecording(id)),
    onCategoryPause: (id: string) =>
      dispatch(actions.categoryPauseRecording(id))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardList);
