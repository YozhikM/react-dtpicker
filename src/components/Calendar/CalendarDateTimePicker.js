/* @flow */

import React from 'react';
import CalendarDate from '../Calendar/CalendarDate';
import MaskedInput from 'react-text-mask';
import SvgIcon from '../SvgIcon';
import s from './Calendar.scss';
import { format, isValid } from 'date-fns';

type Props = {
  activeDates: Date,
  date: Date,
  time: boolean,
  onChangeCalendarVisibility: any => void,
  onChangeDay: Date => void,
  range?: Array<Date>,
  isCalendarShown?: boolean,
  onChangeDay?: (date: Date) => void,
  startDate?: Date,
  endDate?: Date
};
type State = {
  activeDates: Date,
  date: Date,
  time: boolean,
  isCalendarShown: boolean,
  inputValue: string
};

class CalendarDateTimePicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      activeDates: this.props.activeDates,
      date: this.props.date,
      time: this.props.time,
      isCalendarShown: !!this.props.isCalendarShown,
      inputValue: ''
    };
  }

  formatWithTime = (activeDates: Date) => {
    return format(activeDates, 'DD/MM/YYYY HH:mm');
  };
  formatWithoutTime = (activeDates: Date) => {
    return format(activeDates, 'DD/MM/YYYY');
  };

  componentWillMount() {
    const { time } = this.state;
    const { activeDates } = this.props;
    if (time) {
      this.setState({ inputValue: this.formatWithTime(activeDates) });
    } else {
      this.setState({ inputValue: this.formatWithoutTime(activeDates) });
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.time !== this.state.time) {
      const { activeDates } = this.state;
      this.setState({ time: nextProps.time });
      this.setState({ inputValue: this.formatWithTime(activeDates) });
    }

    if (nextProps.activeDates !== this.state.activeDates) {
      this.setState({ activeDates: nextProps.activeDates });
    }
  }

  onChangeInputValue = (e: any) => {
    const { onChangeDay } = this.props;
    const { time } = this.state;
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
    this.setState({ date: userDate, activeDates: userDate });
    if (value.length > 0 && onChangeDay && isValid(userDate)) {
      onChangeDay(userDate);
    }
  };

  onClickInput = (e: Event) => {
    const { isCalendarShown, activeDates, time } = this.state;
    if (time) {
      this.setState({ inputValue: this.formatWithTime(activeDates) });
    } else {
      this.setState({ inputValue: this.formatWithoutTime(activeDates) });
    }
    this.setState({ isCalendarShown: !isCalendarShown });
  };

  onBlurInput = () => {
    const { time } = this.state;
    if (time) {
      this.setState({ inputValue: format(this.state.activeDates, 'DD/MM/YYYY HH:mm') });
    } else {
      this.setState({ inputValue: format(this.state.activeDates, 'DD/MM/YYYY') });
    }
  };

  onPressEnter = (e: Event) => {
    const { isCalendarShown } = this.state;
    if (e.key === 'Enter') {
      this.setState({ isCalendarShown: !isCalendarShown });
    }
  };

  onClickIcon = () => {
    const { isCalendarShown } = this.state;
    this.setState({ isCalendarShown: !isCalendarShown });
  };

  onChangeDay = (activeDates: Date) => {
    const { onChangeDay } = this.props;
    this.setState({ activeDates, date: activeDates, inputValue: this.formatWithTime(activeDates) });
    if (onChangeDay) {
      onChangeDay(activeDates);
    }
  };

  onChangeDate = (date: Date) => {
    this.setState({ date, activeDates: date, inputValue: this.formatWithTime(date) });
  };

  render() {
    const { startDate, endDate } = this.props;
    const { isCalendarShown, inputValue, time } = this.state;
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
        /\d/
      ];
    } else {
      mask = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
    }

    return (
      <div className={s.container}>
        <MaskedInput
          mask={mask}
          className={s.input}
          type="text"
          onChange={this.onChangeInputValue}
          onFocus={this.onClickInput}
          onBlur={this.onBlurInput}
          onKeyPress={this.onPressEnter}
          value={inputValue}
          showMask
        />
        <div onClick={this.onClickIcon} className={s.icon}>
          <SvgIcon file="calendar" />
        </div>
        {isCalendarShown && (
          <CalendarDate
            {...this.state}
            onClickDay={this.onChangeDay}
            onChangeDate={this.onChangeDate}
            startDate={startDate}
            endDate={endDate}
            leftArrow
            rightArrow
          />
        )}
      </div>
    );
  }
}

export default CalendarDateTimePicker;
