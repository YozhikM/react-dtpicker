/* @flow */

import React from 'react';
import CalendarDate from '../Calendar/CalendarDate';
import MaskedInput from 'react-text-mask';
import SvgIcon from '../SvgIcon';
import s from './Calendar.scss';
import { format, isValid, isSameDay } from 'date-fns';

type Props = {|
  highlight: Array<Date> | Date,
  value: Date,
  visibleDate?: Date,
  time?: boolean,
  onChangeCalendarVisibility?: boolean => void,
  isCalendarShown?: boolean,
  onChange?: (value: Date) => void,
  borderLeft?: boolean,
  borderRight?: boolean,
  icon?: boolean,
  onSetDate: (date: Date) => void,
  leftArrow?: boolean,
  rightArrow?: boolean,
|};
type State = {|
  highlight: Array<Date> | Date,
  value: Date,
  visibleDate: Date,
  isCalendarShown: boolean,
  inputValue: string,
|};

class CalendarDateTimePicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      highlight: this.props.highlight,
      visibleDate: this.props.visibleDate,
      value: this.props.value,
      isCalendarShown: !!this.props.isCalendarShown,
      inputValue: '',
    };
  }

  formatWithTime = (date: Date) => {
    return format(date, 'DD/MM/YYYY HH:mm');
  };
  formatWithoutTime = (date: Date) => {
    return format(date, 'DD/MM/YYYY');
  };

  componentWillMount() {
    const { visibleDate, time } = this.props;
    if (time) {
      this.setState({ inputValue: this.formatWithTime(visibleDate) });
    } else {
      this.setState({
        inputValue: this.formatWithoutTime(visibleDate),
      });
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { time } = this.props;
    if (nextProps.time !== time) {
      if (time) {
        this.setState({
          inputValue: this.formatWithTime(nextProps.visibleDate),
        });
      } else {
        this.setState({
          inputValue: this.formatWithoutTime(nextProps.visibleDate),
        });
      }
    }
    if (
      nextProps.visibleDate !== this.state.visibleDate &&
      !isSameDay(nextProps.visibleDate, this.props.value)
    ) 
		this.setState({ visibleDate: nextProps.visibleDate });
	{
      if (time) {
        this.setState({
          inputValue: this.formatWithTime(nextProps.visibleDate),
        });
      } else {
        this.setState({
          inputValue: this.formatWithoutTime(nextProps.visibleDate),
        });
      }
    }

    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }

    if (nextProps.isCalendarShown !== this.state.isCalendarShown) {
      this.setState({ isCalendarShown: nextProps.isCalendarShown });
    }
  }

  onChangeInputValue = (e: any) => {
    const { onChange, onSetDate, time } = this.props;
    const value = e.target.value;
    this.setState({ inputValue: value });
    let userDate;
    const YY = Number(value.substr(6, 4));
    const MM = Number(value.substr(3, 2)) - 1;
    const DD = Number(value.substr(0, 2));
    const HH = Number(value.substr(11, 2));
    const mm = Number(value.substr(14, 2));
    if (time) {
      userDate = new Date(YY, MM, DD, HH, mm);
    } else {
      userDate = new Date(YY, MM, DD);
    }
    if (value.length > 0 && onSetDate && isValid(userDate)) {
      onSetDate(userDate);
      onChange(userDate);
    }
  };

  onFocusInput = () => {
    const { isCalendarShown } = this.state;
    if (!isCalendarShown) {
      this.onChangeVisibility();
    }
  };

  onPressEnter = (e: Event) => {
    if (e.key === 'Enter') {
      this.onChangeVisibility();
    }
  };

  onChangeVisibility = () => {
    const { isCalendarShown } = this.state;
    const { onChangeCalendarVisibility } = this.props;
    if (onChangeCalendarVisibility) {
      onChangeCalendarVisibility(!isCalendarShown);
    }
  };

  onChange = (value: Date) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  onSetDate = (date: Date) => {
    const { time } = this.props;
    if (time) {
      this.setState({
        inputValue: this.formatWithTime(date),
      });
    } else {
      this.setState({
        inputValue: this.formatWithoutTime(date),
      });
    }
    const { onSetDate } = this.props;
    if (onSetDate) onSetDate(date);
  };

  onSetTime = (time: Date) => {
    this.setState({
      visibleDate: time,
      inputValue: this.formatWithTime(time),
    });
  };

  render() {
    const {
      highlight,
      borderLeft,
      borderRight,
      icon,
      leftArrow,
      rightArrow,
      time,
      isCalendarShown,
      visibleDate,
	  isSingleCalendar
    } = this.props;
    const { inputValue, value } = this.state;
    const iconStyle = {
      display: icon ? 'flex' : 'none',
    };
    const borderStyle = {
      borderLeft: borderLeft ? '3px solid #34495e' : 0,
      borderRight: borderRight ? '3px solid #34495e' : 0,
    };
    let mask;
    if (time) {
      mask = [
        /[0-9]/,
        /\d/,
        '/',
        /\d/,
        /\d/,
        '/',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        /\d/,
        /\d/,
        ':',
        /\d/,
        /\d/,
      ];
    } else {
      mask = [
        /[0-9]/,
        /\d/,
        '/',
        /\d/,
        /\d/,
        '/',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ];
    }

    return (
      <div className={s.container}>
        <MaskedInput
          mask={mask}
          className={s.input}
          style={borderStyle}
          type="text"
          onChange={this.onChangeInputValue}
          onFocus={this.onFocusInput}
          onKeyPress={this.onPressEnter}
          value={inputValue}
          showMask
        />
        <div
          onClick={this.onChangeVisibility}
          className={s.icon}
          style={iconStyle}
        >
          <SvgIcon file="calendar" />
        </div>
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
			isSingleCalendar={isSingleCalendar}
          />
        )}
      </div>
    );
  }
}

export default CalendarDateTimePicker;
