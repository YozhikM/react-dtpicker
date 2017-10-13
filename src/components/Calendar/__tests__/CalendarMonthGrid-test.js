/* @flow */

import React from 'react';
import CalendarMonthGrid from '../CalendarMonthGrid';

describe('CalendarMonthGrid', () => {
  describe('render()', () => {
    it('basic', () => {
      expect(
        shallow(
          <CalendarMonthGrid
            date={new Date(2009, 0, 9)}
            startDate={new Date(2001, 2, 4)}
            endDate={new Date(2015, 3, 5)}
          />
        )
      ).toMatchSnapshot();
    });
  });

  it('componentWillMount()', () => {
    const date = new Date(2019, 0, 9);
    const wrapper = shallow(
      <CalendarMonthGrid
        date={date}
        startDate={new Date()}
        endDate={new Date()}
      />
    );
    wrapper.instance().createMonth(date);
    expect(wrapper.state('weeks')).toMatchSnapshot();
  });

  it('componentWillReceiveProps()', () => {
    const wrapper = shallow(
      <CalendarMonthGrid
        date={new Date()}
        startDate={new Date()}
        endDate={new Date()}
      />
    );
    wrapper.setProps({ date: new Date(2017, 10, 12) });
    expect(wrapper.state('weeks')).toMatchSnapshot();
  });

  it('createMonth()', () => {
    const wrapper = shallow(
      <CalendarMonthGrid
        date={new Date()}
        startDate={new Date()}
        endDate={new Date()}
      />
    );
    const weeks = wrapper.instance().createMonth(new Date(2009, 9, 8));
    expect(weeks).toMatchSnapshot();
  });

  it('isSameDate()', () => {
    const endDate = new Date(2010, 5, 6);
    const wrapper = shallow(
      <CalendarMonthGrid
        date={new Date()}
        startDate={new Date()}
        endDate={endDate}
      />
    );
    const date = new Date(2010, 5, 7);
    const isSame = wrapper.instance().isSameDate(endDate, date);
    expect(isSame).toBeFalsy();
  });

  it('getWeekDays()', () => {
    const wrapper = shallow(
      <CalendarMonthGrid
        date={new Date()}
        startDate={new Date()}
        endDate={new Date()}
      />
    );
    const getWeekDays = wrapper.instance().getWeekDays();
    expect(getWeekDays).toMatchSnapshot();
  });

  describe('user interactions', () => {
    it('onClickDay()', () => {
      const spy = jest.fn();
      const wrapper = shallow(
        <CalendarMonthGrid
          date={new Date(2010, 0)}
          startDate={new Date()}
          endDate={new Date()}
          onClickDay={spy}
        />
      );
      const newDate = new Date(2017, 1, 1);
      wrapper
        .find('CalendarDay')
        .at(0)
        .props()
        .onClick(newDate);
      expect(spy).toBeCalledWith(newDate);
    });

    it('onClickMonth()', () => {
      const spy = jest.fn();
      const date = new Date(2009, 1);
      const wrapper = shallow(
        <CalendarMonthGrid
          date={date}
          startDate={new Date()}
          endDate={new Date()}
          onClickMonth={spy}
        />
      );
      wrapper.find('span').simulate('click');
      expect(spy).toBeCalledWith(date);
    });
  });
});
