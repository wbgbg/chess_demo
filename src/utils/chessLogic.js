// Chess piece types and colors
export const PIECES = {
  KING: 'king',
  QUEEN: 'queen',
  ROOK: 'rook',
  BISHOP: 'bishop',
  KNIGHT: 'knight',
  PAWN: 'pawn'
};

export const COLORS = {
  WHITE: 'white',
  BLACK: 'black'
};

// Initial board setup
export const createInitialBoard = () => {
  const board = Array(8).fill(null).map(() => Array(8).fill(null));
  
  // Place black pieces
  board[0] = [
    { type: PIECES.ROOK, color: COLORS.BLACK },
    { type: PIECES.KNIGHT, color: COLORS.BLACK },
    { type: PIECES.BISHOP, color: COLORS.BLACK },
    { type: PIECES.QUEEN, color: COLORS.BLACK },
    { type: PIECES.KING, color: COLORS.BLACK },
    { type: PIECES.BISHOP, color: COLORS.BLACK },
    { type: PIECES.KNIGHT, color: COLORS.BLACK },
    { type: PIECES.ROOK, color: COLORS.BLACK }
  ];
  
  board[1] = Array(8).fill({ type: PIECES.PAWN, color: COLORS.BLACK });
  
  // Place white pieces
  board[6] = Array(8).fill({ type: PIECES.PAWN, color: COLORS.WHITE });
  
  board[7] = [
    { type: PIECES.ROOK, color: COLORS.WHITE },
    { type: PIECES.KNIGHT, color: COLORS.WHITE },
    { type: PIECES.BISHOP, color: COLORS.WHITE },
    { type: PIECES.QUEEN, color: COLORS.WHITE },
    { type: PIECES.KING, color: COLORS.WHITE },
    { type: PIECES.BISHOP, color: COLORS.WHITE },
    { type: PIECES.KNIGHT, color: COLORS.WHITE },
    { type: PIECES.ROOK, color: COLORS.WHITE }
  ];
  
  return board;
};

// Check if a move is within board bounds
export const isValidPosition = (row, col) => {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
};

// Get possible moves for a piece
export const getPossibleMoves = (board, fromRow, fromCol) => {
  const piece = board[fromRow][fromCol];
  if (!piece) return [];
  
  const moves = [];
  
  switch (piece.type) {
    case PIECES.PAWN:
      moves.push(...getPawnMoves(board, fromRow, fromCol, piece.color));
      break;
    case PIECES.ROOK:
      moves.push(...getRookMoves(board, fromRow, fromCol, piece.color));
      break;
    case PIECES.BISHOP:
      moves.push(...getBishopMoves(board, fromRow, fromCol, piece.color));
      break;
    case PIECES.QUEEN:
      moves.push(...getQueenMoves(board, fromRow, fromCol, piece.color));
      break;
    case PIECES.KING:
      moves.push(...getKingMoves(board, fromRow, fromCol, piece.color));
      break;
    case PIECES.KNIGHT:
      moves.push(...getKnightMoves(board, fromRow, fromCol, piece.color));
      break;
    default:
      break;
  }
  
  return moves;
};

const getPawnMoves = (board, row, col, color) => {
  const moves = [];
  const direction = color === COLORS.WHITE ? -1 : 1;
  const startRow = color === COLORS.WHITE ? 6 : 1;
  
  // Move forward one square
  if (isValidPosition(row + direction, col) && !board[row + direction][col]) {
    moves.push([row + direction, col]);
    
    // Move forward two squares from starting position
    if (row === startRow && !board[row + 2 * direction][col]) {
      moves.push([row + 2 * direction, col]);
    }
  }
  
  // Capture diagonally
  [-1, 1].forEach(offset => {
    const newRow = row + direction;
    const newCol = col + offset;
    if (isValidPosition(newRow, newCol) && board[newRow][newCol] && 
        board[newRow][newCol].color !== color) {
      moves.push([newRow, newCol]);
    }
  });
  
  return moves;
};

const getRookMoves = (board, row, col, color) => {
  const moves = [];
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  
  directions.forEach(([dRow, dCol]) => {
    for (let i = 1; i < 8; i++) {
      const newRow = row + i * dRow;
      const newCol = col + i * dCol;
      
      if (!isValidPosition(newRow, newCol)) break;
      
      if (!board[newRow][newCol]) {
        moves.push([newRow, newCol]);
      } else {
        if (board[newRow][newCol].color !== color) {
          moves.push([newRow, newCol]);
        }
        break;
      }
    }
  });
  
  return moves;
};

const getBishopMoves = (board, row, col, color) => {
  const moves = [];
  const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
  
  directions.forEach(([dRow, dCol]) => {
    for (let i = 1; i < 8; i++) {
      const newRow = row + i * dRow;
      const newCol = col + i * dCol;
      
      if (!isValidPosition(newRow, newCol)) break;
      
      if (!board[newRow][newCol]) {
        moves.push([newRow, newCol]);
      } else {
        if (board[newRow][newCol].color !== color) {
          moves.push([newRow, newCol]);
        }
        break;
      }
    }
  });
  
  return moves;
};

const getQueenMoves = (board, row, col, color) => {
  return [
    ...getRookMoves(board, row, col, color),
    ...getBishopMoves(board, row, col, color)
  ];
};

const getKingMoves = (board, row, col, color) => {
  const moves = [];
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];
  
  directions.forEach(([dRow, dCol]) => {
    const newRow = row + dRow;
    const newCol = col + dCol;
    
    if (isValidPosition(newRow, newCol) && 
        (!board[newRow][newCol] || board[newRow][newCol].color !== color)) {
      moves.push([newRow, newCol]);
    }
  });
  
  return moves;
};

const getKnightMoves = (board, row, col, color) => {
  const moves = [];
  const knightMoves = [
    [-2, -1], [-2, 1], [-1, -2], [-1, 2],
    [1, -2], [1, 2], [2, -1], [2, 1]
  ];
  
  knightMoves.forEach(([dRow, dCol]) => {
    const newRow = row + dRow;
    const newCol = col + dCol;
    
    if (isValidPosition(newRow, newCol) && 
        (!board[newRow][newCol] || board[newRow][newCol].color !== color)) {
      moves.push([newRow, newCol]);
    }
  });
  
  return moves;
};

// Check if the king is in check
export const isKingInCheck = (board, color) => {
  // Find the king
  let kingRow, kingCol;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.type === PIECES.KING && piece.color === color) {
        kingRow = row;
        kingCol = col;
        break;
      }
    }
  }
  
  // Check if any opponent piece can attack the king
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.color !== color) {
        const moves = getPossibleMoves(board, row, col);
        if (moves.some(([r, c]) => r === kingRow && c === kingCol)) {
          return true;
        }
      }
    }
  }
  
  return false;
};

// Check if a move is legal (doesn't put own king in check)
export const isLegalMove = (board, fromRow, fromCol, toRow, toCol) => {
  const piece = board[fromRow][fromCol];
  if (!piece) return false;
  
  // Create a copy of the board with the move made
  const newBoard = board.map(row => [...row]);
  newBoard[toRow][toCol] = piece;
  newBoard[fromRow][fromCol] = null;
  
  // Check if this move puts own king in check
  return !isKingInCheck(newBoard, piece.color);
};