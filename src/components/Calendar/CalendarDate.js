/* @flow */

import React from 'react';
import { setMonth, setYear, addYears, addMonths, getYear, format } from 'date-fns';
import TableSelect from '../TableSelect/TableSelect';
import CalendarMonthGrid from './CalendarMonthGrid';
import SvgIcon from '../SvgIcon';
import s from './Calendar.scss';

export type Props = {
  date: Date,
  activeDates: Date,
  onClickDay?: (date: Date) => void,
  onChangeDate?: (date: Date) => void,
  leftArrow?: boolean,
  rightArrow?: boolean
};

type State = {
  show: 'calendar' | 'mm' | 'yy' | 'yy10',
  date: Date,
  monthsOptions: Array<any>
};

class CalendarDate extends React.Component<Props, State> {
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

  showMonthTable = () => {
    this.setState({ show: 'mm' });
  };

  showYearTable = () => {
    this.setState({ show: 'yy' });
  };

  showDecadeTable = () => {
    this.setState({ show: 'yy10' });
  };

  incrementMonth = () => {
    const date = addMonths(this.state.date, 1);
    this.setState({ date });
  };

  decrementMonth = () => {
    const date = addMonths(this.state.date, -1);
    this.setState({ date });
  };

  decrement10Years = () => {
    const newDate = addYears(this.state.date, -10);
    this.setState({ date: newDate }, () => {
      const { onChangeDate } = this.props;
      if (onChangeDate) onChangeDate(newDate);
    });
  };

  decrementYears = () => {
    const newDate = addYears(this.state.date, -1);
    this.setState({ date: newDate }, () => {
      const { onChangeDate } = this.props;
      if (onChangeDate) onChangeDate(newDate);
    });
  };

  incrementYears = () => {
    const newDate = addYears(this.state.date, 1);
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

  showDecade = () => {
    const { date } = this.state;
    const tmp = getYear(date);
    const startYear = tmp - tmp % 10;
    const decade = `${startYear} - ${startYear + 9}`;
    return decade;
  };

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
        name: `${year} ${year + 9}`
      };
    });
  }

  render() {
    const { show, date, monthsOptions } = this.state;

    if (show === 'yy10') {
      const curYear = getYear(date);
      return (
        <div>
          <span>
            &nbsp; <br />
            <SvgIcon file="calendar" />
          </span>
          <TableSelect
            options={this.getYearDecadeOptions(date, 8)}
            cols={4}
            value={curYear - curYear % 10}
            onChange={this.onChangeDecade}
          />
          <button onClick={this.showYearTable}>Назад</button>
        </div>
      );
    }

    if (show === 'yy') {
      return (
        <div>
          <div className={s.c_button_container}>
            <button onClick={this.decrement10Years}>
              <SvgIcon file="arrow-left" />
            </button>
            <span onClick={this.showDecadeTable}>
              <SvgIcon file="calendar" />
              {this.showDecade()}
            </span>
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
          <button onClick={this.showMonthTable}>Назад</button>
        </div>
      );
    }

    if (show === 'mm') {
      return (
        <div className={s.table}>
          <div className={s.c_button_container}>
            <button onClick={this.decrementYears}>
              <SvgIcon file="arrow-left" />
            </button>
            <span onClick={this.showYearTable}>
              <SvgIcon file="calendar" />
              {getYear(date)}
            </span>
            <button onClick={this.incrementYears}>
              <SvgIcon file="arrow-right" />
            </button>
          </div>
          <TableSelect
            options={monthsOptions}
            cols={4}
            value={date.getMonth()}
            onChange={this.onChangeMonth}
          />
          <button
            onClick={() => {
              this.setState({ show: 'calendar' });
            }}
          >
            Назад
          </button>
        </div>
      );
    }

    return (
      <div>
        <button
          style={{ opacity: this.props.leftArrow ? 1 : 0 }}
          className={s.left_arrow}
          onClick={this.decrementMonth}
        >
          <SvgIcon file="arrow-left" />
        </button>
        <button
          style={{ opacity: this.props.rightArrow ? 1 : 0 }}
          className={s.right_arrow}
          onClick={this.incrementMonth}
        >
          <SvgIcon file="arrow-right" />
        </button>
        <CalendarMonthGrid {...this.props} date={date} onClickMonth={this.showMonthTable} />
      </div>
    );
  }
}

export default CalendarDate;
