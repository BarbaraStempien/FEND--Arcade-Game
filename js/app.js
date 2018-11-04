// Random number from array
const randomArray = (array) => array[Math.floor((Math.random()*array.length))];

// Random number from interval
// https://stackoverflow.com/a/7228322
const randomInterval = (min, max) => Math.floor(Math.random()*(max-min+1)+min);

// Canvas block parameters
const blockWidth = 101;
const quarterBlockWidth = 0.25 * blockWidth;
const blockHeight = 83;
const quarterBlockHeight = 0.25 * blockHeight;

/** Class representing an enemy. */
class Enemy {
    /** Create an enemy */
    constructor() {
        this.sprite = 'images/enemy-bug.png';
        this.spawn();
    }

    /** Select random spawn point */
    spawn() {
        // x axis, outside of the scene
        const spawnPoint = [-blockWidth, -blockWidth * 2, -blockWidth * 3]; 
        // y axis, center of block
        const pathCenter = [blockHeight, blockHeight * 2, blockHeight * 3];

        this.x = randomArray(spawnPoint);
        this.y = randomArray(pathCenter) - quarterBlockHeight;
        this.speed = randomInterval(100, 400);
    }

    /** Draw enemy to the screen. */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /** Move enemy back to spawn point when it reached the border.
     * @param {number} dt - time delta
     */
    update(dt) {
        (this.x < blockWidth * 5) ? this.x += this.speed * dt : this.spawn();
    }
};

/** Class representing a player. */
class Player {
    /** Create a player
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
        this.lives = 5;
    }

    /** Draw player to the screen */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /** Reset character position when it collides with enemy or when player wins */
    update() {
        allEnemies.forEach((enemy) => {
            if (this.y === enemy.y && (enemy.x + quarterBlockWidth >= this.x - quarterBlockWidth && enemy.x - quarterBlockWidth <= this.x + quarterBlockWidth)) {
                this.die();
            }
        });

        if (this.y <= quarterBlockHeight) {
            this.reset();
        }
    }

    /** Reset player's possition and decease lives */
    die() {
        this.lives -= 1;

        const livesList = Array.from(document.querySelectorAll('.fa-heart'));
        for (let i = livesList.length - 1; i >= 0; i--) {
            if (!livesList[i].classList.contains('lost')) {
                livesList[i].classList.toggle('lost');
                break;
            }
        };

        if (this.lives === 0) {
            //   TO-DO - write game-over logic
            this.reset();
            console.log('Game over');
        } else {
            this.reset();
        }
    }

    /** Reset player's position to initial */
    reset() {
        this.y = this.spawnY;
        this.x = this.spawnX;
    }

    /** Move character on key press
     * @param {string} direction - the direction of the character's movement
     */
    handleInput(direction) {
        switch (direction) {
        case 'left':
            (this.x > 0) ? this.x -= blockWidth : this.x;
            break;
        case 'up':
            (this.y > 0) ? this.y -= blockHeight : this.y;
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
for (let i = 0; i < 5; i++) {
    allEnemies[i] = new Enemy();
}

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
