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
  endDate?: Date,
  borderLeft?: boolean,
  borderRight?: boolean,
  icon?: boolean,
  watchIncrementMonth?: (date: Date) => void,
  watchDecrementMonth?: (date: Date) => void,
  onChangeDate: (date: Date) => void,
  leftArrow?: boolean,
  rightArrow?: boolean
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

    if (nextProps.date !== this.state.date) {
      this.setState({ date: nextProps.date })
    }

    if(nextProps.isCalendarShown !== this.state.isCalendarShown) {
      this.setState({ isCalendarShown: nextProps.isCalendarShown });
    }
  }

  onChangeInputValue = (e: any) => {
    const { onChangeDay, onChangeCalendarVisibility } = this.props;
    const { time, isCalendarShown } = this.state;
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
    this.setState({ isCalendarShown: !isCalendarShown })
    if (onChangeCalendarVisibility) {
      onChangeCalendarVisibility(!isCalendarShown);
    }
  };

  onClickInput = (e: Event) => {
    const { isCalendarShown, activeDates, time } = this.state;
    const { onChangeCalendarVisibility } = this.props;
    if (time) {
      this.setState({ inputValue: this.formatWithTime(activeDates) });
    } else {
      this.setState({ inputValue: this.formatWithoutTime(activeDates) });
    }
    this.setState({ isCalendarShown: !isCalendarShown })
    if (onChangeCalendarVisibility) {
      onChangeCalendarVisibility(!isCalendarShown);
    }
  };

  onBlurInput = () => {
    const { time, activeDates } = this.state;
    if (time) {
      this.setState({ inputValue: format(activeDates, 'DD/MM/YYYY HH:mm') });
    } else {
      this.setState({ inputValue: format(activeDates, 'DD/MM/YYYY') });
    }
  };

  onPressEnter = (e: Event) => {
    const { isCalendarShown } = this.state;
    const { onChangeCalendarVisibility } = this.props;
    if (e.key === 'Enter') {
      this.setState({ isCalendarShown: !isCalendarShown });
    }
    if (onChangeCalendarVisibility) {
      onChangeCalendarVisibility(!isCalendarShown);
    }
  };

  onClickIcon = () => {
    const { isCalendarShown } = this.state;
    const { onChangeCalendarVisibility } = this.props;
    this.setState({ isCalendarShown: !isCalendarShown });
    if (onChangeCalendarVisibility) {
      onChangeCalendarVisibility(!isCalendarShown);
    }
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
    const { onChangeDate } = this.props;
    if (onChangeDate) {
      onChangeDate(date);
    }
  };

  watchIncrementMonth = (date: Date) => {
    this.setState({ date });
    const { watchIncrementMonth } = this.props;
    if (watchIncrementMonth) {
      watchIncrementMonth(date);
    }
  }

  watchDecrementMonth = (date: Date) => {
    this.setState({ date });
    const { watchDecrementMonth } = this.props;
    if (watchDecrementMonth) {
      watchDecrementMonth(date);
    }
  }

  render() {
    const { startDate, endDate, borderLeft, borderRight, icon, leftArrow, rightArrow } = this.props;
    const { isCalendarShown, inputValue, time } = this.state;
    const iconStyle = {
      display: icon ? 'flex' : 'none'
    }
    const borderStyle = {
      borderLeft: borderLeft ? '3px solid #34495e' : 0,
      borderRight: borderRight ? '3px solid #34495e' : 0
    }
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
          style={borderStyle}
          type="text"
          onChange={this.onChangeInputValue}
          onFocus={this.onClickInput}
          onBlur={this.onBlurInput}
          onKeyPress={this.onPressEnter}
          value={inputValue}
          showMask
        />
        <div onClick={this.onClickIcon} className={s.icon} style={iconStyle}>
          <SvgIcon file="calendar" />
        </div>
        {isCalendarShown && (
          <CalendarDate
            {...this.state}
            onClickDay={this.onChangeDay}
            onChangeDate={this.onChangeDate}
            startDate={startDate}
            endDate={endDate}
            leftArrow={leftArrow}
            rightArrow={rightArrow}
            watchIncrementMonth={this.watchIncrementMonth}
            watchDecrementMonth={this.watchDecrementMonth}
          />
        )}
      </div>
    );
  }
}

export default CalendarDateTimePicker;
