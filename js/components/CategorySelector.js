// Clean 1:1 Turtura Main Menu Component: "Turtura: La Torre del Poder" (Imagen 1)
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
      <div style="display: flex; flex-direction: column; gap: 1.25rem; max-width: 720px; margin: 0 auto;">
        
        <!-- TOP CURRENCY BAR (1:1 IMAGEN 1) -->
        <div style="background: linear-gradient(180deg, rgba(36,23,16,0.95), rgba(20,13,8,0.98)); border: 2px solid var(--border-gold-3d); border-radius: 18px; padding: 0.6rem 1.25rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 6px 16px rgba(0,0,0,0.85);">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <div style="background: #0284c7; color: #fff; font-weight: 900; font-size: 0.95rem; width: 34px; height: 34px; border-radius: 8px; display: flex; align-items: center; justify-content: center; border: 2px solid #fff;">
              11
            </div>
            <div style="font-weight: 900; color: #fff; font-size: 1.15rem; letter-spacing: 1px; text-shadow: 2px 2px 0 #000;">
              TURTURA
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 1.25rem; font-weight: 900; font-size: 0.9rem;">
            <span style="color: #4ade80; background: rgba(0,0,0,0.6); padding: 4px 10px; border-radius: 10px; border: 1px solid #4ade80;">123 💎</span>
            <span style="color: #fbbf24; background: rgba(0,0,0,0.6); padding: 4px 10px; border-radius: 10px; border: 1px solid #fbbf24;">74851 🪙</span>
          </div>
        </div>

        <!-- MAIN HUB STAGE WITH SIDE BUTTONS & CENTER CREST (1:1 IMAGEN 1) -->
        <div style="background: rgba(18, 38, 22, 0.92); border: 3px solid var(--border-gold-3d); border-radius: 24px; padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; position: relative; box-shadow: 0 10px 30px rgba(0,0,0,0.9); min-height: 480px;">
          
          <!-- LEFT SIDE STACK -->
          <div style="display: flex; flex-direction: column; gap: 0.75rem; z-index: 10;">
            <div style="width: 48px; height: 48px; background: rgba(30,20,15,0.9); border: 2px solid #fbbf24; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.8);">
              🐲
            </div>
            <div style="width: 48px; height: 48px; background: rgba(30,20,15,0.9); border: 2px solid #fbbf24; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.8);">
              🎁
            </div>
            <div style="background: rgba(30,20,15,0.9); border: 2px solid #fbbf24; border-radius: 12px; padding: 4px 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.8);">
              <span style="font-size: 1.1rem;">📜</span>
              <span style="font-size: 0.58rem; font-weight: 900; color: #fef08a;">Colección</span>
            </div>
            <div style="background: #5865f2; border: 2px solid #fff; border-radius: 12px; padding: 4px 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.8);">
              <span style="font-size: 1.1rem;">💬</span>
              <span style="font-size: 0.55rem; font-weight: 900; color: #fff;">Turtura Discord</span>
            </div>
            <div style="width: 48px; height: 48px; background: rgba(30,20,15,0.9); border: 2px solid #fbbf24; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.8);">
              👑
            </div>
          </div>

          <!-- CENTER CREST & ACTIONS (1:1 IMAGEN 1) -->
          <div style="display: flex; flex-direction: column; align-items: center; text-align: center; flex: 1; margin: 0 1rem; z-index: 10;">
            
            <!-- TURTLE EMBLEM WITH 4 ORBES -->
            <div style="position: relative; width: 160px; height: 140px; display: flex; align-items: center; justify-content: center;">
              <div style="font-size: 4.5rem; filter: drop-shadow(0 0 20px #fbbf24);">🐢</div>
              <span style="position: absolute; top: 0; left: 0; font-size: 1.4rem; background: rgba(0,0,0,0.7); border: 2px solid #f43f5e; border-radius: 50%; padding: 2px;">🔥</span>
              <span style="position: absolute; top: 0; right: 0; font-size: 1.4rem; background: rgba(0,0,0,0.7); border: 2px solid #0284c7; border-radius: 50%; padding: 2px;">💧</span>
              <span style="position: absolute; bottom: 10px; left: 0; font-size: 1.4rem; background: rgba(0,0,0,0.7); border: 2px solid #22c55e; border-radius: 50%; padding: 2px;">🌿</span>
              <span style="position: absolute; bottom: 10px; right: 0; font-size: 1.4rem; background: rgba(0,0,0,0.7); border: 2px solid #b45309; border-radius: 50%; padding: 2px;">🪨</span>
            </div>

            <h1 style="font-size: 2rem; font-weight: 900; color: #fff; text-shadow: 2px 3px 0 #000, 0 0 15px rgba(251,191,36,0.8); margin-top: -6px;">
              Turtura
            </h1>
            <div style="background: linear-gradient(180deg, #d97706, #78350f); border: 2px solid #fef08a; padding: 4px 18px; border-radius: 12px; font-size: 0.9rem; font-weight: 900; color: #fff; text-shadow: 1px 1px 0 #000; margin-top: 2px;">
              La Torre del Poder
            </div>

            <!-- DAILY BOOST BADGE -->
            <div style="background: rgba(0,0,0,0.8); border: 1px solid #fbbf24; border-radius: 10px; padding: 4px 12px; margin-top: 0.85rem;">
              <div style="font-size: 0.65rem; color: #fbbf24; font-weight: 900;">🪖 Impulso Diario de Fusión</div>
              <div style="font-size: 0.72rem; color: #cbd5e1; font-weight: 800;">Se reinicia en 1 h 12 min</div>
            </div>

            <!-- MAIN ACTION BUTTONS (1:1 IMAGEN 1) -->
            <div style="display: flex; gap: 0.85rem; margin-top: 1.25rem;">
              <button class="rpg-btn-gold" id="btn-turn-duel" style="padding: 0.7rem 1.15rem; font-size: 0.9rem;">
                🎴 Duelo por Turnos
              </button>
              <button class="rpg-btn-green" id="btn-challenge-tower" style="padding: 0.7rem 1.15rem; font-size: 0.9rem;">
                🏰 Desafiar la Torre
              </button>
            </div>

          </div>

          <!-- RIGHT SIDE STACK -->
          <div style="display: flex; flex-direction: column; gap: 0.75rem; z-index: 10;">
            <div style="width: 48px; height: 48px; background: rgba(30,20,15,0.9); border: 2px solid #fbbf24; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.8);">
              ☰
            </div>
            <div style="width: 48px; height: 48px; background: rgba(30,20,15,0.9); border: 2px solid #fbbf24; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.8);">
              📜
            </div>
            <div style="width: 48px; height: 48px; background: rgba(30,20,15,0.9); border: 2px solid #fbbf24; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.8);">
              🌳
            </div>
          </div>

        </div>

        <!-- BOTTOM PROGRESS BANNER (1:1 IMAGEN 1) -->
        <div style="background: linear-gradient(180deg, rgba(36,23,16,0.95), rgba(20,13,8,0.98)); border: 2px solid var(--border-gold-3d); border-radius: 18px; padding: 0.65rem 1.25rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 6px 16px rgba(0,0,0,0.85);">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="background: #78350f; border: 1px solid #fbbf24; color: #fff; font-weight: 900; font-size: 0.85rem; padding: 4px 10px; border-radius: 8px;">
              🛡️ 6
            </div>
            <div style="font-size: 0.95rem; font-weight: 900; color: #fff;">
              Maestría de Fusión
            </div>
          </div>

          <div style="width: 170px; background: #000; border: 1px solid #fbbf24; border-radius: 8px; height: 16px; overflow: hidden; position: relative;">
            <div style="width: 50%; background: linear-gradient(90deg, #fbbf24, #d97706); height: 100%;"></div>
            <span style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; text-anchor: middle; font-size: 0.68rem; font-weight: 900; color: #fff; line-height: 16px; display: flex; align-items: center; justify-content: center;">10 / 20</span>
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
