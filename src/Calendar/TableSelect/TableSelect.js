/* @flow */

import React from 'react';
import s from './TableSelect.scss';

export type Value = number;
export type Option = { value: Value, name: string };

type Props = {|
  cols: number,
  options: Option[],
  value: Value,
  disabled?: ?(number[]),
  onChange?: (value: Value) => void,
|};

type State = {|
  value: Value,
|};

class TableSelect extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: this.props.value,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  clickItem(e: Event, value: Value) {
    const { onChange, disabled } = this.props;
    if (disabled && disabled.indexOf(value) >= 0) return;

    this.setState({ value });
    if (onChange) {
      onChange(value);
    }
  }

  render() {
    const { cols, options } = this.props;
    const { value } = this.state;

    return (
      <div className={s.root}>
        <ul
          style={{
            width: `${cols * 50}px`,
          }}
        >
          {options.map(option => {
            return (
              <li
                onClick={e => {
                  this.clickItem(e, option.value);
                }}
                key={option.name}
                style={{
                  fontWeight: option.value === value ? 'bold' : 'normal',
                }}
              >
                {option.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default TableSelect;
