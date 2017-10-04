/* @flow */

import React from 'react';
import { getDate, isWithinRange } from 'date-fns';

type Props = {
  date: Date,
  isActive: boolean,
  onClick: Function,
  startDate: any,
  endDate: any
};

type State = void;

class Day extends React.Component<Props, State> {

  onClick = () => {
    const { onClick, date } = this.props;
    if (onClick) {
      onClick(date);
    }
  };

  filterRangeDay = (date: Date, startDate: Date, endDate: Date) => {
    let result = isWithinRange(date, startDate, endDate);
    return result;
  };

  render() {
    const { date, isActive, startDate, endDate } = this.props;
    let inRange = this.filterRangeDay(date, startDate, endDate);
    const style = {
      backgroundColor: (isActive ? '#34495e' : null) || (inRange ? '#9bb0c5' : null),
      color: isActive || inRange ? 'white' : '#34495e',
      border: isActive ? '1px solid transparent' : '1px solid #e4e7e7'
    };
    let dayOfMonth = getDate(date);
    return (
      <td style={style} onClick={this.onClick}>
        {dayOfMonth}
      </td>
    );
  }
}

export default Day;
