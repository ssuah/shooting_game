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

let bulletList =[];//총알리스트
function Bullet(){
    this.x=0;
    this.y=0;
    this.init=function(){
        this.x = spaceshipX + 20;
        this.y = spaceshipY;

        bulletList.push(this);
    };
    this.update=function(){
        this.y-=7;
    };
}

function loadImage(){
    spaceImage = new Image();
    spaceImage.src="images/space.jpg";

    spaceshipImage = new Image();
    spaceshipImage.src="images/spaceship.png";

    bulletImage = new Image();
    bulletImage.src="images/bullet.png";

    enemyImage =new Image();
    enemyImage.src="images/enemy.png";

    gameImage= new Image();
    gameImage.src="images/game.jpg";
}
let keysDown={};

function setupKeyboardListener(){
    document.addEventListener("keydown",function(event){
        
        keysDown[event.keyCode]=true;
    
    });
    document.addEventListener("keyup",function(event){
        delete keysDown[event.keyCode];
        if(event.keyCode ==32){
            createBullet();//총알 생성    
        }
    });
}
function createBullet(){
    console.log("총알생성");
    let b = new Bullet();
    b.init();
    console.log("새로운 총알 리스트",bulletList);
}
function update(){
    if( 39 in keysDown ){
        spaceshipX +=5;//우주선 속도 
    }
    if(37 in keysDown){
        spaceshipX -=5;
    }
    if(spaceshipX<=0){
       spaceshipX=0; 
    }
    if(spaceshipX >= canvas.width-64){
        spaceshipX=canvas.width-64;
    }
    for(let i = 0; i<bulletList.length; i++){
        bulletList[i].update();
    }
}

function render(){
    ctx.drawImage(spaceImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY);

    for(let i=0; i<bulletList.length; i++){
        ctx.drawImage(bulletImage,bulletList[i].x,bulletList[i].y);
    }
}
function main(){
    update();//좌표값 업데이트
    render();//그리기
    requestAnimationFrame(main);
}
loadImage();
setupKeyboardListener();
main();