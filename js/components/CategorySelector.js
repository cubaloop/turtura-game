// Component for Pokémon Style Top-Down RPG Overworld Map in Turtura
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
        <h2 style="font-size: 2.2rem; font-weight: 900; color: var(--accent-gold); text-transform: uppercase; letter-spacing: 3px; text-shadow: 2px 3px 0 #000;">
          🗺️ MAPA DE MAZMORRAS Y MUNDO ABIERTO RPG
        </h2>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 4px;">
          Navega por las rutas y gimnasios del mundo abierto para desafiar a los maestros de mazmorra.
        </p>
      </div>

      <!-- POKÉMON GEN 4 STYLE TOP-DOWN OVERWORLD MAP CONTAINER -->
      <div style="
        background: #48bb78;
        border: 4px solid #1c4522;
        border-radius: 28px;
        padding: 1.5rem;
        position: relative;
        box-shadow: 0 15px 40px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,0,0,0.3);
        min-height: 520px;
        overflow: hidden;
      ">
        <!-- BORDER FOREST TREES -->
        <div style="position: absolute; top: 10px; left: 10px; right: 10px; display: flex; justify-content: space-between; font-size: 1.5rem; opacity: 0.85;">
          <span>🌲 🌲 🌲 🌲 🌲 🌲 🌲 🌲 🌲 🌲 🌲 🌲 🌲 🌲</span>
        </div>

        <!-- DIRT PATHWAYS GRID LAYOUT -->
        <div style="margin-top: 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; position: relative; z-index: 10;">
          
          <!-- GYM 1: PUEBLO INICIAL (PLANETA TIERRA - ACTIVO) -->
          <div class="chapter-card" id="chapter-earth" style="
            background: #2d3748;
            border: 3px solid #f6e05e;
            border-radius: 20px;
            padding: 1.25rem;
            cursor: pointer;
            box-shadow: 0 8px 20px rgba(0,0,0,0.6);
            transition: transform 0.3s ease;
          ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span style="background: #38a169; color: #fff; font-size: 0.75rem; font-weight: 900; padding: 4px 10px; border-radius: 8px;">
                🏡 GIMNASIO 1 (ACTIVO)
              </span>
              <span style="font-size: 2rem;">🏠</span>
            </div>

            <h3 style="font-size: 1.3rem; font-weight: 900; color: #fff; margin-bottom: 0.4rem;">
              Pueblo Inicial: Planeta Tierra
            </h3>
            <p style="font-size: 0.8rem; color: #e2e8f0; line-height: 1.3;">
              Ruta principal. Desafía a los entrenadores iniciales y recolecta especímenes de Tierra, Aire, Agua y Microbios.
            </p>

            <button class="rpg-btn-green" style="margin-top: 1rem; width: 100%; font-size: 0.95rem; padding: 0.7rem;">
              ENTRAR AL GIMNASIO ➔
            </button>
          </div>

          <!-- GYM 2: LA MUTACIÓN ABISAL (MISTERIO & COUNTDOWN) -->
          <div class="chapter-card" style="
            background: #4c1d95;
            border: 3px solid #c084fc;
            border-radius: 20px;
            padding: 1.25rem;
            box-shadow: 0 8px 20px rgba(0,0,0,0.6);
          ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span style="background: #7e22ce; color: #fff; font-size: 0.75rem; font-weight: 900; padding: 4px 10px; border-radius: 8px;">
                🌌 GIMNASIO 2 (PRÓXIMAMENTE)
              </span>
              <span style="font-size: 2rem;">🔮</span>
            </div>

            <h3 style="font-size: 1.3rem; font-weight: 900; color: #fff; margin-bottom: 0.4rem;">
              Ruta Abisal: La Mutación
            </h3>
            <p style="font-size: 0.8rem; color: #e9d5ff; line-height: 1.3;">
              Zona en penumbra. Silueta biomecánica oculta en la niebla del mapa.
            </p>

            <div style="background: rgba(0,0,0,0.7); border: 2px solid #c084fc; border-radius: 12px; padding: 0.6rem; text-align: center; margin-top: 0.75rem;">
              <div style="font-size: 0.6rem; color: #c084fc; font-weight: 900; text-transform: uppercase;">DESBLOQUEO EN TIEMPO REAL</div>
              <div id="global-countdown" style="font-family: monospace; font-size: 1.15rem; font-weight: 900; color: #fef08a;">
                05m 29d 22h 59m 59s
              </div>
            </div>
          </div>

          <!-- GYM 3: CUEVA TITÁNICA (BLOQUEADO) -->
          <div style="
            background: #1a202c;
            border: 3px solid #718096;
            border-radius: 20px;
            padding: 1.25rem;
            opacity: 0.7;
          ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span style="background: #e53e3e; color: #fff; font-size: 0.75rem; font-weight: 900; padding: 4px 10px; border-radius: 8px;">
                🔒 BLOQUEADO
              </span>
              <span style="font-size: 2rem;">🏰</span>
            </div>
            <h3 style="font-size: 1.2rem; font-weight: 900; color: #cbd5e1;">Gimnasio 3: Cueva Titánica</h3>
            <p style="font-size: 0.8rem; color: #a0aec0;">Ruta de montaña bloqueada por la Liga.</p>
          </div>

          <!-- GYM 4: CASTILLO FINAL (BLOQUEADO) -->
          <div style="
            background: #1a202c;
            border: 3px solid #718096;
            border-radius: 20px;
            padding: 1.25rem;
            opacity: 0.7;
          ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span style="background: #e53e3e; color: #fff; font-size: 0.75rem; font-weight: 900; padding: 4px 10px; border-radius: 8px;">
                👑 JEFE FINAL
              </span>
              <span style="font-size: 2rem;">🏯</span>
            </div>
            <h3 style="font-size: 1.2rem; font-weight: 900; color: #cbd5e1;">Castillo del Maestro El Humano</h3>
            <p style="font-size: 0.8rem; color: #a0aec0;">Cámara de campeones absolutos.</p>
          </div>

        </div>

        <!-- WATER POND AT BOTTOM -->
        <div style="position: absolute; bottom: 10px; left: 10px; right: 10px; background: #3182ce; border-radius: 16px; padding: 0.5rem; text-align: center; border: 2px solid #2b6cb0; font-size: 1.2rem;">
          🌊 🌊 🌊 Estanque de Pesca Acuática 🌊 🌊 🌊
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
