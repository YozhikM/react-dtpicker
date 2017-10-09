/* @flow */

import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TimeSelect from '../TimeSelect';

Enzyme.configure({ adapter: new Adapter() });

describe('TimeSelect', () => {
  const onSubmitTime = jest.fn();
  const onChangeDate = jest.fn();
  let timeSelect;

  beforeEach(() => {
    timeSelect = shallow(
      <TimeSelect
        value={new Date(2017, 8, 8)}
        showSeconds={true}
        onSubmit={onSubmitTime}
        onChange={onChangeDate}
      />
    );
  });

  it('render()', () => {
    const tree = renderer.create(timeSelect).toJSON();
    expect(tree).toMatchSnapshot();
  });
  describe('if nextProps', () => {
    it('change state', () => {
      let newVal = new Date(2017, 8, 9);
      timeSelect.setProps({ value: newVal });
      expect(timeSelect.state('hh')).toEqual(newVal.getHours());
      expect(timeSelect.state('mm')).toEqual(newVal.getMinutes());
      expect(timeSelect.state('ss')).toEqual(newVal.getSeconds());
    });
  });
});
