import { GAME_STATES } from '../utils/constants';
import Board from './Board';

interface BaseStyleType {
  [key: string]: string;
}

interface Props {
  board: Board;
  gameState: string;
}

const StrikeThru = ({ board, gameState }: Props) => {
  const styles =
    gameState === GAME_STATES.over ? board.getStrikeThruStyles() : '';

  const baseStyles: BaseStyleType = {};

  if (styles !== null) {
    for (const [key, value] of Object.entries(styles)) {
      baseStyles[key] = value;
    }
  }

  return <div className="strike-thru" style={baseStyles} />;
};

export default StrikeThru;
