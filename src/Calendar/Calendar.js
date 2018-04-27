/* @flow */
/* eslint-disable no-nested-ternary */

import React from 'react';
import {
  startOfMonth,
  endOfMonth,
  addMonths,
  setHours,
  setMinutes,
  setSeconds,
  format
} from 'date-fns';
import Button from '../Button/Button';
import CalendarDateTimePicker from './DateTimePicker/CalendarDateTimePicker';
import s from './DateTimePicker/MainCalendar.scss';
import { getValueFromDate, type Highlight } from './helpers';

export type StringValue = { min: string, max: string };

export type DateValue = { min: Date, max: Date };

type Value = { year: number, month: number, day?: number };

type Props = {
  value?: StringValue,
  highlight?: DateValue,
  minDate?: Date,
  maxDate?: Date,
  singleCalendar?: boolean,
  time?: boolean,
  hideResetBtn?: boolean,
  hideSubmitBtn?: boolean,
  onChange?: Function,
  onSubmit?: Function,
  toggleCalendar?: Function
};

type State = {
  highlight: Highlight | Highlight[],
  value: { min: Value, max: Value },
  singleCalendar: boolean,
  time: boolean,
  isCalendarShown: boolean,
  isNextClickAwaited: boolean,
  firstDate: Highlight,
  secondDate: Highlight
};

export default class Calendar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { firstDate, secondDate } = this.calculateRangeFromProps(props);
    const prevCurrentMonthValue = getValueFromDate(addMonths(new Date(), -1));
    const currentMonthValue = getValueFromDate();

    this.state = {
      value: props.value
        ? this.convertValueToStateValue(props.value)
        : props.highlight
          ? this.convertValueToStateValue(props.highlight)
          : {
              min: this.combineStateValue(prevCurrentMonthValue),
              max: this.combineStateValue(currentMonthValue)
            },
      highlight: props.highlight
        ? this.convertValueToArray(props.highlight)
        : props.value
          ? this.convertValueToArray(props.value)
          : this.getDefaultHighlight(props.singleCalendar),
      time: props.time || false,
      singleCalendar: props.singleCalendar || false,
      isCalendarShown: true,
      isNextClickAwaited: false,
      firstDate,
      secondDate
    };
  }

  combineStateValue = (value: any): Value => ({ ...value, day: value.day || 1 });

  getDefaultHighlight = (isSingleCalendar?: boolean): Highlight[] | Highlight => {
    const defaultHighlight = getValueFromDate();

    if (isSingleCalendar) {
      return defaultHighlight;
    }
    return [defaultHighlight, defaultHighlight];
  };

  calculateRangeFromProps = (props: Props): { firstDate: Highlight, secondDate: Highlight } => {
    const { minDate, maxDate } = this.props;
    const minRangeValue = getValueFromDate(minDate);
    const maxRangeValue = getValueFromDate(maxDate);

    if (props.value) {
      const { min, max } = props.value || {};
      const minDateValue = new Date(min);
      const maxDateValue = new Date(max);

      const maxDateRangeValue = getValueFromDate(maxDateValue);
      const minDateRangeValue = getValueFromDate(minDateValue);
      const minEndOfDayValue = minDate
        ? getValueFromDate(this.convertToEndOfDay(minDate))
        : getValueFromDate();
      const maxEndOfDayValue = maxDate
        ? getValueFromDate(this.convertToEndOfDay(maxDate))
        : getValueFromDate();

      if (minDate && !maxDate) {
        if (minDateValue < minDate && maxDateValue >= minDate) {
          return { firstDate: minRangeValue, secondDate: maxDateRangeValue };
        } else if (minDateValue < minDate && maxDateValue < minDate) {
          return { firstDate: minRangeValue, secondDate: minEndOfDayValue };
        }
      }

      if (maxDate) {
        if (maxDateValue > maxDate && minDateValue <= maxDate) {
          if (minDate && minDateValue >= minDate) {
            return { firstDate: minDateRangeValue, secondDate: maxEndOfDayValue };
          } else if (minDate && minDateValue < minDate) {
            return { firstDate: minRangeValue, secondDate: maxEndOfDayValue };
          } else if (!minDate) {
            return { firstDate: minDateRangeValue, secondDate: maxEndOfDayValue };
          }
        } else if (maxDateValue > maxDate && minDateValue > maxDate) {
          return { firstDate: maxRangeValue, secondDate: maxEndOfDayValue };
        }
      }

      return { firstDate: minDateRangeValue, secondDate: maxDateRangeValue };
    } else if (props.highlight) {
      const { min, max } = props.highlight || {};
      const minRangeHighlight = getValueFromDate(min);
      const maxRangeHighlight = getValueFromDate(max);

      if (minDate && min < minDate) {
        return { firstDate: minRangeValue, secondDate: maxRangeHighlight };
      } else if (maxDate && max > maxDate) {
        return { firstDate: minRangeHighlight, secondDate: maxRangeValue };
      }

      return { firstDate: minRangeHighlight, secondDate: maxRangeHighlight };
    }
    return { firstDate: getValueFromDate(), secondDate: getValueFromDate() };
  };

  convertValueToStateValue = (value: StringValue | DateValue): { min: Value, max: Value } => {
    const { minDate, maxDate } = this.props;
    const { min, max } = value || {};

    const minDateValue = this.convertToStartOfDay(new Date(min));
    const maxDateValue = this.convertToEndOfDay(new Date(max));
    const nextMonth: Date = startOfMonth(addMonths(minDateValue, 1));
    const prevMonth: Date = endOfMonth(addMonths(minDateValue, -1));

    const prevMonthValue = getValueFromDate(prevMonth);
    const nextMonthValue = getValueFromDate(nextMonth);
    const minValue = getValueFromDate(minDateValue);
    const maxValue = getValueFromDate(maxDateValue);
    const prevMonthMaxValue = getValueFromDate(addMonths(maxDate, -1));
    const nextMonthMaxValue = getValueFromDate(addMonths(minDate, 1));

    if (maxDate && nextMonth > maxDate) {
      return {
        min: this.combineStateValue(prevMonthValue),
        max: this.combineStateValue(minValue)
      };
    }

    if (maxDate) {
      if (maxDateValue > maxDate && nextMonth > maxDate) {
        return {
          min: this.combineStateValue(prevMonthMaxValue),
          max: this.combineStateValue(maxValue)
        };
      }
    }

    if (minDate) {
      if (minDateValue < minDate && prevMonth < minDate) {
        return {
          min: this.combineStateValue(minValue),
          max: this.combineStateValue(nextMonthMaxValue)
        };
      }
    }

    return {
      min: this.combineStateValue(minValue),
      max: this.combineStateValue(nextMonthValue)
    };
  };

  convertValueToArray = (value: StringValue | DateValue): Highlight[] | Highlight => {
    const { minDate, maxDate } = this.props;
    const arrayOfDate = Object.keys(value).map(key => {
      const minValue = new Date(value.min);
      const maxValue = new Date(value.max);

      if (minDate) {
        if (minValue < minDate) return getValueFromDate(minDate);
      } else if (maxDate) {
        if (maxValue > maxDate) return getValueFromDate(maxDate);
      }
      const date = new Date(value[key]);
      return getValueFromDate(date);
    });

    if (this.props.singleCalendar) return arrayOfDate[0];
    return arrayOfDate;
  };

  convertToStartOfDay = (date: Date): Date => setSeconds(setMinutes(setHours(date, 0), 0), 0);

  convertToEndOfDay = (date: Date): Date => setSeconds(setMinutes(setHours(date, 23), 59), 59);

  getValue = (first: Highlight, second: Highlight): StringValue => {
    let value;
    const firstDate = new Date(Date.UTC(first.year, first.month, first.day));
    const secondDate = new Date(Date.UTC(second.year, second.month, second.day));
    if (firstDate < secondDate) {
      value = {
        min: format(firstDate),
        max: format(this.convertToEndOfDay(secondDate))
      };
    } else {
      value = {
        min: format(secondDate),
        max: format(this.convertToEndOfDay(firstDate))
      };
    }
    return value;
  };

  onSetFirstDate = (date: Value): void => {
    const { onChange } = this.props;
    if (!Array.isArray(this.state.highlight)) return;

    const highlight = this.state.highlight.slice();

    if (highlight.length > 1) {
      highlight.pop();
      highlight.push({ ...date, day: date.day || 1, hour: 0, minute: 0, second: 0 });
    }

    const [secondDate, firstDate] = highlight;
    this.setState(
      {
        firstDate,
        secondDate,
        highlight
      },
      () => {
        if (onChange) {
          const value = this.getValue(firstDate, secondDate);
          onChange({}, value);
        }
      }
    );
  };

  onSetSecondDate = (date: Value): void => {
    const { onChange } = this.props;
    if (!Array.isArray(this.state.highlight)) return;

    const highlight = this.state.highlight.slice();

    if (highlight.length > 1) {
      highlight.shift();
      highlight.unshift({ ...date, day: date.day || 1, hour: 0, minute: 0, second: 0 });
    }

    const [secondDate, firstDate] = highlight;
    this.setState(
      {
        firstDate,
        secondDate,
        highlight
      },
      () => {
        if (onChange) {
          const value = this.getValue(firstDate, secondDate);
          onChange({}, value);
        }
      }
    );
  };

  onSetDate = (date: Value): void => {
    const { onChange } = this.props;
    const highlight = { ...date, day: date.day || 1, hour: 0, minute: 0, second: 0 };

    this.setState({ highlight }, () => {
      if (onChange) {
        const value = this.getValue(highlight, highlight);
        onChange({}, value);
      }
    });
  };

  onSetDateByClick = (date: Value): void => {
    const { onChange } = this.props;
    const { isNextClickAwaited } = this.state;
    if (!Array.isArray(this.state.highlight)) return;

    const highlight = this.state.highlight.slice();

    if (highlight.length > 1) {
      highlight.shift();
      highlight.push({ ...date, day: date.day || 1, hour: 0, minute: 0, second: 0 });
    }

    if (!isNextClickAwaited) {
      const [secondDate, firstDate] = highlight;
      this.setState(
        {
          isNextClickAwaited: true,
          firstDate,
          secondDate,
          highlight
        },
        () => {
          if (onChange) {
            const value = this.getValue(firstDate, secondDate);
            onChange({}, value);
          }
        }
      );
    }

    if (isNextClickAwaited) {
      const [secondDate, firstDate] = highlight;
      this.setState(
        {
          isNextClickAwaited: false,
          firstDate,
          secondDate,
          highlight
        },
        () => {
          if (onChange) {
            const value = this.getValue(firstDate, secondDate);
            onChange({}, value);
          }
        }
      );
    }
  };

  onChangeMin = ({ year, month, day = 1 }: Value): void => {
    const cloneValue = {};
    cloneValue.min = { year, month, day };
    cloneValue.max = { year, month: month + 1, day };

    this.setState({ value: cloneValue });
  };

  onChangeMax = ({ year, month, day = 1 }: Value): void => {
    const cloneValue = {};
    cloneValue.max = { year, month, day };
    cloneValue.min = { year, month: month - 1, day };

    this.setState({ value: cloneValue });
  };

  onChangeSingleCalendar = ({ year, month, day }: Value): void => {
    const cloneValue = {};
    const date = { year, month, day };
    cloneValue.min = date;
    cloneValue.max = date;

    this.setState({ value: cloneValue });
  };

  onChangeCalendarVisibility = (): void => {
    const { isCalendarShown } = this.state;
    this.setState({ isCalendarShown: !isCalendarShown });
  };

  resetState = () => {
    const dateNow = getValueFromDate(new Date());
    this.setState({
      firstDate: dateNow,
      secondDate: dateNow,
      highlight: [dateNow, dateNow]
    });
  };

  onSubmit = () => {
    const { highlight } = this.state;
    const { onSubmit, toggleCalendar } = this.props;
    let stringValue;
    if (Array.isArray(highlight)) {
      const [firstDate, secondDate] = highlight;
      stringValue = this.getValue(firstDate, secondDate);
    } else {
      stringValue = this.getValue(highlight, highlight);
    }

    if (onSubmit) onSubmit({}, stringValue);
    if (toggleCalendar) toggleCalendar();
  };

  renderSingleCalendar = () => {
    const { maxDate, minDate } = this.props;
    const { time, value, highlight, isCalendarShown } = this.state;
    const { min } = value || {};
    if (Array.isArray(highlight)) return null;

    return (
      <div className={s.container}>
        <CalendarDateTimePicker
          time={time}
          value={{ year: min.year, month: min.month, day: min.day }}
          highlight={highlight}
          visibleDate={highlight}
          isCalendarShown={isCalendarShown}
          onSetDate={this.onSetDate}
          onChange={this.onChangeSingleCalendar}
          onChangeCalendarVisibility={this.onChangeCalendarVisibility}
          maxDate={maxDate}
          minDate={minDate}
          leftArrow
          rightArrow
        />
      </div>
    );
  };

  renderDualCalendar = () => {
    const { maxDate, minDate, hideResetBtn, hideSubmitBtn } = this.props;
    const { time, value, highlight, isCalendarShown, firstDate, secondDate } = this.state;
    const { min, max } = value || {};

    return (
      <div>
        <div className={s.container}>
          <CalendarDateTimePicker
            time={time}
            value={{ year: min.year, month: min.month, day: min.day }}
            highlight={highlight}
            visibleDate={firstDate}
            onChange={this.onChangeMin}
            onSetDate={this.onSetFirstDate}
            isCalendarShown={isCalendarShown}
            onSetDateByClick={this.onSetDateByClick}
            onChangeCalendarVisibility={this.onChangeCalendarVisibility}
            maxDate={maxDate}
            minDate={minDate}
            leftArrow
          />
          <CalendarDateTimePicker
            time={time}
            value={{ year: max.year, month: max.month, day: max.day }}
            highlight={highlight}
            visibleDate={secondDate}
            onChange={this.onChangeMax}
            onSetDate={this.onSetSecondDate}
            isCalendarShown={isCalendarShown}
            onSetDateByClick={this.onSetDateByClick}
            onChangeCalendarVisibility={this.onChangeCalendarVisibility}
            maxDate={maxDate}
            minDate={minDate}
            rightArrow
          />
        </div>
        <div className={s.calendarBtn}>
          {!hideResetBtn && (
            <Button onClick={this.resetState} red xs>
              Очистить
            </Button>
          )}
          {!hideSubmitBtn && (
            <Button onClick={this.onSubmit} blue filled xs>
              Подтвердить
            </Button>
          )}
        </div>
      </div>
    );
  };

  render() {
    const { highlight, singleCalendar } = this.state;

    if (singleCalendar && !Array.isArray(highlight)) {
      return this.renderSingleCalendar();
    }

    return this.renderDualCalendar();
  }
}
