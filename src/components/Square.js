import React from 'react';
import Piece from './Piece';
import './Square.css';

const Square = ({ 
  piece, 
  isDark, 
  isSelected, 
  isHighlighted, 
  isPossibleMove, 
  isLastMove,
  onClick 
}) => {
  const getSquareClasses = () => {
    let classes = ['square'];
    
    if (isDark) {
      classes.push('square-dark');
    } else {
      classes.push('square-light');
    }
    
    if (isSelected) {
      classes.push('square-selected');
    }
    
    if (isHighlighted) {
      classes.push('square-highlighted');
    }
    
    if (isPossibleMove) {
      classes.push('square-possible-move');
    }
    
    if (isLastMove) {
      classes.push('square-last-move');
    }
    
    return classes.join(' ');
  };
  
  return (
    <div className={getSquareClasses()} onClick={onClick}>
      <Piece piece={piece} />
      {isPossibleMove && !piece && <div className="move-indicator" />}
      {isPossibleMove && piece && <div className="capture-indicator" />}
    </div>
  );
};

export default Square;