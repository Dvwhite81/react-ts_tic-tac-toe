export const EMPTY_GRID = new Array(9).fill(null);
export const DRAW = 0;
export const PLAYER_X = 1;
export const PLAYER_O = 2;

export const GAME_STATES = {
  notStarted: 'not_started',
  started: 'started',
  over: 'over',
};

export const SCORES: Record<string, number> = {
  1: 1,
  0: 0,
  2: -1,
};

export const GAME_MODES: Record<string, string> = {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
};
