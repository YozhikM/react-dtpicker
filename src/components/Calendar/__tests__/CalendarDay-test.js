/* @flow */

import React from 'react';
import CalendarDay from '../CalendarDay';

describe('CalendarDay', () => {
  describe('render()', () => {
    it('basic', () => {
      expect(shallow(<CalendarDay date={new Date(2009, 0, 9)} />)).toMatchSnapshot();
    });

    it('if isActive', () => {
      expect(shallow(<CalendarDay date={new Date(2049, 9, 6)} isActive />)).toMatchSnapshot();
    });

    it('if inRange', () => {
      const date = new Date(2049, 9, 6);
      const startDate = new Date(2049, 4, 5);
      const endDate = new Date(2050, 5, 5);
      expect(
        shallow(<CalendarDay date={date} startDate={startDate} endDate={endDate} />)
      ).toMatchSnapshot();
    });
  });

  it('filterRangeDay()', () => {
    const date = new Date();
    const startDate = new Date(2010, 8, 9);
    const endDate = new Date(2009, 9, 8);
    const wrapper = shallow(<CalendarDay date={date} startDate={startDate} endDate={endDate} />);
    const falsy = wrapper.instance().filterRangeDay(date, startDate, endDate);
    const truthy = wrapper.instance().filterRangeDay(date, date, date);
    expect(falsy).toBeFalsy();
    expect(truthy).toBeTruthy();
  });

  describe('user interactions', () => {
    it('onClick()', () => {
      const spy = jest.fn();
      let date = new Date(2015, 4, 5);
      const wrapper = shallow(<CalendarDay date={date} onClick={spy} />);
      wrapper.find('td').simulate('click');
      expect(spy).toBeCalledWith(date);
      const callbackValue = spy.mock.calls[0][0];
      expect(callbackValue).toEqual(date);
    });
  });
});
