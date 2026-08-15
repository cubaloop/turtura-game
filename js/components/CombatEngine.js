// Tower of Babel (100 Floors) Turn-Based Combat Engine (2 Action Attacks per Squad Card)
class CombatEngine {
  constructor(containerId, getPlayerDeck) {
    this.container = document.getElementById(containerId);
    this.getPlayerDeck = getPlayerDeck;
    this.currentFloor = 1;
    this.maxFloors = 100;
    
    // Tower Floor Boss State
    this.bossHp = 100;
    this.bossMaxHp = 100;
    this.isBattleRunning = false;
    this.battleLogs = [];
    this.showResultModal = false;
    this.lastBattleWon = false;

    this.init();
  }

  init() {
    this.render();
  }

  playSynthSound(freq = 440, type = 'sine', duration = 0.1) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch(e) {}
  }

  getBossForFloor(floor) {
    const bossNames = [
      "Guardian de Piedra", "Sombra de Esporas", "Leviatán Menor", "Quimera Voladora",
      "Gargola de Titanio", "Dragón de Obsidiana", "Rey Parásito", "Humano Ancestral (Piso 100)"
    ];
    const name = floor === 100 ? bossNames[7] : bossNames[(floor - 1) % 7];
    const maxHp = 80 + (floor * 25);
    const atk = 10 + (floor * 4);
    const icon = floor === 100 ? "👑" : (floor % 4 === 1 ? "🪨" : floor % 4 === 2 ? "🦠" : floor % 4 === 3 ? "🦈" : "🦅");

    return { floor, name, maxHp, atk, icon };
  }

  render() {
    const deck = (this.getPlayerDeck() || []).slice(0, 4);
    const boss = this.getBossForFloor(this.currentFloor);
    const currentBossHp = this.bossHp > 0 ? this.bossHp : boss.maxHp;
    const hpPct = Math.floor((currentBossHp / boss.maxHp) * 100);

    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- TOWER OF BABEL HEADER BAR -->
        <div style="background: linear-gradient(180deg, #241710, #140d08); border: 3px solid var(--border-gold-3d); border-radius: 20px; padding: 0.85rem 1.5rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 8px 20px rgba(0,0,0,0.8);">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 1.8rem;">🏰</span>
            <div>
              <div style="font-size: 1.2rem; font-weight: 900; color: var(--accent-gold);">TORRE DE BABEL - PISO ${this.currentFloor} / 100</div>
              <div style="font-size: 0.75rem; color: #9ca3af;">Combate por Turnos: 2 Ataques por Carta (4 Cartas Máx)</div>
            </div>
          </div>
          <div style="font-size: 1rem; font-weight: 900; color: #4ade80; background: rgba(34,197,94,0.2); padding: 4px 14px; border-radius: 12px; border: 1px solid #4ade80;">
            Progreso: ${this.currentFloor}%
          </div>
        </div>

        <!-- BATTLE ARENA DISPLAY -->
        <div id="battle-arena-container" style="background: repeating-linear-gradient(0deg, rgba(34, 197, 94, 0.15), rgba(34, 197, 94, 0.15) 15px, rgba(20, 50, 25, 0.9) 15px, rgba(20, 50, 25, 0.9) 30px); border: 3px solid #4ade80; border-radius: 24px; padding: 1.5rem; position: relative; box-shadow: inset 0 0 30px rgba(0,0,0,0.9);">
          
          <!-- FLOATING COMBAT DAMAGE OVERLAY -->
          <div id="floating-damage-overlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none; z-index: 100; display: flex; align-items: center; justify-content: center;"></div>

          <!-- BOSS HUD -->
          <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 1.5rem;">
            <div style="font-size: 4rem; filter: drop-shadow(0 0 20px rgba(244,63,94,0.8)); margin-bottom: 0.5rem;">
              ${boss.icon}
            </div>
            <div style="font-size: 1.3rem; font-weight: 900; color: #f43f5e; text-shadow: 2px 2px 0 #000;">
              ${boss.name} (Piso ${boss.floor})
            </div>
            <div style="width: 280px; background: #000; border: 2px solid #f43f5e; border-radius: 10px; height: 16px; margin-top: 6px; overflow: hidden;">
              <div style="width: ${hpPct}%; background: linear-gradient(90deg, #f43f5e, #e11d48); height: 100%;"></div>
            </div>
            <div style="font-size: 0.8rem; font-weight: 800; color: #fff; margin-top: 4px;">HP: ${currentBossHp} / ${boss.maxHp}</div>
          </div>

          <!-- SQUAD BATTLE CARDS (4 CARDS MÁX - 2 ATTACK TURNS EACH) -->
          <div style="font-size: 0.85rem; font-weight: 900; color: var(--accent-gold); margin-bottom: 0.75rem; text-transform: uppercase;">
            🎒 Tu Escuadrón de Ataque (${deck.length}/4 Cartas Equipadas - 2 Turnos c/u)
          </div>
          <div class="backpack-grid-container" style="min-height: 140px; padding: 0.75rem; background: rgba(0,0,0,0.5);">
            ${deck.map((card, i) => `
              <div class="grid-slot" style="width: 110px; height: 135px; border-color: #4ade80;">
                <div style="font-size: 1.6rem;">${card.icon || '🪲'}</div>
                <div style="font-size: 0.7rem; font-weight: 900; color: #fff; text-align: center;">${card.name}</div>
                <div style="font-size: 0.65rem; color: var(--accent-gold); font-weight: 800;">⚔️ ${card.atk || 10} x2 Turnos</div>
              </div>
            `).join('')}
          </div>

          <!-- ACTION BUTTON -->
          <div style="margin-top: 1.5rem; text-align: center;">
            <button class="rpg-btn-green" id="btn-start-battle" style="width: 100%;">
              EJECUTAR ATAQUE POR TURNOS (2 TURNOS POR CARTA) ⚔️
            </button>
          </div>

        </div>

        <!-- DEFEAT / VICTORY MODAL -->
        ${this.showResultModal ? `
          <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(8, 20, 9, 0.94); z-index: 1000; display: flex; align-items: center; justify-content: center;">
            <div style="background: linear-gradient(180deg, #283e21, #0f240f); border: 4px solid var(--border-gold-3d); border-radius: 28px; padding: 2rem; width: 390px; text-align: center; box-shadow: 0 0 60px rgba(0,0,0,0.9);">
              <div style="font-size: 4.5rem;">${this.lastBattleWon ? '🏆' : '💀'}</div>
              <div style="font-size: 2.2rem; font-weight: 900; color: ${this.lastBattleWon ? '#4ade80' : '#ef4444'}; margin: 0.5rem 0; text-transform: uppercase;">
                ${this.lastBattleWon ? '¡PISO SUPERADO!' : '¡DERROTA!'}
              </div>
              <p style="font-size: 0.9rem; color: #cbd5e1; margin-bottom: 1.5rem;">
                ${this.lastBattleWon ? `¡Has conquistado el Piso ${this.currentFloor - 1} de la Torre de Babel!` : 'Tus criaturas han caído. Fusiona cartas en tu mochila para aumentar tu poder.'}
              </p>
              <button class="rpg-btn-gold" id="btn-modal-next" style="width: 100%;">
                ${this.lastBattleWon ? 'Avanzar al Siguiente Piso ➔' : 'Reintentar Piso 🔄'}
              </button>
            </div>
          </div>
        ` : ''}

      </div>
    `;

    this.attachEvents();
  }

  triggerScreenShake() {
    const arena = this.container.querySelector('#battle-arena-container');
    if (!arena) return;
    arena.style.transform = 'translate(8px, -8px)';
    setTimeout(() => arena.style.transform = 'translate(-8px, 8px)', 50);
    setTimeout(() => arena.style.transform = 'translate(5px, -5px)', 100);
    setTimeout(() => arena.style.transform = 'translate(0px, 0px)', 150);
  }

  triggerFloatingDamage(damageText) {
    const overlay = this.container.querySelector('#floating-damage-overlay');
    if (!overlay) return;

    const dmgEl = document.createElement('div');
    dmgEl.innerText = damageText;
    dmgEl.style.cssText = `
      font-size: 3.2rem;
      font-weight: 900;
      color: #ef4444;
      text-shadow: 0 0 18px #ef4444, 3px 3px 0 #000;
      animation: floatUp 1s forwards ease-out;
    `;
    overlay.appendChild(dmgEl);
    setTimeout(() => dmgEl.remove(), 1000);
  }

  attachEvents() {
    const btnBattle = this.container.querySelector('#btn-start-battle');
    if (btnBattle) {
      btnBattle.addEventListener('click', () => {
        this.playSynthSound(440, 'square', 0.15);
        this.triggerScreenShake();

        const deck = (this.getPlayerDeck() || []).slice(0, 4);
        let totalDamage = 0;
        // Each card attacks 2 times per round!
        deck.forEach(c => totalDamage += ((c.atk || 10) * 2));

        this.triggerFloatingDamage(`-${totalDamage} HP (2 Turnos x Carta)`);

        const boss = this.getBossForFloor(this.currentFloor);

        setTimeout(() => {
          if (totalDamage >= boss.maxHp / 2) {
            this.lastBattleWon = true;
            if (this.currentFloor < this.maxFloors) this.currentFloor++;
          } else {
            this.lastBattleWon = false;
          }

          this.showResultModal = true;
          this.render();
        }, 900);
      });
    }

    const btnNext = this.container.querySelector('#btn-modal-next');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        this.showResultModal = false;
        this.render();
      });
    }
  }
}

window.CombatEngine = CombatEngine;
