// Component for Turtura Chapter Hub & Backpack Brawl Style Main Menu (Imagen 1 & 2)
class CategorySelector {
  constructor(containerId, onSelectCategory) {
    this.container = document.getElementById(containerId);
    this.onSelectCategory = onSelectCategory;
    this.countdownInterval = null;
    this.init();
  }

  init() {
    this.render();
    this.startCountdown();
  }

  render() {
    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        
        <!-- TOP CURRENCY BAR (BACKPACK BRAWL IMAGEN 1 STYLE) -->
        <div style="background: linear-gradient(180deg, #241710, #140d08); border: 3px solid var(--border-gold-3d); border-radius: 20px; padding: 0.75rem 1.25rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 8px 20px rgba(0,0,0,0.8);">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="background: #0284c7; color: #fff; font-weight: 900; font-size: 1rem; width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; border: 2px solid #fff;">
              11
            </div>
            <div style="font-weight: 900; color: var(--accent-gold); font-size: 1.1rem; text-shadow: 1px 1px 0 #000;">
              Valor y Gloria 🏆
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 1.25rem; font-weight: 900; font-size: 0.95rem;">
            <span style="color: #4ade80; background: rgba(0,0,0,0.6); padding: 4px 10px; border-radius: 10px; border: 1px solid #4ade80;">💎 123</span>
            <span style="color: #fbbf24; background: rgba(0,0,0,0.6); padding: 4px 10px; border-radius: 10px; border: 1px solid #fbbf24;">🪙 74,851</span>
          </div>
        </div>

        <!-- CHAPTER GATES & TOWER OF BABEL HUB -->
        <div style="text-align: center; margin-top: 0.5rem;">
          <h2 style="font-size: 2.2rem; font-weight: 900; color: var(--accent-gold); text-transform: uppercase; letter-spacing: 3px; text-shadow: 3px 3px 0 #000;">
            🚪 COMPUERTAS MUNDIALES DE CAPÍTULOS
          </h2>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 4px;">
            Selecciona un capítulo activo para desafiar a los guardianes o explora las próximas eras.
          </p>
        </div>

        <div class="chapters-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(265px, 1fr)); gap: 1.75rem;">
          
          <!-- SLOT 1: CAPÍTULO I - PLANETA TIERRA (ACTIVA) -->
          <div class="chapter-card active-chapter" id="chapter-earth" style="
            background: radial-gradient(circle at top, #263820, #0d170b);
            border: 4px solid #4ade80;
            box-shadow: inset 0 0 20px rgba(74, 222, 128, 0.4), 0 10px 30px rgba(0, 0, 0, 0.8);
            border-radius: 24px;
            padding: 1.5rem;
            cursor: pointer;
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
          ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <span style="background: rgba(74, 222, 128, 0.3); color: #86efac; font-size: 0.7rem; font-weight: 900; padding: 5px 12px; border-radius: 8px; border: 1px solid #4ade80;">
                ● COMPUERTA EN VIVO
              </span>
              <span style="font-size: 1.8rem; filter: drop-shadow(0 0 10px #4ade80);">🌍</span>
            </div>

            <h3 style="font-size: 1.45rem; font-weight: 900; color: #fff; margin-bottom: 0.5rem; text-shadow: 2px 2px 0 #000;">
              Capítulo I: Planeta Tierra
            </h3>
            <p style="font-size: 0.85rem; color: #a7f3d0; line-height: 1.4;">
              El ecosistema biológico primordial. Desafía a los 100 Pisos de la Torre de Babel con especies de <strong>Tierra 🌿, Aire 🦅, Agua 🦈 y Microbios 🦠</strong>.
            </p>

            <button class="rpg-btn-green" style="margin-top: 1.5rem; width: 100%; font-size: 1.05rem; padding: 0.85rem;">
              ENTRAR AL MUNDO ➔
            </button>
          </div>

          <!-- SLOT 2: CAPÍTULO II - LA MUTACIÓN ABISAL (MISTERIO & COUNTDOWN) -->
          <div class="chapter-card teaser-chapter" style="
            background: radial-gradient(circle at top, #3b1b4a, #12071a);
            border: 4px solid #c084fc;
            box-shadow: inset 0 0 20px rgba(192, 132, 252, 0.4), 0 10px 30px rgba(0, 0, 0, 0.8);
            border-radius: 24px;
            padding: 1.5rem;
          ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <span style="background: rgba(192, 132, 252, 0.3); color: #c084fc; font-size: 0.7rem; font-weight: 900; padding: 5px 12px; border-radius: 8px; border: 1px solid #c084fc;">
                🔮 PRÓXIMA ERA
              </span>
              <span style="font-size: 1.8rem;">🌌</span>
            </div>

            <h3 style="font-size: 1.45rem; font-weight: 900; color: #fff; margin-bottom: 0.5rem;">
              Capítulo II: La Mutación Abisal
            </h3>
            <p style="font-size: 0.85rem; color: #e9d5ff; line-height: 1.4;">
              Una entidad misteriosa en penumbra aguarda la apertura del portal global.
            </p>

            <div style="background: rgba(0,0,0,0.85); border: 2px solid #c084fc; border-radius: 14px; padding: 0.85rem; text-align: center; margin-top: 1rem;">
              <div style="font-size: 0.65rem; color: #c084fc; font-weight: 900; text-transform: uppercase;">DESBLOQUEO PROMINENTE EN</div>
              <div id="global-countdown" style="font-family: monospace; font-size: 1.35rem; font-weight: 900; color: #fef08a;">
                05m 29d 22h 59m 59s
              </div>
            </div>
          </div>

          <!-- SLOTS 3 Y 4: PUERTAS DE ACERO SELLADAS CON CINTA AMARILLA Y ARAÑAZOS -->
          <div class="chapter-card steel-door" style="
            background: linear-gradient(135deg, #1f2937, #111827);
            border: 4px solid #dc2626;
            border-radius: 24px;
            position: relative;
            min-height: 360px;
            overflow: hidden;
          ">
            <div style="position: absolute; top: 15px; left: -30px; background: #facc15; color: #000; font-weight: 900; font-size: 0.7rem; padding: 4px 40px; transform: rotate(-25deg); border: 1px solid #000;">
              ⚠️ DANGER / PELIGRO ⚠️
            </div>
            <div class="steel-doors-overlay" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 0.75rem;">
              <div style="font-size: 4rem; filter: drop-shadow(0 0 20px rgba(220,38,38,0.8));">🔒</div>
              <div style="background: #dc2626; color: #fff; font-size: 0.8rem; font-weight: 900; padding: 4px 14px; border-radius: 6px;">
                ¡PELIGRO! ZONA RESTRINGIDA
              </div>
              <p style="font-size: 0.8rem; color: #9ca3af; text-align: center; padding: 0 1rem; line-height: 1.3;">
                Sellada con cintas de precaución y cadenas oxidadas. Requiere derrotar al Jefe Final de Babel.
              </p>
            </div>
          </div>

          <div class="chapter-card steel-door" style="
            background: linear-gradient(135deg, #1f2937, #111827);
            border: 4px solid #dc2626;
            border-radius: 24px;
            position: relative;
            min-height: 360px;
            overflow: hidden;
          ">
            <div style="position: absolute; top: 15px; right: -30px; background: #facc15; color: #000; font-weight: 900; font-size: 0.7rem; padding: 4px 40px; transform: rotate(25deg); border: 1px solid #000;">
              ⚠️ DANGER / NO ENTER ⚠️
            </div>
            <div class="steel-doors-overlay" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 0.75rem;">
              <div style="font-size: 4rem; filter: drop-shadow(0 0 20px rgba(220,38,38,0.8));">🔒</div>
              <div style="background: #dc2626; color: #fff; font-size: 0.8rem; font-weight: 900; padding: 4px 14px; border-radius: 6px;">
                CÁMARA TITÁNICA BLOQUEADA
              </div>
              <p style="font-size: 0.8rem; color: #9ca3af; text-align: center; padding: 0 1rem; line-height: 1.3;">
                Aislamiento por amenaza biológica. Reservada para Maestros Fusionadores.
              </p>
            </div>
          </div>

        </div>
      </div>
    `;

    document.getElementById("chapter-earth").addEventListener("click", () => {
      if (this.onSelectCategory) this.onSelectCategory("Planeta Tierra");
    });
  }

  startCountdown() {
    let targetTime = Date.now() + ((5 * 30 * 24 * 3600) + (29 * 24 * 3600) + (23 * 3600)) * 1000;

    const update = () => {
      const diff = targetTime - Date.now();
      if (diff <= 0) return;

      const months = Math.floor(diff / (1000 * 3600 * 24 * 30));
      const days = Math.floor((diff % (1000 * 3600 * 24 * 30)) / (1000 * 3600 * 24));
      const hours = Math.floor((diff % (1000 * 3600 * 24)) / (1000 * 3600));
      const mins = Math.floor((diff % (1000 * 3600)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      const el = document.getElementById("global-countdown");
      if (el) {
        el.innerText = `${String(months).padStart(2, '0')}m ${String(days).padStart(2, '0')}d ${String(hours).padStart(2, '0')}h ${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`;
      }
    };

    update();
    this.countdownInterval = setInterval(update, 1000);
  }
}

window.CategorySelector = CategorySelector;
