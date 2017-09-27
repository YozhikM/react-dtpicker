/* @flow */

import React from 'react';
import CalendarMonth from './CalendarMonth';
import CalendarTimePicker from './CalendarTimePicker';
import s from './Calendar.scss';
import { format } from 'date-fns';

type Props = {
  date: Date,
  activeDates: Date,
  time?: boolean,
  leftArrow?: boolean,
  rightArrow?: boolean,
  onClickDay?: (date: Date) => void,
  onChangeDate?: (date: Date) => void
};

type State = {
  date: Date
};

class CalendarSingle extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      date: this.props.date
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

  render() {
    const { date } = this.state;
    const { time, activeDates } = this.props;
    return (
      <div className={s.calendar_container}>
        <p>{format((this.props.date), 'hh:mm dd/MM/YY')}</p>
        <CalendarMonth {...this.props} date={date} leftArrow rightArrow />

        {time && (
          <CalendarTimePicker
            activeDates={activeDates}
            date={date}
            onChangeDate={this.onChangeDate}
          />
        )}
      </div>
    );
  }
}

export default CalendarSingle;
