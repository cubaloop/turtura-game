// Turtura Step 2 Overhaul: Majestic 3D Game Graphics & Responsive Desktop Layout
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
      <div style="display: flex; flex-direction: column; gap: 1.25rem; width: 100%; max-width: 1080px; margin: 0 auto; padding: 0 1rem;">
        
        <!-- MAJESTIC 3D MAIN HUB STAGE (RESPONSIVE FULL-SCALE DESKTOP/MOBILE) -->
        <div style="background: linear-gradient(180deg, rgba(18, 38, 22, 0.94), rgba(8, 20, 9, 0.98)); border: 4px solid var(--border-gold-3d); border-radius: 28px; padding: 2rem 2.5rem; display: flex; justify-content: space-between; align-items: center; position: relative; box-shadow: 0 20px 60px rgba(0,0,0,0.95); min-height: 560px;">
          
          <!-- LEFT SIDE STACK WITH REAL 3D ICONS -->
          <div style="display: flex; flex-direction: column; gap: 1rem; z-index: 10;">
            <div style="width: 58px; height: 58px; background: rgba(30,20,15,0.9); border: 2px solid #fbbf24; border-radius: 16px; overflow: hidden; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 6px 15px rgba(0,0,0,0.8);">
              <img src="assets/icon_dragon_3d.jpg" style="width: 100%; height: 100%; object-fit: cover;" alt="Dragon Profile">
            </div>
            <div style="width: 58px; height: 58px; background: rgba(30,20,15,0.9); border: 2px solid #fbbf24; border-radius: 16px; overflow: hidden; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 6px 15px rgba(0,0,0,0.8);">
              <img src="assets/icon_chest_3d.jpg" style="width: 100%; height: 100%; object-fit: cover;" alt="Chest Rewards">
            </div>
            <div style="background: rgba(30,20,15,0.9); border: 2px solid #fbbf24; border-radius: 16px; padding: 6px 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 6px 15px rgba(0,0,0,0.8);">
              <span style="font-size: 1.2rem; color: #fbbf24;">📜</span>
              <span style="font-size: 0.65rem; font-weight: 900; color: #fef08a;">Colección</span>
            </div>
            <div style="background: #5865f2; border: 2px solid #fff; border-radius: 16px; padding: 6px 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 6px 15px rgba(0,0,0,0.8);">
              <span style="font-size: 1.2rem; color: #fff;">💬</span>
              <span style="font-size: 0.62rem; font-weight: 900; color: #fff;">Turtura Discord</span>
            </div>
          </div>

          <!-- CENTER 3D CREST & MAJESTIC ACTION BUTTONS (1:1 IMAGEN 1) -->
          <div style="display: flex; flex-direction: column; align-items: center; text-align: center; flex: 1; margin: 0 2rem; z-index: 10;">
            
            <!-- HIGH-RESOLUTION 3D LOGO EMBLEM -->
            <div style="width: 240px; height: 210px; border-radius: 24px; overflow: hidden; border: 3px solid #fbbf24; box-shadow: 0 0 35px rgba(251,191,36,0.6); position: relative; margin-bottom: 0.5rem;">
              <img src="assets/logo_3d.jpg" style="width: 100%; height: 100%; object-fit: cover;" alt="Turtura 3D Logo Emblem">
            </div>

            <!-- DAILY BOOST BADGE -->
            <div style="background: rgba(0,0,0,0.85); border: 2px solid #fbbf24; border-radius: 14px; padding: 6px 18px; margin-top: 0.5rem; box-shadow: 0 4px 12px rgba(0,0,0,0.7);">
              <div style="font-size: 0.75rem; color: #fbbf24; font-weight: 900; letter-spacing: 0.5px;">🪖 Impulso Diario de Fusión</div>
              <div style="font-size: 0.8rem; color: #cbd5e1; font-weight: 800;">Se reinicia en 1 h 12 min</div>
            </div>

            <!-- MAJESTIC 3D ACTION BUTTONS WITH 3D RENDERED ICONS -->
            <div style="display: flex; gap: 1.25rem; margin-top: 1.5rem;">
              <button class="rpg-btn-gold" id="btn-turn-duel" style="padding: 0.85rem 1.6rem; font-size: 1rem; display: flex; align-items: center; gap: 0.75rem;">
                <img src="assets/icon_duel_3d.jpg" style="width: 32px; height: 32px; border-radius: 8px; object-fit: cover;" alt="Duel Icon">
                <span>Duelo por Turnos</span>
              </button>

              <button class="rpg-btn-green" id="btn-challenge-tower" style="padding: 0.85rem 1.6rem; font-size: 1rem; display: flex; align-items: center; gap: 0.75rem;">
                <img src="assets/icon_tower_3d.jpg" style="width: 32px; height: 32px; border-radius: 8px; object-fit: cover;" alt="Tower Icon">
                <span>Desafiar la Torre</span>
              </button>
            </div>

          </div>

          <!-- RIGHT SIDE STACK -->
          <div style="display: flex; flex-direction: column; gap: 1rem; z-index: 10;">
            <div style="width: 58px; height: 58px; background: rgba(30,20,15,0.9); border: 2px solid #fbbf24; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: #fbbf24; cursor: pointer; box-shadow: 0 6px 15px rgba(0,0,0,0.8);">
              ☰
            </div>
            <div style="width: 58px; height: 58px; background: rgba(30,20,15,0.9); border: 2px solid #fbbf24; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: #fbbf24; cursor: pointer; box-shadow: 0 6px 15px rgba(0,0,0,0.8);">
              📜
            </div>
            <div style="width: 58px; height: 58px; background: rgba(30,20,15,0.9); border: 2px solid #fbbf24; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; color: #fbbf24; cursor: pointer; box-shadow: 0 6px 15px rgba(0,0,0,0.8);">
              🌳
            </div>
          </div>

        </div>

        <!-- BOTTOM PROGRESS BANNER (1:1 IMAGEN 1) -->
        <div style="background: linear-gradient(180deg, rgba(36,23,16,0.96), rgba(20,13,8,0.98)); border: 3px solid var(--border-gold-3d); border-radius: 20px; padding: 0.85rem 1.75rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 8px 24px rgba(0,0,0,0.9);">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="background: #78350f; border: 2px solid #fbbf24; color: #fff; font-weight: 900; font-size: 0.95rem; padding: 6px 14px; border-radius: 10px;">
              🛡️ 6
            </div>
            <div style="font-size: 1.15rem; font-weight: 900; color: #fff; letter-spacing: 0.5px;">
              Maestría de Fusión
            </div>
          </div>

          <div style="width: 260px; background: #000; border: 2px solid #fbbf24; border-radius: 12px; height: 22px; overflow: hidden; position: relative;">
            <div style="width: 50%; background: linear-gradient(90deg, #fbbf24, #d97706); height: 100%;"></div>
            <span style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; font-size: 0.8rem; font-weight: 900; color: #fff; line-height: 22px; display: flex; align-items: center; justify-content: center;">10 / 20</span>
          </div>
        </div>

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
  }
}

window.CategorySelector = CategorySelector;
