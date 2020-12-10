"use strict"
let playing = false;
let click = 0;
let startTime;
let intervalID;
let curentTime;
let results = [];
let timeForGame = 60;
const start = document.getElementById('start');
const newGame = document.getElementById('new game');
const point = document.getElementById('point');
const timeDisplay = document.getElementById('time');
const resultTable = document.getElementById('score');
const gamefield = document.getElementById('gamefield');
const cellColection = document.getElementsByClassName('cell');
const clear = document.getElementById('clear');

results = JSON.parse(localStorage.getItem("results") || "[]");
resultTable.textContent = JSON.stringify(results).replace(/[\[\]{}"]+/g,' ');  
newGame.onclick = newGames;
start.onclick = startAndPaused;
clear.onclick = clearResult;


//создаем поле

  for (let i = 1; i <= 60; i++) {
    const cell = document.createElement('div');
    cell.className = "coll cell";
    cell.setAttribute('num', i);
    gamefield.append(cell);  
  }
 
  gamefield.onclick = function(event) {
    let target = event.target;
    if (target.classList.contains('box')) {
      if (target.getAttribute("style") == "background-color:red") {point.textContent = click +=3;}        
      else if (target.getAttribute("style") == "background-color:yellow"){point.textContent = click +=2;}
      else if (target.getAttribute("style") == "background:linear-gradient(135deg, orange, blue"){timeForGame +=2}
      else {point.textContent =  click +=1;};
      target.classList.remove('box');
      target.removeAttribute("style", "background-color");
      target.removeAttribute("style", "background")          
      createFewBoxes();
    }
    else {timeForGame -=2}
  }

//новая игра
function newGames() {
  
  if (playing == false) {    
    playing = true;
    timeForGame = 60;
    startTimer();
    createFewBoxes();
    let createBoxOnTime= setTimeout(function create(){
      createFewBoxes();
      createBoxOnTime = setTimeout(create, 1000);}, 1000); 
         
  } else {
      timeForGame = curentTime;
      stopTimer();
      if (confirm('Do you want start a New game?')) {        
        gameOver();      
        newGames();
        click = 0;
      } else startTimer();
    }   
}

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


function clearResult() {
  if (confirm('Do you want clear result?')){
    localStorage.clear(); 
    results = JSON.parse(localStorage.getItem("results") || "[]");
    resultTable.textContent = JSON.stringify(results).replace(/[\[\]{}"]+/g,' ');  
  } 

}


//cтарт-пауза
function startAndPaused(){
  if (playing == true){
    timeForGame = curentTime;
    stopTimer();
    alert("On paused");
    startTimer();
      }
  if ((click == 0) && (playing == false)) {
    newGames();
  }
}

function removeBox(){
  target.classList.remove('box');
  target.removeAttribute("style", "background-color") 
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
   
   let color;
   let colorNum = Math.round(Math.random() * (4) - 0.5);
   if (colorNum == 0 ) {color ="green"}
   else if (colorNum == 1) {color ="yellow"}
   else if (colorNum == 2) {color ="red"}
   else {color = "linear-gradient(135deg, orange, blue"};
   
  box.classList.add('box');
  if (colorNum == 3) {box.setAttribute("style", "background:"+ color)} 
  else {box.setAttribute("style", "background-color:"+ color);}

  // удаление по времени
    if (box.getAttribute("style") == "background-color:red") {setTimeout(removeBox, 2000)}        
    else if (box.getAttribute("style") == "background-color:yellow"){setTimeout(removeBox, 3000)}
    else {setTimeout(removeBox, 5000)};
    
    function removeBox(){
      box.classList.remove('box');
      box.removeAttribute("style", "background-color")
  }
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


function gameOver() { 
  results = JSON.parse(localStorage.getItem("results") || "[]");
  let user = {Name: prompt(`Game over! Yours score = ${click} Enter your name`,''), Result: click};
  if (user.Name != null) {
    results.push(user);
    results.sort((a, b) => a.Result < b.Result ? 1 : -1 );
    localStorage.setItem("results", JSON.stringify(results));
    resultTable.textContent = JSON.stringify(results).replace(/[\[\]{}"]+/g,' ');  
  }
  
  for (let i = 0; i < cellColection.length; i++) {
    if (cellColection[i].classList.contains('box')) {
    cellColection[i].classList.remove('box');
    cellColection[i].removeAttribute("style", "background-color");
    }
  }

  playing = false;
  stopTimer(); 
  click = 0;
  point.textContent = click;
}