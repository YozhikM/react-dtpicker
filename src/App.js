/* @flow */

import React from 'react';
import Calendar from './components/Calendar/Calendar';

type Props = void;
type State = {
  highlight: Array<Date> | Date,
  value: Date
};

class App extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      highlight: [new Date(), new Date()],
      value: new Date()
    };
  }
  render() {
    const { highlight, value } = this.state;
    return <Calendar highlight={highlight} value={value} />;
  }
}

export default App;
