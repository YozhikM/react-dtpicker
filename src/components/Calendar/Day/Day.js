/* @flow */

import React from 'react';
import { getDate } from 'date-fns';

type Props = {
  date: Date,
  isActive: boolean,
  onClick: Function
};

type State = void;

class Day extends React.Component<Props, State> {
  onClick = () => {
    const { onClick, date } = this.props;
    if (onClick) {
      onClick(date)
    }
  };

  render() {
    const { date, isActive } = this.props;
    const style = {
      backgroundColor: isActive ? '#00a699' : null, color: isActive ? 'white' : '#565a5c', border: isActive ? '1px solid transparent' : '1px solid #e4e7e7'
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
