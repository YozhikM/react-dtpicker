/* @flow */

import * as React from 'react';
import InputUpDown from '../InputUpDown';

function findUpBtn(wrapper) {
  return wrapper.find('button').at(0);
}

function findDownBtn(wrapper) {
  return wrapper.find('button').at(1);
}

function findP(wrapper) {
  return wrapper.find('p');
}

function findText(wrapper) {
  return wrapper.find('p').text();
}

describe('InputUpDown', () => {
  describe('render()', () => {
    it('basic', () => {
      expect(shallow(<InputUpDown value={59} />)).toMatchSnapshot();
    });
  });

  describe('increment()', () => {
    it('change state', () => {
      const wrapper = shallow(<InputUpDown value={20} />);
      wrapper.instance().increment();
      expect(wrapper.state('value')).toEqual(21);
    });

    it('onChange callback', () => {
      const onChange = jest.fn();
      const wrapper = shallow(<InputUpDown value={20} onChange={onChange} />);
      wrapper.instance().increment();
      expect(onChange).toBeCalledWith(21);
    });

    it('if circular', () => {
      const wrapper = shallow(<InputUpDown value={59} min={10} max={59} circular />);
      wrapper.instance().increment();
      expect(wrapper.state('value')).toEqual(10);
    });

    it('if !circular', () => {
      const wrapper = shallow(<InputUpDown value={59} />);
      wrapper.instance().increment();
      expect(wrapper.state('value')).toEqual(60);
    });

    it('if !circular with max', () => {
      const wrapper = shallow(<InputUpDown value={59} max={59} />);
      wrapper.instance().increment();
      expect(wrapper.state('value')).toEqual(59);
    });
  });

  describe('decrement()', () => {
    it('change state', () => {
      const wrapper = shallow(<InputUpDown value={20} />);
      wrapper.instance().decrement();
      expect(wrapper.state('value')).toEqual(19);
    });

    it('onChange callback', () => {
      const spy = jest.fn();
      const wrapper = shallow(<InputUpDown value={20} onChange={spy} />);
      wrapper.instance().decrement();
      expect(spy).toBeCalledWith(19);
    });

    it('if circular', () => {
      const wrapper = shallow(<InputUpDown value={10} min={10} max={59} circular />);
      wrapper.instance().decrement();
      expect(wrapper.state('value')).toEqual(59);
    });

    it('if !circular', () => {
      const wrapper = shallow(<InputUpDown value={59} />);
      wrapper.instance().decrement();
      expect(wrapper.state('value')).toEqual(58);
    });

    it('if !circular with min', () => {
      const wrapper = shallow(<InputUpDown value={1} min={1} />);
      wrapper.instance().decrement();
      expect(wrapper.state('value')).toEqual(1);
    });
  });

  describe('user interactions', () => {
    it('button up click', () => {
      const [wrapper, spy] = spyMount(<InputUpDown value={20} />, 'increment');
      findUpBtn(wrapper).simulate('click');
      expect(spy).toBeCalled();
      expect(findText(wrapper)).toBe('21');
    });

    it('button up mouseDown', () => {
      const [wrapper, spy] = spyMount(<InputUpDown value={20} />, 'onHoldStart');
      const { increment } = wrapper.instance();
      findUpBtn(wrapper).simulate('mouseDown');
      expect(spy).toBeCalledWith(increment);
      expect(findText(wrapper)).toBe('20');
    });

    it('button up mouseUp', () => {
      const [wrapper, spy] = spyMount(<InputUpDown value={20} />, 'onHoldEnd');
      findUpBtn(wrapper).simulate('mouseUp');
      expect(spy).toBeCalled();
      expect(findText(wrapper)).toBe('20');
    });

    it('button down click', () => {
      const [wrapper, spy] = spyMount(<InputUpDown value={20} />, 'decrement');
      findDownBtn(wrapper).simulate('click');
      expect(spy).toBeCalled();
      expect(findText(wrapper)).toBe('19');
    });

    it('button down mouseDown', () => {
      const [wrapper, spy] = spyMount(<InputUpDown value={20} />, 'onHoldStart');
      const { decrement } = wrapper.instance();
      findDownBtn(wrapper).simulate('mouseDown');
      expect(spy).toBeCalledWith(decrement);
      expect(findText(wrapper)).toBe('20');
    });
  });

  it('componentWillReceiveProps()', () => {
    const wrapper = shallow(<InputUpDown value={1} />);
    wrapper.setProps({ value: 16 });
    expect(wrapper.state('value')).toBe(16);
    expect(findText(wrapper)).toBe('16');
  });

  it('onClickNumber()', () => {
    const spy = jest.fn();
    const wrapper = shallow(<InputUpDown value={20} onClickNumber={spy} />);
    findP(wrapper).simulate('click');
    expect(spy).toBeCalledWith(20);
  });
});
