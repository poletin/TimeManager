import { connect } from "react-redux";
import { StoreState } from "../../../reducers";
import CategorySelector from "../../../components/categories/settings/CategorySelector";
import { Dispatch } from "redux";
import * as actions from "../../../actions/";
import { selectCategory } from "../../../actions/";

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
