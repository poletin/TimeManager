import React, { Component } from "react";
import { Text, NativeBase } from "native-base";
import { formatTimeSince } from "../../utils/TimeFunctions";

type Props = NativeBase.Text & {
  startTime: Date;
};
type State = {
  timerId: number;
  content: string;
};
export default class Timer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      timerId: 0,
      content: this.getString()
    };
  }
  componentDidMount() {
    let timerId = setInterval(this.tick.bind(this), 1000);
    this.setState({ timerId });
  }
  componentWillUnmount() {
    clearInterval(this.state.timerId);
  }
  tick() {
    this.setState({
      content: this.getString()
    });
  }
  getString() {
    return formatTimeSince(this.props.startTime);
  }
  render() {
    return <Text {...this.props}>{this.state.content}</Text>;
  }
}
