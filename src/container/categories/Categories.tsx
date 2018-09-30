import * as actions from "../../actions";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { Dispatch } from "redux";
import React, { Component } from "react";
import { View } from "native-base";
import CardView from "../../components/cardView/CardView";
import { NavigationParams, NavigationAction } from "react-navigation";

type Props = {
  categories: { [key: string]: categories.Single };
  onCategoryStart: (id: string) => void;
  onCategoryPause: (id: string) => void;
  toCategorySettings: (id: string) => void;
  toInsights: (id: string) => void;
};
class CardList extends Component<Props> {
  render() {
    return <View>{this.renderContent()}</View>;
  }

  renderContent() {
    return Object.keys(this.props.categories)
      .sort()
      .map((key: string) => (
        <CardView
          category={this.props.categories[key]}
          key={key}
          id={key}
          onStart={this.props.onCategoryStart}
          onPause={this.props.onCategoryPause}
          onSettings={this.props.toCategorySettings}
          onInsights={this.props.toInsights}
        />
      ));
  }
}

function mapStateToProps({ category }: StoreState) {
  return {
    categories: category.categories
  };
}

type AdditionalProps = {
  navigate: (
    routeNameOrOptions: string,
    params?: NavigationParams,
    action?: NavigationAction
  ) => boolean;
};
function mapDispatchToProps(
  dispatch: Dispatch<actions.CategoryAction>,
  { navigate }: AdditionalProps
) {
  return {
    onCategoryStart: (id: string) =>
      dispatch(actions.categoryStartRecording(id)),
    onCategoryPause: (id: string) =>
      dispatch(actions.categoryPauseRecording(id)),
    toCategorySettings: (id: string) => {
      dispatch(actions.selectCategory(id));
      navigate("CategorySettings", { from: "card" });
    },
    toInsights: (id: string) => {
      dispatch(actions.selectCategory(id));
      navigate("CategoryInsights", { from: "card" });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardList);
