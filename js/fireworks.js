const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');

let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

window.addEventListener('resize', () => {
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
});

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 2 + 1;
    this.velocity = {
      x: (Math.random() - 0.5) * 8, // Spread
      y: (Math.random() - 0.5) * 8
    };
    this.alpha = 1;
    this.friction = 0.95;
    this.gravity = 0.04;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.velocity.y += this.gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.015; // Fade out speed
  }
}

let particles = [];
// Romantic/Celebratory colors: Pink, Gold, Red, White, Purple
const colors = ['#ff4d4d', '#ffaf40', '#ffcccc', '#cd84f1', '#fff200', '#ff9ff3'];

function createFirework(x, y) {
  const particleCount = 60; // Particles per explosion
  const sound = new Audio('https://freesound.org/data/previews/26/26777_155162-lq.mp3'); // Optional sound placeholder, can be removed if not needed.
  // Not adding sound to keep it simple and avoid CORS/Autoplay issues.
  
  for (let i = 0; i < particleCount; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    particles.push(new Particle(x, y, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  particles.forEach((particle, index) => {
    if (particle.alpha > 0) {
      particle.update();
      particle.draw();
    } else {
      particles.splice(index, 1);
    }
  });

  // Random automatic fireworks frequency
  if (Math.random() < 0.04) { // 4% chance per frame (~2-3 per second)
    const x = Math.random() * canvasWidth;
    const y = Math.random() * (canvasHeight * 0.6); // Top 60% of screen
    createFirework(x, y);
  }
}

animate();

// Click interaction
window.addEventListener('click', (e) => {
  createFirework(e.clientX, e.clientY);
});
