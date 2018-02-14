/* @flow */

import * as React from 'react';
import Calendar from '../index';

describe('Calendar', () => {
  const stringValue = { min: '2010-03-02T18:00:00.000Z', max: '2010-03-02T17:59:59.000Z' };
  describe('render()', () => {
    it('basic', () => {
      const calendar = shallow(<Calendar value={stringValue} />);
      expect(calendar).toMatchSnapshot();
    });

    it('if singleCalendar', () => {
      const singleCalendar = shallow(<Calendar value={stringValue} singleCalendar />);

      expect(singleCalendar).toMatchSnapshot();
    });

    it('if time', () => {
      const timeCalendar = shallow(<Calendar value={stringValue} time />);

      expect(timeCalendar).toMatchSnapshot();
    });

    it('if time', () => {
      const wideCalendar = shallow(<Calendar value={stringValue} wide />);

      expect(wideCalendar).toMatchSnapshot();
    });
  });

  it('convertValueToDate()', () => {
    const wrapper = shallow(<Calendar value={stringValue} />);
    const convertedValue = wrapper.instance().convertValueToDate(stringValue);

    expect(convertedValue).toMatchSnapshot();
  });

  describe('convertValueToArray()', () => {
    it('if !singleCalendar', () => {
      const wrapper = shallow(<Calendar value={stringValue} />);
      const convertedValue = wrapper.instance().convertValueToArray(stringValue);

      expect(convertedValue).toMatchSnapshot();
    });

    it('if singleCalendar', () => {
      const wrapper = shallow(<Calendar singleCalendar value={stringValue} />);
      const convertedValue = wrapper.instance().convertValueToArray(stringValue);

      expect(convertedValue).toMatchSnapshot();
    });
  });

  it('convertToEndOfDay()', () => {
    const wrapper = shallow(<Calendar value={stringValue} />);
    const convertedDate = wrapper.instance().convertToEndOfDay(new Date(2010, 2, 3));

    expect(convertedDate).toEqual(new Date('2010-03-03T17:59:59.000Z'));
  });

  describe('getValue()', () => {
    it('if firstDate < secondDate', () => {
      const wrapper = shallow(<Calendar value={stringValue} />);
      const value = wrapper.instance().getValue(new Date(2010, 2, 3), new Date(2010, 2, 4));

      expect(value).toMatchSnapshot();
    });

    it('if firstDate > secondDate', () => {
      const wrapper = shallow(<Calendar value={stringValue} />);
      const value = wrapper.instance().getValue(new Date(2010, 2, 26), new Date(2010, 2, 1));

      expect(value).toMatchSnapshot();
    });
  });

  it('onSetFirstDate()', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Calendar value={stringValue} onChange={onChange} />);
    wrapper
      .find('CalendarDateTimePicker')
      .at(0)
      .props()
      .onSetDate(new Date(1994, 7, 1));

    const highlight = [new Date('2010-03-02T18:00:00.000Z'), new Date('1994-07-31T17:00:00.000Z')];
    const value = { max: '2010-03-03T17:59:59.000Z', min: '1994-07-31T17:00:00.000Z' };

    expect(wrapper.state('firstDate')).toEqual(new Date('1994-07-31T17:00:00.000Z'));
    expect(wrapper.state('secondDate')).toEqual(new Date('2010-03-02T18:00:00.000Z'));
    expect(wrapper.state('highlight')).toEqual(highlight);
    expect(onChange).toBeCalledWith({}, value);
  });

  it('onSetSecondDate()', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Calendar value={stringValue} onChange={onChange} />);
    wrapper
      .find('CalendarDateTimePicker')
      .at(1)
      .props()
      .onSetDate(new Date(2017, 12, 1));

    const highlight = [new Date('2017-12-31T18:00:00.000Z'), new Date('2010-03-02T17:59:59.000Z')];
    const value = { max: '2018-01-01T17:59:59.000Z', min: '2010-03-02T17:59:59.000Z' };

    expect(wrapper.state('firstDate')).toEqual(new Date('2010-03-02T17:59:59.000Z'));
    expect(wrapper.state('secondDate')).toEqual(new Date('2017-12-31T18:00:00.000Z'));
    expect(wrapper.state('highlight')).toEqual(highlight);
    expect(onChange).toBeCalledWith({}, value);
  });

  it('onSetDate()', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Calendar value={stringValue} onChange={onChange} singleCalendar />);
    wrapper
      .find('CalendarDateTimePicker')
      .props()
      .onSetDate(new Date(2017, 12, 1));

    const highlight = new Date('2017-12-31T18:00:00.000Z');
    const value = { max: '2018-01-01T17:59:59.000Z', min: '2017-12-31T18:00:00.000Z' };

    expect(wrapper.state('firstDate')).toEqual(new Date('2010-03-02T18:00:00.000Z'));
    expect(wrapper.state('secondDate')).toEqual(new Date('2010-03-02T17:59:59.000Z'));
    expect(wrapper.state('highlight')).toEqual(highlight);
    expect(onChange).toBeCalledWith({}, value);
  });

  describe('onSetDateByClick()', () => {
    it('if !isNextClickAwaited', () => {
      const onChange = jest.fn();
      const wrapper = shallow(<Calendar value={stringValue} onChange={onChange} />);
      wrapper
        .find('CalendarDateTimePicker')
        .at(0)
        .props()
        .onSetDateByClick(new Date(2011, 12, 1));

      const highlight = [
        new Date('2010-03-02T17:59:59.000Z'),
        new Date('2011-12-31T18:00:00.000Z'),
      ];
      const value = { max: '2012-01-01T17:59:59.000Z', min: '2010-03-02T17:59:59.000Z' };

      expect(wrapper.state('isNextClickAwaited')).toBeTruthy();
      expect(wrapper.state('firstDate')).toEqual(new Date('2011-12-31T18:00:00.000Z'));
      expect(wrapper.state('secondDate')).toEqual(new Date('2010-03-02T17:59:59.000Z'));
      expect(wrapper.state('highlight')).toEqual(highlight);
      expect(onChange).toBeCalledWith({}, value);
    });

    it('if isNextClickAwaited', () => {
      const onChange = jest.fn();
      const wrapper = shallow(<Calendar value={stringValue} onChange={onChange} />);
      wrapper.setState({ isNextClickAwaited: true });
      wrapper.update();
      wrapper
        .find('CalendarDateTimePicker')
        .at(0)
        .props()
        .onSetDateByClick(new Date(2009, 1, 19));

      const highlight = [
        new Date('2010-03-02T17:59:59.000Z'),
        new Date('2009-02-18T18:00:00.000Z'),
      ];
      const value = { max: '2010-03-02T17:59:59.000Z', min: '2009-02-18T18:00:00.000Z' };

      expect(wrapper.state('isNextClickAwaited')).toBeFalsy();
      expect(wrapper.state('firstDate')).toEqual(new Date('2009-02-18T18:00:00.000Z'));
      expect(wrapper.state('secondDate')).toEqual(new Date('2010-03-02T17:59:59.000Z'));
      expect(wrapper.state('highlight')).toEqual(highlight);
      expect(onChange).toBeCalledWith({}, value);
    });
  });

  it('onChangeMin()', () => {
    const wrapper = shallow(<Calendar value={stringValue} />);
    wrapper
      .find('CalendarDateTimePicker')
      .at(0)
      .props()
      .onChange(new Date(2019, 4, 23));

    const value = {
      max: new Date('2019-06-22T18:00:00.000Z'),
      min: new Date('2019-05-22T18:00:00.000Z'),
    };

    expect(wrapper.state('value')).toEqual(value);
  });

  it('onChangeMax()', () => {
    const wrapper = shallow(<Calendar value={stringValue} />);
    wrapper
      .find('CalendarDateTimePicker')
      .at(1)
      .props()
      .onChange(new Date(2009, 9, 23));

    const value = {
      max: new Date('2009-10-22T18:00:00.000Z'),
      min: new Date('2009-09-22T18:00:00.000Z'),
    };

    expect(wrapper.state('value')).toEqual(value);
  });

  it('onChangeSingleCalendar()', () => {
    const wrapper = shallow(<Calendar singleCalendar value={stringValue} />);
    wrapper
      .find('CalendarDateTimePicker')
      .props()
      .onChange(new Date(2018, 9, 23));

    const value = {
      max: new Date('2018-10-22T18:00:00.000Z'),
      min: new Date('2018-10-22T18:00:00.000Z'),
    };

    expect(wrapper.state('value')).toEqual(value);
  });

  it('onChangeCalendarVisibility()', () => {
    const wrapper = shallow(<Calendar singleCalendar value={stringValue} />);
    wrapper
      .find('CalendarDateTimePicker')
      .props()
      .onChangeCalendarVisibility();

    expect(wrapper.state('isCalendarShown')).toBeFalsy();
  });

  it('renderSingleCalendar()', () => {
    const wrapper = shallow(<Calendar singleCalendar value={stringValue} />);
    const render = wrapper.instance().renderSingleCalendar();

    expect(render).toMatchSnapshot();
  });

  it('renderSingleCalendar()', () => {
    const wrapper = shallow(<Calendar value={stringValue} />);
    const render = wrapper.instance().renderDualCalendar();

    expect(render).toMatchSnapshot();
  });
});
