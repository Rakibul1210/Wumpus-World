
import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import './WumpusGameBoard.css'; // Import your CSS file
import { FaBolt, FaSkull, FaCoins, FaUser } from 'react-icons/fa';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

const WumpusGameBoard = () => {
  const navigate = useNavigate();
  const location = useLocation()
  // const { numPitsInitialValue, numGoldsInitialValue, numWumpusInitialValue } = useParams();
  // const initialBoard = useParams()
  const initialBoard = location.state?.Board
  const numGolds = location.state?.numGolds
  console.log("init board:", initialBoard)

  //   const initialBoard2 = Array.from({ length: 10 }, () =>
  //   Array.from({ length: 10 }, () => 'empty')
  // );

  const [board, setBoard] = useState(initialBoard);
  const [agentPosition, setAgentPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [visitedCells, setVisitedCells] = useState([]); // Track visited cells
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [moveScore, setMoveScore] = useState(0)
  const [arrow, setArrow] = useState(1)
  const [win, setWin] = useState(false)

  const [gold, setGold] = useState(numGolds)
  const [move, setMove] = useState('')

  // setVisitedCells([...visitedCells, {x:0,y:0}]);

  useEffect(() => {

    setVisitedCells([...visitedCells, { x: 0, y: 0 }]);
  }, []);


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
      S: 'green', // Change this to your desired color for stench cells
      G: 'golden', // Change this to your desired color for gold cells
      B: 'skyblue', // Change this to your desired color for breeze cells
      GB: 'Turquoise', // for breeze+gold
      BS: 'violet',// for stench+gold
      GS: 'olive',
      GBS: 'pink',
    };

    // Use the color mapping or a default color for unknown cell types
    return colorMap[cellType] || 'agent-cell'; // Default to yellow if the cell type is unknown
  };

  const updateUI = (X, Y) => {
    setTimeout(() => {
      setAgentPosition({ x: X, y: Y });

      setIsMoving(false); // Set isMoving back to false after the agent's movement
    }, 50); // Adjust the duration as needed
  }

  const isValidCoordinate = (x, y) => {
    return x >= 0 && x < 10 && y >= 0 && y < 10;
  }
  const handleMoveClick = () => {
    //     if (isMoving) {
    //       // Agent is already moving, don't allow additional clicks
    //       return;
    //     }

    //     const newX = agentPosition.x + 1;
    //     if (newX < 10) {
    //       setIsMoving(true); 
    //       setVisitedCells([...visitedCells, agentPosition]);

    //   setTimeout(() => {
    //     setAgentPosition({ x: newX, y: agentPosition.y });
    //     setIsMoving(false); // Set isMoving back to false after the agent's movement
    //   }, 10); // Adjust the duration as needed
    // }

    axios.post("http://localhost:5000/findBestMove", {

    }).then((response) => {
      if (response) {

        //     if (isMoving) {
        //       // Agent is already moving, don't allow additional clicks
        //       return;
        //     }

        // const newX = agentPosition.x + 1;newY
        const moves = response.data.move
        setMove(moves)
        console.log("move: ", moves)
        // console.log("x:", moves[0], "\ty=", moves[1])


        // let newX = moves[0];
        // let newY = moves[1];

        // setIsMoving(true);
        // agentPosition.x = newX;
        // agentPosition.y = newY;
        // setVisitedCells([...visitedCells, agentPosition]);
        // // console.log("x: " + newX + " y: " + newY);
        // console.log("agent position: " + agentPosition.x + " " + agentPosition.y)

        // setTimeout(() => {
        //   setAgentPosition({ x: agentPosition.x, y: agentPosition.y });

        //   setIsMoving(false); // Set isMoving back to false after the agent's movement
        // }, 100); // Adjust the duration as needed

        /*------GAME OVER LOGIC------*/
        // console.log("current box: ", board[newX][newY])
        // if (board[newX][newY] === "W") {
        //   setGameOver(true)
        //   console.log("You were eaten by wumpus");
        // }
        // else if (board[newX][newY] === "P") {
        //   setGameOver(true)
        //   console.log("You fell into a pit");
        // }

        // else if (board[newX][newY] === "G" || board[newX][newY] === "GS" || board[newX][newY] === "GB" || board[newX][newY] === "GBS") {
        //   setScore(score+10)
        //   setGold(gold-1)
        //   // setGameOver(true)
        //   // console.log("You fell into a pit");
        // }


        let newX = agentPosition.x;
        let newY = agentPosition.y;

        for (const move of moves) {

          if (move === "R") {
            newY = newY + 1;
          }
          else if (move === "L") {
            newY = newY - 1;
          }
          else if (move === "U") {
            newX = newX - 1;
          }
          else if (move === "D") {
            newX = newX + 1;
          }

          /*-------KILL WUMpuS---------*/
          if (move === "A") {

            setScore(score - 10)
            setArrow(0)

            if (moves[moves.length - 1] === "R") {
              newY = newY + 1;
            }
            else if (moves[moves.length - 1] === "L") {
              newY = newY - 1;
            }
            else if (moves[moves.length - 1] === "U") {
              newX = newX - 1;
            }
            else if (moves[moves.length - 1] === "D") {
              newX = newX + 1;
            }


            if (board[newX][newY].includes('W')) {
              console.log("Wumpus killed successfully")

              // removing wumpus from the shooted cell
              if (board[newX][newY] == "W") {
                board[newX][newY] = '';
              }
              else if (board[newX][newY] == "WS") {
                board[newX][newY] = 'S';
              }
              else if (board[newX][newY] == 'WB') {
                board[newX][newY] = 'B';
              }
              else if (board[newX][newY] == 'WBS') {
                board[newX][newY] = 'BS';
              }

              // removing stench from the adjacent cells
              if (isValidCoordinate(newX - 1, newY)) {
                if (board[newX - 1][newY] == 'S') {
                  board[newX - 1][newY] = '';
                }
                else if (board[newX - 1][newY] == 'BS') {
                  board[newX - 1][newY] = 'B';
                }
                else if (board[newX - 1][newY] == 'GS') {
                  board[newX - 1][newY] = 'G';
                }
                else if (board[newX - 1][newY] == 'GBS') {
                  board[newX - 1][newY] = 'GB';
                }
              }
              if (isValidCoordinate(newX + 1, newY)) {
                if (board[newX + 1][newY] == 'S') {
                  board[newX + 1][newY] = '';
                }
                else if (board[newX + 1][newY] == 'BS') {
                  board[newX + 1][newY] = 'B';
                }
                else if (board[newX + 1][newY] == 'GS') {
                  board[newX + 1][newY] = 'G';
                }
                else if (board[newX + 1][newY] == 'GBS') {
                  board[newX + 1][newY] = 'GB';
                }

              }
              if (isValidCoordinate(newX, newY - 1)) {
                if (board[newX][newY - 1] == 'S') {
                  board[newX][newY - 1] = ''
                }
                else if (board[newX][newY - 1] == 'BS') {
                  board[newX][newY - 1] = 'B'
                }
                else if (board[newX][newY - 1] == 'GS') {
                  board[newX][newY - 1] = 'G';
                }
                else if (board[newX][newY - 1] == 'GBS') {
                  board[newX][newY - 1] = 'GB';
                }
              }
              if (isValidCoordinate(newX, newY + 1)) {
                if (board[newX][newY + 1] == 'S') {
                  board[newX][newY + 1] = ''
                }
                else if (board[newX][newY + 1] == 'BS') {
                  board[newX][newY + 1] = 'B'
                }
                else if (board[newX][newY + 1] == 'GS') {
                  board[newX][newY + 1] = 'G';
                }
                else if (board[newX][newY + 1] == 'GBS') {
                  board[newX][newY + 1] = 'GB';
                }
              }


            }
            setAgentPosition(newX, newY)
            break;
          }


          //just checking....

          /*------GAME OVER LOGIC------*/
          console.log("current box: ", board[newX][newY])
          if (board[newX][newY] === "W") {
            setGameOver(true)
            setScore(score - 1000)

            console.log("You were killed by wumpus");
          }
          else if (board[newX][newY] === "P") {
            setGameOver(true)
            setScore(score - 1000)

            console.log("You fell into a pit");
          }

          else if (board[newX][newY] === "G" || board[newX][newY] === "GS" || board[newX][newY] === "GB" || board[newX][newY] === "GBS") {
            console.log("******score: " + score);
            setScore(score + 1000);
            console.log("******score: " + score);
            setGold(gold - 1);
            if (gold === 0) {
              setWin(true)
            }



            // setGameOver(true)
            // console.log("You fell into a pit");
          }







          if (newX < 10 && newY < 10) {
            console.log("moving agent position");

            setIsMoving(true);
            agentPosition.x = newX;
            agentPosition.y = newY;
            setVisitedCells([...visitedCells, agentPosition]);
            // console.log("x: " + newX + " y: " + newY);
            console.log("agent position: " + newX + " " + newY)
            // setScore(score - 1)
            setMoveScore(moveScore - 1)

            updateUI(agentPosition.x, agentPosition.y);
            // setTimeout(() => {
            //   setAgentPosition({ x: agentPosition.x, y: agentPosition.y });

            //   setIsMoving(false); // Set isMoving back to false after the agent's movement
            // }, 100); // Adjust the duration as needed
          }
          // console.log("making move : " ,move); // This will print each character in the string
        }



      }
    })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  const handleRestartClick = () => {
    setBoard(initialBoard);
    setVisitedCells([]);
    setAgentPosition({ x: 0, y: 0 });
    navigate('/');
  };
  const closeModal = () => {
    setGameOver(false);
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
                        rowIndex === agentPosition.x && colIndex === agentPosition.y
                          ? getCellColor(board, colIndex, rowIndex)
                          : visitedCells.some(
                            (visitedCell) =>
                              visitedCell.y === colIndex && visitedCell.x === rowIndex
                          )
                            ? getCellColor(board, colIndex, rowIndex)
                            : cell
                      }
                    >

                      {rowIndex === agentPosition.x && colIndex === agentPosition.y && !isMoving && (
                        <FaUser className="agent-icon" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
          {move && (
            <div>agent move : {move}
            </div>
          )}
        </div>

        <div className='container'>
          <div className="info-container">
            <div className="info-item">
              <FaCoins className="gold-icon" />
              <span className="gold-text">Gold</span>
            </div>

            <div className="info-item">
              <FaCoins className="GS-icon" />
              <span className="GS-text">Gold+Stench</span>
            </div>

            <div className="info-item">
              <FaCoins className="GB-icon" />
              <span className="GB-text">Gold+Breeze</span>
            </div>

            <div className="info-item">
              <FaCoins className="GBS-icon" />
              <span className="GBS-text">Gold+Breeze+Stench</span>
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

          {/* menu */}
          <div className='menu_container'>
            <div className="">
              {/* <div className="breeze-icon" /> */}
              <span>Score {score + moveScore}</span>
            </div>

            <div className="">
              {/* <div className="breeze-icon" /> */}
              <span>Gold {gold}</span>
            </div>

            <div className="">
              {/* <div className="breeze-icon" /> */}
              <span>Arrow {arrow}</span>
            </div>
          </div>
        </div>

        {!gameOver && (<div className="button-container" >
          <Button className='move-btn' variant="primary" onClick={handleMoveClick}>
            Move
          </Button>
          <Button className='move-btn' variant="primary" onClick={() => setCellValue(0, 3, 'stench')}>
            Set Cell Value
          </Button>
          <Button className='restart-btn' variant="danger" onClick={handleRestartClick}>
            Restart Game
          </Button>
        </div>)}
      </div>

      {gameOver && (
        <div className="modal">
          <div className="modal-content" style={{ display: 'flex', flexDirection: 'column', }}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h1 >Game Over</h1>
            <Button className='restart-btn' variant="danger" onClick={handleRestartClick} style={{ width: '20%' }}>
              Restart Game
            </Button>
          </div>
        </div>
      )}

      {win && (<div>
        You Won
      </div>)}



    </>
  );
}

export default WumpusGameBoard;
