"use strict"
let playing=false;
let click=1;
let timenow=60;
let newGame=document.getElementById('new game');
let point=document.getElementById('point');
let time=document.getElementById('time');
let score=document.getElementById('score');


//таймер
function starttimer(){
    let int=setInterval(timer, 1000);
    
    
    function timer(){
    let minutes = Math.floor(timenow/60);
    let seconds= timenow % 60;
    seconds= seconds<10?"0"+ seconds:seconds;
    time.textContent=`${minutes}:${seconds}`;
    timenow--;
    if (timenow<0) {clearInterval(int)};
}
}

//новая игра
function NG(){
    if (playing == false){    
     starttimer()
     boxlevel()
     playing=true} 
    else {    
     if ( confirm('Do you want a start New game?')) { 
         document.location.reload();
         playing=false;
         timenow=-1;
         point=0;
         NG();
         
         
         
    }
    }
}

newGame.onclick=NG;


//координаты ячеек
let cell= document.getElementsByClassName("cell")
let x= 1;
let y= 1;
for (let i=0 ; i<cell.length; i++){
    cell[i].setAttribute('posX', x);
    cell[i].setAttribute('posY', y);
    x++;
    if (x==12) {
        x=1;
        y++}    
}

// создание ящика
function createbox(){
    function generateBox(){
        let posX= Math.round(Math.random()*(11)+0.5);
        let posY= Math.round(Math.random()*(8)+0.5);
        return[posX, posY];
    }
    let coordinates=generateBox();
    let box=document.querySelector(`[posX="` + coordinates[0]+`"][posY = "` +
    coordinates[1]+`"]`);
    
    if (box.classList.contains('box')){createbox()};
    
    let pp=0;
    
    for (let i=0 ; i<cell.length; i++){
       
       if (cell[i].classList.contains('box')==true){pp+=1};
       
    }
    if (pp=0){createbox()};
    
    
    
    
    box.classList.add('box');  
    box.addEventListener('click',clickBox);  

}

        // от 0 одного до 2
       function boxlevel(){
        for (let i=0; i<(Math.round(Math.random()*(3)-0.5)); i++){
            createbox()
        }
    }
    //клик по ящику
    function clickBox(){
        point.textContent = click++;
        this.classList.remove('box');
        this.removeEventListener('click',clickBox);    
        boxlevel();

    }
    function gameover() {
        prompt('Enter you Name', name);
        for(let i=0; i,localStorage.length; i++){
            let key= localStorage.key(i);
        }
        

    }
    
   



