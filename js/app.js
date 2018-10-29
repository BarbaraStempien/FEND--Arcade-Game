// Random number from array
const randomArray = (array) => array[Math.floor((Math.random()*array.length))];

// Random number from interval
// https://stackoverflow.com/a/7228322
const randomInterval = (min, max) => Math.floor(Math.random()*(max-min+1)+min);

// Coordinates for center of each path
const pathCenter = [83, 166, 249];

// Coordinates for each spawn point
const spawnPoint = [-101, -202];

// Cancas block parameters
const blockWidth = 101;
const quarterBlockWidth = 0.25 * blockWidth;
const blockHeight = 83;
const quarterBlockHeight = 0.25 * blockHeight;

/** Class representing an enemy. */
class Enemy {
    /**
   * Create an enemy.
   * @param {number} x - initial position of enemy (horizontal)
   * @param {number} y - initial position of enemy (vertical)
   * @param {number} speed - enemy speed
   * @param {string} sprite - path to enemy's image
   */
    constructor(x, y, speed) {
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y - quarterBlockHeight;
        this.speed = speed;
    }

    /**
   * Draw enemy to the screen.
   */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
     * Move enemy back to spawn point when it reached the border.
     * @param {number} dt - time delta
     */
    update(dt) {
        (this.x < blockWidth * 5) ? this.x += this.speed * dt : this.x = randomArray(spawnPoint);
    }
};

/** Class representing a player. */
class Player {
    /**
   * Create a player.
   * @param {string} sprite - path to character's image
   * @param {number} x - initial position of character (horizontal)
   * @param {number} y - initial position of character (vertical)
   */
    constructor(sprite) {
        this.sprite = sprite;
        this.spawnX = blockWidth * 2;
        this.x = this.spawnX;
        this.spawnY = blockHeight * 5 - quarterBlockHeight;
        this.y = this.spawnY;
    }

    /**
   * Draw player to the screen.
   */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /** Reset character position when it collides with enemy */
    update() {
        allEnemies.forEach((enemy) => {
            if (this.y === enemy.y && (enemy.x + quarterBlockWidth >= this.x - quarterBlockWidth && enemy.x - quarterBlockWidth <= this.x + quarterBlockWidth)) {
                this.y = this.spawnY;
                this.x = this.spawnX;
            }
        });
    }

    /**
     * Move character on key press
     * @param {string} direction - the direction of the character's movement
     */
    handleInput(direction) {
        switch (direction) {
        case 'left':
            (this.x > 0) ? this.x -= blockWidth : this.x;
            break;
        case 'up':
            (this.y > blockHeight) ? this.y -= blockHeight : this.y;
            break;
        case 'right':
            (this.x < blockWidth * 4) ? this.x += blockWidth : this.x;
            break;
        case 'down':
            (this.y < blockHeight * 4) ? this.y += blockHeight : this.y;
            break;
        }
    }
}

// Instantiate player
const player = new Player('images/char-horn-girl.png');

// Instantiate enemies
const allEnemies = [];

spawnPoint.forEach((s) => {
    pathCenter.forEach((p) => {
        allEnemies.push(new Enemy(s, p, randomInterval(100, 400)));
    });
});

// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', (e) => {
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

// Pause game function
// https://discussions.udacity.com/t/project-3-arcade-game-how-to-add-a-pause-feature/821217
let paused = false;

window.onfocus = () => paused = false;
window.onblur = () => paused = true;
