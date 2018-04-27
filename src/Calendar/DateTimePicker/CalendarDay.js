/* @flow */

import React from 'react';

type Props = {|
  day: number,
  onClick?: (day: number) => void,
  style?: any,
|};

export default class CalendarDay extends React.Component<Props, void> {
  onClick = () => {
    const { onClick, day } = this.props;

    if (onClick) {
      onClick(day);
    }
  };

  render() {
    const { day, style } = this.props;

    return (
      <td style={style} onClick={this.onClick}>
        {day}
      </td>
    );
  }
}
