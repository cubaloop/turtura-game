// Turtura Step 5: 3D Fusion Chamber & Creature Synthesizer Component
class FusionSynthesizer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.creatures = window.CREATURES_DATA || [];
    this.cardSlot1 = this.creatures[0] || null;
    this.cardSlot2 = this.creatures[2] || null;
    this.isSynthesizing = false;
    this.fusedResult = null;
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    // Calculate fusion alchemy preview
    let fusionRate = 85;
    let fusedAtk = 0;
    let fusedDef = 0;
    if (this.cardSlot1 && this.cardSlot2) {
      fusedAtk = Math.round((this.cardSlot1.atk + this.cardSlot2.atk) * 0.75);
      fusedDef = Math.round((this.cardSlot1.def + this.cardSlot2.def) * 0.75);
    }

    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 100%; max-width: 1380px; margin: 0 auto; color: #fff;">
        
        <!-- FUSION CHAMBER HEADER -->
        <div style="background: rgba(14, 30, 16, 0.92); border: 3px solid var(--border-gold-3d); border-radius: 24px; padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.85);">
          <div>
            <h2 style="font-size: 1.8rem; font-weight: 900; color: #fef08a; text-shadow: 0 2px 5px rgba(0,0,0,0.9);">
              🔮 Cámara de Fusión & Alquimia 3D
            </h2>
            <p style="font-size: 0.88rem; color: #cbd5e1; font-weight: 600;">
              Combina 2 cartas para sintetizar una bestia de rango superior con estadísticas aumentadas.
            </p>
          </div>

          <div style="background: rgba(0,0,0,0.7); border: 2px solid #fbbf24; border-radius: 14px; padding: 6px 18px; font-weight: 900; color: #fbbf24; font-size: 0.9rem;">
            ⚡ Probabilidad de Éxito: ${fusionRate}%
          </div>
        </div>

        <!-- 3D SYNTHESIS CHAMBER STAGE -->
        <div style="background: rgba(14, 30, 16, 0.95); border: 3.5px solid var(--border-gold-3d); border-radius: 32px; padding: 2.5rem; display: flex; flex-direction: column; align-items: center; gap: 2rem; box-shadow: 0 25px 70px rgba(0,0,0,0.95); min-height: 520px; position: relative; overflow: hidden;">
          
          <!-- AMBIENT PURPLE/GOLD ALCHEMY GLOW -->
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 450px; height: 450px; background: radial-gradient(circle, rgba(168,85,247,0.25) 0%, rgba(0,0,0,0) 70%); pointer-events: none;"></div>

          <!-- 3 SLOTS: CARD 1 + FUSION CORE + CARD 2 -->
          <div style="display: flex; gap: 2rem; align-items: center; justify-content: center; flex-wrap: wrap; z-index: 10; width: 100%;">
            
            <!-- SLOT 1 -->
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <div style="font-size: 0.85rem; font-weight: 900; color: #fbbf24;">Carta Base #1</div>
              <div style="width: 200px; height: 280px; border-radius: 16px; border: 3px solid #fbbf24; overflow: hidden; background: #000; box-shadow: 0 12px 30px rgba(0,0,0,0.85);">
                ${this.cardSlot1 ? `
                  <img src="${this.cardSlot1.cardArt}" style="width: 100%; height: 100%; object-fit: cover;" alt="${this.cardSlot1.name}">
                ` : `
                  <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #64748b; font-weight: 800;">Seleccionar Carta</div>
                `}
              </div>
              <div style="font-size: 0.95rem; font-weight: 900; color: #fff;">${this.cardSlot1 ? this.cardSlot1.name : 'Vacío'}</div>
            </div>

            <!-- FUSION CORE ICON -->
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
              <div style="font-size: 3rem; animation: pulse 2s infinite ease-in-out; filter: drop-shadow(0 0 25px rgba(251,191,36,0.8));">
                🔮
              </div>
              <div style="font-size: 0.85rem; font-weight: 900; color: #a855f7;">SÍNTESIS</div>
            </div>

            <!-- SLOT 2 -->
            <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
              <div style="font-size: 0.85rem; font-weight: 900; color: #fbbf24;">Carta Base #2</div>
              <div style="width: 200px; height: 280px; border-radius: 16px; border: 3px solid #fbbf24; overflow: hidden; background: #000; box-shadow: 0 12px 30px rgba(0,0,0,0.85);">
                ${this.cardSlot2 ? `
                  <img src="${this.cardSlot2.cardArt}" style="width: 100%; height: 100%; object-fit: cover;" alt="${this.cardSlot2.name}">
                ` : `
                  <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #64748b; font-weight: 800;">Seleccionar Carta</div>
                `}
              </div>
              <div style="font-size: 0.95rem; font-weight: 900; color: #fff;">${this.cardSlot2 ? this.cardSlot2.name : 'Vacío'}</div>
            </div>

          </div>

          <!-- PREVIEW FUSED STATS -->
          <div style="background: rgba(0,0,0,0.7); border: 2px solid #a855f7; border-radius: 16px; padding: 0.85rem 2rem; display: flex; gap: 2rem; align-items: center; z-index: 10;">
            <div style="color: #ef4444; font-size: 1rem; font-weight: 900;">⚔️ ATQ Estimado: ${fusedAtk}</div>
            <div style="color: #3b82f6; font-size: 1rem; font-weight: 900;">🛡️ DEF Estimada: ${fusedDef}</div>
          </div>

          <!-- SYNTHESIZE ACTION BUTTON -->
          <button id="btn-start-fusion" class="rpg-btn-gold" style="padding: 1rem 3rem; font-size: 1.15rem; font-weight: 900; border-radius: 18px; box-shadow: 0 10px 30px rgba(251,191,36,0.5); z-index: 10;">
            ✨ ¡Sintetizar Fusión Alquímica! (100 🪙)
          </button>

        </div>

      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const btnFusion = this.container.querySelector('#btn-start-fusion');
    if (btnFusion) {
      btnFusion.addEventListener('click', () => {
        alert('✨ ¡Fusión Alquímica Completada! Has sintetizado una nueva Carta Legendaria con ATQ y DEF Aumentados!');
      });
    }
  }
}

window.FusionSynthesizer = FusionSynthesizer;
