// Turtura Step 4: 3D Turn-Based Combat Engine & 100-Floor Babel Tower Dungeon Crawler
class CombatEngine {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.creatures = window.CREATURES_DATA || [];
    
    // Player squad (4 equipped cards)
    this.playerSquad = [
      { ...this.creatures[0], currentHp: Math.round(this.creatures[0].def * 1.5), maxHp: Math.round(this.creatures[0].def * 1.5) },
      { ...this.creatures[1], currentHp: Math.round(this.creatures[1].def * 1.5), maxHp: Math.round(this.creatures[1].def * 1.5) },
      { ...this.creatures[2], currentHp: Math.round(this.creatures[2].def * 1.5), maxHp: Math.round(this.creatures[2].def * 1.5) },
      { ...this.creatures[3], currentHp: Math.round(this.creatures[3].def * 1.5), maxHp: Math.round(this.creatures[3].def * 1.5) }
    ];
    this.playerActiveIndex = 0;
    this.playerEnergy = 4;

    // Mode: 'babel' (100 floors) or 'pvp'
    this.currentMode = 'babel';
    this.currentFloor = 13;

    // Enemy active creature
    this.enemyCreature = this.generateEnemyForFloor(this.currentFloor);
    this.enemyEnergy = 4;

    // Turn phase: 1 (Energy), 2 (Tactical), 3 (Combat), 4 (End)
    this.currentPhase = 1;
    this.turnOwner = 'player'; // 'player' or 'enemy'
    this.combatLog = ['⚔️ ¡Comienza el combate en la Torre de Babel (Piso 13)!'];

    this.init();
  }

  generateEnemyForFloor(floor) {
    const baseCreature = this.creatures[(floor % this.creatures.length)] || this.creatures[0];
    const statMultiplier = floor <= 25 ? 1.0 : floor <= 50 ? 1.5 : floor <= 75 ? 2.2 : 3.5;
    const hp = Math.round(baseCreature.def * 1.5 * statMultiplier);
    return {
      id: 9900 + floor,
      name: `Guardián del Piso ${floor}: ${baseCreature.name}`,
      element: baseCreature.element,
      level: Math.round(baseCreature.level * statMultiplier),
      atk: Math.round(baseCreature.atk * statMultiplier),
      def: Math.round(baseCreature.def * statMultiplier),
      cardArt: baseCreature.cardArt,
      currentHp: hp,
      maxHp: hp
    };
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    const activePlayerCard = this.playerSquad[this.playerActiveIndex];

    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem; width: 100%; max-width: 1380px; margin: 0 auto; color: #fff;">
        
        <!-- ARENA HEADER & MODE SELECTOR -->
        <div style="background: rgba(14, 30, 16, 0.92); border: 3px solid var(--border-gold-3d); border-radius: 24px; padding: 1.25rem 1.5rem; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.85);">
          <div>
            <h2 style="font-size: 1.7rem; font-weight: 900; color: #fef08a; text-shadow: 0 2px 5px rgba(0,0,0,0.9);">
              ⚔️ Arena de Combate 3D: ${this.currentMode === 'babel' ? `La Torre de Babel (Piso ${this.currentFloor} / 100)` : 'Duelo JvsJ Competitivo'}
            </h2>
            <p style="font-size: 0.85rem; color: #cbd5e1; font-weight: 600;">
              Fórmula Maestra Gemini v1.0.4 • Turno del ${this.turnOwner === 'player' ? 'Jugador (Tú)' : 'Enemigo'}
            </p>
          </div>

          <!-- MODE TOGGLE BUTTONS -->
          <div style="display: flex; gap: 0.5rem;">
            <button id="btn-mode-babel" style="background: ${this.currentMode === 'babel' ? 'linear-gradient(180deg, #fbbf24, #d97706)' : 'rgba(0,0,0,0.6)'}; color: ${this.currentMode === 'babel' ? '#1e1b4b' : '#fff'}; font-weight: 900; font-size: 0.85rem; padding: 0.5rem 1rem; border-radius: 12px; border: 1.5px solid #fbbf24; cursor: pointer;">
              🏰 Torre (Piso ${this.currentFloor})
            </button>
            <button id="btn-mode-pvp" style="background: ${this.currentMode === 'pvp' ? 'linear-gradient(180deg, #fbbf24, #d97706)' : 'rgba(0,0,0,0.6)'}; color: ${this.currentMode === 'pvp' ? '#1e1b4b' : '#fff'}; font-weight: 900; font-size: 0.85rem; padding: 0.5rem 1rem; border-radius: 12px; border: 1.5px solid #fbbf24; cursor: pointer;">
              ⚔️ Duelo JvsJ
            </button>
          </div>
        </div>

        <!-- 3D BATTLE ARENA STAGE (2 SIDES) -->
        <div style="background: rgba(14, 30, 16, 0.95); border: 3.5px solid var(--border-gold-3d); border-radius: 28px; padding: 1.75rem; display: grid; grid-template-columns: 1fr auto 1fr; gap: 1.5rem; align-items: center; box-shadow: 0 20px 60px rgba(0,0,0,0.95); min-height: 480px; position: relative; overflow: hidden;">
          
          <!-- BACKGROUND BATTLE PARTICLES EFFECT -->
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: radial-gradient(circle, rgba(20,45,25,0.85) 0%, rgba(5,15,8,0.98) 100%); pointer-events: none;"></div>

          <!-- LEFT SIDE: PLAYER ACTIVE CARD (3D FLOATING CARD STAGE) -->
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.85rem; z-index: 10;">
            <div style="background: #15803d; color: #fff; font-size: 0.8rem; font-weight: 900; padding: 4px 14px; border-radius: 12px; border: 1px solid #4ade80;">
              🛡️ Tu Vanguardia
            </div>

            <!-- PLAYER 3D CARD CONTAINER -->
            <div style="width: 210px; height: 300px; border-radius: 16px; border: 3px solid #fbbf24; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.9), 0 0 20px rgba(74,222,128,0.4); background: #000; position: relative;">
              <img src="${activePlayerCard.cardArt}" style="width: 100%; height: 100%; object-fit: cover;" alt="${activePlayerCard.name}">
              <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 60%); pointer-events: none;"></div>
            </div>

            <div style="text-align: center;">
              <div style="font-size: 1.15rem; font-weight: 900; color: #fff;">${activePlayerCard.name}</div>
              <div style="font-size: 0.8rem; color: #fbbf24; font-weight: 800;">Nvl ${activePlayerCard.level} • ⚔️ ${activePlayerCard.atk} / 🛡️ ${activePlayerCard.def}</div>
            </div>

            <!-- PLAYER HEALTH BAR -->
            <div style="width: 100%; max-width: 220px; background: #000; border: 2px solid #22c55e; border-radius: 12px; height: 22px; overflow: hidden; position: relative;">
              <div style="width: ${Math.max(0, Math.min(100, (activePlayerCard.currentHp / activePlayerCard.maxHp) * 100))}%; background: linear-gradient(90deg, #22c55e, #16a34a); height: 100%; transition: width 0.3s ease;"></div>
              <span style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; font-size: 0.78rem; font-weight: 900; color: #fff; line-height: 22px; display: flex; align-items: center; justify-content: center;">
                ${activePlayerCard.currentHp} / ${activePlayerCard.maxHp} HP
              </span>
            </div>

            <!-- PLAYER ENERGY ORBS -->
            <div style="display: flex; gap: 0.4rem; align-items: center;">
              <span style="font-size: 0.8rem; font-weight: 900; color: #fbbf24;">Energía:</span>
              ${[...Array(10)].map((_, i) => `
                <div style="width: 14px; height: 14px; border-radius: 50%; background: ${i < this.playerEnergy ? '#fbbf24' : '#334155'}; border: 1px solid #fbbf24;"></div>
              `).join('')}
            </div>
          </div>

          <!-- CENTER VS EMBLEM & ACTION BUTTONS -->
          <div style="display: flex; flex-direction: column; align-items: center; gap: 1.25rem; z-index: 10;">
            <div style="font-size: 2.2rem; font-weight: 900; color: #ef4444; text-shadow: 0 0 20px rgba(239,68,68,0.8); background: rgba(0,0,0,0.7); width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #ef4444;">
              VS
            </div>

            <!-- ATTACK ACTIONS -->
            <div style="display: flex; flex-direction: column; gap: 0.65rem; width: 210px;">
              <button id="btn-attack-basic" class="rpg-btn-gold" style="padding: 0.75rem; font-size: 0.88rem; font-weight: 900; border-radius: 14px;" ${this.playerEnergy < 1 || this.turnOwner !== 'player' ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                ⚔️ Ataque Básico (1 🔮)
              </button>

              <button id="btn-attack-ultimate" style="background: linear-gradient(180deg, #dc2626, #991b1b); color: #fff; border: 2px solid #fca5a5; padding: 0.75rem; font-size: 0.88rem; font-weight: 900; border-radius: 14px; cursor: pointer; box-shadow: 0 4px 15px rgba(220,38,38,0.5);" ${this.playerEnergy < 3 || this.turnOwner !== 'player' ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>
                🔥 Habilidad Definitiva (3 🔮)
              </button>

              <button id="btn-pass-turn" style="background: rgba(0,0,0,0.6); color: #cbd5e1; border: 1.5px solid #64748b; padding: 0.5rem; font-size: 0.8rem; font-weight: 800; border-radius: 12px; cursor: pointer;">
                ⏳ Pasar Turno (+2 🔮)
              </button>
            </div>
          </div>

          <!-- RIGHT SIDE: ENEMY ACTIVE CARD -->
          <div style="display: flex; flex-direction: column; align-items: center; gap: 0.85rem; z-index: 10;">
            <div style="background: #991b1b; color: #fff; font-size: 0.8rem; font-weight: 900; padding: 4px 14px; border-radius: 12px; border: 1px solid #ef4444;">
              💀 Rival Enemigo
            </div>

            <!-- ENEMY 3D CARD CONTAINER -->
            <div style="width: 210px; height: 300px; border-radius: 16px; border: 3px solid #ef4444; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.9), 0 0 20px rgba(239,68,68,0.4); background: #000; position: relative;">
              <img src="${this.enemyCreature.cardArt}" style="width: 100%; height: 100%; object-fit: cover;" alt="${this.enemyCreature.name}">
              <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%); pointer-events: none;"></div>
            </div>

            <div style="text-align: center;">
              <div style="font-size: 1.15rem; font-weight: 900; color: #fff;">${this.enemyCreature.name}</div>
              <div style="font-size: 0.8rem; color: #ef4444; font-weight: 800;">Nvl ${this.enemyCreature.level} • ⚔️ ${this.enemyCreature.atk} / 🛡️ ${this.enemyCreature.def}</div>
            </div>

            <!-- ENEMY HEALTH BAR -->
            <div style="width: 100%; max-width: 220px; background: #000; border: 2px solid #ef4444; border-radius: 12px; height: 22px; overflow: hidden; position: relative;">
              <div style="width: ${Math.max(0, Math.min(100, (this.enemyCreature.currentHp / this.enemyCreature.maxHp) * 100))}%; background: linear-gradient(90deg, #ef4444, #dc2626); height: 100%; transition: width 0.3s ease;"></div>
              <span style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; font-size: 0.78rem; font-weight: 900; color: #fff; line-height: 22px; display: flex; align-items: center; justify-content: center;">
                ${this.enemyCreature.currentHp} / ${this.enemyCreature.maxHp} HP
              </span>
            </div>

            <!-- ENEMY ENERGY ORBS -->
            <div style="display: flex; gap: 0.4rem; align-items: center;">
              <span style="font-size: 0.8rem; font-weight: 900; color: #ef4444;">Energía:</span>
              ${[...Array(10)].map((_, i) => `
                <div style="width: 14px; height: 14px; border-radius: 50%; background: ${i < this.enemyEnergy ? '#ef4444' : '#334155'}; border: 1px solid #ef4444;"></div>
              `).join('')}
            </div>
          </div>

        </div>

        <!-- COMBAT LOG BOX -->
        <div style="background: rgba(10, 25, 14, 0.95); border: 2px solid #2e5a35; border-radius: 20px; padding: 1rem 1.5rem; max-height: 120px; overflow-y: auto; font-size: 0.85rem; color: #cbd5e1; font-weight: 600;">
          <div style="font-size: 0.8rem; font-weight: 900; color: #fbbf24; margin-bottom: 0.4rem;">📜 Registro de Batalla:</div>
          ${this.combatLog.map(log => `<div>${log}</div>`).join('')}
        </div>

      </div>
    `;

    this.attachEvents();
  }

  calculateDamage(attacker, defender, isUltimate = false) {
    const coef = isUltimate ? 0.35 : 0.60;
    
    // Elemental multiplier
    let elemMult = 1.0;
    if (
      (attacker.element === 'Aire' && defender.element === 'Tierra') ||
      (attacker.element === 'Tierra' && defender.element === 'Agua') ||
      (attacker.element === 'Agua' && defender.element === 'Fuego') ||
      (attacker.element === 'Fuego' && defender.element === 'Aire')
    ) {
      elemMult = 1.5;
    } else if (
      (attacker.element === 'Tierra' && defender.element === 'Aire') ||
      (attacker.element === 'Agua' && defender.element === 'Tierra') ||
      (attacker.element === 'Fuego' && defender.element === 'Agua') ||
      (attacker.element === 'Aire' && defender.element === 'Fuego')
    ) {
      elemMult = 0.75;
    }

    // Critical roll (15%)
    const isCrit = Math.random() < 0.15;
    const critMult = isCrit ? 1.5 : 1.0;

    const rawDamage = (attacker.atk - (defender.def * coef)) * elemMult * critMult;
    const finalDamage = Math.max(10, Math.round(rawDamage));

    return { damage: finalDamage, isCrit, elemMult };
  }

  executePlayerAttack(isUltimate = false) {
    if (this.turnOwner !== 'player') return;

    const energyCost = isUltimate ? 3 : 1;
    if (this.playerEnergy < energyCost) return;

    this.playerEnergy -= energyCost;
    const activePlayerCard = this.playerSquad[this.playerActiveIndex];
    const result = this.calculateDamage(activePlayerCard, this.enemyCreature, isUltimate);

    this.enemyCreature.currentHp = Math.max(0, this.enemyCreature.currentHp - result.damage);

    let logMsg = `⚔️ <b>${activePlayerCard.name}</b> usó <b>${isUltimate ? 'Habilidad Definitiva' : 'Ataque Básico'}</b> e infligió <span style="color:#ef4444; font-weight:900;">${result.damage} de daño</span> a ${this.enemyCreature.name}!`;
    if (result.elemMult > 1.0) logMsg += ' ⚡ ¡Ventaja Elemental (+50%)!';
    if (result.isCrit) logMsg += ' 🎯 ¡Golpe Crítico!';

    this.combatLog.unshift(logMsg);

    // Check if enemy defeated
    if (this.enemyCreature.currentHp <= 0) {
      this.combatLog.unshift(`🏆 <b>¡Has derrotado a ${this.enemyCreature.name}!</b>`);
      if (this.currentMode === 'babel') {
        this.currentFloor++;
        this.combatLog.unshift(`🏰 <b>¡Avanzas al Piso ${this.currentFloor} de la Torre de Babel!</b> Recompensa: +150 🪙 y +15 💎`);
        this.enemyCreature = this.generateEnemyForFloor(this.currentFloor);
      } else {
        this.enemyCreature = this.generateEnemyForFloor(this.currentFloor);
      }
    }

    // Pass turn to enemy
    this.turnOwner = 'enemy';
    this.render();

    // AI Enemy Turn after 1 second
    setTimeout(() => this.executeEnemyTurn(), 1000);
  }

  executeEnemyTurn() {
    if (this.turnOwner !== 'enemy') return;

    this.enemyEnergy = Math.min(10, this.enemyEnergy + 2);
    const activePlayerCard = this.playerSquad[this.playerActiveIndex];

    const isUltimate = this.enemyEnergy >= 3 && Math.random() > 0.5;
    const energyCost = isUltimate ? 3 : 1;
    this.enemyEnergy -= energyCost;

    const result = this.calculateDamage(this.enemyCreature, activePlayerCard, isUltimate);
    activePlayerCard.currentHp = Math.max(0, activePlayerCard.currentHp - result.damage);

    let logMsg = `💀 <b>${this.enemyCreature.name}</b> atacó con <b>${isUltimate ? 'Habilidad Definitiva' : 'Ataque Básico'}</b> causando <span style="color:#ef4444; font-weight:900;">${result.damage} de daño</span> a ${activePlayerCard.name}!`;
    this.combatLog.unshift(logMsg);

    if (activePlayerCard.currentHp <= 0) {
      this.combatLog.unshift(`☠️ <b>${activePlayerCard.name} ha caído en combate.</b>`);
      // Auto switch to next alive card
      const aliveIndex = this.playerSquad.findIndex(c => c.currentHp > 0);
      if (aliveIndex !== -1) {
        this.playerActiveIndex = aliveIndex;
        this.combatLog.unshift(`🛡️ Entra al combate: <b>${this.playerSquad[aliveIndex].name}</b>`);
      } else {
        this.combatLog.unshift(`💀 <b>¡Tu escuadrón ha sido derrotado! Reiniciando desafío de la Torre...</b>`);
        // Revive all
        this.playerSquad.forEach(c => c.currentHp = c.maxHp);
      }
    }

    // Player Turn returns
    this.playerEnergy = Math.min(10, this.playerEnergy + 2);
    this.turnOwner = 'player';
    this.render();
  }

  attachEvents() {
    const btnBabel = this.container.querySelector('#btn-mode-babel');
    if (btnBabel) {
      btnBabel.addEventListener('click', () => {
        this.currentMode = 'babel';
        this.render();
      });
    }

    const btnPvp = this.container.querySelector('#btn-mode-pvp');
    if (btnPvp) {
      btnPvp.addEventListener('click', () => {
        this.currentMode = 'pvp';
        this.render();
      });
    }

    const btnBasic = this.container.querySelector('#btn-attack-basic');
    if (btnBasic) {
      btnBasic.addEventListener('click', () => this.executePlayerAttack(false));
    }

    const btnUltimate = this.container.querySelector('#btn-attack-ultimate');
    if (btnUltimate) {
      btnUltimate.addEventListener('click', () => this.executePlayerAttack(true));
    }

    const btnPass = this.container.querySelector('#btn-pass-turn');
    if (btnPass) {
      btnPass.addEventListener('click', () => {
        if (this.turnOwner !== 'player') return;
        this.playerEnergy = Math.min(10, this.playerEnergy + 2);
        this.combatLog.unshift('⏳ Pasas el turno y acumulas +2 Orbes de Energía.');
        this.turnOwner = 'enemy';
        this.render();
        setTimeout(() => this.executeEnemyTurn(), 1000);
      });
    }
  }
}

window.CombatEngine = CombatEngine;
