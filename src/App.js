/* @flow */

import React from 'react';
import Calendar from './components/Calendar/Calendar';

type Props = void;
type State = {
  highlight?: Array<Date> | Date,
  value?: Date
};

class App extends React.Component<Props, State> {
  render() {
    return <Calendar />;
  }
}

export default App;
