/* @flow */

import React from 'react';
import './TableSelect.scss';

export type Value = number;
export type Options = Array<{ value: Value, name: string }>;

type Props = {|
  cols: number,
  options: Options,
  value: Value,
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
      <div className="root">
        <ul
          style={{
            width: `${cols * 50}px`,
          }}
        >
          {options.map((option, i) => (
            <li
              onClick={e => {
                this.clickItem(e, option.value);
              }}
              key={i}
              style={{
                fontWeight: option.value === value ? 'bold' : 'normal',
              }}
            >
              {option.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TableSelect;
