import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { ifSnakeTouchesBoundaries } from "../helperFunctions";
import CountdownTimer from "./CountdownTimer";
import Food from "./Food";
import Snake from "./Snake";
import GameOverAudio from "../assets/die.mp3";
import Header from "./Header";

const OuterContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const SnackGameContainer = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(21, 1fr);
  grid-template-rows: repeat(21, 1fr);
  background-color: #ac6;
  box-shadow: inset 0 0 60px rgba(48, 80, 0, 0.3);
  outline: 4px solid rgba(0, 0, 0, 0.75);
`;

const ScoreAndHighScoreContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  width: 100%;
`;

const DisplayScore = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const GameOverContainer = styled.div`
  font-size: 120px;
  font-weight: 900;
  line-height: 0.95;
  width: 100%;
  height: 100%;
  text-align: center;
  position: absolute;
  top: 50%;
  transform: translateY(-20%);
  background: transparent;
  user-select: none;
  cursor: pointer;
`;

const StartContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 600px;
  padding: 100px 49px;
  border-radius: 3%;
  outline: 3px solid black;
`;

const StartButton = styled.div`
  padding: 24px;
  text-align: center;
  border-radius: 5%;
  font-weight: 600;
  font-size: 32px;

  &:hover {
    background: #373434;
    color: #ffffff;
  }
`;

const SnakeGameHeading = styled.div`
  font-size: 120px;
  font-weight: 800;
`;

const LevelContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 24px;
`;

const SnakeHeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Game = () => {
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timerFunction, setTimeFunction] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [snakeSpeed, setSnakeSpeed] = useState(5);
  const [highScore, setHighScore] = useState();
  let lastRenderedTime = 0;
  let gameIsOver = false;

  const snakeComponentRef = useRef(null);
  const foodComponentRef = useRef(null);

  useEffect(() => {
    const currentHighScore = window.localStorage.getItem(
      getNameFromSpeed[snakeSpeed]
    );

    setHighScore(currentHighScore ? currentHighScore : 0);
  }, []);

  useEffect(() => {
    const currentHighScore = window.localStorage.getItem(
      getNameFromSpeed[snakeSpeed]
    );
    console.log(currentHighScore, snakeSpeed, "current high score");
    if (currentHighScore && score > currentHighScore) {
      window.localStorage.setItem(getNameFromSpeed[snakeSpeed], score);
    } else {
      window.localStorage.setItem(
        getNameFromSpeed[snakeSpeed],
        currentHighScore ? currentHighScore : 0
      );
    }
    setHighScore(window.localStorage.getItem(getNameFromSpeed[snakeSpeed]));
  }, [gameOver, snakeSpeed]);

  useEffect(() => {
    if (gameStarted) {
      setTimeFunction(true);
      setTimeout(() => {
        setTimeFunction(false);
        window.requestAnimationFrame(startGame);
      }, 3200);
    }
  }, [gameStarted]);

  const startGame = (currentTime) => {
    gameIsOver = checkIfGameIsOver();
    if (gameIsOver) {
      setGameOver(true);
      gameOverAudioPlay();
      return;
    }
    window.requestAnimationFrame(startGame);
    const secondSinceLastRendered = (currentTime - lastRenderedTime) / 1000;
    if (secondSinceLastRendered < 1 / snakeSpeed) return;
    lastRenderedTime = currentTime;
    updateGame();
    drawGame();
    setScore(updatedScore());
  };

  const updateGame = () => {
    snakeComponentRef.current.updateSnake();
    foodComponentRef.current.updateFood();
  };

  const drawGame = () => {
    const gameContainerDiv = document.getElementById("gameContainer");
    gameContainerDiv.innerHTML = "";
    snakeComponentRef.current.drawSnake();
    foodComponentRef.current.drawFood();
  };

  const checkIfFoodIsCaptured = (position) => {
    return snakeComponentRef.current.onSnake(position);
  };

  const expandSnake = (amount) => {
    return snakeComponentRef.current.expandSnake(amount);
  };

  const getSnakeHeadPosition = () => {
    return snakeComponentRef.current.getSnakeHeadAxis();
  };

  const checkIfGameIsOver = () => {
    return (
      ifSnakeTouchesBoundaries(getSnakeHeadPosition()) || snakeIsIntersecting()
    );
  };

  const snakeIsIntersecting = () => {
    return snakeComponentRef.current.isSnakeIntersecting();
  };

  const updatedScore = () => {
    return snakeComponentRef.current.getTheScore();
  };

  const getNameFromSpeed = {
    5: "SLUG",
    7: "WARM",
    9: "PYTHON",
  };

  const gameOverAudioPlay = async () => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const audioElement = new Audio(GameOverAudio); // Path to your sound file
    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(audioContext.destination);
    await audioElement.play();
  };

  return (
    <OuterContainer>
      <Header />
      {!gameStarted && (
        <StartContainer id="startContainer">
          <SnakeHeadingContainer>
            <div className="foodElement animateFood"></div>
            <SnakeGameHeading>Snake</SnakeGameHeading>
            <div className="foodElement animateFood"></div>
          </SnakeHeadingContainer>
          <LevelContainer>
            <StartButton
              onClick={() => {
                setSnakeSpeed(5);
                setGameStarted(true);
              }}
            >
              SLUG
            </StartButton>
            <StartButton
              onClick={() => {
                setSnakeSpeed(7);
                setGameStarted(true);
              }}
            >
              WARM
            </StartButton>
            <StartButton
              onClick={() => {
                setSnakeSpeed(9);
                setGameStarted(true);
              }}
            >
              PYTHON
            </StartButton>
          </LevelContainer>
        </StartContainer>
      )}
      {gameStarted && timerFunction ? (
        <CountdownTimer />
      ) : (
        <div>
          <SnackGameContainer
            id="gameContainer"
            style={{ display: gameStarted ? "" : "none" }}
            className={gameOver ? "hideBoard" : ""}
          >
            <Snake ref={snakeComponentRef} snakeSpeed={snakeSpeed} />
            <Food
              ref={foodComponentRef}
              onSnake={(position) => checkIfFoodIsCaptured(position)}
              expandSnake={(amount) => expandSnake(amount)}
            />
            {gameOver && (
              <GameOverContainer onClick={() => window.location.assign("/")}>
                Game Over!
              </GameOverContainer>
            )}
          </SnackGameContainer>
          {gameStarted && (
            <ScoreAndHighScoreContainer id={"scoreContainer"}>
              <DisplayScore className="score">{score}</DisplayScore>
              <DisplayScore className="score">
                {getNameFromSpeed[snakeSpeed]} {highScore}
              </DisplayScore>
            </ScoreAndHighScoreContainer>
          )}
        </div>
      )}
    </OuterContainer>
  );
};

export default Game;