import * as actions from "../../actions";
import { connect } from "react-redux";
import CardList from "../../components/cardView/CardList";
import { StoreState } from "../../reducers";
import { Dispatch } from "redux";

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
