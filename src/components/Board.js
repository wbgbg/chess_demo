import React from 'react';
import Square from './Square';
import './Board.css';

const Board = ({ 
  boardData, 
  selectedSquare, 
  possibleMoves, 
  lastMove,
  onSquareClick 
}) => {
  const isSquareSelected = (row, col) => {
    return selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col;
  };
  
  const isPossibleMove = (row, col) => {
    return possibleMoves.some(([r, c]) => r === row && c === col);
  };
  
  const isLastMove = (row, col) => {
    if (!lastMove) return false;
    return (lastMove.from[0] === row && lastMove.from[1] === col) ||
           (lastMove.to[0] === row && lastMove.to[1] === col);
  };
  
  return (
    <div className="board-container">
      <div className="board">
        {boardData.map((row, rowIndex) => (
          row.map((piece, colIndex) => (
            <Square
              key={`${rowIndex}-${colIndex}`}
              piece={piece}
              isDark={(rowIndex + colIndex) % 2 === 1}
              isSelected={isSquareSelected(rowIndex, colIndex)}
              isPossibleMove={isPossibleMove(rowIndex, colIndex)}
              isLastMove={isLastMove(rowIndex, colIndex)}
              onClick={() => onSquareClick(rowIndex, colIndex)}
            />
          ))
        ))}
      </div>
      
      {/* Board coordinates */}
      <div className="coordinates">
        <div className="files">
          {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(file => (
            <div key={file} className="file-label">{file}</div>
          ))}
        </div>
        <div className="ranks">
          {[8, 7, 6, 5, 4, 3, 2, 1].map(rank => (
            <div key={rank} className="rank-label">{rank}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;