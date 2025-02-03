const getRandomColorValue = () => Math.floor(Math.random() * 256);

const randomHandler = {
  randomBgColor: () =>
    `rgb(${getRandomColorValue()}, ${getRandomColorValue()}, ${getRandomColorValue()})`,
};

export default randomHandler;
