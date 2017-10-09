/* @flow */

import React from 'react';
import { getDate, isWithinRange, isSameDay } from 'date-fns';

type Props = {
  date: Date,
  isActive?: boolean,
  onClick?: Function,
  startDate?: any,
  endDate?: any
};

type State = void;

class CalendarDay extends React.Component<Props, State> {
  onClick = () => {
    const { onClick, date } = this.props;
    if (onClick) {
      onClick(date);
    }
  };

  filterRangeDay = (date: Date, startDate: Date, endDate: Date) => {
    let result;
    if (startDate < endDate) {
      result = isWithinRange(date, startDate, endDate);
    } else {
      result = isWithinRange(date, endDate, startDate);
    }
    return result;
  };

  render() {
    const { date, isActive, startDate, endDate } = this.props;
    let inRange = startDate && endDate && this.filterRangeDay(date, startDate, endDate);
    let startDay = startDate && isSameDay(startDate, date);
    const style = {
      backgroundColor: (isActive || startDay ? '#34495e' : null) || (inRange ? '#9bb0c5' : null),
      color: isActive || inRange || startDay ? 'white' : '#34495e',
      border: isActive || inRange || startDay ? '1px solid transparent' : '1px solid #e4e7e7'
    };
    let dayOfMonth = getDate(date);
    return (
      <td style={style} onClick={this.onClick}>
        {dayOfMonth}
      </td>
    );
  }
}

export default CalendarDay;
