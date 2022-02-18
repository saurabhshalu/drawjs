const canvas = document.querySelector("#canvas");
const strokeSize = document.querySelector("#strokeSize");
const clearButton = document.querySelector("#clear");
const saveButton = document.querySelector("#save");

const modeImg = document.querySelector("#modeImg");

let pencil = true;

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

saveButton.addEventListener("click", () => {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "DrawJS";
  link.click();
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

const changeMode = () => {
  if (pencil === true) {
    selectedSize = 30;
    selectedColor = "#FFFFFF";
    modeImg.src = "https://img.icons8.com/ios-filled/50/000000/pencil-tip.png";
    document.querySelector(".canvasContainer").style.cursor =
      " url(https://img.icons8.com/ios-filled/50/000000/eraser.png) 25 25, auto";
  } else {
    selectedSize = strokeSize.value;
    selectedColor = "#000000";
    modeImg.src = "https://img.icons8.com/ios-filled/50/000000/eraser.png";
    document.querySelector(".canvasContainer").style.cursor =
      " url(https://img.icons8.com/ios-filled/50/000000/pencil-tip.png) 0 50, auto";
  }
  pencil = !pencil;
};

canvas.addEventListener("mousedown", beginDrawing);
canvas.addEventListener("touchstart", beginDrawing, { passive: true });
canvas.addEventListener("mouseup", endDrawing);
canvas.addEventListener("touchend", endDrawing, { passive: true });
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("touchmove", draw, { passive: true });
modeImg.addEventListener("click", changeMode);
