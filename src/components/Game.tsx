import { SQUARE_DIMENSIONS } from '../utils/constants';
import Board from './Board';
import ResultModal from './ResultModal';
import Square from './Square';
import StrikeThru from './StrikeThru';

interface Props {
  dimensions: number;
  grid: Array<number | null>;
  playerMove: (index: number) => void;
  isOpen: boolean;
  close: () => void;
  startNewGame: () => void;
  winner: string | null;
  board: Board;
  gameState: string;
}

const Game = ({
  dimensions,
  grid,
  playerMove,
  isOpen,
  close,
  startNewGame,
  winner,
  board,
  gameState,
}: Props) => {
  return (
    <div
      className="container"
      style={{ width: `${dimensions * SQUARE_DIMENSIONS + 12}px` }}
    >
      {grid.map((value, index) => {
        const isActive = value !== null;

        return (
          <Square
            key={index}
            isActive={isActive}
            index={index}
            value={value}
            playerMove={playerMove}
          />
        );
      })}

      <StrikeThru board={board} gameState={gameState} />

      <ResultModal
        isOpen={isOpen}
        winner={winner}
        close={close}
        startNewGame={startNewGame}
      />
    </div>
  );
};

export default Game;
