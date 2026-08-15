// Component for Backpack Brawl Inventory Grid & Fusion Chamber
class BackpackGrid {
  constructor(containerId, initialCards, onFuseTrigger) {
    this.container = document.getElementById(containerId);
    this.cards = initialCards || [];
    this.onFuseTrigger = onFuseTrigger;
    this.selectedFusionCards = [null, null];
    this.init();
  }

  init() {
    this.render();
  }

  playSynthSound(freq = 440, type = 'sine', duration = 0.1) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch(e) {}
  }

  renderCardHtml(card) {
    if (!card) return '';
    const frameClass = card.frameStyle || (card.rarity === 'common' ? 'common' : card.rarity === 'rare' ? 'rare' : card.rarity === 'epic' ? 'epic' : card.rarity === 'legendary' ? 'legendary' : 'ai_unique');
    const isAi = card.rarity === 'ai_unique';

    return `
      <div class="creature-card ${frameClass} holographic" data-instance-id="${card.instanceId}">
        <div class="card-header">
          <span class="card-category-badge">${card.category}</span>
          <span class="card-tier-badge">T${card.tier}</span>
        </div>

        <div class="card-art-container">
          ${card.image ? `<img src="${card.image}" class="card-art-img" alt="${card.name}">` : `<span class="card-art-fallback">${card.icon}</span>`}
        </div>

        <div class="card-name">${card.name}</div>
        <div style="font-size: 0.62rem; color: var(--text-secondary); text-align: center; height: 26px; overflow: hidden; text-overflow: ellipsis; line-height: 1.1;">
          ${card.ability}
        </div>
        <div class="card-stats">
          <span class="stat-atk">⚔️ ${card.atk}</span>
          <span class="stat-def">🛡️ ${card.def}</span>
          <span class="stat-spd">⚡ ${card.spd}</span>
        </div>
      </div>
    `;
  }

  render() {
    this.container.innerHTML = `
      <div class="backpack-wrapper">
        <div class="inventory-header">
          <div class="inventory-title">
            <span>🎒 Mochila de Criaturas (Inventario)</span>
            <span style="font-size: 0.85rem; color: var(--accent-cyan); background: rgba(6,182,212,0.1); padding: 4px 10px; border-radius: 20px;">
              ${this.cards.length} / 12 Criaturas
            </span>
          </div>
          <button class="tab-btn" id="btn-draw-card" style="font-size: 0.85rem;">
            🎲 Recibir Carta (+1)
          </button>
        </div>

        <!-- FUSION CHAMBER -->
        <div class="fusion-chamber">
          <div style="font-size: 0.9rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: var(--accent-purple);">
            🧪 Cámara de Fusión Elemental
          </div>

          <div class="fusion-slots-container">
            <div class="grid-slot" id="fusion-slot-0">
              ${this.selectedFusionCards[0] ? this.renderCardHtml(this.selectedFusionCards[0]) : '<span style="color:#64748b; font-weight:700;">Carta 1</span>'}
            </div>
            <div class="fusion-plus">+</div>
            <div class="grid-slot" id="fusion-slot-1">
              ${this.selectedFusionCards[1] ? this.renderCardHtml(this.selectedFusionCards[1]) : '<span style="color:#64748b; font-weight:700;">Carta 2</span>'}
            </div>
          </div>

          <div id="fusion-status-msg" style="font-size: 0.85rem; font-weight: 700; color: var(--accent-amber); min-height: 20px; text-align: center;">
            Selecciona 2 cartas de tu mochila para probar su compatibilidad de fusión.
          </div>

          <div style="display: flex; gap: 1rem;">
            <button class="fusion-action-btn" id="btn-start-fusion" ${(!this.selectedFusionCards[0] || !this.selectedFusionCards[1]) ? 'disabled' : ''}>
              INICIAR FUSIÓN 🔥
            </button>
            <button class="tab-btn" id="btn-clear-fusion" style="padding: 0.6rem 1rem;">
              Limpiar
            </button>
          </div>
        </div>

        <!-- BACKPACK GRID -->
        <div class="backpack-grid-container" id="backpack-grid">
          ${this.cards.map((card, idx) => `
            <div class="grid-slot" data-slot-index="${idx}">
              ${this.renderCardHtml(card)}
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const gridCards = this.container.querySelectorAll('.backpack-grid-container .creature-card');
    gridCards.forEach(cardEl => {
      cardEl.addEventListener('click', () => {
        this.playSynthSound(587.33, 'sine', 0.08); // D5 pitch click sound
        const instanceId = cardEl.getAttribute('data-instance-id');
        const cardObj = this.cards.find(c => c.instanceId === instanceId);
        if (!cardObj) return;

        if (!this.selectedFusionCards[0]) {
          this.selectedFusionCards[0] = cardObj;
        } else if (!this.selectedFusionCards[1] && this.selectedFusionCards[0].instanceId !== cardObj.instanceId) {
          this.selectedFusionCards[1] = cardObj;
        }

        this.render();
      });
    });

    const btnClear = this.container.querySelector('#btn-clear-fusion');
    if (btnClear) {
      btnClear.addEventListener('click', () => {
        this.playSynthSound(330, 'triangle', 0.1);
        this.selectedFusionCards = [null, null];
        this.render();
      });
    }

    const btnStart = this.container.querySelector('#btn-start-fusion');
    if (btnStart) {
      btnStart.addEventListener('click', () => {
        this.playSynthSound(880, 'square', 0.2); // High fusion chime sound
        if (this.onFuseTrigger && this.selectedFusionCards[0] && this.selectedFusionCards[1]) {
          this.onFuseTrigger(this.selectedFusionCards[0], this.selectedFusionCards[1]);
        }
      });
    }

    const btnDraw = this.container.querySelector('#btn-draw-card');
    if (btnDraw) {
      btnDraw.addEventListener('click', () => {
        this.playSynthSound(659.25, 'sine', 0.12);
        const keys = ["tierra_t1", "aire_t1", "agua_t1", "microbios_t1"];
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const newCard = {
          instanceId: "card_" + Math.random().toString(36).substr(2, 9),
          ...window.CREATURES_DB[randomKey]
        };
        this.cards.push(newCard);
        this.render();
      });
    }
  }

  removeCards(instanceIds) {
    this.cards = this.cards.filter(c => !instanceIds.includes(c.instanceId));
    this.selectedFusionCards = [null, null];
    this.render();
  }

  addCard(newCard) {
    this.cards.push(newCard);
    this.render();
  }
}

window.BackpackGrid = BackpackGrid;
