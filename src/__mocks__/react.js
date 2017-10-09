const react = require('react');
// Resolution for requestAnimationFrame not supported in jest error :
// https://github.com/facebook/react/issues/9102#issuecomment-283873039
global.window = global;
window.addEventListener = () => {};
window.requestAnimationFrame = () => {
  throw new Error('requestAnimationFrame is not supported in Node');
};

module.exports = react;

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
