/* @flow */

import React from 'react';
import { setMonth, setYear, addYears, getYear, format } from 'date-fns';
import TableSelect from '../TableSelect/TableSelect';
import CalendarMonthGrid from './CalendarMonthGrid';
import SvgIcon from '../SvgIcon';
import s from './Calendar.scss'

export type Props = {
  date: Date,
  activeDates: Date,
  onClickDay?: (date: Date) => void,
  onChangeDate?: (date: Date) => void
};

type State = {
  show: 'calendar' | 'mm' | 'yy' | 'yy10',
  date: Date,
  monthsOptions: Array<any>
};

class CalendarMonth extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      show: 'calendar',
      date: this.props.date,
      monthsOptions: this.getMonthOptions()
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.date !== nextProps.date) {
      this.setState({
        date: nextProps.date
      });
    }
  }

  getMonthOptions() {
    return [...Array(12)].map((v, i) => ({
      value: i,
      name: format(new Date(2000, i, 1), 'MMM')
    }));
  }

  getYearOptions(date: Date) {
    const tmp = date.getFullYear();
    const startYear = tmp - tmp % 10;
    return [...Array(10)].map((v, i) => ({
      value: startYear + i,
      name: `${startYear + i}`
    }));
  }

  getYearDecadeOptions(date: Date, cnt: number = 5) {
    const tmp = date.getFullYear();
    const middleYear = tmp - tmp % 10;
    const startYear = middleYear - Math.ceil(cnt / 2) * 10;
    return [...Array(cnt)].map((v, i) => {
      const year = startYear + i * 10;
      return {
        value: year,
        name: `${year} - ${year + 9}`
      };
    });
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

  onChangeDecade = (value: number) => {
    const newDate = setYear(this.state.date, value);
    this.setState({ show: 'yy', date: newDate }, () => {
      const { onChangeDate } = this.props;
      if (onChangeDate) onChangeDate(newDate);
    });
  };

  showYearTable = () => {
    this.setState({ show: 'yy' });
  };

  showDecadeTable = () => {
    this.setState({ show: 'yy10' });
  };

  decrement10Years = () => {
    const newDate = addYears(this.state.date, -10);
    this.setState({ date: newDate }, () => {
      const { onChangeDate } = this.props;
      if (onChangeDate) onChangeDate(newDate);
    });
  };

  increment10Years = () => {
    const newDate = addYears(this.state.date, 10);
    this.setState({ date: newDate }, () => {
      const { onChangeDate } = this.props;
      if (onChangeDate) onChangeDate(newDate);
    });
  };

  render() {
    const { show, date, monthsOptions } = this.state;

    if (show === 'yy10') {
      return (
        <div>
          <TableSelect
            options={this.getYearDecadeOptions(date, 6)}
            cols={4}
            value={getYear(date)}
            onChange={this.onChangeDecade}
          />
        </div>
      );
    }

    if (show === 'yy') {
      return (
        <div>
          <span onClick={this.showDecadeTable}>Decade</span>
          <div className={s.c_button_container}>
            <button onClick={this.decrement10Years}>
              <SvgIcon file="arrow-left" />
            </button>
            <button onClick={this.increment10Years}>
              <SvgIcon file="arrow-right" />
          </button>
        </div>
          <TableSelect
            options={this.getYearOptions(date)}
            cols={4}
            value={getYear(date)}
            onChange={this.onChangeYear}
          />
        </div>
      );
    }

    if (show === 'mm') {
      return (
        <div className={s.table}>
          <span onClick={this.showYearTable}>
            {getYear(date)}
          </span>
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
