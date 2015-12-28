var WATER_ROW = -12.50;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
	this.x = x;
	this.y = y;
	this.speed = speed;
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
    if (this.x > 500) this.x = 0;
    //this.call(this,x, y);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allEnemies = [];

var enemy = new Enemy();
for (i=0; i<=4; i++) {
    enemy = new Enemy();
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
	if (this.x == 0 && direction === 'left'){
		return;
	}
	if (this.x == 400 && direction === 'right'){
		return;
	}
	if (this.y == 400 && direction === 'down'){
		return;
	}
	if(direction === 'left'){
		this.x -= 100;
	}
	if(direction === 'up'){
		this.y -= 82.5;
	}
	if(direction === 'right'){
		this.x += 100;
	}
	if(direction === 'down'){
		this.y += 82.5;
	}
 };
 
 Player.prototype.reset = function() {
	 this.x = 200;
	 this.y = 400;
 }

 var player = new Player(200,-12.50);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
