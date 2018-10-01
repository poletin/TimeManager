import React, { Component } from "react";
import {
  Container,
  Content,
  Icon,
  Header,
  Left,
  Button,
  Body,
  Title,
  Right,
  Text,
  Footer,
  Fab,
  View,
  ListItem,
  Item,
  Grid,
  Col
} from "native-base";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import CategoryDetailList from "../container/categories/CategoryDetailList";
import { MaterialDialog } from "react-native-material-dialog";
import DateTimePicker from "react-native-modal-datetime-picker";
import { formatDateTime } from "../utils/TimeFunctions";
import ToastService from "../utils/ToastService";
import moment from "moment";
import store from "../store";
import { categoryAddManualTime } from "../actions";
import { StoreState } from "../reducers";

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};
type State = {
  addTimeDialogVisible: boolean;
  isStartPickerVisible: boolean;
  isStopPickerVisible: boolean;
  newTime: {
    startTime?: Date;
    endTime?: Date;
  };
};
export default class CategoryDetailsScreen extends Component<Props, State> {
  componentWillUnMount() {
    this.setState({
      addTimeDialogVisible: false,
      isStartPickerVisible: false,
      isStopPickerVisible: false
    });
  }
  constructor(props: Props) {
    super(props);
    this.state = {
      addTimeDialogVisible: false,
      isStartPickerVisible: false,
      isStopPickerVisible: false,
      newTime: {}
    };
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Details</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <CategoryDetailList />
        </Content>
        <Footer>
          <Fab
            containerStyle={{}}
            style={{ backgroundColor: "#5067FF" }}
            position="bottomRight"
            onPress={() => {
              this.setState({ addTimeDialogVisible: true });
            }}
          >
            <Icon type="MaterialIcons" name="add" />
          </Fab>
        </Footer>
        <MaterialDialog
          title="Manuelle Zeiterfassung"
          visible={this.state.addTimeDialogVisible}
          okLabel="Hinzufügen"
          cancelLabel="Abbrechen"
          onOk={this._checkAndSaveNewTime}
          onCancel={() => this.setState({ addTimeDialogVisible: false })}
        >
          <View style={{ flexDirection: "row" }}>
            <View>
              <Button
                iconRight
                transparent
                onPress={() => {
                  this.setState({ isStartPickerVisible: true });
                }}
              >
                <Text> Startzeit</Text>
                <Icon name="time" />
              </Button>
              <Text>
                {this.state.newTime.startTime
                  ? formatDateTime(this.state.newTime.startTime)
                  : "Nicht gesetzt"}
              </Text>
            </View>
            <View>
              <Button
                iconRight
                transparent
                onPress={() => {
                  this.setState({ isStopPickerVisible: true });
                }}
              >
                <Text> Endzeit</Text>
                <Icon name="time" />
              </Button>
              <Text>
                {this.state.newTime.endTime
                  ? formatDateTime(this.state.newTime.endTime)
                  : "Nicht gesetzt"}
              </Text>
            </View>
          </View>
        </MaterialDialog>
        <DateTimePicker
          mode="datetime"
          date={this.state.newTime.endTime}
          isVisible={this.state.isStartPickerVisible}
          onConfirm={(date: Date) => {
            this.setState({
              newTime: { ...this.state.newTime, startTime: date },
              isStartPickerVisible: false
            });
          }}
          onCancel={this._hideDateTimePicker}
        />

        <DateTimePicker
          mode="datetime"
          date={this.state.newTime.startTime}
          isVisible={this.state.isStopPickerVisible}
          onConfirm={(date: Date) => {
            this.setState({
              newTime: { ...this.state.newTime, endTime: date },
              isStopPickerVisible: false
            });
          }}
          onCancel={this._hideDateTimePicker}
        />
      </Container>
    );
  }
  _hideDateTimePicker = () =>
    this.setState({ isStopPickerVisible: false, isStartPickerVisible: false });
  _checkAndSaveNewTime = () => {
    if (!this.state.newTime.startTime) {
      ToastService.showError("Startzeit nicht gesetzt.");
      return;
    }
    if (!this.state.newTime.endTime) {
      ToastService.showError("Endzeit nicht gesetzt.");
      return;
    }
    if (
      moment(this.state.newTime.endTime).isSameOrBefore(
        this.state.newTime.startTime
      )
    ) {
      ToastService.showError("Endzeit muss nach der Startzeit liegen");
      return;
    }
    const state: StoreState = store.getState();
    store.dispatch(
      categoryAddManualTime(
        state.category.categorySettings.selectedCategory,
        this.state.newTime.startTime,
        this.state.newTime.endTime
      )
    );
    this.setState({
      addTimeDialogVisible: false,
      isStartPickerVisible: false,
      isStopPickerVisible: false,
      newTime: {}
    });
  };
}
