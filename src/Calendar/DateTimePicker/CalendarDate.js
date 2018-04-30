/* @flow */

import React from 'react';
import { startOfMonth, endOfMonth, format } from 'date-fns';
import Button from '../../Button/Button';
import SvgIcon from '../../SvgIcon/SvgIcon';
import arrowLeft from '../../SvgIcon/svg-icons/arrow-left.svg';
import arrowRight from '../../SvgIcon/svg-icons/arrow-right.svg';
import TableSelect from '../TableSelect/TableSelect';
import CalendarMonthGrid from './CalendarMonthGrid';
import TimePicker from './TimePicker';
import s from './MainCalendar.scss';
import type { Highlight } from '../helpers';

type Value = {
  year: number,
  month: number,
  day?: number,
};

type Option = {
  value: number,
  name: string,
};

type Show = 'calendar' | 'mm' | 'yy' | 'yy10';

export type Props = {|
  value: Value,
  onChange?: (value: Value) => void, // works on change day, month, year, year10, time (it only work for displaying value)
  highlight?: Highlight[] | Highlight,
  visibleTime?: Highlight,
  onSetDate?: (day: number) => void, // user click by day in calendar
  onSetTime?: (time: Highlight) => void, // user click on time in calendar
  leftArrow?: boolean, // show left arrow in header (true by default)
  rightArrow?: boolean, // show right arrow in header (true by default)
  time?: boolean, // display time picker (hidden by default)
  show?: Show, // display needed view type (calendar by default)
  minDate?: Date,
  maxDate?: Date,
|};

type State = {|
  show: 'calendar' | 'mm' | 'yy' | 'yy10',
  value: Value,
  monthsOptions: { value: number, name: string }[],
  disabledMonths: ?(number[]),
  disabledYears: ?(number[]),
|};

class CalendarDate extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { disabledMonths, disabledYears } = this.calculateDisabledOptions(props.value);

    this.state = {
      show: props.show || 'calendar',
      value: props.value,
      monthsOptions: this.getMonthOptions(),
      disabledMonths,
      disabledYears,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  calculateDisabledOptions = (value: Value) => {
    const { minDate, maxDate } = this.props;

    const disabledMonths = [];
    const disabledYears = [];

    if (minDate && maxDate) {
      const YY = value.year;
      const minYY = minDate.getFullYear();
      const maxYY = maxDate.getFullYear();
      const rest = maxYY - minYY + 1;

      const years = this.getYearOptions(value);
      const minIndex = years.map(year => year.value).indexOf(minYY);
      years.splice(minIndex, rest);
      disabledYears.push(...years.map(year => year.value));

      if (maxYY === YY) {
        const maxMM = maxDate.getMonth();
        disabledMonths.push(...this.initializeArray(12 - maxMM, maxMM + 1));
      }

      if (minYY === YY) {
        const minMM = minDate.getMonth();

        disabledMonths.push(...this.initializeArray(12 - minMM, minMM + 1));
      }
    }

    return { disabledMonths, disabledYears };
  };

  initializeArray = (length: number, start: number): number[] =>
    Array.from({ length: Math.ceil(length + 1 - start) }).map((v, i) => i + 1 * start);

  onSetDate = (day: number) => {
    const { onSetDate } = this.props;
    if (onSetDate) onSetDate(day);
  };

  onSetTime = (time: Highlight) => {
    const { onSetTime } = this.props;
    if (onSetTime) onSetTime(time);
  };

  onChange = (value: Value) => {
    const { disabledMonths, disabledYears } = this.calculateDisabledOptions(value);
    const newDate = new Date();
    this.setState(
      {
        value: { year: newDate.getUTCFullYear(), month: newDate.getUTCMonth() },
        disabledMonths,
        disabledYears,
      },
      () => {
        const { onChange } = this.props;
        if (onChange) onChange(value);
      }
    );
  };

  onChangeMonth = (n: number) => {
    const { minDate, maxDate } = this.props;
    const { value } = this.state;
    const newValue = { year: value.year, month: n };
    const newDate = new Date(value.year, n);

    if ((maxDate && newDate > maxDate) || (minDate && newDate < minDate)) return;

    this.setState({ show: 'calendar' });
    this.onChange(newValue);
  };

  onChangeYear = (n: number) => {
    const { minDate, maxDate } = this.props;
    const { value } = this.state;
    const newValue = { year: n, month: value.month };
    const newDate = new Date(n, value.month);

    if ((maxDate && newDate > maxDate) || (minDate && newDate < minDate)) return;

    this.setState({ show: 'mm' });
    this.onChange(newValue);
  };

  onChangeDecade = (n: number) => {
    const { minDate, maxDate } = this.props;
    const { value } = this.state;
    const newValue = { year: n, month: value.month };

    if (minDate && maxDate) {
      const minYY = minDate.getFullYear();
      const maxYY = maxDate.getFullYear();
      const maxYY10 = n + 9;

      if (minYY >= n && minYY <= maxYY10) {
        this.setState({ show: 'yy' });
        this.onChange({ year: minDate.getUTCFullYear(), month: minDate.getUTCMonth() });
      } else if (maxYY >= n && maxYY <= maxYY10) {
        this.setState({ show: 'yy' });
        this.onChange({ year: maxDate.getUTCFullYear(), month: maxDate.getUTCMonth() });
      }
    } else {
      this.setState({ show: 'yy' });
      this.onChange(newValue);
    }
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
    const { maxDate } = this.props;
    const { value } = this.state;

    let year = value.year;
    let month = value.month + 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }

    const currentVisibleDate = new Date(value.year, month);
    if (maxDate && currentVisibleDate > endOfMonth(maxDate)) return;

    this.onChange({ year, month });
  };

  decrementMonth = () => {
    const { minDate } = this.props;
    const { value } = this.state;

    let { year } = value;
    let month = value.month - 1;
    if (month < 0) {
      month = 11;
      year -= 1;
    }

    const currentVisibleDate = new Date(value.year, month);
    if (minDate && currentVisibleDate < startOfMonth(minDate)) return;

    this.onChange({ year, month });
  };

  increment10Years = () => {
    const { maxDate } = this.props;
    const { value } = this.state;

    const year = value.year + 10;

    const currentVisibleDate = new Date(year, value.month);
    if (maxDate && currentVisibleDate > maxDate) return;

    this.onChange({ year, month: value.month });
  };

  decrement10Years = () => {
    const { minDate } = this.props;
    const { value } = this.state;

    const year = value.year - 10;

    const currentVisibleDate = new Date(year, value.month);
    if (minDate && currentVisibleDate < minDate) return;

    this.onChange({ year, month: value.month });
  };

  incrementYears = () => {
    const { maxDate } = this.props;
    const { value } = this.state;

    const year = value.year + 1;

    const currentVisibleDate = new Date(year, value.month);
    if (maxDate && currentVisibleDate < maxDate) return;

    this.onChange({ year, month: value.month });
  };

  decrementYears = () => {
    const { minDate } = this.props;
    const { value } = this.state;

    const year = value.year - 1;

    const currentVisibleDate = new Date(year, value.month);
    if (minDate && currentVisibleDate < minDate) return;

    this.onChange({ year, month: value.month });
  };

  showDecade() {
    const { value } = this.state;
    const tmp = value.year;
    const startYear = tmp - tmp % 10;
    const decade = `${startYear} - ${startYear + 9}`;

    return decade;
  }

  getMonthOptions(): Option[] {
    return [...Array(12)].map((v, i) => ({
      value: i,
      name: format(new Date(2000, i, 1), 'MMM'),
    }));
  }

  getYearOptions(value: Value): Option[] {
    const tmp = value.year;
    const startYear = tmp - tmp % 10;

    return [...Array(10)].map((v, i) => ({
      value: startYear + i,
      name: `${startYear + i}`,
    }));
  }

  getYearDecadeOptions(value: Value, cnt: number = 5): Option[] {
    const tmp = value.year;
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
      return { left: 0 };
    } else if (!leftArrow && rightArrow) {
      return { right: 0 };
    }
    return { justifyContent: 'space-between' };
  }

  render() {
    const { show, value, monthsOptions, disabledMonths, disabledYears } = this.state;
    const { time, highlight, visibleTime, leftArrow, rightArrow, minDate, maxDate } = this.props;

    if (show === 'yy10') {
      const curYear = value.year;
      return (
        <div className="calendar_container">
          <div className="table">
            <span className="span">
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
        <div className="calendar_container">
          <div className="table">
            <div className="c_button_container">
              <button onClick={this.decrement10Years}>
                <SvgIcon file={arrowLeft} />
              </button>
              <span className="span" onClick={this.showDecadeTable}>
                {this.showDecade()}
              </span>
              <button onClick={this.increment10Years}>
                <SvgIcon file={arrowRight} />
              </button>
            </div>
            <TableSelect
              options={this.getYearOptions(value)}
              cols={4}
              value={value.year}
              onChange={this.onChangeYear}
              disabled={disabledYears}
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
        <div className="calendar_container">
          <div className="table">
            <div className="c_button_container">
              <button onClick={this.decrementYears}>
                <SvgIcon file={arrowLeft} />
              </button>

              <span className="span" onClick={this.showYearTable}>
                {value.year}
              </span>

              <button onClick={this.incrementYears}>
                <SvgIcon file={arrowRight} />
              </button>
            </div>
            <TableSelect
              options={monthsOptions}
              cols={4}
              value={value.month}
              onChange={this.onChangeMonth}
              disabled={disabledMonths}
            />
            <Button onClick={this.showCalendar} xs>
              Назад
            </Button>
          </div>
        </div>
      );
    }

    let isHiddenLeft = false;
    let isHiddenRight = false;

    if (minDate && maxDate) {
      const startOfMinMonth = startOfMonth(minDate);
      const endOfMaxMonth = endOfMonth(maxDate);
      isHiddenLeft = new Date(value.year, value.month - 1) < startOfMinMonth;
      isHiddenRight = new Date(value.year, value.month + 1) > endOfMaxMonth;
    }

    return (
      <div className="calendar_container">
        <div className="btns" style={this.getBtnStyle()}>
          {leftArrow && (
            <button
              className="left_arrow"
              onClick={this.decrementMonth}
              style={isHiddenLeft ? { visibility: 'hidden' } : { cursor: 'pointer' }}
            >
              <SvgIcon file={arrowLeft} />
            </button>
          )}
          {rightArrow && (
            <button
              className="right_arrow"
              onClick={this.incrementMonth}
              style={isHiddenRight ? { visibility: 'hidden' } : { cursor: 'pointer' }}
            >
              <SvgIcon file={arrowRight} />
            </button>
          )}
        </div>
        <CalendarMonthGrid
          highlight={highlight}
          value={value}
          onClickMonth={this.showMonthTable}
          onSetDate={this.onSetDate}
          minDate={minDate}
          maxDate={maxDate}
        />
        {time && <TimePicker date={visibleTime} onSetTime={this.onSetTime} />}
      </div>
    );
  }
}

export default CalendarDate;
