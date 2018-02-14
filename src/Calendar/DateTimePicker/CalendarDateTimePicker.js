/* @flow */

import React from 'react';
import SvgIcon from '../../SvgIcon/SvgIcon';
import CalendarDate from '../DateTimePicker/CalendarDate';
import DateMaskInput from '../DateMaskInput';
import s from './Calendar.scss';

type Props = {
  value: Date,
  visibleDate?: Date,
  highlight: Array<Date> | Date,
  onChange?: Date => void,
  onSetDate?: Date => void,
  onSetDateByClick?: Date => void,
  time?: boolean,
  icon?: boolean,
  leftArrow?: boolean,
  rightArrow?: boolean,
  isCalendarShown?: boolean,
};

type State = {
  highlight?: Array<Date> | Date,
  value: Date,
  visibleDate: Date,
  isCalendarShown: boolean,
};

class CalendarDateTimePicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      visibleDate: this.props.visibleDate || new Date(),
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
      onSetDate(date);
    }
    if (date && onChange) {
      onChange(date);
    }
  };

  onChange = (value: Date) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(value);
    }
  };

  onSetDate = (date: Date) => {
    const { onSetDateByClick } = this.props;

    if (onSetDateByClick) onSetDateByClick(date);
  };

  onSetTime = (time: Date) => {
    this.setState({
      visibleDate: time,
    });
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
    } = this.props;
    const { value } = this.state;
    const style = {
      width: '80%',
    };

    return (
      <div className={s.container}>
        <DateMaskInput style={style} visibleDate={visibleDate} onChange={this.onChangeInputValue} />
        {icon && (
          <div className={s.icon}>
            <SvgIcon file="calendar" />
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
            time={time}
          />
        )}
      </div>
    );
  }
}

export default CalendarDateTimePicker;
