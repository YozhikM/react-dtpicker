/* @flow */

import React from 'react';
import TableSelect from '../TableSelect';

describe('TableSelect', () => {
  describe('render()', () => {
    it('basic', () => {
      const options = [{ value: 99, name: 'ninety nine' }];
      expect(shallow(<TableSelect cols={1} options={options} value={2} />)).toMatchSnapshot();
    });

    it('if matched', () => {
      const options = [{ value: 2, name: 'two' }];
      expect(shallow(<TableSelect cols={1} options={options} value={2} />)).toMatchSnapshot();
    });

    it('if 2 cols', () => {
      const options = [{ value: 21, name: 'twenty one' }];
      expect(shallow(<TableSelect cols={2} options={options} value={2} />)).toMatchSnapshot();
    });
  });

  it('componentWillReceiveProps()', () => {
    const options = [{ value: 1, name: 'one' }];
    const wrapper = shallow(<TableSelect cols={1} options={options} value={1} />);
    wrapper.setProps({ value: 3 });
    expect(wrapper.state('value')).toBe(3);
  });

  describe('user interactions', () => {
    it('clickItem()', () => {
      const options = [{ value: 10, name: 'ten' }];
      const spy = jest.fn();
      const wrapper = shallow(<TableSelect cols={1} options={options} onChange={spy} value={2} />);
      wrapper.find('li').simulate('click');
      expect(wrapper.state('value')).toBe(10);
      expect(spy).toBeCalledWith(10);
    });
  });
});
