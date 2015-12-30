var WATER_ROW = -12.50;
	LIFE_NUMBER = 3,
	ENEMY_X_FORWARD = 0;

//Declare all variables that are going to be constant and hence, immutable.
var X_OFFSET = 15,
    Y_OFFSET = 83,
    HIDE = -101,
    Y_ARRAY = [63, 146, 229],
	SPEED_ARRAY = [100,250,300,450],
	RESET_ARRAY = [-100,-200,-50,-300],
    PLAYER_X = 200,
    PLAYER_Y = 400;

/* Define Enemy class. All instances of the enemy class will acquire the 
   variables declared within the class.
*/
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = RESET_ARRAY[Math.floor(Math.random() * 4)];//ENEMY_X_FORWARD;
    this.y = Y_ARRAY[Math.floor(Math.random() * 3)];
    this.speed =  SPEED_ARRAY[Math.floor(Math.random() * 4)];
};

Enemy.prototype.update = function(dt) {
	SPEED_ARRAY[Math.floor(Math.random() * 4)];
	this.x += this.speed * dt;
	if (this.x < -500) {
        this.sprite = 'images/enemy-bug.png';
        this.x = RESET_ARRAY[Math.floor(Math.random() * 4)];//ENEMY_X_FORWARD;
        this.speed = SPEED_ARRAY[Math.floor(Math.random() * 4)];
        this.x += this.speed * dt;
        this.y = Y_ARRAY[Math.floor(Math.random() * 3)];
    }
	if (this.x > 750) {
		this.reset();
	}
};

Enemy.prototype.reset = function() {
	this.x = RESET_ARRAY[Math.floor(Math.random() * 4)];// ENEMY_X_FORWARD;
    this.y = Y_ARRAY[Math.floor(Math.random() * 3)];
 }

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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

var allEnemies = [];
for(var i=0; i<3; i++){
allEnemies.push(new Enemy());
}
 
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
