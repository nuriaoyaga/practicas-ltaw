var maze_left = 150
var maze_top = 50
var maze_size = 500

var pacman
var ghosts =[]
var walls = []
var coins = []
var lives = []
var points = 0;
var frameNo = 0;
var time = 10

var key
var play
var canvas
var ctx

function Component(image,x,y,height,width,vel,type){
  if (type == "image") {
    this.image = new Image();
    this.image.src = image;
  }
  this.x = x
  this.y = y
  this.height = height
  this.width = width
  this.vel = vel

  this.draw = function() {
    if (type == "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = image;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  this.movex = function(vel) {
    this.x = this.x + vel
    if (checkPosition(this.x,this.y,this) == false){
      this.vel = -1 * this.vel
    }
  }

  this.movey = function(vel) {
    this.y = this.y + vel
    if (checkPosition(this.x,this.y,this) == false){
      this.vel = -1 * this.vel
    }
  }
}


function colision (posx, posy, rect1, rect2) {
  if (posx + rect1.width < rect2.x) {
    return false;
  }
  if (posy + rect1.height < rect2.y) {
    return false;
  }
  if (posx > rect2.x + rect2.width) {
    return false;
  }
  if (posy > rect2.y + rect2.height) {
    return false;
  }
    return true;
}

function checkDead(){
  var i;
  for (i=0;i<ghosts.length;i++){
    if (colision(pacman.x,pacman.y,pacman,ghosts[i])){
      return true
    }
  }
  return false
}

function checkPosition(x,y,component){
  var i;
  for (i=0;i<walls.length;i++){
    if (colision(x,y,component,walls[i]) || x < maze_left+5
        || x > maze_left + maze_size - component.width -5
        || y < maze_top +5 || y > maze_top + maze_size - component.height -5){
      return false
    }
  }
  return true
}

function everyinterval(n) {
    if ((frameNo / n) % 1 == 0) {
      frameNo = 0;
      return true;
    }
    return false;
}

function gameOver(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //clearInterval(play)
}

function winGame(){
  clearInterval(play)
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function createWalls(){
  walls.push(new Component("blue",maze_left+ 400, maze_top+50,5,50, 0, "rect"));
  walls.push(new Component("blue",maze_left+450, maze_top+100,50,5, 0, "rect"));
  walls.push(new Component("blue",maze_left+ 400, maze_top,150,5, 0, "rect"));
  walls.push(new Component("blue",maze_left+ 350, maze_top,100,5, 0, "rect"));
  walls.push(new Component("blue",maze_left+ 450, maze_top+150,5,50, 0, "rect"));
  walls.push(new Component("blue",maze_left+ 400, maze_top+200,5,100, 0, "rect"));
  walls.push(new Component("blue",maze_left+ 450, maze_top+300,5,50, 0, "rect"));
  walls.push(new Component("blue",maze_left+ 450, maze_top+250,50,5, 0, "rect"));
  walls.push(new Component("blue",maze_left+450, maze_top+350,150,5, 0, "rect"));
  walls.push(new Component("blue",maze_left, maze_top+100,5,205, 0, "rect"));
  walls.push(new Component("blue",maze_left+50, maze_top,50,5, 0, "rect"));
  walls.push(new Component("blue",maze_left+100, maze_top+50,50,5, 0, "rect"));
  walls.push(new Component("blue",maze_left+150, maze_top,50,5, 0, "rect"));
  walls.push(new Component("blue",maze_left+200, maze_top+50,5,100, 0, "rect"));
  walls.push(new Component("blue",maze_left+250, maze_top+100,5,105, 0, "rect"));
  walls.push(new Component("blue",maze_left+200, maze_top+100,50,5, 0, "rect"));
  walls.push(new Component("blue",maze_left+200, maze_top+150,5,150, 0, "rect"));
  walls.push(new Component("blue",maze_left+350, maze_top+150,50,5, 0, "rect"));
  walls.push(new Component("blue",maze_left+350, maze_top+250,50,5, 0, "rect"));
  walls.push(new Component("blue",maze_left+400, maze_top+200,250,5, 0, "rect"));
  walls.push(new Component("blue",maze_left+350, maze_top+350,50,5, 0, "rect"));
  walls.push(new Component("blue",maze_left+350, maze_top+450,50,5, 0, "rect"));
  walls.push(new Component("blue",maze_left+200, maze_top+250,5,150, 0, "rect"));
  walls.push(new Component("blue",maze_left+250, maze_top+250,150,5, 0, "rect"));
  walls.push(new Component("blue",maze_left+250, maze_top+400,5,105, 0, "rect"));
  walls.push(new Component("blue",maze_left+50, maze_top+450,5,250, 0, "rect"));
  walls.push(new Component("blue",maze_left, maze_top+400,5,50, 0, "rect"));
  walls.push(new Component("blue",maze_left+100, maze_top+400,5,100, 0, "rect"));
  walls.push(new Component("blue",maze_left, maze_top+150,5,150, 0, "rect"));
  walls.push(new Component("blue",maze_left+50, maze_top+200,5,100, 0, "rect"));
  walls.push(new Component("blue",maze_left+100, maze_top+200,150,5, 0, "rect"));
  walls.push(new Component("blue",maze_left, maze_top+250,5,50, 0, "rect"));
  walls.push(new Component("blue",maze_left+50, maze_top+300,5,50, 0, "rect"));
  walls.push(new Component("blue",maze_left, maze_top+350,5,105, 0, "rect"));
  walls.push(new Component("blue",maze_left+150, maze_top+200,100,5, 0, "rect"));
  walls.push(new Component("blue",maze_left+150, maze_top+350,5,100, 0, "rect"));
  walls.push(new Component("blue",maze_left+200, maze_top+250,50,5, 0, "rect"));
  walls.push(new Component("blue",maze_left+200, maze_top+200,5,100, 0, "rect"));
  walls.push(new Component("blue",maze_left+150, maze_top+450,50,5, 0, "rect"));
}

function createCoins(){
  //Por lineas
  //1
  coins.push(new Component("images/coin.png",maze_left + 15, maze_top + 15,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 70, maze_top + 15,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 120, maze_top + 15,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 170, maze_top + 15,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 220, maze_top + 15,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 270, maze_top + 15,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 320, maze_top + 15,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 370, maze_top + 15,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 420, maze_top + 15,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 470, maze_top + 15,20,20, 0, "image"))
  //2
  coins.push(new Component("images/coin.png",maze_left + 15, maze_top + 70,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 70, maze_top + 70,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 120, maze_top + 70,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 170, maze_top + 70,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 220, maze_top + 70,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 270, maze_top + 70,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 320, maze_top + 70,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 370, maze_top + 70,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 420, maze_top + 70,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 470, maze_top + 70,20,20, 0, "image"))
  //3
  coins.push(new Component("images/coin.png",maze_left + 15, maze_top + 120,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 70, maze_top + 120,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 120, maze_top + 120,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 170, maze_top + 120,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 220, maze_top + 120,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 270, maze_top + 120,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 320, maze_top + 120,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 370, maze_top + 120,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 420, maze_top + 120,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 470, maze_top + 120,20,20, 0, "image"))
  //4
  coins.push(new Component("images/coin.png",maze_left + 15, maze_top + 170,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 70, maze_top + 170,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 120, maze_top + 170,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 170, maze_top + 170,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 220, maze_top + 170,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 270, maze_top + 170,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 320, maze_top + 170,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 370, maze_top + 170,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 420, maze_top + 170,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 470, maze_top + 170,20,20, 0, "image"))
  //5
  coins.push(new Component("images/coin.png",maze_left + 15, maze_top + 220,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 70, maze_top + 220,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 120, maze_top + 220,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 170, maze_top + 220,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 220, maze_top + 220,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 270, maze_top + 220,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 320, maze_top + 220,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 370, maze_top + 220,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 420, maze_top + 220,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 470, maze_top + 220,20,20, 0, "image"))
  //6
  coins.push(new Component("images/coin.png",maze_left + 15, maze_top + 270,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 70, maze_top + 270,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 120, maze_top + 270,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 170, maze_top + 270,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 220, maze_top + 270,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 320, maze_top + 270,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 370, maze_top + 270,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 420, maze_top + 270,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 470, maze_top + 270,20,20, 0, "image"))
  //7
  coins.push(new Component("images/coin.png",maze_left + 15, maze_top + 320,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 70, maze_top + 320,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 120, maze_top + 320,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 170, maze_top + 320,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 220, maze_top + 320,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 270, maze_top + 320,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 320, maze_top + 320,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 370, maze_top + 320,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 420, maze_top + 320,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 470, maze_top + 320,20,20, 0, "image"))
  //8
  coins.push(new Component("images/coin.png",maze_left + 15, maze_top + 370,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 70, maze_top + 370,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 120, maze_top + 370,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 170, maze_top + 370,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 220, maze_top + 370,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 270, maze_top + 370,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 320, maze_top + 370,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 370, maze_top + 370,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 420, maze_top + 370,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 470, maze_top + 370,20,20, 0, "image"))
  //9
  coins.push(new Component("images/coin.png",maze_left + 15, maze_top + 420,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 70, maze_top + 420,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 120, maze_top + 420,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 170, maze_top + 420,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 220, maze_top + 420,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 270, maze_top + 420,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 320, maze_top + 420,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 370, maze_top + 420,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 420, maze_top + 420,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 470, maze_top + 420,20,20, 0, "image"))
  //10
  coins.push(new Component("images/coin.png",maze_left + 15, maze_top + 470,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 70, maze_top + 470,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 120, maze_top + 470,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 170, maze_top + 470,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 220, maze_top + 470,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 270, maze_top + 470,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 320, maze_top + 470,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 370, maze_top + 470,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 420, maze_top + 470,20,20, 0, "image"))
  coins.push(new Component("images/coin.png",maze_left + 470, maze_top + 470,20,20, 0, "image"))
}

function catchCoin(){
  var i;
  for (i=0;i<coins.length;i++){
    if (colision(pacman.x,pacman.y,pacman,coins[i])){
      console.log(coins.length)
      coins.splice(i,1)
      points = points + 1
    }
  }
}

function drawGame(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //Maze
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 5;
  ctx.rect(maze_left,maze_top,maze_size,maze_size);
  ctx.stroke();
  //coins
  var l;
  for (l=0;l<coins.length;l++){
    coins[l].draw()
  }
  //Ghosts
  var i;
  for(i=0;i<ghosts.length;i++){
    ghosts[i].draw();
  }
  //Pacman
  pacman.draw()
  //Walls
  var k;
  for (k=0;k<walls.length;k++){
    walls[k].draw()
  }
  //Text
  ctx.font = '11pt Arial';
  ctx.fillStyle = 'white';
  ctx.fillText('Score: '+ points, canvas.width-350, 25);
  ctx.fillText('Time: '+ time, canvas.width-250, 25);
  ctx.fillText('Lives: ' , canvas.width-150, 25);
  //Lives
  var j;
  for (j=0;j<lives.length;j++){
    lives[j].draw()
  }
}

function update(){
  frameNo = frameNo + 1;

  if (checkDead()){
    pacman.x = maze_left + 260
    pacman.y = maze_top + 260
    lives.pop()
  }

  if (lives.length == 0 || time == 0){
    gameOver()
  }

  if (coins.length == 0){
    winGame()
  }

  ghosts[0].movex(ghosts[0].vel)
  ghosts[1].movey(ghosts[1].vel)
  //ghosts[2].movey(ghosts[2].vel)
  //ghosts[3].movey(ghosts[3].vel)

  if (key && key == 37 && checkPosition(pacman.x-5,pacman.y,pacman)) {pacman.movex(-5); }
  if (key && key == 39 && checkPosition(pacman.x+5,pacman.y,pacman)) {pacman.movex(5); }
  if (key && key == 38 && checkPosition(pacman.x,pacman.y-5,pacman)) {pacman.movey(-5); }
  if (key && key == 40 && checkPosition(pacman.x,pacman.y+5,pacman)) {pacman.movey(5); }

  catchCoin()

  if (everyinterval(20)){
    time = time - 1
  }

  drawGame()
}


function startGame() {
  canvas = document.getElementById('game');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }
  ctx = canvas.getContext('2d');

  createWalls()

  createCoins()

  ghosts.push(new Component("images/redghost.png",maze_left + 5, maze_top + 410,30,28,5,"image"));
  //orangeghost = new Component("images/orangeghost.png",maze_left + maze_size -28,maze_top+(maze_size/2)-30,30,28,-5,"image");
  ghosts.push(new Component("images/blueghost.png",maze_left + 365,maze_top + 5,30,28,-5,"image"));
  //pinkghost = new Component("images/pinkghost.png",maze_left + (maze_size/2) -28,maze_top+maze_size-30,30,28,5,"image");

  pacman = new Component("images/pacman.png",maze_left+260 ,maze_top+260,30,30,0,"image");

  window.addEventListener('keydown', function (e) { key = e.keyCode;})
  window.addEventListener('keyup', function (e) {key = false;})

  var i;
  for (i=0;i<3;i++){
    lives.push(new Component("images/pacman.png",canvas.width-100 + (25*i), 10, 20,20,0,"image"))
  }

  play = setInterval(update, 50)

}
