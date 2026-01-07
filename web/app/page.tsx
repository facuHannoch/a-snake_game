'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

const GRID_SIZE = 15;
const CELL_SIZE = 30;
const INITIAL_SNAKE = [{ x: 7, y: 7 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const GAME_SPEED = 150;

type Position = { x: number; y: number };
type Direction = { x: number; y: number };

export default function Home() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [nextDirection, setNextDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Position>({ x: 10, y: 10 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const generateFood = useCallback((): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const startGame = useCallback(() => {
    setGameStarted(true);
    setShowInstructions(false);
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setNextDirection(INITIAL_DIRECTION);
    setFood({ x: 10, y: 10 });
    setGameOver(false);
    setScore(0);
    setGameStarted(false);
    setShowInstructions(true);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      // Space bar to start/restart game
      if (key === ' ') {
        e.preventDefault();
        if (showInstructions) {
          startGame();
        } else if (gameOver) {
          resetGame();
        }
        return;
      }

      if (showInstructions) {
        startGame();
        return;
      }

      if (!gameStarted || gameOver) return;
      
      // Prevent default for arrow keys to stop page scrolling
      if (key.startsWith('arrow')) {
        e.preventDefault();
      }

      switch (key) {
        case 'arrowup':
        case 'w':
          if (nextDirection.y === 0) setNextDirection({ x: 0, y: -1 });
          break;
        case 'arrowdown':
        case 's':
          if (nextDirection.y === 0) setNextDirection({ x: 0, y: 1 });
          break;
        case 'arrowleft':
        case 'a':
          if (nextDirection.x === 0) setNextDirection({ x: -1, y: 0 });
          break;
        case 'arrowright':
        case 'd':
          if (nextDirection.x === 0) setNextDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextDirection, gameStarted, gameOver, showInstructions, startGame, resetGame]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      setSnake(prevSnake => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + nextDirection.x,
          y: head.y + nextDirection.y,
        };

        // Check wall collision
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(prev => prev + 1);
          setFood(generateFood());
          return newSnake;
        }

        newSnake.pop();
        return newSnake;
      });
    }, GAME_SPEED);

    return () => clearInterval(gameLoop);
  }, [nextDirection, food, gameStarted, gameOver, generateFood]);

  return (
    <div className="flex min-h-screen h-screen items-center justify-center bg-zinc-900 font-sans relative overflow-hidden">
      {/* Info Icon */}
      <Link
        href="/info"
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border-2 border-zinc-500 text-zinc-500 hover:border-green-400 hover:text-green-400 transition-colors font-bold text-lg"
        title="Game Info"
      >
        !
      </Link>

      <main className="flex flex-col items-center gap-8 p-8">
        <h1 className="text-4xl font-bold text-white">Snake Game</h1>
        
        <div className="relative">
          {/* Game Grid */}
          <div
            className="border-4 border-green-500 bg-black relative"
            style={{
              width: GRID_SIZE * CELL_SIZE,
              height: GRID_SIZE * CELL_SIZE,
            }}
          >
            {/* Snake */}
            {snake.map((segment, index) => (
              <div
                key={index}
                className={`absolute ${index === 0 ? 'bg-green-400' : 'bg-green-600'}`}
                style={{
                  width: CELL_SIZE - 2,
                  height: CELL_SIZE - 2,
                  left: segment.x * CELL_SIZE + 1,
                  top: segment.y * CELL_SIZE + 1,
                  borderRadius: index === 0 ? '4px' : '2px',
                }}
              />
            ))}

            {/* Food */}
            <div
              className="absolute bg-red-500 rounded-full"
              style={{
                width: CELL_SIZE - 4,
                height: CELL_SIZE - 4,
                left: food.x * CELL_SIZE + 2,
                top: food.y * CELL_SIZE + 2,
              }}
            />

            {/* Instructions Overlay */}
            {showInstructions && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                <div className="text-center p-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Controls</h2>
                  <div className="text-white text-lg mb-6 space-y-2">
                    <p>Arrow Keys or WASD to move</p>
                    <p className="text-green-400 text-sm mt-4">Press any key to start</p>
                  </div>
                  <button
                    onClick={startGame}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    Start Game
                  </button>
                </div>
              </div>
            )}

            {/* Game Over Overlay */}
            {gameOver && (
              <div className="absolute inset-0 bg-black/90 flex items-center justify-center">
                <div className="text-center p-8">
                  <h2 className="text-3xl font-bold text-red-500 mb-4">Game Over!</h2>
                  <p className="text-2xl text-white mb-6">Score: {score}</p>
                  <button
                    onClick={resetGame}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Score Display */}
        <div className={`text-2xl font-bold text-white ${gameStarted && !gameOver ? 'visible' : 'invisible'}`}>
          Score: {score}
        </div>
      </main>
    </div>
  );
}
