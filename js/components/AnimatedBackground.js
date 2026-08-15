// Animated Nature Background Engine for Turtura (Floating Spores & Light Rays)
class AnimatedBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.numParticles = 45;
    this.animLoop = null;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        r: Math.random() * 3.5 + 1.5,
        dx: (Math.random() - 0.5) * 0.8,
        dy: -Math.random() * 0.8 - 0.2, // Float upward
        alpha: Math.random() * 0.7 + 0.3,
        hue: Math.random() < 0.5 ? 120 : 50 // Green & Golden Spores
      });
    }

    this.start();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  start() {
    const render = () => {
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Draw floating luminous spores
      this.particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.y < -10) p.y = this.canvas.height + 10;
        if (p.x < -10) p.x = this.canvas.width + 10;
        if (p.x > this.canvas.width + 10) p.x = -10;

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        this.ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${p.alpha})`;
        this.ctx.shadowBlur = 12;
        this.ctx.shadowColor = `hsl(${p.hue}, 90%, 60%)`;
        this.ctx.fill();
        this.ctx.restore();
      });

      this.animLoop = requestAnimationFrame(render);
    };

    render();
  }

  stop() {
    if (this.animLoop) cancelAnimationFrame(this.animLoop);
  }
}

window.AnimatedBackground = AnimatedBackground;
