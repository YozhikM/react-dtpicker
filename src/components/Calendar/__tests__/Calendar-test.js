/* @flow */

import React from 'react';
import Calendar from '../Calendar';

describe('Calendar', () => {
  describe('render()', () => {
    it('basic', () => {
      const wrapper = shallow(
        <Calendar value={new Date(2018, 3)} highlight={new Date(2018, 3, 4)} />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('!isSingleCalendar', () => {
      const wrapper = shallow(
        <Calendar
          highlight={[new Date(2009, 3, 4), new Date(2009, 3, 6)]}
          value={new Date(2009, 4)}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('componentWillMount()', () => {
    it('isSingleCalendar', () => {
      const wrapper = shallow(
        <Calendar value={new Date(2006, 7)} highlight={new Date(2006, 7, 4)} />
      );
      wrapper.setState({ isSingleCalendar: true });
      expect(wrapper).toMatchSnapshot();
    });

    it('!isSingleCalendar', () => {
      const wrapper = shallow(
        <Calendar
          value={new Date(2006, 4)}
          highlight={[new Date(2006, 3, 1), new Date(2006, 3, 1)]}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('onSetDate()', () => {
    it('isSingleCalendar', () => {
      const wrapper = shallow(
        <Calendar value={new Date(2017, 11)} highlight={new Date(2017, 11, 17)} />
      );
      wrapper.setState({ isSingleCalendar: true });
      const newDate = new Date(2009, 3, 9);
      wrapper.instance().onSetDate(newDate);
      expect(wrapper.state('highlight')).toMatchSnapshot();
    });

    describe('!isSingleCalendar', () => {
      it('!firstClick', () => {
        const wrapper = shallow(
          <Calendar
            value={new Date(2009, 4)}
            highlight={[new Date(2009, 3, 4), new Date(2009, 3, 6)]}
          />
        );
        const newDate = new Date(2009, 3, 9);
        wrapper
          .find('CalendarDateTimePicker')
          .at(0)
          .props()
          .onSetDate(newDate);
        expect(wrapper.state('highlight')).toMatchSnapshot();
      });

      it('firstClick', () => {
        const wrapper = shallow(
          <Calendar value={new Date(2009, 4)} highlight={[new Date(2009, 3, 4), new Date(2009, 3, 7)]} />
        );
        const newDate = new Date(2009, 3, 9);
        wrapper.instance().onSetDate(newDate);
        expect(wrapper.state('highlight')).toMatchSnapshot();
      });
    });
  });

  it('onChange()', () => {
    const wrapper = shallow(
      <Calendar value={new Date(2007, 6)} highlight={new Date(2009, 6, 14)} />
    );
    const newValue = new Date(2016, 4);
    wrapper.instance().onChange(newValue);
    expect(wrapper.state('value')).toMatchSnapshot();
  });

  it('onChangeSecondValue()', () => {
    const wrapper = shallow(
      <Calendar value={new Date(2007, 6)} highlight={new Date(2009, 6, 14)} />
    );
    const newValue = new Date(2016, 4);
    wrapper.instance().onChange(newValue);
    expect(wrapper.state('value')).toMatchSnapshot();
  });

  it('onChangeCalendarVisibility()', () => {
    const wrapper = shallow(
      <Calendar value={new Date(2011, 11)} highlight={new Date(2011, 11, 22)} />
    );
    wrapper.instance().onChangeCalendarVisibility();
    expect(wrapper.state('isCalendarShown')).toBe(false);
  });
});
