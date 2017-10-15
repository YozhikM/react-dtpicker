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

  describe('user interactions', () => {
    it('onClickClock()', () => {
      const wrapper = shallow(<TimePicker />);
      findBtn(wrapper).simulate('click');
      expect(wrapper.state('show')).toBe('timeSelect');
    });

    it('onSubmitTime()', () => {
      const spy = jest.fn();
      const wrapper = shallow(<TimePicker date={new Date()} onSetTime={spy} />);
      const newDate = new Date(2018, 9, 11);
      wrapper.setState({ show: 'timeSelect' });
      findTimeSelect(wrapper).props().onSubmit(newDate);
      expect(wrapper.state('show')).toBe('button');
      expect(spy).toBeCalledWith(newDate);
    });
  });
});
