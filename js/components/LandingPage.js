// Turtura Landing Page Component: Epic 3D Game Splash & Hero Presentation
class LandingPage {
  constructor(containerId, onStartGame) {
    this.container = document.getElementById(containerId);
    this.onStartGame = onStartGame;
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; max-width: 1280px; margin: 0 auto; padding: 2rem 1rem; text-align: center; gap: 2.5rem;">
        
        <!-- HERO SECTION -->
        <div style="background: rgba(14, 30, 16, 0.88); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 4px solid var(--border-gold-3d); border-radius: 32px; padding: 3rem 2rem; display: flex; flex-direction: column; align-items: center; gap: 1.75rem; box-shadow: 0 25px 70px rgba(0,0,0,0.95); width: 100%; position: relative; overflow: hidden;">
          
          <!-- AMBIENT GLOW -->
          <div style="position: absolute; top: -100px; width: 400px; height: 400px; background: radial-gradient(circle, rgba(251,191,36,0.25) 0%, rgba(0,0,0,0) 70%); pointer-events: none;"></div>

          <!-- 3D LOGO EMBLEM -->
          <div style="width: 320px; height: 260px; filter: drop-shadow(0 0 45px rgba(251,191,36,0.9)) drop-shadow(0 15px 35px rgba(0,0,0,0.95)); transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.06)'" onmouseout="this.style.transform='scale(1)'">
            <img src="assets/logo_3d.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Turtura 3D Game Emblem">
          </div>

          <h1 style="font-size: 2.8rem; font-weight: 900; color: #fff; text-shadow: 3px 4px 0 #000, 0 0 25px rgba(251,191,36,0.85); letter-spacing: 2px; line-height: 1.2;">
            TURTURA: La Torre del Poder
          </h1>

          <p style="font-size: 1.2rem; color: #e2e8f0; max-width: 780px; line-height: 1.6; text-shadow: 1px 2px 4px #000; font-weight: 600;">
            Entra en el legendario reino de criaturas elementales. Colecciona más de 100 bestias únicas, domina la Cámara de Fusión y desafía los 100 pisos de la Torre de Babel en estratégicos duelos RPG por turnos.
          </p>

          <!-- EPIC PLAY NOW ACTION BUTTON -->
          <button id="btn-landing-play" class="rpg-btn-gold" style="padding: 1.25rem 3.5rem; font-size: 1.4rem; letter-spacing: 1px; margin-top: 1rem; display: flex; align-items: center; gap: 1rem; animation: pulseGlow 2s infinite ease-in-out;">
            <img src="assets/icon_duel_3d.png" style="width: 46px; height: 46px; object-fit: contain; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.8));" alt="Play Icon">
            <span>⚔️ ¡ENTRAR AL JUEGO!</span>
          </button>

        </div>

        <!-- FEATURES GRID Showcase -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; width: 100%;">
          
          <div style="background: rgba(20, 42, 24, 0.9); border: 2px solid var(--border-gold-3d); border-radius: 24px; padding: 1.75rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.85);">
            <div style="width: 90px; height: 90px; filter: drop-shadow(0 6px 12px rgba(0,0,0,0.8));">
              <img src="assets/icon_dragon_3d.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Dragon Feature">
            </div>
            <h3 style="color: #fbbf24; font-weight: 900; font-size: 1.3rem;">100 Criaturas Únicas</h3>
            <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.5;">Colecciona bestias divididas en 4 elementos sagrados: Fuego 🔥, Agua 💧, Planta 🌿 y Tierra 🪨 con atributos y habilidades únicas.</p>
          </div>

          <div style="background: rgba(20, 42, 24, 0.9); border: 2px solid var(--border-gold-3d); border-radius: 24px; padding: 1.75rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.85);">
            <div style="width: 90px; height: 90px; filter: drop-shadow(0 6px 12px rgba(0,0,0,0.8));">
              <img src="assets/icon_chest_3d.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Fusion Feature">
            </div>
            <h3 style="color: #fbbf24; font-weight: 900; font-size: 1.3rem;">Cámara de Fusión</h3>
            <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.5;">Combina dos criaturas cualesquiera para sintetizar monstruos raros, épicos y legendarios holográficos de rango superior.</p>
          </div>

          <div style="background: rgba(20, 42, 24, 0.9); border: 2px solid var(--border-gold-3d); border-radius: 24px; padding: 1.75rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.85);">
            <div style="width: 90px; height: 90px; filter: drop-shadow(0 6px 12px rgba(0,0,0,0.8));">
              <img src="assets/icon_tower_3d.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Tower Feature">
            </div>
            <h3 style="color: #fbbf24; font-weight: 900; font-size: 1.3rem;">Torre de 100 Pisos</h3>
            <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.5;">Desafía a los guardianes elementales y jefes supremos en duelos de estrategia por turnos para coronarte rey de Turtura.</p>
          </div>

        </div>

      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const btnPlay = this.container.querySelector('#btn-landing-play');
    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        if (this.onStartGame) this.onStartGame();
      });
    }
  }
}

window.LandingPage = LandingPage;
