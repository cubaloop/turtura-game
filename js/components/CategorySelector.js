// Turtura AAA 3D Main Menu Component with Real-Time WebGL Hub & Professional Layout
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
      <div style="display: flex; flex-direction: column; gap: 1.75rem; width: 100%; max-width: 1380px; margin: 0 auto; padding: 0 1rem; color: #fff;">
        
        <!-- AAA MAIN STAGE CONTAINER WITH GLASSMORPHISM & GOLD CARVED BORDER -->
        <div style="background: rgba(14, 30, 16, 0.92); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 3.5px solid var(--border-gold-3d); border-radius: 32px; padding: 2.5rem; display: flex; justify-content: space-between; align-items: center; position: relative; box-shadow: 0 25px 70px rgba(0,0,0,0.98); min-height: 620px; width: 100%; overflow: hidden;">
          
          <!-- AMBIENT GOLD LIGHTING EFFECT -->
          <div style="position: absolute; top: -100px; left: 50%; transform: translateX(-50%); width: 500px; height: 500px; background: radial-gradient(circle, rgba(251,191,36,0.25) 0%, rgba(0,0,0,0) 70%); pointer-events: none;"></div>

          <!-- LEFT SIDE ACTION MODULES (3D ICONS WITH METALLIC BADGES) -->
          <div style="display: flex; flex-direction: column; gap: 1.25rem; z-index: 10;">
            
            <div id="btn-module-deck" style="background: rgba(10, 25, 14, 0.9); border: 2px solid #fbbf24; border-radius: 18px; padding: 0.75rem 1.25rem; display: flex; align-items: center; gap: 0.85rem; cursor: pointer; box-shadow: 0 8px 20px rgba(0,0,0,0.85); transition: transform 0.25s ease;" onmouseover="this.style.transform='scale(1.06) translateX(4px)'" onmouseout="this.style.transform='scale(1) translateX(0)'">
              <div style="width: 52px; height: 52px; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.8)); flex-shrink: 0;">
                <img src="assets/icon_dragon_3d.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Deck Module">
              </div>
              <div>
                <div style="font-size: 0.95rem; font-weight: 900; color: #fef08a;">Criaturas 3D</div>
                <div style="font-size: 0.72rem; color: #4ade80; font-weight: 700;">Colección (12/100)</div>
              </div>
            </div>

            <div id="btn-module-fusion" style="background: rgba(10, 25, 14, 0.9); border: 2px solid #fbbf24; border-radius: 18px; padding: 0.75rem 1.25rem; display: flex; align-items: center; gap: 0.85rem; cursor: pointer; box-shadow: 0 8px 20px rgba(0,0,0,0.85); transition: transform 0.25s ease;" onmouseover="this.style.transform='scale(1.06) translateX(4px)'" onmouseout="this.style.transform='scale(1) translateX(0)'">
              <div style="width: 52px; height: 52px; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.8)); flex-shrink: 0;">
                <img src="assets/icon_chest_3d.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Fusion Module">
              </div>
              <div>
                <div style="font-size: 0.95rem; font-weight: 900; color: #fef08a;">Cámara de Fusión</div>
                <div style="font-size: 0.72rem; color: #fbbf24; font-weight: 700;">Sintetizar Bestias</div>
              </div>
            </div>

            <div style="background: rgba(10, 25, 14, 0.9); border: 2px solid #2e5a35; border-radius: 18px; padding: 0.75rem 1.25rem; display: flex; align-items: center; gap: 0.85rem; cursor: pointer; box-shadow: 0 8px 20px rgba(0,0,0,0.85); transition: transform 0.25s ease;" onmouseover="this.style.transform='scale(1.06) translateX(4px)'" onmouseout="this.style.transform='scale(1) translateX(0)'">
              <div style="width: 52px; height: 52px; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.8)); flex-shrink: 0;">
                <img src="assets/icon_scroll_3d.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Scroll Module">
              </div>
              <div>
                <div style="font-size: 0.95rem; font-weight: 900; color: #fff;">Misiones & Lore</div>
                <div style="font-size: 0.72rem; color: #cbd5e1; font-weight: 700;">3 Recompensas</div>
              </div>
            </div>

          </div>

          <!-- CENTER STAGE REAL-TIME 3D WEBGL HERO EMBLEM & EPIC ACTION BUTTONS -->
          <div style="display: flex; flex-direction: column; align-items: center; text-align: center; flex: 1; margin: 0 2rem; z-index: 10;">
            
            <!-- REAL-TIME 3D INTERACTIVE WEBGL HERO EMBLEM MODEL -->
            <div style="width: 320px; height: 270px; border-radius: 24px; overflow: hidden; border: 3px solid #fbbf24; box-shadow: 0 0 45px rgba(251,191,36,0.85); margin-bottom: 1rem; background: radial-gradient(circle, rgba(25,50,30,0.95), rgba(5,15,8,0.98));">
              <model-viewer src="assets/models/hero_3d.glb" alt="Turtura 3D Hero" auto-rotate camera-controls shadow-intensity="1.5" exposure="1.1" style="width: 100%; height: 100%;"></model-viewer>
            </div>

            <!-- DAILY BOOST BADGE -->
            <div style="background: rgba(0,0,0,0.85); border: 2px solid #fbbf24; border-radius: 16px; padding: 8px 24px; box-shadow: 0 6px 16px rgba(0,0,0,0.85);">
              <div style="font-size: 0.88rem; color: #fbbf24; font-weight: 900; letter-spacing: 0.5px;">🪖 Impulso Diario de Fusión Activo</div>
              <div style="font-size: 0.78rem; color: #cbd5e1; font-weight: 800;">+50% Éxito de Fusión en la Torre</div>
            </div>

            <!-- MAJESTIC TRANSPARENT 3D PNG ACTION BUTTONS -->
            <div style="display: flex; gap: 1.5rem; margin-top: 1.75rem; flex-wrap: wrap; justify-content: center;">
              
              <!-- 3D PNG BUTTON 1: DUELO POR TURNOS -->
              <div id="btn-turn-duel" style="cursor: pointer; position: relative; width: 230px; height: 85px; filter: drop-shadow(0 10px 22px rgba(0,0,0,0.9)); transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.08) translateY(-3px)'" onmouseout="this.style.transform='scale(1) translateY(0)'">
                <img src="assets/btn_duel_3d.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Duelo por Turnos Button">
                <span style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; font-size: 1.05rem; font-weight: 900; color: #fef08a; text-shadow: 2px 2px 4px #000; padding-left: 45px;">
                  Duelo JvsJ 3D
                </span>
              </div>

              <!-- 3D PNG BUTTON 2: DESAFIAR LA TORRE -->
              <div id="btn-challenge-tower" style="cursor: pointer; position: relative; width: 230px; height: 85px; filter: drop-shadow(0 10px 22px rgba(0,0,0,0.9)); transition: transform 0.2s ease;" onmouseover="this.style.transform='scale(1.08) translateY(-3px)'" onmouseout="this.style.transform='scale(1) translateY(0)'">
                <img src="assets/btn_tower_3d.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Desafiar la Torre Button">
                <span style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; font-size: 1.05rem; font-weight: 900; color: #bbf7d0; text-shadow: 2px 2px 4px #000; padding-left: 45px;">
                  Torre de Babel
                </span>
              </div>

            </div>

          </div>

          <!-- RIGHT SIDE ACTION MODULES (3D ICONS WITH METALLIC BADGES) -->
          <div style="display: flex; flex-direction: column; gap: 1.25rem; z-index: 10;">
            
            <div style="background: rgba(10, 25, 14, 0.9); border: 2px solid #2e5a35; border-radius: 18px; padding: 0.75rem 1.25rem; display: flex; align-items: center; gap: 0.85rem; cursor: pointer; box-shadow: 0 8px 20px rgba(0,0,0,0.85); transition: transform 0.25s ease;" onmouseover="this.style.transform='scale(1.06) translateX(-4px)'" onmouseout="this.style.transform='scale(1) translateX(0)'">
              <div style="width: 52px; height: 52px; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.8)); flex-shrink: 0;">
                <img src="assets/icon_crown_3d.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Rank Module">
              </div>
              <div>
                <div style="font-size: 0.95rem; font-weight: 900; color: #fff;">Clasificación</div>
                <div style="font-size: 0.72rem; color: #fbbf24; font-weight: 700;">Top #14 Global</div>
              </div>
            </div>

            <div style="background: rgba(10, 25, 14, 0.9); border: 2px solid #2e5a35; border-radius: 18px; padding: 0.75rem 1.25rem; display: flex; align-items: center; gap: 0.85rem; cursor: pointer; box-shadow: 0 8px 20px rgba(0,0,0,0.85); transition: transform 0.25s ease;" onmouseover="this.style.transform='scale(1.06) translateX(-4px)'" onmouseout="this.style.transform='scale(1) translateX(0)'">
              <div style="width: 52px; height: 52px; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.8)); flex-shrink: 0;">
                <img src="assets/icon_menu_3d.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Menu Gear">
              </div>
              <div>
                <div style="font-size: 0.95rem; font-weight: 900; color: #fff;">Ajustes</div>
                <div style="font-size: 0.72rem; color: #cbd5e1; font-weight: 700;">Audio & 3D WebGL</div>
              </div>
            </div>

            <div style="background: rgba(10, 25, 14, 0.9); border: 2px solid #2e5a35; border-radius: 18px; padding: 0.75rem 1.25rem; display: flex; align-items: center; gap: 0.85rem; cursor: pointer; box-shadow: 0 8px 20px rgba(0,0,0,0.85); transition: transform 0.25s ease;" onmouseover="this.style.transform='scale(1.06) translateX(-4px)'" onmouseout="this.style.transform='scale(1) translateX(0)'">
              <div style="width: 52px; height: 52px; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.8)); flex-shrink: 0;">
                <img src="assets/icon_tree_3d.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Golden Tree">
              </div>
              <div>
                <div style="font-size: 0.95rem; font-weight: 900; color: #fff;">Árbol Sabio</div>
                <div style="font-size: 0.72rem; color: #4ade80; font-weight: 700;">Bonus Elemental</div>
              </div>
            </div>

          </div>

        </div>

        <!-- BOTTOM PROGRESS BANNER WITH METALLIC GLASS -->
        <div style="background: linear-gradient(180deg, rgba(36,23,16,0.96), rgba(20,13,8,0.98)); border: 3px solid var(--border-gold-3d); border-radius: 24px; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 8px 25px rgba(0,0,0,0.9); flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 1.25rem;">
            <div style="background: #78350f; border: 2px solid #fbbf24; color: #fff; font-weight: 900; font-size: 1.05rem; padding: 6px 16px; border-radius: 12px;">
              🛡️ Nivel 6
            </div>
            <div style="font-size: 1.2rem; font-weight: 900; color: #fff; letter-spacing: 0.5px;">
              Maestría de Fusión & Progreso de la Torre
            </div>
          </div>

          <div style="width: 340px; background: #000; border: 2px solid #fbbf24; border-radius: 14px; height: 26px; overflow: hidden; position: relative;">
            <div style="width: 65%; background: linear-gradient(90deg, #fbbf24, #d97706); height: 100%;"></div>
            <span style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; font-size: 0.9rem; font-weight: 900; color: #fff; line-height: 26px; display: flex; align-items: center; justify-content: center;">Piso 13 / 100</span>
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

    const btnDeck = this.container.querySelector('#btn-module-deck');
    if (btnDeck && window.app) {
      btnDeck.addEventListener('click', () => window.app.switchTab('deck'));
    }
  }
}

window.CategorySelector = CategorySelector;
