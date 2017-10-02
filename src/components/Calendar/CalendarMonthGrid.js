/* @flow */

import React from 'react';
import s from './Calendar.scss';
import Day from './Day/Day';
import { startOfMonth, endOfMonth, eachDay, getDay, format } from 'date-fns';

export type Props = {
  date: Date,
  activeDates: Date,
  onClickDay?: (date: Date) => void,
  onClickMonth?: (date: Date) => void
};

type State = {
  weeks: Array<any>
};

class CalendarMonthGrid extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      weeks: []
    };
  }

  componentWillMount() {
    const { date } = this.props;
    this.setState({ weeks: this.createMonth(date) });
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.date !== this.props.date) {
      this.setState({ weeks: this.createMonth(nextProps.date) });
    }
  }

  createMonth = (date: Date) => {
    let startDateOfMonth = startOfMonth(date);
    let endDateOfMonth = endOfMonth(date);
    let currentMonth = eachDay(startDateOfMonth, endDateOfMonth);
    let firstOfMonthDay = getDay(startDateOfMonth);
    let beginOfMonth;
    firstOfMonthDay === 0 ? (beginOfMonth = 1) : (beginOfMonth = 8 - firstOfMonthDay);
    let firstWeek = currentMonth.slice(0, beginOfMonth);
    let secondWeek = currentMonth.slice(beginOfMonth, 7 + firstWeek.length);
    let thirdWeek = currentMonth.slice(beginOfMonth + 7, beginOfMonth + 14);
    let fourthWeek = currentMonth.slice(beginOfMonth + 14, beginOfMonth + 21);
    let fiveWeek = currentMonth.slice(beginOfMonth + 21, beginOfMonth + 28);
    let tailWeek = currentMonth.slice(beginOfMonth + 28);
    const weeks = [firstWeek, secondWeek, thirdWeek, fourthWeek, fiveWeek];
    if (tailWeek.length > 0) {
      weeks.push(tailWeek);
    }
    return weeks;
  };

  isSameDate(lDate: Date, rDate: Date): boolean {
    return (
      lDate.getDate() === rDate.getDate() &&
      lDate.getMonth() === rDate.getMonth() &&
      lDate.getFullYear() === rDate.getFullYear()
    );
  }

  onClickDay = (date: Date) => {
    const { onClickDay } = this.props;
    if (onClickDay) {
      onClickDay(date);
    }
  };

  onClickMonth = () => {
    const { onClickMonth } = this.props;
    if (onClickMonth) {
      onClickMonth(this.props.date);
    }
  };

  checkInvalidDate = () => {
    const { date } = this.props;
    const validFormat = format(date, 'MMMM YYYY');
    if (validFormat === 'Invalid Date') {
      return 'Данные неверны';
    }
    else return validFormat;
  };

  render() {
    const { weeks } = this.state;
    const { activeDates, date } = this.props;

    return (
      <div className={s.root}>
        <span onClick={this.onClickMonth}>{format(date, 'MMMM YYYY')}</span>
        <table>
          <thead>
            <tr>
              <th>ПН</th>
              <th>ВТ</th>
              <th>СР</th>
              <th>ЧТ</th>
              <th>ПТ</th>
              <th>СБ</th>
              <th>ВС</th>
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, i) => (
              <tr key={i}>
                {week.map((date, dayOfWeek) => {
                  return (
                    <Day
                      key={dayOfWeek}
                      date={date}
                      onClick={this.onClickDay}
                      isActive={this.isSameDate(activeDates, date)}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CalendarMonthGrid;
