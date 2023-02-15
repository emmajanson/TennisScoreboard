import React, { useState } from 'react';
import '../styles/Scoreboard.css';
import backgroundVideo from '../media/tenniscourt.mp4';

const TennisScoreboard = () => {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');
  const [player1Sets, setPlayer1Sets] = useState(0);
  const [player2Sets, setPlayer2Sets] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);

  const handleScore = (player) => {
    if (player === 1) {
      setPlayer1Score(player1Score + 1);
    } else if (player === 2) {
      setPlayer2Score(player2Score + 1);
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
      <video>
        <source
          className="backgroundVideo"
          src={backgroundVideo}
          controls
          autoPlay
          loop
        ></source>
      </video>
      
      <div className="scoreboardWrapper">
        <h2>{determineScore()}</h2>
        {determineGameWinner() && (
          <h3>{determineGameWinner()} won the game!</h3>
        )}
        {determineScore() === 'Deuce' && <h3>It's deuce!</h3>}
        {determineScore().includes('Advantage') && <h3>{determineScore()}</h3>}
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <h3>{player1Name}</h3>
            <button onClick={() => handleScore(1)}>Add score</button>
            <p>Score: {player1Score}</p>
            <p>Sets: {player1Sets}</p>
          </div>
          <div>
            <h3>{player2Name}</h3>
            <button onClick={() => handleScore(2)}>Add score</button>
            <p>Score: {player2Score}</p>
            <p>Sets: {player2Sets}</p>
          </div>
        </div>
        <button onClick={() => resetScoresAndSets()}>Reset</button>
        <div>
          <h3>Sets</h3>
          <p>Current Set: {currentSet}</p>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TennisScoreboard;
