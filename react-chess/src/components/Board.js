import React from 'react';
import Square from './Square';
import './Board.css'; // We'll create this for styling

const Board = ({ boardData }) => {
  return (
    <div className="board">
      {boardData.map((row, rowIndex) => (
        <div className="board-row" key={rowIndex}>
          {row.map((square, colIndex) => (
            <Square
              key={`${rowIndex}-${colIndex}`}
              value={square} // Will be null for now, or piece data later
              isDark={(rowIndex + colIndex) % 2 === 1} // For alternating colors
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
