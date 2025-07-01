import React from 'react';
import { PIECES, COLORS } from '../utils/chessLogic';

const Piece = ({ piece }) => {
  if (!piece) return null;
  
  const getPieceSymbol = (type, color) => {
    const symbols = {
      [PIECES.KING]: color === COLORS.WHITE ? '♔' : '♚',
      [PIECES.QUEEN]: color === COLORS.WHITE ? '♕' : '♛',
      [PIECES.ROOK]: color === COLORS.WHITE ? '♖' : '♜',
      [PIECES.BISHOP]: color === COLORS.WHITE ? '♗' : '♝',
      [PIECES.KNIGHT]: color === COLORS.WHITE ? '♘' : '♞',
      [PIECES.PAWN]: color === COLORS.WHITE ? '♙' : '♟'
    };
    
    return symbols[type] || '';
  };
  
  return (
    <span className={`piece piece-${piece.color}`}>
      {getPieceSymbol(piece.type, piece.color)}
    </span>
  );
};

export default Piece;