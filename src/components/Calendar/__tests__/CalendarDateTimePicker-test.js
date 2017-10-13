/* @flow */

import React from 'react';
import CalendarDateTimePicker from '../CalendarDateTimePicker';
import MaskedInput from 'react-text-mask';

describe('CalendarDateTimePicker', () => {
  describe('render()', () => {
    it('basic', () => {
      expect(
        shallow(
          <CalendarDateTimePicker
            activeDates={new Date(2017, 9, 8)}
            date={new Date(2001, 3)}
            onChangeDate={jest.fn()}
            time
          />
        )
      ).toMatchSnapshot();
    });

    it('if !time', () => {
      expect(
        shallow(
          <CalendarDateTimePicker
            activeDates={new Date(2017, 9, 8)}
            date={new Date(2001, 3)}
            onChangeDate={jest.fn()}
            time={false}
          />
        )
      ).toMatchSnapshot();
    });

    it('if isCalendarShown', () => {
      expect(
        shallow(
          <CalendarDateTimePicker
            activeDates={new Date(2017, 9, 8)}
            date={new Date(2001, 3)}
            onChangeDate={jest.fn()}
            isCalendarShown
            time
          />
        )
      ).toMatchSnapshot();
    });
  });

  describe('componentWillMount()', () => {
    it('if time', () => {
      const activeDate = new Date(2009, 2, 4);
      const wrapper = shallow(
        <CalendarDateTimePicker
          activeDates={activeDate}
          date={new Date()}
          onChangeDate={jest.fn()}
          time
        />
      );
      const format = wrapper.instance().formatWithTime(activeDate);
      expect(wrapper.state('inputValue')).toBe(format);
    });

    it('if !time', () => {
      const activeDate = new Date(2010, 2, 4);
      const wrapper = shallow(
        <CalendarDateTimePicker
          activeDates={activeDate}
          date={new Date()}
          onChangeDate={jest.fn()}
          time={false}
        />
      );
      const format = wrapper.instance().formatWithoutTime(activeDate);
      expect(wrapper.state('inputValue')).toBe(format);
    });
  });

  it('formatWithTime()', () => {
    const wrapper = shallow(
      <CalendarDateTimePicker
        activeDates={new Date(2017, 9, 8)}
        date={new Date()}
        onChangeDate={jest.fn()}
        time
      />
    );
    const newDate = new Date(2017, 10, 10);
    const format = wrapper.instance().formatWithTime(newDate);
    expect(format).toBe('10/11/2017 00:00');
  });

  it('formatWithoutTime()', () => {
    const wrapper = shallow(
      <CalendarDateTimePicker
        activeDates={new Date(2017, 9, 8)}
        date={new Date()}
        onChangeCalendarVisibility={jest.fn()}
        onChangeDate={jest.fn()}
        time={false}
      />
    );
    const newDate = new Date(2009, 9, 1);
    const format = wrapper.instance().formatWithoutTime(newDate);
    expect(format).toBe('01/10/2009');
  });

  describe('componentWillReceiveProps()', () => {
    it('time', () => {
      const activeDate = new Date(2099, 1, 0);
      const wrapper = shallow(
        <CalendarDateTimePicker
          activeDates={activeDate}
          date={new Date(2009, 3, 1)}
          onChangeCalendarVisibility={jest.fn()}
          onChangeDate={jest.fn()}
          time={false}
        />
      );
      wrapper.setProps({ time: true });
      expect(wrapper).toMatchSnapshot();
    });

    describe('activeDates', () => {
      it('if !time', () => {
        const wrapper = shallow(
          <CalendarDateTimePicker
            activeDates={new Date(2009, 2, 4)}
            date={new Date(2004, 5, 7)}
            onChangeCalendarVisibility={jest.fn()}
            onChangeDate={jest.fn()}
            time={false}
          />
        );
        const newDate = new Date(2000, 10, 11);
        wrapper.setProps({ activeDates: newDate });
        expect(wrapper).toMatchSnapshot();
      });

      it('if time', () => {
        const wrapper = shallow(
          <CalendarDateTimePicker
            activeDates={new Date(2010, 1, 11)}
            date={new Date(2011, 9, 7)}
            onChangeCalendarVisibility={jest.fn()}
            onChangeDate={jest.fn()}
            time
          />
        );
        const newDate = new Date(2010, 0, 10);
        wrapper.setProps({ activeDates: newDate });
        expect(wrapper).toMatchSnapshot();
      });
    });

    it('date', () => {
      const wrapper = shallow(
        <CalendarDateTimePicker
          activeDates={new Date(2060, 5, 11)}
          date={new Date(2051, 3, 1)}
          onChangeCalendarVisibility={jest.fn()}
          onChangeDate={jest.fn()}
          time
        />
      );
      const newDate = new Date(2010, 0, 10);
      wrapper.setProps({ date: newDate });
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('onChangeVisibility()', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <CalendarDateTimePicker
        activeDates={new Date(2009, 1, 10)}
        date={new Date()}
        onChangeCalendarVisibility={spy}
        onChangeDate={jest.fn()}
        time
      />
    );
    wrapper.instance().onChangeVisibility();
    expect(spy).toBeCalledWith(true);
  });

  describe('user interactions', () => {
    it('onClickInput()', () => {
      const spy = jest.fn();
      const wrapper = shallow(
        <CalendarDateTimePicker
          activeDates={new Date(2009, 1, 10)}
          date={new Date(1994, 4, 1)}
          onChangeCalendarVisibility={spy}
          onChangeDate={jest.fn()}
          time
        />
      );
      const input = wrapper.find(MaskedInput);
      input.simulate('focus');
      expect(wrapper).toMatchSnapshot();
      expect(spy).toBeCalled();
      expect(wrapper.state('inputValue')).toBe('10/02/2009 00:00');
    });

    it('onChangeInputValue()', () => {
      const spy = jest.fn();
      const wrapper = shallow(
        <CalendarDateTimePicker
          activeDates={new Date(2009, 1, 10)}
          date={new Date(2111, 5, 3)}
          onChangeCalendarVisibility={jest.fn()}
          onChangeDate={jest.fn()}
          onChangeDay={spy}
          time
        />
      );
      const input = wrapper.find(MaskedInput);
      input.simulate('change', { target: { value: '10/12/2019 12:00' } });
      expect(wrapper).toMatchSnapshot();
      const newDate = new Date('2019-12-10T06:00:00.000Z');
      expect(wrapper.state('date')).toEqual(newDate);
      expect(spy).toBeCalledWith(newDate);
    });
  });
});
