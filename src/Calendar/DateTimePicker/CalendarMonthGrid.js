/* @flow */

import React from 'react';
import { startOfMonth, endOfMonth, eachDay, getDay, isSameDay, isWithinRange } from 'date-fns';
import s from './Calendar.scss';
import CalendarDay from './CalendarDay';
import format from './format';

type Week = Array<Date>;

export type Props = {|
  value: Date,
  highlight?: Array<Date> | Date,
  maxDate?: Date,
  minDate?: Date,
  onSetDate?: (date: Date) => void,
  onClickMonth?: (date: Date) => void,
|};

type State = {
  weeks: Array<Week>,
};

export default class CalendarMonthGrid extends React.Component<Props, State> {
  state: State = {
    weeks: [],
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

  createMonth(date: Date): Array<Week> {
    const newDate = new Date(date);
    const startDateOfMonth = startOfMonth(newDate);
    const endDateOfMonth = endOfMonth(newDate);
    const currentMonth = eachDay(startDateOfMonth, endDateOfMonth);
    const firstOfMonthDay = getDay(startDateOfMonth);
    let beginOfMonth;
    if (firstOfMonthDay === 0) {
      beginOfMonth = 1;
    } else {
      beginOfMonth = 8 - firstOfMonthDay;
    }
    const firstWeek = currentMonth.slice(0, beginOfMonth);
    const secondWeek = currentMonth.slice(beginOfMonth, 7 + firstWeek.length);
    const thirdWeek = currentMonth.slice(beginOfMonth + 7, beginOfMonth + 14);
    const fourthWeek = currentMonth.slice(beginOfMonth + 14, beginOfMonth + 21);
    const fiveWeek = currentMonth.slice(beginOfMonth + 21, beginOfMonth + 28);
    const tailWeek = currentMonth.slice(beginOfMonth + 28);
    const weeks: Array<Array<Date>> = [firstWeek, secondWeek, thirdWeek, fourthWeek];
    // check for february starting on monday, out of 28 days
    if (fiveWeek.length > 0) {
      weeks.push(fiveWeek);
    }
    if (tailWeek.length > 0) {
      weeks.push(tailWeek);
    }
    return weeks;
  }

  onSetDate = (date: Date) => {
    const { onSetDate } = this.props;
    if (onSetDate) {
      onSetDate(date);
    }
  };

  onClickMonth = () => {
    const { onClickMonth, value } = this.props;
    if (onClickMonth) {
      onClickMonth(value);
    }
  };

  getWeekDays(): Array<string> {
    const { weeks } = this.state;
    return weeks[1].map(weekDay => {
      return format(weekDay, 'dd');
    });
  }

  setDayStyle = (highlight: Array<Date> | Date, date: Date) => {
    const { maxDate, minDate } = this.props;

    const highlightStyle = { backgroundColor: '#34495e', color: '#fff' };
    const rangeStyle = { backgroundColor: '#8196ab', color: '#fff' };
    const disabledDateStyle = { color: 'lightgrey' };

    if (Array.isArray(highlight)) {
      const [firstDate, secondDate] = highlight;

      if ((maxDate && date > maxDate) || (minDate && date < minDate)) {
        return disabledDateStyle;
      }

      for (let i = 0; i < highlight.length; i++) {
        if (isSameDay(highlight[i], date)) {
          return highlightStyle;
        }
      }
      if (firstDate < secondDate) {
        if (isWithinRange(date, firstDate, secondDate)) {
          return rangeStyle;
        }
      } else if (isWithinRange(date, secondDate, firstDate)) {
        return rangeStyle;
      }
    } else if (isSameDay(highlight, date)) {
      return highlightStyle;
    }

    return {};
  };

  render() {
    const { weeks } = this.state;
    const { value, highlight, minDate, maxDate } = this.props;
    const weekDays = this.getWeekDays();

    return (
      <div className={s.root}>
        <span className={s.span} onClick={this.onClickMonth}>
          {format(value, 'MMMM YYYY')}
        </span>
        <table>
          <thead>
            <tr>
              {weekDays.map(weekDay => {
                return <th key={weekDay}>{weekDay.toUpperCase()}</th>;
              })}
            </tr>
          </thead>

          <tbody>
            {weeks.map(week => (
              <tr key={week[0].toISOString()}>
                {week.map(date => {
                  return (
                    <CalendarDay
                      key={date.toISOString()}
                      date={date}
                      style={highlight ? this.setDayStyle(highlight, date) : {}}
                      onClick={this.onSetDate}
                      minDate={minDate}
                      maxDate={maxDate}
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
