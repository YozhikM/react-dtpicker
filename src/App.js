/* @flow */

import React from 'react';
import CalendarSingle from './components/Calendar/CalendarSingle';
// import Calendar from './components/Calendar/Calendar';

type Props = void;
type State = {
  activeDates: Date,
  date: Date
};

class App extends React.Component<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      activeDates: new Date(),
      date: new Date(2017, 8, 1)
    };
  }

  onClickDay = (activeDates: Date) => {
    this.setState({ activeDates });
  };

  onChangeDate = (date: Date) => {
    this.setState({ date });
  };

  render() {
    return (
      <div className="container">
        <CalendarSingle
          {...this.state}
          onClickDay={this.onClickDay}
          onChangeDate={this.onChangeDate}
          leftArrow
          rightArrow
          time
        />
        {/* <Calendar
          date={date}
          activeDates={activeDates}
          onClickDay={activeDates => {
            this.setState({ activeDates });
          }}
          onChangeDate={date => {
            this.setState({ date });
          }}
        /> */}
      </div>
    );
  }
}

export default App;
