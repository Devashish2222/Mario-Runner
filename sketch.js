var Scene,Scene_img,Ground;
var Mario,Mario_running;
var WallGroup,wall_img;
var CoinGroup,coinImage;
var Coin;

function preload()
{
  Scene_img = loadImage("Sun.png")
  Mario_running = loadAnimation("Mario (1).png","Mario (2).png","Mario (3).png","Mario (4).png","Mario (5).png","Mario (6).png","Mario (7).png","Mario (8).png","Mario (9).png","Mario (10).png","Mario (11).png","Mario (12).png");
  coinImage = loadAnimation("Coin1 (1).png","Coin1 (2).png","Coin1 (3).png","Coin1 (4).png","Coin1 (5).png","Coin1 (6).png","Coin1 (7).png","Coin1 (8).png","Coin1 (9).png","Coin1 (10).png","Coin1 (11).png","Coin1 (12).png","Coin1 (13).png","Coin1 (14).png","Coin1 (15).png","Coin1 (16).png","Coin1 (17).png","Coin1 (18).png","Coin1 (19).png","Coin1 (20).png","Coin1 (21).png","Coin1 (22).png","Coin1 (23).png","Coin1 (24).png","Coin1 (25).png","Coin1 (26).png","Coin1 (1).png","Coin1 (27).png","Coin1 (28).png","Coin1 (29).png","Coin1 (30).png","Coin1 (31).png","Coin1 (32).png","Coin1 (33).png","Coin1 (34).png","Coin1 (35).png","Coin1 (36).png","Coin1 (37).png","Coin1 (38).png","Coin1 (39).png");
}

function setup()
{
  canvas = createCanvas(800,400);

  Scene=createSprite(0,0,800,400);
  Scene.addImage(Scene_img);
  Scene.scale=1;
  Scene.x=Scene.width/2;
  Scene.velocityX=-5;
  
  Mario = createSprite(100,340,20,50);
  Mario.addAnimation("Running",Mario_running);
  Mario.scale = 0.1;
  
  Ground = createSprite(400,350,800,10);
  Ground.velocityX=-5;
  Ground.x=Ground.width/2;
  Ground.visible=false;

  WallGroup = new Group();
  CoinGroup = new Group();
  Coin = 0;

}

function draw()
{

  if(Ground.x<0) 
  {
    Ground.x=Ground.width/2;
  }

  if(Scene.x<100)
  {
    Scene.x=Scene.width/2;
  }

  if(CoinGroup.isTouching(Mario))
  {
    CoinGroup.destroyEach();
    score = Coin + 2;
  }

  switch(Coin){
    case 10: Mario.scale=0.12;
            break;
    case 20: Mario.scale=0.14;
            break;
    case 30: Mario.scale=0.16;
            break;
    case 40: Mario.scale=0.18;
            break;
    default: break;
}

  if(keyDown("space") && Mario.y >= 359)
  {
    Mario.velocityY = -12 ;
  }
  Mario.velocityY = Mario.velocityY + 0.8;

  Mario.collide(Ground);
  spawnCoin();
  spawnWalls();

  if(WallGroup.isTouching(Mario))
  { 
    Mario.scale=0.08;
    score= Coin-2;
  }

  camera.position.x = Mario.x;  
  camera.position.y = Mario.y;
   
  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ Coin, 500,50);
}

function spawnCoin() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var coin = createSprite(600,250,40,10);
    coin.y = random(120,200);    
    coin.addAnimation("Coins",coinImage);
    coin.scale = 0.5;
    coin.velocityX = -5;
     //assign lifetime to the variable
    coin.lifetime = 300;
    Mario.depth = coin.depth + 1;
    
    //add each coin to the group
    CoinGroup.add(coin); 
  }
}

function spawnWalls() {
  if(frameCount % 300 === 0) {
    var wall = createSprite(800,350,10,40);
    wall.velocityX = -6;
    
    //assign scale and lifetime to the wall     
    wall.scale = 0.2;
    wall.lifetime = 300;
    
    //add each wall to the group
    WallGroup.add(wall);
  }
}