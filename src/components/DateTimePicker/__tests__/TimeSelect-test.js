/* @flow */

import React from 'react';
import renderer from 'react-test-renderer';
import { setHours, setMinutes, setSeconds } from 'date-fns';
import TimeSelect from '../TimeSelect';

function findBtn(wrapper) {
  return wrapper.find('button').at(4);
}

function findTable(wrapper) {
  return wrapper.find('TableSelect');
}

describe('TimeSelect', () => {
  describe('render()', () => {
    it('from props', () => {
      expect(
        renderer.create(<TimeSelect value={new Date(2017, 8, 8)} showSeconds={true} />)
      ).toMatchSnapshot();
    });

    it('from state', () => {
      let element = <TimeSelect value={new Date(2017, 8, 8)} showSeconds={true} />;
      const wrapper = shallow(element);
      wrapper.setState({ value: new Date(2000, 1, 9) });
      expect(renderer.create(wrapper)).toMatchSnapshot();
    });
  });

  describe('onChange()', () => {
    let value = new Date(2017, 7, 7, 0, 0, 0);
    const onChange = jest.fn();

    beforeEach(() => {
      onChange.mockReset();
    });

    describe('change input', () => {
      describe('change HH', () => {
        it('change state', () => {
          const wrapper = shallow(<TimeSelect value={value} />);
          wrapper.instance().onChangeHH(14);
          expect(wrapper.state('hh')).toBe(14);
        });

        it('onChange callback', () => {
          const wrapper = shallow(<TimeSelect value={value} onChange={onChange} />);
          wrapper.instance().onChangeHH(22);
          expect(onChange).toBeCalledWith(setHours(value, 22));
        });
      });

      describe('change MM', () => {
        it('change state', () => {
          const wrapper = shallow(<TimeSelect value={value} />);
          wrapper.instance().onChangeMM(12);
          expect(wrapper.state('mm')).toBe(12);
        });

        it('onChange callback', () => {
          const wrapper = shallow(<TimeSelect value={value} onChange={onChange} />);
          wrapper.instance().onChangeMM(12);
          expect(onChange).toBeCalledWith(setMinutes(value, 12));
        });
      });

      describe('change SS', () => {
        it('change state', () => {
          const wrapper = shallow(<TimeSelect value={value} showSeconds />);
          wrapper.instance().onChangeSS(7);
          expect(wrapper.state('ss')).toBe(7);
        });

        it('onChange callback', () => {
          const wrapper = shallow(<TimeSelect value={value} onChange={onChange} showSeconds />);
          wrapper.instance().onChangeSS(7);
          expect(onChange).toBeCalledWith(setSeconds(value, 7));
        });
      });
    });
  });

  describe('onClick()', () => {
    const wrapper = shallow(<TimeSelect />);

    describe('click HH', () => {
      it('change state', () => {
        wrapper.instance().onClickHH();
        expect(wrapper.state('show')).toBe('hh');
      });
    });

    describe('click MM', () => {
      it('change state', () => {
        wrapper.instance().onClickMM();
        expect(wrapper.state('show')).toBe('mm');
      });
    });

    describe('click SS', () => {
      it('change state', () => {
        wrapper.instance().onClickSS();
        expect(wrapper.state('show')).toBe('ss');
      });
    });
  });

  it('componentWillReceiveProps()', () => {
    const wrapper = shallow(<TimeSelect showSeconds={true} />);
    wrapper.setProps({ showSeconds: false });
    expect(wrapper.state('showSeconds')).toBeFalsy();
  });

  it('onSubmit()', () => {
    const [wrapper, spy] = spyMount(<TimeSelect />, 'onSubmit');
    findBtn(wrapper).simulate('click');
    findBtn(wrapper);
    expect(spy).toBeCalled();
  });

  it('onChange()', () => {
    const [wrapper, spy] = spyMount(<TimeSelect />, 'onChange');
    wrapper.instance().onChange();
    expect(spy).toBeCalled();
  });

  describe('parseTime()', () => {
    const wrapper = shallow(<TimeSelect showSeconds={true} />);
    let value = new Date(2017, 7, 7, 10, 9, 8);
    let result = wrapper.instance().parseTime(value);

    const { hh, mm, ss } = result;
    expect(hh).toBe(10);
    expect(mm).toBe(9);
    expect(ss).toBe(8);
  });

  describe('getValue() of', () => {
    const wrapper = shallow(<TimeSelect value={new Date(2010, 9, 8, 7, 6, 5)} />);

    it('hours', () => {
      let hh = wrapper.state('hh');
      expect(hh).toBe(7);
    });

    it('minutes', () => {
      let mm = wrapper.state('mm');
      expect(mm).toBe(6);
    });

    it('seconds', () => {
      let ss = wrapper.state('ss');
      expect(ss).toBe(5);
    });
  });

  describe('genTableOpts() of', () => {
    const wrapper = shallow(<TimeSelect value={new Date(2010, 9, 8)} />);

    it('hours table', () => {
      let array = wrapper.instance().genTableOpts(0, 23);
      expect(array).toHaveLength(24);
    });

    it('minutes table', () => {
      let array = wrapper.instance().genTableOpts(0, 59, 5);
      expect(array).toHaveLength(12);
    });

    it('seconds table', () => {
      let array = wrapper.instance().genTableOpts(0, 59, 5);
      expect(array).toHaveLength(12);
    });
  });

  describe('user interactions', () => {
    it('button onClick', () => {
      const onSubmit = jest.fn();
      const [wrapper, spy] = spyMount(
        <TimeSelect value={new Date(2010, 9, 8)} onSubmit={onSubmit} />,
        'onSubmit'
      );
      findBtn(wrapper).simulate('click');
      expect(spy).toBeCalled();
    });

    describe('tables onChange', () => {
      const onChange = jest.fn();
      let wrapper;
      let spy;

      beforeEach(() => {
        [wrapper, spy] = spyMount(
          <TimeSelect value={new Date(2010, 9, 8)} onChange={onChange} />,
          'onChange'
        );
      });

      describe('hh table', () => {
        it('change show', () => {
          wrapper.setState({ show: 'hh' });
          findTable(wrapper)
            .props()
            .onChange();
          expect(wrapper.state('show')).toBe('main');
        });

        it('change state', () => {
          let value = 12;
          wrapper.setState({ show: 'hh' });
          findTable(wrapper)
            .props()
            .onChange(value);
          expect(wrapper.state('hh')).toBe(12);
        });

        it('onChange callback', () => {
          wrapper.setState({ show: 'hh' });
          findTable(wrapper)
            .props()
            .onChange();
          expect(spy).toBeCalled();
        });
      });

      describe('mm table', () => {
        it('change show', () => {
          wrapper.setState({ show: 'mm' });
          findTable(wrapper)
            .props()
            .onChange();
          expect(wrapper.state('show')).toBe('main');
        });

        it('change state', () => {
          let value = 10;
          wrapper.setState({ show: 'mm' });
          findTable(wrapper)
            .props()
            .onChange(value);
          expect(wrapper.state('mm')).toBe(10);
        });

        it('onChange callback', () => {
          wrapper.setState({ show: 'mm' });
          findTable(wrapper)
            .props()
            .onChange();
          expect(spy).toBeCalled();
        });
      });

      describe('ss table', () => {
        it('change show', () => {
          wrapper.setState({ show: 'ss' });
          findTable(wrapper)
            .props()
            .onChange();
          expect(wrapper.state('show')).toBe('main');
        });

        it('change state', () => {
          let value = 9;
          wrapper.setState({ show: 'ss' });
          findTable(wrapper)
            .props()
            .onChange(value);
          expect(wrapper.state('ss')).toBe(9);
        });

        it('onChange callback', () => {
          wrapper.setState({ show: 'ss' });
          findTable(wrapper)
            .props()
            .onChange();
          expect(spy).toHaveBeenCalled();
        });
      });
    });
  });
});
