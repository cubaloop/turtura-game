// Component for Pokémon Scarlet/Violet Style Deck UI & Summary Sheet
class BackpackGrid {
  constructor(containerId, initialCards, onFuseTrigger, cardModal, rewardModal) {
    this.container = document.getElementById(containerId);
    this.cards = initialCards || [];
    this.onFuseTrigger = onFuseTrigger;
    this.cardModal = cardModal;
    this.rewardModal = rewardModal;
    this.selectedCardIndex = 0;
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

        <button class="btn-inspect-3d" data-instance-id="${card.instanceId}" style="position: absolute; top: 4px; right: 4px; background: rgba(0,0,0,0.7); border: 1px solid var(--border-gold); color: var(--text-gold); font-size: 0.65rem; padding: 2px 5px; border-radius: 6px; cursor: pointer; z-index: 5; font-weight: 800;">
          3D 🔍
        </button>
      </div>
    `;
  }

  render() {
    const selected = this.cards[this.selectedCardIndex] || this.cards[0] || {
      name: "Escarabajo Rinoceronte",
      category: "Tierra",
      tier: 1,
      atk: 12,
      def: 25,
      spd: 5,
      ability: "Caparazón: +5 DEF",
      icon: "🪲",
      image: "assets/rhino_beetle.jpg"
    };

    this.container.innerHTML = `
      <div class="backpack-wrapper">
        
        <!-- POKÉMON SCARLET/VIOLET BATTLE TEAM & SUMMARY LAYOUT -->
        <div class="pokemon-sv-deck-container">
          
          <!-- LEFT PANEL: BATTLE TEAM & STORAGE BOX -->
          <div class="sv-left-panel">
            <!-- BATTLE TEAM ROW (4 SLOTS) -->
            <div class="sv-team-section">
              <div class="sv-team-title">
                <span>⚔️ EQUIPO DE BATALLA (4/4)</span>
                <span>Lv. 50</span>
              </div>
              <div class="sv-team-slots">
                ${this.cards.slice(0, 4).map((card, idx) => `
                  <div class="sv-box-item ${this.selectedCardIndex === idx ? 'selected' : ''}" data-card-idx="${idx}" style="height: 75px;">
                    <div style="font-size: 1.6rem;">${card.icon || '🪲'}</div>
                    <div style="font-size: 0.65rem; font-weight: 900; color: #fff;">T${card.tier || 1}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- CAJA DE ALMACENAMIENTO (PC BOX 1) -->
            <div class="sv-box-section">
              <div class="sv-team-title" style="color: var(--accent-gold);">
                <span>📦 CAJA DE ALMACENAMIENTO 1</span>
                <span>${this.cards.length} Criaturas</span>
              </div>
              <div class="sv-box-grid">
                ${this.cards.map((card, idx) => `
                  <div class="sv-box-item ${this.selectedCardIndex === idx ? 'selected' : ''}" data-card-idx="${idx}">
                    <div style="font-size: 1.4rem;">${card.icon || '🪲'}</div>
                    <div style="font-size: 0.6rem; color: #cbd5e1; font-weight: 800;">${card.name.substring(0, 6)}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div style="display: flex; gap: 0.75rem;">
              <button class="rpg-btn-gold" id="btn-draw-card" style="font-size: 0.85rem; padding: 0.5rem 1rem; width: 100%;">
                🎲 Recibir Carta (+1)
              </button>
            </div>
          </div>

          <!-- RIGHT PANEL: POKÉMON SUMMARY SHEET -->
          <div class="sv-right-panel">
            <div>
              <div class="sv-summary-header">
                <div>
                  <div class="sv-summary-name">${selected.name}</div>
                  <div style="font-size: 0.75rem; color: #38bdf8; font-weight: 800;">TIPO: ${selected.category.toUpperCase()}</div>
                </div>
                <div class="sv-summary-level">Lv. 50</div>
              </div>

              <!-- ARTWORK PREVIEW -->
              <div style="height: 140px; border-radius: 14px; overflow: hidden; margin: 1rem 0; border: 2px solid #38bdf8; background: #0f172a; display: flex; align-items: center; justify-content: center;">
                ${selected.image ? `<img src="${selected.image}" style="width: 100%; height: 100%; object-fit: cover;">` : `<span style="font-size: 4rem;">${selected.icon}</span>`}
              </div>

              <!-- STAT BARS -->
              <div class="sv-stat-bar-group">
                <div class="sv-stat-row">
                  <span class="sv-stat-label">ATK</span>
                  <div class="sv-stat-track"><div class="sv-stat-fill" style="width: ${Math.min(selected.atk * 1.5, 100)}%; background: #f43f5e;"></div></div>
                  <span style="color: #f43f5e;">${selected.atk}</span>
                </div>
                <div class="sv-stat-row">
                  <span class="sv-stat-label">DEF</span>
                  <div class="sv-stat-track"><div class="sv-stat-fill" style="width: ${Math.min(selected.def * 1.5, 100)}%; background: #3b82f6;"></div></div>
                  <span style="color: #3b82f6;">${selected.def}</span>
                </div>
                <div class="sv-stat-row">
                  <span class="sv-stat-label">SPD</span>
                  <div class="sv-stat-track"><div class="sv-stat-fill" style="width: ${Math.min(selected.spd * 2, 100)}%; background: #10b981;"></div></div>
                  <span style="color: #10b981;">${selected.spd}</span>
                </div>
              </div>
            </div>

            <!-- MOVESET / PASIVAS -->
            <div>
              <div style="font-size: 0.75rem; font-weight: 900; color: #94a3b8; text-transform: uppercase; margin-bottom: 0.5rem;">
                ⚔️ HABILIDADES Y MOVIMIENTOS
              </div>
              <div class="sv-moves-list">
                <div class="sv-move-card">⚡ ${selected.ability}</div>
                <div class="sv-move-card">🛡️ Escudo Elemental</div>
                <div class="sv-move-card">🔥 Embestida T${selected.tier}</div>
                <div class="sv-move-card">🌀 Vórtice Crítico</div>
              </div>

              <button class="btn-inspect-3d rpg-btn-green" data-instance-id="${selected.instanceId}" style="width: 100%; margin-top: 1rem; font-size: 0.85rem; padding: 0.6rem;">
                INSPECCIONAR CARTA EN 3D 🔍
              </button>
            </div>

          </div>

        </div>

        <!-- ELEMENTAL FUSION CHAMBER WITH SWIRLING ENERGY VORTEX -->
        <div class="fusion-chamber" style="position: relative; overflow: hidden; margin-top: 1.5rem;">
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
            Selecciona 2 cartas para activar el vórtice de síntesis.
          </div>

          <div style="display: flex; gap: 1rem;">
            <button class="rpg-btn-green" id="btn-start-fusion" ${(!this.selectedFusionCards[0] || !this.selectedFusionCards[1]) ? 'disabled' : ''}>
              ACTIVAR VÓRTICE DE FUSIÓN 🔥
            </button>
            <button class="tab-btn" id="btn-clear-fusion" style="padding: 0.6rem 1rem;">
              Limpiar
            </button>
          </div>
        </div>

      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const boxItems = this.container.querySelectorAll('.sv-box-item');
    boxItems.forEach(item => {
      item.addEventListener('click', () => {
        this.playSynthSound(587.33, 'sine', 0.08);
        const idx = parseInt(item.getAttribute('data-card-idx'));
        this.selectedCardIndex = idx;
        
        const cardObj = this.cards[idx];
        if (cardObj) {
          if (!this.selectedFusionCards[0]) {
            this.selectedFusionCards[0] = cardObj;
          } else if (!this.selectedFusionCards[1] && this.selectedFusionCards[0].instanceId !== cardObj.instanceId) {
            this.selectedFusionCards[1] = cardObj;
          }
        }
        this.render();
      });
    });

    const inspectBtns = this.container.querySelectorAll('.btn-inspect-3d');
    inspectBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const instanceId = btn.getAttribute('data-instance-id');
        const cardObj = this.cards.find(c => c.instanceId === instanceId) || this.cards[this.selectedCardIndex];
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
