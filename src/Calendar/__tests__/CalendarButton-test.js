/* @flow */

import * as React from 'react';
import CalendarButton from '../CalendarButton';

describe('CalendarButton', () => {
  describe('render()', () => {
    it('basic', () => {
      const wrapper = shallow(<CalendarButton />);

      expect(wrapper).toMatchSnapshot();
    });

    it('if style', () => {
      const wrapper = shallow(<CalendarButton style={{ backgroundColor: 'rebeccapurple' }} />);

      expect(wrapper).toMatchSnapshot();
    });
  });

  it('onClick()', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<CalendarButton onClick={onClick} />);
    wrapper.find('div').simulate('click');

    expect(onClick).toBeCalled();
  });
});
