/* @flow */

import React from 'react';
import Calendar from './components/Calendar/Calendar';

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

  render() {
    const { date, activeDates } = this.state;

    return (
      <div className="container">
        <Calendar
          date={date}
          activeDates={activeDates}
          onClickDay={activeDates => {
            this.setState({ activeDates });
          }}
          onChangeDate={date => {
            this.setState({ date });
          }}
        />
      </div>
    );
  }
}

export default App;
