/* @flow */

import React from 'react';
import CalendarDateTimePicker from './CalendarDateTimePicker';
import SvgIcon from '../SvgIcon';
import s from './MainCalendar.scss';
import { addMonths } from 'date-fns';

type Props = {};
type State = {|
  highlight: Array<Date>,
  value: Date,
  time: boolean,
  isCalendarShown: boolean,
  isSingleCalendar: boolean,
  firstClick: Date | boolean,
  endClick: Date | boolean,
  firstDate: Date,
  secondDate: Date
|};

class Calendar extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      value: new Date(),
      highlight: [new Date()],
      time: false,
      isCalendarShown: true,
      isSingleCalendar: false,
      firstClick: false,
      endClick: false,
      firstDate: new Date(),
      secondDate: new Date()
    };
  }

  onSetDate = (date: Date) => {
    const { firstClick, highlight } = this.state;
    const highlightCopy = highlight.slice();
    highlightCopy.push(date);
    if (highlightCopy.length > 2) {
      highlightCopy.shift();
    }
    if (!firstClick) {
      this.setState({ firstClick: true, highlight: highlightCopy, endClick: false, firstDate: highlightCopy[1] });
    }
    if (firstClick) {
      this.setState({ endClick: true, highlight: highlightCopy, firstClick: false, secondDate: highlightCopy[1] });
    }
  };

  onChange = (value: Date) => {
    this.setState({ value });
  };

  onChangeCalendarVisibility = (isCalendarShown: boolean) => {
    this.setState({ isCalendarShown });
  };

  toggleTimeDisplay = () => {
    const { time } = this.state;
    this.setState({ time: !time });
  };

  showCalendarIcon = () => {
    const { isCalendarShown } = this.state;
    this.setState({ isCalendarShown: !isCalendarShown });
  };

  toggleCalendarQuantity = () => {
    const { isSingleCalendar } = this.state;
    this.setState({ isSingleCalendar: !isSingleCalendar });
  };

  render() {
    const { time, value, highlight, isCalendarShown, isSingleCalendar, firstDate, secondDate } = this.state;
    return (
      <div>
        <div className={s.control_panel}>
          <button onClick={this.toggleTimeDisplay}>
            <SvgIcon file="clock" />
          </button>
          <button onClick={this.showCalendarIcon}>
            {isCalendarShown ? <SvgIcon file="eye" /> : <SvgIcon file="eye-off" />}
          </button>
          <button onClick={this.toggleCalendarQuantity}>
            {isSingleCalendar ? <SvgIcon file="plus" /> : <SvgIcon file="minus" />}
          </button>
        </div>
        {isSingleCalendar ? (
          <div className={s.container}>
            <CalendarDateTimePicker
              value={value}
              highlight={highlight}
              visibleDate={highlight}
              isCalendarShown={isCalendarShown}
              onSetDate={this.onSetDate}
              onChange={this.onChange}
              onChangeCalendarVisibility={this.onChangeCalendarVisibility}
              borderLeft
              borderRight
              icon={true}
            />
          </div>
        ) : (
          <div className={s.container}>
            <CalendarDateTimePicker
              value={value}
              highlight={highlight}
              visibleDate={firstDate}
              isCalendarShown={isCalendarShown}
              onSetDate={this.onSetDate}
              onChange={this.onChange}
              onChangeCalendarVisibility={this.onChangeCalendarVisibility}
              borderLeft
              borderRight={false}
              icon={false}
              rightArrow={false}
              time={false}
            />
            <div className={s.arrow}>
              {/* {startDate < endDate ? <SvgIcon file="arrow-right" /> : <SvgIcon file="arrow-left" />} */}
            </div>
            <CalendarDateTimePicker
              value={addMonths(value, 1)}
              highlight={highlight}
              visibleDate={secondDate}
              isCalendarShown={isCalendarShown}
              onSetDate={this.onSetDate}
              onChange={this.onChange}
              onChangeCalendarVisibility={this.onChangeCalendarVisibility}
              borderLeft={false}
              borderRight
              icon={false}
              leftArrow={false}
              time={false}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Calendar;
