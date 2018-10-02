import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import React, { Component } from "react";
import { View, Text, ListItem, Left, Right, Content, Body } from "native-base";
import moment from "moment";

type Props = {
  holidays: holidays.HolidayMap;
};
class HolidayList extends Component<Props> {
  render() {
    return <View style={{ flex: 1 }}>{this.renderContent()}</View>;
  }

  renderContent() {
    return Object.keys(this.props.holidays)
      .sort()
      .map((key: string) => (
        <ListItem>
          <Left
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-start"
            }}
          >
            <Text>
              {moment(this.props.holidays[key].startDay).format("DD.MM.YYYY")}
            </Text>
            <Text>
              {this.props.holidays[key].isFullDay
                ? moment(this.props.holidays[key].endDay).format("DD.MM.YYYY")
                : this.props.holidays[key].hours + "h"}
            </Text>
          </Left>
          <Body />
          <Right style={{ flex: 1 }}>
            <Text style={{ color: "grey" }}>
              {this.props.holidays[key].name}
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
