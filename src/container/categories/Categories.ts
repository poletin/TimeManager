import * as actions from "../../actions";
import { connect } from "react-redux";
import CardList from "../../components/cardView/CardList";
import { StoreState } from "../../reducers";

export function mapStateToProps({ category }: StoreState) {
  return {
    categories: category.categories
  };
}

export default connect(
  mapStateToProps,
  null
)(CardList);
