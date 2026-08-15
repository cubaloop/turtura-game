// Component for Level Battle & Interactive Dungeon Node Map in Turtura
class CombatEngine {
  constructor(containerId, getPlayerDeck) {
    this.container = document.getElementById(containerId);
    this.getPlayerDeck = getPlayerDeck;
    this.currentLevel = 1;
    this.wagerCard = null;

    this.dungeonNodes = [
      { level: 1, name: "Escarabajo Guardián", icon: "🪲", hp: 100, atk: 15, isBoss: false },
      { level: 2, name: "Tigre de las Sombras", icon: "🐅", hp: 140, atk: 23, isBoss: false },
      { level: 3, name: "Espectro Abisal", icon: "🦑", hp: 180, atk: 31, isBoss: false },
      { level: 4, name: "Águila de Tormenta", icon: "🦅", hp: 220, atk: 39, isBoss: false },
      { level: 5, name: "Behemoth Titánico", icon: "🦣", hp: 300, atk: 50, isBoss: true },
      { level: 6, name: "Virión Quimérico", icon: "🧪", hp: 360, atk: 62, isBoss: false },
      { level: 7, name: "Leviatán Abisal", icon: "🐋", hp: 420, atk: 75, isBoss: false },
      { level: 8, name: "Roc Caelum", icon: "🕊️", hp: 500, atk: 90, isBoss: false },
      { level: 9, name: "Kraken Tormentoso", icon: "🐙", hp: 600, atk: 110, isBoss: true },
      { level: 10, name: "Cámara Secreta: El Humano", icon: "👤", hp: 1000, atk: 200, isBoss: true, isSecretFinalBoss: true }
    ];

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

  render() {
    const deck = this.getPlayerDeck() || [];
    const currentNode = this.dungeonNodes.find(n => n.level === this.currentLevel) || this.dungeonNodes[0];

    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        
        <!-- INTERACTIVE ANIMATED DUNGEON PATH MAP -->
        <div class="dungeon-map-container">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--accent-purple);">
              🗺️ Camino Interactivo de la Mazmorra (Progreso de Capítulos)
            </h3>
            <span style="font-size: 0.8rem; color: var(--accent-cyan); font-weight: 700;">Nodo Activo: ${this.currentLevel} / 10</span>
          </div>

          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 1rem;">
            Avanza derrotando los guardianes de cada zona. ¡Al final de la mazmorra se oculta la sala del Jefe Final!
          </p>

          <div class="dungeon-path-trail">
            ${this.dungeonNodes.map((node, idx) => {
              const isCompleted = node.level < this.currentLevel;
              const isCurrent = node.level === this.currentLevel;
              const isLocked = node.level > this.currentLevel;

              const statusClass = isCompleted ? 'completed' : isCurrent ? 'current' : 'locked';

              return `
                <div class="dungeon-node ${statusClass}" data-node-level="${node.level}">
                  <div style="font-size: 1.6rem;">${node.isSecretFinalBoss && isLocked ? '🔒' : node.icon}</div>
                  <div style="font-size: 0.6rem; font-weight: 800; margin-top: 2px;">Nv. ${node.level}</div>
                  ${isCurrent ? '<div style="position: absolute; bottom: -24px; font-size: 0.65rem; font-weight: 800; color: var(--accent-rose); white-space: nowrap;">¡AQUÍ!</div>' : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- BATTLE ENCOUNTER PANEL -->
        <div style="background: var(--bg-card); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h3 style="font-size: 1.25rem; font-weight: 800;">⚔️ Encuentro Activo: ${currentNode.name}</h3>
            ${currentNode.isSecretFinalBoss ? '<span style="font-size: 0.8rem; color: var(--accent-rose); font-weight: 800;">🚨 REVELACIÓN SECRETA: EL HUMANO</span>' : ''}
          </div>

          <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 1.5rem; align-items: center; background: rgba(15,23,42,0.8); padding: 1.5rem; border-radius: 16px; margin-bottom: 1rem;">
            <!-- PLAYER TEAM -->
            <div style="text-align: center;">
              <div style="font-weight: 800; color: var(--accent-cyan); margin-bottom: 0.5rem;">TU MAZO DE CRIATURAS</div>
              <div style="font-size: 3.5rem;">🎒</div>
              <div style="font-size: 0.85rem; font-weight: 700; margin-top: 0.5rem;">${deck.length} Criaturas preparadas</div>
            </div>

            <div style="font-size: 2.5rem; font-weight: 800; color: var(--accent-rose);">VS</div>

            <!-- ENEMY GUARDIAN -->
            <div style="text-align: center;">
              <div style="font-weight: 800; color: var(--accent-rose); margin-bottom: 0.5rem;">${currentNode.name}</div>
              <div style="font-size: 4rem; filter: drop-shadow(0 0 15px rgba(244,63,94,0.6));">${currentNode.icon}</div>
              <div style="font-size: 0.85rem; font-weight: 700; margin-top: 0.5rem; color: #f43f5e;">
                HP: ${currentNode.hp} | ATK: ${currentNode.atk}
              </div>
            </div>
          </div>

          <div id="battle-log" style="background: rgba(0,0,0,0.6); padding: 1rem; border-radius: 12px; font-family: monospace; font-size: 0.85rem; color: var(--accent-emerald); height: 110px; overflow-y: auto; margin-bottom: 1rem; border: 1px solid rgba(255,255,255,0.1);">
            > Te encuentras frente a [${currentNode.name}] en el Nodo ${this.currentLevel} del camino. Presiona 'LANZAR COMBATE' para atacar.
          </div>

          <button class="fusion-action-btn" id="btn-start-battle" style="width: 100%;">
            LANZAR COMBATE ANIMADO ⚔️
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
              <div id="wager-slot-player" style="border: 2px dashed rgba(255,255,255,0.2); width: 120px; height: 160px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin: 0 auto; cursor: pointer;">
                ${this.wagerCard ? `<div style="text-align:center;">${this.wagerCard.icon}<br/><b>${this.wagerCard.name}</b></div>` : '<span style="font-size:0.75rem; color:#64748b; font-weight:700;">Haz Clic para Elegir</span>'}
              </div>
            </div>

            <div style="display: flex; align-items: center; font-size: 1.8rem; font-weight: 800; color: var(--accent-amber);">⚔️</div>

            <div style="text-align: center;">
              <div style="font-size: 0.75rem; font-weight: 700; color: var(--accent-rose); margin-bottom: 0.5rem;">APUESTA RIVAL (BUSCANDO)</div>
              <div style="border: 2px dashed rgba(244,63,94,0.4); width: 120px; height: 160px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin: 0 auto; background: rgba(0,0,0,0.3);">
                <span style="font-size: 2.2rem; filter: blur(2px);">🃏</span>
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
        this.playSynthSound(440, 'square', 0.15);
        const currentNode = this.dungeonNodes.find(n => n.level === this.currentLevel) || this.dungeonNodes[0];
        const log = this.container.querySelector('#battle-log');
        log.innerHTML += `<br/>> [Nodo ${this.currentLevel}] Tu mazo ataca a ${currentNode.name}...`;
        
        let totalAtk = 0;
        const deck = this.getPlayerDeck();
        deck.forEach(c => totalAtk += c.atk);

        if (totalAtk * 2.2 >= currentNode.hp) {
          this.playSynthSound(880, 'sine', 0.3); // Victory chime sound
          log.innerHTML += `<br/>> 🏆 ¡VICTORIA! Haz superado el Nodo ${this.currentLevel} (${currentNode.name}).`;
          if (this.currentLevel < 10) this.currentLevel++;
          log.innerHTML += `<br/>> 🎁 Recompensa: Carta añadida al inventario y camino abierto hacia el siguiente nodo.`;
          log.scrollTop = log.scrollHeight;
          setTimeout(() => this.render(), 1400);
        } else {
          this.playSynthSound(180, 'sawtooth', 0.25); // Failure sound
          log.innerHTML += `<br/>> 💀 DERROTA: El guardián repelió el ataque. Fusiona tus cartas para aumentar tu ataque total.`;
          log.scrollTop = log.scrollHeight;
        }
      });
    }

    const wagerSlot = this.container.querySelector('#wager-slot-player');
    if (wagerSlot) {
      wagerSlot.addEventListener('click', () => {
        this.playSynthSound(523.25, 'sine', 0.1);
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
        this.playSynthSound(783.99, 'square', 0.2);
        alert(`¡Duelo PvP de Apuestas Iniciado! Has apostado tu carta '${this.wagerCard.name}'. Conectando con servidor online...`);
      });
    }
  }
}

window.CombatEngine = CombatEngine;
