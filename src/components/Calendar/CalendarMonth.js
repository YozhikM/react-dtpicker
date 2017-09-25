/* @flow */

import React from 'react';
import { setMonth } from 'date-fns';
import s from './Calendar.scss';
import TableSelect from '../TableSelect/TableSelect';
import CalendarMonthGrid from './CalendarMonthGrid';

export type Props = {
  date: Date,
  activeDates: Date,
  onClickDay?: (date: Date) => void,
  onChangeDate?: (date: Date) => void,
};

type State = {
  show: 'calendar' | 'mm' | 'yy' | 'yy10',
  date: Date,
};

const monthsOptions = [
  { value: 0, name: 'Январь' },
  { value: 1, name: 'Февраль' },
  { value: 2, name: 'Март' },
  { value: 3, name: 'Апрель' },
  { value: 4, name: 'Май' },
  { value: 5, name: 'Июнь' },
  { value: 6, name: 'Июль' },
  { value: 7, name: 'Август' },
  { value: 8, name: 'Сентябрь' },
  { value: 9, name: 'Октябрь' },
  { value: 10, name: 'Ноябрь' },
  { value: 11, name: 'Декабрь' }
];

class CalendarMonth extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      show: 'calendar',
      date: this.props.date,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.date !== nextProps.date) {
      this.setState({ date: nextProps.date });
    }
  }

  showMonthTable = () => {
    this.setState({ show: 'mm' });
  };

  onChangeMonth = (value: number) => {
    const newDate = setMonth(this.state.date, value);
    this.setState({ show: 'calendar', date: newDate }, () => {
      const { onChangeDate } = this.props;
      if (onChangeDate) onChangeDate(newDate);
    });
  };

  render() {
    const { show, date } = this.state;

    if (show === 'yy10') {

    }

    if (show === 'yy') {

    }

    if (show === 'mm') {
      return (
        <div>
          <span>2017</span>
          <TableSelect
            options={monthsOptions}
            cols={4}
            value={date.getMonth()}
            onChange={this.onChangeMonth}
          />
        </div>
      );
    }

    return <CalendarMonthGrid {...this.props} date={date} onClickMonth={this.showMonthTable} />;
  }
}

export default CalendarMonth;
