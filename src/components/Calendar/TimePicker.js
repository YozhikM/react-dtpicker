/* @flow */

import React from 'react';
import SvgIcon from '../SvgIcon';
import TimeSelect from '../DateTimePicker/TimeSelect';
import s from './Calendar.scss';

type Props = {
  onChangeDate?: (date: Date) => void,
  activeDates: Date,
  date: Date,
  onSubmit?: any => void
};

type State = {
  date: Date,
  show: 'button' | 'timePicker'
};

class TimePicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      date: this.props.date,
      show: 'button'
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.date !== this.props.date) {
      this.setState({ date: nextProps.date });
    }
  }

  onChangeDate = () => {
    const { onChangeDate } = this.props;
    if (onChangeDate) onChangeDate(this.state.date);
  };

  onClickClock = () => {
    this.setState({ show: 'timePicker' });
  };

  onSubmitTime = () => {
    this.setState({ show: 'button' })
  };

  render() {
    const { show, date } = this.state;
    if (show === 'timePicker') {
      return <TimeSelect {...this.props} value={date} onSubmit={this.onSubmitTime} onChange={this.onChangeDate} />;
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
