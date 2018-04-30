/* @flow */

import * as React from 'react';
import './Input.scss';

export type Value = string | number;
export type InputType = 'text' | 'hidden' | 'email' | 'password' | 'search' | 'tel';

type Props = {
  type?: InputType,
  onChange?: Function,
  onSubmit?: Function,
  onFocus?: Function,
  onBlur?: Function,
  onClickRightIcon?: Function,
  onClickLeftIcon?: Function,
  value?: ?Value,
  defaultValue?: ?Value,
  maxLength?: number,
  required?: Object,
  disabled?: boolean,
  controlled?: boolean,
};

type State = {
  value: ?Value,
};

export default class Input extends React.Component<Props, State> {
  // key NOD_FORM_ELEMENT is required
  // It used by FormWrapper to determine is this component a Form Element or not
  static NOD_FORM_ELEMENT = 'Input';

  state: State;
  onChange: Function;
  onBlur: Function;
  onClickRightIcon: Function;
  onClickLeftIcon: Function;
  onFocus: Function;
  onKeyPress: Function;
  onSubmit: Function;
  $input: ?HTMLInputElement;

  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.value || props.defaultValue || '',
    };

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onClickRightIcon = this.onClickRightIcon.bind(this);
    this.onClickLeftIcon = this.onClickLeftIcon.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value || '',
      });
    }
  }

  onClickRightIcon(e: Event) {
    const { onClickRightIcon } = this.props;

    if (onClickRightIcon) {
      e.stopPropagation();
      onClickRightIcon(e);
    }
  }

  onClickLeftIcon(e: Event) {
    const { onClickLeftIcon } = this.props;

    if (onClickLeftIcon) {
      e.stopPropagation();
      onClickLeftIcon(e);
    }
  }

  onKeyPress(e: SyntheticKeyboardEvent<>) {
    const { onSubmit } = this.props;
    if (onSubmit && e.key === 'Enter') {
      onSubmit(e, this.state.value);
    }
  }

  onChange(e: SyntheticInputEvent<>) {
    const { controlled, onChange } = this.props;
    const { value } = e.target;

    if (!controlled) {
      this.setState({ value });
    }

    if (onChange) {
      this.setState({ value }, () => {
        onChange(e, value);
      });
    }
  }

  onBlur(e: Event) {
    if (this.props.onBlur) {
      this.props.onBlur(e, this.state.value);
    }
  }

  onFocus(e: Event) {
    if (this.props.onFocus) {
      this.props.onFocus(e, this.state.value);
    }
  }

  render() {
    const { type = 'text', maxLength, required, disabled } = this.props;
    const { value } = this.state;

    return (
      <input
        className="input"
        ref={ref => (this.$input = ref)} // eslint-disable-line
        type={type}
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        value={value}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
        style={{ textAlign: 'center' }}
      />
    );
  }
}
