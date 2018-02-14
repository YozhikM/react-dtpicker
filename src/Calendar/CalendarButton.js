/* @flow */

import * as React from 'react';
import SvgIcon from '../SvgIcon/SvgIcon';

type Props = {
  onClick?: Function,
  style?: Object,
};

export default class CalendarButton extends React.Component<Props, void> {
  render() {
    const { onClick, style } = this.props;
    return (
      <div onClick={onClick} style={style}>
        <SvgIcon file="calendar" />
      </div>
    );
  }
}
