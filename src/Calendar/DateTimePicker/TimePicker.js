/* @flow */

import React from 'react';
import SvgIcon from '../../SvgIcon/SvgIcon';
import TimeSelect from './TimeSelect';
import s from './Calendar.scss';
import type { Highlight } from '../helpers';

type Show = 'button' | 'timeSelect';

type Props = {|
  show?: Show,
  date?: Highlight,
  onSetTime?: (time: Highlight) => void
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

  onSubmitTime = (time: Highlight) => {
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
