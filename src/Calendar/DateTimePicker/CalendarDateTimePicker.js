/* @flow */

import React from 'react';
import SvgIcon from '../../SvgIcon/SvgIcon';
import CalendarDate from '../DateTimePicker/CalendarDate';
import DateMaskInput from '../DateMaskInput';
import s from './MainCalendar.scss';
import calendar from '../../SvgIcon/svg-icons/calendar.svg';
import { getValueFromDate, type Highlight } from '../helpers';

type Value = { year: number, month: number, day?: number };

type Props = {
  value: Value,
  visibleDate?: Highlight,
  highlight: Highlight[] | Highlight,
  minDate?: Date,
  maxDate?: Date,
  onChange?: Value => void,
  onSetDate?: Value => void,
  onSetDateByClick?: Value => void,
  time?: boolean,
  icon?: boolean,
  leftArrow?: boolean,
  rightArrow?: boolean,
  isCalendarShown?: boolean,
};

type State = {
  value: Value,
  visibleDate: Highlight,
  isCalendarShown: boolean,
};

class CalendarDateTimePicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      visibleDate: this.props.visibleDate || getValueFromDate(new Date()),
      value: this.props.value,
      isCalendarShown: !!this.props.isCalendarShown,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.visibleDate !== this.state.visibleDate)
      this.setState({ visibleDate: nextProps.visibleDate });

    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }

    if (nextProps.isCalendarShown !== this.state.isCalendarShown) {
      this.setState({ isCalendarShown: nextProps.isCalendarShown });
    }
  }

  onChangeInputValue = (date: Date) => {
    const { onChange, onSetDate } = this.props;

    if (date && onSetDate) {
      onSetDate({ year: date.getUTCFullYear(), month: date.getUTCMonth(), day: date.getUTCDate() });
    }
    if (date && onChange) {
      onChange({ year: date.getUTCFullYear(), month: date.getUTCMonth(), day: date.getUTCDate() });
    }
  };

  onChange = (value: Value) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(value);
    }
  };

  onSetDate = (day: number) => {
    const { onSetDateByClick } = this.props;
    const { value } = this.state;

    if (onSetDateByClick) onSetDateByClick({ year: value.year, month: value.month, day });
  };

  onSetTime = (visibleDate: Highlight) => {
    this.setState({ visibleDate });
  };

  render() {
    const {
      highlight,
      icon,
      leftArrow,
      rightArrow,
      time,
      isCalendarShown,
      visibleDate,
      maxDate,
      minDate,
    } = this.props;
    const { value } = this.state;
    const style = {
      width: '80%',
    };

    return (
      <div className="container">
        <DateMaskInput
          style={style}
          visibleDate={visibleDate}
          onChange={this.onChangeInputValue}
          minDate={minDate}
          maxDate={maxDate}
        />
        {icon && (
          <div className="icon">
            <SvgIcon file={calendar} />
          </div>
        )}
        {isCalendarShown && (
          <CalendarDate
            highlight={highlight}
            value={value}
            visibleTime={visibleDate}
            onSetDate={this.onSetDate}
            onSetTime={this.onSetTime}
            onChange={this.onChange}
            leftArrow={leftArrow}
            rightArrow={rightArrow}
            maxDate={maxDate}
            minDate={minDate}
            time={time}
          />
        )}
      </div>
    );
  }
}

export default CalendarDateTimePicker;
