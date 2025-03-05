const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 500;

// Player object
const player = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 50,
    width: 40,
    height: 40,
    speed: 5,
    dx: 0
};

// Falling blocks
let blocks = [];
let blockSpeed = 2;
let spawnRate = 1000; // Spawn every 1 second
let lastSpawn = 0;
let score = 0;
let gameOver = false;

// Controls
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") player.dx = -player.speed;
    if (e.key === "ArrowRight") player.dx = player.speed;
});

document.addEventListener("keyup", () => {
    player.dx = 0;
});

// Spawn blocks
function spawnBlock() {
    const block = {
        x: Math.random() * (canvas.width - 40),
        y: -40,
        width: 40,
        height: 40
    };
    blocks.push(block);
}

// Update game elements
function update(timestamp) {
    if (gameOver) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move player
    player.x += player.dx;
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    // Spawn new blocks over time
    if (timestamp - lastSpawn > spawnRate) {
        spawnBlock();
        lastSpawn = timestamp;
        score++;
    }

    // Move and draw blocks
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].y += blockSpeed;
        ctx.fillStyle = "red";
        ctx.fillRect(blocks[i].x, blocks[i].y, blocks[i].width, blocks[i].height);

        // Check collision
        if (
            player.x < blocks[i].x + blocks[i].width &&
            player.x + player.width > blocks[i].x &&
            player.y < blocks[i].y + blocks[i].height &&
            player.y + player.height > blocks[i].y
        ) {
            gameOver = true;
            alert(`Game Over! Score: ${score}`);
            document.location.reload();
        }
    }

    // Draw player
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
}

// Start the game loop
requestAnimationFrame(update);