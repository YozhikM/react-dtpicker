/* @flow */

import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CalendarDay from '../CalendarDay';

Enzyme.configure({ adapter: new Adapter() });

describe('CalendarDay', () => {
  const onClick = jest.fn();
  let calendarDay;
  let td;
  let date = new Date(2017, 8, 8);
  beforeEach(() => {
    calendarDay = shallow(<CalendarDay date={date} isActive={true} onClick={onClick} />);
    td = calendarDay.find('td');
  });

  it('render()', () => {
    const tree = renderer.create(calendarDay).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('on click', () => {
    it('invoke cb', () => {
      td.simulate('click');
      expect(onClick).toBeCalledWith(date);
    });
  });
});
