import React, { useState, useCallback } from 'react';
import Board from './components/Board';
import GameInfo from './components/GameInfo';
import { 
  createInitialBoard, 
  getPossibleMoves, 
  isLegalMove, 
  isKingInCheck,
  COLORS 
} from './utils/chessLogic';
import './App.css';

function App() {
  const [board, setBoard] = useState(createInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState(COLORS.WHITE);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [moveHistory, setMoveHistory] = useState([]);
  const [lastMove, setLastMove] = useState(null);
  const [gameState, setGameState] = useState({
    isCheck: false,
    isCheckmate: false,
    isStalemate: false
  });

  // Check for checkmate or stalemate
  const checkGameState = useCallback((boardState, player) => {
    const isCheck = isKingInCheck(boardState, player);
    let hasLegalMoves = false;

    // Check if player has any legal moves
    outerLoop: for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = boardState[row][col];
        if (piece && piece.color === player) {
          const moves = getPossibleMoves(boardState, row, col);
          for (const [toRow, toCol] of moves) {
            if (isLegalMove(boardState, row, col, toRow, toCol)) {
              hasLegalMoves = true;
              break outerLoop;
            }
          }
        }
      }
    }

    return {
      isCheck,
      isCheckmate: isCheck && !hasLegalMoves,
      isStalemate: !isCheck && !hasLegalMoves
    };
  }, []);

  const handleSquareClick = useCallback((row, col) => {
    const piece = board[row][col];

    // If no square is selected
    if (!selectedSquare) {
      if (piece && piece.color === currentPlayer) {
        setSelectedSquare([row, col]);
        const moves = getPossibleMoves(board, row, col);
        // Filter out illegal moves (that would put own king in check)
        const legalMoves = moves.filter(([toRow, toCol]) => 
          isLegalMove(board, row, col, toRow, toCol)
        );
        setPossibleMoves(legalMoves);
      }
      return;
    }

    const [fromRow, fromCol] = selectedSquare;
    const selectedPiece = board[fromRow][fromCol];

    // If clicking on the same square, deselect
    if (fromRow === row && fromCol === col) {
      setSelectedSquare(null);
      setPossibleMoves([]);
      return;
    }

    // If clicking on another piece of the same color, select it instead
    if (piece && piece.color === currentPlayer) {
      setSelectedSquare([row, col]);
      const moves = getPossibleMoves(board, row, col);
      const legalMoves = moves.filter(([toRow, toCol]) => 
        isLegalMove(board, row, col, toRow, toCol)
      );
      setPossibleMoves(legalMoves);
      return;
    }

    // Check if the move is possible and legal
    const isPossible = possibleMoves.some(([r, c]) => r === row && c === col);
    if (isPossible && isLegalMove(board, fromRow, fromCol, row, col)) {
      // Make the move
      const newBoard = board.map(r => [...r]);
      const capturedPiece = newBoard[row][col];
      
      newBoard[row][col] = selectedPiece;
      newBoard[fromRow][fromCol] = null;

      // Record the move
      const move = {
        piece: selectedPiece,
        from: [fromRow, fromCol],
        to: [row, col],
        captured: capturedPiece
      };

      setBoard(newBoard);
      setMoveHistory(prev => [...prev, move]);
      setLastMove(move);
      setSelectedSquare(null);
      setPossibleMoves([]);

      // Switch players
      const nextPlayer = currentPlayer === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
      setCurrentPlayer(nextPlayer);

      // Check game state for the next player
      const newGameState = checkGameState(newBoard, nextPlayer);
      setGameState(newGameState);
    } else {
      // Invalid move, deselect
      setSelectedSquare(null);
      setPossibleMoves([]);
    }
  }, [board, selectedSquare, possibleMoves, currentPlayer, checkGameState]);

  const handleNewGame = useCallback(() => {
    setBoard(createInitialBoard());
    setCurrentPlayer(COLORS.WHITE);
    setSelectedSquare(null);
    setPossibleMoves([]);
    setMoveHistory([]);
    setLastMove(null);
    setGameState({
      isCheck: false,
      isCheckmate: false,
      isStalemate: false
    });
  }, []);

  const handleUndoMove = useCallback(() => {
    if (moveHistory.length === 0) return;

    const lastMove = moveHistory[moveHistory.length - 1];
    const newBoard = board.map(r => [...r]);
    
    // Restore the piece to its original position
    newBoard[lastMove.from[0]][lastMove.from[1]] = lastMove.piece;
    
    // Restore captured piece or clear the destination square
    newBoard[lastMove.to[0]][lastMove.to[1]] = lastMove.captured;

    setBoard(newBoard);
    setMoveHistory(prev => prev.slice(0, -1));
    setLastMove(moveHistory.length > 1 ? moveHistory[moveHistory.length - 2] : null);
    setSelectedSquare(null);
    setPossibleMoves([]);

    // Switch back to previous player
    const previousPlayer = currentPlayer === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
    setCurrentPlayer(previousPlayer);

    // Update game state
    const newGameState = checkGameState(newBoard, previousPlayer);
    setGameState(newGameState);
  }, [board, moveHistory, currentPlayer, checkGameState]);

  return (
    <div className="App">
      <div className="game-container">
        <div className="board-section">
          <Board
            boardData={board}
            selectedSquare={selectedSquare}
            possibleMoves={possibleMoves}
            lastMove={lastMove}
            onSquareClick={handleSquareClick}
          />
        </div>
        
        <div className="info-section">
          <GameInfo
            currentPlayer={currentPlayer}
            isCheck={gameState.isCheck}
            isCheckmate={gameState.isCheckmate}
            isStalemate={gameState.isStalemate}
            moveHistory={moveHistory}
            onNewGame={handleNewGame}
            onUndoMove={handleUndoMove}
          />
        </div>
      </div>
    </div>
  );
}

export default App;