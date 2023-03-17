// Константы

const canvas = document.getElementById("game");
const gtx = canvas.getContext("2d");

box = 50;

let foodr = [];
let foodg = [];
let foodb = [];
let foodh = [];

let juk = [];
juk[0] = {
  x: 10 * box,
  y: 17 * box,
};

let timer = 0;
let dvij;
let score = 0;
let life = 3;

// Клавиатура

document.addEventListener("keydown", direction);

function direction(event) {
  if (event.keyCode == 68) dvij = "left";
  else if (event.keyCode == 83) dvij = "up";
  else if (event.keyCode == 65) dvij = "right";
  else if (event.keyCode == 87) dvij = "down";
}

// Зарисовка игры

const appler = new Image();
appler.src = "./images/applered.png";

const appleg = new Image();
appleg.src = "./images/applegreen.png";

const appleb = new Image();
appleb.src = "./images/applebad.png";

const appleh = new Image();
appleh.src = "./images/applehungry.png";

const bug = new Image();
bug.src = "./images/bug.png";

const background = new Image();
background.src = "./images/backgame.jpg";

// Движок

background.onload = function () {
  game();
};
function game() {
  update();
  render();
  requestAnimationFrame(game);
}

// ОБНОВЛЕНИЕ

function update() {
  timer++;

  if (juk[0].x >= 1000) {
    juk[0].x = 10 * box;
    juk[0].y = 17 * box;
    life -= 1;
  }

  if (juk[0].y >= 1000) {
    juk[0].x = 10 * box;
    juk[0].y = 17 * box;
    life -= 1;
  }

  if (juk[0].x <= 1) {
    juk[0].x = 10 * box;
    juk[0].y = 17 * box;
    life -= 1;
  }

  if (juk[0].y <= 1) {
    juk[0].x = 10 * box;
    juk[0].y = 17 * box;
    life -= 1;
  }

  if (timer % 100 == 0) {
    foodr.push({
      x: Math.floor(Math.random() * 20 + 1) * box,
      y: -box,
      vx: Math.floor(Math.random() * 7 + 1),
    });
  }

  if (timer % 100 == 0) {
    foodg.push({
      x: Math.floor(Math.random() * 20 + 1) * box,
      y: -box,
      vx: Math.floor(Math.random() * 7 + 1),
    });
  }

  if (timer % 50 == 0) {
    foodh.push({
      x: Math.floor(Math.random() * 20 + 1) * box,
      y: -box,
      vx: Math.floor(Math.random() * 7 + 1),
    });
  }

  if (timer % 50 == 0) {
    foodb.push({
      x: Math.floor(Math.random() * 20 + 1) * box,
      y: -box,
      vx: Math.floor(Math.random() * 7 + 1),
    });
  }

  let jukX = juk[0].x;
  let jukY = juk[0].y;

  for (i in foodr) {
    foodr[i].y += foodr[i].vx;
    foodr[i].x += 0;

    if (foodr[i].y >= 1000) foodr.splice(i, 1);

    if (Math.abs(jukX - foodr[i].x) < 45 && Math.abs(jukY - foodr[i].y) < 45) {
      score += 2;
      foodr.splice(i, 1);
    }
  }

  for (i in foodg) {
    foodg[i].y += foodg[i].vx;
    foodg[i].x += 0;

    if (foodg[i].y >= 1000) foodg.splice(i, 1);

    if (Math.abs(jukX - foodg[i].x) < 45 && Math.abs(jukY - foodg[i].y) < 45) {
      score += 1;
      foodg.splice(i, 1);
    }
  }

  for (i in foodb) {
    foodb[i].y += foodb[i].vx;
    foodb[i].x += 0;

    if (foodb[i].y >= 1000) foodb.splice(i, 1);

    if (Math.abs(jukX - foodb[i].x) < 45 && Math.abs(jukY - foodb[i].y) < 45) {
      score -= 2;
      foodb.splice(i, 1);
    }
  }

  for (i in foodh) {
    foodh[i].y += foodh[i].vx;
    foodh[i].x += 0;

    if (foodh[i].y >= 1000) foodh.splice(i, 1);

    if (Math.abs(jukX - foodh[i].x) < 45 && Math.abs(jukY - foodh[i].y) < 45) {
      score += 0.5;
      foodh.splice(i, 1);
    }
  }

  juk.pop();

  if (dvij == "left") {
    jukX += box;
    dvij = "stop";
  }
  if (dvij == "right") {
    jukX -= box;
    dvij = "stop";
  }
  if (dvij == "down") {
    jukY -= box;
    dvij = "stop";
  }
  if (dvij == "up") {
    jukY += box;
    dvij = "stop";
  }

  let newjuk = {
    x: jukX,
    y: jukY,
  };

  juk.unshift(newjuk);

  if (score <= 0) score = 0;
  if (life <= 0) {
    life = 3;
    score = 0;
  }
}

// ЗАГРУЗКА

function render() {
  gtx.drawImage(background, 0, 0);

  for (let i = 0; i < juk.length; i++) {
    gtx.drawImage(bug, juk[i].x, juk[i].y, 50, 50);
  }

  for (i in foodr) {
    gtx.drawImage(appler, foodr[i].x, foodr[i].y, 50, 50);
  }

  for (i in foodg) {
    gtx.drawImage(appleg, foodg[i].x, foodg[i].y, 50, 50);
  }

  for (i in foodb) {
    gtx.drawImage(appleb, foodb[i].x, foodb[i].y, 50, 50);
  }

  for (i in foodh) {
    gtx.drawImage(appleh, foodh[i].x, foodh[i].y, 50, 50);
  }

  gtx.fillStyle = "white";
  gtx.font = "70px Arial";
  gtx.fillText(score, 50, 70);

  gtx.fillStyle = "red";
  gtx.font = "70px Arial";
  gtx.fillText(life, 50, 130);
}

// Для браузеров

var RAF = (() => {
  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 20);
    };
})();
