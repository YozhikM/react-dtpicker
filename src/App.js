/* @flow */

import React from 'react';
import CalendarDateTimePicker from './components/Calendar/CalendarDateTimePicker';
import SvgIcon from './components/SvgIcon';
import Mark from 'mark.js';
import { addMonths, getMonth } from 'date-fns';
import s from './App.scss';

type Props = void;
type State = {
  startDate: Date,
  endDate: Date,
  date: Date,
  time: boolean,
  isCalendarShown: boolean,
  isSingleCalendar: boolean
};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      startDate: new Date(),
      endDate: addMonths(new Date(), 1),
      date: new Date(),
      time: false,
      isCalendarShown: false,
      isSingleCalendar: false
    };
  }

  // componentDidMount() {
  //   console.log(this.refCal1);
  //   this.markInstance = new Mark(this.refCal1);
  //   this.performMark = () => {
  //     var keyword = this.keywordInput.value;
  //     this.markInstance.unmark({
  //       done: () => {
  //         this.markInstance.mark(keyword);
  //       }
  //     });
  //   }
  //
  //   this.keywordInput = document.querySelector('input[type="text"]');
  //   this.keywordInput.addEventListener('input', this.performMark);
  // }
  //
  // componentDidUpdate() {
  //   console.log('Update!!!!');
  //   this.performMark();
  // }

  onChangeStartDay = (activeDates: Date) => {
    this.setState({ startDate: activeDates, date: activeDates });
  };

  onChangeEndDay = (activeDates: Date) => {
    this.setState({ endDate: activeDates, date: activeDates });
  };

  onChangeDay = (activeDates: Date) => {
    this.setState({ startDate: activeDates, date: activeDates });
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

  render() {
    const { startDate, endDate, time, date, isCalendarShown, isSingleCalendar } = this.state;
    return (
      <div>
        <div className={s.control_panel}>
          <input type="text" />
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
              activeDates={startDate}
              onChangeCalendarVisibility={this.onChangeCalendarVisibility}
              startDate={startDate}
              endDate={startDate}
              borderLeft
              borderRight
              icon={true}
              leftArrow
              rightArrow
            />
          </div>
        ) : (
          <div className={s.container}>
            <div ref={(r) => (this.refCal1 = r)}>
              <CalendarDateTimePicker
                date={getMonth(startDate) === getMonth(date) ? date : addMonths(date, -1)}
                time={time}
                isCalendarShown={isCalendarShown}
                onChangeDay={this.onChangeStartDay}
                onChangeDate={this.onChangeStartDay}
                activeDates={startDate}
                onChangeCalendarVisibility={this.onChangeCalendarVisibility}
                startDate={startDate}
                endDate={endDate}
                borderLeft
                borderRight={false}
                icon={false}
                leftArrow
                rightArrow={false}
                watchIncrementMonth={this.watchIncrementMonth}
                watchDecrementMonth={this.watchDecrementMonth}
              />
            </div>
            <div className={s.arrow}>
              {startDate < endDate ? <SvgIcon file="arrow-right" /> : <SvgIcon file="arrow-left" />}
            </div>
            <CalendarDateTimePicker
              date={getMonth(endDate) === getMonth(date) ? date : addMonths(date, 1)}
              time={time}
              isCalendarShown={isCalendarShown}
              onChangeDay={this.onChangeEndDay}
              onChangeDate={this.onChangeEndDay}
              activeDates={endDate}
              onChangeCalendarVisibility={this.onChangeCalendarVisibility}
              startDate={startDate}
              endDate={endDate}
              borderLeft={false}
              borderRight
              icon={false}
              leftArrow={false}
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

export default App;
