//Imports the necessary dependencies and resources
import React, { useState } from 'react'; //Imports the react library and the useState hook from react module
import '../styles/Scoreboard.css'; //Imports style from css file
import backgroundVideo from '../media/tenniscourt.mp4'; //Imports videoBackground file from media directory 

//Declares a functional component for the Scoreboard
const TennisScoreboard = () => { //Defines functional component
  const player1Name = 'Player 1'; //Declares Player 1 - used to set the initial name of the first player
  const player2Name = 'Player 2'; //Declares Player 2 - used to set the initial name of the second player
  const [player1Score, setPlayer1Score] = useState(0); //Initializes a state variable to 0 (so points start counting from 0) & creates a function to update the value of player1Score
  const [player2Score, setPlayer2Score] = useState(0); //Initializes a state variable to 0 (so points start counting from 0) & creates a function to update the value of player2Score
  const [player1Sets, setPlayer1Sets] = useState(0); //Initializes a state variable to 0 (so that winning sets start counting from 0) & creates a function to update the value of player1Sets
  const [player2Sets, setPlayer2Sets] = useState(0); //Initializes a state variable to 0 (so that winning sets start counting from 0) & creates a function to update the value of player2Sets
  const [currentSet, setCurrentSet] = useState(1); //Initializes a state variable to 1 (so that current set start counting from 1) & creates a function to update the value of currentSet

  const handleScore = (player) => { //Defines a function that takes a player argument
    if (player === 1) { //Checks if player is equal to 1. (With other words: Checks if it's the first player)
      setPlayer1Score(player1Score + 1); //Updates the value of player1Score by adding 1 using the setPlayer1Score function. (With other words: Updates Score with 1 for player 1)
    } else if (player === 2) { //Checks if player is equal to 2. (With other words: Checks if it's the second player)
      setPlayer2Score(player2Score + 1);  //Updates the value of player2Score by adding 1 using the setPlayer2Score function. (With other words: Updates Score with 1 for player 2)
    }
  };

  const resetScoresAndSets = () => {
    setPlayer1Score(0);
    setPlayer2Score(0);
    setPlayer1Sets(0);
    setPlayer2Sets(0);
    setCurrentSet(1);
  };

  const formatScore = (score) => {
    if (score === 0) {
      return 'Love';
    } else if (score === 1) {
      return '15';
    } else if (score === 2) {
      return '30';
    } else if (score === 3) {
      return '40';
    } else if (score >= 4) {
      return 'A';
    }
  };

  const determineGameWinner = () => {
    if (player1Score >= 4 && player1Score - player2Score >= 2) {
      return player1Name;
    } else if (player2Score >= 4 && player2Score - player1Score >= 2) {
      return player2Name;
    }
  };

  const determineSetWinner = () => {
    if (player1Score >= 6 && player1Score - player2Score >= 2) {
      setPlayer1Sets(player1Sets + 1);
      setCurrentSet(currentSet + 1);
      setPlayer1Score(0);
      setPlayer2Score(0);
    } else if (player2Score >= 6 && player2Score - player1Score >= 2) {
      setPlayer2Sets(player2Sets + 1);
      setCurrentSet(currentSet + 1);
      setPlayer1Score(0);
      setPlayer2Score(0);
    }
  };

  const determineScore = () => {
    const winner = determineGameWinner();
    if (winner) {
      determineSetWinner();
      return `Game, ${winner}`;
    }
    if (player1Score === player2Score) {
      if (player1Score >= 3) {
        return 'Deuce';
      }
      return `${formatScore(player1Score)}-All`;
    } else if (player1Score >= 4 || player2Score >= 4) {
      const leader = player1Score > player2Score ? player1Name : player2Name;
      const scoreDiff = Math.abs(player1Score - player2Score);
      if (scoreDiff === 1) {
        return `Advantage, ${leader}`;
      }
    }
    return `${formatScore(player1Score)}-${formatScore(player2Score)}`;
  };

  return (
    <div className="wrapper">
      <video className="backgroundVideo">
        <source
          src={backgroundVideo}
          type="video/mp4"
          controls
          autoPlay
          muted
          loop
        />
      </video>

      <div className="scoreboardWrapper">
        <div className="scoreContainer">
          <p className="currentSet">Current Set: {currentSet}</p>
          <h2 className="scoreTracker">{determineScore()}</h2>
          {determineGameWinner() && (
            <h3>{determineGameWinner()} won the game!</h3>
          )}
          {determineScore() === 'Deuce' && <h3>It's deuce!</h3>}
          {determineScore().includes('Advantage') && (
            <h3>{determineScore()}</h3>
          )}
        </div>

        <div className="cardsContainer">
          <div className="cardWrapper">
            <h3 className="name">{player1Name}</h3>
            <p className="score">Score: {player1Score}</p>
            <p className="sets">Sets: {player1Sets}</p>
            <button className="scoreBtn" onClick={() => handleScore(1)}>
              Add score
            </button>
          </div>

          <div className="cardWrapper">
            <h3 className="name">{player2Name}</h3>
            <p className="score">Score: {player2Score}</p>
            <p className="sets">Sets: {player2Sets}</p>
            <button className="scoreBtn" onClick={() => handleScore(2)}>
              Add score
            </button>
          </div>
        </div>

        <div className="resetBtnWrapper">
          <button className="resetBtn" onClick={() => resetScoresAndSets()}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default TennisScoreboard;
