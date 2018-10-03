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
  Footer,
  Text,
  Item,
  Label,
  Picker,
  View
} from "native-base";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import HolidayList from "../container/holiday/HolidayList";
import { MaterialDialog } from "react-native-material-dialog";
import store from "../store";
import { fetchPublicHolidays } from "../actions";

type Props = {
  navigation: NavigationScreenProp<NavigationState>;
};
type State = {
  importHolidays: {
    dialogVisible: boolean;
    state: string;
    year: string;
  };
};
export default class HolidayScreen extends Component<Props, State> {
  static navigationOptions = {
    drawerLabel: "Freie Tage",
    drawerIcon: () => <Icon name="calendar" />
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      importHolidays: {
        dialogVisible: false,
        state: "NATIONAL",
        year: new Date().getFullYear() + ""
      }
    };
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Freie Tage</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>
          <HolidayList />
        </Content>
        <Footer>
          <Button
            vertical
            style={{ flex: 1 }}
            onPress={() =>
              this.setState({
                importHolidays: {
                  ...this.state.importHolidays,
                  dialogVisible: true
                }
              })
            }
          >
            <Icon name="download" />
            <Text>Feiertage importieren</Text>
          </Button>
          <Button
            vertical
            style={{ flex: 1 }}
            onPress={() => {
              this.props.navigation.navigate("NewHoliday");
            }}
          >
            <Icon type="MaterialIcons" name="add" />
            <Text>Freie Tage anlegen</Text>
          </Button>
        </Footer>
        <MaterialDialog
          title="Feiertage Importieren"
          visible={this.state.importHolidays.dialogVisible}
          okLabel="Weiter"
          cancelLabel="Abbrechen"
          onOk={() => {
            store.dispatch(
              fetchPublicHolidays(
                this.state.importHolidays.state,
                this.state.importHolidays.year
              )
            );
            this.setState({
              importHolidays: {
                ...this.state.importHolidays,
                dialogVisible: false
              }
            });
          }}
          onCancel={() => {
            this.setState({
              importHolidays: {
                ...this.state.importHolidays,
                dialogVisible: false
              }
            });
          }}
        >
          <View>
            <Item regular>
              <Label>Bundesland</Label>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                selectedValue={this.state.importHolidays.state}
                onValueChange={(itemValue: string) => {
                  this.setState({
                    importHolidays: {
                      ...this.state.importHolidays,
                      state: itemValue
                    }
                  });
                }}
              >
                <Picker.Item label="Alle" value="NATIONAL" />
                <Picker.Item label="Baden-Württemberg" value="BW" />
                <Picker.Item label="Bayern" value="BY" />
                <Picker.Item label="Berlin" value="BE" />
                <Picker.Item label="Brandenburg" value="BB" />
                <Picker.Item label="Bremen" value="HB" />
                <Picker.Item label="Hamburg" value="HH" />
                <Picker.Item label="Hessen" value="HE" />
                <Picker.Item label="Mecklenburg-Vorpommern" value="MV" />
                <Picker.Item label="Niedersachsen" value="NI" />
                <Picker.Item label="Nordrhein-Westfalen" value="NW" />
                <Picker.Item label="Rheinland Pfalz" value="RP" />
                <Picker.Item label="Saarland" value="SL" />
                <Picker.Item label="Sachsen" value="SN" />
                <Picker.Item label="Sachen-Anhalt	" value="ST" />
                <Picker.Item label="Schleswig Holstein" value="SH" />
                <Picker.Item label="hüringen" value="TH" />
              </Picker>
            </Item>
            <Item regular>
              <Label>Jahr</Label>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                selectedValue={this.state.importHolidays.year}
                onValueChange={(itemValue: string) => {
                  this.setState({
                    importHolidays: {
                      ...this.state.importHolidays,
                      year: itemValue
                    }
                  });
                }}
              >
                {this.getYearPickerItems().map(val => (
                  <Picker.Item label={val} key={val} value={val} />
                ))}
              </Picker>
            </Item>
          </View>
        </MaterialDialog>
      </Container>
    );
  }
  getYearPickerItems() {
    let items: string[] = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 5; i <= currentYear + 10; i++) {
      items.push(i + "");
    }
    return items;
  }
}
