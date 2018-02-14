/* @flow */

import * as React from 'react';
import DateMaskInput from '../DateMaskInput';

const visibleDate = new Date('2018, 2, 9');

describe('DateMaskInput', () => {
  it('render()', () => {
    const wrapper = shallow(<DateMaskInput visibleDate={visibleDate} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('componentWillReceiveProps()', () => {
    const wrapper = shallow(<DateMaskInput visibleDate={visibleDate} />);
    const nextProps = {
      visibleDate: new Date('2017, 2, 10'),
    };
    wrapper.instance().componentWillReceiveProps(nextProps);

    expect(wrapper.state('inputValue')).toBe('10/02/2017');
  });

  it('formatWithTime()', () => {
    const wrapper = shallow(<DateMaskInput visibleDate={visibleDate} />);
    const formattedDate = wrapper.instance().formatWithTime(new Date('2018, 2, 6'));

    expect(formattedDate).toBe('06/02/2018 00:00');
  });

  it('formatWithoutTime()', () => {
    const wrapper = shallow(<DateMaskInput visibleDate={visibleDate} />);
    const formattedDate = wrapper.instance().formatWithoutTime(new Date('2018, 2, 1'));

    expect(formattedDate).toBe('01/02/2018');
  });

  it('replaceText()', () => {
    const wrapper = shallow(<DateMaskInput visibleDate={visibleDate} />);
    const replacedText = wrapper.instance().replaceText('Маша', /ма/gi);

    expect(replacedText).toBe('ша');
  });

  it('replaceValue()', () => {
    const wrapper = shallow(<DateMaskInput visibleDate={visibleDate} />);
    const replacedValue = wrapper.instance().replaceValue('20.03-2018/');

    expect(replacedValue).toBe('20032018');
  });

  describe('onChangeInputValue', () => {
    const onChange = jest.fn();

    it('if value > 10', () => {
      const wrapper = shallow(<DateMaskInput visibleDate={visibleDate} onChange={onChange} />);
      wrapper.instance().onChangeInputValue(({}: any), '01/07/19931');

      expect(wrapper.state('inputValue')).toBe('01/07/1993');
      expect(onChange).not.toBeCalled();
    });

    it('if value === 10', () => {
      const wrapper = shallow(<DateMaskInput visibleDate={visibleDate} onChange={onChange} />);
      wrapper.instance().onChangeInputValue(({}: any), '01/07/1994');

      expect(wrapper.state('inputValue')).toBe('01/07/1994');
      expect(onChange).toBeCalledWith(new Date('1994-06-30T17:00:00.000Z'));
    });

    it('replacedValue.length === 8', () => {
      const wrapper = shallow(<DateMaskInput visibleDate={visibleDate} onChange={onChange} />);
      wrapper.instance().onChangeInputValue(({}: any), '01091994');

      expect(wrapper.state('inputValue')).toBe('01/09/1994');
      expect(onChange).toBeCalledWith(new Date('1994-08-31T17:00:00.000Z'));
    });
  });
});
