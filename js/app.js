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
   * @param {string} sprite - path to character's image
   * @param {number} width - width of block
   * @param {number} height - height of block
   * @param {number} x - initial position of character (horizontal)
   * @param {number} y - initial position of character (vertical)
   */
    constructor(sprite) {
        this.sprite = sprite;
        this.width = 101;
        this.height = 83;
        this.x = this.width * 2;
        this.y = this.height * 5;
    }

    /**
     * Draw player to the screen.
     */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
     * Move character on key press
     * @param {string} direction - the direction of the character's movement
     */
    handleInput(direction) {
        switch (direction) {
        case 'left':
            this.x -= this.width;
            break;
        case 'up':
            this.y -= this.height;
            break;
        case 'right':
            this.x += this.width;
            break;
        case 'down':
            this.y += this.height;
            break;
        }
    }

    // TO-DO update()
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player('images/char-horn-girl.png');

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        // Arrow keys
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',

        // WASD keys
        65: 'left',
        87: 'up',
        68: 'right',
        83: 'down',
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
