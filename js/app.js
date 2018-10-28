// Pause game function
// https://discussions.udacity.com/t/project-3-arcade-game-how-to-add-a-pause-feature/821217
let paused = false;
window.onfocus = function() {
    paused = false;
};
window.onblur = function() {
    paused = true;
};

// Enemies our player must avoid
const Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** Class representing a player. */
class Player {
    /**
     * Create a player.
     * @param {number} x - horizontal position
     * @param {number} y - vertical position
     * @param {string} sprite - character image
    */
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
    }

    /**
     * Draw player to the screen.
     */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // TO-DO update()
    // TO-DO handleInput()
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player(0, 0, 'images/char-horn-girl.png');

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
