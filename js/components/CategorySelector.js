// Turtura Step 2 Upgrade: Floating 3D Icons & Desktop Proportional Layout
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
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 1rem;">
        
        <!-- PROPORTIONAL DESKTOP STAGE WITH FLOATING 3D ICONS (NO DARK BUBBLES) -->
        <div style="background: rgba(18, 38, 22, 0.85); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 3px solid var(--border-gold-3d); border-radius: 28px; padding: 2.5rem; display: flex; justify-content: space-between; align-items: center; position: relative; box-shadow: 0 20px 60px rgba(0,0,0,0.95); min-height: 580px; width: 100%;">
          
          <!-- LEFT SIDE STACK: FLOATING 3D ICONS (NO BUBBLE BOXES) -->
          <div style="display: flex; flex-direction: column; gap: 1.25rem; z-index: 10;">
            <div style="width: 64px; height: 64px; cursor: pointer; filter: drop-shadow(0 8px 18px rgba(0,0,0,0.8)); transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">
              <img src="assets/icon_dragon_3d.jpg" style="width: 100%; height: 100%; object-fit: cover; border-radius: 18px; border: 2px solid #fbbf24;" alt="Dragon Profile">
            </div>
            <div style="width: 64px; height: 64px; cursor: pointer; filter: drop-shadow(0 8px 18px rgba(0,0,0,0.8)); transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">
              <img src="assets/icon_chest_3d.jpg" style="width: 100%; height: 100%; object-fit: cover; border-radius: 18px; border: 2px solid #fbbf24;" alt="Chest Rewards">
            </div>
            <div style="width: 64px; height: 64px; cursor: pointer; filter: drop-shadow(0 8px 18px rgba(0,0,0,0.8)); transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">
              <img src="assets/icon_scroll_3d.jpg" style="width: 100%; height: 100%; object-fit: cover; border-radius: 18px; border: 2px solid #fbbf24;" alt="Collection Scroll">
            </div>
            <div style="width: 64px; height: 64px; cursor: pointer; filter: drop-shadow(0 8px 18px rgba(0,0,0,0.8)); transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">
              <img src="assets/icon_crown_3d.jpg" style="width: 100%; height: 100%; object-fit: cover; border-radius: 18px; border: 2px solid #fbbf24;" alt="Crown Rank">
            </div>
          </div>

          <!-- CENTER STAGE LOGO & MAJESTIC 3D BUTTONS -->
          <div style="display: flex; flex-direction: column; align-items: center; text-align: center; flex: 1; margin: 0 2rem; z-index: 10;">
            
            <!-- MAJESTIC 3D EMBLEM LOGO -->
            <div style="width: 280px; height: 240px; border-radius: 24px; overflow: hidden; border: 3px solid #fbbf24; box-shadow: 0 0 40px rgba(251,191,36,0.7); position: relative; margin-bottom: 0.75rem;">
              <img src="assets/logo_3d.jpg" style="width: 100%; height: 100%; object-fit: cover;" alt="Turtura 3D Logo Emblem">
            </div>

            <!-- DAILY BOOST BADGE -->
            <div style="background: rgba(0,0,0,0.85); border: 2px solid #fbbf24; border-radius: 16px; padding: 8px 22px; margin-top: 0.5rem; box-shadow: 0 6px 16px rgba(0,0,0,0.8);">
              <div style="font-size: 0.82rem; color: #fbbf24; font-weight: 900; letter-spacing: 0.5px;">🪖 Impulso Diario de Fusión</div>
              <div style="font-size: 0.85rem; color: #cbd5e1; font-weight: 800;">Se reinicia en 1 h 12 min</div>
            </div>

            <!-- MAJESTIC 3D ACTION BUTTONS WITH 3D ICONS -->
            <div style="display: flex; gap: 1.5rem; margin-top: 1.75rem;">
              <button class="rpg-btn-gold" id="btn-turn-duel" style="padding: 1rem 2rem; font-size: 1.1rem; display: flex; align-items: center; gap: 0.85rem;">
                <img src="assets/icon_duel_3d.jpg" style="width: 36px; height: 36px; border-radius: 10px; object-fit: cover;" alt="Duel Icon">
                <span>Duelo por Turnos</span>
              </button>

              <button class="rpg-btn-green" id="btn-challenge-tower" style="padding: 1rem 2rem; font-size: 1.1rem; display: flex; align-items: center; gap: 0.85rem;">
                <img src="assets/icon_tower_3d.jpg" style="width: 36px; height: 36px; border-radius: 10px; object-fit: cover;" alt="Tower Icon">
                <span>Desafiar la Torre</span>
              </button>
            </div>

          </div>

          <!-- RIGHT SIDE STACK: FLOATING 3D ICONS (NO BUBBLE BOXES) -->
          <div style="display: flex; flex-direction: column; gap: 1.25rem; z-index: 10;">
            <div style="width: 64px; height: 64px; cursor: pointer; filter: drop-shadow(0 8px 18px rgba(0,0,0,0.8)); transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">
              <img src="assets/icon_menu_3d.jpg" style="width: 100%; height: 100%; object-fit: cover; border-radius: 18px; border: 2px solid #fbbf24;" alt="Menu Gear">
            </div>
            <div style="width: 64px; height: 64px; cursor: pointer; filter: drop-shadow(0 8px 18px rgba(0,0,0,0.8)); transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">
              <img src="assets/icon_scroll_3d.jpg" style="width: 100%; height: 100%; object-fit: cover; border-radius: 18px; border: 2px solid #fbbf24;" alt="Notice Scroll">
            </div>
            <div style="width: 64px; height: 64px; cursor: pointer; filter: drop-shadow(0 8px 18px rgba(0,0,0,0.8)); transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">
              <img src="assets/icon_tree_3d.jpg" style="width: 100%; height: 100%; object-fit: cover; border-radius: 18px; border: 2px solid #fbbf24;" alt="Golden Tree">
            </div>
          </div>

        </div>

        <!-- BOTTOM PROGRESS BANNER (1:1 IMAGEN 1) -->
        <div style="background: linear-gradient(180deg, rgba(36,23,16,0.96), rgba(20,13,8,0.98)); border: 3px solid var(--border-gold-3d); border-radius: 22px; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 8px 25px rgba(0,0,0,0.9);">
          <div style="display: flex; align-items: center; gap: 1.25rem;">
            <div style="background: #78350f; border: 2px solid #fbbf24; color: #fff; font-weight: 900; font-size: 1.05rem; padding: 6px 16px; border-radius: 12px;">
              🛡️ 6
            </div>
            <div style="font-size: 1.25rem; font-weight: 900; color: #fff; letter-spacing: 0.5px;">
              Maestría de Fusión
            </div>
          </div>

          <div style="width: 320px; background: #000; border: 2px solid #fbbf24; border-radius: 14px; height: 26px; overflow: hidden; position: relative;">
            <div style="width: 50%; background: linear-gradient(90deg, #fbbf24, #d97706); height: 100%;"></div>
            <span style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; font-size: 0.9rem; font-weight: 900; color: #fff; line-height: 26px; display: flex; align-items: center; justify-content: center;">10 / 20</span>
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
