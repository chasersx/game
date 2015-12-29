var WATER_ROW = -12.50;
var LIFE_NUMBER = 3;

// Enemies our player must avoid
var Enemy = function(x, y) {//, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
	this.x = x;
	this.y = y;
	this.speed = Math.floor(Math.random() * (100 - 200) + 200);//speed;
    this.sprite = 'images/enemy-bug.png';
	
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	s = (Math.random() * 50 * dt);
    this.x += s;
    if (this.x > 480) this.x = 0;
    //this.call(this,x, y);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allEnemies = [];

//var enemy = new Enemy();
for (i=0; i<=4; i++) {
  var enemy = new Enemy();
  allEnemies[i] = new Enemy();
  allEnemies.push(enemy);
};



//allEnemies =.foreach(function() {}

//);

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//Player code------------------------------------------

var Player = function(x,y) {
	this.x = x;
	this.y = y;
	this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
	
	
	this.x * (dt);
	this.y * (dt);
	
	if (this.y <= WATER_ROW){
		player.reset();
	}
		
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction){
	if (this.x == 0 && (direction === 'left' || direction === 'a')){
		return;
	}
	if (this.x == 400 && (direction === 'right' || direction === 'd')){
		return;
	}
	if (this.y == 400 && (direction === 'down' || direction === 's')){
		return;
	}
	if(direction === 'left' || direction === 'a'){
		this.x -= 100;
	}
	if(direction === 'up' || direction === 'w'){
		this.y -= 82.5;
	}
	if(direction === 'right' || direction === 'd'){
		this.x += 100;
	}
	if(direction === 'down' || direction === 's'){
		this.y += 82.5;
	}
 };
 
 Player.prototype.reset = function() {
	 this.x = 200;
	 this.y = 400;
 }
 
//Life class. Displays and tracks number of hearts/lives
 var Life = function() {

    this.number = LIFE_NUMBER;
};


//Draw the 3 hearts
Life.prototype.render = function() {

    for (var x = 0; x < this.number; x++) {
        ctx.drawImage(Resources.get('images/Heart.png'), x * 45, 0);
    }

};
 
 var player = new Player(200,400);
 var life = new Life();
 
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
		87: 'w',
		65: 'a',
		83: 's',
		68: 'd'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
