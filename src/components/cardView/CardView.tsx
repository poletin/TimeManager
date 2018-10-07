import React, { Component } from "react";
import {
  Card,
  CardItem,
  Text,
  View,
  Icon,
  Button,
  Left,
  Body,
  Right
} from "native-base";
import Timer from "./Timer";
import { formatMinutes } from "../../utils/TimeFunctions";

type Props = {
  category: categories.Single;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onSettings: (id: string) => void;
  onInsights: (id: string) => void;
  onDetails: (id: string) => void;
  id: string;
};
export default class CardView extends Component<Props> {
  getSubtitle() {
    if (this.props.category.isIntervall) {
      if (this.props.category.recordingData.recordingRunning) {
        return "Aktuelle Aufzeichnung";
      } else {
        return `Zeit seit ${this.props.category.lastUpdate}`;
      }
    } else {
      if (this.props.category.recordingData.recordingRunning) {
        return "Aktuelle Aufzeichnung";
      } else {
        return "Zeitkonto";
      }
    }
  }
  renderTopRows() {
    return (
      <View>
        <CardItem header>
          <Left>
            {/* <Icon active name="briefcase" style={{ fontSize: 26, width: 30 }} /> */}
            <Body>
              <Text>{this.props.category.name}</Text>
              <Text note>{this.getSubtitle()}</Text>
            </Body>
          </Left>
        </CardItem>
      </View>
    );
  }
  renderMainContent() {
    if (this.props.category.recordingData.recordingRunning) {
      return (
        <CardItem style={{ backgroundColor: "lightgrey", height: 100 }}>
          <Left>
            <View
              style={{
                flex: 1,
                alignItems: "flex-start"
              }}
            >
              <Timer
                numberOfLines={1}
                style={{ fontSize: 50 }}
                startTime={this.props.category.recordingData.started!}
                baseTime={this.props.category.total}
              />
              <Text>Insgesamt</Text>
            </View>
          </Left>
          <Right
            style={{
              flex: 1
            }}
          >
            <Timer
              numberOfLines={1}
              style={{ fontSize: 50 }}
              startTime={this.props.category.recordingData.started!}
            />
            <Text>Aktuelle Zeit</Text>
          </Right>
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
            <Text style={{ fontSize: 50 }} numberOfLines={1}>
              {formatMinutes(this.props.category.total, undefined, false)}
            </Text>
          </View>
        </CardItem>
      );
    }
  }
  renderButtons() {
    return (
      <CardItem footer>
        <Left>
          <Button
            onPress={() => {
              this.props.onDetails(this.props.id);
            }}
            transparent
          >
            <Text>Details</Text>
          </Button>
        </Left>
        <Right>
          <View style={{ flexDirection: "row" }}>
            <Button
              onPress={() => {
                this.props.onInsights(this.props.id);
              }}
              transparent
              dark
            >
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
          </View>
        </Right>
      </CardItem>
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
