
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useEffect } from "react";
import { getTheDirectionOfTheInput } from "../helperFunctions";

const Snake = forwardRef((props, ref) => {
  const [snakePosition, setSnakePosition] = useState([
    { x: 9, y: 11 },
    { x: 10, y: 11 },
  ]);
  const [newSegment, setNewSegment] = useState(0);

  useEffect(() => {
    if (newSegment > 0) {
      addSegments();
    }
  }, [newSegment]);

  const updateSnake = () => {
    const currentInputDirection = getTheDirectionOfTheInput();
    for (let i = snakePosition.length - 2; i >= 0; i--) {
      snakePosition[i + 1] = { ...snakePosition[i] };
    }

    snakePosition[0].x += currentInputDirection.x;
    snakePosition[0].y += currentInputDirection.y;
  };

  const getTheScore = () => {
    return (snakePosition.length - 2) * props.snakeSpeed;
  };

  useImperativeHandle(ref, () => ({
    updateSnake,
    drawSnake,
    onSnake,
    expandSnake,
    getSnakeHeadAxis,
    isSnakeIntersecting,
    getTheScore,
  }));

  const drawSnake = () => {
    const entireSnake = document.getElementById("gameContainer");
    snakePosition.forEach((eachBoxPosition, index) => {
      const snakeElement = document.createElement("div");
      console.log(eachBoxPosition, index);
      snakeElement.style.gridRowStart = eachBoxPosition.y;
      snakeElement.style.gridColumnStart = eachBoxPosition.x;
      snakeElement.classList.add("snakeBodyElement");
      entireSnake.appendChild(snakeElement);
    });
  };

  const expandSnake = (amount) => {
    console.log(newSegment, amount);
    setNewSegment(newSegment + amount);
  };

  const onSnake = (position, { ignoreHead = false } = {}) => {
    return snakePosition.some((segment, index) => {
      if (ignoreHead && index === 0) return false;
      return checkIfFoodIsTouched(segment, position);
    });
  };

  const checkIfFoodIsTouched = (pos1, pos2) => {
    if (pos1 && pos1.x && pos1.y && pos2 && pos2.x && pos2.y) {
      return pos1.x === pos2.x && pos1.y === pos2.y;
    }
    return false;
  };

  const addSegments = () => {
    console.log("adding segments", newSegment);
    for (let i = 0; i < newSegment; i++) {
      const updatedSnakePosition = snakePosition;
      updatedSnakePosition.push(snakePosition[snakePosition.length - 1]);
      console.log(updatedSnakePosition, "the snake position is updated");
      setSnakePosition(updatedSnakePosition);
      drawSnake();
    }
    setNewSegment(0);
  };

  const getSnakeHeadAxis = () => {
    return snakePosition[0];
  };

  const isSnakeIntersecting = () => {
    return onSnake(snakePosition[0], { ignoreHead: true });
  };

  return <></>;
});

export default Snake;
