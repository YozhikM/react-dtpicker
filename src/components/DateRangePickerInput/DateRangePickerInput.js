/* @flow */

import React from 'react';
import MaskedInput from 'react-text-mask';
import SvgIcon from '../SvgIcon';
import s from './DateRangePickerInput.scss';
import { format, isValid } from 'date-fns';

type Props = {
  activeDates: Date,
  date: Date,
  onChangeDay?: (date: Date) => void,
  onCalendarShow: () => void,
  time?: boolean,
  calendarIsShown?: boolean
};
type State = {
  inputValue: string,
  inputIsShown: boolean,
  activeDates: Date
};

class DateRangePickerInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: '',
      inputIsShown: false,
      activeDates: this.props.activeDates
    };
  }

  formatWithTime = () => format(this.state.activeDates, 'DD/MM/YYYY HH:mm');
  formatWithoutTime = () => format(this.state.activeDates, 'DD/MM/YYYY');

  componentWillMount() {
    if (this.props.time) {
      this.setState({ inputValue: this.formatWithTime() });
    } else {
      this.setState({ inputValue: this.formatWithoutTime() });
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.activeDates !== this.state.activeDates) {
      this.setState({ activeDates: nextProps.activeDates });
    }
  }

  displayText = () => {
    if (this.props.time) {
      return this.formatWithTime();
    } else {
      return this.formatWithoutTime();
    }
  };

  onChangeInputValue = (e: Event, target: EventTarget) => {
    const { onChangeDay, time } = this.props;
    const value = e.target.value;
    this.setState({ inputValue: value });
    let userDate;
    if (time) {
      userDate = new Date(
        Number(value.substr(6, 4)),
        Number(value.substr(3, 2)) - 1,
        Number(value.substr(0, 2)),
        Number(value.substr(11, 2)),
        Number(value.substr(14, 2))
      );
    } else {
      userDate = new Date(
        Number(value.substr(6, 4)),
        Number(value.substr(3, 2)) - 1,
        Number(value.substr(0, 2))
      );
    }

    if (value.length > 0 && onChangeDay && isValid(userDate)) {
      onChangeDay(userDate);
    }
  };

  onClickInput = () => {
    const { inputIsShown } = this.state;
    const { time, onCalendarShow } = this.props;
    this.setState({
      inputIsShown: !inputIsShown
    });
    if (time) {
      this.setState({ inputValue: this.formatWithTime() });
    } else {
      this.setState({ inputValue: this.formatWithoutTime() });
    }
    if (onCalendarShow) {
      onCalendarShow();
    }
  };

  onBlurInput = () => {
    const { inputIsShown } = this.state;
    const { time } = this.props;
    this.setState({
      inputIsShown: !inputIsShown
    });
    if (time) {
      this.setState({ inputValue: format(this.state.activeDates, 'DD/MM/YYYY HH:mm') });
    } else {
      this.setState({ inputValue: format(this.state.activeDates, 'DD/MM/YYYY') });
    }
  };

  onPressEnter = (e: Event) => {
    const { onCalendarShow } = this.props;
    if (e.key === 'Enter') {
      if (onCalendarShow) {
        onCalendarShow();
      }
    }
  };

  // onClickIcon = () => {
  //   const { onCalendarShow } = this.props;
  //   if (onCalendarShow) {
  //     onCalendarShow();
  //   }
  // };

  render() {
    const { inputValue, inputIsShown } = this.state;
    const { time } = this.props;
    const style = {
      zIndex: 1,
      opacity: 1
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
        /\d/
      ];
    } else {
      mask = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
    }
    return (
      <div className={s.date_input_wrapper}>
        <MaskedInput
          mask={mask}
          className={s.input}
          type="text"
          onChange={this.onChangeInputValue}
          onFocus={this.onClickInput}
          onBlur={this.onBlurInput}
          onKeyPress={this.onPressEnter}
          value={inputValue}
          style={inputIsShown ? style : null}
          showMask
        />
        <div className={s.display_text}>{this.displayText()}</div>
        <div className={s.icon} onClick={this.onClickIcon}>
          <SvgIcon file="calendar" />
        </div>
      </div>
    );
  }
}

export default DateRangePickerInput;
