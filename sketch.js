
var dog,dogImage;    
var dog1,dogImage2;
var database;
var foodS;
var foodStock;
var milk1,milk1Image;


function preload(){
dogImage = loadImage ("images/dogImg.png")
dogImage2 = loadImage ("images/dogImg1.png")
milk1Image = loadImage ("images/milk1.png")

}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

 dog = createSprite (250,300,10,10);
 dog.addImage (dogImage);
 dog.scale = 0.2;

milk1 = createSprite (200,350,10,10);
milk1.addImage (milk1Image);
milk1.scale = 0.07;
milk1.visible = false;

 foodStock = database.ref("food");
 foodStock.on ("value",readStock);
 foodStock.set(20);
}


function draw() { 
  background(150,105,205);
 
  if(foodS !== 0){
    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(dogImage2);
      milk1.visible = true;
     }
     if(keyWentUp(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(dogImage);
      milk1.visible = false;
     }
    }
 
    
  if(foodS == 0){
    dog.addImage(dogImage);
    foodS = 20;
  }

  drawSprites();
  textSize(17);
  fill("black");
  text("Long Press up arrow key to feed your pet dog ",50,50);
  fill("black");
  text("Milk Bottles Remaining  "+foodS,170,440);

 
  
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }
  database.ref('/').update({
    food:x
  })
}


