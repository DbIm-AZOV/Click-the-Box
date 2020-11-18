"use strict"
let playing= false;
let pausef= false;
let click= 1;
let startTime= Date.now();
let intervalID;
let curentTime;
const timeForGame= 60;
const start= document.getElementById('start');
const newGame= document.getElementById('new game');
const point= document.getElementById('point');
const timeDisplay= document.getElementById('time');
const score= document.getElementById('score');
const gamefield= document.querySelector('body > div > div.row.gamefield > div > div.container.row.gamefield');
const cellColection=document.getElementsByClassName('cell');

newGame.onclick= newGames;
start.onclick= startPaused;

//таймер
function timerStart() {
  startTime= Date.now(); 
  timer();
  intervalID= setInterval(timer, 1000);        
}

function timer() {       
  curentTime= Math.floor(timeForGame - (((Date.now() - startTime) / 1000)));
  timeDisplay.textContent= curentTime;

  if (curentTime <= 0) clearInterval(intervalID);    
}

function timerStop() {
  clearInterval(intervalID);
}


//cтарт-пауза
function startPaused(){
  if (playing == true){
    alert("On paused");
  }
  if ((click == 1) && (playing == false)) {
    newGames();
  }



}
//новая игра
function newGames() {
  if (playing == false) {    
    playing= true;
    timerStart();
    boxlevel();        
  } else {
      if (confirm('Do you want start a New game?')) {        
        gameOver();      
        newGames();
        click=1;
      }
    }   
}

//создаем поле
for (let i= 1; i <= 99; i++) {
  const cell= document.createElement('div');
  cell.className= "coll cell";
  cell.setAttribute('num', i);
  gamefield.append(cell);    
}
 
// создание ящика
function createbox() {
 
  function generateBox() {
    let num= Math.round(Math.random() * (cellColection.length) + 0.5);
    return[num];
    }

  let coordinates=generateBox();
  let box= document.querySelector(`[num="` + coordinates[0] + `"]`);
  if (box.classList.contains('box')) {
      createbox()};
    
  box.classList.add('box');  
  box.addEventListener('click', clickBox);  
}

 
// генерация кол-ва кубиков за клик от 0  до 2
function boxlevel() {
  for (let i= 0; i < (Math.round(Math.random() * (3) - 0.5)); i++) {
    createbox()
  }
        
  let BoxOnField= 0;
    
  for (let i = 0; i < cellColection.length; i++) {
    if (cellColection[i].classList.contains('box')) {
        BoxOnField += 1
    };
  }
    if (BoxOnField == 0) {
        createbox()
    };
}

//клик по ящику
function clickBox() {
  point.textContent= click++;
  this.classList.remove('box');
  this.removeEventListener('click', clickBox );    
  boxlevel();
}


function gameOver() {    
    
    for (let i = 0; i < cellColection.length; i++) {
        if (cellColection[i].classList.contains('box')) {
            cellColection[i].classList.remove('box');
            cellColection[i].removeEventListener('click', clickBox );
        }
    }

    playing= false;
    timerStop(); 
    click=0;
    point.textContent= click;
}
     
    
   



