var Gamestate=0
var weapon
var cloudsGroup
var score=0
function preload(){
  battlebg=loadImage("battle bg.PNG")
  hero=loadImage("the hero.PNG")
  Hostage=loadImage("hostage.PNG") 
  Obstacle=loadImage("obstacle.PNG")
  WaterWeapon=loadImage("WaterWeapon.png")
}
function setup(){
  createCanvas(1000,1000)
  input=createInput("Your name")
  input.position(400,200)
  cloudsGroup=createGroup()
  button=createButton("PLAY")
  button.position(600,200)
  player=createSprite(30,150,40,20)
  player.addImage(hero)
  player.visible=false
  player.scale=0.5
  hostage=createSprite(900,150,40,20)
  hostage.addImage(Hostage)
  hostage.visible=false
  hostage.scale=0.5
  Enemy=createSprite(500,300)
  Enemy.visible=false

  Enemy1=createSprite(500,700)
  Enemy1.visible=false
  button.mousePressed(()=>{input.hide()
  button.hide()
  Gamestate=1
  })
}

function draw(){background(battlebg)
if(Gamestate===1){player.visible=true 
  hostage.visible=true
  fill("white")
  textSize(20)
  text("To Rescue the Hostage Click on the start button",200,200)

  Button1=createButton("Start")
  Button1.position(200,100)
  Button1.mousePressed(()=>{
    Button1.hide()
    Gamestate=2
  })
}
drawSprites()
  if(Gamestate===2){
    hostage.visible=false 
  spawnClouds()
  Button1.hide()
  if(keyDown("UP")){player.y-=5}
  if(keyDown("DOWN")){player.y+=5}
  if(keyDown("A")){weapons()}
  if(weapon!=null){
  for(var i=0;i<cloudsGroup.length;i++){
    if(cloudsGroup.get(i).isTouching(weapon)){
      cloudsGroup.get(i).destroy()
      //to remove the weapon
      weapon.remove()
      score=score+10
    }
  }
  }
  for(var i=0;i<cloudsGroup.length;i++){
    if(cloudsGroup.get(i).isTouching(player)){
      cloudsGroup.get(i).destroy()
      score=score-5
    }
  }
  fill("white")
  textSize(20)
  text("Score"+score,800,100)
  if(score>=250){Gamestate=3}
}
if (Gamestate===3){
  Enemy.visible=true
  Enemy1.visible=true
  EnemyWeapons()
}
}
function EnemyWeapons(){
  if (frameCount % 60 === 0) {
  var rand=Math.round(random(1,2))
  if(rand===1){
    weapon1=createSprite(Enemy.x,Enemy.y)
    weapon1.velocityX=-20
  }
  else if(rand===2){
    weapon2=createSprite(Enemy1.x,Enemy1.y)
    weapon2.velocityX=-20
  }
}
}

function weapons(){
  weapon=createSprite(player.x,player.y)
  weapon.addImage(WaterWeapon)
  weapon.velocityX=+9
  weapon.scale=0.2
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(100,600));
    cloud.addImage(Obstacle);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime =200;
    
    //adjust the depth
    
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}
