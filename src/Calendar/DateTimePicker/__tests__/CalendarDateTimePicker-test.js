/* @flow */

import React from 'react';
import CalendarDateTimePicker from '../CalendarDateTimePicker';

describe('CalendarDateTimePicker', () => {
  describe('render()', () => {
    it('basic', () => {
      const date = new Date(2017, 9, 8);
      expect(
        shallow(
          <CalendarDateTimePicker highlight={date} value={new Date(2001, 3)} isCalendarShown />
        )
      ).toMatchSnapshot();
    });

    it('if time', () => {
      const date = new Date(2017, 9, 8);
      expect(
        shallow(
          <CalendarDateTimePicker highlight={date} value={new Date(2001, 3)} isCalendarShown time />
        )
      ).toMatchSnapshot();
    });

    it('if !isCalendarShown', () => {
      expect(
        shallow(
          <CalendarDateTimePicker highlight={new Date(2017, 9, 8)} value={new Date(2001, 3)} />
        )
      ).toMatchSnapshot();
    });

    it('if icon', () => {
      expect(
        shallow(
          <CalendarDateTimePicker
            highlight={new Date(2017, 9, 8)}
            value={new Date(2001, 3)}
            isCalendarShown
            icon
          />
        )
      ).toMatchSnapshot();
    });

    it('if leftArrow', () => {
      expect(
        shallow(
          <CalendarDateTimePicker
            highlight={new Date(2017, 9, 8)}
            value={new Date(2001, 3)}
            isCalendarShown
            leftArrow
          />
        )
      ).toMatchSnapshot();
    });

    it('if rightArrow', () => {
      expect(
        shallow(
          <CalendarDateTimePicker
            highlight={new Date(2017, 9, 8)}
            value={new Date(2001, 3)}
            isCalendarShown
            rightArrow
          />
        )
      ).toMatchSnapshot();
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('visibleDate', () => {
      const wrapper = shallow(
        <CalendarDateTimePicker highlight={new Date(2010, 1, 11)} value={new Date(2011, 9, 7)} />
      );
      const nextProps = {
        visibleDate: new Date(2010, 0, 10),
        highlight: new Date(),
        value: new Date(),
      };
      wrapper.instance().componentWillReceiveProps(nextProps);

      expect(wrapper.state('visibleDate')).toEqual(new Date('2010-01-09T18:00:00.000Z'));
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
      const nextProps = {
        highlight: new Date(),
        value: new Date(2010, 0, 10),
      };
      wrapper.instance().componentWillReceiveProps(nextProps);

      expect(wrapper.state('value')).toEqual(new Date(2010, 0, 10));
    });

    it('isCalendarShown', () => {
      const wrapper = shallow(
        <CalendarDateTimePicker
          highlight={new Date(2060, 5, 11)}
          value={new Date(2051, 3, 1)}
          isCalendarShown={false}
        />
      );
      const nextProps = {
        highlight: new Date(),
        value: new Date(2010, 0, 10),
        isCalendarShown: true,
      };
      wrapper.instance().componentWillReceiveProps(nextProps);

      expect(wrapper.state('isCalendarShown')).toBe(true);
    });
  });

  it('onChange()', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <CalendarDateTimePicker
        highlight={new Date()}
        value={new Date()}
        onChange={onChange}
        isCalendarShown
      />
    );
    const newDate = new Date(2019, 8, 3);
    wrapper
      .find('CalendarDate')
      .props()
      .onChange(newDate);

    expect(onChange).toBeCalledWith(newDate);
  });

  it('onSetDate()', () => {
    const onSetDateByClick = jest.fn();
    const wrapper = shallow(
      <CalendarDateTimePicker
        highlight={new Date()}
        visibleDate={new Date()}
        value={new Date()}
        onSetDateByClick={onSetDateByClick}
        isCalendarShown
      />
    );
    const newDate = new Date(2009, 2, 3);
    wrapper
      .find('CalendarDate')
      .props()
      .onSetDate(newDate);

    expect(onSetDateByClick).toBeCalledWith(newDate);
  });

  it('onSetTime()', () => {
    const wrapper = shallow(
      <CalendarDateTimePicker highlight={new Date()} value={new Date()} isCalendarShown time />
    );
    const newDate = new Date('2019-12-12T18:00:00.000Z');
    wrapper
      .find('CalendarDate')
      .props()
      .onSetTime(newDate);

    expect(wrapper.state('visibleDate')).toEqual(newDate);
  });

  it('onChangeInputValue()', () => {
    const onSetDate = jest.fn();
    const onChange = jest.fn();
    const wrapper = shallow(
      <CalendarDateTimePicker
        highlight={new Date(2009, 1, 10)}
        value={new Date(2111, 5, 3)}
        onSetDate={onSetDate}
        onChange={onChange}
      />
    );
    const newDate = new Date('2019-12-09T18:00:00.000Z');
    wrapper
      .find('DateMaskInput')
      .props()
      .onChange(newDate);

    expect(onSetDate).toBeCalledWith(newDate);
    expect(onChange).toBeCalledWith(newDate);
  });
});
