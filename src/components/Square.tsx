import { PLAYER_X, SQUARE_DIMENSIONS } from '../utils/constants';

interface Props {
  isActive: boolean;
  index: number;
  value: number | null;
  playerMove: (index: number) => void;
}

const Square = ({ isActive, index, value, playerMove }: Props) => {
  return (
    <div
      className="square"
      onClick={() => playerMove(index)}
      style={{
        height: `${SQUARE_DIMENSIONS}px`,
        width: `${SQUARE_DIMENSIONS}px`,
      }}
    >
      {isActive && <p className="marker">{value === PLAYER_X ? 'X' : 'O'}</p>}
    </div>
  );
};

export default Square;
