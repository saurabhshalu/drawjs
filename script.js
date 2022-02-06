const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const colors = [
  "#000000",
  "#FFFFFF",
  "#8A39E1",
  "#F76E11",
  "#2666CF",
  "#FFE162",
  "#FF6464",
  "#91C483",
];

const resize = () => {
  canvas.width =
    document.documentElement.clientWidth || document.body.clientWidth;
  canvas.height =
    document.documentElement.clientHeight || document.body.clientHeight;
};

window.onload = () => {
  colors.forEach((color, index) => {
    document.querySelector(`.color${index + 1}`).style.backgroundColor = color;
  });
  resize();
};

window.onresize = () => {
  resize();
};

let isDrawing = false;
let selectedColor = colors[0];

const configureContext = () => {
  ctx.lineWidth = 20;
  ctx.lineCap = "round";
  ctx.strokeStyle = selectedColor;
};

const beginDrawing = (e) => {
  isDrawing = true;
  configureContext();
  draw(e);
};

const endDrawing = () => {
  isDrawing = false;
  ctx.beginPath();
};

const draw = (e) => {
  if (!isDrawing) {
    return;
  }

  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY);
};

const changeColor = (color) => {
  selectedColor = color;
};

canvas.addEventListener("mousedown", beginDrawing);
canvas.addEventListener("mouseup", endDrawing);
canvas.addEventListener("mousemove", draw);
