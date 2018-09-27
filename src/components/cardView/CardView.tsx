import React, { Component } from "react";
import { Card, CardItem, Text, View, Icon, Button } from "native-base";
import category from "../../reducers/category";

type Props = {
  category: categories.Single;
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  id: string;
};
export default class CardView extends Component<Props> {
  renderTopRows() {
    return (
      <View>
        <CardItem header>
          <Text style={{}}>{this.props.category.name}</Text>
        </CardItem>
        <View />
        <CardItem style={{ backgroundColor: "lightgrey" }}>
          <Text>Bereits gearbeitet</Text>
        </CardItem>
      </View>
    );
  }
  renderMainContent() {
    return (
      <View>
        <CardItem style={{ backgroundColor: "lightgrey", height: 100 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize: 50 }}> {this.props.category.total}</Text>
          </View>
        </CardItem>
      </View>
    );
  }
  renderButtons() {
    return (
      <View>
        <CardItem footer style={{ justifyContent: "flex-end" }}>
          <Button transparent dark>
            <Icon name="pie" />
          </Button>
          {this.renderRecordingButton()}
          <Button transparent dark>
            <Icon name="settings" />
          </Button>
        </CardItem>
      </View>
    );
  }
  renderRecordingButton() {
    if (this.props.category.recordingRunning) {
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
