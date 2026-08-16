// Clean 1:1 Turtura Inventory Component: "Mis Cartas - Turtura" (Imagen 2)
class BackpackGrid {
  constructor(containerId, initialCards, onFuseTrigger, cardModal, rewardModal) {
    this.container = document.getElementById(containerId);
    this.cards = initialCards || [];
    this.onFuseTrigger = onFuseTrigger;
    this.cardModal = cardModal;
    this.rewardModal = rewardModal;
    this.selectedIndex = 0;
    this.init();
  }

  init() {
    this.render();
  }

  renderCardHtml(card, idx) {
    if (!card) return '';
    const isSelected = idx === this.selectedIndex;
    const rarityClass = card.rarity === 'legendary' ? 'Leyenda - Oro' : card.rarity === 'epic' ? 'Épico - Morado' : card.rarity === 'rare' ? 'Raro - Azul' : 'Común - Verde';
    const rarityColor = card.rarity === 'legendary' ? '#fbbf24' : card.rarity === 'epic' ? '#c084fc' : card.rarity === 'rare' ? '#38bdf8' : '#4ade80';

    return `
      <div class="card-item-slot ${isSelected ? 'selected' : ''}" data-idx="${idx}">
        <div class="card-art-box">
          <img src="${card.image || 'assets/rhino_beetle.jpg'}" alt="${card.name}">
          <span style="position: absolute; top: 3px; right: 3px; background: rgba(0,0,0,0.85); color: ${card.gemColor || '#10b981'}; font-size: 0.58rem; font-weight: 900; padding: 2px 5px; border-radius: 4px; border: 1px solid ${card.gemColor || '#10b981'};">
            ${card.category}
          </span>
        </div>

        <div style="font-size: 0.7rem; font-weight: 900; color: #fff; text-align: center; margin-top: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          Nivel ${card.tier || 1}
        </div>

        <div style="font-size: 0.6rem; font-weight: 800; color: ${rarityColor}; text-align: center;">
          ${rarityClass}
        </div>

        <div style="font-size: 0.6rem; color: #cbd5e1; text-align: center;">
          ${card.atk || 150} HP, ${card.def || 90} ATK
        </div>

        <!-- DUPLICATE PROGRESS BAR -->
        <div style="width: 100%; background: #000; border: 1px solid #4ade80; border-radius: 6px; height: 10px; overflow: hidden; margin-top: 3px; position: relative;">
          <div style="width: 75%; background: #22c55e; height: 100%;"></div>
          <span style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; font-size: 0.52rem; font-weight: 900; color: #fff; line-height: 10px; display: flex; align-items: center; justify-content: center;">75 / 100</span>
        </div>
      </div>
    `;
  }

  renderRadarChartSvg(card) {
    return `
      <svg viewBox="0 0 100 100" style="width: 100px; height: 100px;">
        <!-- Polygon Grid -->
        <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="none" stroke="#2e6037" stroke-width="1.5" />
        <polygon points="50,25 72,38 72,62 50,75 28,62 28,38" fill="none" stroke="#2e6037" stroke-width="1" />
        <!-- Stat Poly -->
        <polygon points="50,18 78,32 70,64 50,82 22,66 25,35" fill="rgba(74, 222, 128, 0.45)" stroke="#4ade80" stroke-width="2" />
      </svg>
    `;
  }

  render() {
    const selectedCard = this.cards[this.selectedIndex] || this.cards[0] || window.CREATURES_DB["tierra_t1_1"];

    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 1150px; margin: 0 auto;">
        
        <!-- HEADER TABS (1:1 IMAGEN 2) -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(20,40,25,0.95); border: 2px solid var(--border-gold-3d); border-radius: 16px; padding: 0.5rem 1rem;">
          <h2 style="font-size: 1.2rem; font-weight: 900; color: var(--accent-gold);">Mis Cartas - Turtura</h2>
          <div style="display: flex; gap: 0.5rem;">
            <button class="tab-btn" style="padding: 0.35rem 0.75rem; font-size: 0.78rem;">📚 Álbumes</button>
            <button class="tab-btn" style="padding: 0.35rem 0.75rem; font-size: 0.78rem;">🎴 Barajas</button>
            <button class="tab-btn active" style="padding: 0.35rem 0.75rem; font-size: 0.78rem;">🐚 Colección Completa</button>
          </div>
        </div>

        <!-- SEARCH & FILTER BAR -->
        <div style="display: flex; gap: 0.65rem; align-items: center;">
          <input type="text" placeholder="Buscar elemento..." style="flex: 1; background: rgba(0,0,0,0.75); border: 2px solid #2e5a35; border-radius: 12px; padding: 0.55rem 0.9rem; color: #fff; font-weight: 800; font-size: 0.82rem;">
          <select style="background: rgba(0,0,0,0.75); border: 2px solid #2e5a35; border-radius: 12px; padding: 0.55rem 0.9rem; color: #fbbf24; font-weight: 900; font-size: 0.82rem;">
            <option>Rareza 🔻</option>
            <option>Nivel</option>
            <option>Ataque</option>
          </select>
          <button class="tab-btn" style="padding: 0.55rem 0.9rem; font-size: 0.82rem;">⚙️ Filtro</button>
        </div>

        <!-- TWO-PANEL LAYOUT -->
        <div class="inventory-two-panel-wrapper">
          
          <!-- LEFT PANEL: CARDS GRID (3x4) -->
          <div class="inventory-left-panel">
            <div class="cards-grid-3x4">
              ${this.cards.map((card, idx) => this.renderCardHtml(card, idx)).join('')}
            </div>
          </div>

          <!-- RIGHT PANEL: SELECTED CREATURE SUMMARY SHEET (1:1 IMAGEN 2) -->
          <div class="inventory-right-panel">
            
            <div class="summary-portrait-box">
              <img src="${selectedCard.image || 'assets/rhino_beetle.jpg'}" alt="${selectedCard.name}">
              <span style="position: absolute; bottom: 6px; left: 6px; background: rgba(0,0,0,0.85); color: #fff; font-weight: 900; font-size: 0.75rem; padding: 2px 8px; border-radius: 6px;">
                Nivel ${selectedCard.tier * 5}
              </span>
            </div>

            <!-- ELEMENTAL GEM ORBS -->
            <div style="display: flex; justify-content: center; gap: 0.6rem; font-size: 1.1rem;">
              <span>🌿</span>
              <span>💧</span>
              <span>🔥</span>
              <span>🪨</span>
            </div>

            <!-- RADAR STAT CHART -->
            <div style="display: flex; justify-content: center; align-items: center; background: rgba(0,0,0,0.6); border-radius: 12px; padding: 0.4rem; border: 1px solid #2e5a35;">
              ${this.renderRadarChartSvg(selectedCard)}
            </div>

            <!-- ABILITY LIST -->
            <div style="display: flex; flex-direction: column; gap: 3px; font-size: 0.72rem;">
              <div style="color: #f43f5e; font-weight: 900;">🔥 ${selectedCard.name} G+</div>
              <div style="color: #cbd5e1; line-height: 1.2; font-size: 0.68rem;">${selectedCard.ability}</div>
              <div style="color: #38bdf8; font-weight: 900; margin-top: 3px;">💧 Tsayomansefish G+</div>
              <div style="color: #4ade80; font-weight: 900; margin-top: 3px;">🌿 Leaf Blunt</div>
            </div>

          </div>

        </div>

        <!-- BOTTOM FUSION CRAFTING BAR (1:1 IMAGEN 2) -->
        <div class="fusion-crafting-bar">
          <div style="display: flex; align-items: center; gap: 0.85rem;">
            <span style="font-size: 0.8rem; font-weight: 900; color: var(--accent-gold);">Fusión Recompensa:</span>
            <div style="display: flex; gap: 0.5rem; align-items: center;">
              <div style="background: #142817; border: 1px solid #4ade80; padding: 3px 6px; border-radius: 6px; font-size: 0.72rem; font-weight: 900; color: #fff;">2/4</div>
              <div style="background: #142817; border: 1px solid #4ade80; padding: 3px 6px; border-radius: 6px; font-size: 0.72rem; font-weight: 900; color: #fff;">2/4</div>
              <div style="background: #142817; border: 1px solid #4ade80; padding: 3px 6px; border-radius: 6px; font-size: 0.72rem; font-weight: 900; color: #fff;">3/4</div>
              <div style="background: #142817; border: 1px solid #4ade80; padding: 3px 6px; border-radius: 6px; font-size: 0.72rem; font-weight: 900; color: #fff;">4/4</div>
              <span style="font-size: 1.1rem; color: #fbbf24;">➔</span>
              <div style="background: #78350f; border: 2px solid #fbbf24; padding: 3px 8px; border-radius: 8px; font-size: 0.72rem; font-weight: 900; color: #fff;">Fusión Recompensa 🏆</div>
            </div>
          </div>

          <button class="rpg-btn-gold" id="btn-go-fusion" style="padding: 0.55rem 1.15rem; font-size: 0.82rem;">
            Ir a Fusión 🎫
          </button>
        </div>

      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const cardItems = this.container.querySelectorAll('.card-item-slot');
    cardItems.forEach(item => {
      item.addEventListener('click', () => {
        const idx = parseInt(item.getAttribute('data-idx'));
        this.selectedIndex = idx;
        this.render();
      });
    });

    const btnGoFusion = this.container.querySelector('#btn-go-fusion');
    if (btnGoFusion) {
      btnGoFusion.addEventListener('click', () => {
        if (this.onFuseTrigger && this.cards.length >= 2) {
          this.onFuseTrigger(this.cards[0], this.cards[1]);
        }
      });
    }
  }

  removeCards(instanceIds) {
    this.cards = this.cards.filter(c => !instanceIds.includes(c.instanceId));
    this.render();
  }

  addCard(newCard) {
    this.cards.push(newCard);
    this.render();
    if (this.rewardModal) this.rewardModal.show(newCard);
  }
}

window.BackpackGrid = BackpackGrid;
