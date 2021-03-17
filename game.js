window.onload = function () {
  document
    .querySelector("#easymode")
    .addEventListener("click", function start() {
      if (runtime === false) {
        initGame(1, 30);
      }
    });

  document
    .querySelector("#hardmode")
    .addEventListener("click", function start() {
      if (runtime === false) {
        initGame(1, 0);
      }
    });

  function initGame(minutes, seconds) {
    runtime = true;
    let elements = document.querySelectorAll(".img");
    for (let element of elements) {
      element.remove();
    }
    let gameOverImage = document.querySelector("#gameover");
    gameOverImage.style.display = "none";
    counter = 0;
    movesCount = 0;
    document.getElementById("movesclick").innerText = 0;
    document.getElementById("score").innerText = 0;
    document.getElementById("timer").innerText = 0;

    countdown(minutes, seconds);
    clickCounter = 1;
    shuffleCards = shuffle(cards);
    createField();
    for (q = 0; q < shuffleCards.length; q++) {
      turnC(q);
    }
  }

  let counter = 0;
  let score = document.querySelector("#score");
  let clickCounter = 3;
  let runtime = false;
  let movesCount = 0;

  let cards = [
    { backimg: "img/back.png", frontimg: "img/lap1.png", code: "card1" },
    { backimg: "img/back.png", frontimg: "img/lap1.png", code: "card1" },
    { backimg: "img/back.png", frontimg: "img/lap2.png", code: "card2" },
    { backimg: "img/back.png", frontimg: "img/lap2.png", code: "card2" },
    { backimg: "img/back.png", frontimg: "img/lap3.png", code: "card3" },
    { backimg: "img/back.png", frontimg: "img/lap3.png", code: "card3" },
    { backimg: "img/back.png", frontimg: "img/lap4.png", code: "card4" },
    { backimg: "img/back.png", frontimg: "img/lap4.png", code: "card4" },
    { backimg: "img/back.png", frontimg: "img/lap5.png", code: "card5" },
    { backimg: "img/back.png", frontimg: "img/lap5.png", code: "card5" },
    { backimg: "img/back.png", frontimg: "img/lap6.png", code: "card6" },
    { backimg: "img/back.png", frontimg: "img/lap6.png", code: "card6" },
    { backimg: "img/back.png", frontimg: "img/lap7.png", code: "card7" },
    { backimg: "img/back.png", frontimg: "img/lap7.png", code: "card7" },
    { backimg: "img/back.png", frontimg: "img/lap8.png", code: "card8" },
    { backimg: "img/back.png", frontimg: "img/lap8.png", code: "card8" },
    { backimg: "img/back.png", frontimg: "img/lap9.png", code: "card9" },
    { backimg: "img/back.png", frontimg: "img/lap9.png", code: "card9" },
  ];

  let shuffleCards = shuffle(cards);

  //create cards
  function createField() {
    for (i = 0; i < shuffleCards.length; i++) {
      // div létrehozás js be.
      let gameField = document.querySelector(".gameField");
      let imgDiv = document.createElement("div");
      imgDiv.className = "img";
      gameField.appendChild(imgDiv);
      // add new image.
      let myImage = new Image(150);
      myImage.id = i;
      myImage.src = shuffleCards[i].backimg;
      imgDiv.appendChild(myImage);
    }
  }

  createField();

  let firstCard = "";
  let secondCard = "";
  let clicked = 0;

  //turn cards
  function turnC(id) {
    let a = document.getElementById(id);

    a.addEventListener("click", function turnCard() {
      if (clickCounter === 1 && a.src.includes("back.png")) {
        a.className = "img-active";
        setTimeout(function () {
          //delay
          a.src = shuffleCards[id].frontimg;
        }, 250);
        clicked = a;
        firstCard = shuffleCards[id].code;
        clickCounter++;
        setTimeout(function () {
          a.className = "img";
        }, 750);
      } else if (clickCounter === 2 && a.src.includes("back.png")) {
        a.className = "img-active";
        setTimeout(function () {
          //delay
          a.src = shuffleCards[id].frontimg;
        }, 250);
        secondCard = shuffleCards[id].code;
        clickCounter = 3;
        setTimeout(function () {
          a.className = "img";
        }, 750);
        movesCount++;
        document.getElementById("movesclick").textContent = movesCount;
        if (firstCard === secondCard) {
          counter++;
          score.textContent = counter;
          clickCounter = 1;
          winner();
        } else {
          setTimeout(function () {
            //delay
            a.src = shuffleCards[id].backimg; //2. kép click hátlap visszafordítása.
            clicked.src = shuffleCards[id].backimg; //1. kép click hátlap visszafordítása.
            clickCounter = 1;
          }, 1600);
        }
      }
    });
  }
  for (q = 0; q < shuffleCards.length; q++) {
    turnC(q);
  }

  //shuffle
  function shuffle(array) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  //timer countdown
  function countdown(minutes, seconds) {
    let hours, mins, msLeft, time;
    let timer = document.querySelector("#timer");
    let endTime = +new Date() + 1000 * (60 * minutes + seconds) + 500;

    function twoDigits(n) {
      if (n <= 9) {
        return "0" + n;
      } else {
        return n;
      }
    }

    function updateTimer() {
      console.dir(runtime);
      msLeft = endTime - +new Date();
      if (msLeft < 1000) {
        timer.innerHTML = "Time is up!";
        gameOver();
        return "";
      }
      if (runtime == false) {
        return "";
      } else {
        time = new Date(msLeft);
        hours = time.getUTCHours();
        mins = time.getUTCMinutes();
        timer.innerHTML =
          (hours ? hours + ":" + twoDigits(mins) : mins) +
          ":" +
          twoDigits(time.getUTCSeconds());
        setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
      }
    }

    updateTimer();
  }
  function winner() {
    if (counter === 9) {
      let gameOverImage = document.querySelector("#gameover");
      gameOverImage.src = "img/winnerfinal.jpg";
      gameOverImage.style.display = "block";
      runtime = false;
    }
  }

  function gameOver() {
    let gameOverImage = document.querySelector("#gameover");
    gameOverImage.src = "img/gameover.jpg";
    gameOverImage.style.display = "block";
    clickCounter = 3;
    runtime = false;
  }
};
