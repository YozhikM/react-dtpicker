/* @flow */

import React from 'react';
import CalendarDate from './components/Calendar/CalendarDate';
import s from './App.scss';
import { format } from 'date-fns';

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
      date: new Date()
    };
  }

  onClickDay = (activeDates: Date) => {
    this.setState({ activeDates });
  };

  onChangeDate = (date: Date) => {
    this.setState({ date });
    this.setState({ activeDates: date });
  };

  render() {
    return (
      <div className={s.container}>
        <p>{format(this.state.activeDates, 'hh:mm dd/MM/YY')}</p>
        <CalendarDate
          {...this.state}
          onClickDay={this.onClickDay}
          onChangeDate={this.onChangeDate}
          leftArrow
          rightArrow
          time
        />
      </div>
    );
  }
}

export default App;
