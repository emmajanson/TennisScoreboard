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

  const resetScoresAndSets = () => { //Defines a function that will reset scores and sets
    setPlayer1Score(0); //Sets value of player1Score to 0 using the setPlayer1Score function (with other words: Resets scores of player 1)
    setPlayer2Score(0); //Sets value of player2Score to 0 using the setPlayer2Score function (with other words: Resets scores of player 2)
    setPlayer1Sets(0); //Sets value of player1Sets to 0 using the setPlayer1Sets function (with other words: Resets sets of player 1)
    setPlayer2Sets(0); //Sets value of player2Sets to 0 using the setPlayer2Sets function (with other words: Resets sets of player 2)
    setCurrentSet(1); //Sets value of currentSet to 1 using the setCurrentSet function (with other words: Resets current set to 1/first set)
  };

  const formatScore = (score) => { //Declares a function that takes a score argument. The function will be used to convert the numerical scores to their corresponding string representations
    if (score === 0) { //Checks if the score is equal to 0
      return 'Love'; //If it is, the function returns the string (Love)
    } else if (score === 1) { //If the score is not 0, this else if statement checks if the score is equal to 1
      return '15'; //If it is, the function returns the string (15)
    } else if (score === 2) { //If the score is not 0 or 1, this else if statement checks if the score is equal to 2
      return '30'; //If it is, the function returns the string (30)
    } else if (score === 3) { //If the score is not 0, 1 or 2, this else if statement checks if the score is equal to 3
      return '40'; //If it is, the function returns the string (40)
    } else if (score >= 4) { //If the score is not 0, 1, 2 or 3, this else if statement checks if the score is greater than or equal to 4
      return 'A'; //If it is, the function returns the string (A, aka Advantage)
    }
  };

  const determineGameWinner = () => { //Declares a function with no arguments. The function will be used to check whether a game has been won by either player
    if (player1Score >= 4 && player1Score - player2Score >= 2) { //Checks whether player1 has a score of at least 4 points and is at least 2 points ahead of player2 
      return player1Name; //If it is true, player1 is the winner of the game and the function returns player1Name (=Player 1)
    } else if (player2Score >= 4 && player2Score - player1Score >= 2) { //Checks wheter player2 has a score of at least 4 points and is at least 2 points ahead of player1
      return player2Name; //If it is true, player2 is the winner of the game and the function returns player2Name (=Player 2)
    }
  };

  const determineSetWinner = () => { //Declares a function with no arguments. The function will be used to check whether a set has been won by either player
    if (player1Score >= 6 && player1Score - player2Score >= 2) { //Checks wether player1 has a score of at least 6 points and is at least 2 points ahead of player2. If it is true, player1 is the winner of the set
      setPlayer1Sets(player1Sets + 1); //This increments the number of sets won by player1 by 1
      setCurrentSet(currentSet + 1); //This increments the current set by 1
      setPlayer1Score(0); //This resets the scores of player1
      setPlayer2Score(0); //This resets the scores of player2
    } else if (player2Score >= 6 && player2Score - player1Score >= 2) { //Checks wether player2 has a score of at least 6 points and is at least 2 points ahead of player1. If it is true, player2 is the winner of the set
      setPlayer2Sets(player2Sets + 1); //This increments the number of sets won by player2 by 1
      setCurrentSet(currentSet + 1); //This increments the current set by 1
      setPlayer1Score(0); //This resets the scores of player1
      setPlayer2Score(0); //This resets the scores of player2
    }
  };

  const determineScore = () => { //Declares a arrowfunction with no arguments
    const winner = determineGameWinner(); //Calls the determineGameWinner function above which checks if either player has won the game. If a winner is found, their name is returned. Otherwise, the function returns undefined. The result of this call is stored in the winner variable
    if (winner) { //If winner is true (with other words: a player has won the game)...
      determineSetWinner(); //...the determineSetWinner function is calledwhich increments the number of sets won by the appropriate player, resets the game score, and advances to the next set
      return `Game, ${winner}`; //Then returns the string (with the word Game and the name of the player)
    }
    if (player1Score === player2Score) { //This checks if the scores are tied
      if (player1Score >= 3) { //This checks if the scores are at least 3-3
        return 'Deuce'; //If it is, the function returns this string (Deuce)
      }
      return `${formatScore(player1Score)}-All`; //Otherwise, the function returns this string (formatScore and the word All)
    } else if (player1Score >= 4 || player2Score >= 4) { //If neither of the conditions above is true (if the scores are not tied), this else if function checks if either player has a score of at least 4 points
      const leader = player1Score > player2Score ? player1Name : player2Name; //If so, it determines which player has the higher score (is the leader)
      const scoreDiff = Math.abs(player1Score - player2Score); //This calculates the difference between the players scores, regardless of which one is higher.
      if (scoreDiff === 1) { //If the score difference is 1 point, then the player who is in the lead has Advantage...
        return `Advantage, ${leader}`; //...and the function returns this string (the word Advantage and the name of the leader)
      }
    }
    return `${formatScore(player1Score)}-${formatScore(player2Score)}`; //If neither of the conditions above is true, the function returns this string (With other words: The string is calling the function formatScore and returns current score for each player)
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
