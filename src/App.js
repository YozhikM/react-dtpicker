/* @flow */

import React from 'react';
import TableSelect from './components/TableSelect/TableSelect';
import TimeSelect from './components/DateTimePicker/TimeSelect';
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
        <TimeSelect showSeconds={false} value={new Date()} />
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

        {/* <TableSelect
          options={monthInYear}
          cols={4}
          value={month}
          onChange={value => {
            this.setState({ month: value });
          }}
        /> */}
      </div>
    );
  }
}

export default App;
