/* @flow */

import React from 'react';
import { addMonths } from 'date-fns';
import SvgIcon from '../SvgIcon';
import CalendarMonth from './CalendarMonth';
import s from './Calendar.scss';

type Props = {
  date: Date,
  activeDates: Date,
  onClickDay?: (date: Date) => void,
  onChangeDate?: (date: Date) => void
};

type State = {
  date: Date
};

class Calendar extends React.Component<Props, State> {
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

  incrementMonth = () => {
    const date = addMonths(this.state.date, 1);
    this.setState({ date });
  };

  decrementMonth = () => {
    const date = addMonths(this.state.date, -1);
    this.setState({ date });
  };

  render() {
    const { date } = this.state;
    return (
      <div>
        <div className={s.button_container}>
          <button onClick={this.decrementMonth}>
            <SvgIcon file="arrow-left" />
          </button>
          <button onClick={this.incrementMonth}>
            <SvgIcon file="arrow-right" />
          </button>
        </div>

        <div className={s.calendar_container}>
          <CalendarMonth {...this.props} date={date} />
          <CalendarMonth
            {...this.props}
            date={addMonths(date, 1)}
            onChangeDate={date => {
              const { onChangeDate } = this.props;
              if (onChangeDate) onChangeDate(addMonths(date, -1));
            }}
          />
        </div>
      </div>
    );
  }
}

export default Calendar;
