/* @flow */

import React from 'react';
import TimePicker from '../TimePicker';

function findBtn(wrapper) {
  return wrapper.find('button');
}

function findTimeSelect(wrapper) {
  return wrapper.find('TimeSelect');
}

describe('TimePicker', () => {
  describe('render()', () => {
    it('basic', () => {
      expect(shallow(<TimePicker date={new Date(2010, 10, 10)} />)).toMatchSnapshot();
    });

    it('show TimeSelect', () => {
      expect(
        shallow(<TimePicker date={new Date(2010, 10, 10)} show={'timeSelect'} />)
      ).toMatchSnapshot();
    });
  });

  it('onChangeDate()', () => {
    const date = new Date(2000, 1, 1, 0, 0, 0);
    const spy = jest.fn();
    const wrapper = shallow(<TimePicker date={date} onChangeDate={spy} show={'timeSelect'} />);
    wrapper
      .find('TimeSelect')
      .props()
      .onChange(date);
    expect(spy).toBeCalled();
    const callbackValue = spy.mock.calls[0][0];
    expect(callbackValue).toEqual(date);
  });

  describe('user interactions', () => {
    it('onClickClock()', () => {
      const wrapper = shallow(<TimePicker />);
      findBtn(wrapper).simulate('click');
      expect(wrapper.state('show')).toBe('timeSelect');
    });

    it('onSubmitTime()', () => {
      const wrapper = shallow(<TimePicker />);
      wrapper.setState({ show: 'timeSelect' });
      findTimeSelect(wrapper).simulate('submit');
      expect(wrapper.state('show')).toBe('button');
    });
  });
});
