import React, { useState } from 'react';
import './App.css';

function Matrix() {
  const initialBoxes = Array(3).fill(null).map((_, row) =>
    Array(3).fill(null).map((_, col) => ({
      id: `${row}-${col}`,
      number: row * 3 + col + 1,
      color: 'white',
      row,
      col,
    }))
  );

  const [boxes, setBoxes] = useState(initialBoxes);
  const [clickSequence, setClickSequence] = useState([]);

  const handleBoxClick = (row, col) => {
    const newBoxes = boxes.map(row => row.map(box => ({ ...box })));
    
    if (row === 2 && col === 2) {
      clickSequence.forEach(({ row, col }, index) => {
        setTimeout(() => {
          setBoxes(prevBoxes => {
            const updatedBoxes = prevBoxes.map(row => row.map(box => ({ ...box })));
            updatedBoxes[row][col].color = 'orange';
            return updatedBoxes;
          });
        }, index * 500); 
      });
    } else {
      newBoxes[row][col].color = 'green';
      setClickSequence([...clickSequence, { row, col }]);
    }
    
    setBoxes(newBoxes);
  };

  return (
    <div className="matrix">
      {boxes.flat().map(box => (
        <div
          key={box.id}
          className="box"
          style={{ backgroundColor: box.color }}
          onClick={() => handleBoxClick(box.row, box.col)}
        >
          {box.number}
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h1>Matrix Click Color Change</h1>
      <Matrix />
    </div>
  );
}

export default App;
