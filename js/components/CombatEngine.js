// Component for Level Battle & PvP Wager Arena in Turtura
class CombatEngine {
  constructor(containerId, getPlayerDeck) {
    this.container = document.getElementById(containerId);
    this.getPlayerDeck = getPlayerDeck;
    this.currentLevel = 1;
    this.wagerCard = null;
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    const deck = this.getPlayerDeck() || [];

    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <!-- LEVEL MONSTER BATTLE SECTION -->
        <div style="background: var(--bg-card); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3 style="font-size: 1.25rem; font-weight: 800;">⚔️ Mazmorra de Combate - Nivel ${this.currentLevel} / 100</h3>
            <span style="font-size: 0.8rem; color: var(--accent-rose); font-weight: 700;">Jefe Final Oculto: ???</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 1.5rem; align-items: center; background: rgba(15,23,42,0.8); padding: 1.5rem; border-radius: 16px; margin-bottom: 1rem;">
            <!-- PLAYER TEAM -->
            <div style="text-align: center;">
              <div style="font-weight: 800; color: var(--accent-cyan); margin-bottom: 0.5rem;">TU MAZO DE CRIATURAS</div>
              <div style="font-size: 3rem;">🎒</div>
              <div style="font-size: 0.85rem; font-weight: 700; margin-top: 0.5rem;">${deck.length} Criaturas listas</div>
            </div>

            <div style="font-size: 2rem; font-weight: 800; color: var(--accent-rose);">VS</div>

            <!-- MONSTER ENEMY -->
            <div style="text-align: center;">
              <div style="font-weight: 800; color: var(--accent-rose); margin-bottom: 0.5rem;">MONSTRUO DE ZONA (Nv. ${this.currentLevel})</div>
              <div style="font-size: 3.5rem;">🐲</div>
              <div style="font-size: 0.85rem; font-weight: 700; margin-top: 0.5rem;">HP: ${100 + (this.currentLevel * 40)} | ATK: ${15 + (this.currentLevel * 8)}</div>
            </div>
          </div>

          <div id="battle-log" style="background: rgba(0,0,0,0.5); padding: 1rem; border-radius: 12px; font-family: monospace; font-size: 0.8rem; color: var(--accent-emerald); height: 100px; overflow-y: auto; margin-bottom: 1rem;">
            > Batalla inicializada. Presiona 'Lanzar Combate' para luchar contra el Monstruo de Zona.
          </div>

          <button class="fusion-action-btn" id="btn-start-battle" style="width: 100%;">
            LANZAR COMBATE POR NIVEL ⚔️
          </button>
        </div>

        <!-- ONLINE PVP WAGER ARENA -->
        <div class="pvp-wager-panel">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--accent-rose);">🔥 Arena PvP de Apuestas de Cartas (Wager Arena)</h3>
            <span class="card-category-badge" style="background: rgba(244,63,94,0.2); color: #f43f5e;">EN VIVO ONLINE</span>
          </div>

          <p style="font-size: 0.85rem; color: #cbd5e1;">
            Apuesta una carta de tu mazo contra otro jugador online. ¡El ganador del duelo se queda con la carta apostada del rival!
          </p>

          <div class="wager-box">
            <div style="text-align: center;">
              <div style="font-size: 0.75rem; font-weight: 700; color: var(--accent-cyan); margin-bottom: 0.5rem;">TU CARTA APOSTADA</div>
              <div id="wager-slot-player" style="border: 2px dashed rgba(255,255,255,0.2); width: 110px; height: 150px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto; cursor: pointer;">
                ${this.wagerCard ? `<div style="text-align:center;">${this.wagerCard.icon}<br/><b>${this.wagerCard.name}</b></div>` : '<span style="font-size:0.7rem; color:#64748b;">Haz Clic para Elegir</span>'}
              </div>
            </div>

            <div style="display: flex; align-items: center; font-size: 1.5rem; font-weight: 800; color: var(--accent-amber);">⚔️</div>

            <div style="text-align: center;">
              <div style="font-size: 0.75rem; font-weight: 700; color: var(--accent-rose); margin-bottom: 0.5rem;">APUESTA RIVAL (BUSCANDO)</div>
              <div style="border: 2px dashed rgba(244,63,94,0.4); width: 110px; height: 150px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto; background: rgba(0,0,0,0.3);">
                <span style="font-size: 1.8rem; filter: blur(2px);">🃏</span>
              </div>
            </div>
          </div>

          <button class="fusion-action-btn" id="btn-start-pvp" ${!this.wagerCard ? 'disabled' : ''} style="background: linear-gradient(135deg, var(--accent-rose), var(--accent-purple));">
            APOSTAR CARTA Y BUSCAR RIVAL PVP 🥊
          </button>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const btnBattle = this.container.querySelector('#btn-start-battle');
    if (btnBattle) {
      btnBattle.addEventListener('click', () => {
        const log = this.container.querySelector('#battle-log');
        log.innerHTML += `<br/>> [Nivel ${this.currentLevel}] ¡Tu mazo entra en combate!`;
        
        let totalAtk = 0;
        const deck = this.getPlayerDeck();
        deck.forEach(c => totalAtk += c.atk);

        const monsterHp = 100 + (this.currentLevel * 40);

        if (totalAtk * 2 >= monsterHp) {
          log.innerHTML += `<br/>> 🏆 ¡VICTORIA! Haz derrotado al Monstruo de Nivel ${this.currentLevel}.`;
          this.currentLevel++;
          log.innerHTML += `<br/>> 🎁 Recompensa obtenida: Nueva carta agregada a tu inventario.`;
          log.scrollTop = log.scrollHeight;
          setTimeout(() => this.render(), 1200);
        } else {
          log.innerHTML += `<br/>> 💀 DERROTA: El monstruo resistió el ataque. Fusiona tus cartas para aumentar tu poder.`;
          log.scrollTop = log.scrollHeight;
        }
      });
    }

    const wagerSlot = this.container.querySelector('#wager-slot-player');
    if (wagerSlot) {
      wagerSlot.addEventListener('click', () => {
        const deck = this.getPlayerDeck();
        if (deck.length > 0) {
          this.wagerCard = deck[0];
          this.render();
        }
      });
    }

    const btnPvp = this.container.querySelector('#btn-start-pvp');
    if (btnPvp) {
      btnPvp.addEventListener('click', () => {
        alert(`¡Duelo PvP Iniciado! Has apostado tu carta '${this.wagerCard.name}'. Sincronizando en la red online...`);
      });
    }
  }
}

window.CombatEngine = CombatEngine;
