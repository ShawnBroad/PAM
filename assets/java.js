const pictureContainer = document.querySelector('.picture-container');
const pictureImage = document.querySelector('.picture-image');
const gridContainer = document.querySelector('.grid-container');
const paletteContainer = document.querySelector('.palette-container');
const fillButton = document.querySelector('.fill-button');
const saveButton = document.querySelector('.save-button');
const loadButton = document.querySelector('.load-button');
const loadPictureButton = document.querySelector('.load-picture-button');
const razzleButton = document.querySelector('.razzle-dazzle')
const clearButton = document.querySelector('.clear-button')
const containerA = document.querySelector('.container3')
const containerB = document.querySelector('.button-container')
const containerC = document.querySelector('.container1')
const endRazzle = document.querySelector('.deactivate-razzle')
let height = document.querySelector('#height')
let width = document.querySelector('#width')
const submit = document.querySelector('#submit')
let heightValue = document.querySelector('#height').value
let widthValue = document.querySelector('#width').value




const paletteColors = ['red', 'IndianRed', 'LightCoral', 'Salmon', 'DarkSalmon', 'crimson', 'FireBrick', 'DarkRed',
  'green', 'GreenYellow', 'chartreuse', 'LawnGreen', 'Lime', 'LimeGreen', 'PaleGreen', 'LightGreen', 'MediumSpringGreen', 'SpringGreen',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'DarkGreen', 'YellowGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'MediumAquaMarine', 'DarkSeaGreen',
  'LightSeaGreen', 'DarkCyan', 'Teal', 'blue', 'Aqua', 'Cyan', 'LightCyan', 'PaleTurquoise', 'AquaMarine', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise',
  'CadetBlue', 'SteelBlue', 'LightSteelBlue', 'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue', 'DeepSkyBlue', 'DodgerBlue', 'CornFlowerBlue', 'MediumSlateBlue', 'RoyalBlue', 'MediumBlue',
  'DarkBlue', 'Navy', 'MidnightBlue', 'black', 'white', 'Snow', 'HoneyDew', 'MintCream', 'Azure', 'AliceBlue', 'GhostWhite', 'WhiteSmoke', 'SeaShell', 'Beige', 'OldLace', 'FloralWhite', 'Ivory',
  'AntiqueWhite', 'Linen', 'LavenderBlush', 'MistyRose', 'yellow', 'Gold', 'LightYellow', 'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenRod', 'Khaki',
  'DarkKhaki', 'purple', 'Lavender', 'Thistle', 'Plum', 'Violet', 'Orchid', 'Fuchsia', 'Magenta', 'MediumOrchid', 'MediumPurple', 'BlueViolet', 'DarkViolet', 'Indigo', 'SlateBlue', 'DarkSlateBlue',
  'orange', 'LightSalmon', 'Coral', 'Tomato', 'OrangeRed', 'DarkOrange', 'pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'PaleVioletRed', 'brown', 'Cornsilk', 'BlanchedAlmond', 'Bisque',
  'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan', 'RosyBrown', 'SandyBrown', 'grey'];
let paintColor = '#666666';

const allSquares = [];


let valueH = height.value
let valueW = width.value

function send() {
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    makeGrid(height, width)

  })
}
function changeGridSize() {
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    makeGrid(heightValue, widthValue)

  })

  height.addEventListener("change", (e) => {
    heightValue = e.target.value
  })
  width.addEventListener("change", (e) => {
    widthValue = e.target.value
  })
}

function makeGrid(heightValue, widthValue) {
  allSquares.length = 0
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild)
  }
  for (let i = 0; i < heightValue; i++) {
    const row = makeRow();
    gridContainer.appendChild(row);
    for (let j = 0; j < widthValue; j++) {
      const square = makeSquare();
      row.appendChild(square);

      square.addEventListener('click', () => {
        square.style.backgroundColor = paintColor;
      });

      square.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        square.style.backgroundColor = '';


      });
    }
  }
}

function makeRow() {
  const row = document.createElement('div');
  row.classList.add('row');

  return row;
}

function makeSquare() {
  const square = document.createElement('div');
  square.classList.add('square');

  allSquares.push(square);

  return square;
}

function fillSquares() {
  fillButton.addEventListener('click', () => {
    allSquares.forEach(square => (square.style.backgroundColor = paintColor));
  });
}

function createColorCircleAndAppend(colorHex) {
  const colorCircle = document.createElement('div');
  colorCircle.classList.add('circle');
  colorCircle.style.backgroundColor = colorHex;

  paletteContainer.appendChild(colorCircle);

  colorCircle.addEventListener('click', () => {
    paintColor = colorCircle.style.backgroundColor;
  });
}

function createColorPalette() {
  for (let i = 0; i < paletteColors.length; i++) {
    const colorHex = paletteColors[i];

    createColorCircleAndAppend(colorHex);
  }
}

function dragAndDraw() {
  gridContainer.addEventListener('mousedown', () => {
    down = true;
    gridContainer.addEventListener('mouseup', () => {
      down = false;
    });
    gridContainer.addEventListener('mouseover', (e) => {
      if (e.target.className === "square" && down) {
        e.target.style.backgroundColor = paintColor;
      }
    });
  });
}

function saveBtn() {
  saveButton.addEventListener('click', () => {
    const gridArray = [];
    for (let i = 0; i < allSquares.length; i++) {
      const squareColors = allSquares[i];
      gridArray.push(squareColors.style.backgroundColor);


    }

    const gridInfo = {
      grid: gridArray,
      height: height.value,
      width: width.value,
    }



    localStorage.setItem('gridSave', JSON.stringify(gridInfo));
  });
}

function loadBtn() {
  loadButton.addEventListener('click', () => {
    const savedGridInfo = JSON.parse(localStorage.getItem('gridSave'));
    makeGrid(savedGridInfo.height, savedGridInfo.width);
    for (let i = 0; i < allSquares.length; i++) {
      allSquares[i].style.backgroundColor = savedGridInfo.grid[i];
    }
  });
}

// Fetch random image from API
function getImageFromApi() {
  const fetchRequest = fetch('https://dog.ceo/api/breeds/image/random');

  fetchRequest.then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data);
    pictureImage.src = data.message;
  });
}

function loadImageFromApi() {
  loadPictureButton.addEventListener('click', (e) => {
    e.preventDefault();
    getImageFromApi();
  });
}

function cleanCanvas() {
  clearButton.addEventListener("click", () => {
    allSquares.forEach((square) => (square.style.backgroundColor = ""));
  });
}

function razzle() {
  razzleButton.addEventListener('click', () => {
    containerA.style.backgroundImage = "url(assets/images/giphy.gif)"
    paletteContainer.style.backgroundImage = "url(assets/images/giphy.gif)"
    containerC.style.backgroundImage = "url(assets/images/jack-black-wap.gif)"

  });

}


function noRazzle() {
  endRazzle.addEventListener('click', () => {
    containerA.style.backgroundImage = ""
    paletteContainer.style.backgroundImage = ""
    containerC.style.backgroundImage = ""
  });
}






function init() {
  makeGrid(heightValue, widthValue);
  fillSquares();
  createColorPalette();
  dragAndDraw();
  saveBtn();
  loadBtn();
  loadImageFromApi();
  cleanCanvas();
  razzle()
  noRazzle()
  changeGridSize()
}

init();