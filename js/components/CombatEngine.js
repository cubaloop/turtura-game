// Full Visual Battle Arena Component for Turtura (Visual Stage, Health Bars, Animations, Sound)
class CombatEngine {
  constructor(containerId, getPlayerDeck) {
    this.container = document.getElementById(containerId);
    this.getPlayerDeck = getPlayerDeck;
    this.currentLevel = 1;
    this.wagerCard = null;

    this.dungeonNodes = [
      { level: 1, name: "Escarabajo Guardián", icon: "🪲", hp: 100, maxHp: 100, atk: 15, def: 10 },
      { level: 2, name: "Tigre de las Sombras", icon: "🐅", hp: 150, maxHp: 150, atk: 25, def: 15 },
      { level: 3, name: "Espectro Abisal", icon: "🦑", hp: 200, maxHp: 200, atk: 35, def: 20 },
      { level: 4, name: "Águila de Tormenta", icon: "🦅", hp: 260, maxHp: 260, atk: 45, def: 25 },
      { level: 5, name: "Behemoth Titánico", icon: "🦣", hp: 350, maxHp: 350, atk: 60, def: 35, isBoss: true },
      { level: 6, name: "Virión Quimérico", icon: "🧪", hp: 420, maxHp: 420, atk: 75, def: 40 },
      { level: 7, name: "Leviatán Abisal", icon: "🐋", hp: 500, maxHp: 500, atk: 90, def: 50 },
      { level: 8, name: "Roc Caelum", icon: "🕊️", hp: 600, maxHp: 600, atk: 110, def: 60 },
      { level: 9, name: "Kraken Tormentoso", icon: "🐙", hp: 750, maxHp: 750, atk: 135, def: 70, isBoss: true },
      { level: 10, name: "Cámara Secreta: El Humano", icon: "👤", hp: 1200, maxHp: 1200, atk: 220, def: 100, isBoss: true, isSecretFinalBoss: true }
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
              🗺️ Camino de la Mazmorra (Progreso del Capítulo)
            </h3>
            <span style="font-size: 0.8rem; color: var(--accent-cyan); font-weight: 700;">Nodo Activo: Nv. ${this.currentLevel} / 10</span>
          </div>

          <div class="dungeon-path-trail">
            ${this.dungeonNodes.map(node => {
              const isCompleted = node.level < this.currentLevel;
              const isCurrent = node.level === this.currentLevel;
              const statusClass = isCompleted ? 'completed' : isCurrent ? 'current' : 'locked';

              return `
                <div class="dungeon-node ${statusClass}" data-node-level="${node.level}">
                  <div style="font-size: 1.6rem;">${node.isSecretFinalBoss && node.level > this.currentLevel ? '🔒' : node.icon}</div>
                  <div style="font-size: 0.6rem; font-weight: 800; margin-top: 2px;">Nv. ${node.level}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- VISUAL BATTLE STAGE ARENA -->
        <div style="background: linear-gradient(180deg, #0b0f19 0%, #1e1b4b 100%); border: 2px solid var(--accent-cyan); border-radius: 24px; padding: 1.5rem; position: relative; overflow: hidden; box-shadow: 0 0 40px rgba(6,182,212,0.3);" id="battle-stage">
          
          <!-- STAGE HEADER -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <div style="font-size: 1.2rem; font-weight: 800; color: #fff;">
              ⚔️ ESCENARIO DE BATALLA - Nivel ${this.currentLevel}
            </div>
            ${currentNode.isSecretFinalBoss ? '<span style="font-size:0.8rem; font-weight:800; color:#f43f5e; background:rgba(244,63,94,0.2); padding:4px 10px; border-radius:12px;">🚨 JEFE FINAL: EL HUMANO</span>' : ''}
          </div>

          <!-- ENEMY MONSTER VISUAL STAGE (TOP) -->
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem; margin-bottom: 2rem;" id="enemy-stage-box">
            <div style="font-size: 1.1rem; font-weight: 800; color: var(--accent-rose);">${currentNode.name}</div>
            
            <div id="enemy-avatar" style="font-size: 5rem; filter: drop-shadow(0 0 25px rgba(244,63,94,0.8)); transition: transform 0.2s ease;">
              ${currentNode.icon}
            </div>

            <!-- ENEMY HEALTH BAR -->
            <div style="width: 320px; background: rgba(0,0,0,0.6); border: 2px solid rgba(255,255,255,0.2); border-radius: 12px; padding: 4px; position: relative;">
              <div id="enemy-hp-bar" style="height: 16px; background: linear-gradient(90deg, #f43f5e, #ef4444); border-radius: 8px; width: 100%; transition: width 0.4s ease;"></div>
              <div id="enemy-hp-text" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 800; color: #fff;">
                HP: ${currentNode.hp} / ${currentNode.maxHp}
              </div>
            </div>
          </div>

          <!-- PLAYER DECK BATTLE FIELD (BOTTOM) -->
          <div style="margin-top: 1rem;">
            <div style="font-size: 0.85rem; font-weight: 800; color: var(--accent-cyan); margin-bottom: 0.75rem; text-transform: uppercase;">
              🛡️ Tu Escuadrón de Batalla (${deck.length} Criaturas)
            </div>

            <div style="display: flex; gap: 1rem; overflow-x: auto; padding-bottom: 0.5rem;" id="player-deck-battlefield">
              ${deck.map(card => `
                <div class="creature-card ${card.rarity || 'common'} holographic" style="min-width: 120px; height: 170px; font-size: 0.7rem;">
                  <div class="card-header">
                    <span>${card.category}</span>
                    <span>T${card.tier}</span>
                  </div>
                  <div class="card-art-container" style="height: 70px;">
                    ${card.image ? `<img src="${card.image}" class="card-art-img" alt="${card.name}">` : `<span class="card-art-fallback" style="font-size:2rem;">${card.icon}</span>`}
                  </div>
                  <div class="card-name" style="font-size:0.7rem;">${card.name}</div>
                  <div class="card-stats" style="font-size:0.65rem;">
                    <span class="stat-atk">⚔️ ${card.atk}</span>
                    <span class="stat-def">🛡️ ${card.def}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- BATTLE ACTION BUTTON -->
          <button class="fusion-action-btn" id="btn-start-battle" style="width: 100%; margin-top: 1.5rem; font-size: 1.1rem; padding: 0.85rem;">
            LANZAR COMBATE ANIMADO ⚔️
          </button>
        </div>

        <!-- ONLINE PVP 1VS1 WAGER ARENA -->
        <div class="pvp-wager-panel">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--accent-rose);">🔥 Arena PvP de Apuestas 1vs1</h3>
            <span class="card-category-badge" style="background: rgba(244,63,94,0.2); color: #f43f5e;">ONLINE LIVE</span>
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

            <div style="display: flex; align-items: center; font-size: 1.8rem; font-weight: 800; color: var(--accent-amber);">VS</div>

            <div style="text-align: center;">
              <div style="font-size: 0.75rem; font-weight: 700; color: var(--accent-rose); margin-bottom: 0.5rem;">APUESTA RIVAL</div>
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
        const avatar = this.container.querySelector('#enemy-avatar');
        const hpBar = this.container.querySelector('#enemy-hp-bar');
        const hpText = this.container.querySelector('#enemy-hp-text');

        // Animate enemy hit shake
        if (avatar) {
          avatar.style.transform = 'scale(1.2) rotate(15deg)';
          setTimeout(() => avatar.style.transform = 'scale(1) rotate(0deg)', 300);
        }

        let totalAtk = 0;
        const deck = this.getPlayerDeck();
        deck.forEach(c => totalAtk += c.atk);

        const newHp = Math.max(0, currentNode.hp - totalAtk);
        const hpPct = Math.floor((newHp / currentNode.maxHp) * 100);

        if (hpBar) hpBar.style.width = `${hpPct}%`;
        if (hpText) hpText.innerText = `HP: ${newHp} / ${currentNode.maxHp}`;

        if (newHp <= 0 || totalAtk * 2 >= currentNode.hp) {
          this.playSynthSound(880, 'sine', 0.3);
          alert(`🏆 ¡VICTORIA! Haz derrotado al Guardián de Nivel ${this.currentLevel} (${currentNode.name}).`);
          if (this.currentLevel < 10) this.currentLevel++;
          this.render();
        } else {
          this.playSynthSound(180, 'sawtooth', 0.25);
          alert(`💀 DERROTA: El guardián repelió tu ataque. Fusiona tus cartas para aumentar tu ataque total.`);
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
        alert(`¡Duelo 1vs1 Iniciado! Has apostado tu carta '${this.wagerCard.name}'. Buscando oponente en la red...`);
      });
    }
  }
}

window.CombatEngine = CombatEngine;
