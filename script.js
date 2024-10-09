// Récupérer le canvas et le contexte
const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

// Variables pour les raquettes
const paddleWidth = 10;
const paddleHeight = 100;

// Joueur 1
const player1 = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    score: 0
};

// Joueur 2
const player2 = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    score: 0
};

// Balle
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speedX: 5,
    speedY: 5
};

// Touches de contrôle
const keys = {};

// Ajouter des écouteurs d'événements pour les touches
document.addEventListener('keydown', function(event) {
    keys[event.key] = true;
});
document.addEventListener('keyup', function(event) {
    keys[event.key] = false;
});


function update() {
    // Déplacer les raquettes en fonction des touches pressées

    // Joueur 1 (W et S)
    if (keys['w'] && player1.y > 0) {
        player1.y -= 7;
    }
    if (keys['s'] && player1.y < canvas.height - player1.height) {
        player1.y += 7;
    }

    // Joueur 2 (Flèche Haut et Flèche Bas)
    if (keys['ArrowUp'] && player2.y > 0) {
        player2.y -= 7;
    }
    if (keys['ArrowDown'] && player2.y < canvas.height - player2.height) {
        player2.y += 7;
    }

    // Déplacer la balle
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    // Collision avec le haut et le bas du canvas
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY;
    }

    // Collision avec les raquettes
    let paddle = (ball.x < canvas.width / 2) ? player1 : player2;

    if (collision(ball, paddle)) {
        ball.speedX = -ball.speedX;
    }

    // Marquer un point
    if (ball.x - ball.radius < 0) {
        player2.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        player1.score++;
        resetBall();
    }
}


function collision(ball, paddle) {
    return ball.x - ball.radius < paddle.x + paddle.width &&
           ball.x + ball.radius > paddle.x &&
           ball.y - ball.radius < paddle.y + paddle.height &&
           ball.y + ball.radius > paddle.y;
}


function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = -ball.speedX;
}


function draw() {
    // Effacer le canvas
    context.fillStyle = '#000'; // Noir
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Dessiner les raquettes
    context.fillStyle = '#fff'; // Blanc
    context.fillRect(player1.x, player1.y, player1.width, player1.height);
    context.fillRect(player2.x, player2.y, player2.width, player2.height);

    // Dessiner la balle
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fill();

    // Dessiner le score
    context.font = '32px Arial';
    context.fillText(player1.score, canvas.width / 4, 50);
    context.fillText(player2.score, 3 * canvas.width / 4, 50);
}


function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
