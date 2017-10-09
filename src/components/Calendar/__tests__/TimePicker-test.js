/* @flow */

import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TimePicker from '../TimePicker';

Enzyme.configure({ adapter: new Adapter() });

describe('TimePicker', () => {
  const onChangeDate = jest.fn();
  let timePicker;
  let button;
  beforeEach(() => {
    timePicker = shallow(
      <TimePicker
        onChangeDate={onChangeDate}
        activeDates={new Date(2017, 20, 8)}
        date={new Date(2017, 20, 8)}
      />
    );
    button = timePicker.find('button');
  });

  it('render()', () => {
    const tree = renderer.create(timePicker).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // describe('button', () => {
  //   it('on click change state', () => {
  //     button.simulate('click');
  //     expect(timePicker.state('show')).toEqual('timeSelect');
  //   });
  // });

  describe('if timeSelect', () => {
    // it('on submit change state', () => {
    //   button.simulate('click');
    //   timePicker.find('TimeSelect').simulate('submit');
    //   expect(timePicker.state('show')).toEqual('button');
    // });

    it('on change invoke cb', () => {
      button.simulate('click');
      timePicker.find('TimeSelect').simulate('change');
      expect(onChangeDate).toBeCalled();
    });
  });
  describe('if nextProps', () => {
    it('change state', () => {
      timePicker.setProps({ date: new Date(2017, 8, 10) });
      expect(timePicker.state('date')).toEqual(new Date(2017, 8, 10));
    });
  });
});
