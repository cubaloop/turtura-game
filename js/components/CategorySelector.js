// Component for Chapter and Category Selection
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
      <div style="margin-bottom: 1.5rem;">
        <h2 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem;">Capítulos & Módulos de Mundo</h2>
        <p style="color: var(--text-secondary);">Selecciona un capítulo activo o explora las próximas expansiones globales.</p>
      </div>

      <div class="chapters-grid">
        <!-- CAPÍTULO 1: PLANETA TIERRA (ACTIVO) -->
        <div class="chapter-card active-chapter" id="chapter-earth">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <span class="card-category-badge" style="background: rgba(16, 185, 129, 0.2); color: #10b981;">DISPONIBLE EN VIVO</span>
              <span style="font-size: 1.25rem;">🌍</span>
            </div>
            <h3 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 0.5rem;">Capítulo I: Planeta Tierra</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4;">
              El ecosistema biológico original. Combina especies de <strong>Tierra 🌿, Aire 🦅, Agua 🦈 y Microbios 🦠</strong> para descubrir criaturas avanzadas y defender el planeta.
            </p>
          </div>

          <div style="margin-top: 1.5rem; display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; font-size: 0.75rem; font-weight: 700;">
            <div style="background: rgba(255,255,255,0.05); padding: 6px; border-radius: 8px; text-align: center;">🌿 Tierra</div>
            <div style="background: rgba(255,255,255,0.05); padding: 6px; border-radius: 8px; text-align: center;">🦅 Aire</div>
            <div style="background: rgba(255,255,255,0.05); padding: 6px; border-radius: 8px; text-align: center;">🦈 Agua</div>
            <div style="background: rgba(255,255,255,0.05); padding: 6px; border-radius: 8px; text-align: center;">🦠 Microbios</div>
          </div>

          <button class="fusion-action-btn" style="margin-top: 1.25rem; width: 100%; font-size: 0.9rem; padding: 0.6rem;">
            ENTRAR AL MUNDO ➔
          </button>
        </div>

        <!-- CAPÍTULO 2: SOMBRA MISTERIOSA (TEASER + COUNTDOWN) -->
        <div class="chapter-card teaser-chapter">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <span class="card-category-badge" style="background: rgba(139, 92, 246, 0.2); color: #8b5cf6;">PRÓXIMAMENTE</span>
              <span style="font-size: 1.25rem;">⏳</span>
            </div>
            <h3 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 0.5rem;">Capítulo II: La Mutación Abisal</h3>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4;">
              Una silueta desconocida aguarda en las sombras. Todas las fusiones globales alimentan la llegada de la nueva era.
            </p>
          </div>

          <div style="text-align: center; margin: 1rem 0;">
            <div style="font-size: 4rem; filter: drop-shadow(0 0 15px rgba(139, 92, 246, 0.6));">👤</div>
          </div>

          <div class="countdown-box">
            <div style="font-size: 0.65rem; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 4px;">DESBLOQUEO GLOBAL EN</div>
            <div class="countdown-digits" id="global-countdown">05m 29d 23h 59m 59s</div>
          </div>
        </div>

        <!-- CAPÍTULO 3: PUERTAS DE ACERO REFORZADO -->
        <div class="chapter-card steel-door">
          <div class="steel-doors-overlay">
            <div class="padlock-icon">🔒</div>
            <div class="steel-door-text">CAPÍTULO III BLOQUEADO</div>
            <p style="font-size: 0.75rem; color: #94a3b8; text-align: center; padding: 0 1rem;">
              Sellado herméticamente bajo puertas de acero reforzado. Requiere vencer al Jefe Final.
            </p>
          </div>
        </div>

        <!-- CAPÍTULO 4: PUERTAS DE ACERO REFORZADO -->
        <div class="chapter-card steel-door">
          <div class="steel-doors-overlay">
            <div class="padlock-icon">🔒</div>
            <div class="steel-door-text">CAPÍTULO IV BLOQUEADO</div>
            <p style="font-size: 0.75rem; color: #94a3b8; text-align: center; padding: 0 1rem;">
              Cámara de aislamiento sellada. Reservado para los Maestros Fusionadores.
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
    // 5 months, 29 days, 23 hours from now
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
