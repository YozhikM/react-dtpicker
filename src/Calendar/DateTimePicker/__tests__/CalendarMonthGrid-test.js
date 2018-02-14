/* @flow */

import React from 'react';
import CalendarMonthGrid from '../CalendarMonthGrid';

describe('CalendarMonthGrid', () => {
  describe('render()', () => {
    it('basic', () => {
      expect(shallow(<CalendarMonthGrid value={new Date(2009, 0, 9)} />)).toMatchSnapshot();
    });
  });

  it('componentWillMount()', () => {
    const value = new Date(2019, 0, 9);
    const wrapper = shallow(<CalendarMonthGrid value={value} />);
    wrapper.instance().createMonth(value);

    expect(wrapper.state('weeks')).toMatchSnapshot();
  });

  it('componentWillReceiveProps()', () => {
    const wrapper = shallow(<CalendarMonthGrid value={new Date()} />);
    const nextProps = {
      value: new Date(2017, 10, 12),
      highlight: new Date(),
    };
    wrapper.instance().componentWillReceiveProps(nextProps);

    expect(wrapper.state('weeks')).toMatchSnapshot();
  });

  it('createMonth()', () => {
    const wrapper = shallow(<CalendarMonthGrid value={new Date()} />);
    const weeks = wrapper.instance().createMonth(new Date(2009, 9, 8));

    expect(weeks).toMatchSnapshot();
  });

  it('getWeekDays()', () => {
    const wrapper = shallow(<CalendarMonthGrid value={new Date()} />);
    const weekDays = wrapper.instance().getWeekDays();

    expect(weekDays).toMatchSnapshot();
  });

  describe('setDayStyle()', () => {
    it('should be highlightStyle if hightlight is array', () => {
      const wrapper = shallow(<CalendarMonthGrid value={new Date(1994, 6)} />);
      const highlight = [
        new Date('1994-07-01T18:00:00.000Z'),
        new Date('1994-07-05T18:00:00.000Z'),
      ];
      const dayStyle = wrapper.instance().setDayStyle(highlight, highlight[0]);

      expect(dayStyle).toMatchSnapshot();
    });

    it('should be highlightStyle if highlight is date', () => {
      const wrapper = shallow(<CalendarMonthGrid value={new Date(1994, 6)} />);
      const highlight = new Date('1994-07-05T18:00:00.000Z');
      const dayStyle = wrapper
        .instance()
        .setDayStyle(highlight, new Date('1994-07-05T17:59:59.000Z'));

      expect(dayStyle).toMatchSnapshot();
    });

    it('should be rangeStyle', () => {
      const wrapper = shallow(<CalendarMonthGrid value={new Date(1994, 6)} />);
      const highlight = [
        new Date('1994-07-05T18:00:00.000Z'),
        new Date('1994-07-07T18:00:00.000Z'),
      ];
      const dayStyle = wrapper
        .instance()
        .setDayStyle(highlight, new Date('1994-07-06T17:59:59.000Z'));

      expect(dayStyle).toMatchSnapshot();
    });
  });

  it('formatted current value in MMMM YYYY', () => {
    const wrapper = shallow(<CalendarMonthGrid value={new Date(2018, 2, 11)} />);
    const formattedCurrValue = wrapper.find('span').text();

    expect(formattedCurrValue).toBe('March 2018');
  });

  describe('user interactions', () => {
    it('onSetDate()', () => {
      const onSetDate = jest.fn();
      const wrapper = shallow(
        <CalendarMonthGrid value={new Date(2010, 0)} onSetDate={onSetDate} />
      );
      const newDate = new Date(2017, 1, 1);
      wrapper
        .find('CalendarDay')
        .at(0)
        .props()
        .onClick(newDate);

      expect(onSetDate).toBeCalledWith(newDate);
    });

    it('onClickMonth()', () => {
      const onClickMonth = jest.fn();
      const value = new Date(2009, 1);
      const wrapper = shallow(<CalendarMonthGrid value={value} onClickMonth={onClickMonth} />);
      wrapper.find('span').simulate('click');

      expect(onClickMonth).toBeCalledWith(value);
    });
  });

  describe('test cases', () => {
    it('check for february starting on monday, out of 28 days', () => {
      const wrapper = shallow(<CalendarMonthGrid value={new Date(2010, 1, 2)} />);

      expect(wrapper.state('weeks')).toHaveLength(4);
    });
  });
});
