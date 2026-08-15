// 21-Slot Inventory Grid Component & Pop-out Side Fusion Drawer for Turtura
class BackpackGrid {
  constructor(containerId, initialCards, onFuseTrigger, cardModal, rewardModal) {
    this.container = document.getElementById(containerId);
    this.cards = initialCards || [];
    this.maxSlots = 21; // Exactly 21 Inventory Slots
    this.onFuseTrigger = onFuseTrigger;
    this.cardModal = cardModal;
    this.rewardModal = rewardModal;
    this.selectedCardIndex = 0;
    this.selectedFusionCards = [null, null];
    this.isDrawerOpen = false;
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
    const gemColor = card.gemColor || '#10b981';

    return `
      <div class="creature-card ${frameClass}" data-instance-id="${card.instanceId}">
        <div class="card-header">
          <div style="display: flex; align-items: center; gap: 4px;">
            <div class="card-type-gem" style="background: ${gemColor};"></div>
            <span class="card-category-badge">${card.category}</span>
          </div>
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

        <button class="btn-add-fusion" data-instance-id="${card.instanceId}" style="width: 100%; margin-top: 4px; background: linear-gradient(180deg,#fbbf24,#d97706); border: 1px solid #fff; color: #000; font-size: 0.65rem; font-weight: 900; border-radius: 6px; cursor: pointer; padding: 2px 0;">
          + Fusionar
        </button>
      </div>
    `;
  }

  render() {
    const filledCards = [...this.cards];
    const totalSlotsArray = Array.from({ length: this.maxSlots });

    this.container.innerHTML = `
      <div class="backpack-flex-container">
        
        <!-- 21-SLOT INVENTORY CONTAINER -->
        <div class="inventory-21-container">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="font-size: 1.2rem; font-weight: 900; color: var(--accent-gold);">
              🎒 Mochila de Criaturas (21 Casillas de Inventario)
            </div>
            <div style="font-size: 0.85rem; font-weight: 900; color: #4ade80; background: rgba(34,197,94,0.2); padding: 4px 12px; border-radius: 14px; border: 1px solid #4ade80;">
              ${this.cards.length} / 21 Ocupadas
            </div>
          </div>

          <!-- 21 GRID SLOTS (7 COLUMNS x 3 ROWS) -->
          <div class="grid-21-slots">
            ${totalSlotsArray.map((_, idx) => {
              const card = filledCards[idx];
              return `
                <div class="slot-21-item ${card ? 'occupied' : ''}">
                  ${card ? this.renderCardHtml(card) : `<span style="color:#64748b; font-size:0.75rem; font-weight:800; margin:auto;">Slot ${idx+1}</span>`}
                </div>
              `;
            }).join('')}
          </div>

          <div style="margin-top: 1.25rem; display: flex; gap: 1rem;">
            <button class="rpg-btn-gold" id="btn-draw-card" style="font-size: 0.85rem; padding: 0.5rem 1rem;">
              🎲 Recibir Nueva Carta (+1)
            </button>
          </div>
        </div>

        <!-- POP-OUT SIDE FUSION DRAWER -->
        <div class="side-fusion-drawer ${this.isDrawerOpen ? '' : 'closed'}" id="fusion-side-drawer">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--border-gold-3d); padding-bottom: 0.5rem;">
            <span style="font-weight: 900; color: var(--accent-gold); font-size: 1rem;">🧪 CÁMARA DE FUSIÓN</span>
            <button id="btn-close-drawer" style="background: none; border: none; color: #f43f5e; font-size: 1.2rem; cursor: pointer; font-weight: 900;">✖</button>
          </div>

          <div style="font-size: 0.85rem; color: #cbd5e1; text-align: center;">
            Selecciona 2 cartas de tus 21 casillas para combinarlas en una criatura única.
          </div>

          <!-- DRAWER FUSION SLOTS -->
          <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
            <div class="drawer-slot-box" id="drawer-slot-0">
              ${this.selectedFusionCards[0] ? this.renderCardHtml(this.selectedFusionCards[0]) : '<span style="color:#fbbf24; font-weight:900;">+ Carta 1</span>'}
            </div>
            <div style="font-size: 1.5rem; font-weight: 900; color: var(--accent-gold);">+</div>
            <div class="drawer-slot-box" id="drawer-slot-1">
              ${this.selectedFusionCards[1] ? this.renderCardHtml(this.selectedFusionCards[1]) : '<span style="color:#fbbf24; font-weight:900;">+ Carta 2</span>'}
            </div>
          </div>

          <button class="rpg-btn-green" id="btn-start-fusion" ${(!this.selectedFusionCards[0] || !this.selectedFusionCards[1]) ? 'disabled' : ''} style="width: 100%; font-size: 0.95rem; padding: 0.75rem;">
            SINTETIZAR FUSIÓN 🔥
          </button>
          <button class="tab-btn" id="btn-clear-fusion" style="padding: 0.5rem; justify-content: center;">
            Limpiar Selección
          </button>
        </div>

      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    // Add Fusion Buttons
    const addFusionBtns = this.container.querySelectorAll('.btn-add-fusion');
    addFusionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.playSynthSound(587.33, 'sine', 0.08);
        const instanceId = btn.getAttribute('data-instance-id');
        const cardObj = this.cards.find(c => c.instanceId === instanceId);
        if (!cardObj) return;

        this.isDrawerOpen = true; // Auto pop open side drawer!

        if (!this.selectedFusionCards[0]) {
          this.selectedFusionCards[0] = cardObj;
        } else if (!this.selectedFusionCards[1] && this.selectedFusionCards[0].instanceId !== cardObj.instanceId) {
          this.selectedFusionCards[1] = cardObj;
        }

        this.render();
      });
    });

    const btnCloseDrawer = this.container.querySelector('#btn-close-drawer');
    if (btnCloseDrawer) {
      btnCloseDrawer.addEventListener('click', () => {
        this.isDrawerOpen = false;
        this.selectedFusionCards = [null, null];
        this.render();
      });
    }

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
          this.onFuseTrigger(this.selectedFusionCards[0], this.selectedFusionCards[1]);
        }
      });
    }

    const btnDraw = this.container.querySelector('#btn-draw-card');
    if (btnDraw) {
      btnDraw.addEventListener('click', () => {
        if (this.cards.length >= 21) {
          alert("🎒 Tu mochila está llena (21/21 casillas). Fusiona cartas para liberar espacio.");
          return;
        }
        this.playSynthSound(659.25, 'sine', 0.12);
        const keys = Object.keys(window.CREATURES_DB);
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
