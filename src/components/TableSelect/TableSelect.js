/* @flow */

import React from 'react';
import s from './TableSelect.scss';

export type Value = number;
export type Options = Array<{ value: Value, name: string }>;

type Props = {|
  cols: number,
  options: Options,
  value: Value,
  onChange?: (value: Value) => void
|};
type State = {|
  value: Value
|};

class TableSelect extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      value: this.props.value
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  clickItem(e: Event, value: Value) {
    this.setState({ value });
    const { onChange } = this.props;
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
            width: `${cols * 68.25}px`
          }}
        >
          {options.map((options, i) => {
            return (
              <li
                onClick={e => {
                  this.clickItem(e, options.value);
                }}
                key={i}
                style={{
                  fontWeight: options.value === value ? 'bold' : 'normal'
                }}
              >
                {options.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default TableSelect;
