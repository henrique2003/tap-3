import { drop, dropLine, katin, play } from "@/src/assets";
import { useGameCtx } from "@/src/contexts";
import { useUserCtx } from "@/src/contexts/user/hook";
import { GAME } from "@/src/conts/game";
import { Board, BoardFactory, PlayerType } from "@/src/domain";
import { UserService } from "@/src/infra";
import { SoundManager } from "@/src/utils";
import { useEffect, useMemo, useState } from "react";
import { GameBoardFooter } from "../../components";
import { GameBoardUtils } from "./utils";

const userService = new UserService()

const { BOARD } = GAME;

export const useGame = () => {
  const [board, setBoard] = useState<Board>(BoardFactory.create().getValue());
  const [showRules, setShowRules] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  const { game, startGame, finishGame } = useGameCtx()
  const {
    user,
    defineUser
  } = useUserCtx()

  const botPlayer = PlayerType.Yellow;

  const singlePlayer = true;
  const moveCount = useMemo(() => board.moveCount, [board.moveCount]);
  const currentPlayer = useMemo(() => board.currentPlayer, [board.currentPlayer]);
  const isRedWin = useMemo(() => board.winner?.type === PlayerType.Red, [board.winner?.type])
  const delta = useMemo(() => isRedWin ? user.points.previousRank.receivePoints : user.points.previousRank.deductionPoints, [isRedWin, user.points.previousRank.deductionPoints, user.points.previousRank.receivePoints])

  const movesUntilDrop = useMemo(() => board.movesUntilDrop, [board.movesUntilDrop]);

  useEffect(() => {    
    if (singlePlayer && currentPlayer.type === botPlayer) {
      const botMove = getBestMove(board.cells, BOARD.MAX_DEPTH, PlayerType.Yellow);
      setTimeout(() => dropPiece(botMove, true), 500);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moveCount]);

  useEffect(() => {
    if (!game.started) {
      const newBoard = BoardFactory.create().getValue();
      newBoard.lock()

      setBoard(newBoard);
    } else {
      const newBoard = board.clone();
      newBoard.unlock();

      setBoard(newBoard);
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.started]);

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

  const dropPiece = async (colIndex: number, isBotPlayer?: boolean) => {
    if ((singlePlayer && currentPlayer.type === botPlayer && !isBotPlayer) || board.locked) {
      return;
    }

    const newBoard: Board = board.clone();

    for (let row = BOARD.ROWS - 1; row >= 0; row--) {
      if (newBoard.cells[row][colIndex] === 0) {
        newBoard.cells[row][colIndex] = currentPlayer.type;

        const isWin: boolean = checkWin(newBoard.cells, row, colIndex, currentPlayer.type);
        const isBoardFull = GameBoardUtils.isBoardFull(newBoard.cells);

        const updatedMoveCount = moveCount + 1;

        const isDropCondition = updatedMoveCount % BOARD.DROP_CONDITION === 0;
        if (!isWin && isDropCondition || (isBoardFull && !isDropCondition)) {
          newBoard.dropLine();
          await SoundManager.play(dropLine);
        }

        if (!isWin) {
          newBoard.dropPiece();
        } else {
          newBoard.lock();
        }

        await SoundManager.play(drop);

        if (isWin) {
          await SoundManager.play(katin);
          
          newBoard.declareWinner();
          setBoard(newBoard);

          const isRedWin = newBoard.winner?.type === PlayerType.Red;
          const result = await userService.registerVictory(user.id, isRedWin)
          if (result.isSuccess()) {
            defineUser(result.getValue()!)
          }
          
          return setTimeout(() => {
            setShowWinnerModal(true);
          }, 1000);
        }

        return setBoard(newBoard);
      }
    }
  };

  async function handleClickPlayAgain(): Promise<void> {
    const newBoard: Board = board.clone();
    newBoard.playAgain();
    
    setBoard(newBoard);

    await SoundManager.play(play);

    setShowWinnerModal(false);
  }

  function handleClickCloseWinnerModal(): void {
    setShowWinnerModal(false);
    finishGame()
  }

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

  function handleClickPlay(): void {
    startGame(
      <GameBoardFooter onClickShowRules={() => handleChangeShowRules(true)} />
    )

    SoundManager.play(play);

    setBoard(BoardFactory.create().getValue())
  }

  return {
    movesUntilDrop,
    board,
    dropPiece,
    handleChangeShowRules,
    showRules,
    handleClickPlay,
    showWinnerModal,
    handleClickPlayAgain,
    handleClickCloseWinnerModal,
    totalMoves: moveCount,
    isRedWin,
    delta
  }
}