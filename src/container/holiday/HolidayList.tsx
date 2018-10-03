import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import React, { Component } from "react";
import { View, Text, ListItem, Left, Right, Body, List } from "native-base";
import moment from "moment";

type Props = {
  holidays: holidays.HolidayMap;
};
class HolidayList extends Component<Props> {
  render() {
    return (
      <View>
        <List>{this.renderContent()}</List>
      </View>
    );
  }

  renderContent() {
    return Object.keys(this.props.holidays)
      .map((key: string) => ({ key: key, holiday: this.props.holidays[key] }))
      .sort(
        (a, b) => a.holiday.startDay.getTime() - b.holiday.startDay.getTime()
      )
      .map(({ holiday, key }) => (
        <ListItem key={key}>
          <Left
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-start"
            }}
          >
            <Text>{moment(holiday.startDay).format("DD.MM.YYYY")}</Text>
            <Text>
              {holiday.isFullDay
                ? moment(holiday.endDay).format("DD.MM.YYYY")
                : holiday.hours + "h"}
            </Text>
          </Left>
          <Body />
          <Right style={{ flex: 1 }}>
            <Text style={{ color: "grey", textAlign: "right" }}>
              {holiday.name}
            </Text>
          </Right>
        </ListItem>
      ));
  }
}

function mapStateToProps({ holiday }: StoreState) {
  return {
    holidays: holiday.holidays
  };
}

export default connect(
  mapStateToProps,
  null
)(HolidayList);
