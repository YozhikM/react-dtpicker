/* @flow */

import React from 'react';
import Calendar from './components/Calendar/Calendar';

type Props = void;
type State = {
  highlight?: Array<Date> | Date,
  value?: Date,
};

const App = (props: Props) => {
  return <Calendar />;
};

export default App;
