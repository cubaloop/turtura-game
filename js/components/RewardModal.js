// Reward Unboxing / New Card Reveal Animation Component for Turtura
class RewardModal {
  constructor() {
    this.modalEl = null;
    this.createDOM();
  }

  createDOM() {
    this.modalEl = document.createElement('div');
    this.modalEl.id = 'reward-unboxing-modal';
    this.modalEl.style.cssText = `
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(11, 15, 25, 0.95);
      backdrop-filter: blur(20px);
      z-index: 1100;
      display: none;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      overflow: hidden;
    `;

    this.modalEl.innerHTML = `
      <!-- BRIGHT BURST LIGHT FLARES -->
      <div id="reward-burst-light" style="
        position: absolute;
        width: 600px; height: 600px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(245,158,11,0.8) 30%, rgba(139,92,246,0.4) 60%, transparent 80%);
        box-shadow: 0 0 100px rgba(255,255,255,1);
        z-index: 1;
        transition: opacity 2.5s ease-out, transform 2.5s ease-out;
        opacity: 1;
        transform: scale(1.5);
        pointer-events: none;
      "></div>

      <!-- TITLE -->
      <div style="z-index: 10; text-align: center; margin-bottom: 2rem;">
        <h2 style="font-size: 2.25rem; font-weight: 800; background: linear-gradient(135deg, #fff, var(--accent-amber)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-transform: uppercase; letter-spacing: 3px;">
          ¡NUEVA CARTA OBTENIDA!
        </h2>
        <p style="font-size: 0.9rem; color: var(--accent-cyan); font-weight: 700;">Desbloqueo de Criatura Exclusiva</p>
      </div>

      <!-- REWARD CARD CONTAINER -->
      <div id="reward-card-slot" style="z-index: 10; transform: scale(1.2); transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);">
        <!-- Card HTML injected here -->
      </div>

      <button id="reward-claim-btn" style="
        z-index: 10;
        margin-top: 2.5rem;
        background: linear-gradient(135deg, var(--accent-amber), var(--accent-rose));
        color: #fff;
        border: none;
        padding: 0.85rem 2.5rem;
        font-size: 1.1rem;
        font-weight: 800;
        border-radius: 14px;
        cursor: pointer;
        box-shadow: 0 0 25px rgba(245, 158, 11, 0.6);
        transition: transform 0.2s ease;
      ">
        RECLAMAR CARTA 🎁
      </button>
    `;

    document.body.appendChild(this.modalEl);

    const btnClaim = this.modalEl.querySelector('#reward-claim-btn');
    btnClaim.addEventListener('click', () => this.hide());
  }

  playRevealSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.8); // C6
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch(e) {}
  }

  show(card) {
    if (!card) return;

    const burst = this.modalEl.querySelector('#reward-burst-light');
    burst.style.opacity = '1';
    burst.style.transform = 'scale(1.8)';

    const slot = this.modalEl.querySelector('#reward-card-slot');
    const frameClass = card.frameStyle || (card.rarity === 'common' ? 'common' : card.rarity === 'rare' ? 'rare' : card.rarity === 'epic' ? 'epic' : card.rarity === 'legendary' ? 'legendary' : 'ai_unique');

    slot.innerHTML = `
      <div class="creature-card ${frameClass} holographic" style="width: 200px; height: 290px;">
        <div class="card-header">
          <span class="card-category-badge">${card.category}</span>
          <span class="card-tier-badge">T${card.tier}</span>
        </div>
        <div class="card-art-container" style="height: 120px;">
          ${card.image ? `<img src="${card.image}" class="card-art-img" alt="${card.name}">` : `<span class="card-art-fallback" style="font-size:4rem;">${card.icon}</span>`}
        </div>
        <div class="card-name" style="font-size: 0.95rem;">${card.name}</div>
        <div style="font-size: 0.68rem; color: var(--text-secondary); text-align: center; height: 28px; overflow: hidden; text-overflow: ellipsis; line-height: 1.1;">
          ${card.ability}
        </div>
        <div class="card-stats" style="font-size: 0.78rem;">
          <span class="stat-atk">⚔️ ${card.atk}</span>
          <span class="stat-def">🛡️ ${card.def}</span>
          <span class="stat-spd">⚡ ${card.spd}</span>
        </div>
      </div>
    `;

    this.modalEl.style.display = 'flex';
    this.playRevealSound();

    // Gradual light burst fade-out effect to reveal card details
    setTimeout(() => {
      burst.style.opacity = '0.15';
      burst.style.transform = 'scale(0.8)';
    }, 100);
  }

  hide() {
    this.modalEl.style.display = 'none';
  }
}

window.RewardModal = RewardModal;
