// Component for 4 Thematic Chapter Gates in Turtura
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
      <div style="margin-bottom: 1.5rem; text-align: center;">
        <h2 style="font-size: 1.8rem; font-weight: 900; color: var(--accent-gold); text-transform: uppercase; letter-spacing: 2px; text-shadow: 2px 2px 0 #000;">
          🚪 Compuertas de Capítulos & Expansiones Mundiales
        </h2>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 4px;">
          Selecciona una compuerta activa para ingresar al mundo o explora los próximos capítulos mundiales.
        </p>
      </div>

      <div class="chapters-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;">
        
        <!-- COMPUERTA I: PLANETA TIERRA (ACTIVA Y VIBRANTE) -->
        <div class="chapter-card active-chapter" id="chapter-earth" style="
          background: linear-gradient(180deg, #1c2b18 0%, #0f1a0e 100%);
          border: 3px solid #10b981;
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.4);
          border-radius: 24px;
          padding: 1.5rem;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        ">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <span style="background: rgba(16, 185, 129, 0.25); color: #34d399; font-size: 0.7rem; font-weight: 900; padding: 4px 10px; border-radius: 8px; border: 1px solid #10b981;">
              ● COMPUERTA ACTIVA
            </span>
            <span style="font-size: 1.6rem;">🌍</span>
          </div>

          <h3 style="font-size: 1.4rem; font-weight: 900; color: #fff; margin-bottom: 0.5rem; text-shadow: 1px 1px 0 #000;">
            Compuerta I: Planeta Tierra
          </h3>
          <p style="font-size: 0.85rem; color: #a7f3d0; line-height: 1.4;">
            El ecosistema biológico original. Combina especies de <strong>Tierra 🌿, Aire 🦅, Agua 🦈 y Microbios 🦠</strong> para sintetizar criaturas legendarias.
          </p>

          <div style="margin-top: 1.5rem; display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; font-size: 0.75rem; font-weight: 800;">
            <div style="background: rgba(0,0,0,0.5); padding: 8px; border-radius: 10px; text-align: center; border: 1px solid #10b981;">🌿 Tierra</div>
            <div style="background: rgba(0,0,0,0.5); padding: 8px; border-radius: 10px; text-align: center; border: 1px solid #3b82f6;">🦅 Aire</div>
            <div style="background: rgba(0,0,0,0.5); padding: 8px; border-radius: 10px; text-align: center; border: 1px solid #06b6d4;">🦈 Agua</div>
            <div style="background: rgba(0,0,0,0.5); padding: 8px; border-radius: 10px; text-align: center; border: 1px solid #ec4899;">🦠 Microbios</div>
          </div>

          <button class="rpg-btn-green" style="margin-top: 1.5rem; width: 100%; font-size: 1rem; padding: 0.8rem;">
            ENTRAR AL MUNDO ➔
          </button>
        </div>

        <!-- COMPUERTA II: MISTERIOSA CON CONTADOR PROMINENTE -->
        <div class="chapter-card teaser-chapter" style="
          background: linear-gradient(180deg, #2b183b 0%, #150b21 100%);
          border: 3px solid #a855f7;
          box-shadow: 0 0 30px rgba(168, 85, 247, 0.4);
          border-radius: 24px;
          padding: 1.5rem;
        ">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <span style="background: rgba(168, 85, 247, 0.25); color: #c084fc; font-size: 0.7rem; font-weight: 900; padding: 4px 10px; border-radius: 8px; border: 1px solid #a855f7;">
              ⏳ PROXIMAMENTE
            </span>
            <span style="font-size: 1.6rem;">🔮</span>
          </div>

          <h3 style="font-size: 1.4rem; font-weight: 900; color: #fff; margin-bottom: 0.5rem; text-shadow: 1px 1px 0 #000;">
            Compuerta II: La Mutación Abisal
          </h3>
          <p style="font-size: 0.85rem; color: #e9d5ff; line-height: 1.4;">
            Una silueta desconocida aguarda en las sombras abisales. Las fusiones globales alimentan la apertura del portal.
          </p>

          <div style="text-align: center; margin: 1.25rem 0;">
            <div style="font-size: 4.5rem; filter: drop-shadow(0 0 25px rgba(168, 85, 247, 0.8));">👤</div>
          </div>

          <!-- PROMINENT COUNTDOWN TIMER BOX -->
          <div style="background: rgba(0,0,0,0.7); border: 2px solid #a855f7; border-radius: 14px; padding: 0.85rem; text-align: center;">
            <div style="font-size: 0.65rem; color: #c084fc; font-weight: 900; text-transform: uppercase; margin-bottom: 4px; letter-spacing: 1px;">
              DESBLOQUEO GLOBAL PROMINENTE EN
            </div>
            <div id="global-countdown" style="font-family: monospace; font-size: 1.3rem; font-weight: 900; color: var(--accent-gold); letter-spacing: 2px;">
              05m 29d 23h 59m 59s
            </div>
          </div>
        </div>

        <!-- COMPUERTA III: PUERTA DE METAL SELLADA -->
        <div class="chapter-card steel-door" style="
          background: linear-gradient(135deg, #1f2937, #111827);
          border: 3px solid #4b5563;
          border-radius: 24px;
          position: relative;
          min-height: 380px;
          overflow: hidden;
        ">
          <div class="steel-doors-overlay">
            <div class="padlock-icon" style="font-size: 4rem;">🔒</div>
            <div class="steel-door-text" style="font-size: 1.1rem; font-weight: 900; color: #f32e2e; text-shadow: 0 0 10px rgba(243,46,46,0.6);">
              COMPUERTA III SELLADA
            </div>
            <p style="font-size: 0.8rem; color: #9ca3af; text-align: center; padding: 0 1.25rem; line-height: 1.4;">
              Compuerta de metal industrial sellada con remaches de acero. Vence al Jefe Final para desbloquear la llave.
            </p>
          </div>
        </div>

        <!-- COMPUERTA IV: PUERTA DE METAL SELLADA -->
        <div class="chapter-card steel-door" style="
          background: linear-gradient(135deg, #1f2937, #111827);
          border: 3px solid #4b5563;
          border-radius: 24px;
          position: relative;
          min-height: 380px;
          overflow: hidden;
        ">
          <div class="steel-doors-overlay">
            <div class="padlock-icon" style="font-size: 4rem;">🔒</div>
            <div class="steel-door-text" style="font-size: 1.1rem; font-weight: 900; color: #f32e2e; text-shadow: 0 0 10px rgba(243,46,46,0.6);">
              COMPUERTA IV SELLADA
            </div>
            <p style="font-size: 0.8rem; color: #9ca3af; text-align: center; padding: 0 1.25rem; line-height: 1.4;">
              Búnker de contención extrema. Reservado exclusivamente para Maestros Fusionadores Legendarios.
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
