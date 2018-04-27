/* @flow */

import * as React from 'react';
import SvgIcon from '../SvgIcon/SvgIcon';

type Props = {
  onClick?: Function,
  isActive?: boolean,
  style?: Object
};

export default class CalendarButton extends React.Component<Props, void> {
  render() {
    const { onClick, isActive } = this.props;
    const style = isActive ? { backgroundColor: '#0288d1', color: '#fff' } : {};

    return (
      <div onClick={onClick} style={{ ...style, ...this.props.style }}>
        <SvgIcon file="calendar" />
      </div>
    );
  }
}
