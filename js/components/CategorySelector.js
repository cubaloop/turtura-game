// Turtura Step 2 Upgrade: Seamless 3D PNG Buttons & Floating Icons without White Boxes
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
      <div style="display: flex; flex-direction: column; gap: 1.75rem; width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 1rem;">
        
        <!-- PROPORTIONAL STAGE WITHOUT WHITE BOXES WITH FLOATING SEAMLESS 3D PNG ICONS -->
        <div style="background: rgba(18, 38, 22, 0.85); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 3px solid var(--border-gold-3d); border-radius: 28px; padding: 2.5rem; display: flex; justify-content: space-between; align-items: center; position: relative; box-shadow: 0 20px 60px rgba(0,0,0,0.95); min-height: 600px; width: 100%;">
          
          <!-- LEFT SIDE STACK: FLOATING 3D PNG ICONS (NO WHITE BOXES) -->
          <div style="display: flex; flex-direction: column; gap: 1.5rem; z-index: 10;">
            <div style="width: 72px; height: 72px; cursor: pointer; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.85)); transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);" onmouseover="this.style.transform='scale(1.2) translateY(-4px)'" onmouseout="this.style.transform='scale(1) translateY(0)'">
              <img src="assets/icon_dragon_3d.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Dragon Profile">
            </div>
            <div style="width: 72px; height: 72px; cursor: pointer; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.85)); transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);" onmouseover="this.style.transform='scale(1.2) translateY(-4px)'" onmouseout="this.style.transform='scale(1) translateY(0)'">
              <img src="assets/icon_chest_3d.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Chest Rewards">
            </div>
            <div style="width: 72px; height: 72px; cursor: pointer; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.85)); transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);" onmouseover="this.style.transform='scale(1.2) translateY(-4px)'" onmouseout="this.style.transform='scale(1) translateY(0)'">
              <img src="assets/icon_scroll_3d.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Collection Scroll">
            </div>
            <div style="width: 72px; height: 72px; cursor: pointer; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.85)); transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);" onmouseover="this.style.transform='scale(1.2) translateY(-4px)'" onmouseout="this.style.transform='scale(1) translateY(0)'">
              <img src="assets/icon_crown_3d.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Crown Rank">
            </div>
          </div>

          <!-- CENTER STAGE LOGO & MAJESTIC TRANSPARENT 3D PNG ACTION BUTTONS -->
          <div style="display: flex; flex-direction: column; align-items: center; text-align: center; flex: 1; margin: 0 2rem; z-index: 10;">
            
            <!-- MAJESTIC FLOATING 3D EMBLEM LOGO (TRANSPARENT PNG) -->
            <div style="width: 340px; height: 280px; filter: drop-shadow(0 0 35px rgba(251,191,36,0.85)) drop-shadow(0 15px 30px rgba(0,0,0,0.9)); position: relative; margin-bottom: 0.5rem; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
              <img src="assets/logo_3d.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Turtura 3D Emblem Logo">
            </div>

            <!-- DAILY BOOST BADGE -->
            <div style="background: rgba(0,0,0,0.85); border: 2px solid #fbbf24; border-radius: 16px; padding: 8px 24px; margin-top: 0.5rem; box-shadow: 0 6px 16px rgba(0,0,0,0.85);">
              <div style="font-size: 0.85rem; color: #fbbf24; font-weight: 900; letter-spacing: 0.5px;">🪖 Impulso Diario de Fusión</div>
              <div style="font-size: 0.88rem; color: #cbd5e1; font-weight: 800;">Se reinicia en 1 h 12 min</div>
            </div>

            <!-- MAJESTIC TRANSPARENT 3D PNG ACTION BUTTONS (NO WHITE RECTANGLES) -->
            <div style="display: flex; gap: 2rem; margin-top: 2rem;">
              
              <!-- 3D PNG BUTTON 1: DUELO POR TURNOS -->
              <div id="btn-turn-duel" style="cursor: pointer; position: relative; width: 230px; height: 85px; filter: drop-shadow(0 10px 22px rgba(0,0,0,0.9)); transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.08) translateY(-3px)'" onmouseout="this.style.transform='scale(1) translateY(0)'">
                <img src="assets/btn_duel_3d.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Duelo por Turnos Button">
                <span style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; font-size: 1.05rem; font-weight: 900; color: #fef08a; text-shadow: 2px 2px 4px #000; padding-left: 45px;">
                  Duelo por Turnos
                </span>
              </div>

              <!-- 3D PNG BUTTON 2: DESAFIAR LA TORRE -->
              <div id="btn-challenge-tower" style="cursor: pointer; position: relative; width: 230px; height: 85px; filter: drop-shadow(0 10px 22px rgba(0,0,0,0.9)); transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.08) translateY(-3px)'" onmouseout="this.style.transform='scale(1) translateY(0)'">
                <img src="assets/btn_tower_3d.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Desafiar la Torre Button">
                <span style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; font-size: 1.05rem; font-weight: 900; color: #bbf7d0; text-shadow: 2px 2px 4px #000; padding-left: 45px;">
                  Desafiar la Torre
                </span>
              </div>

            </div>

          </div>

          <!-- RIGHT SIDE STACK: FLOATING 3D PNG ICONS (NO WHITE BOXES) -->
          <div style="display: flex; flex-direction: column; gap: 1.5rem; z-index: 10;">
            <div style="width: 72px; height: 72px; cursor: pointer; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.85)); transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);" onmouseover="this.style.transform='scale(1.2) translateY(-4px)'" onmouseout="this.style.transform='scale(1) translateY(0)'">
              <img src="assets/icon_menu_3d.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Menu Gear">
            </div>
            <div style="width: 72px; height: 72px; cursor: pointer; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.85)); transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);" onmouseover="this.style.transform='scale(1.2) translateY(-4px)'" onmouseout="this.style.transform='scale(1) translateY(0)'">
              <img src="assets/icon_scroll_3d.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Notice Scroll">
            </div>
            <div style="width: 72px; height: 72px; cursor: pointer; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.85)); transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);" onmouseover="this.style.transform='scale(1.2) translateY(-4px)'" onmouseout="this.style.transform='scale(1) translateY(0)'">
              <img src="assets/icon_tree_3d.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Golden Tree">
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

          <div style="width: 340px; background: #000; border: 2px solid #fbbf24; border-radius: 14px; height: 26px; overflow: hidden; position: relative;">
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
