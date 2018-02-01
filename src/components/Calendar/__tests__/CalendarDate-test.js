/* @flow */

import React from 'react';
import CalendarDate from '../CalendarDate';
import { setMonth, setYear, addMonths, addYears } from 'date-fns';

describe('CalendarDate', () => {
  describe('render', () => {
    it('basic', () => {
      const value = new Date(2010, 10, 10);
      expect(
        shallow(<CalendarDate value={value} highlight={value} show="calendar" />)
      ).toMatchSnapshot();
    });

    it('if month table', () => {
      const value = new Date(2014, 11, 1);
      expect(
        shallow(<CalendarDate value={value} highlight={value} show="mm" />)
      ).toMatchSnapshot();
    });

    it('if year table', () => {
      const value = new Date(2022, 0, 21);
      expect(
        shallow(<CalendarDate value={value} highlight={value} show="yy" />)
      ).toMatchSnapshot();
    });

    it('if decade table', () => {
      const value = new Date(2040, 5, 10);
      expect(
        shallow(<CalendarDate value={value} highlight={value} show="yy10" />)
      ).toMatchSnapshot();
    });

    it('if time', () => {
      const value = new Date(2005, 6, 7);
      expect(shallow(<CalendarDate value={value} highlight={value} time />)).toMatchSnapshot();
    });

    it('if disabled leftArrow', () => {
      const value = new Date(2007, 6, 5);
      expect(
        shallow(<CalendarDate value={value} highlight={value} leftArrow={false} />)
      ).toMatchSnapshot();
    });

    it('if disabled rightArrow', () => {
      const value = new Date(1984, 4, 4);
      expect(
        shallow(<CalendarDate value={value} highlight={value} rightArrow={false} />)
      ).toMatchSnapshot();
    });
  });

  it('componentWillReceiveProps()', () => {
    const wrapper = shallow(<CalendarDate value={new Date()} highlight={new Date()} />);
    wrapper.setProps({ value: new Date(1994, 7, 1) });
    expect(wrapper.state('value')).toMatchSnapshot();
  });

  describe('user interactions', () => {
    it('onSetDate()', () => {
      const spy = jest.fn();
      const wrapper = shallow(
        <CalendarDate highlight={new Date()} value={new Date()} onSetDate={spy} />
      );
      const newDate = new Date(2000, 11, 11, 0, 0, 0);
      wrapper
        .find('CalendarMonthGrid')
        .props()
        .onSetDate(newDate);
      expect(spy).toBeCalledWith(newDate);
    });

    it('onSetTime()', () => {
      const spy = jest.fn();
      const wrapper = shallow(
        <CalendarDate highlight={new Date()} value={new Date()} onSetTime={spy} time />
      );

      const newDate = new Date(2000, 11, 11, 0, 0, 0);
      wrapper
        .find('TimePicker')
        .props()
        .onSetTime(newDate);
      expect(spy).toBeCalledWith(newDate);
    });

    it('onChangeMonth()', () => {
      const value = new Date(2000, 11, 11);
      const spy = jest.fn();
      const wrapper = shallow(
        <CalendarDate highlight={value} value={value} onChange={spy} show="mm" />
      );
      const newDate = setMonth(value, 3);
      wrapper
        .find('TableSelect')
        .props()
        .onChange(3);
      expect(spy).toBeCalledWith(newDate);
      expect(wrapper.state('show')).toBe('calendar');
      expect(wrapper.state('value')).toEqual(newDate);
    });

    it('onChangeYear()', () => {
      const value = new Date(2019, 11, 11);
      const spy = jest.fn();
      const wrapper = shallow(
        <CalendarDate highlight={value} value={value} onChange={spy} show="yy" />
      );
      const newDate = setYear(value, 2018);
      wrapper
        .find('TableSelect')
        .props()
        .onChange(2018);
      expect(spy).toBeCalledWith(newDate);
      expect(wrapper.state('show')).toBe('mm');
      expect(wrapper.state('value')).toEqual(newDate);
    });

    it('onChangeDecade()', () => {
      const value = new Date(2029, 11, 11);
      const spy = jest.fn();
      const wrapper = shallow(
        <CalendarDate highlight={value} value={value} onChange={spy} show="yy10" />
      );
      const newDate = setYear(value, 2048);
      wrapper
        .find('TableSelect')
        .props()
        .onChange(2048);
      expect(spy).toBeCalledWith(newDate);
      expect(wrapper.state('show')).toBe('yy');
      expect(wrapper.state('value')).toEqual(newDate);
    });

    it('showCalendar()', () => {
      const wrapper = shallow(
        <CalendarDate highlight={new Date()} show="mm" value={new Date()} />
      );
      wrapper
        .find('button')
        .at(2)
        .simulate('click');
      expect(wrapper.state('show')).toBe('calendar');
    });

    describe('showMonthTable()', () => {
      it('click month in CalendarMonthGrid', () => {
        const wrapper = shallow(<CalendarDate highlight={new Date()} value={new Date()} />);
        wrapper
          .find('CalendarMonthGrid')
          .props()
          .onClickMonth();
        expect(wrapper.state('show')).toBe('mm');
      });

      it('click back in years TableSelect', () => {
        const wrapper = shallow(
          <CalendarDate highlight={new Date()} value={new Date()} show="yy" />
        );
        wrapper
          .find('button')
          .at(2)
          .simulate('click');
        expect(wrapper.state('show')).toBe('mm');
      });
    });

    describe('showYearTable()', () => {
      it('click year months TableSelect', () => {
        const wrapper = shallow(
          <CalendarDate highlight={new Date()} value={new Date()} show="mm" />
        );
        wrapper.find('span').simulate('click');
        expect(wrapper.state('show')).toBe('yy');
      });

      it('click back in 10YY TableSelect', () => {
        const wrapper = shallow(
          <CalendarDate highlight={new Date()} value={new Date()} show="yy10" />
        );
        wrapper.find('button').simulate('click');
        expect(wrapper.state('show')).toBe('yy');
      });
    });

    it('showDecadeTable()', () => {
      const wrapper = shallow(
        <CalendarDate highlight={new Date()} value={new Date()} show="yy" />
      );
      wrapper.find('span').simulate('click');
      expect(wrapper.state('show')).toBe('yy10');
    });

    it('incrementMonth()', () => {
      const spy = jest.fn();
      const value = new Date(1994, 6, 0);
      const newDate = addMonths(value, 1);
      const wrapper = shallow(<CalendarDate highlight={value} value={value} onChange={spy} />);
      wrapper
        .find('button')
        .at(1)
        .simulate('click');
      expect(wrapper.state('value')).toEqual(newDate);
      expect(spy).toBeCalledWith(newDate);
    });

    it('decrementMonth()', () => {
      const spy = jest.fn();
      const value = new Date(1995, 8, 0);
      const newDate = addMonths(value, -1);
      const wrapper = shallow(<CalendarDate highlight={value} value={value} onChange={spy} />);
      wrapper
        .find('button')
        .at(0)
        .simulate('click');
      expect(wrapper.state('value')).toEqual(newDate);
      expect(spy).toBeCalledWith(newDate);
    });

    it('increment10Years()', () => {
      const spy = jest.fn();
      const value = new Date(1915, 8, 0);
      const newDate = addYears(value, 10);
      const wrapper = shallow(
        <CalendarDate highlight={value} value={value} show="yy" onChange={spy} />
      );
      wrapper
        .find('button')
        .at(1)
        .simulate('click');
      expect(wrapper.state('value')).toEqual(newDate);
      expect(spy).toBeCalledWith(newDate);
    });

    it('decrement10Years()', () => {
      const spy = jest.fn();
      const value = new Date(1965, 8, 0);
      const newDate = addYears(value, -10);
      const wrapper = shallow(
        <CalendarDate highlight={value} value={value} show="yy" onChange={spy} />
      );
      wrapper
        .find('button')
        .at(0)
        .simulate('click');
      expect(spy).toBeCalledWith(newDate);
      expect(wrapper.state('value')).toEqual(newDate);
    });

    it('incrementYears()', () => {
      const spy = jest.fn();
      const value = new Date(1997, 8, 0);
      const newDate = addYears(value, 1);
      const wrapper = shallow(
        <CalendarDate highlight={value} value={value} show="mm" onChange={spy} />
      );
      wrapper
        .find('button')
        .at(1)
        .simulate('click');
      expect(spy).toBeCalledWith(newDate);
      expect(wrapper.state('value')).toEqual(newDate);
    });

    it('decrementYears()', () => {
      const spy = jest.fn();
      const value = new Date(1977, 8, 0);
      const newDate = addYears(value, -1);
      const wrapper = shallow(
        <CalendarDate highlight={value} value={value} show="mm" onChange={spy} />
      );
      wrapper
        .find('button')
        .at(0)
        .simulate('click');
      expect(spy).toBeCalledWith(newDate);
      expect(wrapper.state('value')).toEqual(newDate);
    });
  });

  it('showDecade()', () => {
    const value = new Date(1477, 8, 0);
    const wrapper = shallow(<CalendarDate highlight={value} value={value} show="yy" />);
    wrapper.instance().showDecade();
    expect(wrapper.find('span').text()).toEqual('1470 - 1479');
  });

  it('getMonthOptions()', () => {
    const value = new Date(1887, 8, 0);
    const wrapper = shallow(<CalendarDate highlight={value} value={value} />);
    wrapper.instance().getMonthOptions();
    expect(wrapper.state('monthsOptions')).toEqual([
      { value: 0, name: 'Jan' },
      { value: 1, name: 'Feb' },
      { value: 2, name: 'Mar' },
      { value: 3, name: 'Apr' },
      { value: 4, name: 'May' },
      { value: 5, name: 'Jun' },
      { value: 6, name: 'Jul' },
      { value: 7, name: 'Aug' },
      { value: 8, name: 'Sep' },
      { value: 9, name: 'Oct' },
      { value: 10, name: 'Nov' },
      { value: 11, name: 'Dec' }
    ]);
  });

  it('getYearOptions()', () => {
    const value = new Date(1767, 8, 0);
    const wrapper = shallow(<CalendarDate highlight={value} value={value} show="yy" />);
    wrapper.instance().getYearOptions(value);
    const options = wrapper.find('TableSelect').props().options;
    expect(options).toEqual([
      { value: 1760, name: '1760' },
      { value: 1761, name: '1761' },
      { value: 1762, name: '1762' },
      { value: 1763, name: '1763' },
      { value: 1764, name: '1764' },
      { value: 1765, name: '1765' },
      { value: 1766, name: '1766' },
      { value: 1767, name: '1767' },
      { value: 1768, name: '1768' },
      { value: 1769, name: '1769' }
    ]);
  });

  it('getYearDecadeOptions()', () => {
    const value = new Date(1767, 8, 0);
    const wrapper = shallow(<CalendarDate highlight={value} value={value} show="yy" />);
    const options = wrapper.instance().getYearDecadeOptions(value);
    expect(options).toEqual([
      { value: 1730, name: '1730 1739' },
      { value: 1740, name: '1740 1749' },
      { value: 1750, name: '1750 1759' },
      { value: 1760, name: '1760 1769' },
      { value: 1770, name: '1770 1779' }
    ]);
  });
});
