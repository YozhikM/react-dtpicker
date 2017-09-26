/* @flow */

import React from 'react';
import { setMonth, setYear } from 'date-fns';
import TableSelect from '../TableSelect/TableSelect';
import CalendarMonthGrid from './CalendarMonthGrid';

export type Props = {
  date: Date,
  activeDates: Date,
  onClickDay?: (date: Date) => void,
  onChangeDate?: (date: Date) => void
};

type State = {
  show: 'calendar' | 'mm' | 'yy' | 'yy10',
  date: Date
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

const yearsOptions = [{value: 2016, name: '2016'}, {value: 2017, name: '2017'}, {value: 2018, name: '2018'}, {value: 2019, name: '2019'}, {value: 2020, name: '2020'}, {value: 2021, name: '2021'}, {value: 2022, name: '2022'}, {value: 2023, name: '2023'}, {value: 2024, name: '2024'}, {value: 2025, name:
2025}];

class CalendarMonth extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      show: 'calendar',
      date: this.props.date
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

  render() {
    const { show, date } = this.state;
    const style = {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#3c3f40',
      fontSize: '18px',
      display: 'block'
    }

    if (show === 'yy10') {
    }

    if (show === 'yy') {
      return (
        <div>
          <TableSelect options={yearsOptions} cols={12} value={date.getFullYear()} onChange={this.onChangeYear} />
        </div>
      );
    }

    if (show === 'mm') {
      return (
        <div>
          <button style={style} onClick={this.showYearTable}>{date.getFullYear()}</button>
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
