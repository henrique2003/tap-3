import { drop, dropLine } from "@/src/assets";
import { GAME } from "@/src/conts/game";
import { Board, BoardFactory, PlayerType } from "@/src/domain";
import { Audio } from "expo-av";
import { goBack } from "expo-router/build/global-state/routing";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert
} from "react-native";
import { GameBoardProps } from "./props";
import { GameBoardUtils } from "./utils";

const { BOARD } = GAME;

export const useGameBoard = ({ singlePlayer }: GameBoardProps) => {
  const [board, setBoard] = useState<Board>(BoardFactory.create().getValue());
  const [moveCount, setMoveCount] = useState(0);
  const [showRules, setShowRules] = useState(false);

  const { t } = useTranslation()

  const botPlayer = PlayerType.Yellow;
  const dropSound = useRef<Audio.Sound | null>(null);
  const currentPlayer = useMemo(() => board.currentPlayer, [board.currentPlayer]);

  const movesUntilDrop = useMemo(() => {
    const remaining = BOARD.DROP_CONDITION - (moveCount % BOARD.DROP_CONDITION);
    return remaining === 0 ? BOARD.DROP_CONDITION : remaining;
  }, [moveCount]);


  useEffect(() => {
    if (singlePlayer && currentPlayer.type === botPlayer) {
      const botMove = getBestMove(board.cells, BOARD.MAX_DEPTH, PlayerType.Yellow);
      setTimeout(() => dropPiece(botMove, true), 500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlayer]);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(drop);
      dropSound.current = sound;
    };

    loadSound();

    return () => {
      dropSound.current?.unloadAsync();
    };
  }, []);

  function handleChangeShowRules(show: boolean): void {
    setShowRules(show);
  }

  const getBestMove = (board: number[][], depth: number, botPlayer: number): number => {
    const opponent = botPlayer === 1 ? 2 : 1;

    // 1. Verifica se o bot pode vencer agora
    for (let col of GameBoardUtils.getValidMoves(board)) {
      const row = GameBoardUtils.getAvailableRow(board, col);
      if (row === -1) continue;

      const tempBoard = GameBoardUtils.cloneBoard(board);
      tempBoard[row][col] = botPlayer;

      if (checkWin(tempBoard, row, col, botPlayer)) {
        return col; // joga para vencer
      }
    }

    // 2. Verifica se o oponente pode vencer na próxima jogada
    for (let col of GameBoardUtils.getValidMoves(board)) {
      const row = GameBoardUtils.getAvailableRow(board, col);
      if (row === -1) continue;

      const tempBoard = GameBoardUtils.cloneBoard(board);
      tempBoard[row][col] = opponent;

      if (checkWin(tempBoard, row, col, opponent)) {
        return col; // bloqueia
      }
    }

    // 3. Se não há vitória/bloqueio, usa o minimax
    let bestScore = -Infinity;
    let bestCols: number[] = [];

    for (let col of GameBoardUtils.getValidMoves(board)) {
      const row = GameBoardUtils.getAvailableRow(board, col);
      if (row === -1) continue;

      const tempBoard = GameBoardUtils.cloneBoard(board);
      tempBoard[row][col] = botPlayer;

      const score = minimax(tempBoard, depth - 1, false, botPlayer, opponent);

      if (score > bestScore) {
        bestScore = score;
        bestCols = [col];
      } else if (score === bestScore) {
        bestCols.push(col);
      }
    }

    // Ordena para priorizar colunas mais próximas ao centro
    bestCols.sort((a, b) => Math.abs(BOARD.COLS / 2 - a) - Math.abs(BOARD.COLS / 2 - b));
    return bestCols[Math.floor(Math.random() * Math.min(2, bestCols.length))]; // sorteia entre os melhores
  };

  const minimax = (
    board: number[][],
    depth: number,
    isMaximizing: boolean,
    botPlayer: number,
    humanPlayer: number
  ): number => {
    if (depth === 0 || GameBoardUtils.isBoardFull(board)) {
      return GameBoardUtils.evaluateBoard(board, botPlayer);
    }

    const player = isMaximizing ? botPlayer : humanPlayer;
    const moves = GameBoardUtils.getValidMoves(board);

    let best = isMaximizing ? -Infinity : Infinity;

    for (let col of moves) {
      const row = GameBoardUtils.getAvailableRow(board, col);
      if (row === -1) continue;

      const tempBoard = GameBoardUtils.cloneBoard(board);
      tempBoard[row][col] = player;

      const score = minimax(tempBoard, depth - 1, !isMaximizing, botPlayer, humanPlayer);
      best = isMaximizing ? Math.max(best, score) : Math.min(best, score);
    }

    return best;
  };

  const playDropSound = async () => {
    try {
      await dropSound.current?.replayAsync();
    } catch (error) {
      console.warn("Erro ao reproduzir som:", error);
    }
  };

  const playLineDropSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(dropLine);
      await sound.playAsync();
    } catch (error) {
      console.warn("Erro ao tocar som da linha:", error);
    }
  };

  const dropPiece = async (colIndex: number, isBotPlayer?: boolean) => {
    if (singlePlayer && currentPlayer.type === botPlayer && !isBotPlayer || board.locked) {
      return;
    }

    const newBoard: Board = board.clone();

    for (let row = BOARD.ROWS - 1; row >= 0; row--) {
      if (newBoard.cells[row][colIndex] === 0) {
        newBoard.cells[row][colIndex] = currentPlayer.type;

        const updatedMoveCount = moveCount + 1;
        const isWin: boolean = checkWin(newBoard.cells, row, colIndex, currentPlayer.type)
        const isBoardFull = GameBoardUtils.isBoardFull(newBoard.cells);
        const isDorpCondition = updatedMoveCount % BOARD.DROP_CONDITION === 0;
        if (!isWin && isDorpCondition || (isBoardFull && !isDorpCondition)) {
          newBoard.dropLine();

          playLineDropSound();
        }

        if (!isWin) {
          newBoard.nextPlayer();
        } else {
          newBoard.lock();
        }

        playDropSound();
        setBoard(newBoard);

        if (isWin) {
          setTimeout(() => {
            Alert.alert(
              `${PlayerType.Red === currentPlayer.type ? t('game-board.player-red-wins') : t('game-board.player-yellow-wins')}`,
              `${t('game-board.do-you-want-to-play-again')}`,
              [
                {
                  text: `${t('game-board.beginning')}`,
                  style: "cancel",
                  onPress: () => {
                    goBack();
                  },
                },
                {
                  text: `${t('game-board.play-again')}`,
                  onPress: () => {
                    newBoard.declareWinner();
                    newBoard.playAgain();

                    setBoard(newBoard);
                    setMoveCount(0);
                  },
                },
              ]
            );
          }, 1000)
          return
        }

        return setMoveCount(updatedMoveCount);
      }
    }
  };

  const checkWin = (b: number[][], row: number, col: number, player: number): boolean => {
    return (
      countInDirection(b, row, col, 0, 1, player) + countInDirection(b, row, col, 0, -1, player) + 1 >= BOARD.WIN_CONDITION ||
      countInDirection(b, row, col, 1, 0, player) + countInDirection(b, row, col, -1, 0, player) + 1 >= BOARD.WIN_CONDITION ||
      countInDirection(b, row, col, 1, 1, player) + countInDirection(b, row, col, -1, -1, player) + 1 >= BOARD.WIN_CONDITION ||
      countInDirection(b, row, col, 1, -1, player) + countInDirection(b, row, col, -1, 1, player) + 1 >= BOARD.WIN_CONDITION
    );
  };

  const countInDirection = (b: number[][], row: number, col: number, rowDir: number, colDir: number, player: number): number => {
    let count = 0;
    let r = row + rowDir;
    let c = col + colDir;
    while (r >= 0 && r < BOARD.ROWS && c >= 0 && c < BOARD.COLS && b[r][c] === player) {
      count++;
      r += rowDir;
      c += colDir;
    }
    return count;
  };

  return {
    movesUntilDrop,
    board,
    dropPiece,
    handleChangeShowRules,
    showRules
  }
}