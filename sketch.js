var score, bird, bar, ring, ring2, pipeTop, pipeBot, bg, status;

function setup() {
  createCanvas(700, 512); 
  imageMode("center");
  textAlign(CENTER, CENTER);
  textSize(24);
  rectMode("center");
  score = 0;
  ringSpeed = 1;
  bg = new Sprite(images.day);
  bg2 = new Sprite(images.day);
  bg2.x = bg.x + bg.width;
  bird = new Animation(images.bird,3,44,34,0.1);
  bar = new Animation(images.bar,3,700,100,0.2);
  bar.y = height - 50;
  ring = new Animation(images.ring,64,64,64,1);
  ring.moveTo(width+100,randint(100,275))
  ring.speed = 1;
  ring2 = new Animation(images.ring,64,64,64,1);
  ring2.moveTo(40,height - 40);
  pipeTop = new Sprite(images.pipeTop);
  pipeBot = new Sprite(images.pipeBot);
  endTitle = new Sprite(images.endTitle);
  startTitle = new Sprite(images.startTitle);
  state = function(){intro();}
}

function draw() {
  state();
}

function intro(){
  bg.draw();
  startTitle.draw();
  shadowText("Click to start",width / 2, startTitle.y + 42,"white","black");
  //button("Start!",100,100,200,100,"blue","white");
  if(mouseIsPressed){
    var d = dist(mouseX, mouseY, width / 2, startTitle.y + 42);
    if (d < 100) {
      state = function(){game();}
    }
  }
  bar.draw();
}
function game(){
  scrollBackground(-1);
  bird.draw();
  bird.y = bird.y + 2;
  if(mouseIsPressed){
    bird.y -= 4;
    if(!audios.wing.isPlaying()){
      audios.wing.play();
    }
  }
  ring.draw();
  ring.x = ring.x - ring.speed;
  pipeTop.moveTo(ring.x,ring.y - pipeTop.height / 2 - 50);
  pipeBot.moveTo(ring.x,ring.y + pipeBot.height / 2 + 50);
  bar.draw();
  ring2.draw();
  shadowText(" x " + score,ring2.x + 50, ring2.y,"brown","black");
  if(intersectRect(bird,bar)||intersectRect(bird,pipeBot)||intersectRect(bird,pipeTop)){
    state = function(){ending();}
    audios.hit.play();
    audios.gameOver.play();
  }
  if(intersectRect(bird,ring)){
    score = score + 1;
    audios.point.play();
    ring.visible = false;
  }
  if(pipeTop.isOffScreen("left")){
    ring.moveTo(width+100,randint(100,275))
    ring.visible = true;
    ring.speed++;
  }
}
function ending(){
  endTitle.draw();
  bar.draw();
  shadowText("Click to play again", width / 2, height - 40,"brown","black");
  if(mouseIsPressed){
    var d = dist(mouseX, mouseY, width / 2 , height - 40);
    if (d < 100) {
      state = function(){setup();}
    }
  }
  ring2.draw();
  shadowText(" x " + score,ring2.x + 50, ring2.y,"brown","black");
}
function shadowText(msg,x,y,foreColor,backColor){
  fill(backColor);
  text(msg,x, y);
  fill(foreColor);
  text(msg,x - 1, y - 1);
}
function button(msg,x,y,w,h,foreColor,backColor){
  noStroke();
  fill(backColor);
  rect(x,y,w,h,20)
  fill(foreColor);
  rect(x,y,w - 2,h - 2,20)
}
function scrollBackground(amt){
  bg.draw();
  bg2.draw();
  bg.x += amt;
  bg2.x += amt;
  if(bg.x < -bg.width / 2) bg.x = bg2.x + bg2.width;
  if(bg2.x < -bg2.width / 2) bg2.x = bg.x + bg.width;
}


