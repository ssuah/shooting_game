//캔버스 세팅
let canvas;
let ctx;

canvas =document.createElement("canvas");
ctx= canvas.getContext("2d");
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas);


let spaceImage,spaceshipImage,bulletImage,enemyImage,gameImage;
//우주선좌표 
let spaceshipX=canvas.width/2-32;
let spaceshipY=canvas.height-64;
function loadImage(){
    spaceImage = new Image();
    spaceImage.src="images/space.jpg";

    spaceshipImage = new Image();
    spaceshipImage.src="images/spaceship.png"

    bulletImage = new Image();
    bulletImage.src="images/bullet.png"

    enemyImage =new Image();
    enemyImage.src="images/enemy.png"

    gameImage= new Image();
    gameImage.src="images/game.jpg"
}

function render(){
    ctx.drawImage(spaceImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY);
}
function main(){
    render()
    requestAnimationFrame(main)
}
loadImage();
main();