
import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import './WumpusGameBoard.css'; // Import your CSS file
import { FaBolt, FaSkull, FaCoins,FaUser } from 'react-icons/fa';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const WumpusGameBoard =()=> {
  const navigate = useNavigate();
  const location = useLocation()
  // const { numPitsInitialValue, numGoldsInitialValue, numWumpusInitialValue } = useParams();
  // const initialBoard = useParams()
  const initialBoard = location.state?.Board
  console.log("init board:", initialBoard)

//   const initialBoard2 = Array.from({ length: 10 }, () =>
//   Array.from({ length: 10 }, () => 'empty')
// );

  const [board, setBoard] = useState(initialBoard);
  const [agentPosition, setAgentPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [visitedCells, setVisitedCells] = useState([]); // Track visited cells

  const setCellValue = (rowIndex, colIndex, value) => {
    // Create a copy of the current board
    const newBoard = [...board];
  
    // Update the value at the specified row and column
    newBoard[rowIndex][colIndex] = value;
  
    // Set the new board state
    setBoard(newBoard);
  };

  const getCellColor = (board, colIndex, rowIndex) => {
    const cellType = board[rowIndex][colIndex]; // Get the type of the cell
  
    // Define color mappings based on cell type
    const colorMap = {
      stench: 'green', // Change this to your desired color for stench cells
      gold: 'golden', // Change this to your desired color for gold cells
      breeze: 'skyblue', // Change this to your desired color for breeze cells
      GB: 'Turquoise', // for breeze+gold
      BS:'violet',// for stench+gold
      GS:'olive',
      GBS:'pink',
    };
  
    // Use the color mapping or a default color for unknown cell types
    return colorMap[cellType] || 'agent-cell'; // Default to yellow if the cell type is unknown
  };
  const handleMoveClick = () => {
    if (isMoving) {
      // Agent is already moving, don't allow additional clicks
      return;
    }

    const newX = agentPosition.x + 1;
    if (newX < 10) {
      setIsMoving(true); 
      setVisitedCells([...visitedCells, agentPosition]);

  setTimeout(() => {
    setAgentPosition({ x: newX, y: agentPosition.y });
    setIsMoving(false); // Set isMoving back to false after the agent's movement
  }, 10); // Adjust the duration as needed
}
};

  const handleRestartClick = () => {
    setBoard(initialBoard);
    setVisitedCells([]);
    setAgentPosition({ x: 0, y: 0 });
    navigate('/');
  };

  return (
    <>
    <h2>Wumpus Game</h2>

<div>
        <div style={{ float: 'left' }}>
          <Table className="table-bordered">
            <tbody>
              {board.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td
                      key={colIndex}
                      className={
                        rowIndex === agentPosition.y && colIndex === agentPosition.x
                          ? getCellColor(board, colIndex, rowIndex)
                          : visitedCells.some(
                              (visitedCell) =>
                                visitedCell.x === colIndex && visitedCell.y === rowIndex
                            )
                          ? getCellColor(board, colIndex, rowIndex)
                          : cell
                      }
                    >

                    {rowIndex === agentPosition.y && colIndex === agentPosition.x && !isMoving && (
                        <FaUser className="agent-icon" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

    <div className="info-container">
    <div className="info-item">
        <FaCoins className="gold-icon" />
        <span className="gold-text">Gold</span>
      </div>

      <div className="info-item">
        <FaSkull className="both-icon" />
        <span className="both-text">breeze + stench</span>
      </div>

      <div className="info-item">
        <FaBolt className="stench-icon" />
        <span className="stench-text">Stench</span>
      </div>

      <div className="info-item">
        <div className="breeze-icon" />
        <span className="breeze-text">Breeze</span>
      </div>


    </div>
    <div className="button-container">
            <Button className = 'move-btn' variant="primary" onClick={handleMoveClick}>
              Move
            </Button>
            <Button className = 'move-btn' variant="primary" onClick={() => setCellValue(0, 3, 'stench')}>
                Set Cell Value
              </Button>
            <Button className = 'restart-btn' variant="danger" onClick={handleRestartClick}>
              Restart Game
            </Button>
          </div>
    </div>

    </>
  );
}

export default WumpusGameBoard;
