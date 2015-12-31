//Declare all variables that are going to be constant and hence, immutable.
var WATER_ROW = -12.50;
	LIFE_NUMBER = 3,
	ENEMY_X_FORWARD = 0,
	X_OFFSET = 15,
    Y_OFFSET = 83,
    HIDE_GEM = -101,
    Y_ARRAY = [63, 146, 229],
	SPEED_ARRAY = [150,250,300,450],
	ENEMY_X_ARRAY = [-100,-150,-200,-250,-300],
	GEM_ARRAY = ['images/Gem_Green.png','images/Gem_Orange.png','images/Gem_Purple.png','images/Gem_Red.png','images/Gem_Blue.png'];

/* Define Enemy class. All instances of the enemy class will acquire the 
   variables declared within the class.
*/
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = ENEMY_X_ARRAY[Math.floor(Math.random() * 5)];
    this.y = Y_ARRAY[Math.floor(Math.random() * 3)];
    this.speed =  SPEED_ARRAY[Math.floor(Math.random() * 4)];
};

Enemy.prototype.update = function(dt) {
	SPEED_ARRAY[Math.floor(Math.random() * 4)];
	this.x += this.speed * dt;
	if (this.x < -500) {
        this.sprite = 'images/enemy-bug.png';
        this.x = ENEMY_X_ARRAY[Math.floor(Math.random() * 5)];
        this.speed = SPEED_ARRAY[Math.floor(Math.random() * 4)];
        this.x += this.speed * dt;
        this.y = Y_ARRAY[Math.floor(Math.random() * 3)];
    }
	if (this.x > 750) {
		this.reset();
	}
};

Enemy.prototype.reset = function() {
	this.speed = SPEED_ARRAY[Math.floor(Math.random() * 4)];
	this.x = ENEMY_X_ARRAY[Math.floor(Math.random() * 5)];
    this.y = Y_ARRAY[Math.floor(Math.random() * 3)];
 }

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//Player code------------------------------------------
var Player = function(x,y) {
	this.x = x;
	this.y = y;
	this.score = 0;
	this.gems = 0;
	this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
	this.x * (dt);
	this.y * (dt);
	//if (this.y <= WATER_ROW){
	//	this.score += 1;
	//	player.reset();
	//}	
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
        ctx.drawImage(Resources.get('images/Heart.png'), x * 45, 525, 50, 70);
    }
};

Life.prototype.die = function() {
	this.number = this.number - 1;
	if (this.number == -1) {
		this.number = LIFE_NUMBER;
		score.reset();
	}
};

var Gem = function(image, x, y) {
    this.number = 5;
	this.sprite = image;
    this.x = x;
    this.y = y;
};

Gem.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 75, 110);
    //for (var x = 0; x < this.number; x++) {
    //    ctx.drawImage(Resources.get(GEM_ARRAY[x]), x * 100 + 15, 20, 75, 110);
    //}
};

Gem.prototype.reset = function() {
	for(var i = 0; i < 5; i++) {
		allGems[i].x = i * 100 + 15;	
		allGems[i].y = 20;
	}
 };

//Score class - draw the score on the screen
var Score = function() {
	player.score = 0;
};

Score.prototype.render = function() {
	ctx.font = 'Bold 30px Verdana';
	ctx.fillText('Score : ' + player.score, 309, 575);
}

Score.prototype.reset = function() {
	 player.score = 0;
 };

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for(var i=0; i<3; i++){
allEnemies.push(new Enemy());
}
 
var player = new Player(200,400);
var life = new Life();
var score = new Score();
//var gem = new Gem();

var green = new Gem('images/Gem_Green.png', 15, 20);
var orange = new Gem('images/Gem_Orange.png', 115, 20);
var purple = new Gem('images/Gem_Purple.png', 215, 20);
var red = new Gem('images/Gem_Red.png', 315, 20);
var blue = new Gem('images/Gem_Blue.png', 415, 20);
var allGems = [];
allGems.push(green);
allGems.push(orange);
allGems.push(purple);
allGems.push(red);
allGems.push(blue);


 
function checkCollisions(allEnemies, player) {
    for(var i = 0; i < 3; i++) {
		if (allEnemies[i].x < player.x + 50 && allEnemies[i].x + 50 > player.x &&
            allEnemies[i].y < player.y +  50 && 50 + allEnemies[i].y > player.y){
				life.die()
				player.reset();
        }
    }
}

function checkGemCollisions(allGems, player) {
	if (player.y == WATER_ROW) {
		for(var i = 0; i < 5; i++) {
			if (allGems[i].x < player.x + 50 && allGems[i].x + 50 > player.x){
				console.log(allGems[i].x);
				console.log(player.x);
				allGems[i].x = HIDE_GEM;
				allGems[i].y = HIDE_GEM;
				player.gems += 1;
			}
		}
		player.reset();
    }
	
	if (player.gems == 5) {
		player.reset();
		player.gems = 0;
		player.score += 1;
		gem.reset();
	}
}

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
