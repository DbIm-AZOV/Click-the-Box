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
        let posX= Math.round(Math.random()*(11-1)+1);
        let posY= Math.round(Math.random()*(8-1)+1);
        return[posX, posY];
    }
    let coordinates=generateBox();
    let box=[document.querySelector(`[posX="` + coordinates[0]+`"][posY = "` +
    coordinates[1]+`"]`)];
    box[0].classList.add('box');
}

createbox();
createbox();
createbox();

