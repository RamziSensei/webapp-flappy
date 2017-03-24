// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);


var score = 0;
var labelScore;
var player;
var pipes = [];
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {

game.load.image("playerImg", "../assets/ed.png");
game.load.image("backgroundImg", "../assets/ff14Back.jpg");
game.load.image("backgroundChange", "../assets/bg1.jpg");
game.load.audio("score", "../assets/point.ogg");
game.load.image("pipe", "../assets/pipe.png");
//jamesBond.gif

}

/*
 * Initialises the game. This function is only called once.
 */
function create() {

    // set the background colour of the scene
    //game.stage.setBackgroundColor("#68f442");
    var background = game.add.image(0, 0, "backgroundImg");
    game.physics.startSystem(Phaser.Physics.ARCADE);
    background.height = 400;
    background.width = 790;
    game.add.text(20, 20, "Welcome to my game", {font: "64px Arial", fill: "#asdsa"});
    //game.add.sprite(10, 270, "playerImg");
    //game.input.onDown.add(clickHandler);
    labelScore = game.add.text(20,5, score);

    player = game.add.sprite(100,200,"playerImg");
    game.physics.arcade.enable(player);
    player.body.gravity.y = 300;

    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
    generatePipe();

    game.input.keyboard
    .addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(playerJump);

    var pipeInterval = 1.75;
    game.time.events
    .loop(pipeInterval * Phaser.Timer.SECOND,
      generatePipe);

}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  for(var index = 0; index < pipes.length; index ++){
    game.physics.arcade.overlap(player, pipes[index], gameOver);
  }

  // easy way: game.physics.arcade.overlap(player,pipes,gameOver);
}

function gameOver(){
  alert("GAME OVER! Try again :()");
  location.reload();

}

function clickHandler(event){
  //alert("You have clicked on '" + event.x + ", " + event.y + ". \n\t\tWell done!");
  game.add.sprite(event.x - 64.5, event.y - 62.5, "playerImg");

}

function spaceHandler(){
  game.sound.play("score")


}

function changeScore(){
  score = score + 1;
  labelScore.setText(score.toString());
}

function moveRight(){
  player.x += 10;

}

function moveLeft(){
  player.x -= 10;
}

function moveUp(){
  player.y -=  10;

}

function moveDown(){
  player.y += 10;
}

function generatePipe(){
  var gapStart = game.rnd.integerInRange(1,5);
  for(var count = 0; count <8; count++){
    //game.add.sprite(20 * count, 50, "pipe");
    if (count != gapStart && count != gapStart + 1){
      addPipeBlock(750, count*50);
    }
  }
  changeScore();
}

function addPipeBlock(x,y){
  var pipeBlock = game.add.sprite(x,y,"pipe")
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -200;
}

function playerJump(){
  player.body.velocity.y = -200;
}
//  background = game.add.image(0, 0, "backgroundChange")
//  background.height = 400;
//  background.width = 790;
