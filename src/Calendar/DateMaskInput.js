/* @flow */

import * as React from 'react';
import { format } from 'date-fns';
import Input from '../Input/Input';

type Props = {|
  visibleDate: ?Date,
  onChange?: Function,
  onFocus?: Function,
  onKeyPress?: Function,
  style?: Object,
|};

type State = {
  inputValue: string,
};

export default class DateMaskInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      inputValue: this.formatWithoutTime(props.visibleDate),
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.visibleDate) {
      this.setState({
        inputValue: this.formatWithoutTime(nextProps.visibleDate),
      });
    }
  }

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
    const { onChange } = this.props;

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

      userDate = new Date(YY, MM, DD);

      this.setState({ inputValue: this.formatWithoutTime(userDate) });
    } else if (replacedValue.length === 8) {
      const YY = Number(replacedValue.substr(4, 4));
      const MM = Number(replacedValue.substr(2, 2)) - 1;
      const DD = Number(replacedValue.substr(0, 2));

      userDate = new Date(YY, MM, DD);

      this.setState({ inputValue: this.formatWithoutTime(userDate) });
    }

    if (userDate && onChange) {
      onChange(userDate);
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
