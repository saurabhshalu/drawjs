const canvas = document.querySelector("#canvas");
const strokeSize = document.querySelector("#strokeSize");

const ctx = canvas.getContext("2d");

const resize = () => {
  canvas.width =
    document.documentElement.clientWidth || document.body.clientWidth;
  canvas.height =
    document.documentElement.clientHeight || document.body.clientHeight;
};

window.onload = () => {
  resize();
  document.querySelectorAll(".color").forEach((el) => {
    el.addEventListener("click", changeColor);
  });
};

window.onresize = () => {
  resize();
};

let isDrawing = false;
let selectedColor = "black";
let selectedSize = 5;

strokeSize.addEventListener("input", (e) => {
  selectedSize = e.target.value;
  document.querySelector(
    ".sizeLabel"
  ).textContent = `Pen Size: ${e.target.value}`;
});

const configureContext = () => {
  ctx.lineWidth = selectedSize;
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

const changeColor = (e) => {
  selectedColor = e.target.style.backgroundColor;
};

canvas.addEventListener("mousedown", beginDrawing);
canvas.addEventListener("mouseup", endDrawing);
canvas.addEventListener("mousemove", draw);
