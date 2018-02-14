/* @flow */

import React from 'react';
import { setMonth, setYear, addMonths, addYears } from 'date-fns';
import CalendarDate from '../CalendarDate';

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
      expect(shallow(<CalendarDate value={value} highlight={value} show="mm" />)).toMatchSnapshot();
    });

    it('if year table', () => {
      const value = new Date(2022, 0, 21);
      expect(shallow(<CalendarDate value={value} highlight={value} show="yy" />)).toMatchSnapshot();
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
    const nextProps = {
      value: new Date(1994, 7, 1),
      highlight: new Date(),
    };
    wrapper.instance().componentWillReceiveProps(nextProps);

    expect(wrapper.state('value')).toMatchSnapshot();
  });

  describe('user interactions', () => {
    it('onSetDate()', () => {
      const onSetDate = jest.fn();
      const wrapper = shallow(
        <CalendarDate highlight={new Date()} value={new Date()} onSetDate={onSetDate} />
      );
      const newDate = new Date(2000, 11, 11, 0, 0, 0);
      wrapper
        .find('CalendarMonthGrid')
        .props()
        .onSetDate(newDate);

      expect(onSetDate).toBeCalledWith(newDate);
    });

    it('onSetTime()', () => {
      const onSetTime = jest.fn();
      const wrapper = shallow(
        <CalendarDate highlight={new Date()} value={new Date()} onSetTime={onSetTime} time />
      );
      const newDate = new Date(2000, 11, 11, 0, 0, 0);
      wrapper
        .find('TimePicker')
        .props()
        .onSetTime(newDate);

      expect(onSetTime).toBeCalledWith(newDate);
    });

    it('onChangeMonth()', () => {
      const value = new Date(2000, 11, 11);
      const onChange = jest.fn();
      const wrapper = shallow(
        <CalendarDate highlight={value} value={value} onChange={onChange} show="mm" />
      );
      const newDate = setMonth(value, 3);
      wrapper
        .find('TableSelect')
        .props()
        .onChange(3);

      expect(wrapper.state('show')).toBe('calendar');
      expect(onChange).toBeCalledWith(newDate);
    });

    it('onChangeYear()', () => {
      const value = new Date(2019, 11, 11);
      const onChange = jest.fn();
      const wrapper = shallow(
        <CalendarDate highlight={value} value={value} onChange={onChange} show="yy" />
      );
      const newDate = setYear(value, 2018);
      wrapper
        .find('TableSelect')
        .props()
        .onChange(2018);

      expect(onChange).toBeCalledWith(newDate);
      expect(wrapper.state('show')).toBe('mm');
    });

    it('onChangeDecade()', () => {
      const value = new Date(2029, 11, 11);
      const onChange = jest.fn();
      const wrapper = shallow(
        <CalendarDate highlight={value} value={value} onChange={onChange} show="yy10" />
      );
      const newDate = setYear(value, 2048);
      wrapper
        .find('TableSelect')
        .props()
        .onChange(2048);

      expect(onChange).toBeCalledWith(newDate);
      expect(wrapper.state('show')).toBe('yy');
    });

    it('showCalendar()', () => {
      const wrapper = shallow(<CalendarDate highlight={new Date()} show="mm" value={new Date()} />);
      wrapper
        .find('Button')
        .props()
        .onClick();

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
          .find('Button')
          .props()
          .onClick();

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
        wrapper
          .find('Button')
          .props()
          .onClick();

        expect(wrapper.state('show')).toBe('yy');
      });
    });

    it('showDecadeTable()', () => {
      const wrapper = shallow(<CalendarDate highlight={new Date()} value={new Date()} show="yy" />);
      wrapper.find('span').simulate('click');

      expect(wrapper.state('show')).toBe('yy10');
    });

    // TODO: TypeError: Cannot read property 'props' of undefined
    it.skip('incrementMonth()', () => {
      const onChange = jest.fn();
      const value = new Date(1994, 6, 0);
      const newDate = addMonths(value, 1);
      const wrapper = shallow(<CalendarDate value={value} onChange={onChange} />);
      wrapper
        .find('button')
        .at(1)
        .simulate('click');

      expect(onChange).toBeCalledWith(newDate);
    });

    it.skip('decrementMonth()', () => {
      const onChange = jest.fn();
      const value = new Date(1995, 8, 0);
      const newDate = addMonths(value, -1);
      const wrapper = shallow(<CalendarDate highlight={value} value={value} onChange={onChange} />);
      wrapper
        .find('button')
        .at(0)
        .simulate('click');

      expect(onChange).toBeCalledWith(newDate);
    });

    it('increment10Years()', () => {
      const onChange = jest.fn();
      const value = new Date(1915, 8, 0);
      const newDate = addYears(value, 10);
      const wrapper = shallow(
        <CalendarDate highlight={value} value={value} show="yy" onChange={onChange} />
      );
      wrapper
        .find('button')
        .at(1)
        .simulate('click');

      expect(onChange).toBeCalledWith(newDate);
    });

    it('decrement10Years()', () => {
      const onChange = jest.fn();
      const value = new Date(1965, 8, 0);
      const newDate = addYears(value, -10);
      const wrapper = shallow(
        <CalendarDate highlight={value} value={value} show="yy" onChange={onChange} />
      );
      wrapper
        .find('button')
        .at(0)
        .simulate('click');

      expect(onChange).toBeCalledWith(newDate);
    });

    it('incrementYears()', () => {
      const onChange = jest.fn();
      const value = new Date(1997, 8, 0);
      const newDate = addYears(value, 1);
      const wrapper = shallow(
        <CalendarDate highlight={value} value={value} show="mm" onChange={onChange} />
      );
      wrapper
        .find('button')
        .at(1)
        .simulate('click');

      expect(onChange).toBeCalledWith(newDate);
    });

    it('decrementYears()', () => {
      const onChange = jest.fn();
      const value = new Date(1977, 8, 0);
      const newDate = addYears(value, -1);
      const wrapper = shallow(
        <CalendarDate highlight={value} value={value} show="mm" onChange={onChange} />
      );
      wrapper
        .find('button')
        .at(0)
        .simulate('click');

      expect(onChange).toBeCalledWith(newDate);
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

    expect(wrapper.state('monthsOptions')).toMatchSnapshot();
  });

  it('getYearOptions()', () => {
    const value = new Date(1767, 8, 0);
    const wrapper = shallow(<CalendarDate highlight={value} value={value} show="yy" />);
    wrapper.instance().getYearOptions(value);
    const { options } = wrapper.find('TableSelect').props();

    expect(options).toMatchSnapshot();
  });

  it('getYearDecadeOptions()', () => {
    const value = new Date(1767, 8, 0);
    const wrapper = shallow(<CalendarDate highlight={value} value={value} show="yy" />);
    const options = wrapper.instance().getYearDecadeOptions(value);

    expect(options).toMatchSnapshot();
  });

  describe('getBtnStyle()', () => {
    const value = new Date(1767, 8, 0);
    it('if leftArrow && !rightArrow', () => {
      const wrapper = shallow(<CalendarDate value={value} leftArrow />);
      const btnStyle = wrapper.instance().getBtnStyle();

      expect(btnStyle).toEqual({ justifyContent: 'flex-start' });
    });

    it('if !leftArrow && rightArrow', () => {
      const wrapper = shallow(<CalendarDate value={value} rightArrow />);
      const btnStyle = wrapper.instance().getBtnStyle();

      expect(btnStyle).toEqual({ justifyContent: 'flex-end' });
    });

    it('else', () => {
      const wrapper = shallow(<CalendarDate value={value} />);
      const btnStyle = wrapper.instance().getBtnStyle();

      expect(btnStyle).toEqual({ justifyContent: 'space-between' });
    });
  });
});
