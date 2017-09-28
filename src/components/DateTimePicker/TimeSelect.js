/* @flow */

import React from 'react';
import InputUpDown from '../InputUpDown/InputUpDown';
import SvgIcon from '../SvgIcon';
import TableSelect, { type Options } from '../TableSelect/TableSelect';
import s from './TimeSelect.scss';

type Value = Date;

type HHMMSS = {
  hh: number,
  mm: number,
  ss: number
};

type Props = {
  value?: Value,
  onChange?: (value: Value) => void,
  onSubmit?: () => void,
  showSeconds?: boolean
};

type State = HHMMSS & {
  show: string
};

function genTableOpts(from: number, till: number, step: number = 1): Options {
  const res: Options = [];
  for (let i = from; i <= till; i = i + step) {
    res.push({ value: i, name: i < 10 ? `0${i}` : `${i}` });
  }
  return res;
}

class TimeSelect extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      ...this.parseTime(this.props.value),
      show: 'main'
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.value !== nextProps.value) {
      this.setState(this.parseTime(nextProps.value));
    }
  }

  parseTime(value: ?Date): HHMMSS {
    if (!value) return { hh: 0, mm: 0, ss: 0 };
    return { hh: value.getHours(), mm: value.getMinutes(), ss: value.getSeconds() };
  }

  getValue(): Value {
    const { hh, mm, ss } = this.state;
    const value = this.props.value || new Date();
    value.setHours(hh);
    value.setMinutes(mm);
    value.setSeconds(ss);
    return value;
  }

  onChange = () => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(this.getValue());
    }
  };

  onSubmit = () => {
    const { onSubmit } = this.props;
    if (onSubmit) {
      onSubmit();
    }
  };

  onChangeHH = (hh: number) => {
    this.setState({ hh }, this.onChange);
  };

  onChangeMM = (mm: number) => {
    this.setState({ mm }, this.onChange);
  };

  onChangeSS = (ss: number) => {
    this.setState({ ss }, this.onChange);
  };

  onClickHH = () => {
    this.setState({ show: 'hh' });
  };

  onClickMM = () => {
    this.setState({ show: 'mm' });
  };

  onClickSS = () => {
    this.setState({ show: 'ss' });
  };

  render() {
    const { showSeconds } = this.props;
    const { hh, mm, ss, show } = this.state;

    if (show === 'hh') {
      return (
        <TableSelect
          options={genTableOpts(0, 23)}
          cols={6}
          value={hh}
          onChange={value => {
            this.setState({ hh: value, show: 'main' }, this.onChange);
          }}
        />
      );
    } else if (show === 'mm') {
      return (
        <TableSelect
          options={genTableOpts(0, 59, 5)}
          cols={4}
          value={mm}
          onChange={value => {
            this.setState({ mm: value, show: 'main' }, this.onChange);
          }}
        />
      );
    } else if (show === 'ss') {
      return (
        <TableSelect
          options={genTableOpts(0, 59, 5)}
          cols={6}
          value={ss}
          onChange={value => {
            this.setState({ ss: value, show: 'main' }, this.onChange);
          }}
        />
      );
    }

    return (
      <div className={s.hs}>
        <InputUpDown
          value={hh}
          min={0}
          max={23}
          onChange={this.onChangeHH}
          onClickNumber={this.onClickHH}
          circular
        />
        <InputUpDown
          value={mm}
          min={0}
          max={59}
          onChange={this.onChangeMM}
          onClickNumber={this.onClickMM}
          circular
        />
        {showSeconds && (
          <InputUpDown
            value={ss}
            min={0}
            max={59}
            onChange={this.onChangeSS}
            onClickNumber={this.onClickSS}
            circular
          />
        )}
        <button onClick={this.onSubmit}>
          <SvgIcon file="check" />
        </button>
      </div>
    );
  }
}

export default TimeSelect;
