"use strict"
let playing=false;
let click=1;
let oneminute=60;
let newGame=document.getElementById('new game');
let point=document.getElementById('point');
let timedisplay=document.getElementById('time');
let score=document.getElementById('score');


//таймер
function starttimer(oneminute,timedisplay){
    let start=Date.now(); 
                  
    
    function timer(){
        let diff=oneminute-(((Date.now()-start)/1000)| 0);
        let minutes = (diff/60) | 0;
        let seconds= (diff % 60) | 0;
        minutes=minutes<10 ?"0"+ minutes:minutes;
        seconds= seconds<10?"0"+ seconds:seconds;
        timedisplay.textContent=minutes + ":"+ seconds;    
        if (diff<=0) {clearInterval(intervalID)};
    }

timer();
let intervalID=setInterval(timer, 1000);

}

//новая игра
function NG(){
    if (playing == false){    
        playing=true;
        starttimer(oneminute,timedisplay);
        boxlevel()
        } 
    else {    
     if ( confirm('Do you want start a New game?')) { 
        
         playing=false;
         click=1;
         clearInterval(intervalID);
         oneminute=60;
         
        NG();
         
               
    }
    }
}

newGame.onclick=NG;


//создаем поле
let gamefield=document.querySelector('body > div > div.row.gamefield > div > div.container.row.gamefield');
for (let i=1; i<=99; i++){
    let cell = document.createElement('div');
    cell.className="coll cell";
    cell.setAttribute('num', i);
    gamefield.append(cell);    
}
   let cell=document.getElementsByClassName('cell');



// создание ящика
function createbox(){
    
    function generateBox(){
        let num= Math.round(Math.random()*(cell.length)+0.5);
         return[num];
        }

    let coordinates=generateBox();
    let box=document.querySelector(`[num="` + coordinates[0]+`"]`);
    
    if (box.classList.contains('box')) {createbox()};
    
    box.classList.add('box');  
    box.addEventListener('click',clickBox);  
}

 // генерация кол-ва кубиков за клик от 0  до 2
function boxlevel(){
    for (let i=0; i<(Math.round(Math.random()*(3)-0.5)); i++){
            createbox()
        }
        let BoxOnField=0;
    
        for (let i=0 ; i<cell.length; i++){
           
           if (cell[i].classList.contains('box')==true){BoxOnField+=1};
           
        }
           if (BoxOnField==0){createbox()};
    }

    //клик по ящику
    function clickBox(){
        point.textContent = click++;
        this.classList.remove('box');
        this.removeEventListener('click',clickBox);    
        boxlevel();

    }
    function gameover() {
               }
     
    
   



