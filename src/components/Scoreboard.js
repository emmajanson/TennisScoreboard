import React, { useState } from 'react';
import '../styles/Scoreboard.css';
import backgroundVideo from '../media/tenniscourt.mp4';

const teams = {
  teamOne: {
    name: 'Home',
    points: 0,
    games: 0,
    sets: 0,
  },
  teamTwo: {
    name: 'Guest',
    points: 0,
    games: 0,
    sets: 0,
  },
};

const teamOne = 'teamOne';
const teamTwo = 'teamTwo';

function wonPoint(team, setTeams) {
  let newTeams = { ...teams };
  if (newTeams[team].points === 0) {
    newTeams[team].points = 15;
  } else if (newTeams[team].points === 15) {
    newTeams[team].points = 30;
  } else if (newTeams[team].points === 30) {
    newTeams[team].points = 40;
  } else if (newTeams[team].points === 40) {
    newTeams[team].points = 0;
    newTeams[team].games += 1;
  }
  setTeams(newTeams);
}

function checkwin(teams) {
  if (teams['teamOne'].sets >= 2) {
    alert(teams['teamOne'].name + ' has won!');
  } else if (teams['teamTwo'].sets >= 2) {
    alert(teams['teamTwo'].name + ' has won!');
  }
}

function resetScores(setTeams) {
  setTeams({
    teamOne: {
      name: 'Home',
      points: 0,
      games: 0,
      sets: 0,
    },
    teamTwo: {
      name: 'Guest',
      points: 0,
      games: 0,
      sets: 0,
    },
  });
}

const Scoreboard = () => {
  const [currentTeams, setTeams] = useState(teams);

  return (
    <div className="wrapper">
      {/* VIDEO BG */}
      <video className="backgroundVideo" controls autoPlay loop>
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className="scoreboardWrapper">
        <div className="cardsContainer">
          {/* TEAM ONE */}
          <div className="cardWrapper teamOne">
            <div className="name">
              <h1>{currentTeams.teamOne.name}</h1>
            </div>
            <div className="scoreBox">
              <div
                className="points"
                onClick={() => {
                  wonPoint(teamOne, setTeams);
                  if (
                    currentTeams[teamOne].games >= 6 &&
                    currentTeams[teamOne].games - currentTeams[teamTwo].games >=
                      2
                  ) {
                    setTeams({
                      ...currentTeams,
                      [teamOne]: {
                        ...currentTeams[teamOne],
                        sets: currentTeams[teamOne].sets + 1,
                        games: 0,
                      },
                    });
                  }
                  checkwin(currentTeams);
                }}
              >
                <span>{currentTeams.teamOne.points}</span>
              </div>
            </div>
            <div className="games">
              <span>{currentTeams.teamOne.games}</span>
            </div>
            <div className="sets">
              <span>{currentTeams.teamOne.sets}</span>
            </div>
          </div>

          {/* TEAM TWO */}
          <div className="cardWrapper teamTwo">
            <div className="name">
              <h1>{currentTeams.teamTwo.name}</h1>
            </div>
            <div className="scoreBox">
              <div
                className="points"
                onClick={() => {
                  wonPoint(teamTwo, setTeams);
                  if (
                    currentTeams[teamTwo].games >= 6 &&
                    currentTeams[teamTwo].games - currentTeams[teamOne].games >=
                      2
                  ) {
                    setTeams({
                      ...currentTeams,
                      [teamTwo]: {
                        ...currentTeams[teamTwo],
                        sets: currentTeams[teamTwo].sets + 1,
                        games: 0,
                      },
                    });
                  }
                  checkwin(currentTeams);
                }}
              >
                <span>{currentTeams.teamTwo.points}</span>
              </div>
            </div>
            <div className="games">
              <span>{currentTeams.teamTwo.games}</span>
            </div>
            <div className="sets">
              <span>{currentTeams.teamTwo.sets}</span>
            </div>
          </div>
        </div>

        {/* RESET BUTTON */}
        <div className="resetBtnWrapper">
          <button className="resetBtn" onClick={() => resetScores(setTeams)}>
            Reset Scores
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
