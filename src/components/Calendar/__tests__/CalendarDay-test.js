/* @flow */

import React from 'react';
import CalendarDay from '../CalendarDay';

describe('CalendarDay', () => {
  describe('render()', () => {
    it('basic', () => {
      expect(shallow(<CalendarDay date={new Date(2009, 0, 9)} />)).toMatchSnapshot();
    });
  });

  describe('user interactions', () => {
    it('onClick()', () => {
      const spy = jest.fn();
      let date = new Date(2015, 4, 5);
      const wrapper = shallow(<CalendarDay date={date} onClick={spy} />);
      wrapper.find('td').simulate('click');
      expect(spy).toBeCalledWith(date);
    });
  });
});
