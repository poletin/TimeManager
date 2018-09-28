import { connect } from "react-redux";
import { StoreState } from "../../../reducers";
import CategorySettings from "../../../components/categories/settings/CategorySettings";
import { Dispatch } from "redux";
import * as actions from "../../../actions/";
import { selectCategory, changeCategorySettings } from "../../../actions/";

function mapStateToProps({
  category: { categorySettings, categories }
}: StoreState) {
  return {
    category: categories[categorySettings.selectedCategory],
    categoryId: categorySettings.selectedCategory
  };
}

function mapDispatchToProps(dispatch: Dispatch<actions.CategoryAction>) {
  return {
    onSubmit: (categoryId: string, data: categories.SingleSettings) =>
      dispatch(changeCategorySettings(categoryId, data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategorySettings);
