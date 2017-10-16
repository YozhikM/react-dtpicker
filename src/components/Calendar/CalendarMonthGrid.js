/* @flow */

import React from 'react';
import s from './Calendar.scss';
import CalendarDay from './CalendarDay';
import { startOfMonth, endOfMonth, eachDay, getDay, isSameDay, isWithinRange } from 'date-fns';
import format from './format';

export type Props = {|
  value: Date,
  // false - disable highlight
  // null or undefined - use date for highlight
  // value - use provided value(s) for highlight
  highlight?: Array<Date> | Date,
  onSetDate?: (date: Date) => void,
  onClickMonth?: (date: Date) => void
|};

type State = {|
  weeks: Array<Array<Date>>
|};

class CalendarMonthGrid extends React.Component<Props, State> {
  state: State = {
    weeks: []
  };

  componentWillMount() {
    const { value } = this.props;
    this.setState({ weeks: this.createMonth(value) });
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.value !== this.props.value) {
      this.setState({ weeks: this.createMonth(nextProps.value) });
    }
  }

  createMonth = (value: Date) => {
    let startDateOfMonth = startOfMonth(value);
    let endDateOfMonth = endOfMonth(value);
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

  onSetDate = (date: Date) => {
    const { onSetDate } = this.props;
    if (onSetDate) {
      onSetDate(date);
    }
  };

  onClickMonth = () => {
    const { onClickMonth } = this.props;
    if (onClickMonth) {
      onClickMonth(this.props.value);
    }
  };

  getWeekDays = () => {
    const { weeks } = this.state;
    return weeks[1].map((weekDay, i) => {
      return format(weekDay, 'dd');
    });
  };

  setDayStyle = (highlight: Array<Date> | Date, date: Date) => {
    const highlightStyle = { backgroundColor: '#34495e', color: '#fff' };
    const rangeStyle = { backgroundColor: '#8196ab', color: '#fff' };
    if (Array.isArray(highlight)) {
      for (let i = 0; i < highlight.length; i++) {
        if (isSameDay(highlight[i], date)) {
          return highlightStyle;
        }
      }
      if (highlight[0] < highlight[1]) {
        if (isWithinRange(date, highlight[0], highlight[1])) {
          return rangeStyle;
        }
      } else {
        if (isWithinRange(date, highlight[1], highlight[0])) {
          return rangeStyle;
        }
      }
    } else {
      if (isSameDay(highlight, date)) {
        return highlightStyle;
      }
    }
  };

  render() {
    const { weeks } = this.state;
    const { value, highlight } = this.props;
    return (
      <div className={s.root}>
        <span onClick={this.onClickMonth}>{format(value, 'MMMM YYYY')}</span>
        <table>
          <thead>
            <tr>
              {this.getWeekDays().map((weekDay, i) => {
                return <th key={i}>{weekDay.toUpperCase()}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, i) => (
              <tr key={i}>
                {week.map((date, dayOfWeek) => {
                  return (
                    <CalendarDay
                      key={dayOfWeek}
                      date={date}
                      style={highlight ? this.setDayStyle(highlight, date) : null}
                      onClick={this.onSetDate}
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
