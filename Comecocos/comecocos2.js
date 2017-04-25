var blue_ghost_img = new Image();
blue_ghost_img.src = "images/blueghost.png"
var red_ghost_img = new Image();
red_ghost_img.src = "images/redghost.png"
var pacman_img = new Image();
pacman_img.src = "images/pacman.png"

var coin_img = new Image();
coin_img.src = "images/coin.png"
var fruit_img = new Image();
fruit_img.src = "images/fruit.png"
var live_img = new Image();
live_img.src = "images/live.png"

fruitSound = document.getElementById("fruitSound");
playSound = document.getElementById("playSound")

var points;
var w;
var pacman;
var blueGhost;
var redGhost;
var walls = [];
var coins = [];
var lives = [];
var time = 120;
var secs = getRandomArbitrary(0,11);
var record = localStorage.getItem('record');

var fruits = [0,0,0,0]
var fruitsX = [20,20,425,425]
var fruitsY = [20,425,20,425]

//var scoreText =


var myGameArea = {
  canvas : document.getElementById('myGame'),

  start : function() {
      this.canvas.width = 460
      this.canvas.height = 510
      this.context = this.canvas.getContext("2d");
      //this.canvas.style.display='block';
      //this.context.font = "60px Verdana";
      this.frameNo = 0;
      this.interval = setInterval(updateGameArea, 20);
      //En el caso de que se apriete la tecla se llama al evento
      window.addEventListener('keydown', function (e) {
          myGameArea.key = e.keyCode;
      })
      //En el caso de que se levante la mano de la tecla se para
      window.addEventListener('keyup', function (e) {
          myGameArea.key = false;
      })
  },
  clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function() {
      clearInterval(this.interval);
  }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}


function startGame() {
    myGameArea.start();
    playSound.play()
    points = 0;

    //Se crean los personajes
    pacman = new component(29, 29, 215, 200, 0, 0, pacman_img,'char');
    blueGhost = new component(29, 29, 25, 140, 2, 0, blue_ghost_img,'char');
    redGhost = new component(29, 29, 343, 400, 0, -1, red_ghost_img, 'char');

    //Se crean las paredes
    //BORDES
    walls.push(new component(10, 460, 450, 0, 0, 0, 'blue', 'rect'));
    walls.push(new component(10, 460, 0, 0, 0, 0, 'blue', 'rect'));
    walls.push(new component(460, 10, 0, 0, 0, 0, 'blue', 'rect'));
    walls.push(new component(460, 10, 0, 450, 0, 0, 'blue', 'rect'));
    //PARTE SUPERIOR
    walls.push(new component(70, 40, 195, 10, 0, 0, 'blue', 'rect'));
    walls.push(new component(40, 90, 45, 45, 0, 0, 'blue', 'rect'));
    walls.push(new component(40, 90, 120, 45, 0, 0, 'blue', 'rect'));
    walls.push(new component(51, 40, 160, 95, 0, 0, 'blue', 'rect'));
    walls.push(new component(51, 40, 249, 95, 0, 0, 'blue', 'rect'));
    walls.push(new component(40, 90, 300, 45, 0, 0, 'blue', 'rect'));
    walls.push(new component(40, 90, 375, 45, 0, 0, 'blue', 'rect'));
    //PARTE CENTRAL
    walls.push(new component(70, 20, 195, 170, 0, 0, 'blue', 'rect'));
    walls.push(new component(20, 85, 175, 170, 0, 0, 'blue', 'rect'));
    walls.push(new component(20, 85, 265, 170, 0, 0, 'blue', 'rect'));
    walls.push(new component(10, 20, 195, 235, 0, 0, 'blue', 'rect'));
    walls.push(new component(10, 20, 255, 235, 0, 0, 'blue', 'rect'));
    walls.push(new component(130, 40, 10, 170, 0, 0, 'blue', 'rect'));
    walls.push(new component(70, 40, 10, 295, 0, 0, 'blue', 'rect'));
    walls.push(new component(35, 50, 45, 245, 0, 0, 'blue', 'rect'));
    walls.push(new component(20, 50, 120, 245, 0, 0, 'blue', 'rect'));
    walls.push(new component(70, 40, 380, 295, 0, 0, 'blue', 'rect'));
    walls.push(new component(130, 40, 320, 170, 0, 0, 'blue', 'rect'));
    walls.push(new component(20, 50, 320, 245, 0, 0, 'blue', 'rect'));
    walls.push(new component(35, 50, 380, 245, 0, 0, 'blue', 'rect'));
    //PARTE INFERIOR
    walls.push(new component(220, 40, 120, 295, 0, 0, 'blue', 'rect'));
    walls.push(new component(70, 80, 195, 335, 0, 0, 'blue', 'rect'));
    walls.push(new component(40, 40, 45, 375, 0, 0, 'blue', 'rect'));
    walls.push(new component(40, 80, 120, 370, 0, 0, 'blue', 'rect'));
    walls.push(new component(40, 80, 300, 370, 0, 0, 'blue', 'rect'));
    walls.push(new component(40, 40, 375, 375, 0, 0, 'blue', 'rect'));

    //Se crean las monedas
    //PRIMERA FILA
    coins.push(new component(15, 15, 20, 20, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 55, 20, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 95, 20, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 130, 20, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 170, 20, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 275, 20, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 315, 20, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 350, 20, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 385, 20, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 425, 20, 0, 0, coin_img, 'coin'));
    //PRIMERA COLUMNA
    coins.push(new component(15, 15, 20, 60, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 20, 100, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 20, 145, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 20, 222, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 20, 260, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 20, 350, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 20, 385, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 20, 425, 0, 0, coin_img, 'coin'));
    //ULTIMA FILA
    coins.push(new component(15, 15, 55, 425, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 95, 425, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 170, 425, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 205, 425, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 240, 425, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 275, 425, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 350, 425, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 385, 425, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 425, 425, 0, 0, coin_img, 'coin'));
    //ULTIMA COLUMNA
    coins.push(new component(15, 15, 425, 60, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 425, 100, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 425, 145, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 425, 222, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 425, 260, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 425, 350, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 425, 385, 0, 0, coin_img, 'coin'));
    //RESTO
    coins.push(new component(15, 15, 51, 145, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 82, 145, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 113, 145, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 144, 145, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 175, 145, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 206, 145, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 237, 145, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 268, 145, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 299, 145, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 330, 145, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 361, 145, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 392, 145, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 52, 222, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 84, 222, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 116, 222, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 150, 222, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 297, 222, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 329, 222, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 361, 222, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 393, 222, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 55, 350, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 95, 350, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 130, 350, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 170, 350, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 275, 350, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 310, 350, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 350, 350, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 385, 350, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 425, 350, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 95, 385, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 170, 385, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 275, 385, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 350, 385, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 95, 318, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 95, 286, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 95, 254, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 350, 318, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 350, 286, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 350, 254, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 95, 60, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 95, 100, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 222, 65, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 222, 105, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 350, 60, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 350, 100, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 180, 65, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 264, 65, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 150, 182, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 150, 265, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 297, 182, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 297, 265, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 187, 265, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 224, 265, 0, 0, coin_img, 'coin'));
    coins.push(new component(15, 15, 261, 265, 0, 0, coin_img, 'coin'));

    //Vidas
    for (var i=0;i<3;i++){
      lives.push(new component(30, 30, 20 + (25*i), 470, 0, 0, live_img, 'live'))
    }

}

function component(width, height, x, y, speedX, speedY, image, type) {
    this.width = width;
    this.height = height;
    this.speedX = speedX;
    this.speedY = speedY;
    this.x = x;
    this.y = y;
    this.image = image;
    this.type = type;
    if (this.type == "rect"){
        this.update = function() {
            ctx = myGameArea.context;
            ctx.fillStyle = image;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }else if (this.type == "text") {
        this.update = function() {
          ctx.font = this.width + " " + this.height;
          ctx.fillStyle = image;  // debería ser color
          ctx.fillText(this.text, this.x, this.y);
        }
    }else{
        this.update = function(){
            ctx = myGameArea.context;
            ctx.save();
            //Se translada a las coordenadas x e y indicadas y se incluye la rotacion para el caso en el que se choque
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

        }
    }
    this.newPos = function() {
      this.x += this.speedX;
      this.y += this.speedY;
    }
    this.crashWith = function(otherobj) {
      var myleft = this.x;
      var myright = this.x + (this.width);
      var mytop = this.y;
      var mybottom = this.y + (this.height);
      var otherleft = otherobj.x;
      var otherright = otherobj.x + (otherobj.width);
      var othertop = otherobj.y;
      var otherbottom = otherobj.y + (otherobj.height);
      var crash = true;
      if ((mybottom < othertop) ||
             (mytop > otherbottom) ||
             (myright < otherleft) ||
             (myleft > otherright)) {
         crash = false;
      }
      return crash;
    }
  }


function updateGameArea() {
    myGameArea.frameNo += 1;
    if (pacman.crashWith(blueGhost) || pacman.crashWith(redGhost)) {
        lives.pop();
        pacman.x = 215
        pacman.y = 200
    }
    if (lives.length == 0 || time == 0){
        setRecord();
        playVideo("videos/GameOver.mp4")

    } else if (coins.length == 0){
        getPoints('end')
        setRecord();
        playVideo("videos/clap.mp4")

    } else {
        myGameArea.clear();
        //Decremento del tiempo
        if (everyinterval(50)){
          time -= 1;
        }
        //Creacion de las frutas
        if (everyinterval(50*secs)){
          myGameArea.frameNo = 0;
          for (i = 0; i < fruits.length; i++){
            if (fruits[i] == 0){
              fruits[i] = new component(20, 20, fruitsX[i] , fruitsY[i], 0, 0, fruit_img, 'fruit')
            }
          }
        }
        //Movimiento del pacman
        lastposx = pacman.x
        lastposy = pacman.y
        if (myGameArea.key && myGameArea.key == 37) {pacman.speedX = -3;}
        if (myGameArea.key && myGameArea.key == 39) {pacman.speedX = 3;}
        if (myGameArea.key && myGameArea.key == 38) {pacman.speedY = -3;}
        if (myGameArea.key && myGameArea.key == 40) {pacman.speedY = 3;}
        if (myGameArea.key == false){pacman.speedX = 0; pacman.speedY = 0}
        pacman.newPos();
        //Comprobacion del choque con las paredes de personaje y fantasma
        for (i = 0; i < walls.length; i += 1) {
          if (pacman.crashWith(walls[i])){
              pacman.x = lastposx
              pacman.y = lastposy
              pacman.speedX = 0
              pacman.speedY = 0
          }
          if (redGhost.crashWith(walls[i])){
              redGhost.speedY = -redGhost.speedY;
          }
          if (blueGhost.crashWith(walls[i])){
              blueGhost.speedX = -blueGhost.speedX;
          }
        }
        //Actualizacion de posicion de fantasmas
        blueGhost.newPos();
        redGhost.newPos();

        //Coger monedas
        for (i = 0; i < coins.length; i += 1) {
          if (pacman.crashWith(coins[i])) {
            coins.splice(i,1);
            getPoints('coin');
          }
        }
        //Coger frutas
        for (i = 0; i < fruits.length; i += 1) {
          if(fruits[i] != 0){
            if (pacman.crashWith(fruits[i])) {
              fruits[i] = 0;
              getPoints('fruit');
              secs = getRandomArbitrary(0,11);
            }
          }
        }
        //Dibujar texto
        myGameArea.context.font = '13pt Arial';
        myGameArea.context.fillStyle = 'white';
        myGameArea.context.fillText('Time: '+ time, 150, 490);
        myGameArea.context.fillText('Score: '+ points, 250, 490);
        myGameArea.context.fillText('Record: '+ record, 350, 490);

        //Lives
        for (var i=0;i<lives.length;i++){
          lives[i].update();
        }
        //Dibujar monedas
        for (i = 0; i < coins.length; i += 1) {
          coins[i].update();
        }
        //Dibujar paredes
        for (i = 0; i < walls.length; i += 1) {
          walls[i].update();
        }
        //Dibujar frutas
        for (i = 0; i < fruits.length; i += 1) {
          if(fruits[i] != 0){
            fruits[i].update();
          }
        }
        //Dibujar personajes
        pacman.update();
        blueGhost.update();
        redGhost.update();
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("character", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var id = ev.dataTransfer.getData("character");

  	if(document.getElementById(id)==document.getElementById('drag1')){
  		pacman.image.src = "images/pacman.png";
  	}
  	if(document.getElementById(id)==document.getElementById('drag2')){
  		pacman.image.src = "images/pacman_blue.png";
  	}
  	if(document.getElementById(id)==document.getElementById('drag3')){
  		pacman.image.src = "images/pacman_pink.png";
  	}
}

function playVideo(source){
    playSound.pause();
    myGameArea.stop();
    myGameArea.canvas.setAttribute("style", "display:none");
    document.getElementById("charSel").style.display='none';
    video = document.createElement("video");
    video.src = source;
    video.setAttribute("preload", "auto");
    document.body.appendChild(video);
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getPoints(type) {
    if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
            w = new Worker("countPoints.js");
            w.postMessage({'type': type, 'points': points, 'time': time});
        }
        w.onmessage = function(event) {
            points = event.data;
        };
        w = undefined;
    } else {
        console.log("Sorry! No Web Worker support.");
    }
}

function setRecord(){
  if (typeof(Storage) !== "undefined") {
    if (record < points){
      localStorage.setItem("record", points);
    }
    record = localStorage.getItem("record");
  } else {
    console.log("Sorry, your browser does not support Web Storage...");
  }
}
