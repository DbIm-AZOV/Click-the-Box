"use strict"
let playing = false;
let click = 1;
let startTime;
let intervalID;
let curentTime;
let name;
let result;
let results = [];
let timeForGame = 60;
const start = document.getElementById('start');
const newGame = document.getElementById('new game');
const point = document.getElementById('point');
const timeDisplay = document.getElementById('time');
const resultTable = document.getElementById('score');
const gamefield = document.querySelector('body > div > div.row.gamefield > div > div.container.row.gamefield');
const cellColection = document.getElementsByClassName('cell');


newGame.onclick = newGames;
start.onclick = startAndPaused;

//таймер
function startTimer() {
  startTime = Date.now(); 
  timer();
  intervalID = setInterval(timer, 250);        
}

function timer() {       
  curentTime = Math.floor(timeForGame - (((Date.now() - startTime) / 1000)));
  timeDisplay.textContent = curentTime;

  if (curentTime <= 0) {
    stopTimer();
    gameOver(); 
  }   
}

function stopTimer() {
  clearInterval(intervalID);
}


//cтарт-пауза
function startAndPaused(){
  if (playing == true){
    timeForGame = curentTime;
    stopTimer();
    alert("On paused");
    startTimer();
  }
  if ((click == 1) && (playing == false)) {
    newGames();
  }
}


//новая игра
function newGames() {
  if (playing == false) {    
    playing = true;
    timeForGame = 60;
    startTimer();
    createFewBoxes();        
  } else {
      timeForGame = curentTime;
      stopTimer();
      if (confirm('Do you want start a New game?')) {        
        gameOver();      
        newGames();
        click = 1;
      } else startTimer();
    }   
}


//создаем поле
for (let i = 1; i <= 99; i++) {
  const cell = document.createElement('div');
  cell.className = "coll cell";
  cell.setAttribute('num', i);
  gamefield.append(cell);    
}
 

// создание ящика
function createBox() {
 
  function generateBox() {
    let num = Math.round(Math.random() * (cellColection.length) + 0.5);
    return[num];
    }

  let coordinates = generateBox();
  let box = document.querySelector(`[num ="` + coordinates[0] + `"]`);
  if (box.classList.contains('box')) {
      createBox()};
    
  box.classList.add('box');  
  box.addEventListener('click', clickBox);  
}

 
// генерация кол-ва кубиков за клик от 0  до 2
function createFewBoxes() {
  for (let i = 0; i < (Math.round(Math.random() * (3) - 0.5)); i++) {
    createBox()
  }
        
  let BoxOnField = 0;
    
  for (let i = 0; i < cellColection.length; i++) {
    if (cellColection[i].classList.contains('box')) {
        BoxOnField += 1
    };
  }
    if (BoxOnField == 0) {
        createBox()
    };
}


//клик по ящику
function clickBox() {
  point.textContent = click++;
  this.classList.remove('box');
  this.removeEventListener('click', clickBox );    
  createFewBoxes();
}


function gameOver() { 
 
  let user = {Name: prompt(`Game over! Yours score = ${click-1} Enter your name`,''), Result: click - 1};
  results.push(user);
  results.sort((a, b) => a.result < b.result ? 1 : -1);
  resultTable.textContent = JSON.stringify(results).replace( /[ {"} ]+/g, " ");  

  localStorage.setItem(user).JSON.stringify(user);
  user = JSON.parse(localStorage.getItem("user"));
  
    for (let i = 0; i < cellColection.length; i++) {
        if (cellColection[i].classList.contains('box')) {
            cellColection[i].classList.remove('box');
            cellColection[i].removeEventListener('click', clickBox );
        }
    }

    playing = false;
    stopTimer(); 
    click = 0;
    point.textContent = click;
}

function sortByScore(){
  results
}