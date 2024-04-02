import { ChangeEvent } from 'react';
import { GAME_MODES, PLAYER_O, PLAYER_X } from '../utils/constants';

interface Props {
  difficulty: string;
  changeDifficulty: (e: ChangeEvent<HTMLSelectElement>) => void;
  choosePlayer: (player: number) => void;
}

const Intro = ({ difficulty, changeDifficulty, choosePlayer }: Props) => {
  return (
    <div>
      <div className="inner">
        <p>Select Difficulty</p>
        <select
          className="select-difficulty"
          onChange={changeDifficulty}
          value={difficulty}
        >
          {Object.keys(GAME_MODES).map((key) => {
            const gameMode = GAME_MODES[key];
            return (
              <option key={gameMode} value={gameMode}>
                {key}
              </option>
            );
          })}
        </select>
      </div>

      <div className="inner">
        <p>Choose Your Player</p>
        <div className="button-row">
          <button
            className="player-button"
            type="button"
            onClick={() => choosePlayer(PLAYER_X)}
          >
            X
          </button>
          <button
            className="player-button"
            type="button"
            onClick={() => choosePlayer(PLAYER_O)}
          >
            O
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
