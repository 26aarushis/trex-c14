var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var clouds, cloudsImage;
var obstacle, obstacleImage1, obstacleImage2, obstacleImage3, obstacleImage4, obstacleImage5, obstacleImage6;
var ran;
var score;
var obstaclesGroup;
var cloudsGroup;

function preload() {
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadImage("trex_collided.png");
    groundImage = loadImage("ground2.png");
    cloudsImage = loadImage("cloud.png");
    obstacleImage1 = loadImage("obstacle1.png");
    obstacleImage2 = loadImage("obstacle2.png");
    obstacleImage3 = loadImage("obstacle3.png");
    obstacleImage4 = loadImage("obstacle4.png");
    obstacleImage5 = loadImage("obstacle5.png");
    obstacleImage6 = loadImage("obstacle6.png");
}

function setup() {
    createCanvas(600, 200);

    //create a trex sprite
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.scale = 0.5;
    
    //create a ground sprite
    ground = createSprite(300,180,600,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
   
    invisibleGround = createSprite(300,190,600,10);
    invisibleGround.visible = false;

    score = 0;
   
    obstaclesGroup = new Group();
    cloudsGroup = new Group();
   // var ran = Math.round(random(10,100));
  //  console.log(ran);
   
}

function draw() {
    background(180);
    
    if(gameState === PLAY){
        ground.velocityX = -4;
   
    //jump when the space button is pressed
   
        if (keyDown("space") && trex.y >= 160)   {
            trex.velocityY = -13;
        }

        trex.velocityY = trex.velocityY + 0.8

        if (ground.x < 0) {
            ground.x = ground.width / 2;
        }

        score = score + (Math.round(frameCount/60)); 

        if(trex.isTouching(obstaclesGroup)){
            gameState = END;
        }
        
        spawnClouds();
        spawnObstacles();
    }
    else if(gameState === END){
        ground.velocityX = 0;
        obstaclesGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);
    }
    //console.log(trex.y);

    trex.collide(invisibleGround);
    
    text ("Score: "+score, 500,50);

    drawSprites();
}

function spawnClouds(){
    if(frameCount%(Math.round(random(50,80))) === 0){
        clouds = createSprite(610,50,10,10);
        clouds.lifetime = 200
        clouds.addImage(cloudsImage);
        clouds.scale = random(0.09,0.3);
        clouds.velocityX = -3;
        clouds.y = Math.round(random(10,80));
        clouds.depth = trex.depth;
        trex.depth = trex.depth +1
        console.log(trex.depth);
        
        console.log(clouds.depth);
        cloudsGroup.add(clouds);
    }
}

function spawnObstacles(){
    if(frameCount%60 === 0){
        obstacle = createSprite(610,165,10,40);
        obstacle.velocityX = -3;
        obstacle.lifetime = 200;
        obstacle.addImage(obstacleImage1);
        obstacle.scale = random(0.09,0.1);
       
        ran  = Math.round(random(1,6));
        switch(ran){
            case 1: obstacle.addImage(obstacleImage1);
                  
                    break;
            case 2: obstacle.addImage(obstacleImage2);
                   break;
            case 3: obstacle.addImage(obstacleImage3);
                   break;
            case 4: obstacle.addImage(obstacleImage4);
                   break;
            case 5: obstacle.addImage(obstacleImage5);
                   break;
            case 6: obstacle.addImage(obstacleImage6);
                   break;
            default:  

        
        }
        
        obstaclesGroup.add(obstacle);
        /*if(ran === 1) {
            obstacle.addImage(obstacleImage1);
        }
        else if(ran === 2) */
      
    }
}