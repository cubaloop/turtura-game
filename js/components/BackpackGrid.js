// Component for Backpack Brawl Inventory Grid & Elemental Fusion Chamber with Energy Vortex Animation
class BackpackGrid {
  constructor(containerId, initialCards, onFuseTrigger, cardModal, rewardModal) {
    this.container = document.getElementById(containerId);
    this.cards = initialCards || [];
    this.onFuseTrigger = onFuseTrigger;
    this.cardModal = cardModal;
    this.rewardModal = rewardModal;
    this.selectedFusionCards = [null, null];
    this.isFusing = false;
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
    const frameClass = card.frameStyle || (card.rarity === 'common' ? 'common' : card.rarity === 'rare' ? 'rare' : card.rarity === 'epic' ? 'epic' : 'legendary');

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
        <div style="font-size: 0.62rem; color: var(--text-muted); text-align: center; height: 24px; overflow: hidden; text-overflow: ellipsis; line-height: 1.1;">
          ${card.ability}
        </div>

        <div class="card-stats">
          <span class="stat-atk">⚔️ ${card.atk}</span>
          <span class="stat-def">🛡️ ${card.def}</span>
          <span class="stat-spd">⚡ ${card.spd}</span>
        </div>

        <button class="btn-inspect-3d" data-instance-id="${card.instanceId}" style="position: absolute; top: 4px; right: 4px; background: rgba(0,0,0,0.7); border: 1px solid var(--border-gold); color: var(--text-gold); font-size: 0.65rem; padding: 2px 5px; border-radius: 6px; cursor: pointer; z-index: 5; font-weight: 800;">
          3D 🔍
        </button>
      </div>
    `;
  }

  render() {
    this.container.innerHTML = `
      <div class="backpack-wrapper">
        <div class="inventory-header">
          <div class="inventory-title">
            <span>🎒 Mochila de Criaturas (Inventario)</span>
            <span style="font-size: 0.85rem; color: var(--accent-gold); background: rgba(245,158,11,0.15); padding: 4px 12px; border-radius: 20px; border: 1px solid var(--border-gold);">
              ${this.cards.length} / 12 Criaturas
            </span>
          </div>
          <button class="rpg-btn-gold" id="btn-draw-card" style="font-size: 0.85rem; padding: 0.5rem 1rem;">
            🎲 Recibir Carta (+1)
          </button>
        </div>

        <!-- ELEMENTAL FUSION CHAMBER WITH SWIRLING ENERGY VORTEX -->
        <div class="fusion-chamber" style="position: relative; overflow: hidden;">
          <div style="font-size: 1rem; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; color: var(--accent-gold); text-shadow: 1px 1px 0 #000;">
            🧪 Cámara de Fusión & Vórtice Elemental
          </div>

          <!-- SWIRLING VORTEX CONTAINER -->
          <div id="elemental-vortex-portal" style="
            display: ${this.isFusing ? 'flex' : 'none'};
            position: absolute; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(18, 11, 8, 0.95);
            z-index: 50;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 1rem;
          ">
            <!-- SWIRLING VORTEX SPINNER -->
            <div style="
              width: 110px; height: 110px;
              border-radius: 50%;
              border: 5px solid transparent;
              border-top-color: var(--accent-gold);
              border-right-color: #10b981;
              border-bottom-color: #06b6d4;
              border-left-color: #a855f7;
              animation: vortexSpin 1s linear infinite;
              box-shadow: 0 0 35px rgba(245, 158, 11, 0.8);
            "></div>

            <div id="vortex-timer-label" style="font-size: 1.1rem; font-weight: 900; color: var(--text-gold); letter-spacing: 2px;">
              SINTETIZANDO CRIATURA ÚNICA...
            </div>
          </div>

          <div class="fusion-slots-container">
            <div class="grid-slot" id="fusion-slot-0">
              ${this.selectedFusionCards[0] ? this.renderCardHtml(this.selectedFusionCards[0]) : '<span style="color:#a89f91; font-weight:800; font-size:0.8rem;">Carta 1</span>'}
            </div>
            <div class="fusion-plus">+</div>
            <div class="grid-slot" id="fusion-slot-1">
              ${this.selectedFusionCards[1] ? this.renderCardHtml(this.selectedFusionCards[1]) : '<span style="color:#a89f91; font-weight:800; font-size:0.8rem;">Carta 2</span>'}
            </div>
          </div>

          <div id="fusion-status-msg" style="font-size: 0.85rem; font-weight: 800; color: var(--accent-gold); min-height: 22px; text-align: center;">
            Selecciona 2 cartas de tu mochila para probar su compatibilidad de fusión.
          </div>

          <div style="display: flex; gap: 1rem;">
            <button class="rpg-btn-green" id="btn-start-fusion" ${(!this.selectedFusionCards[0] || !this.selectedFusionCards[1]) ? 'disabled' : ''}>
              ACTIVAR VÓRTISE DE FUSIÓN 🔥
            </button>
            <button class="tab-btn" id="btn-clear-fusion" style="padding: 0.6rem 1rem;">
              Limpiar
            </button>
          </div>
        </div>

        <!-- STITCHED WOODEN BACKPACK GRID -->
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
      cardEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-inspect-3d')) return;

        this.playSynthSound(587.33, 'sine', 0.08);
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

    // 3D Inspection Buttons
    const inspectBtns = this.container.querySelectorAll('.btn-inspect-3d');
    inspectBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const instanceId = btn.getAttribute('data-instance-id');
        const cardObj = this.cards.find(c => c.instanceId === instanceId);
        if (cardObj && this.cardModal) {
          this.cardModal.open(cardObj);
        }
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
        this.playSynthSound(880, 'square', 0.2);
        if (this.onFuseTrigger && this.selectedFusionCards[0] && this.selectedFusionCards[1]) {
          this.isFusing = true;
          this.render();
          this.onFuseTrigger(this.selectedFusionCards[0], this.selectedFusionCards[1]);
        }
      });
    }

    const btnDraw = this.container.querySelector('#btn-draw-card');
    if (btnDraw) {
      btnDraw.addEventListener('click', () => {
        this.playSynthSound(659.25, 'sine', 0.12);
        const keys = ["tierra_t1_1", "aire_t1_1", "agua_t1_1", "microbios_t1_1"];
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const base = window.CREATURES_DB[randomKey] || window.CREATURES_DB["tierra_t1_1"];
        const newCard = {
          instanceId: "card_" + Math.random().toString(36).substr(2, 9),
          ...base
        };
        this.cards.push(newCard);
        this.render();
        if (this.rewardModal) this.rewardModal.show(newCard);
      });
    }
  }

  removeCards(instanceIds) {
    this.cards = this.cards.filter(c => !instanceIds.includes(c.instanceId));
    this.selectedFusionCards = [null, null];
    this.isFusing = false;
    this.render();
  }

  addCard(newCard) {
    this.cards.push(newCard);
    this.isFusing = false;
    this.render();
    if (this.rewardModal) this.rewardModal.show(newCard);
  }
}

window.BackpackGrid = BackpackGrid;
