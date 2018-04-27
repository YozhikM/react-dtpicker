/* @flow */

import * as React from 'react';
import { format } from 'date-fns';
import Input from '../Input/Input';
import type { Highlight } from './helpers';

type Props = {|
  visibleDate: ?Highlight,
  minDate?: Date,
  maxDate?: Date,
  onChange?: Function,
  onFocus?: Function,
  onKeyPress?: Function,
  style?: Object
|};

type State = {
  inputValue: string
};

export default class DateMaskInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      inputValue: this.formatPropsToState(props.visibleDate)
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.visibleDate) {
      this.setState({
        inputValue: this.formatPropsToState(nextProps.visibleDate)
      });
    }
  }

  formatPropsToState = (value: ?Highlight) => {
    if (!value) return '';

    const date = new Date(Date.UTC(value.year, value.month, value.day));
    return this.formatWithoutTime(date);
  };

  formatWithTime(date: ?Date): string {
    return format(date, 'DD/MM/YYYY HH:mm');
  }

  formatWithoutTime(date: ?Date): string {
    return format(date, 'DD/MM/YYYY');
  }

  replaceText(text: string, rule: RegExp): string {
    if (text.match(rule)) return text.replace(rule, '');
    return text;
  }

  replaceValue(value: string): string {
    let copyValue = value.slice();
    const regArr = [/\//g, /\./g, /-/g];
    for (let i = 0; i < regArr.length; i++) {
      copyValue = this.replaceText(copyValue, regArr[i]);
    }

    return copyValue;
  }

  onChangeInputValue = (e: SyntheticInputEvent<>, value: string) => {
    const { onChange, minDate, maxDate } = this.props;

    let userDate;
    if (value.length > 10) {
      const splicedValue = value.slice(0, 10);
      this.setState({ inputValue: splicedValue });
    }

    const replacedValue = this.replaceValue(value);

    if (value.length === 10) {
      const YY = Number(value.substr(6, 4));
      const MM = Number(value.substr(3, 2)) - 1;
      const DD = Number(value.substr(0, 2));

      userDate = new Date(Date.UTC(YY, MM, DD));

      if (maxDate && minDate) {
        if (userDate < minDate) {
          this.setState({ inputValue: this.formatWithoutTime(minDate) });
          return;
        } else if (userDate > maxDate) {
          this.setState({ inputValue: this.formatWithoutTime(maxDate) });
          return;
        }
      }

      if (!maxDate && !minDate) {
        this.setState({ inputValue: this.formatWithoutTime(userDate) });
      }
    } else if (replacedValue.length === 8) {
      const YY = Number(replacedValue.substr(4, 4));
      const MM = Number(replacedValue.substr(2, 2)) - 1;
      const DD = Number(replacedValue.substr(0, 2));

      userDate = new Date(Date.UTC(YY, MM, DD));

      if (maxDate && minDate) {
        if (userDate < minDate) {
          this.setState({ inputValue: this.formatWithoutTime(minDate) });
          return;
        } else if (userDate > maxDate) {
          this.setState({ inputValue: this.formatWithoutTime(maxDate) });
          return;
        }
      }

      if (!maxDate && !minDate) {
        this.setState({ inputValue: this.formatWithoutTime(userDate) });
      }
    }

    if (userDate && onChange) {
      if ((maxDate && userDate <= maxDate) || (minDate && userDate >= minDate)) {
        onChange(userDate);
      } else if (maxDate && userDate > maxDate) {
        onChange(maxDate);
      } else if (minDate && userDate < minDate) {
        onChange(minDate);
      } else if (!maxDate && !minDate) {
        onChange(userDate);
      }
    }
  };

  render() {
    const { onFocus, onKeyPress, style } = this.props;
    const { inputValue } = this.state;

    return (
      <Input
        value={inputValue}
        onChange={this.onChangeInputValue}
        onFocus={onFocus}
        onKeyPress={onKeyPress}
        style={style}
        centerAlignedText
        small
      />
    );
  }
}
