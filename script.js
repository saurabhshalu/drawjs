const canvas = document.querySelector("#canvas");
const strokeSize = document.querySelector("#strokeSize");
const clearButton = document.querySelector("#clear");

const ctx = canvas.getContext("2d");

const resize = () => {
  canvas.width =
    document.documentElement.clientWidth || document.body.clientWidth;
  canvas.height =
    document.documentElement.clientHeight || document.body.clientHeight;
};

const changeColor = (e) => {
  selectedColor = e.target.style.backgroundColor;
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

clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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

  ctx.lineTo(
    e.clientX || e.touches[0].clientX,
    e.clientY || e.touches[0].clientY
  );
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(
    e.clientX || e.touches[0].clientX,
    e.clientY || e.touches[0].clientY
  );
};

canvas.addEventListener("mousedown", beginDrawing);
canvas.addEventListener("touchstart", beginDrawing, { passive: true });
canvas.addEventListener("mouseup", endDrawing);
canvas.addEventListener("touchend", endDrawing, { passive: true });
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchmove", draw, { passive: true });
