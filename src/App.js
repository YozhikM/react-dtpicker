/* @flow */

import React from 'react';
import CalendarDate from './components/Calendar/CalendarDate';
import DateRangePickerInput from './components/DateRangePickerInput/DateRangePickerInput';
import s from './App.scss';

type Props = void;
type State = {
  activeDates: Date,
  date: Date,
  time: boolean,
  calendarIsShown: boolean
};

class App extends React.Component<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      activeDates: new Date(),
      date: new Date(),
      time: false,
      calendarIsShown: false
    };
  }

  onChangeDay = (activeDates: Date) => {
    this.setState({ activeDates });
    this.setState({ date: activeDates });
  };

  onChangeDate = (date: Date) => {
    this.setState({ date });
    this.setState({ activeDates: date });
  };

  calendarIsShown = () => {
    this.setState({ calendarIsShown: !this.state.calendarIsShown });
  };

  render() {
    return (
      <div className={s.container}>
        <DateRangePickerInput
          {...this.state}
          onChangeDay={this.onChangeDay}
          onCalendarShow={this.calendarIsShown}
        />
        <CalendarDate
          {...this.state}
          onClickDay={this.onChangeDay}
          onChangeDate={this.onChangeDate}
          leftArrow
          rightArrow
        />
      </div>
    );
  }
}

export default App;
