/* @flow */

import React from 'react';
import CalendarDate from '../Calendar/CalendarDate';
import MaskedInput from 'react-text-mask';
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
  onChangeDay?: (date: Date) => void
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

  formatWithTime = () => format(this.state.activeDates, 'DD/MM/YYYY HH:mm');
  formatWithoutTime = () => format(this.state.activeDates, 'DD/MM/YYYY');

  componentWillMount() {
    const { time } = this.props;
    if (time) {
      this.setState({ inputValue: this.formatWithTime() });
    } else {
      this.setState({ inputValue: this.formatWithoutTime() });
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.time !== this.state.time) {
      this.setState({ time: nextProps.time });
    }

    if (nextProps.activeDates !== this.state.activeDates) {
      this.setState({ activeDates: nextProps.activeDates });
    }
  }

  displayText = () => {
    const { time } = this.props;
    if (time) {
      return this.formatWithTime();
    } else {
      return this.formatWithoutTime();
    }
  };

  onChangeInputValue = (e: any) => {
    const { onChangeDay, time } = this.props;
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

    if (value.length > 0 && onChangeDay && isValid(userDate)) {
      onChangeDay(userDate);
    }
  };

  onClickInput = (e: Event) => {
    const { time } = this.props;
    const { isCalendarShown } = this.state;
    if (time) {
      this.setState({ inputValue: this.formatWithTime() });
    } else {
      this.setState({ inputValue: this.formatWithoutTime() });
    }
    this.setState({ isCalendarShown: !isCalendarShown });
  };

  onBlurInput = () => {
    const { time } = this.props;
    if (time) {
      this.setState({ inputValue: format(this.state.activeDates, 'DD/MM/YYYY HH:mm') });
    } else {
      this.setState({ inputValue: format(this.state.activeDates, 'DD/MM/YYYY') });
    }
  };

  // onPressEnter = (e: Event) => {
  //   const { onCalendarShow } = this.props;
  //   if (e.key === 'Enter') {
  //     if (onCalendarShow) {
  //       onCalendarShow();
  //     }
  //   }
  // };

  // onClickIcon = () => {
  //   const { onCalendarShow } = this.props;
  //   if (onCalendarShow) {
  //     onCalendarShow();
  //   }
  // };

  onChangeDay = (activeDates: Date) => {
    const { onChangeDay } = this.props;
    this.setState({ activeDates, date: activeDates, inputValue: this.formatWithTime() });
    if (onChangeDay) {
      onChangeDay(activeDates);
    }
  };

  onChangeDate = (date: Date) => {
    this.setState({ date });
  };

  // onChangeDisplay = (isCalendarShown: boolean) => {
  //   const { onChangeDisplay } = this.props;
  //   this.setState({ isCalendarShown: !this.state.isCalendarShown });
  //   if (onChangeDisplay) {
  //     onChangeDisplay(this.state.isCalendarShown);
  //   }
  // };

  // closeCalendar = (e: Event) => {
  //   const { onChangeDisplay } = this.props;
  //   if (onChangeDisplay) {
  //     onChangeDisplay(false);
  //   }
  // };

  render() {
    const { range } = this.props;
    const { isCalendarShown } = this.state;
    const { inputValue } = this.state;
    const { time } = this.props;
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
          // onKeyPress={this.onPressEnter}
          value={inputValue}
          showMask
        />
        {isCalendarShown && (
          <CalendarDate
            {...this.state}
            onClickDay={this.onChangeDay}
            onChangeDate={this.onChangeDate}
            range={range}
            leftArrow
            rightArrow
          />
        )}
      </div>
    );
  }
}

export default CalendarDateTimePicker;
