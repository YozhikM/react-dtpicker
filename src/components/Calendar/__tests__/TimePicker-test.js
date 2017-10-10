/* @flow */

import React from 'react';
import renderer from 'react-test-renderer';
import TimePicker from '../TimePicker';

function findBtn(wrapper) {
  return wrapper.find('button');
}

function findTimeSelect(wrapper) {
  return wrapper.find('TimeSelect');
}

describe('TimePicker', () => {
  describe('render()', () => {
    let element = (
      <TimePicker
        onSubmit={() => {}}
        oncChangeDate={() => {}}
        activeDates={new Date(2010, 10, 10)}
        date={new Date(2010, 10, 9)}
      />
    );

    it('from props', () => {
      expect(renderer.create(element));
    });

    it('from state', () => {
      const wrapper = shallow(element);
      wrapper.setState({ date: new Date(2017, 8, 9) });
      expect(renderer.create(wrapper)).toMatchSnapshot();
    });
  });

  it('componentWillReceiveProps()', () => {
    let newDate = new Date(2010, 10, 11);
    const wrapper = shallow(<TimePicker date={new Date(2010, 10, 10)} />);
    wrapper.setProps({ date: newDate });
    expect(wrapper.state('date')).toBe(newDate);
  });

  describe('user interactions', () => {
    it('click on clock', () => {
      const wrapper = shallow(<TimePicker />);
      findBtn(wrapper).simulate('click');
      expect(wrapper.state('show')).toBe('timeSelect');
    });

    it('close timeSelect', () => {
      const wrapper = shallow(<TimePicker />);
      wrapper.setState({ show: 'timeSelect' });
      findTimeSelect(wrapper).simulate('submit');
      expect(wrapper.state('show')).toBe('button');
    });
  });
});
