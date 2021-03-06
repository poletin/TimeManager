import React, { Component } from "react";
import { View, Text, List, ListItem, Left, H2, H1, Right } from "native-base";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { formatMinutes, formatDateTime } from "../../utils/TimeFunctions";
import { Dispatch } from "redux";
import { CategoryAction, categoryFetchTimes } from "../../actions";
import BusyOverlay from "../../components/commons/BusyOverlay";

type Props = {
  categoryId: string;
  times: times.Single[];
  loadData: (categoryId: string) => void;
  isLoading: boolean;
};

export class CategoryDetailList extends Component<Props> {
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
          <ListItem>
            <Left>
              <H1>Startzeit</H1>
            </Left>
            <Right>
              <H1>Dauer</H1>
            </Right>
          </ListItem>
          {this.props.times.length > 0 ? (
            this.props.times
              .sort((a, b) => a.started.getTime() - b.started.getTime())
              .map(time => (
                <ListItem key={time.started.toISOString()}>
                  <Left>
                    <H2>{formatDateTime(time.started)}</H2>
                  </Left>
                  <Right>
                    <H2>{formatMinutes(time.minutes)}</H2>
                  </Right>
                </ListItem>
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
  const times = categories[categorySettings.selectedCategory].times || [];
  return {
    times,
    categoryId: categorySettings.selectedCategory,
    isLoading
  };
}

function mapDispatchToProps(dispatch: Dispatch<CategoryAction>) {
  return {
    loadData: (categoryId: string) => dispatch(categoryFetchTimes(categoryId))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryDetailList);
