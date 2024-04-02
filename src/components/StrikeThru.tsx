import { GAME_STATES } from '../utils/constants';

interface BaseStyleType {
  [key: string]: string;
}

interface Props {
  board: any;
  gameState: any;
}

const StrikeThru = ({ board, gameState }: Props) => {
  const styles =
    gameState === GAME_STATES.over ? board.getStrikeThruStyles() : '';

  const baseStyles: BaseStyleType = {};

  if (styles !== null) {
    for (const key of styles) {
      baseStyles[key] = styles[key];
    }
  }

  return <div className="strike-thru" style={baseStyles} />;
};

export default StrikeThru;
