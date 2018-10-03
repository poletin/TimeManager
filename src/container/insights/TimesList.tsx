import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import * as actions from "../../actions";
import { ListItem, Body, Left, Right, H1, H2, List, H3 } from "native-base";
import { Dispatch } from "redux";
import { changeCategorySettings, categoryFetchTimes } from "../../actions";
import moment from "moment";
import { formatMinutes } from "../../utils/TimeFunctions";
import InsightListItem from "../../components/categories/insights/InsightListItem";
import BusyOverlay from "../../components/commons/BusyOverlay";

type Props = {
  categoryId: string;
  times: times.DisplayTime[];
  maxTime: number;
  loadData: (categoryId: string) => void;
  isLoading: boolean;
};
class InsightsList extends Component<Props> {
  componentWillMount() {
    if (this.props.times.length === 0) {
      this.props.loadData(this.props.categoryId);
    }
  }
  render() {
    return (
      <View>
        {this.props.isLoading ? <BusyOverlay /> : undefined}
        <List>
          {this.props.times.length > 0 ? (
            this.props.times.map(time => (
              <InsightListItem
                max={this.props.maxTime}
                {...time}
                key={time.date}
              />
            ))
          ) : (
            <ListItem>
              <Text>No Data</Text>
            </ListItem>
          )}
        </List>
      </View>
    );
  }
}
function mapStateToProps({
  category: { categorySettings, categories, isLoading }
}: StoreState) {
  const times = categories[categorySettings.selectedCategory].times;
  const groupedTimes: { [key: string]: times.DisplayTime } = times
    ? times.reduce((obj: { [key: string]: times.DisplayTime }, curr) => {
        const date = moment(curr.started).format("DD.MM.YYYY");
        if (!obj[date]) {
          obj[date] = {
            date: date,
            minutes: curr.minutes
          };
        } else {
          obj[date].minutes += curr.minutes;
        }
        return obj;
      }, {})
    : {};
  return {
    times: Object.keys(groupedTimes).map(key => groupedTimes[key]),
    maxTime: Object.keys(groupedTimes)
      .map(key => groupedTimes[key].minutes)
      .reduce((prev, cur) => Math.max(prev, cur), 0),
    categoryId: categorySettings.selectedCategory,
    isLoading
  };
}

function mapDispatchToProps(dispatch: Dispatch<actions.CategoryAction>) {
  return {
    loadData: (categoryId: string) => dispatch(categoryFetchTimes(categoryId))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsightsList);
