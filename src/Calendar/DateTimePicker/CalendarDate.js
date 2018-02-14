/* @flow */

import React from 'react';
import { setMonth, setYear, addYears, addMonths, getYear, format } from 'date-fns';
import Button from '../../Button/Button';
import SvgIcon from '../../SvgIcon/SvgIcon';
import TableSelect from '../TableSelect/TableSelect';
import CalendarMonthGrid from './CalendarMonthGrid';
import TimePicker from './TimePicker';
import s from './Calendar.scss';

type Show = 'calendar' | 'mm' | 'yy' | 'yy10';

export type Props = {|
  value: Date,
  onChange?: (value: Date) => void, // works on change day, month, year, year10, time (it only work for displaying value)
  highlight?: Array<Date> | Date,
  visibleTime?: Date,
  onSetDate?: (date: Date) => void, // user click by day in calendar
  onSetTime?: (time: Date) => void, // user click on time in calendar
  leftArrow?: boolean, // show left arrow in header (true by default)
  rightArrow?: boolean, // show right arrow in header (true by default)
  time?: boolean, // display time picker (hidden by default)
  show?: Show, // display needed view type (calendar by default)
|};

type State = {|
  show: 'calendar' | 'mm' | 'yy' | 'yy10',
  value: Date,
  monthsOptions: Array<{ value: number, name: string }>,
|};

class CalendarDate extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      show: props.show || 'calendar',
      value: props.value,
      monthsOptions: this.getMonthOptions(),
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  onSetDate = (date: Date) => {
    const { onSetDate } = this.props;
    if (onSetDate) onSetDate(date);
  };

  onSetTime = (time: Date) => {
    const { onSetTime } = this.props;
    if (onSetTime) onSetTime(time);
  };

  onChange = (value: Date) => {
    this.setState({ value: new Date() }, () => {
      const { onChange } = this.props;
      if (onChange) onChange(value);
    });
  };

  onChangeMonth = (n: number) => {
    const { value } = this.state;
    const newDate = setMonth(value, n);
    this.setState({ show: 'calendar' });
    this.onChange(newDate);
  };

  onChangeYear = (n: number) => {
    const { value } = this.state;
    const newDate = setYear(value, n);
    this.setState({ show: 'mm' });
    this.onChange(newDate);
  };

  onChangeDecade = (n: number) => {
    const { value } = this.state;
    const newDate = setYear(value, n);
    this.setState({ show: 'yy' });
    this.onChange(newDate);
  };

  showCalendar = () => {
    this.setState({ show: 'calendar' });
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
    const value = addMonths(this.state.value, 1);

    this.onChange(value);
  };

  decrementMonth = () => {
    const value = addMonths(this.state.value, -1);

    this.onChange(value);
  };

  increment10Years = () => {
    const { value } = this.state;
    const newDate = addYears(value, 10);

    this.onChange(newDate);
  };

  decrement10Years = () => {
    const { value } = this.state;
    const newDate = addYears(value, -10);

    this.onChange(newDate);
  };

  incrementYears = () => {
    const { value } = this.state;
    const newDate = addYears(value, 1);

    this.onChange(newDate);
  };

  decrementYears = () => {
    const { value } = this.state;
    const newDate = addYears(value, -1);

    this.onChange(newDate);
  };

  showDecade() {
    const { value } = this.state;
    const tmp = getYear(value);
    const startYear = tmp - tmp % 10;
    const decade = `${startYear} - ${startYear + 9}`;

    return decade;
  }

  getMonthOptions() {
    return [...Array(12)].map((v, i) => ({
      value: i,
      name: format(new Date(2000, i, 1), 'MMM'),
    }));
  }

  getYearOptions(date: Date) {
    const tmp = date.getFullYear();
    const startYear = tmp - tmp % 10;

    return [...Array(10)].map((v, i) => ({
      value: startYear + i,
      name: `${startYear + i}`,
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
        name: `${year} ${year + 9}`,
      };
    });
  }

  getBtnStyle() {
    const { leftArrow, rightArrow } = this.props;
    if (leftArrow && !rightArrow) {
      return { justifyContent: 'flex-start' };
    } else if (!leftArrow && rightArrow) {
      return { justifyContent: 'flex-end' };
    }
    return { justifyContent: 'space-between' };
  }

  render() {
    const { show, value, monthsOptions } = this.state;
    const { time, highlight, visibleTime, leftArrow, rightArrow } = this.props;

    if (show === 'yy10') {
      const curYear = getYear(value);
      return (
        <div className={s.calendar_container}>
          <div className={s.table}>
            <span className={s.span}>
              &nbsp; <br /> &nbsp;
            </span>
            <TableSelect
              options={this.getYearDecadeOptions(value, 8)}
              cols={4}
              value={curYear - curYear % 10}
              onChange={this.onChangeDecade}
            />
            <Button onClick={this.showYearTable} xs>
              Назад
            </Button>
          </div>
        </div>
      );
    }

    if (show === 'yy') {
      return (
        <div className={s.calendar_container}>
          <div className={s.table}>
            <div className={s.c_button_container}>
              <button onClick={this.decrement10Years}>
                <SvgIcon file="arrow-left" />
              </button>
              <span className={s.span} onClick={this.showDecadeTable}>
                {this.showDecade()}
              </span>
              <button onClick={this.increment10Years}>
                <SvgIcon file="arrow-right" />
              </button>
            </div>
            <TableSelect
              options={this.getYearOptions(value)}
              cols={4}
              value={getYear(value)}
              onChange={this.onChangeYear}
            />
            <Button onClick={this.showMonthTable} xs>
              Назад
            </Button>
          </div>
        </div>
      );
    }

    if (show === 'mm') {
      return (
        <div className={s.calendar_container}>
          <div className={s.table}>
            <div className={s.c_button_container}>
              <button onClick={this.decrementYears}>
                <SvgIcon file="arrow-left" />
              </button>
              <span className={s.span} onClick={this.showYearTable}>
                {getYear(value)}
              </span>
              <button onClick={this.incrementYears}>
                <SvgIcon file="arrow-right" />
              </button>
            </div>
            <TableSelect
              options={monthsOptions}
              cols={4}
              value={value.getMonth()}
              onChange={this.onChangeMonth}
            />
            <Button onClick={this.showCalendar} xs>
              Назад
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className={s.calendar_container}>
        <div className={s.btns} style={this.getBtnStyle()}>
          {leftArrow && (
            <button className={s.left_arrow} onClick={this.decrementMonth}>
              <SvgIcon file="arrow-left" />
            </button>
          )}
          {rightArrow && (
            <button className={s.right_arrow} onClick={this.incrementMonth}>
              <SvgIcon file="arrow-right" />
            </button>
          )}
        </div>
        <CalendarMonthGrid
          highlight={highlight}
          value={value}
          onClickMonth={this.showMonthTable}
          onSetDate={this.onSetDate}
        />
        {time && <TimePicker date={visibleTime} onSetTime={this.onSetTime} />}
      </div>
    );
  }
}

export default CalendarDate;
