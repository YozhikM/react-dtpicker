/* @flow */

import React from 'react';
import {
  startOfMonth,
  endOfMonth,
  eachDay,
  getDay,
  isSameDay,
  isWithinRange,
  getDate,
} from 'date-fns';
import s from './Calendar.scss';
import CalendarDay from './CalendarDay';
import format from './format';
import { convertToUTCNewDate, getDateFromValue, type Highlight } from '../helpers';

type Value = {
  year: number,
  month: number,
};

type Week = number[];

export type Props = {|
  value: Value,
  highlight?: Highlight[] | Highlight,
  maxDate?: Date,
  minDate?: Date,
  onSetDate?: (day: number) => void,
  onClickMonth?: (month: Value) => void,
|};

type State = {
  weeks: Week[],
};

export default class CalendarMonthGrid extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      weeks: this.createMonth(props.value) || [],
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.value !== this.props.value) {
      this.setState({ weeks: this.createMonth(nextProps.value) });
    }
  }

  createMonth(date: Value): Week[] {
    const MONTH = new Date(date.year, date.month);
    const startDateOfMonth = startOfMonth(MONTH);
    const endDateOfMonth = endOfMonth(MONTH);
    const currentMonth: number[] = eachDay(startDateOfMonth, endDateOfMonth).map(day =>
      getDate(convertToUTCNewDate(day))
    );

    const firstOfMonthDay: number = getDay(startDateOfMonth);
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
    const weeks: Week[] = [firstWeek, secondWeek, thirdWeek, fourthWeek];
    // check for february starting on monday, out of 28 days
    if (fiveWeek.length > 0) {
      weeks.push(fiveWeek);
    }
    if (tailWeek.length > 0) {
      weeks.push(tailWeek);
    }
    return weeks;
  }

  onSetDate = (day: number) => {
    const { maxDate, minDate, onSetDate, value } = this.props;
    const date = new Date(value.year, value.month, day);

    if ((maxDate && date > maxDate) || (minDate && date < minDate)) return;

    if (onSetDate) {
      onSetDate(day);
    }
  };

  onClickMonth = () => {
    const { onClickMonth, value } = this.props;
    if (onClickMonth) {
      onClickMonth(value);
    }
  };

  getWeekDays(): string[] {
    const { value } = this.props;
    const { weeks } = this.state;

    return weeks[1].map(weekDay => {
      const date = new Date(value.year, value.month, weekDay);
      return format(date, 'dd');
    });
  }

  setDayStyle = (highlight: Highlight[] | Highlight, day: number) => {
    const { maxDate, minDate, value } = this.props;
    const date = new Date(value.year, value.month, day);

    const highlightStyle = { backgroundColor: '#34495e', color: '#fff' };
    const rangeStyle = { backgroundColor: '#8196ab', color: '#fff' };
    const disabledDateStyle = { color: 'lightgrey' };

    if (Array.isArray(highlight)) {
      const [first, second] = highlight;
      const firstDate = getDateFromValue(first);
      const secondDate = getDateFromValue(second);

      if ((maxDate && date > maxDate) || (minDate && date < minDate)) {
        return disabledDateStyle;
      }

      for (let i = 0; i < highlight.length; i++) {
        if (isSameDay(getDateFromValue(highlight[i]), date)) {
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
    } else if (isSameDay(getDateFromValue(highlight), date)) {
      return highlightStyle;
    }

    return {};
  };

  render() {
    const { weeks } = this.state;
    const { value, highlight } = this.props;
    const weekDays = this.getWeekDays();
    const month = new Date(value.year, value.month);

    return (
      <div className={s.root}>
        <span className={s.span} onClick={this.onClickMonth}>
          {format(month, 'MMMM YYYY')}
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
              <tr key={week[0]}>
                {week.map(day => {
                  return (
                    <CalendarDay
                      key={day}
                      day={day}
                      style={highlight ? this.setDayStyle(highlight, day) : {}}
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
