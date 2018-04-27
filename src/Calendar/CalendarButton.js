/* @flow */

import * as React from 'react';
import SvgIcon from '../SvgIcon/SvgIcon';
import './DateTimePicker/MainCalendar.scss';

type Props = {
  onClick?: Function,
  isActive?: boolean,
};

export default class CalendarButton extends React.Component<Props, void> {
  render() {
    const { onClick, isActive } = this.props;
    const style = isActive ? { backgroundColor: '#0288d1', color: '#fff' } : {};

    return (
      <div className="icon" onClick={onClick} style={style}>
        <SvgIcon file="calendar" />
      </div>
    );
  }
}
