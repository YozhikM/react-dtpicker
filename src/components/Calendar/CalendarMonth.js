/* @flow */

import React from 'react';
import { setMonth, setYear, addYears } from 'date-fns';
import TableSelect from '../TableSelect/TableSelect';
import CalendarMonthGrid from './CalendarMonthGrid';
import SvgIcon from '../SvgIcon';

export type Props = {
  date: Date,
  activeDates: Date,
  onClickDay?: (date: Date) => void,
  onChangeDate?: (date: Date) => void
};

type State = {
  show: 'calendar' | 'mm' | 'yy' | 'yy10',
  date: Date,
  yearsOptions: Array<any>
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
      yearsOptions: [{ value: 2017, name: '2017' }]
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

  onChangeYear = (value: number) => {
    const newDate = setYear(this.state.date, value);
    this.setState({ show: 'mm', date: newDate }, () => {
      const { onChangeDate } = this.props;
      if (onChangeDate) onChangeDate(newDate);
    });
  };

  showYearTable = () => {
    this.setState({ show: 'yy' });
  };

  decrementYear = () => {
    const { date } = this.state;
    const newDate = addYears(date, -1);
    this.setState(
      {
        date: newDate,
        yearsOptions: [{ value: newDate.getFullYear(), name: newDate.getFullYear() }]
      },
      () => {
        const { onChangeDate } = this.props;
        if (onChangeDate) onChangeDate(newDate);
      }
    );
  };

  incrementYear = () => {
    const { date } = this.state;
    const newDate = addYears(date, 1);
    this.setState(
      {
        date: newDate,
        yearsOptions: [{ value: newDate.getFullYear(), name: newDate.getFullYear() }]
      },
      () => {
        const { onChangeDate } = this.props;
        if (onChangeDate) onChangeDate(newDate);
      }
    );
  };

  render() {
    const { show, date, yearsOptions } = this.state;
    const style = {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#3c3f40',
      fontSize: '18px',
      display: 'block'
    };

    if (show === 'yy10') {
    }

    if (show === 'yy') {
      return (
        <div>
          <button onClick={this.decrementYear}>
            <SvgIcon file="arrow-left" />
          </button>
          <TableSelect
            options={yearsOptions}
            cols={1}
            value={date.getFullYear()}
            onChange={this.onChangeYear}
          />
          <button onClick={this.incrementYear}>
            <SvgIcon file="arrow-right" />
          </button>
        </div>
      );
    }

    if (show === 'mm') {
      return (
        <div>
          <button style={style} onClick={this.showYearTable}>
            {date.getFullYear()}
          </button>
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
