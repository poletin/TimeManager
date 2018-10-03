import {
  View,
  Text,
  Icon,
  Fab,
  ListItem,
  Button,
  Label,
  Input,
  Left,
  Right,
  Switch,
  Item
} from "native-base";
import React, { Component } from "react";
import store from "../store";
import moment from "moment";

import { formatDate } from "../utils/TimeFunctions";
import DateTimePicker from "react-native-modal-datetime-picker";
import ToastService from "../utils/ToastService";
type Props = {
  onSubmit: (data: holidays.Holiday) => void;
};

type State = {
  isStartPickerVisible: boolean;
  isStopPickerVisible: boolean;
  isDayDatePickerVisible: boolean;
  newHoliday: holidays.Holiday;
};
export default class NewHolidayComponent extends Component<Props, State> {
  componentWillUnMount() {
    this.setState({
      isStartPickerVisible: false,
      isStopPickerVisible: false
    });
  }
  constructor(props: Props) {
    super(props);
    this.state = {
      isStartPickerVisible: false,
      isStopPickerVisible: false,
      isDayDatePickerVisible: false,
      newHoliday: {
        name: "",
        isFullDay: true,
        startDay: new Date(),
        endDay: new Date(),
        hours: 0
      }
    };
  }
  _hideDateTimePicker = () =>
    this.setState({
      isStopPickerVisible: false,
      isStartPickerVisible: false,
      isDayDatePickerVisible: false
    });
  render() {
    const state = store.getState();
    return (
      <View style={{ flex: 1 }}>
        <ListItem>
          <Label>Name</Label>
          <Input
            value={this.state.newHoliday.name}
            onChangeText={(name: string) => {
              this.setState({
                newHoliday: { ...this.state.newHoliday, name: name }
              });
            }}
          />
        </ListItem>

        <ListItem>
          <Left>
            <Text>Ganzer Tag?</Text>
          </Left>
          <Right>
            <Switch
              value={this.state.newHoliday.isFullDay}
              onValueChange={(isFullDay: boolean) => {
                this.setState({
                  newHoliday: { ...this.state.newHoliday, isFullDay: isFullDay }
                });
              }}
            />
          </Right>
        </ListItem>
        <ListItem>
          {this.state.newHoliday.isFullDay ? (
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View style={{ flexDirection: "column" }}>
                <Button
                  iconRight
                  transparent
                  onPress={() => {
                    this.setState({ isStartPickerVisible: true });
                  }}
                >
                  <Text> Starttag</Text>
                  <Icon name="time" />
                </Button>
                <Text>
                  {this.state.newHoliday.startDay
                    ? formatDate(this.state.newHoliday.startDay)
                    : "Nicht gesetzt"}
                </Text>
              </View>
              <View style={{ flexDirection: "column" }}>
                <Button
                  iconRight
                  transparent
                  onPress={() => {
                    this.setState({ isStopPickerVisible: true });
                  }}
                >
                  <Text> Endtag</Text>
                  <Icon name="time" />
                </Button>
                <Text>
                  {this.state.newHoliday.endDay
                    ? formatDate(this.state.newHoliday.endDay)
                    : "Nicht gesetzt"}
                </Text>
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <Button
                  iconRight
                  transparent
                  onPress={() => {
                    this.setState({ isDayDatePickerVisible: true });
                  }}
                >
                  <Text> Tag</Text>
                  <Icon name="time" />
                </Button>
                <Text>
                  {this.state.newHoliday.endDay
                    ? formatDate(this.state.newHoliday.endDay)
                    : "Nicht gesetzt"}
                </Text>
              </View>
              <Item stackedLabel style={{ flexDirection: "row" }}>
                <Label>Stunden</Label>
                <Input
                  keyboardType="numeric"
                  value={
                    this.state.newHoliday.hours
                      ? this.state.newHoliday.hours + ""
                      : ""
                  }
                  onChangeText={(hours: string) => {
                    console.log(hours);
                    this.setState({
                      newHoliday: {
                        ...this.state.newHoliday,
                        hours: hours ? parseInt(hours) : 0
                      }
                    });
                  }}
                />
              </Item>
            </View>
          )}
        </ListItem>

        <DateTimePicker
          mode="date"
          date={this.state.newHoliday.endDay}
          isVisible={this.state.isStartPickerVisible}
          onConfirm={(date: Date) => {
            this.setState({
              newHoliday: { ...this.state.newHoliday, startDay: date },
              isStartPickerVisible: false
            });
          }}
          onCancel={this._hideDateTimePicker}
        />

        <DateTimePicker
          mode="date"
          date={this.state.newHoliday.startDay}
          isVisible={this.state.isStopPickerVisible}
          onConfirm={(date: Date) => {
            this.setState({
              newHoliday: { ...this.state.newHoliday, endDay: date },
              isStopPickerVisible: false
            });
          }}
          onCancel={this._hideDateTimePicker}
        />
        <DateTimePicker
          mode="date"
          isVisible={this.state.isDayDatePickerVisible}
          onConfirm={(date: Date) => {
            this.setState({
              newHoliday: {
                ...this.state.newHoliday,
                startDay: date,
                endDay: date
              },
              isDayDatePickerVisible: false
            });
          }}
          onCancel={this._hideDateTimePicker}
        />

        <Fab
          containerStyle={{}}
          style={{ backgroundColor: "#5067FF" }}
          position="bottomRight"
          onPress={() => {
            if (this.isValid()) {
              console.log("SubmitForm", this.state.newHoliday.name);
              this.props.onSubmit(this.state.newHoliday);
            }
          }}
        >
          <Icon type="MaterialIcons" name="save" />
        </Fab>
      </View>
    );
  }
  isValid = () => {
    if (!this.state.newHoliday.name) {
      ToastService.showError("Name nicht gesetzt.");
      return false;
    }

    if (moment().isSameOrAfter(this.state.newHoliday.startDay)) {
      ToastService.showError("Abwesenheit nur in der Zukunft.");
      return false;
    }

    if (this.state.newHoliday.isFullDay) {
      if (!this.state.newHoliday.startDay) {
        ToastService.showError("Starttag nicht gesetzt.");
        return false;
      }
      if (!this.state.newHoliday.endDay) {
        ToastService.showError("Endtag nicht gesetzt.");
        return false;
      }
      const startMoment = moment(this.state.newHoliday.startDay);
      const endMoment = moment(this.state.newHoliday.endDay);
      if (endMoment.isBefore(startMoment)) {
        ToastService.showError("Endtag nicht vor Starttag.");
        return false;
      }
    } else {
      if (!(this.state.newHoliday.startDay && this.state.newHoliday.endDay)) {
        ToastService.showError("Datum nicht gesetzt.");
        return false;
      }
      if (!this.state.newHoliday.hours) {
        ToastService.showError("Stundenzahl nicht gesetzt.");
        return false;
      }
      if (this.state.newHoliday.hours && this.state.newHoliday.hours >= 24) {
        ToastService.showError("Stundenzahl nicht 24h oder mehr.");
        return false;
      }
    }
    return true;
  };
}
