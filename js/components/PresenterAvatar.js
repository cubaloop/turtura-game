// Interactive 3D Presenter Avatar (Host Character with Head Tracking)
class PresenterAvatar {
  constructor(containerId, onFinishIntro) {
    this.container = document.getElementById(containerId);
    this.onFinishIntro = onFinishIntro;
    this.headAngleX = 0;
    this.headAngleY = 0;
    this.dialogStep = 0;

    this.dialogs = [
      "¡Hola! Bienvenido al universo de **Turtura**. Soy tu guía en esta aventura biológica.",
      "Aquí comenzarás con criaturas básicas, pero al fusionarlas en la cámara de fusión descubrirás especies legendarias.",
      "⚠️ **REGLA CRÍTICA:** Debes derrotar al Jefe Final de la Torre de Babel antes de que el contador global expire, o la era colapsará y el juego se reiniciará.",
      "Cada nueva Era (las compuertas selladas con cinta de peligro) traerá mundos inexplorados y cartas aún más raras.",
      "¡Proximamente estará disponible la Arena JvJ para apostar tus cartas de mazo en duelos directos! Comienza ahora explorando la **Torre de Babel**."
    ];

    this.init();
  }

  init() {
    window.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      this.headAngleX = (e.clientX - cx) / cx * 20; // -20deg to 20deg
      this.headAngleY = (e.clientY - cy) / cy * 15; // -15deg to 15deg
      this.updateHeadTransform();
    });

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (e) => {
        if (e.gamma && e.beta) {
          this.headAngleX = Math.min(25, Math.max(-25, e.gamma));
          this.headAngleY = Math.min(20, Math.max(-20, e.beta - 45));
          this.updateHeadTransform();
        }
      });
    }

    this.render();
  }

  updateHeadTransform() {
    const headEl = this.container.querySelector('#presenter-head');
    if (headEl) {
      headEl.style.transform = `rotateY(${this.headAngleX}deg) rotateX(${-this.headAngleY}deg)`;
    }
  }

  render() {
    this.container.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(8, 20, 9, 0.94); backdrop-filter: blur(14px); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 1.5rem;">
        <div style="background: linear-gradient(180deg, rgba(28, 62, 33, 0.95), rgba(14, 34, 17, 0.98)); border: 4px solid var(--border-gold-3d); border-radius: 28px; padding: 2rem; max-width: 480px; width: 100%; text-align: center; box-shadow: 0 15px 40px rgba(0,0,0,0.9); perspective: 800px;">
          
          <!-- 3D INTERACTIVE AVATAR HEAD (MALE: SHORT CURLY BLACK HAIR ON SIDES, BEARD, LIGHT SKIN) -->
          <div id="presenter-head" style="width: 140px; height: 140px; margin: 0 auto 1.25rem; position: relative; transition: transform 0.1s ease; transform-style: preserve-3d;">
            <svg viewBox="0 0 100 100" style="width: 100%; height: 100%; filter: drop-shadow(0 8px 15px rgba(0,0,0,0.8));">
              <!-- Light Skin Head -->
              <circle cx="50" cy="50" r="38" fill="#fde047" opacity="0.1" />
              <ellipse cx="50" cy="52" rx="32" ry="36" fill="#ffe4c4" stroke="#5a3d2a" stroke-width="2" />
              <!-- Short Curly Black Hair Sides -->
              <path d="M18,40 Q15,20 30,16 Q50,12 70,16 Q85,20 82,40 Q85,30 75,22 Q50,15 25,22 Q15,30 18,40 Z" fill="#1c1917" />
              <circle cx="20" cy="35" r="5" fill="#1c1917" />
              <circle cx="80" cy="35" r="5" fill="#1c1917" />
              <!-- Short Beard -->
              <path d="M22,55 Q20,80 50,86 Q80,80 78,55 Q68,82 50,83 Q32,82 22,55 Z" fill="#292524" />
              <!-- Eyes following tracking -->
              <circle cx="38" cy="48" r="4" fill="#000" />
              <circle cx="62" cy="48" r="4" fill="#000" />
              <circle cx="40" cy="46" r="1.5" fill="#fff" />
              <circle cx="64" cy="46" r="1.5" fill="#fff" />
              <!-- Smile -->
              <path d="M38,62 Q50,70 62,62" fill="none" stroke="#7c2d12" stroke-width="3" stroke-linecap="round" />
            </svg>
          </div>

          <div style="font-size: 1.2rem; font-weight: 900; color: var(--accent-gold); text-transform: uppercase; margin-bottom: 0.75rem;">
            👨🏻‍💼 Presentador Turtura
          </div>

          <!-- DIALOG TEXT -->
          <div style="background: rgba(0,0,0,0.6); border: 2px solid #4ade80; border-radius: 16px; padding: 1rem; font-size: 0.95rem; color: #fff; min-height: 100px; display: flex; align-items: center; justify-content: center; line-height: 1.4; margin-bottom: 1.5rem;">
            ${this.dialogs[this.dialogStep]}
          </div>

          <div style="display: flex; gap: 0.75rem; justify-content: center;">
            <button class="rpg-btn-gold" id="btn-next-dialog" style="width: 100%; font-size: 1rem; padding: 0.75rem;">
              ${this.dialogStep < this.dialogs.length - 1 ? 'Siguiente ➔' : '¡EMPEZAR JUEGO! 🚀'}
            </button>
          </div>

        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const btnNext = this.container.querySelector('#btn-next-dialog');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (this.dialogStep < this.dialogs.length - 1) {
          this.dialogStep++;
          this.render();
        } else {
          this.container.innerHTML = '';
          if (this.onFinishIntro) this.onFinishIntro();
        }
      });
    }
  }
}

window.PresenterAvatar = PresenterAvatar;
