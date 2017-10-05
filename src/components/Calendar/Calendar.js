/* @flow */

import React from 'react';
import CalendarDateTimePicker from './CalendarDateTimePicker';
import SvgIcon from '../SvgIcon';
import { addMonths, getMonth } from 'date-fns';
import s from './MainCalendar.scss';

type Props = {};
type State = {
  startDate: Date,
  endDate: Date,
  date: Date,
  time: boolean,
  isCalendarShown: boolean,
  isSingleCalendar: boolean,
  firstClick: Date | boolean,
  endClick: Date | boolean
};

class Calendar extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      startDate: new Date(),
      endDate: addMonths(new Date(), 1),
      date: new Date(),
      time: false,
      isCalendarShown: false,
      isSingleCalendar: false,
      firstClick: false,
      endClick: false
    };
  }
  onChangeDay = (activeDates: Date) => {
    const { firstClick, startDate, endDate, date } = this.state;

    this.setState({ date: activeDates });
    if (!firstClick) {
      this.setState({ firstClick: true, startDate: activeDates });
    }
    if (firstClick) {
      this.setState({ endClick: true, endDate: activeDates, firstClick: false });
    }
    this.getFirstCalendarDate(date, startDate, endDate);
    this.getSecondCalendarDate(date, startDate, endDate);
  };

  onChangeDate = (date: Date) => {
    this.setState({ date });
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

  watchIncrementMonth = (date: Date) => {
    this.setState({ date });
  };

  watchDecrementMonth = (date: Date) => {
    this.setState({ date });
  };

  getFirstCalendarDate = (date: Date, startDate: Date, endDate: Date) => {
    if (getMonth(startDate) < getMonth(endDate)) {
      return startDate;
    } else return date;
  };

  getSecondCalendarDate = (date: Date, startDate: Date, endDate: Date) => {
    if (getMonth(startDate) === getMonth(endDate)) {
      return addMonths(date, 1);
    }
    if (getMonth(startDate) > getMonth(endDate)) {
      return addMonths(date, 1);
    } else return endDate;
  };

  render() {
    const { startDate, endDate, time, date, isCalendarShown, isSingleCalendar } = this.state;
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
              date={date}
              time={time}
              isCalendarShown={isCalendarShown}
              onChangeDate={this.onChangeDate}
              onChangeDay={this.onChangeDay}
              activeDates={date}
              onChangeCalendarVisibility={this.onChangeCalendarVisibility}
              startDate={date}
              endDate={date}
              borderLeft
              borderRight
              icon={true}
              leftArrow
              rightArrow
            />
          </div>
        ) : (
          <div className={s.container}>
            <CalendarDateTimePicker
              date={this.getFirstCalendarDate(date, startDate, endDate)}
              time={time}
              isCalendarShown={isCalendarShown}
              onChangeDay={this.onChangeDay}
              onChangeDate={this.onChangeDate}
              activeDates={startDate}
              onChangeCalendarVisibility={this.onChangeCalendarVisibility}
              startDate={startDate}
              endDate={endDate}
              borderLeft
              borderRight={false}
              icon={false}
              leftArrow
              rightArrow
              watchIncrementMonth={this.watchIncrementMonth}
              watchDecrementMonth={this.watchDecrementMonth}
            />
            <div className={s.arrow}>
              {startDate < endDate ? <SvgIcon file="arrow-right" /> : <SvgIcon file="arrow-left" />}
            </div>
            <CalendarDateTimePicker
              date={this.getSecondCalendarDate(date, startDate, endDate)}
              time={time}
              isCalendarShown={isCalendarShown}
              onChangeDay={this.onChangeDay}
              onChangeDate={this.onChangeDate}
              activeDates={endDate}
              onChangeCalendarVisibility={this.onChangeCalendarVisibility}
              startDate={startDate}
              endDate={endDate}
              borderLeft={false}
              borderRight
              icon={false}
              leftArrow
              rightArrow
              watchIncrementMonth={this.watchIncrementMonth}
              watchDecrementMonth={this.watchDecrementMonth}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Calendar;
