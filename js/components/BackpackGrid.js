// 100% Pixel-Perfect Turtura Inventory Component (Imagen 2)
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

  render() {
    const selectedCard = this.cards[this.selectedIndex] || this.cards[0] || window.CREATURES_DB["tierra_t1_1"];

    this.container.innerHTML = `
      <div style="position: relative; width: 100%; max-width: 440px; margin: 0 auto; height: 860px; background: url('assets/ref_menu_inventory.jpg') center/cover no-repeat; border-radius: 28px; border: 4px solid var(--border-gold-3d); box-shadow: 0 15px 45px rgba(0,0,0,0.95); overflow: hidden;">
        
        <!-- HEADER TABS HOT-ZONES -->
        <div id="tab-albums" style="position: absolute; top: 125px; left: 16px; width: 100px; height: 35px; cursor: pointer;"></div>
        <div id="tab-decks" style="position: absolute; top: 125px; left: 125px; width: 100px; height: 35px; cursor: pointer;"></div>
        <div id="tab-collection" style="position: absolute; top: 125px; right: 16px; width: 140px; height: 35px; cursor: pointer;"></div>

        <!-- SEARCH & FILTER HOT-ZONES -->
        <div id="btn-filter-toggle" style="position: absolute; top: 175px; right: 16px; width: 40px; height: 35px; cursor: pointer;"></div>

        <!-- 3x4 CARDS GRID OVERLAY ON LEFT PANEL -->
        <div style="position: absolute; top: 220px; left: 14px; width: 230px; height: 500px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;">
          ${this.cards.slice(0, 12).map((card, idx) => `
            <div class="pixel-card-slot ${idx === this.selectedIndex ? 'selected' : ''}" data-idx="${idx}" style="
              border-radius: 8px;
              cursor: pointer;
              position: relative;
              overflow: hidden;
              border: ${idx === this.selectedIndex ? '2px solid #fbbf24' : 'none'};
              box-shadow: ${idx === this.selectedIndex ? '0 0 12px #fbbf24' : 'none'};
            ">
              <img src="${card.image || 'assets/rhino_beetle.jpg'}" style="width: 100%; height: 100%; object-fit: cover;" alt="${card.name}">
            </div>
          `).join('')}
        </div>

        <!-- SUMMARY SHEET OVERLAY ON RIGHT PANEL -->
        <div style="position: absolute; top: 220px; right: 14px; width: 160px; height: 500px; display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 0.5rem 0;">
          
          <div style="width: 100px; height: 95px; border-radius: 10px; overflow: hidden; border: 1.5px solid #fbbf24; margin-top: 10px;">
            <img src="${selectedCard.image || 'assets/rhino_beetle.jpg'}" style="width: 100%; height: 100%; object-fit: cover;" alt="${selectedCard.name}">
          </div>

          <div style="font-size: 0.72rem; font-weight: 900; color: #fff; text-shadow: 1px 1px 0 #000; text-align: center;">
            ${selectedCard.name}
          </div>

          <div style="font-size: 0.65rem; color: #4ade80; font-weight: 800; text-align: center;">
            ${selectedCard.ability}
          </div>

        </div>

        <!-- BOTTOM FUSION CRAFTING BAR HOT-ZONE (1:1 IMAGEN 2) -->
        <div id="btn-go-fusion" style="position: absolute; bottom: 85px; right: 16px; width: 140px; height: 50px; cursor: pointer;"></div>

      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const cardItems = this.container.querySelectorAll('.pixel-card-slot');
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
