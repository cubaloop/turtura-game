// 1:1 Turtura Inventory Component: "Mis Cartas - Turtura" (Imagen 2)
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
      <div class="inventory-card-item ${isSelected ? 'selected' : ''}" data-idx="${idx}" style="
        background: linear-gradient(180deg, #1c2e1f, #0f1c11);
        border: 2px solid ${isSelected ? '#fbbf24' : '#2e5a35'};
        border-radius: 14px;
        padding: 0.4rem;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: ${isSelected ? '0 0 15px #fbbf24' : '0 4px 10px rgba(0,0,0,0.6)'};
        position: relative;
        transition: transform 0.2s ease;
      ">
        <div style="width: 100%; height: 90px; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.2); position: relative;">
          <img src="${card.image || 'assets/rhino_beetle.jpg'}" style="width: 100%; height: 100%; object-fit: cover;" alt="${card.name}">
          <span style="position: absolute; top: 4px; right: 4px; background: rgba(0,0,0,0.85); color: ${card.gemColor || '#10b981'}; font-size: 0.6rem; font-weight: 900; padding: 2px 6px; border-radius: 6px; border: 1px solid ${card.gemColor || '#10b981'};">
            ${card.category}
          </span>
        </div>

        <div style="font-size: 0.72rem; font-weight: 900; color: #fff; text-align: center; margin-top: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          Nivel ${card.tier || 1}
        </div>

        <div style="font-size: 0.62rem; font-weight: 800; color: ${rarityColor}; text-align: center;">
          ${rarityClass}
        </div>

        <div style="font-size: 0.62rem; color: #cbd5e1; text-align: center;">
          ${card.atk || 150} HP, ${card.def || 90} ATK
        </div>

        <!-- DUPLICATE PROGRESS BAR -->
        <div style="width: 100%; background: #000; border: 1px solid #4ade80; border-radius: 6px; height: 10px; overflow: hidden; margin-top: 3px; position: relative;">
          <div style="width: 75%; background: #22c55e; height: 100%;"></div>
          <span style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; text-align: center; font-size: 0.55rem; font-weight: 900; color: #fff; line-height: 10px;">75 / 100</span>
        </div>
      </div>
    `;
  }

  renderRadarChartSvg(card) {
    return `
      <svg viewBox="0 0 100 100" style="width: 110px; height: 110px;">
        <!-- Polygon Grid -->
        <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" fill="none" stroke="#2e6037" stroke-width="1.5" />
        <polygon points="50,25 72,38 72,62 50,75 28,62 28,38" fill="none" stroke="#2e6037" stroke-width="1" />
        <!-- Stat Poly -->
        <polygon points="50,18 78,32 70,64 50,82 22,66 25,35" fill="rgba(74, 222, 128, 0.4)" stroke="#4ade80" stroke-width="2" />
      </svg>
    `;
  }

  render() {
    const selectedCard = this.cards[this.selectedIndex] || this.cards[0] || window.CREATURES_DB["tierra_t1_1"];

    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 1240px; margin: 0 auto;">
        
        <!-- HEADER TABS (1:1 IMAGEN 2) -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(20,40,25,0.92); border: 2px solid var(--border-gold-3d); border-radius: 18px; padding: 0.5rem 1rem;">
          <h2 style="font-size: 1.25rem; font-weight: 900; color: var(--accent-gold);">Mis Cartas - Turtura</h2>
          <div style="display: flex; gap: 0.5rem;">
            <button class="tab-btn" style="padding: 0.4rem 0.85rem; font-size: 0.8rem;">📚 Álbumes</button>
            <button class="tab-btn" style="padding: 0.4rem 0.85rem; font-size: 0.8rem;">🎴 Barajas</button>
            <button class="tab-btn active" style="padding: 0.4rem 0.85rem; font-size: 0.8rem;">🐚 Colección Completa</button>
          </div>
        </div>

        <!-- SEARCH & FILTER BAR -->
        <div style="display: flex; gap: 0.75rem; align-items: center;">
          <input type="text" placeholder="Buscar elemento..." style="flex: 1; background: rgba(0,0,0,0.7); border: 2px solid #2e5a35; border-radius: 12px; padding: 0.6rem 1rem; color: #fff; font-weight: 800; font-size: 0.85rem;">
          <select style="background: rgba(0,0,0,0.7); border: 2px solid #2e5a35; border-radius: 12px; padding: 0.6rem 1rem; color: #fbbf24; font-weight: 900; font-size: 0.85rem;">
            <option>Rareza 🔻</option>
            <option>Nivel</option>
            <option>Ataque</option>
          </select>
          <button class="tab-btn" style="padding: 0.6rem 1rem; font-size: 0.85rem;">⚙️ Filtro</button>
        </div>

        <!-- TWO-PANEL LAYOUT (CARDS GRID LEFT + SUMMARY SHEET RIGHT) -->
        <div style="display: flex; gap: 1.25rem; align-items: flex-start;">
          
          <!-- LEFT PANEL: CARDS GRID (3x4) -->
          <div style="flex: 1; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; background: rgba(14,30,17,0.94); border: 3px solid #2e5a35; border-radius: 20px; padding: 1rem; min-height: 480px;">
            ${this.cards.map((card, idx) => this.renderCardHtml(card, idx)).join('')}
          </div>

          <!-- RIGHT PANEL: SELECTED CREATURE SUMMARY SHEET (1:1 IMAGEN 2) -->
          <div style="width: 340px; background: linear-gradient(180deg, rgba(22,48,27,0.96), rgba(12,28,15,0.98)); border: 3px solid var(--border-gold-3d); border-radius: 20px; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.85rem; box-shadow: 0 10px 30px rgba(0,0,0,0.9);">
            
            <div style="width: 100%; height: 160px; border-radius: 14px; overflow: hidden; border: 2px solid #fbbf24; position: relative;">
              <img src="${selectedCard.image || 'assets/rhino_beetle.jpg'}" style="width: 100%; height: 100%; object-fit: cover;" alt="${selectedCard.name}">
              <span style="position: absolute; bottom: 8px; left: 8px; background: rgba(0,0,0,0.85); color: #fff; font-weight: 900; font-size: 0.8rem; padding: 3px 10px; border-radius: 8px;">
                Nivel ${selectedCard.tier * 5}
              </span>
            </div>

            <!-- ELEMENTAL GEM ORBS -->
            <div style="display: flex; justify-content: center; gap: 0.75rem; font-size: 1.2rem;">
              <span>🌿</span>
              <span>💧</span>
              <span>🔥</span>
              <span>🪨</span>
            </div>

            <!-- RADAR STAT CHART -->
            <div style="display: flex; justify-content: center; align-items: center; background: rgba(0,0,0,0.6); border-radius: 14px; padding: 0.5rem; border: 1px solid #2e5a35;">
              ${this.renderRadarChartSvg(selectedCard)}
            </div>

            <!-- ABILITY LIST -->
            <div style="display: flex; flex-direction: column; gap: 4px; font-size: 0.75rem;">
              <div style="color: #f43f5e; font-weight: 900;">🔥 ${selectedCard.name} G+</div>
              <div style="color: #cbd5e1; line-height: 1.2; font-size: 0.7rem;">${selectedCard.ability}</div>
              <div style="color: #38bdf8; font-weight: 900; margin-top: 4px;">💧 Tsayomansefish G+</div>
              <div style="color: #4ade80; font-weight: 900; margin-top: 4px;">🌿 Leaf Blunt</div>
            </div>

          </div>

        </div>

        <!-- BOTTOM FUSION CRAFTING BAR (1:1 IMAGEN 2) -->
        <div style="background: linear-gradient(180deg, rgba(28,58,32,0.95), rgba(14,32,16,0.98)); border: 3px solid var(--border-gold-3d); border-radius: 20px; padding: 0.85rem 1.25rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 8px 24px rgba(0,0,0,0.9);">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span style="font-size: 0.85rem; font-weight: 900; color: var(--accent-gold);">Fusión Recompensa:</span>
            <div style="display: flex; gap: 0.6rem; align-items: center;">
              <div style="background: #142817; border: 1px solid #4ade80; padding: 4px 8px; border-radius: 8px; font-size: 0.75rem; font-weight: 900; color: #fff;">2/4</div>
              <div style="background: #142817; border: 1px solid #4ade80; padding: 4px 8px; border-radius: 8px; font-size: 0.75rem; font-weight: 900; color: #fff;">2/4</div>
              <div style="background: #142817; border: 1px solid #4ade80; padding: 4px 8px; border-radius: 8px; font-size: 0.75rem; font-weight: 900; color: #fff;">3/4</div>
              <div style="background: #142817; border: 1px solid #4ade80; padding: 4px 8px; border-radius: 8px; font-size: 0.75rem; font-weight: 900; color: #fff;">4/4</div>
              <span style="font-size: 1.2rem; color: #fbbf24;">➔</span>
              <div style="background: #78350f; border: 2px solid #fbbf24; padding: 4px 10px; border-radius: 10px; font-size: 0.75rem; font-weight: 900; color: #fff;">Fusión Recompensa 🏆</div>
            </div>
          </div>

          <button class="rpg-btn-gold" id="btn-go-fusion" style="padding: 0.6rem 1.25rem; font-size: 0.85rem;">
            Ir a Fusión 🎫
          </button>
        </div>

      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const cardItems = this.container.querySelectorAll('.inventory-card-item');
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
