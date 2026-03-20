

const canvas = document.getElementById("canvas");
console.log(canvas)
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const shapes = [];

class Shape {
  constructor(x, y, size, speedX, speedY, type) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.type = type;
  }

  draw() {
    ctx.beginPath();
    if (this.type === 'circle') {
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    } else if (this.type === 'square') {
      ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    } else if (this.type === 'triangle') {
      ctx.moveTo(this.x, this.y - this.size);
      ctx.lineTo(this.x - this.size, this.y + this.size);
      ctx.lineTo(this.x + this.size, this.y + this.size);
      ctx.closePath();
    }
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce on edges
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.speedX *= -1;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.speedY *= -1;
    }
  }
}

function createShapes() {
  for (let i = 0; i < 20; i++) {
    const size = Math.random() * 15 + 5; // Smaller size
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedX = (Math.random() - 0.5) * 3;
    const speedY = (Math.random() - 0.5) * 3;
    const types = ['circle', 'square', 'triangle'];
    const type = types[Math.floor(Math.random() * types.length)];
    shapes.push(new Shape(x, y, size, speedX, speedY, type));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shapes.forEach(shape => {
    shape.update();
    shape.draw();
  });
  requestAnimationFrame(animate);
}

createShapes();
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
