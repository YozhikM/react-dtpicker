/* @flow */

import React from 'react';
import InputUpDown from '../InputUpDown/InputUpDown';
import SvgIcon from '../SvgIcon';
import TableSelect, { type Options } from '../TableSelect/TableSelect';
import s from './TimeSelect.scss';

type Value = Date;

type ShowEnum = 'main' | 'hh' | 'mm' | 'ss';

type HHMMSS = {
  hh: number,
  mm: number,
  ss: number
};

type Props = {
  value?: ?Value,
  onChange?: (value: Value) => void,
  onSubmit?: (value: Value) => void,
  showSeconds?: boolean,
  show?: ShowEnum,
};

type State = HHMMSS & {
  show: ShowEnum,
};

class TimeSelect extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      ...this.parseTime(this.props.value),
      show: this.props.show || 'main',
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.value !== nextProps.value) {
      this.setState(this.parseTime(nextProps.value));
    }
    if (this.props.show !== nextProps.show) {
      this.setState({ show: nextProps.show });
    }
  }

  genTableOpts = (from: number, till: number, step: number = 1): Options => {
    const res: Options = [];
    for (let i = from; i <= till; i) {
      res.push({ value: i, name: i < 10 ? `0${i}` : `${i}` });
    }
    return res;
  };

  parseTime(value: ?Date): HHMMSS {
    if (!value) return { hh: 0, mm: 0, ss: 0 };
    return { hh: value.getHours(), mm: value.getMinutes(), ss: value.getSeconds() };
  }

  getValue = (): Value => {
    const { hh, mm, ss } = this.state;
    let value = this.props.value || new Date();
    value.setHours(hh);
    value.setMinutes(mm);
    value.setSeconds(ss);
    return value;
  };

  onSubmit = () => {
    const { onSubmit } = this.props;
    if (onSubmit) onSubmit(this.getValue());
  };

  onChange = () => {
    const { onChange } = this.props;
    if (onChange) onChange(this.getValue());
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

  onChangeTableHH = (value: number) => {
    this.setState({ hh: value, show: 'main' }, this.onChange)
  };

  onChangeTableMM = (value: number) => {
    this.setState({ mm: value, show: 'main' }, this.onChange)
  };

  onChangeTableSS = (value: number) => {
    this.setState({ ss: value, show: 'main' }, this.onChange)
  };

  render() {
    const { showSeconds } = this.props;
    const { hh, mm, ss, show } = this.state;

    if (show === 'hh') {
      return (
        <TableSelect
          options={this.genTableOpts(0, 23)}
          cols={6}
          value={hh}
          onChange={this.onChangeTableHH}
        />
      );
    } else if (show === 'mm') {
      return (
        <TableSelect
          options={this.genTableOpts(0, 59, 5)}
          cols={4}
          value={mm}
          onChange={this.onChangeTableMM}
        />
      );
    } else if (show === 'ss' && showSeconds) {
      return (
        <TableSelect
          options={this.genTableOpts(0, 59, 5)}
          cols={6}
          value={ss}
          onChange={this.onChangeTableSS}
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
