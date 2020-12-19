"use strict"
let playing = false;
let click = 0;
let startTime;
let intervalID;
let curentTime;
let results = [];
let timeForGame = 60;
let createBoxOnTime;
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
      let fewBoxes = new FewBoxes(0, 2);
      fewBoxes.create();
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
    let fewBoxes = new FewBoxes('0', '2');
    fewBoxes.create();
    createBoxOnTime= setTimeout(function create(){
      let fewBoxes = new FewBoxes('0', '2');
      fewBoxes.create();
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

  if (curentTime <= 0) { gameOver();}   
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

class Box {
  constructor(coordinates, boxColor, lifeTime) {
    this.coordinates = coordinates; 
    this.boxColor = boxColor; 
    this.lifeTime = lifeTime; 
  }
  create() {      
    let box = document.querySelector(`[num ="` + this.coordinates.generate(this.HTMLcolection)[0] + `"]`);
    box.classList.add('box');    
    this.boxColor.generate(box);    
    this.lifeTime.get(box);
  }
}

class BoxCoordinates { 
  constructor(HTMLcolection){
    this.HTMLcolection = HTMLcolection;
  }
  
  generate() { 
    let num = Math.round(Math.random() * (this.HTMLcolection.length) + 0.5);
    return[num];
  }
}

class BoxColor {  
  constructor(box){
    this.box = box;
  }

  generate(box){
   let color;
   let colorNum = Math.round(Math.random() * (4) - 0.5);
   if (colorNum == 0 ) {color ="green"}
   else if (colorNum == 1) {color ="yellow"}
   else if (colorNum == 2) {color ="red"}
   else {color = "linear-gradient(135deg, orange, blue"};
   if (colorNum == 3) {box.setAttribute("style", "background:"+ color)} 
   else {box.setAttribute("style", "background-color:"+ color);}
  }
} 

class Lifetime {  
  constructor(box){
    this.box = box;
  }
  
  get(box){
    if (box.getAttribute("style") == "background-color:red") {setTimeout(removeBox, 2000)}        
    else if (box.getAttribute("style") == "background-color:yellow"){setTimeout(removeBox, 3000)}
    else {setTimeout(removeBox, 5000)};
    function removeBox(){
      box.classList.remove('box');
      box.removeAttribute("style", "background-color")
    }
  }
}
 

 
// генерация кол-ва кубиков за клик от 0  до 2
class FewBoxes{
  constructor(min, max){
    this.min = min;
    this.max = max;
  }
  create(){
    for (let i = 0; i < (Math.round(this.min - 0.5 + Math.random() * (this.max - this.min + 1))); i++) {
      let box = new Box(new BoxCoordinates(cellColection), new BoxColor(), new Lifetime());
      box.create();
      let BoxOnField = 0;
      for (let i = 0; i < cellColection.length; i++) {
        if (cellColection[i].classList.contains('box')) {
        BoxOnField += 1
        };
      }
      if (BoxOnField == 0) {
        let box = new Box(new BoxCoordinates(cellColection), new BoxColor(), new Lifetime());
        box.create();
      }
    }
  }
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
  clearTimeout(createBoxOnTime);
  click = 0;
  point.textContent = click;
}