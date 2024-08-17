let inputDirection = { x: 1, y: 0 };
let lastInputDirection = { x: 0, y: 0 };

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