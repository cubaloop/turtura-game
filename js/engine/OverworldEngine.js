// 2D RPG Canvas Overworld Engine for Turtura (Classic Pokémon Style)
class OverworldEngine {
  constructor(canvasId, onEnterGym, onWildEncounter) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.onEnterGym = onEnterGym;
    this.onWildEncounter = onWildEncounter;

    // Player State
    this.player = {
      x: 380,
      y: 280,
      width: 24,
      height: 32,
      speed: 3,
      direction: 'down', // 'up', 'down', 'left', 'right'
      animFrame: 0,
      isMoving: false
    };

    // Keys state
    this.keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
      KeyW: false,
      KeyS: false,
      KeyA: false,
      KeyD: false
    };

    // Map Locations (Gyms & Grass)
    this.gym1 = { x: 120, y: 100, w: 100, h: 80, name: "Gimnasio I: Planeta Tierra" };
    this.gym2 = { x: 560, y: 100, w: 100, h: 80, name: "Gimnasio II: La Mutación Abisal" };
    this.tallGrass = [
      { x: 80, y: 220, w: 120, h: 100 },
      { x: 580, y: 220, w: 120, h: 100 }
    ];

    this.isRunning = false;
    this.animLoop = null;
    this.init();
  }

  init() {
    this.canvas.width = 800;
    this.canvas.height = 480;

    window.addEventListener('keydown', (e) => {
      if (this.keys.hasOwnProperty(e.code)) {
        this.keys[e.code] = true;
        this.player.isMoving = true;
      }
    });

    window.addEventListener('keyup', (e) => {
      if (this.keys.hasOwnProperty(e.code)) {
        this.keys[e.code] = false;
        const anyKey = Object.values(this.keys).some(v => v);
        if (!anyKey) this.player.isMoving = false;
      }
    });

    this.start();
  }

  start() {
    this.isRunning = true;
    let lastTime = 0;

    const loop = (timestamp) => {
      if (!this.isRunning) return;
      this.update();
      this.draw();
      this.animLoop = requestAnimationFrame(loop);
    };

    this.animLoop = requestAnimationFrame(loop);
  }

  stop() {
    this.isRunning = false;
    if (this.animLoop) cancelAnimationFrame(this.animLoop);
  }

  update() {
    let dx = 0;
    let dy = 0;

    if (this.keys.ArrowUp || this.keys.KeyW) { dy -= this.player.speed; this.player.direction = 'up'; }
    if (this.keys.ArrowDown || this.keys.KeyS) { dy += this.player.speed; this.player.direction = 'down'; }
    if (this.keys.ArrowLeft || this.keys.KeyA) { dx -= this.player.speed; this.player.direction = 'left'; }
    if (this.keys.ArrowRight || this.keys.KeyD) { dx += this.player.speed; this.player.direction = 'right'; }

    // Update position with boundaries
    this.player.x = Math.max(30, Math.min(740, this.player.x + dx));
    this.player.y = Math.max(40, Math.min(410, this.player.y + dy));

    if (this.player.isMoving) {
      this.player.animFrame = (this.player.animFrame + 0.15) % 4;
    } else {
      this.player.animFrame = 0;
    }

    // Check Gym 1 Door Collision
    if (this.player.x > this.gym1.x && this.player.x < this.gym1.x + this.gym1.w &&
        this.player.y > this.gym1.y && this.player.y < this.gym1.y + this.gym1.h) {
      this.player.y += 15;
      if (this.onEnterGym) this.onEnterGym(1);
    }

    // Check Wild Grass Chance
    this.tallGrass.forEach(grass => {
      if (this.player.isMoving &&
          this.player.x > grass.x && this.player.x < grass.x + grass.w &&
          this.player.y > grass.y && this.player.y < grass.y + grass.h) {
        if (Math.random() < 0.012) { // 1.2% chance per frame while walking in grass
          this.player.isMoving = false;
          if (this.onWildEncounter) this.onWildEncounter();
        }
      }
    });
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 1. Draw Grass Background
    ctx.fillStyle = '#48bb78';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 2. Draw Sand Pathways
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(360, 40, 80, 400); // Main vertical path
    ctx.fillRect(160, 180, 480, 60); // Horizontal path to gyms

    // 3. Draw Border Trees
    ctx.font = '24px sans-serif';
    for (let x = 0; x < this.canvas.width; x += 32) {
      ctx.fillText('🌲', x, 28);
      ctx.fillText('🌲', x, this.canvas.height - 10);
    }
    for (let y = 30; y < this.canvas.height - 30; y += 32) {
      ctx.fillText('🌲', 0, y);
      ctx.fillText('🌲', this.canvas.width - 28, y);
    }

    // 4. Draw Tall Grass Areas
    this.tallGrass.forEach(grass => {
      ctx.fillStyle = 'rgba(34, 197, 94, 0.6)';
      ctx.fillRect(grass.x, grass.y, grass.w, grass.h);
      ctx.strokeStyle = '#15803d';
      ctx.strokeRect(grass.x, grass.y, grass.w, grass.h);
      ctx.font = '16px sans-serif';
      for (let gx = grass.x + 8; gx < grass.x + grass.w; gx += 24) {
        for (let gy = grass.y + 20; gy < grass.y + grass.h; gy += 24) {
          ctx.fillText('🌿', gx, gy);
        }
      }
    });

    // 5. Draw Gym Buildings
    // Gym 1 (Earth)
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(this.gym1.x, this.gym1.y, this.gym1.w, this.gym1.h);
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.strokeRect(this.gym1.x, this.gym1.y, this.gym1.w, this.gym1.h);
    ctx.font = '28px sans-serif';
    ctx.fillText('🏠', this.gym1.x + 35, this.gym1.y + 45);
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#10b981';
    ctx.fillText('GIMNASIO I', this.gym1.x + 20, this.gym1.y + 70);

    // Gym 2 (Abyssal)
    ctx.fillStyle = '#4c1d95';
    ctx.fillRect(this.gym2.x, this.gym2.y, this.gym2.w, this.gym2.h);
    ctx.strokeStyle = '#a855f7';
    ctx.strokeRect(this.gym2.x, this.gym2.y, this.gym2.w, this.gym2.h);
    ctx.font = '28px sans-serif';
    ctx.fillText('🔮', this.gym2.x + 35, this.gym2.y + 45);
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#c084fc';
    ctx.fillText('GIMNASIO II', this.gym2.x + 20, this.gym2.y + 70);

    // 6. Draw Player Character Sprite
    ctx.save();
    ctx.translate(this.player.x, this.player.y);

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(12, 30, 10, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Sprite Avatar
    ctx.font = '26px sans-serif';
    ctx.fillText('🧢', 0, 18);
    ctx.fillText('🚶‍♂️', 0, 32);

    ctx.restore();

    // 7. HUD Overlays
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(20, 20, 260, 35);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1;
    ctx.strokeRect(20, 20, 260, 35);
    ctx.fillStyle = '#fef08a';
    ctx.font = '800 12px sans-serif';
    ctx.fillText('🎮 Usa WASD / Flechas para caminar por la ruta', 30, 42);
  }
}

window.OverworldEngine = OverworldEngine;
