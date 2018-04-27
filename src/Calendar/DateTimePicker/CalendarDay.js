/* @flow */

import React from 'react';
import { getDate } from 'date-fns';

type Props = {|
  date: Date,
  minDate?: Date,
  maxDate?: Date,
  onClick?: (date: Date) => void,
  style?: any,
|};

export default class CalendarDay extends React.Component<Props, void> {
  onClick = () => {
    const { onClick, date, minDate, maxDate } = this.props;
    if ((maxDate && date > maxDate) || (minDate && date < minDate)) return;
    if (onClick) {
      onClick(date);
    }
  };

  render() {
    const { date, style } = this.props;
    const dayOfMonth = getDate(date);

    return (
      <td style={style} onClick={this.onClick}>
        {dayOfMonth}
      </td>
    );
  }
}
