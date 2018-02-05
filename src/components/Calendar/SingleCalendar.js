/* @flow */

import * as React from 'react';
import CalendarDateTimePicker from './CalendarDateTimePicker';
import s from './MainCalendar.scss';

type Props = {
  highlight: Date,
  value: Date,
  time?: boolean,
  onChangeCalendarVisibility?: boolean => void,
  isCalendarShown?: boolean,
  icon?: boolean,
  leftArrow?: boolean,
  rightArrow?: boolean,
  onChange?: (value: Date) => void,
  onSetDate: (date: Date) => void,
};

export default class SingleCalendar extends React.Component<Props, void> {
  render() {
    return (
      <div className={s.container}>
        <CalendarDateTimePicker {...this.props} />
      </div>
    );
  }
}
