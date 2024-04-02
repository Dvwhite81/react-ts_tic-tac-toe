import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import {
  DIMENSIONS,
  DRAW,
  GAME_MODES,
  GAME_STATES,
  PLAYER_O,
  PLAYER_X,
} from '../utils/constants';
import Board from './Board';
import Intro from './Intro';
import Game from './Game';
import { getRandomInt, switchPlayer } from '../utils/helpers';
import { minimax } from '../utils/ai';

interface Props {
  squares?: Array<number | null>;
}

const board = new Board();
const emptyGrid = new Array(DIMENSIONS ** 2).fill(null);

const TicTacToe = ({ squares = emptyGrid }: Props) => {
  const [gameState, setGameState] = useState(GAME_STATES.notStarted);
  const [grid, setGrid] = useState(squares);
  const [winner, setWinner] = useState<string | null>(null);
  const [nextMove, setNextMove] = useState<null | number>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [difficulty, setDifficulty] = useState(GAME_MODES.medium);
  const [players, setPlayers] = useState<Record<string, number | null>>({
    human: null,
    ai: null,
  });

  useEffect(() => {
    const boardWinner = board.getWinner(grid);

    const declareWinner = (winner: number) => {
      let winnerStr;

      switch (winner) {
        case PLAYER_X: {
          winnerStr = 'Player X Wins!';
          break;
        }
        case PLAYER_O: {
          winnerStr = 'Player O Wins!';
          break;
        }
        case DRAW:
        default: {
          winnerStr = "It's A Draw!";
        }
      }

      setGameState(GAME_STATES.over);
      setWinner(winnerStr);
      setTimeout(() => setModalOpen(true), 1000);
    };

    if (boardWinner !== null && gameState !== GAME_STATES.over) {
      declareWinner(boardWinner);
    }
  }, [gameState, grid, nextMove]);

  const move = useCallback(
    (index: number, player: number | null) => {
      console.log('move index:', index);
      console.log('move player:', player);
      if (player !== null && gameState === GAME_STATES.started) {
        setGrid((grid) => {
          const gridCopy = grid.concat();
          gridCopy[index] = player;
          return gridCopy;
        });
      }
    },
    [gameState]
  );

  const computerMove = useCallback(() => {
    // Important to pass a copy of the grid here
    const board = new Board(grid.concat());
    const emptyIndices = board.getEmptySquares(grid);
    let index;
    switch (difficulty) {
      case GAME_MODES.easy:
        do {
          index = getRandomInt(0, 8);
        } while (!emptyIndices.includes(index));
        break;
      // Medium level is basically ~half of the moves are minimax and the other ~half random
      case GAME_MODES.medium:
        const smartMove = !board.isEmpty(grid) && Math.random() < 0.5;
        if (smartMove) {
          index = minimax(board, players.ai!)[1];
        } else {
          do {
            index = getRandomInt(0, 8);
          } while (!emptyIndices.includes(index));
        }
        break;
      case GAME_MODES.hard:
      default:
        index = board.isEmpty(grid)
          ? getRandomInt(0, 8)
          : minimax(board, players.ai!)[1];
    }

    if (index !== null && !grid[index]) {
      if (players.ai !== null) {
        move(index, players.ai);
      }
      setNextMove(players.human);
    }
  }, [move, grid, players, difficulty]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (
      nextMove !== null &&
      nextMove === players.ai &&
      gameState !== GAME_STATES.over
    ) {
      timeout = setTimeout(() => {
        computerMove();
      }, 500);
    }
    return () => timeout && clearTimeout(timeout);
  }, [nextMove, computerMove, players.ai, gameState]);

  const playerMove = (index: number) => {
    console.log('playerMove index:', index);
    console.log('playerMove nextMove:', nextMove);
    console.log('playerMove grid:', grid);
    console.log('playerMove grid[index]:', grid[index]);
    if (grid[index] === null && nextMove === players.human) {
      move(index, players.human);
      setNextMove(players.ai);
    }
  };

  const changeDifficulty = (e: ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value);
  };

  const choosePlayer = (option: number) => {
    setPlayers({ human: option, ai: switchPlayer(option) });
    setGameState(GAME_STATES.started);
    setNextMove(PLAYER_X);
  };

  const startNewGame = () => {
    setGameState(GAME_STATES.notStarted);
    setGrid(emptyGrid);
    setModalOpen(false);
  };

  return gameState === GAME_STATES.notStarted ? (
    <Intro
      difficulty={difficulty}
      changeDifficulty={changeDifficulty}
      choosePlayer={choosePlayer}
    />
  ) : (
    <Game
      dimensions={DIMENSIONS}
      grid={grid}
      playerMove={playerMove}
      isOpen={modalOpen}
      close={() => setModalOpen(false)}
      startNewGame={startNewGame}
      winner={winner}
      board={board}
      gameState={gameState}
    />
  );
};

export default TicTacToe;
