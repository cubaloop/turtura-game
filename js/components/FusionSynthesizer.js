// Turtura Animated 3D Fusion Synthesizer & Fused Card Reward Modal Component
class FusionSynthesizer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.creatures = window.CREATURES_DATA || [];
    this.cardSlot1 = this.creatures[0] || null; // Águila Harpía #1
    this.cardSlot2 = this.creatures[2] || null; // Dragón de Obsidiana #3
    this.isSynthesizing = false;
    this.showRewardModal = false;
    this.fusedResultCard = this.creatures.find(c => c.id === 11) || this.creatures[2];
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    let fusionRate = 95;
    let fusedAtk = 3450;
    let fusedDef = 2200;

    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 100%; max-width: 1380px; margin: 0 auto; color: #fff;">
        
        <!-- FUSION CHAMBER HEADER -->
        <div style="background: rgba(14, 30, 16, 0.92); border: 3px solid var(--border-gold-3d); border-radius: 24px; padding: 1.25rem 1.5rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.85);">
          <div>
            <h2 style="font-size: 1.8rem; font-weight: 900; color: #fef08a; text-shadow: 0 2px 5px rgba(0,0,0,0.9);">
              🔮 Cámara de Fusión & Alquimia 3D
            </h2>
            <p style="font-size: 0.88rem; color: #cbd5e1; font-weight: 600;">
              Sintetiza 2 cartas para desencadenar una Fusión Mítica y obtener una Criatura Quimérica de rango Superior.
            </p>
          </div>

          <div style="background: rgba(0,0,0,0.7); border: 2px solid #fbbf24; border-radius: 14px; padding: 6px 18px; font-weight: 900; color: #fbbf24; font-size: 0.9rem;">
            ⚡ Éxito Alquímico: ${fusionRate}%
          </div>
        </div>

        <!-- 3D SYNTHESIS STAGE WITH PARTICLES -->
        <div style="background: rgba(14, 30, 16, 0.95); border: 3.5px solid var(--border-gold-3d); border-radius: 32px; padding: 2.5rem; display: flex; flex-direction: column; align-items: center; gap: 2rem; box-shadow: 0 25px 70px rgba(0,0,0,0.95); min-height: 520px; position: relative; overflow: hidden;">
          
          <!-- AMBIENT PARTICLES & PULSING RAYS -->
          <div id="fusion-particle-aura" style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: ${this.isSynthesizing ? '650px' : '450px'};
            height: ${this.isSynthesizing ? '650px' : '450px'};
            background: radial-gradient(circle, ${this.isSynthesizing ? 'rgba(251,191,36,0.65)' : 'rgba(168,85,247,0.25)'} 0%, rgba(0,0,0,0) 70%);
            pointer-events: none;
            transition: all 0.5s ease;
          "></div>

          <!-- 3 SLOTS: CARD 1 + FUSION CORE + CARD 2 -->
          <div style="display: flex; gap: 2.5rem; align-items: center; justify-content: center; flex-wrap: wrap; z-index: 10; width: 100%;">
            
            <!-- SLOT 1 (CARD 1) -->
            <div id="fusion-card-slot-1" style="
              display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
              transition: transform 1s ease;
              ${this.isSynthesizing ? 'transform: translateX(120px) scale(0.7) rotate(15deg); opacity: 0.5;' : ''}
            ">
              <div style="font-size: 0.85rem; font-weight: 900; color: #fbbf24;">Carta Base #1</div>
              <div style="width: 200px; height: 280px; border-radius: 16px; border: 3px solid #fbbf24; overflow: hidden; background: #000; box-shadow: 0 12px 30px rgba(0,0,0,0.85);">
                <img src="${this.cardSlot1.cardArt}" style="width: 100%; height: 100%; object-fit: cover;" alt="${this.cardSlot1.name}">
              </div>
              <div style="font-size: 0.95rem; font-weight: 900; color: #fff;">${this.cardSlot1.name}</div>
            </div>

            <!-- FUSION CORE ICON (PULSING ANIMATION) -->
            <div id="fusion-core-orb" style="
              display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
              transition: transform 0.5s ease;
              ${this.isSynthesizing ? 'transform: scale(2.2);' : ''}
            ">
              <div style="font-size: 3.5rem; filter: drop-shadow(0 0 35px rgba(251,191,36,0.9));">
                🔮
              </div>
              <div style="font-size: 0.85rem; font-weight: 900; color: #a855f7;">
                ${this.isSynthesizing ? '¡FUSIONANDO!' : 'SÍNTESIS ALQUÍMICA'}
              </div>
            </div>

            <!-- SLOT 2 (CARD 2) -->
            <div id="fusion-card-slot-2" style="
              display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
              transition: transform 1s ease;
              ${this.isSynthesizing ? 'transform: translateX(-120px) scale(0.7) rotate(-15deg); opacity: 0.5;' : ''}
            ">
              <div style="font-size: 0.85rem; font-weight: 900; color: #fbbf24;">Carta Base #2</div>
              <div style="width: 200px; height: 280px; border-radius: 16px; border: 3px solid #fbbf24; overflow: hidden; background: #000; box-shadow: 0 12px 30px rgba(0,0,0,0.85);">
                <img src="${this.cardSlot2.cardArt}" style="width: 100%; height: 100%; object-fit: cover;" alt="${this.cardSlot2.name}">
              </div>
              <div style="font-size: 0.95rem; font-weight: 900; color: #fff;">${this.cardSlot2.name}</div>
            </div>

          </div>

          <!-- PREVIEW STATS -->
          <div style="background: rgba(0,0,0,0.7); border: 2px solid #a855f7; border-radius: 16px; padding: 0.85rem 2rem; display: flex; gap: 2rem; align-items: center; z-index: 10;">
            <div style="color: #ef4444; font-size: 1rem; font-weight: 900;">⚔️ ATQ Quimera: ${fusedAtk} (+50% Boost)</div>
            <div style="color: #3b82f6; font-size: 1rem; font-weight: 900;">🛡️ DEF Quimera: ${fusedDef} (+50% Boost)</div>
          </div>

          <!-- SYNTHESIZE ACTION BUTTON -->
          <button id="btn-start-fusion" class="rpg-btn-gold" style="padding: 1rem 3rem; font-size: 1.15rem; font-weight: 900; border-radius: 18px; box-shadow: 0 10px 30px rgba(251,191,36,0.5); z-index: 10;" ${this.isSynthesizing ? 'disabled' : ''}>
            ${this.isSynthesizing ? '✨ FUSIONANDO PARTICULAS ALQUÍMICAS...' : '✨ ¡Iniciar Fusión Alquímica 3D! (100 🪙)'}
          </button>

        </div>

        <!-- FUSED CARD REWARD UNLOCK MODAL POPUP -->
        ${this.showRewardModal ? `
          <div id="fusion-reward-modal" style="
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0, 0, 0, 0.92);
            backdrop-filter: blur(20px);
            z-index: 20000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
          ">
            <div style="
              background: rgba(18, 38, 22, 0.98);
              border: 4px solid #fbbf24;
              border-radius: 32px;
              padding: 2rem;
              max-width: 460px;
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 1.25rem;
              box-shadow: 0 0 70px rgba(251,191,36,0.85);
              text-align: center;
              animation: scaleUp 0.35s ease;
            ">
              <span style="background: linear-gradient(180deg, #fbbf24, #d97706); color: #1e1b4b; font-size: 0.85rem; font-weight: 900; padding: 4px 16px; border-radius: 12px;">
                ¡NUEVA CARTA FUSIÓN SINTETIZADA!
              </span>

              <h2 style="font-size: 1.8rem; font-weight: 900; color: #fff; text-shadow: 0 2px 8px #000;">
                ${this.fusedResultCard.name}
              </h2>

              <!-- 3D HOLOGRAPHIC REWARD CARD DISPLAY -->
              <div style="width: 230px; height: 325px; border-radius: 18px; border: 3.5px solid #fbbf24; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.9), 0 0 30px rgba(251,191,36,0.7); background: #000; position: relative;">
                <img src="${this.fusedResultCard.cardArt}" style="width: 100%; height: 100%; object-fit: cover;" alt="${this.fusedResultCard.name}">
                <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%); pointer-events: none;"></div>
              </div>

              <div style="display: flex; gap: 1.5rem; width: 100%; justify-content: center; background: rgba(0,0,0,0.6); padding: 0.75rem; border-radius: 14px; border: 1.5px solid #fbbf24;">
                <div style="color: #ef4444; font-weight: 900; font-size: 1.05rem;">⚔️ ATQ: ${this.fusedResultCard.atk}</div>
                <div style="color: #3b82f6; font-weight: 900; font-size: 1.05rem;">🛡️ DEF: ${this.fusedResultCard.def}</div>
              </div>

              <div style="display: flex; gap: 0.85rem; width: 100%; margin-top: 0.5rem;">
                <button id="btn-equip-fused" class="rpg-btn-gold" style="flex: 1; padding: 0.85rem; font-size: 0.95rem; font-weight: 900;">
                  ⚔️ Equipar en Mazo
                </button>
                <button id="btn-close-reward" style="background: rgba(0,0,0,0.7); color: #fff; border: 1.5px solid #64748b; padding: 0.85rem 1.25rem; font-size: 0.9rem; font-weight: 800; border-radius: 14px; cursor: pointer;">
                  Guardar
                </button>
              </div>
            </div>
          </div>
        ` : ''}

      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const btnFusion = this.container.querySelector('#btn-start-fusion');
    if (btnFusion && !this.isSynthesizing) {
      btnFusion.addEventListener('click', () => {
        this.isSynthesizing = true;
        this.render();

        // 2.5s Particle Fusion Synthesis Animation Sequence
        setTimeout(() => {
          this.isSynthesizing = false;
          this.showRewardModal = true;
          this.render();
        }, 2500);
      });
    }

    const btnEquipFused = this.container.querySelector('#btn-equip-fused');
    if (btnEquipFused) {
      btnEquipFused.addEventListener('click', () => {
        this.showRewardModal = false;
        this.render();
        if (window.app) window.app.switchTab('deck');
      });
    }

    const btnCloseReward = this.container.querySelector('#btn-close-reward');
    if (btnCloseReward) {
      btnCloseReward.addEventListener('click', () => {
        this.showRewardModal = false;
        this.render();
      });
    }
  }
}

window.FusionSynthesizer = FusionSynthesizer;
