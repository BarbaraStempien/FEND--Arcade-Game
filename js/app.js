// Random number from array
const randomArray = (array) => array[Math.floor((Math.random()*array.length))];

// Random number from interval
// https://stackoverflow.com/a/7228322
const randomInterval = (min, max) => Math.floor(Math.random()*(max-min+1)+min);

// Coordinates for center of each path
const pathCenter = [83, 166, 249];

// Coordinates for each spawn point
const spawnPoint = [-101, -202, -303, -404];

/** Class representing an enemy. */
class Enemy {
    /**
   * Create an enemy.
   * @param {number} x - initial position of enemy (horizontal)
   * @param {number} y - initial position of enemy (vertical)
   * @param {number} speed - enemy speed
   * @param {string} sprite - path to enemy's image
   * @param {number} width - width of block
   * @param {number} height - height of block
   */
    constructor(x, y, speed) {
        this.sprite = 'images/enemy-bug.png';
        this.width = 101;
        this.height = 83;
        this.x = x;
        this.y = y - (0.25 * this.height);
        this.speed = speed;
    }

    /**
   * Draw enemy to the screen.
   */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
     * Move enemy on the screen.
     * @param {number} dt - time delta
     */
    update(dt) {
        (this.x < this.width * 5) ? this.x += this.speed * dt : this.x = -this.width;
    }
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
        this.y = this.height * 5 - (0.5 *this.height);
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
            (this.x > 0) ? this.x -= this.width : this.x;
            break;
        case 'up':
            (this.y > this.height) ? this.y -= this.height : this.y;
            break;
        case 'right':
            (this.x < this.width * 4) ? this.x += this.width : this.x;
            break;
        case 'down':
            (this.y < this.height * 4) ? this.y += this.height : this.y;
            break;
        }
    }

    // TO-DO update()
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player('images/char-horn-girl.png');

// Instantiate enemies
const allEnemies = pathCenter.map((y) => new Enemy(randomArray(spawnPoint), y, randomInterval(150, 300)));

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
