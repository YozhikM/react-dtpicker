/* @flow */
/* eslint-disable no-nested-ternary */

import React from 'react';
import { addMonths, setHours, setMinutes, setSeconds } from 'date-fns';
import CalendarDateTimePicker from './DateTimePicker/CalendarDateTimePicker';
import './DateTimePicker/MainCalendar.scss';

export type StringValue = { min: string, max: string };

export type DateValue = { min: Date, max: Date };

type Props = {
  value?: StringValue,
  highlight?: DateValue,
  minDate?: Date,
  maxDate?: Date,
  singleCalendar?: boolean,
  time?: boolean,
  onChange?: Function,
  onSubmit?: Function,
  toggleCalendar?: Function,
};

type State = {
  highlight: Date | Array<Date>,
  value: DateValue,
  singleCalendar: boolean,
  time: boolean,
  isCalendarShown: boolean,
  isNextClickAwaited: boolean,
  firstDate: Date,
  secondDate: Date,
};

export default class Calendar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { firstDate, secondDate } = this.calculateRangeFromProps(props);

    this.state = {
      value: props.value
        ? this.convertValueToDate(props.value)
        : props.highlight
          ? this.convertValueToDate(props.highlight)
          : { min: addMonths(new Date(), -1), max: new Date() },
      highlight: props.highlight
        ? this.convertValueToArray(props.highlight)
        : props.value
          ? this.convertValueToArray(props.value)
          : props.singleCalendar ? new Date() : [new Date(), new Date()],
      time: props.time || false,
      singleCalendar: props.singleCalendar || false,
      isCalendarShown: true,
      isNextClickAwaited: false,
      firstDate,
      secondDate,
    };
  }

  calculateRangeFromProps = (props: Props): { firstDate: Date, secondDate: Date } => {
    if (props.value) {
      const { min, max } = props.value || {};
      return { firstDate: new Date(min), secondDate: new Date(max) };
    } else if (props.highlight) {
      const { min, max } = props.highlight || {};
      return { firstDate: min, secondDate: max };
    }
    return { firstDate: new Date(), secondDate: new Date() };
  };

  convertValueToDate = (value: StringValue | DateValue): DateValue => {
    const { min } = value || {};
    const date = new Date(min);

    return {
      min: date,
      max: addMonths(date, 1),
    };
  };

  convertValueToArray = (value: StringValue | DateValue): Array<Date> | Date => {
    const arrayOfDate = Object.keys(value).map(v => new Date(value[v]));

    if (this.props.singleCalendar) return arrayOfDate[0];
    return arrayOfDate;
  };

  convertToEndOfDay = (date: Date): Date => setSeconds(setMinutes(setHours(date, 23), 59), 59);

  getValue = (firstDate: Date, secondDate: Date): StringValue => {
    let value;
    if (firstDate < secondDate) {
      value = {
        min: firstDate.toISOString(),
        max: this.convertToEndOfDay(secondDate).toISOString(),
      };
    } else {
      value = {
        min: secondDate.toISOString(),
        max: this.convertToEndOfDay(firstDate).toISOString(),
      };
    }
    return value;
  };

  onSetFirstDate = (date: Date): void => {
    const { onChange } = this.props;
    if (!Array.isArray(this.state.highlight)) return;

    const highlight = this.state.highlight.slice();

    if (highlight.length > 1) {
      highlight.pop();
      highlight.push(date);
    }

    const [secondDate, firstDate] = highlight;
    this.setState(
      {
        firstDate,
        secondDate,
        highlight,
      },
      () => {
        if (onChange) {
          const value = this.getValue(firstDate, secondDate);
          onChange({}, value);
        }
      }
    );
  };

  onSetSecondDate = (date: Date): void => {
    const { onChange } = this.props;
    if (!Array.isArray(this.state.highlight)) return;

    const highlight = this.state.highlight.slice();

    if (highlight.length > 1) {
      highlight.shift();
      highlight.unshift(date);
    }

    const [secondDate, firstDate] = highlight;
    this.setState(
      {
        firstDate,
        secondDate,
        highlight,
      },
      () => {
        if (onChange) {
          const value = this.getValue(firstDate, secondDate);
          onChange({}, value);
        }
      }
    );
  };

  onSetDate = (date: Date): void => {
    const { onChange } = this.props;

    this.setState({ highlight: date }, () => {
      if (onChange) {
        const min: Date = setHours(date, 0);
        const max: Date = this.convertToEndOfDay(min);
        const value = this.getValue(min, max);
        onChange({}, value);
      }
    });
  };

  onSetDateByClick = (date: Date): void => {
    const { onChange } = this.props;
    const { isNextClickAwaited } = this.state;
    if (!Array.isArray(this.state.highlight)) return;

    const highlight = this.state.highlight.slice();

    if (highlight.length > 1) {
      highlight.shift();
      highlight.push(date);
    }

    if (!isNextClickAwaited) {
      const [secondDate, firstDate] = highlight;
      this.setState(
        {
          isNextClickAwaited: true,
          firstDate,
          secondDate,
          highlight,
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
          highlight,
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

  onChangeMin = (date: Date): void => {
    const { value } = this.state;
    const cloneValue = { ...value };
    cloneValue.min = date;
    cloneValue.max = addMonths(date, 1);

    this.setState({ value: cloneValue });
  };

  onChangeMax = (date: Date): void => {
    const { value } = this.state;
    const cloneValue = { ...value };
    cloneValue.max = date;
    cloneValue.min = addMonths(date, -1);

    this.setState({ value: cloneValue });
  };

  onChangeSingleCalendar = (date: Date): void => {
    const { value } = this.state;
    const cloneValue = { ...value };
    cloneValue.min = date;
    cloneValue.max = date;

    this.setState({ value: cloneValue });
  };

  onChangeCalendarVisibility = (): void => {
    const { isCalendarShown } = this.state;
    this.setState({ isCalendarShown: !isCalendarShown });
  };

  resetState = () => {
    this.setState({
      firstDate: new Date(),
      secondDate: new Date(),
      highlight: [new Date(), new Date()],
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
      <div className="container">
        <CalendarDateTimePicker
          time={time}
          value={min}
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
    const { maxDate, minDate } = this.props;
    const { time, value, highlight, isCalendarShown, firstDate, secondDate } = this.state;
    const { min, max } = value || {};

    return (
      <div
        style={{
          display: 'flex',
          width: '50%',
          margin: '0 auto',
          justifyContent: 'space-around',
        }}
      >
        <CalendarDateTimePicker
          time={time}
          value={min}
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
          value={max}
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
