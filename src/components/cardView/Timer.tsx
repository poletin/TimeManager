import React, { Component } from "react";
import { Text, NativeBase } from "native-base";
import { formatTimeSince, formatMinutes } from "../../utils/TimeFunctions";

type Props = NativeBase.Text & {
  startTime: Date;
  baseTime?: number;
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
    const timerId = setInterval(this.tick.bind(this), 1000);
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
    if (this.props.baseTime || this.props.baseTime === 0) {
      return formatMinutes(this.props.baseTime, this.props.startTime);
    }
    return formatTimeSince(this.props.startTime);
  }
  render() {
    return <Text {...this.props}>{this.state.content}</Text>;
  }
}
