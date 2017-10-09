/* @flow */

import * as React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
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

function findText(wrapper) {
  return wrapper.find('p').text();
}

describe('InputUpDown', () => {
  it('render()', () => {
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

  describe('increment()', () => {
    it('change state', () => {
      const wrapper = shallow(<InputUpDown value={20} />);
      wrapper.instance().increment();
      expect(wrapper.state('value')).toEqual(21);
    });

    it('invoke onChange', () => {
      const onChange = jest.fn();
      const wrapper = shallow(<InputUpDown value={20} onChange={onChange} />);
      wrapper.instance().increment();
      expect(onChange).toBeCalledWith(21);
    });

    it('if circular', () => {
      const wrapper = shallow(<InputUpDown min={10} max={59} value={59} circular />);
      wrapper.instance().increment();
      expect(wrapper.state('value')).toEqual(10);
    });

    it('if !circular', () => {
      const wrapper = shallow(<InputUpDown value={59} />);
      wrapper.instance().increment();
      expect(wrapper.state('value')).toEqual(60);
    });

    it('if !circular with max', () => {
      const wrapper = shallow(<InputUpDown max={59} value={59} />);
      wrapper.instance().increment();
      expect(wrapper.state('value')).toEqual(59);
    });
  });

  describe('interactions', () => {
    it('button up click v1', () => {
      // const a = <InputUpDown value={20} />;
      const wrapper = mount(<InputUpDown value={20} />);
      const spy = jest.spyOn(wrapper.instance(), 'increment');
      wrapper.instance().forceUpdate();
      findUpBtn(wrapper).simulate('click');
      expect(spy).toBeCalled();
    });

    it('button up click v2', () => {
      const [wrapper, spy] = spyMount(<InputUpDown value={20} />, 'increment');
      findUpBtn(wrapper).simulate('click');
      expect(spy).toBeCalled();
    });

    // it('invoke onChange', () => {
    //   const onChange = jest.fn();
    //   const wrapper = shallow(<InputUpDown value={20} onChange={onChange} />);
    //   findUpBtn(wrapper).simulate('click');
    //   expect(onChange).toBeCalledWith(21);
    // });
  });

  // describe('button down', () => {
  //   describe('on click', () => {
  //     describe('decrement value ', () => {
  //       it('if circular', () => {
  //         downBtn.simulate('click');
  //         expect(input.find('p').text()).toEqual('58');
  //       });
  //       it('if !circular', () => {
  //         const input = shallow(<InputUpDown min={0} max={59} circular={false} value={0} />);
  //         downBtn.simulate('click');
  //         expect(input.find('p').text()).toEqual('0');
  //       });
  //     });
  //
  //     it('change state', () => {
  //       downBtn.simulate('click');
  //       let curValue = Number(input.find('p').text());
  //       expect(input.state('value')).toEqual(curValue);
  //     });
  //
  //     it('invoke cb', () => {
  //       downBtn.simulate('click');
  //       let curValue = Number(input.find('p').text());
  //       expect(onChange).toBeCalledWith(curValue);
  //     });
  //   });
  // });
  //
  // describe('number paragraph', () => {
  //   describe('state change', () => {
  //     it('on click', () => {
  //       numberParagraph.simulate('click');
  //       expect(onClickNumber).toBeCalledWith(inputValue);
  //     });
  //   });
  // });
  // describe('if nextProps', () => {
  //   it('change state', () => {
  //     input.setProps({ value: 0 });
  //     expect(input.state('value')).toEqual(0);
  //   });
  // });
});
