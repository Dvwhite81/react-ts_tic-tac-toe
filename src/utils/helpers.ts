import { PLAYER_O, PLAYER_X } from './constants';

export const switchPlayer = (player: number) => {
  return player === PLAYER_X ? PLAYER_O : PLAYER_X;
};

export const getRandomIndex = () => {
  const min = Math.ceil(0);
  const max = Math.floor(8);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
