// Turtura Landing Page Component: Epic 3D Game Splash & 3D AI Presenter Character
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
        
        <!-- HERO SECTION WITH LIVE 3D AVATAR PRESENTER CHARACTER -->
        <div style="background: rgba(14, 30, 16, 0.88); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 4px solid var(--border-gold-3d); border-radius: 32px; padding: 3rem 2rem; display: flex; flex-direction: column; align-items: center; gap: 1.75rem; box-shadow: 0 25px 70px rgba(0,0,0,0.95); width: 100%; position: relative; overflow: hidden;">
          
          <!-- AMBIENT GLOW -->
          <div style="position: absolute; top: -100px; width: 450px; height: 450px; background: radial-gradient(circle, rgba(251,191,36,0.3) 0%, rgba(0,0,0,0) 70%); pointer-events: none;"></div>

          <!-- BADGE: AVATAR PRESENTADOR 3D -->
          <div style="background: linear-gradient(90deg, #78350f, #d97706); color: #fff; font-weight: 900; font-size: 0.85rem; padding: 6px 18px; border-radius: 20px; border: 1.5px solid #fbbf24; text-shadow: 0 2px 4px #000; box-shadow: 0 0 15px rgba(251,191,36,0.6);">
            ✨ PRESENTADOR 3D EN TIEMPO REAL
          </div>

          <!-- LIVE INTERACTIVE 3D AVATAR CHARACTER CONTAINER -->
          <div style="width: 360px; height: 320px; border-radius: 28px; overflow: hidden; border: 3px solid #fbbf24; box-shadow: 0 0 50px rgba(251,191,36,0.9), inset 0 0 30px rgba(0,0,0,0.8); position: relative; background: radial-gradient(circle, rgba(25,50,30,0.95), rgba(5,15,8,0.98));">
            <model-viewer src="assets/models/hero_3d.glb" alt="Avatar Presentador 3D" auto-rotate camera-controls shadow-intensity="1.5" exposure="1.1" style="width: 100%; height: 100%;"></model-viewer>
          </div>

          <h1 style="font-size: 2.8rem; font-weight: 900; color: #fff; text-shadow: 3px 4px 0 #000, 0 0 25px rgba(251,191,36,0.85); letter-spacing: 2px; line-height: 1.2;">
            TURTURA: La Torre del Poder 3D
          </h1>

          <p style="font-size: 1.2rem; color: #e2e8f0; max-width: 780px; line-height: 1.6; text-shadow: 1px 2px 4px #000; font-weight: 600;">
            ¡Bienvenido al reino RPG 3D! Soy tu <strong>Presentador 3D en tiempo real</strong>. Colecciona 100 criaturas elementales, domina la Cámara de Fusión y desafía los 100 pisos de la Torre de Babel.
          </p>

          <!-- EPIC PLAY NOW ACTION BUTTON -->
          <button id="btn-landing-play" class="rpg-btn-gold" style="padding: 1.25rem 3.5rem; font-size: 1.4rem; letter-spacing: 1px; margin-top: 1rem; display: flex; align-items: center; gap: 1rem; animation: pulseGlow 2s infinite ease-in-out;">
            <img src="assets/icon_duel_3d.png" style="width: 46px; height: 46px; object-fit: contain; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.8));" alt="Play Icon">
            <span>⚔️ ¡ENTRAR AL JUEGO!</span>
          </button>

        </div>

        <!-- FEATURES GRID SHOWCASE WITH LIVE 3D ANIMAL CREATURE -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; width: 100%;">
          
          <div style="background: rgba(20, 42, 24, 0.9); border: 2px solid var(--border-gold-3d); border-radius: 24px; padding: 1.75rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.85);">
            <div style="width: 180px; height: 160px; border-radius: 16px; overflow: hidden; border: 2px solid #4ade80; background: radial-gradient(circle, rgba(20,40,25,0.9), rgba(5,15,8,0.95));">
              <model-viewer src="assets/models/fox_3d.glb" alt="Criatura 3D" auto-rotate autoplay shadow-intensity="1" style="width: 100%; height: 100%;"></model-viewer>
            </div>
            <h3 style="color: #fbbf24; font-weight: 900; font-size: 1.3rem;">100 Criaturas 3D</h3>
            <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.5;">Modelos 3D interactivos en tiempo real con rotación 360° para cada una de las criaturas elementales.</p>
          </div>

          <div style="background: rgba(20, 42, 24, 0.9); border: 2px solid var(--border-gold-3d); border-radius: 24px; padding: 1.75rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; box-shadow: 0 10px 25px rgba(0,0,0,0.85);">
            <div style="width: 90px; height: 90px; filter: drop-shadow(0 6px 12px rgba(0,0,0,0.8));">
              <img src="assets/icon_chest_3d.png" style="width: 100%; height: 100%; object-fit: contain;" alt="Fusion Feature">
            </div>
            <h3 style="color: #fbbf24; font-weight: 900; font-size: 1.3rem;">Cámara de Fusión</h3>
            <p style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.5;">Combina dos criaturas cualesquiera para sintetizar monstruos raros, épicos y legendarios de rango superior.</p>
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
