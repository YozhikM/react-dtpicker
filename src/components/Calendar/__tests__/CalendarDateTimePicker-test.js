/* @flow */

import React from 'react';
import CalendarDateTimePicker from '../CalendarDateTimePicker';
import MaskedInput from 'react-text-mask';

describe('CalendarDateTimePicker', () => {
  describe('render()', () => {
    it('basic', () => {
      const date = new Date(2017, 9, 8);
      expect(
        shallow(
          <CalendarDateTimePicker
            highlight={date}
            visibleDate={date}
            value={new Date(2001, 3)}
            onSetDate={jest.fn()}
          />
        )
      ).toMatchSnapshot();
    });

    it('if !time', () => {
      const date = new Date(2017, 9, 8);
      expect(
        shallow(
          <CalendarDateTimePicker
            highlight={date}
            visibleDate={date}
            value={new Date(2001, 3)}
            onSetDate={jest.fn()}
          />
        )
      ).toMatchSnapshot();
    });

    it('if isCalendarShown', () => {
      expect(
        shallow(
          <CalendarDateTimePicker
            highlight={new Date(2017, 9, 8)}
            visibleDate={new Date(2017, 9, 8)}
            value={new Date(2001, 3)}
            onSetDate={jest.fn()}
            isCalendarShown
          />
        )
      ).toMatchSnapshot();
    });
  });

  describe('componentWillMount()', () => {
    it('if !time', () => {
      const highlight = new Date(2009, 2, 4);
      const wrapper = shallow(
        <CalendarDateTimePicker
          highlight={highlight}
          visibleDate={highlight}
          value={new Date()}
          onSetDate={jest.fn()}
        />
      );
      const format = wrapper.instance().formatWithoutTime(highlight);
      expect(wrapper.state('inputValue')).toBe(format);
    });

    it('if time', () => {
      const highlight = new Date(2010, 2, 4);
      const wrapper = shallow(
        <CalendarDateTimePicker
          highlight={highlight}
          visibleDate={highlight}
          value={new Date()}
          onSetDate={jest.fn()}
          time
        />
      );
      const format = wrapper.instance().formatWithTime(highlight);
      expect(wrapper.state('inputValue')).toBe(format);
    });
  });

  it('formatWithTime()', () => {
    const wrapper = shallow(
      <CalendarDateTimePicker
        highlight={new Date(2017, 9, 8)}
        visibleDate={new Date()}
        value={new Date()}
        onSetDate={jest.fn()}
      />
    );
    const newDate = new Date(2017, 10, 10);
    const format = wrapper.instance().formatWithTime(newDate);
    expect(format).toBe('10/11/2017 00:00');
  });

  it('formatWithoutTime()', () => {
    const wrapper = shallow(
      <CalendarDateTimePicker
        highlight={new Date(2017, 9, 8)}
        visibleDate={new Date()}
        value={new Date()}
        onSetDate={jest.fn()}
      />
    );
    const newDate = new Date(2009, 9, 1);
    const format = wrapper.instance().formatWithoutTime(newDate);
    expect(format).toBe('01/10/2009');
  });

  describe('componentWillReceiveProps()', () => {
    describe('time', () => {
      it('if time', () => {
        const highlight = new Date(2099, 1, 0);
        const wrapper = shallow(
          <CalendarDateTimePicker
            highlight={highlight}
            visibleDate={highlight}
            value={new Date(2009, 3, 1)}
            onSetDate={jest.fn()}
            time={false}
          />
        );
        wrapper.setProps({ time: true });
        const format = wrapper.instance().formatWithTime(highlight);
        expect(wrapper).toMatchSnapshot();
        expect(format).toBe('31/01/2099 00:00');
      });

      it('if !time', () => {
        const highlight = new Date(2099, 1, 0);
        const wrapper = shallow(
          <CalendarDateTimePicker
            highlight={highlight}
            visibleDate={highlight}
            value={new Date(2009, 3, 1)}
            onSetDate={jest.fn()}
            time
          />
        );
        wrapper.setProps({ time: false });
        const format = wrapper.instance().formatWithoutTime(highlight);
        expect(wrapper).toMatchSnapshot();
        expect(format).toBe('31/01/2099');
      });
    });

    describe('visibleDate', () => {
      it('if !time', () => {
        const wrapper = shallow(
          <CalendarDateTimePicker
            highlight={new Date(2009, 2, 4)}
            visibleDate={new Date(2009, 2, 4)}
            value={new Date(2004, 5, 7)}
            onSetDate={jest.fn()}
          />
        );
        const newDate = new Date(2000, 10, 11);
        wrapper.setProps({ visibleDate: newDate });
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.state('inputValue')).toBe('11/11/2000');
      });

      it('if time', () => {
        const wrapper = shallow(
          <CalendarDateTimePicker
            highlight={new Date(2010, 1, 11)}
            visibleDate={new Date(2010, 1, 11)}
            value={new Date(2011, 9, 7)}
            onSetDate={jest.fn()}
            time
          />
        );
        const newDate = new Date(2010, 0, 10);
        wrapper.setProps({ visibleDate: newDate });
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.state('inputValue')).toBe('10/01/2010 00:00');
      });
    });

    it('value', () => {
      const wrapper = shallow(
        <CalendarDateTimePicker
          highlight={new Date(2060, 5, 11)}
          visibleDate={new Date(2060, 5, 11)}
          value={new Date(2051, 3, 1)}
          onSetDate={jest.fn()}
        />
      );
      const newDate = new Date(2010, 0, 10);
      wrapper.setProps({ value: newDate });
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.state('value')).toBe(newDate);
    });

    it('isCalendarShown', () => {
      const wrapper = shallow(
        <CalendarDateTimePicker
          highlight={new Date(2060, 5, 11)}
          visibleDate={new Date(2060, 5, 11)}
          value={new Date(2051, 3, 1)}
          onSetDate={jest.fn()}
          isCalendarShown={false}
        />
      );
      wrapper.setProps({ isCalendarShown: true });
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.state('isCalendarShown')).toBe(true);
    });
  });

  it('onChangeVisibility()', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <CalendarDateTimePicker
        highlight={new Date()}
        visibleDate={new Date()}
        value={new Date()}
        onSetDate={jest.fn()}
        onChangeCalendarVisibility={spy}
      />
    );
    wrapper.instance().onChangeVisibility();
    expect(spy).toBeCalledWith(true);
  });

  it('onChange()', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <CalendarDateTimePicker
        highlight={new Date()}
        visibleDate={new Date()}
        value={new Date()}
        onSetDate={jest.fn()}
        onChange={spy}
        isCalendarShown
      />
    );
    const newDate = new Date(2019, 8, 3);
    wrapper
      .find('CalendarDate')
      .props()
      .onChange(newDate);
    expect(spy).toBeCalledWith(newDate);
  });

  it('onSetDate()', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <CalendarDateTimePicker
        highlight={new Date()}
        visibleDate={new Date()}
        value={new Date()}
        onSetDate={spy}
        isCalendarShown
      />
    );
    const newDate = new Date(2009, 2, 3);
    wrapper
      .find('CalendarDate')
      .props()
      .onSetDate(newDate);
    expect(spy).toBeCalledWith(newDate);
    expect(wrapper.state('inputValue')).toBe('03/03/2009');
  });

  it('onSetTime()', () => {
    const wrapper = shallow(
      <CalendarDateTimePicker
        highlight={new Date()}
        visibleDate={new Date()}
        value={new Date()}
        onSetDate={jest.fn()}
        isCalendarShown
      />
    );
    const newDate = new Date('2019-12-12T18:00:00.000Z');
    wrapper
      .find('CalendarDate')
      .props()
      .onSetTime(newDate);
    expect(wrapper.state('inputValue')).toBe('13/12/2019 00:00');
    expect(wrapper.state('visibleDate')).toEqual(newDate);
  });

  describe('user interactions', () => {
    it('onPressEnter()', () => {
      const spy = jest.fn();
      const wrapper = shallow(
        <CalendarDateTimePicker
          highlight={new Date(2009, 1, 10)}
          visibleDate={new Date(2009, 1, 10)}
          value={new Date(1994, 4, 1)}
          onSetDate={jest.fn()}
          onChangeCalendarVisibility={spy}
        />
      );
      const input = wrapper.find(MaskedInput);
      input.simulate('keyPress', { keyCode: 13 });
      expect(wrapper.state('isCalendarShown')).toBe(false);
    });

    it('onFocusInput()', () => {
      const spy = jest.fn();
      const wrapper = shallow(
        <CalendarDateTimePicker
          highlight={new Date(2009, 1, 10)}
          visibleDate={new Date(2009, 1, 10)}
          value={new Date(1994, 4, 1)}
          onSetDate={jest.fn()}
          onChangeCalendarVisibility={spy}
        />
      );
      const input = wrapper.find(MaskedInput);
      input.simulate('focus');
      expect(wrapper).toMatchSnapshot();
      expect(spy).toBeCalledWith(true);
    });

    it('onChangeInputValue()', () => {
      const spy = jest.fn();
      const spy2 = jest.fn();
      const wrapper = shallow(
        <CalendarDateTimePicker
          highlight={new Date(2009, 1, 10)}
          visibleDate={new Date(2009, 1, 10)}
          value={new Date(2111, 5, 3)}
          onSetDate={spy}
          onChange={spy2}
        />
      );
      const input = wrapper.find(MaskedInput);
      input.simulate('change', { target: { value: '10/12/2019 12:00' } });
      expect(wrapper).toMatchSnapshot();
      const newDate = new Date('2019-12-09T18:00:00.000Z');
      expect(spy).toBeCalledWith(newDate);
      expect(spy2).toBeCalledWith(newDate);
    });
  });
});
