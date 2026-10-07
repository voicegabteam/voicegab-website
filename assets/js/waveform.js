/* ═══════════════════════════════
   VOICEGAB WAVEFORM CANVAS v1.0
═══════════════════════════════ */

class WaveformCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.resize();
    this.init();
    this.animate();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  init() {
    this.particles = [];
    for (let i = 0; i < 80; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? '#7C3AED' : '#06B6D4',
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw waveform lines
    const time = Date.now() / 1000;
    const lines = 3;
    const colors = ['rgba(124,58,237,0.15)', 'rgba(236,72,153,0.1)', 'rgba(6,182,212,0.12)'];

    for (let l = 0; l < lines; l++) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = colors[l];
      this.ctx.lineWidth = 1.5;

      for (let x = 0; x <= this.canvas.width; x += 4) {
        const freq1 = 0.005 + l * 0.002;
        const freq2 = 0.012 + l * 0.003;
        const y = this.canvas.height / 2
          + Math.sin(x * freq1 + time * (0.8 + l * 0.3)) * (60 + l * 20)
          + Math.sin(x * freq2 + time * (1.2 + l * 0.2)) * (30 + l * 10);

        if (x === 0) this.ctx.moveTo(x, y);
        else this.ctx.lineTo(x, y);
      }
      this.ctx.stroke();
    }

    // Draw particles
    this.particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  new WaveformCanvas('hero-canvas');
});
