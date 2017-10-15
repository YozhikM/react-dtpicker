/* @flow */

import React from 'react';
import { setHours, setMinutes, setSeconds } from 'date-fns';
import TimeSelect from '../TimeSelect';

function findSubmitBtn(wrapper) {
  return wrapper.find('button');
}

function findTable(wrapper) {
  return wrapper.find('TableSelect');
}

describe('TimeSelect', () => {
  describe('render()', () => {
    it('basic', () => {
      expect(shallow(<TimeSelect value={new Date(2017, 8, 8, 9, 10, 11)} />)).toMatchSnapshot();
    });

    it('with showSeconds', () => {
      expect(
        shallow(<TimeSelect value={new Date(2016, 1, 1, 0, 0, 0)} showSeconds />)
      ).toMatchSnapshot();
    });

    it('show HH', () => {
      expect(
        shallow(<TimeSelect value={new Date(2016, 1, 1, 0, 0, 0)} show="hh" />)
      ).toMatchSnapshot();
    });

    it('show MM', () => {
      expect(
        shallow(<TimeSelect value={new Date(2016, 1, 1, 0, 0, 0)} show="mm" />)
      ).toMatchSnapshot();
    });

    it('show SS', () => {
      expect(
        shallow(<TimeSelect value={new Date(2016, 1, 1, 0, 0, 0)} show="ss" showSeconds />)
      ).toMatchSnapshot();
    });
  });

  describe('parseTime()', () => {
    const wrapper = shallow(<TimeSelect showSeconds={true} />);
    let value = new Date(2017, 7, 7, 10, 9, 8);
    let result = wrapper.instance().parseTime(value);
    expect(result).toEqual({ hh: 10, mm: 9, ss: 8 });
  });

  it('getValue()', () => {
    const date = new Date(2010, 9, 8, 7, 6, 5);
    const wrapper = shallow(<TimeSelect value={date} />);
    const val = wrapper.instance().getValue();

    // same internal value
    expect(val).toEqual(date);
    // different date objects (immutable)
    expect(val).not.toBe(date);
  });

  describe('user interactions', () => {
    it('onSubmit()', () => {
      const value = new Date(2000, 1, 1, 0, 0, 0);
      const spy = jest.fn();
      const wrapper = shallow(<TimeSelect value={value} onSubmit={spy} />);
      findSubmitBtn(wrapper).simulate('click');
      expect(spy).toBeCalled();
      const callbackValue = spy.mock.calls[0][0];
      // check immutability
      expect(callbackValue).toEqual(value);
      expect(callbackValue).not.toBe(value);
    });

    it('onChange()', () => {
      const value = new Date(2020, 2, 2, 0, 0, 0);
      const spy = jest.fn();
      const wrapper = shallow(<TimeSelect value={value} onSetTime={spy} />);
      wrapper.instance().onSetTime();
      expect(spy).toBeCalled();
    });

    it('onChangeHH', () => {
      const dt = new Date();
      const spy = jest.fn();
      const wrapper = shallow(<TimeSelect value={dt} onSetTime={spy} />);
      wrapper
        .find('InputUpDown')
        .at(0)
        .props()
        .onChange(14);
      expect(wrapper.state('hh')).toBe(14);
      expect(spy).toBeCalledWith(setHours(dt, 14));
    });

    it('onChangeMM', () => {
      const dt = new Date();
      const spy = jest.fn();
      const wrapper = shallow(<TimeSelect value={dt} onSetTime={spy} />);
      wrapper
        .find('InputUpDown')
        .at(1)
        .props()
        .onChange(12);
      expect(wrapper.state('mm')).toBe(12);
      expect(spy).toBeCalledWith(setMinutes(dt, 12));
    });

    it('onChangeSS', () => {
      const dt = new Date();
      const spy = jest.fn();
      const wrapper = shallow(<TimeSelect value={dt} onSetTime={spy} showSeconds />);
      wrapper
        .find('InputUpDown')
        .at(2)
        .props()
        .onChange(7);
      expect(wrapper.state('ss')).toBe(7);
      expect(spy).toBeCalledWith(setSeconds(dt, 7));
    });

    it('onClickHH()', () => {
      const wrapper = shallow(<TimeSelect />);
      wrapper
        .find('InputUpDown')
        .at(0)
        .props()
        .onClickNumber();
      expect(wrapper.state('show')).toBe('hh');
    });

    it('onClickMM()', () => {
      const wrapper = shallow(<TimeSelect />);
      wrapper
        .find('InputUpDown')
        .at(1)
        .props()
        .onClickNumber();
      expect(wrapper.state('show')).toBe('mm');
    });

    it('onClickSS()', () => {
      const wrapper = shallow(<TimeSelect showSeconds />);
      wrapper
        .find('InputUpDown')
        .at(2)
        .props()
        .onClickNumber();
      expect(wrapper.state('show')).toBe('ss');
    });

    it('onChangeTableHH()', () => {
      const spy = jest.fn();
      const wrapper = shallow(<TimeSelect value={new Date(2010, 9, 8)} onSetTime={spy} />);
      wrapper.setState({ show: 'hh' });
      findTable(wrapper)
        .props()
        .onChange(12);
      expect(wrapper.state('show')).toBe('main');
      expect(wrapper.state('hh')).toBe(12);
      expect(spy).toBeCalled();
    });

    it('onChangeTableMM()', () => {
      const spy = jest.fn();
      const wrapper = shallow(<TimeSelect value={new Date(2010, 9, 8)} onSetTime={spy} />);
      wrapper.setState({ show: 'mm' });
      findTable(wrapper)
        .props()
        .onChange(3);
      expect(wrapper.state('show')).toBe('main');
      expect(wrapper.state('mm')).toBe(3);
      expect(spy).toBeCalled();
    });

    it('onChangeTableSS()', () => {
      const spy = jest.fn();
      const wrapper = shallow(
        <TimeSelect value={new Date(2010, 9, 8)} onSetTime={spy} showSeconds />
      );
      wrapper.setState({ show: 'ss' });
      findTable(wrapper)
        .props()
        .onChange(55);
      expect(wrapper.state('show')).toBe('main');
      expect(wrapper.state('ss')).toBe(55);
      expect(spy).toBeCalled();
    });
  });

  it('genTableOpts()', () => {
    const wrapper = shallow(<TimeSelect value={new Date(2010, 9, 8)} />);
    expect(wrapper.instance().genTableOpts(0, 23)).toHaveLength(24);
    expect(wrapper.instance().genTableOpts(0, 59, 5)).toHaveLength(12);
    expect(wrapper.instance().genTableOpts(0, 10, 5)).toEqual([
      { name: '00', value: 0 },
      { name: '05', value: 5 },
      { name: '10', value: 10 }
    ]);
  });
});
