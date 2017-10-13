/* @flow */

import React from 'react';
import SvgIcon from '../SvgIcon';
import TimeSelect from './TimeSelect';
import s from './Calendar.scss';

type Show = 'button' | 'timeSelect'

type Props = {|
  onSetTime?: (time: Date) => void,
  activeDates?: Date,
  date?: Date,
  onSubmit?: any => void,
  show?: Show
|};

type State = {|
  show: 'button' | 'timeSelect'
|};

class TimePicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      show: this.props.show || 'button'
    };
  }

  onSetTime = (time: Date) => {
    const { onSetTime } = this.props;
    if (onSetTime) onSetTime(time);
  };

  onClickClock = () => {
    this.setState({ show: 'timeSelect' });
  };

  onSubmitTime = () => {
    this.setState({ show: 'button' });
  };

  render() {
    const { date } = this.props;
    const { show } = this.state;

    if (show === 'timeSelect') {
      return (
        <TimeSelect
          value={date}
          onSubmit={this.onSubmitTime}
          onSetTime={this.onSetTime}
        />
      );
    }

    return (
      <div className={s.time_picker}>
        <button onClick={this.onClickClock}>
          <SvgIcon file="clock" />
        </button>
      </div>
    );
  }
}

export default TimePicker;
