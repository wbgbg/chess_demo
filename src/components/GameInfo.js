import React from 'react';
import { COLORS } from '../utils/chessLogic';
import './GameInfo.css';

const GameInfo = ({ 
  currentPlayer, 
  isCheck, 
  isCheckmate, 
  isStalemate, 
  moveHistory,
  onNewGame,
  onUndoMove 
}) => {
  const getGameStatus = () => {
    if (isCheckmate) {
      const winner = currentPlayer === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;
      return `Checkmate! ${winner.charAt(0).toUpperCase() + winner.slice(1)} wins!`;
    }
    
    if (isStalemate) {
      return "Stalemate! It's a draw.";
    }
    
    if (isCheck) {
      return `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} is in check!`;
    }
    
    return `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s turn`;
  };
  
  const formatMove = (move, index) => {
    const { piece, from, to, captured } = move;
    const fromSquare = String.fromCharCode(97 + from[1]) + (8 - from[0]);
    const toSquare = String.fromCharCode(97 + to[1]) + (8 - to[0]);
    
    let notation = '';
    
    // Piece notation (except for pawns)
    if (piece.type !== 'pawn') {
      notation += piece.type.charAt(0).toUpperCase();
    }
    
    // Capture notation
    if (captured) {
      if (piece.type === 'pawn') {
        notation += fromSquare.charAt(0);
      }
      notation += 'x';
    }
    
    notation += toSquare;
    
    return `${Math.floor(index / 2) + 1}${index % 2 === 0 ? '.' : '...'} ${notation}`;
  };
  
  return (
    <div className="game-info">
      <div className="status-section">
        <h2 className="game-title">React Chess</h2>
        <div className={`game-status ${isCheck ? 'check' : ''} ${isCheckmate ? 'checkmate' : ''}`}>
          {getGameStatus()}
        </div>
        
        <div className="current-player">
          <div className={`player-indicator ${currentPlayer}`}>
            <span className="player-symbol">
              {currentPlayer === COLORS.WHITE ? '♔' : '♚'}
            </span>
            <span className="player-name">
              {currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="controls">
        <button className="btn btn-primary" onClick={onNewGame}>
          New Game
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={onUndoMove}
          disabled={moveHistory.length === 0}
        >
          Undo Move
        </button>
      </div>
      
      <div className="move-history">
        <h3>Move History</h3>
        <div className="moves-list">
          {moveHistory.length === 0 ? (
            <p className="no-moves">No moves yet</p>
          ) : (
            moveHistory.map((move, index) => (
              <div key={index} className="move-item">
                {formatMove(move, index)}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GameInfo;