//캔버스 세팅
let canvas;
let ctx;

canvas =document.createElement("canvas");
ctx= canvas.getContext("2d");
canvas.width=400;
canvas.height=550;
document.body.appendChild(canvas);


let spaceImage,spaceshipImage,bulletImage,enemyImage,gameImage;
let gameOver=false;
let score=0;
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
        this.alive=true;
        bulletList.push(this);
    };
    this.update=function(){
        this.y-=7;
    };
    this.checkHit=function(){
        for(let i=0; i<enemyList.length; i++){
            if(this.y <= enemyList[i].y && this.x>=enemyList[i].x && this.x<=enemyList[i].x+40){
                score++;
                this.alive=false;
                enemyList.splice(i,1);
            }
        }
        
    }
}
function generateRandomValue(min,max){
    let randomNum=Math.floor(Math.random()*(max-min+1))+min;//floor :내림 함수 
    return randomNum;
}
let enemyList=[];
function Enemy(){
    this.x=0;
    this.y=0;
    this.init=function(){
        this.y=0;
        this.x=generateRandomValue(0,canvas.width-48);
        enemyList.push(this);
    };
    this.update=function(){
        this.y +=2;

        if(this.y >=canvas.height-48){
            gameOver=true;
            console.log("gameover");
        }
    }
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
function createEnemy(){
    const interval= setInterval(function(){
        let e =new Enemy();
        e.init();
    },1000);
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
        if(bulletList[i].alive){
            bulletList[i].update();
            bulletList[i].checkHit();
        }       
    }
    for(let i=0;i<enemyList.length;i++){
        enemyList[i].update();
    }
}

function render(){
    ctx.drawImage(spaceImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY);
    ctx.fillText(`Score:${score}`,20,20);
    ctx.fillStyle="white";
    ctx.font ="20px Arial"
    for(let i=0; i<bulletList.length; i++){
        if(bulletList[i].alive){
            ctx.drawImage(bulletImage,bulletList[i].x,bulletList[i].y);    
        }
    }
    for(let i=0;i<enemyList.length;i++){
        ctx.drawImage(enemyImage,enemyList[i].x,enemyList[i].y);
    }
}
function main(){
    if(!gameOver){
    update();//좌표값 업데이트
    render();//그리기
    requestAnimationFrame(main);
}else{
    ctx.drawImage(gameImage,10,50,380,200);
}
}
loadImage();
setupKeyboardListener();
createEnemy();
main();