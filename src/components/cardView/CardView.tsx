import React, { Component } from "react";
import { Card, CardItem, Text, View, Icon, Button } from "native-base";
import category from "../../reducers/category";
import Timer from "./Timer";
import moment from "moment";
import { formatMinutes } from "../../utils/TimeFunctions";

type Props = {
  category: categories.Single;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onSettings: (id: string) => void;
  id: string;
};
export default class CardView extends Component<Props> {
  renderTopRows() {
    return (
      <View>
        <CardItem header>
          <Text style={{}}>{this.props.category.name}</Text>
        </CardItem>
        <CardItem style={{ backgroundColor: "lightgrey" }}>
          <Text>Bereits gearbeitet</Text>
        </CardItem>
      </View>
    );
  }
  renderMainContent() {
    if (this.props.category.recordingData.recordingRunning) {
      return (
        <CardItem style={{ backgroundColor: "lightgrey", height: 100 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Timer
              style={{ fontSize: 50 }}
              startTime={this.props.category.recordingData.started!}
            />
          </View>
        </CardItem>
      );
    } else {
      return (
        <CardItem style={{ backgroundColor: "lightgrey", height: 100 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize: 50 }}>
              {formatMinutes(this.props.category.total)}
            </Text>
          </View>
        </CardItem>
      );
    }
  }
  renderButtons() {
    return (
      <View>
        <CardItem footer style={{ justifyContent: "flex-end" }}>
          <Button transparent dark>
            <Icon name="pie" />
          </Button>
          {this.renderRecordingButton()}
          <Button
            onPress={() => {
              this.props.onSettings(this.props.id);
            }}
            transparent
            dark
          >
            <Icon name="settings" />
          </Button>
        </CardItem>
      </View>
    );
  }
  renderRecordingButton() {
    if (this.props.category.recordingData.recordingRunning) {
      return (
        <Button
          transparent
          dark
          onPress={() => {
            this.props.onPause(this.props.id);
          }}
        >
          <Icon name="pause" />
        </Button>
      );
    }
    return (
      <Button
        transparent
        dark
        onPress={() => {
          this.props.onStart(this.props.id);
        }}
      >
        <Icon name="play" />
      </Button>
    );
  }

  render() {
    return (
      <Card>
        {this.renderTopRows()}
        {this.renderMainContent()}
        {this.renderButtons()}
      </Card>
    );
  }
}
