import React from 'react';
import './Square.css'; // We'll create this for styling

const Square = ({ value, isDark }) => {
  const squareColor = isDark ? 'square-dark' : 'square-light';
  // Later, 'value' will determine if a piece is rendered here
  return (
    <div className={`square ${squareColor}`}>
      {/* Display piece if value is not null */}
      {value}
    </div>
  );
};

export default Square;
