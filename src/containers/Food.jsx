import React, { useImperativeHandle, useState } from "react";
import { forwardRef } from "react";
import { FOOD_EXPANSION_SIZE } from "../specialVariable";

const Food = forwardRef((props, ref) => {
  const [foodPosition, setFoodPosition] = useState(() => randomGridPosition());

  const updateFood = () => {
    const foodTouched = props.onSnake(foodPosition);
    if (foodTouched) {
      console.log("on Food");
      props.expandSnake(FOOD_EXPANSION_SIZE);
      const updatedFoodPosition = generateFoodPositionRandomly();
      console.log("updatedFoodPosition", updatedFoodPosition);
      setFoodPosition(updatedFoodPosition);
      drawFood();
    }
  };

  useImperativeHandle(ref, () => ({
    updateFood,
    drawFood,
  }));

  const drawFood = () => {
    const entireSnake = document.getElementById("gameContainer");
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = foodPosition.y;
    foodElement.style.gridColumnStart = foodPosition.x;
    foodElement.classList.add("foodElement");
    entireSnake.appendChild(foodElement);
  };

  function generateFoodPositionRandomly() {
    let newFoodPosition = null;
    while (newFoodPosition === null || props.onSnake(newFoodPosition)) {
      newFoodPosition = randomGridPosition();
    }
    console.log(newFoodPosition, "the new food position");
    return newFoodPosition;
  }

  function randomGridPosition() {
    return {
      x: Math.floor(Math.random() * 21) + 1,
      y: Math.floor(Math.random() * 21) + 1,
    };
  }

  return <></>;
});

export default Food;