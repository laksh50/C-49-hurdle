var PLAY = 1;
var END = 0;
var gameState = PLAY;
var racetrack;

var Boy1;
var Boy2;
var Boy3;
var Boy4;
var hurdles;
var Boy_running

var score
var score = 0;
var gameOver,restart;
var hurdlesGroup
function preload(){
  Boy_running =loadAnimation("images/Boy1.png","images/Boy2.png","images/Boy3.png","images/Boy4.png");

  racetrack_still = loadImage("images/racetrack.jpg");

  hurdles_still = loadImage("images/hurdles.png");

  gameOver_still = loadImage("images/gameoverglitch.png");

  restart_still = loadImage("images/restartglitch.png");

  Boy_still = loadAnimation("images/BoyCollides.png");



}

function setup() {
  createCanvas(1200,400);

  Boy1 = createSprite(50,180,20,50);
  Boy1.addAnimation("running", Boy_running);
  Boy1.debug = true;
  Boy1.setCollider("circle",0,0,40);
  //Boy1.scale = 1.0;
  racetrack = createSprite(600,300,1200,100);

  racetrack.addAnimation("racetrack",racetrack_still);
 racetrack.width = 2500;

 racetrack.scale = 3.0;
 racetrack.velocityX = -5;

 invisibleGround = createSprite(200,290,400,10);
 invisibleGround.visible = false;

 gameOver = createSprite(600,100);
 gameOver.addImage(gameOver_still);
 restart = createSprite(600,200);

 restart.addImage(restart_still);
 gameOver.scale = 0.2;
 restart.scale = 0.2;

 gameOver.visible = false;
 restart.visible = false;
hurdlesGroup = new Group();
text("Score: "+ score, 500,50);

}

function draw() {
  background("black");

racetrack.depth = Boy1.depth;
Boy1.depth = Boy1.depth+1;
Boy1.scale = 1.0;

  text("Score: "+ score, 500,50);

  
  
Boy1.collide(invisibleGround);


if (gameState===PLAY){
  score = score + Math.round(getFrameRate()/60);
  racetrack.velocityX = -(6 + 3*score/100);

  if(keyDown("space") && Boy1.y >= 159) {
    Boy1.velocityY = -12;
  }

  Boy1.velocityY = Boy1.velocityY + 0.5

  if(racetrack.x < 0){
    racetrack.x = racetrack.width/2;
}
    
  
  spawnHurdles();

if(hurdlesGroup.isTouching(Boy1)){
  gameState = END;
}
}
else if (gameState === END) {
  gameOver.visible = true;
  restart.visible = true;

  racetrack.velocityX = 0;
  Boy1.velocityY = 0;
  hurdlesGroup.setVelocityXEach(0);

  Boy1.changeAnimation("still",Boy_still);
  hurdlesGroup.setLifetimeEach(-1);


  if(mousePressedOver(restart)) {
    reset();
  }

}
racetrack.depth = 0;

   
  drawSprites();

}

function spawnHurdles(){
  if(frameCount % 120 === 0){
var hurdles = createSprite(600,300,50,30);
hurdles.addImage(hurdles_still);
console.log("Code not working");

hurdles.velocityX = -5;

console.log(hurdles.VelocityX);

hurdlesGroup.add(hurdles);
//assign scale and lifetime to the hurdles          

hurdles.scale = 0.3;
hurdles.lifetime = 300;
//add each hurdles to the group
hurdlesGroup.add(hurdles);
}

}
function reset(){
  gameState = PLAY;

  gameOver.visible = false;
  restart.visible = false;

  hurdlesGroup.destroyEach();
  Boy1.changeAnimation("running",Boy_running);
  score = 0;
  
}

