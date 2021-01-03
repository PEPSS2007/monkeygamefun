var backImage,backgr;
var monkey , monkeyrunning
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score
 var survivaltime=0;

function preload(){
 backImage=loadImage("jungle.jpg");
  monkeyrunning =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
   }

function setup() {
  createCanvas(600, 600);
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4
  
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("walking", monkeyrunning);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1
  
  ground = createSprite(400,350,700,10);
  ground.velocityX=-5;
  ground.visible=false
  foodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  
}


function draw() {
  background("white");
  if(ground.x<300) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  if(keyDown("space") ) {
      monkey.velocityY = -10;
    }
    monkey.velocityY = monkey.velocityY + 0.5;
   monkey.collide(ground); 
  switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
   
  spawnBanana();
  spawnObstacles();
  
    if(obstaclesGroup.isTouching(monkey)){
        monkey.scale=0.08;
 }
  if(foodGroup.isTouching(monkey)){
    score=score+1
    foodGroup.destroyEach()
  }
  text("Survival time: "+ survivaltime, 100,50);
  stroke("black");
  textSize(20);
  fill("black");
  survivaltime=Math.ceil(frameCount/frameRate()) 
   drawSprites();
  text("Score: "+ score, 500,50); 
}

function spawnBanana() {
  //write code here to spawn the Food
  if (frameCount % 50 === 0) {
    banana = createSprite(600,300,40,10);
    banana.y = random(Math.round(220,400));    
    banana.velocityX = -6;
   banana.addImage(bananaImage);
     banana.scale=0.15;
    banana.lifetime = 1000;
    monkey.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 210 === 0) {
    obstacle = createSprite(800,320,10,10);
    obstacle.velocityX = -7;
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}
