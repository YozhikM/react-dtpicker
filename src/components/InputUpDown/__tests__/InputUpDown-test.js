/* @flow */

import * as React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InputUpDown from '../InputUpDown';

Enzyme.configure({ adapter: new Adapter() });

function findUpBtn(wrapper) {
  return wrapper.find('button').at(0);
}

function findDownBtn(wrapper) {
  return wrapper.find('button').at(1);
}

function findP(wrapper) {
  return wrapper.find('p');
}

// function findText(wrapper) {
//   return wrapper.find('p').text();
// }

describe('InputUpDown', () => {
  describe('render()', () => {
    it('from props', () => {
      expect(
        renderer.create(
          <InputUpDown
            onClickNumber={() => {}}
            onChange={() => {}}
            min={0}
            max={59}
            circular
            value={59}
          />
        )
      ).toMatchSnapshot();
    });

    it('from state', () => {
      let element = (
        <InputUpDown
          onClickNumber={() => {}}
          onChange={() => {}}
          min={0}
          max={59}
          circular
          value={59}
        />
      );
      const wrapper = shallow(element);
      wrapper.setState({ value: 13 });
      expect(renderer.create(wrapper)).toMatchSnapshot();
    });
  });

  describe('increment()', () => {
    it('change state', () => {
      const wrapper = shallow(<InputUpDown value={20} />);
      wrapper.instance().increment();
      expect(wrapper.state('value')).toEqual(21);
    });

    it('onChange callback', () => {
      const onChange = jest.fn();
      const wrapper = shallow(<InputUpDown value={20} onChange={onChange} />);
      wrapper.instance().increment();
      expect(onChange).toBeCalledWith(21);
    });

    it('if circular', () => {
      const wrapper = shallow(<InputUpDown value={59} min={10} max={59} circular />);
      wrapper.instance().increment();
      expect(wrapper.state('value')).toEqual(10);
    });

    it('if !circular', () => {
      const wrapper = shallow(<InputUpDown value={59} />);
      wrapper.instance().increment();
      expect(wrapper.state('value')).toEqual(60);
    });

    it('if !circular with max', () => {
      const wrapper = shallow(<InputUpDown value={59} max={59} />);
      wrapper.instance().increment();
      expect(wrapper.state('value')).toEqual(59);
    });
  });

  describe('decrement()', () => {
    it('change state', () => {
      const wrapper = shallow(<InputUpDown value={20} />);
      wrapper.instance().decrement();
      expect(wrapper.state('value')).toEqual(19);
    });

    it('onChange callback', () => {
      const onChange = jest.fn();
      const wrapper = shallow(<InputUpDown value={20} onChange={onChange} />);
      wrapper.instance().decrement();
      expect(onChange).toBeCalledWith(19);
    });

    it('if circular', () => {
      const wrapper = shallow(<InputUpDown value={10} min={10} max={59} circular />);
      wrapper.instance().decrement();
      expect(wrapper.state('value')).toEqual(59);
    });

    it('if !circular', () => {
      const wrapper = shallow(<InputUpDown value={59} />);
      wrapper.instance().decrement();
      expect(wrapper.state('value')).toEqual(58);
    });

    it('if !circular with min', () => {
      const wrapper = shallow(<InputUpDown value={1} min={1} />);
      wrapper.instance().decrement();
      expect(wrapper.state('value')).toEqual(1);
    });
  });

  describe('user interactions', () => {
    it('button up click', () => {
      const [wrapper, spy] = spyMount(<InputUpDown value={20} />, 'increment');
      findUpBtn(wrapper).simulate('click');
      expect(spy).toBeCalled();
    });

    it('button up mouseDown', () => {
      const [wrapper, spy] = spyMount(<InputUpDown value={20} />, 'onHoldStart');
      let increment = wrapper.instance().increment;
      findUpBtn(wrapper).simulate('mouseDown');
      expect(spy).toBeCalledWith(increment);
    });

    it('button up mouseUp', () => {
      const [wrapper, spy] = spyMount(<InputUpDown value={20} />, 'onHoldEnd');
      findUpBtn(wrapper).simulate('mouseUp');
      expect(spy).toBeCalled();
    });

    it('button down click', () => {
      const [wrapper, spy] = spyMount(<InputUpDown value={20} />, 'decrement');
      findDownBtn(wrapper).simulate('click');
      expect(spy).toBeCalled();
    });

    it('button down mouseDown', () => {
      const [wrapper, spy] = spyMount(<InputUpDown value={20} />, 'onHoldStart');
      let decrement = wrapper.instance().decrement;
      findDownBtn(wrapper).simulate('mouseDown');
      expect(spy).toBeCalledWith(decrement);
    });
  });

  it('componentWillReceiveProps()', () => {
    const wrapper = shallow(<InputUpDown value={1} />);
    wrapper.setProps({ value: 16 });
    expect(wrapper.state('value')).toBe(16);
  });

  it('onClickNumber()', () => {
    const [wrapper, spy] = spyMount(<InputUpDown value={20} />, 'onClickNumber');
    findP(wrapper).simulate('click');
    expect(spy).toBeCalled();
  });
});
