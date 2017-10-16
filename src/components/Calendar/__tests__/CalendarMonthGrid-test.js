/* @flow */

import React from 'react';
import CalendarMonthGrid from '../CalendarMonthGrid';

describe('CalendarMonthGrid', () => {
  describe('render()', () => {
    it('basic', () => {
      expect(
        shallow(<CalendarMonthGrid value={new Date(2009, 0, 9)} highlight={new Date(2001, 2, 4)} />)
      ).toMatchSnapshot();
    });
  });

  it('componentWillMount()', () => {
    const value = new Date(2019, 0, 9);
    const wrapper = shallow(<CalendarMonthGrid value={value} highlight={new Date()} />);
    wrapper.instance().createMonth(value);
    expect(wrapper.state('weeks')).toMatchSnapshot();
  });

  it('componentWillReceiveProps()', () => {
    const wrapper = shallow(<CalendarMonthGrid value={new Date()} highlight={new Date()} />);
    wrapper.setProps({ value: new Date(2017, 10, 12) });
    expect(wrapper.state('weeks')).toMatchSnapshot();
  });

  it('createMonth()', () => {
    const wrapper = shallow(<CalendarMonthGrid value={new Date()} highlight={new Date()} />);
    const weeks = wrapper.instance().createMonth(new Date(2009, 9, 8));
    expect(weeks).toMatchSnapshot();
  });

  it('getWeekDays()', () => {
    const wrapper = shallow(<CalendarMonthGrid value={new Date()} highlight={new Date()} />);
    const getWeekDays = wrapper.instance().getWeekDays();
    expect(getWeekDays).toMatchSnapshot();
  });

  it('setDayStyle()', () => {
    const wrapper = shallow(
      <CalendarMonthGrid
        value={new Date(1994, 6)}
        highlight={[new Date('1994-07-01T18:00:00.000Z'), new Date('1994-07-05T18:00:00.000Z')]}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('user interactions', () => {
    it('onSetDate()', () => {
      const spy = jest.fn();
      const wrapper = shallow(
        <CalendarMonthGrid value={new Date(2010, 0)} highlight={new Date()} onSetDate={spy} />
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
      const value = new Date(2009, 1);
      const wrapper = shallow(
        <CalendarMonthGrid value={value} highlight={new Date()} onClickMonth={spy} />
      );
      wrapper.find('span').simulate('click');
      expect(spy).toBeCalledWith(value);
    });
  });
});
