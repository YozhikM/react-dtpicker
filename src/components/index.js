/* @flow */

import React from 'react';
import { addMonths, setHours, setMinutes } from 'date-fns';
import SingleCalendar from './Calendar/SingleCalendar';
import CalendarDateTimePicker from './Calendar/CalendarDateTimePicker';
import s from './Calendar/MainCalendar.scss';

type Value = { min: string, max: string };

type DateValue = { min: Date, max: Date };

type Props = {
  value?: Value,
  isSingleCalendar?: boolean,
  time?: boolean,
  onChange?: Function,
};

type State = {
  highlight: Date | Array<Date>,
  value: DateValue,
  time: boolean,
  isCalendarShown: boolean,
  isSingleCalendar: boolean,
  isNextClickAwaited: boolean,
  firstDate: Date,
  secondDate: Date,
};

export default class Calendar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      // eslint-disable-next-line no-nested-ternary
      value: props.value
        ? this.convertValueToDate(props.value)
        : { min: new Date(), max: addMonths(new Date(), 1) },
      // eslint-disable-next-line no-nested-ternary
      highlight: props.value
        ? this.convertToArray(props.value)
        : props.isSingleCalendar ? new Date() : [new Date(), new Date()],
      time: props.time || false,
      isSingleCalendar: props.isSingleCalendar || false,
      isCalendarShown: true,
      isNextClickAwaited: false,
      firstDate: props.value && props.value.min ? new Date(props.value.min) : new Date(),
      secondDate: props.value && props.value.max ? new Date(props.value.max) : new Date(),
    };
  }

  convertValueToDate = (value: Value): DateValue => {
    const { min } = value || {};
    const date = new Date(min);
    return {
      min: date,
      max: addMonths(date, 1),
    };
  };

  convertToArray = (value: Value): Array<Date> | Date => {
    const arrayOfDate = Object.keys(value).map(v => new Date(value[v]));

    if (this.props.isSingleCalendar) return arrayOfDate[0];
    return arrayOfDate;
  };

  getValue = (firstDate: Date, secondDate: Date): Value => {
    let value;
    if (firstDate < secondDate) {
      value = {
        min: firstDate.toISOString(),
        max: secondDate.toISOString(),
      };
    } else {
      value = {
        min: secondDate.toISOString(),
        max: firstDate.toISOString(),
      };
    }
    return value;
  };

  onSetDate = (date: Date) => {
    const { onChange } = this.props;
    const { isNextClickAwaited, isSingleCalendar } = this.state;

    if (!isSingleCalendar && Array.isArray(this.state.highlight)) {
      const highlight = this.state.highlight.slice();
      highlight.push(date);

      if (highlight.length > 2) {
        highlight.shift();
      }

      const [first, second] = highlight;
      const firstDate = new Date(first.toUTCString());
      const secondDate = new Date(second.toUTCString());

      if (!isNextClickAwaited) {
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
    } else {
      this.setState({ highlight: date }, () => {
        if (onChange) {
          const min: Date = setHours(date, 0);
          const max: Date = setHours(setMinutes(min, 59), 23);
          const value = this.getValue(min, max);
          onChange({}, value);
        }
      });
    }
  };

  onChangeMin = (date: Date) => {
    const { onChange } = this.props;
    const { value } = this.state;
    const cloneValue = { ...value };
    cloneValue.min = date;
    cloneValue.max = addMonths(date, 1);

    this.setState({ value: cloneValue });
    if (onChange) onChange({}, cloneValue);
  };

  onChangeMax = (date: Date) => {
    const { onChange } = this.props;
    const { value } = this.state;
    const cloneValue = { ...value };
    cloneValue.max = date;
    cloneValue.min = addMonths(date, -1);

    this.setState({ value: cloneValue });
    if (onChange) onChange({}, cloneValue);
  };

  onChangeSingleCalendar = (date: Date) => {
    const { onChange } = this.props;
    const { value } = this.state;
    const cloneValue = { ...value };
    cloneValue.min = date;
    cloneValue.max = date;

    this.setState({ value: cloneValue });
    if (onChange) onChange({}, cloneValue);
  };

  onChangeCalendarVisibility = () => {
    const { isCalendarShown } = this.state;
    this.setState({ isCalendarShown: !isCalendarShown });
  };

  render() {
    const {
      time,
      value,
      highlight,
      isCalendarShown,
      isSingleCalendar,
      firstDate,
      secondDate,
    } = this.state;

    const { min, max } = value || {};

    if (isSingleCalendar && !Array.isArray(highlight)) {
      return (
        <SingleCalendar
          time={time}
          value={min}
          highlight={highlight}
          visibleDate={highlight}
          isCalendarShown={isCalendarShown}
          onSetDate={this.onSetDate}
          onChange={this.onChangeSingleCalendar}
          onChangeCalendarVisibility={this.onChangeCalendarVisibility}
          leftArrow
          rightArrow
        />
      );
    }
    return (
      <div className={s.container}>
        <CalendarDateTimePicker
          time={time}
          value={min}
          highlight={highlight}
          visibleDate={firstDate}
          isCalendarShown={isCalendarShown}
          onSetDate={this.onSetDate}
          onChange={this.onChangeMin}
          onChangeCalendarVisibility={this.onChangeCalendarVisibility}
          leftArrow
        />
        <CalendarDateTimePicker
          time={time}
          value={max}
          highlight={highlight}
          visibleDate={secondDate}
          isCalendarShown={isCalendarShown}
          onSetDate={this.onSetDate}
          onChange={this.onChangeMax}
          onChangeCalendarVisibility={this.onChangeCalendarVisibility}
          rightArrow
        />
      </div>
    );
  }
}
