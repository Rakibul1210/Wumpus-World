import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

function FirstPage() {
  const navigate = useNavigate();
  const [Board, setBoard] = useState([[]]);
  const [isBoardLoaded, setIsBoardLoaded] = useState(false); // New state variable
  const [numGolds, setNumGolds] = useState(0);


  const handleCustomGame =  () => {
    navigate('/wumpusSetup')
  }

  const handleFileGame =  () => {
    axios.post("http://localhost:5000/setFromFile")
    .then((response) => {
      if (response) {
        console.log('Data:', response.data);

        setBoard(response.data.board.grid);
        console.log("total gold : ", response.data.board.totalGold)
        setNumGolds(parseInt(response.data.board.totalGold));

        // setNumGolds(response.data.board.totalGold);
        setIsBoardLoaded(true); // Signal that the board is loaded

      }
    }).catch((err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  useEffect(() => {

    if (isBoardLoaded) {
      // let numGolds = Board.numberOfGold;
      navigate('/WumpusGameBoard', { state: { Board,numGolds } });
    }

  }, [Board, isBoardLoaded, navigate]);




  return (
    <>
    <div>
    <h2   style={{paddingLeft:'70px'}}>Wumpus</h2>

    <div className="wumpus-setup">
      <div>
      <button onClick={handleCustomGame} style={{width:'360px'}}>Custom Game</button>
    </div>
    <div style={{marginTop:'20px'}}>
      <button onClick={handleFileGame} style={{width:'360px'}}>Input File Game</button>
    </div>
    </div>
    </div>
    </>
  );
}

export default FirstPage;