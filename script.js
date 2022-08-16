const clearButton = document.querySelector('#clear-board');

function addColors() {
  const section = document.querySelector('#color-palette');
  for (let i = 0; i < 4; i += 1) {
    const color = document.createElement('section');
    color.className = 'color';

    section.appendChild(color);
  }
}
addColors();

const colors = document.querySelectorAll('.color');

function createBoard(size = 5) {
  const board = document.querySelector('#pixel-board');
  let newSize = size;
  if (size < 5) newSize = 5;
  if (size > 50) newSize = 50;
  for (let i = 0; i < newSize; i += 1) {
    const pixelLine = document.createElement('section');
    for (let j = 0; j < newSize; j += 1) {
      const pixelColumn = document.createElement('div');
      pixelColumn.className = 'pixel';
      pixelLine.appendChild(pixelColumn);
    }
    board.appendChild(pixelLine);
  }
}
createBoard();

const pixels = document.querySelectorAll('.pixel');

function setInitialColor() {
  const color = document.querySelector('.color');
  color.className = 'color selected';
}
setInitialColor();

function clearBoard() {
  const newPixels = document.querySelectorAll('.pixel');
  for (let i = 0; i < newPixels.length; i += 1) {
    newPixels[i].style.backgroundColor = 'rgb(255, 255, 255)';
  }
}
clearButton.addEventListener('click', clearBoard);

function changeSelection({ target }) {
  for (let i = 0; i < colors.length; i += 1) {
    colors[i].classList.remove('selected');
    target.classList.add('selected');
  }
}
colors.forEach((color) => color.addEventListener('click', changeSelection));

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let colorHex = '#';
  for (let i = 0; i < 6; i += 1) {
    colorHex += letters[Math.floor(Math.random() * 16)];
  }
  return colorHex;
}

colors[0].style.backgroundColor = 'black';
for (let i = 1; i <= 3; i += 1) {
  colors[i].style.backgroundColor = getRandomColor();
}

function paintPixels({ target }) {
  const eventTarget = target;
  const selectedPalette = document.querySelector('.selected');
  const selectedColor = window.getComputedStyle(selectedPalette).backgroundColor;
  for (let i = 0; i < pixels.length; i += 1) {
    eventTarget.style.backgroundColor = selectedColor;
  }
}

pixels.forEach((pixel) => {
  pixel.addEventListener('click', paintPixels);
});

function createNewBoard(boardSize) {
  const modifyButton = document.querySelector('#generate-board');
  modifyButton.addEventListener('click', () => {
    if (boardSize.value <= 0) alert('Board inválido!');
    const board = document.querySelector('#pixel-board');
    while (board.firstChild) board.removeChild(board.firstChild);
    createBoard(boardSize.value);
    const newPixels = document.querySelectorAll('.pixel');
    newPixels.forEach((newPixel) => {
      newPixel.addEventListener('click', paintPixels);
    });
  });
}

function tableModifiers() {
  const inputsAndButtons = document.querySelector('#inputs-buttons');

  const boardSizeInput = document.createElement('input');
  boardSizeInput.id = 'board-size';
  boardSizeInput.type = 'number';
  boardSizeInput.min = 1;

  const modifyButton = document.createElement('button');
  modifyButton.id = 'generate-board';
  modifyButton.type = 'button';
  modifyButton.innerHTML = 'VQV';

  inputsAndButtons.appendChild(modifyButton);
  inputsAndButtons.appendChild(boardSizeInput);

  createNewBoard(boardSizeInput);
}
tableModifiers();
