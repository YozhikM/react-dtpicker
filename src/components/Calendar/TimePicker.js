/* @flow */

import React from 'react';
import SvgIcon from '../SvgIcon';
import TimeSelect from './TimeSelect';
import s from './Calendar.scss';

type Show = 'button' | 'timeSelect';

type Props = {|
  onSetTime?: (time: Date) => void,
  date?: Date,
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

  onClickClock = () => {
    this.setState({ show: 'timeSelect' });
  };

  onSubmitTime = (time: Date) => {
    const { onSetTime } = this.props;
    this.setState({ show: 'button' });
    if (onSetTime) onSetTime(time);
  };

  render() {
    const { date } = this.props;
    const { show } = this.state;

    if (show === 'timeSelect') {
      return <TimeSelect value={date} onSubmit={this.onSubmitTime} />;
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
