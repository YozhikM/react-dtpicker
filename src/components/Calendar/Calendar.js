/* @flow */

import React from 'react';
import CalendarDateTimePicker from './CalendarDateTimePicker';
import SvgIcon from '../SvgIcon';
import s from './MainCalendar.scss';
import { addMonths } from 'date-fns';

type Props = {|
  highlight?: Array<Date> | Date,
  value?: Date
|};
type State = {|
  highlight: Array<Date> | Date,
  value: Date,
  time: boolean,
  isCalendarShown: boolean,
  isSingleCalendar: boolean,
  firstClick?: boolean,
  endClick?: boolean,
  firstDate?: Date,
  secondDate?: Date
|};

class Calendar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: this.props.value || new Date(),
      highlight: this.props.highlight || new Date(),
      time: false,
      isCalendarShown: true,
      isSingleCalendar: true,
      firstClick: false,
      endClick: false
    };
  }

  componentWillMount() {
    const { highlight } = this.props;
    const { isSingleCalendar, value } = this.state;
    if (!isSingleCalendar && Array.isArray(highlight)) {
      this.setState({
        highlight: highlight || [value],
        firstDate: highlight[0] || value,
        secondDate: highlight[0] || value
      });
    } else {
      this.setState({ highlight: this.props.highlight || value });
    }
  }

  onSetDate = (date: Date) => {
    const { firstClick, highlight, isSingleCalendar } = this.state;

    if (!isSingleCalendar && Array.isArray(highlight)) {
      const highlightCopy = highlight.slice();
      highlightCopy.push(date);

      if (highlightCopy.length > 2) {
        highlightCopy.shift();
      }

      if (!firstClick) {
        this.setState({
          firstClick: true,
          highlight: highlightCopy,
          endClick: false,
          firstDate: highlightCopy[1]
        });
      }

      if (firstClick) {
        this.setState({
          endClick: true,
          highlight: highlightCopy,
          firstClick: false,
          secondDate: highlightCopy[1]
        });
      }
    } else {
      this.setState({ highlight: date });
    }
  };

  onChange = (value: Date) => {
    this.setState({ value });
  };

  onChangeSecondValue = (value: Date) => {
    this.setState({ value: addMonths(value, -1) });
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
      secondDate
    } = this.state;
    return (
      <div>
        {isSingleCalendar ? (
          <div className={s.container}>
            <CalendarDateTimePicker
              value={value}
              highlight={highlight}
              visibleDate={highlight}
              isCalendarShown={isCalendarShown}
              onSetDate={this.onSetDate}
              onChange={this.onChange}
              onChangeCalendarVisibility={this.onChangeCalendarVisibility}
              borderLeft
              borderRight
              icon={true}
              time={time}
            />
          </div>
        ) : (
          <div className={s.container}>
            <CalendarDateTimePicker
              value={value}
              highlight={highlight}
              visibleDate={secondDate}
              isCalendarShown={isCalendarShown}
              onSetDate={this.onSetDate}
              onChange={this.onChange}
              onChangeCalendarVisibility={this.onChangeCalendarVisibility}
              borderLeft
              borderRight={false}
              rightArrow={false}
              icon={false}
              time={time}
            />
            <div className={s.arrow}>
              {secondDate && firstDate && firstDate < secondDate ? (
                <SvgIcon file="arrow-right" />
              ) : (
                <SvgIcon file="arrow-left" />
              )}
            </div>
            <CalendarDateTimePicker
              value={addMonths(value, 1)}
              highlight={highlight}
              visibleDate={firstDate}
              isCalendarShown={isCalendarShown}
              onSetDate={this.onSetDate}
              onChange={this.onChangeSecondValue}
              onChangeCalendarVisibility={this.onChangeCalendarVisibility}
              borderLeft={false}
              borderRight
              icon={false}
              leftArrow={false}
              time={time}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Calendar;
