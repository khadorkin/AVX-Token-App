import { keyframes } from 'styled-components';

const originX = 25;
const keyFrameExampleOne = keyframes`
0% {
  transform: scale(1);
  transform-origin: ${originX}% 50%;
}
50% {
  transform: scale(1.2);
  transform-origin: ${originX}% 50%;
}
100% {
  transform: scale(1);
  transform-origin: ${originX}% 50%;
}
`;

export default {
  animation: `${keyFrameExampleOne} 1s linear 0s infinite`,
};
