// AAA Visual Combat Engine Component for Turtura with Floating Combat Text, Collision, & Screen Shake
class CombatEngine {
  constructor(containerId, getPlayerDeck) {
    this.container = document.getElementById(containerId);
    this.getPlayerDeck = getPlayerDeck;
    this.currentLevel = 1;
    this.playerHp = 69;
    this.playerMaxHp = 69;
    this.enemyHp = 69;
    this.enemyMaxHp = 69;
    this.battleTimer = 4.8;
    this.showResultModal = false;
    this.lastBattleWon = false;
    this.wagerCard = null;

    this.dungeonNodes = [
      { level: 1, name: "Fatsmallboy", icon: "🧙‍♂️", hp: 69, maxHp: 69, atk: 12 },
      { level: 2, name: "ShadowHunter99", icon: "🥷", hp: 85, maxHp: 85, atk: 18 },
      { level: 3, name: "DragonSlayer", icon: "🛡️", hp: 110, maxHp: 110, atk: 25 },
      { level: 4, name: "CalamityAbyss", icon: "🦑", hp: 140, maxHp: 140, atk: 35 },
      { level: 5, name: "El Humano (Jefe Final)", icon: "👑", hp: 250, maxHp: 250, atk: 50, isBoss: true }
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

    const safeEnemyHp = isNaN(currentNode.hp) ? 69 : currentNode.hp;
    const safeEnemyMaxHp = isNaN(currentNode.maxHp) ? 69 : currentNode.maxHp;
    const enemyHpPct = Math.floor((safeEnemyHp / safeEnemyMaxHp) * 100);
    const playerHpPct = Math.floor((this.playerHp / this.playerMaxHp) * 100);

    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- TOP BATTLE CONTROL BAR -->
        <div style="background: #1c110a; border: 2px solid var(--border-gold); border-radius: 16px; padding: 0.6rem 1.25rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 12px rgba(0,0,0,0.6);">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <span style="font-weight: 900; color: var(--accent-gold); font-size: 1.1rem;">🏆 5</span>
            <span style="font-size: 1.1rem;">❤️ ❤️ ❤️ ❤️ 🖤</span>
          </div>

          <div style="display: flex; align-items: center; gap: 1rem;">
            <span style="font-family: monospace; font-size: 1.2rem; font-weight: 900; color: var(--text-gold);">${this.battleTimer.toFixed(1)}s</span>
            <button class="tab-btn" style="padding: 4px 10px; font-size: 0.8rem;">⚡ 3.0x</button>
          </div>
        </div>

        <!-- STAGE BATTLE CONTAINER (BACKPACK BRAWL ARENA) -->
        <div id="battle-arena-container" style="background: repeating-linear-gradient(0deg, #2a1b12, #2a1b12 15px, #21140c 15px, #21140c 30px); border: 3px solid var(--border-gold); border-radius: 24px; padding: 1.25rem; position: relative; box-shadow: inset 0 0 30px rgba(0,0,0,0.9); transition: transform 0.1s ease;">
          
          <!-- FLOATING COMBAT DAMAGE TEXT CONTAINER -->
          <div id="floating-damage-overlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; pointer-events: none; z-index: 100; display: flex; align-items: center; justify-content: center;"></div>

          <!-- TOP: OPPONENT INVENTORY GRID -->
          <div style="margin-bottom: 1.5rem; text-align: center;">
            <div style="font-size: 0.8rem; font-weight: 800; color: var(--accent-red); margin-bottom: 0.5rem; text-transform: uppercase;">
              🛡️ Mochila Rival: ${currentNode.name} (Nivel ${this.currentLevel})
            </div>
            <div class="backpack-grid-container" style="min-height: 140px; padding: 0.75rem; background: rgba(0,0,0,0.4);">
              <div class="grid-slot" style="width: 100px; height: 120px;">🪓 <br/><span style="font-size:0.65rem; color:#fff;">Hacha Acero</span></div>
              <div class="grid-slot" style="width: 100px; height: 120px;">🛡️ <br/><span style="font-size:0.65rem; color:#fff;">Escudo Madera</span></div>
              <div class="grid-slot" style="width: 100px; height: 120px;">🌵 <br/><span style="font-size:0.65rem; color:#fff;">Cactus Raro</span></div>
              <div class="grid-slot" style="width: 100px; height: 120px;">🗡️ <br/><span style="font-size:0.65rem; color:#fff;">Daga Rápida</span></div>
            </div>
          </div>

          <!-- MIDDLE: HERO PORTRAITS & HP BARS -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; background: rgba(0,0,0,0.6); padding: 1rem; border-radius: 18px; border: 2px solid #4a3222; margin-bottom: 1.5rem;">
            <!-- PLAYER HERO -->
            <div style="display: flex; gap: 0.75rem; align-items: center;">
              <div style="font-size: 3rem; background: #3d2a20; border: 2px solid var(--border-gold); border-radius: 14px; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center;">
                🧔🏻‍♂️
              </div>
              <div style="flex: 1;">
                <div style="font-weight: 900; font-size: 0.9rem; color: var(--accent-gold);">UniqueHonesty32</div>
                <div style="width: 100%; background: #1a100a; border: 1px solid #5a3d2a; border-radius: 6px; height: 12px; margin: 3px 0; overflow: hidden;">
                  <div style="width: ${playerHpPct}%; background: linear-gradient(90deg, #ef4444, #dc2626); height: 100%;"></div>
                </div>
                <div style="font-size: 0.7rem; font-weight: 800; color: #fff;">HP: ${this.playerHp} / ${this.playerMaxHp}</div>
              </div>
            </div>

            <!-- ENEMY HERO -->
            <div style="display: flex; gap: 0.75rem; align-items: center; flex-direction: row-reverse;">
              <div style="font-size: 3rem; background: #3d2a20; border: 2px solid var(--accent-red); border-radius: 14px; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center;">
                ${currentNode.icon}
              </div>
              <div style="flex: 1; text-align: right;">
                <div style="font-weight: 900; font-size: 0.9rem; color: var(--accent-red);">${currentNode.name}</div>
                <div style="width: 100%; background: #1a100a; border: 1px solid #5a3d2a; border-radius: 6px; height: 12px; margin: 3px 0; overflow: hidden;">
                  <div style="width: ${enemyHpPct}%; background: linear-gradient(90deg, #a855f7, #9333ea); height: 100%;"></div>
                </div>
                <div style="font-size: 0.7rem; font-weight: 800; color: #fff;">HP: ${safeEnemyHp} / ${safeEnemyMaxHp}</div>
              </div>
            </div>
          </div>

          <!-- BOTTOM: PLAYER INVENTORY GRID -->
          <div>
            <div style="font-size: 0.8rem; font-weight: 800; color: var(--accent-gold); margin-bottom: 0.5rem; text-transform: uppercase;">
              🎒 Tu Mochila de Batalla (${deck.length} Criaturas Equipadas)
            </div>
            <div class="backpack-grid-container" style="min-height: 140px; padding: 0.75rem; background: rgba(0,0,0,0.4);">
              ${deck.slice(0, 4).map(card => `
                <div class="grid-slot" style="width: 100px; height: 120px;">
                  <div style="font-size: 1.5rem;">${card.icon || '🪲'}</div>
                  <div style="font-size: 0.65rem; font-weight: 800; color: #fff; text-align: center;">${card.name || 'Criatura'}</div>
                  <div style="font-size: 0.6rem; color: var(--accent-gold);">⚔️ ${card.atk || 10}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- ACTION BUTTON -->
          <div style="margin-top: 1.5rem; text-align: center;">
            <button class="rpg-btn-green" id="btn-start-battle" style="width: 100%;">
              LANZAR COMBATE ANIMADO ⚔️
            </button>
          </div>
        </div>

        <!-- DEFEAT / VICTORY MODAL (BACKPACK BRAWL RIBBON STYLE) -->
        ${this.showResultModal ? `
          <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(11, 15, 25, 0.92); z-index: 1000; display: flex; align-items: center; justify-content: center;">
            <div style="background: linear-gradient(180deg, #3d1a10, #1c0e08); border: 4px solid var(--border-gold); border-radius: 24px; padding: 2rem; width: 390px; text-align: center; box-shadow: 0 0 60px rgba(0,0,0,0.9); position: relative;">
              <div style="font-size: 4.5rem; filter: drop-shadow(0 0 25px rgba(239,68,68,0.8));">💀</div>
              <div style="font-size: 2.2rem; font-weight: 900; color: #ef4444; margin: 0.5rem 0; text-transform: uppercase; letter-spacing: 2px; text-shadow: 2px 2px 0 #000;">
                ${this.lastBattleWon ? '¡VICTORIA!' : '¡DERROTA!'}
              </div>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">
                ${this.lastBattleWon ? '¡Has vencido al oponente y asegurado tus trofeos!' : 'Tus criaturas han caído en combate. Fusiona cartas para aumentar tu poder.'}
              </p>
              <div style="display: flex; gap: 0.75rem; justify-content: center;">
                <button class="rpg-btn-green" id="btn-modal-heart" style="font-size: 0.85rem; padding: 0.6rem 1.1rem;">Obtén 1 ❤️</button>
                <button class="rpg-btn-gold" id="btn-modal-next" style="font-size: 0.85rem; padding: 0.6rem 1.1rem;">Próxima Batalla ➔</button>
              </div>
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
    arena.style.transform = 'translate(6px, -6px)';
    setTimeout(() => arena.style.transform = 'translate(-6px, 6px)', 50);
    setTimeout(() => arena.style.transform = 'translate(4px, -4px)', 100);
    setTimeout(() => arena.style.transform = 'translate(0px, 0px)', 150);
  }

  triggerFloatingDamage(damageText) {
    const overlay = this.container.querySelector('#floating-damage-overlay');
    if (!overlay) return;

    const dmgEl = document.createElement('div');
    dmgEl.innerText = damageText;
    dmgEl.style.cssText = `
      font-size: 3rem;
      font-weight: 900;
      color: #ef4444;
      text-shadow: 0 0 15px #ef4444, 2px 2px 0 #000;
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
        
        let totalAtk = 0;
        const deck = this.getPlayerDeck() || [];
        deck.forEach(c => totalAtk += (c.atk || 10));

        this.triggerFloatingDamage(`-${totalAtk * 2}`);

        const currentNode = this.dungeonNodes.find(n => n.level === this.currentLevel) || this.dungeonNodes[0];

        setTimeout(() => {
          if (totalAtk * 2 >= (currentNode.hp || 50)) {
            this.lastBattleWon = true;
            if (this.currentLevel < 5) this.currentLevel++;
          } else {
            this.lastBattleWon = false;
          }

          this.showResultModal = true;
          this.render();
        }, 800);
      });
    }

    const btnNext = this.container.querySelector('#btn-modal-next');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        this.showResultModal = false;
        this.render();
      });
    }

    const btnHeart = this.container.querySelector('#btn-modal-heart');
    if (btnHeart) {
      btnHeart.addEventListener('click', () => {
        alert("❤️ Vida extra reclamada!");
        this.showResultModal = false;
        this.render();
      });
    }
  }
}

window.CombatEngine = CombatEngine;
