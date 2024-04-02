import { PLAYER_X } from '../utils/constants';

interface Props {
  isActive: boolean;
  index: number;
  value: number | null;
  playerMove: (index: number) => void;
}

const Square = ({ isActive, index, value, playerMove }: Props) => {
  return (
    <button className="square" type="button" onClick={() => playerMove(index)}>
      {isActive && <p className="marker">{value === PLAYER_X ? 'X' : 'O'}</p>}
    </button>
  );
};

export default Square;
