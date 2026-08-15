// Component for 4 High-Fidelity Thematic Chapter Gates in Turtura (Hearthstone / Runeterra Style)
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
      <div style="margin-bottom: 2rem; text-align: center;">
        <h2 style="font-size: 2.2rem; font-weight: 900; color: var(--accent-gold); text-transform: uppercase; letter-spacing: 3px; text-shadow: 2px 3px 0 #000;">
          🚪 COMPUERTAS MUNDIALES DE CAPÍTULOS
        </h2>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 6px;">
          Selecciona un capítulo activo revestido en piedra noble o explora los próximos portales mundiales.
        </p>
      </div>

      <div class="chapters-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(265px, 1fr)); gap: 1.75rem;">
        
        <!-- SLOT 1: CAPÍTULO I - PLANETA TIERRA (PIEDRA TALLADA & MADERA VIVA) -->
        <div class="chapter-card active-chapter" id="chapter-earth" style="
          background: radial-gradient(circle at top, #263820, #0d170b);
          border: 4px solid #10b981;
          box-shadow: inset 0 0 20px rgba(16, 185, 129, 0.4), 0 10px 30px rgba(0, 0, 0, 0.8);
          border-radius: 24px;
          padding: 1.5rem;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
          position: relative;
        ">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <span style="background: rgba(16, 185, 129, 0.3); color: #34d399; font-size: 0.7rem; font-weight: 900; padding: 5px 12px; border-radius: 8px; border: 1px solid #10b981; text-shadow: 0 0 5px #10b981;">
              ● COMPUERTA EN VIVO
            </span>
            <span style="font-size: 1.8rem; filter: drop-shadow(0 0 10px #10b981);">🌍</span>
          </div>

          <h3 style="font-size: 1.45rem; font-weight: 900; color: #fff; margin-bottom: 0.5rem; text-shadow: 2px 2px 0 #000;">
            Capítulo I: Planeta Tierra
          </h3>
          <p style="font-size: 0.85rem; color: #a7f3d0; line-height: 1.4;">
            El ecosistema biológico primordial. Combina especies de <strong>Tierra 🌿, Aire 🦅, Agua 🦈 y Microbios 🦠</strong> para desencadenar la evolución.
          </p>

          <div style="margin-top: 1.5rem; display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; font-size: 0.75rem; font-weight: 900;">
            <div style="background: rgba(0,0,0,0.6); padding: 8px; border-radius: 10px; text-align: center; border: 1px solid #10b981; color:#34d399;">🌿 Tierra</div>
            <div style="background: rgba(0,0,0,0.6); padding: 8px; border-radius: 10px; text-align: center; border: 1px solid #3b82f6; color:#60a5fa;">🦅 Aire</div>
            <div style="background: rgba(0,0,0,0.6); padding: 8px; border-radius: 10px; text-align: center; border: 1px solid #06b6d4; color:#22d3ee;">🦈 Agua</div>
            <div style="background: rgba(0,0,0,0.6); padding: 8px; border-radius: 10px; text-align: center; border: 1px solid #ec4899; color:#f472b6;">🦠 Microbios</div>
          </div>

          <button class="rpg-btn-green" style="margin-top: 1.5rem; width: 100%; font-size: 1.05rem; padding: 0.85rem; box-shadow: 0 0 20px rgba(16,185,129,0.5);">
            ENTRAR AL MUNDO ➔
          </button>
        </div>

        <!-- SLOT 2: CAPÍTULO II - LA MUTACIÓN ABISAL (BIOMECÁNICA MISTERIOSA + COUNTDOWN) -->
        <div class="chapter-card teaser-chapter" style="
          background: radial-gradient(circle at top, #3b1b4a, #12071a);
          border: 4px solid #a855f7;
          box-shadow: inset 0 0 20px rgba(168, 85, 247, 0.4), 0 10px 30px rgba(0, 0, 0, 0.8);
          border-radius: 24px;
          padding: 1.5rem;
        ">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <span style="background: rgba(168, 85, 247, 0.3); color: #c084fc; font-size: 0.7rem; font-weight: 900; padding: 5px 12px; border-radius: 8px; border: 1px solid #a855f7;">
              🔮 PRÓXIMO DESBLOQUEO
            </span>
            <span style="font-size: 1.8rem; filter: drop-shadow(0 0 10px #a855f7);">🌌</span>
          </div>

          <h3 style="font-size: 1.45rem; font-weight: 900; color: #fff; margin-bottom: 0.5rem; text-shadow: 2px 2px 0 #000;">
            Capítulo II: La Mutación Abisal
          </h3>
          <p style="font-size: 0.85rem; color: #e9d5ff; line-height: 1.4;">
            Una entidad misteriosa en penumbra aguarda el llenado del vórtice de fusiones globales.
          </p>

          <div style="text-align: center; margin: 1rem 0; position: relative;">
            <div style="font-size: 4.5rem; filter: drop-shadow(0 0 25px rgba(168, 85, 247, 0.9));">👤</div>
            <div style="position: absolute; top: 15px; left: 50%; transform: translateX(-50%); font-size: 2rem; font-weight: 900; color: #a855f7; text-shadow: 0 0 15px #a855f7;">?</div>
          </div>

          <!-- PROMINENT RUNIC DIGITAL DISPLAY COUNTDOWN -->
          <div style="background: rgba(0,0,0,0.85); border: 2px solid #a855f7; border-radius: 14px; padding: 0.85rem; text-align: center; box-shadow: 0 0 15px rgba(168,85,247,0.3);">
            <div style="font-size: 0.65rem; color: #c084fc; font-weight: 900; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 1px;">
              DESBLOQUEO EN TIEMPO REAL
            </div>
            <div id="global-countdown" style="font-family: monospace; font-size: 1.35rem; font-weight: 900; color: #fef08a; letter-spacing: 2px; text-shadow: 0 0 10px #f59e0b;">
              05m 29d 22h 59m 59s
            </div>
          </div>
        </div>

        <!-- SLOTS 3 Y 4: PUERTAS DE ACERO REFORZADO SELLADAS (GRAYSCALE 60%) -->
        <div class="chapter-card steel-door" style="
          background: linear-gradient(135deg, #1f2937, #111827);
          border: 4px solid #4b5563;
          border-radius: 24px;
          position: relative;
          min-height: 380px;
          overflow: hidden;
          filter: grayscale(60%);
        ">
          <div class="steel-doors-overlay">
            <div class="padlock-icon" style="font-size: 4rem; filter: drop-shadow(0 0 20px rgba(239,68,68,0.8));">🔒</div>
            <div class="steel-door-text" style="font-size: 1.15rem; font-weight: 900; color: #ef4444; text-shadow: 2px 2px 0 #000;">
              COMPUERTA III SELLADA
            </div>
            <p style="font-size: 0.8rem; color: #9ca3af; text-align: center; padding: 0 1.25rem; line-height: 1.4;">
              Blindaje de acero macizo con remaches pesados y cadenas cruzadas. Requiere derrotar al Jefe Final.
            </p>
          </div>
        </div>

        <div class="chapter-card steel-door" style="
          background: linear-gradient(135deg, #1f2937, #111827);
          border: 4px solid #4b5563;
          border-radius: 24px;
          position: relative;
          min-height: 380px;
          overflow: hidden;
          filter: grayscale(60%);
        ">
          <div class="steel-doors-overlay">
            <div class="padlock-icon" style="font-size: 4rem; filter: drop-shadow(0 0 20px rgba(239,68,68,0.8));">🔒</div>
            <div class="steel-door-text" style="font-size: 1.15rem; font-weight: 900; color: #ef4444; text-shadow: 2px 2px 0 #000;">
              COMPUERTA IV SELLADA
            </div>
            <p style="font-size: 0.8rem; color: #9ca3af; text-align: center; padding: 0 1.25rem; line-height: 1.4;">
              Cámara de aislamiento de titanio. Reservado para los Maestros Fusionadores Legendarios.
            </p>
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
