import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.spyMount = (component, ...methodNames) => {
  const mount = require('enzyme').mount;
  const wrapper = mount(component);
  const result = [wrapper];
  methodNames.forEach(methodName => {
    result.push(jest.spyOn(wrapper.instance(), methodName));
  });
  wrapper.instance().forceUpdate();
  return result;
};
