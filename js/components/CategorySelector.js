// 100% Pixel-Perfect Turtura Main Menu Component (Imagen 1)
class CategorySelector {
  constructor(containerId, onSelectCategory) {
    this.container = document.getElementById(containerId);
    this.onSelectCategory = onSelectCategory;
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div style="position: relative; width: 100%; max-width: 440px; margin: 0 auto; height: 860px; background: url('assets/ref_menu_main.jpg') center/cover no-repeat; border-radius: 28px; border: 4px solid var(--border-gold-3d); box-shadow: 0 15px 45px rgba(0,0,0,0.95); overflow: hidden;">
        
        <!-- LIVE CURRENCY OVERLAYS -->
        <div style="position: absolute; top: 18px; left: 16px; font-weight: 900; font-size: 0.95rem; color: #fff; text-shadow: 2px 2px 0 #000;">
          11 TURTURA
        </div>
        <div style="position: absolute; top: 18px; right: 85px; font-weight: 900; font-size: 0.85rem; color: #4ade80;">
          123 💎
        </div>
        <div style="position: absolute; top: 18px; right: 18px; font-weight: 900; font-size: 0.85rem; color: #fbbf24;">
          74851 🪙
        </div>

        <!-- LEFT SIDE HOT-ZONES -->
        <div id="btn-profile-hero" style="position: absolute; top: 60px; left: 14px; width: 54px; height: 54px; cursor: pointer;"></div>
        <div id="btn-chest-rewards" style="position: absolute; top: 125px; left: 14px; width: 54px; height: 54px; cursor: pointer;"></div>
        <div id="btn-scroll-collection" style="position: absolute; top: 190px; left: 14px; width: 54px; height: 54px; cursor: pointer;"></div>
        <div id="btn-discord-community" style="position: absolute; top: 260px; left: 14px; width: 54px; height: 54px; cursor: pointer;"></div>
        <div id="btn-rank-crown" style="position: absolute; top: 330px; left: 14px; width: 54px; height: 54px; cursor: pointer;"></div>

        <!-- RIGHT SIDE HOT-ZONES -->
        <div id="btn-top-menu" style="position: absolute; top: 60px; right: 14px; width: 54px; height: 54px; cursor: pointer;"></div>
        <div id="btn-top-notice" style="position: absolute; top: 125px; right: 14px; width: 54px; height: 54px; cursor: pointer;"></div>
        <div id="btn-golden-tree" style="position: absolute; top: 190px; right: 14px; width: 54px; height: 54px; cursor: pointer;"></div>

        <!-- CENTER EMBLEM HOT-ZONE -->
        <div id="btn-center-crest" style="position: absolute; top: 220px; left: 50%; transform: translateX(-50%); width: 220px; height: 180px; cursor: pointer;"></div>

        <!-- MAIN ACTION BUTTONS HOT-ZONES (1:1 IMAGEN 1) -->
        <div id="btn-turn-duel" style="position: absolute; bottom: 185px; left: 45px; width: 165px; height: 60px; cursor: pointer;"></div>
        <div id="btn-challenge-tower" style="position: absolute; bottom: 185px; right: 45px; width: 165px; height: 60px; cursor: pointer;"></div>

        <!-- BOTTOM PROGRESS BANNER HOT-ZONE (1:1 IMAGEN 1) -->
        <div id="btn-fusion-mastery-banner" style="position: absolute; bottom: 85px; left: 16px; right: 16px; height: 65px; cursor: pointer;"></div>

      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const btnTower = this.container.querySelector('#btn-challenge-tower');
    if (btnTower) {
      btnTower.addEventListener('click', () => {
        if (this.onSelectCategory) this.onSelectCategory('combat');
      });
    }

    const btnDuel = this.container.querySelector('#btn-turn-duel');
    if (btnDuel) {
      btnDuel.addEventListener('click', () => {
        if (this.onSelectCategory) this.onSelectCategory('combat');
      });
    }

    const btnDiscord = this.container.querySelector('#btn-discord-community');
    if (btnDiscord) {
      btnDiscord.addEventListener('click', () => {
        alert("💬 Conectando a la Comunidad Oficial de Turtura Discord...");
      });
    }
  }
}

window.CategorySelector = CategorySelector;
