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
let keysDown={}
function setupKeyboardListener(){
    document.addEventListener("keydown",function(event){
        console.log("무슨 키 눌림?",event.key)
        keysDown[event.key]=true;
        console.log("키다운 객체에 들어간 값은?",keysDown);
    });
    document.addEventListener("keyup",function(event){
        delete keysDown[event.key]
        console.log("버튼 클릭 후", keysDown);
    })
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
setupKeyboardListener();
main();