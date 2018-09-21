import React, { Component } from "react";
import {
  Container,
  Content
} from "native-base";
import Login from "../container/user/Login";

export default class LoginScreen extends Component {
  
  render() {
    return (
      <Container>
        <Content padder>
            <Login/>
        </Content>
      </Container>
    );
  }
}

    