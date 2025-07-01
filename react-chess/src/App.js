import './App.css';
import Board from './components/Board'; // Import the Board component

function App() {
  // Initial board setup: 8x8 array with null for empty squares
  const initialBoard = Array(8).fill(null).map(() => Array(8).fill(null));

  return (
    <div className="App">
      <h1>React Chess</h1>
      <Board boardData={initialBoard} />
    </div>
  );
}

export default App;
