let inputDirection = { x: 1, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

const updateDirection = (newDirection) => {
  if (
    (newDirection.x === 0 && lastInputDirection.y === 0) || 
    (newDirection.y === 0 && lastInputDirection.x === 0)
  ) {
    inputDirection = newDirection;
  }
};

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
    case "w":
    case "W":
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: -1 };
      break;
    case "ArrowDown":
    case "s":
    case "S":
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
    case "a":
    case "A":
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: -1, y: 0 };
      break;
    case "ArrowRight":
    case "d":
    case "D":
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: 1, y: 0 };
      break;
    default:
      inputDirection = { x: 1, y: 0 };
      break;
  }
});

export const getTheDirectionOfTheInput = () => {
  lastInputDirection = inputDirection;
  return inputDirection;
};

export const ifSnakeTouchesBoundaries = (position) => {
  return position.x < 1 || 
  position.x > 21 || 
  position.y < 1 || 
  position.y > 21;
};
export const handleArrowClick = (direction) => {
  switch (direction) {
    case "up":
      updateDirection({ x: 0, y: -1 });
      break;
    case "down":
      updateDirection({ x: 0, y: 1 });
      break;
    case "left":
      updateDirection({ x: -1, y: 0 });
      break;
    case "right":
      updateDirection({ x: 1, y: 0 });
      break;
    default:
      break;
  }
};