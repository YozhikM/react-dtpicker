/* @flow */

import React from 'react';
import { getDate } from 'date-fns';

type Props = {|
  date: Date,
  onClick?: (date: Date) => void,
  style: any
|};

type State = void;

class CalendarDay extends React.Component<Props, State> {
  onClick = () => {
    const { onClick, date } = this.props;
    if (onClick) {
      onClick(date);
    }
  };

  render() {
    const { date, style } = this.props;
    let dayOfMonth = getDate(date);
    return <td style={style} onClick={this.onClick}>{dayOfMonth}</td>;
  }
}

export default CalendarDay;
