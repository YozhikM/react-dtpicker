global.addEventListener = () => {};
global.requestAnimationFrame = (callback) => {
  console.log('HIIII!');
  setTimeout(callback, 0);
};
global.window = global;
