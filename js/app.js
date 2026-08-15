// Main Application Controller for Turtura 2D RPG & TCG Game
class TurturaApp {
  constructor() {
    this.initialCards = GAME_RULES.getRandomInitialCards();
    this.cardModal = new CardModal('card-modal-container');
    this.rewardModal = new RewardModal('reward-modal-container');
    
    this.backpackGrid = new BackpackGrid(
      'deck-container',
      this.initialCards,
      this.handleFusionTrigger.bind(this),
      this.cardModal,
      this.rewardModal
    );

    this.combatEngine = new CombatEngine(
      'combat-container',
      () => this.backpackGrid.cards
    );

    // Initialize 2D Canvas Overworld Engine
    this.overworldEngine = new OverworldEngine(
      'overworld-canvas',
      (gymId) => this.switchTab('combat'),
      () => {
        alert("🌿 ¡Una criatura silvestre ha aparecido en la hierba alta!");
        this.switchTab('combat');
      }
    );

    this.initTabs();
  }

  initTabs() {
    const tabBtns = document.querySelectorAll('.nav-tabs .tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        this.switchTab(tabId);
      });
    });

    // Touch D-Pad Events for Mobile / On-Screen Controls
    const dpadMap = {
      'dpad-up': 'ArrowUp',
      'dpad-down': 'ArrowDown',
      'dpad-left': 'ArrowLeft',
      'dpad-right': 'ArrowRight'
    };

    Object.keys(dpadMap).forEach(btnId => {
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.addEventListener('mousedown', () => {
          this.overworldEngine.keys[dpadMap[btnId]] = true;
          this.overworldEngine.player.isMoving = true;
        });
        btn.addEventListener('mouseup', () => {
          this.overworldEngine.keys[dpadMap[btnId]] = false;
          this.overworldEngine.player.isMoving = false;
        });
        btn.addEventListener('touchstart', (e) => {
          e.preventDefault();
          this.overworldEngine.keys[dpadMap[btnId]] = true;
          this.overworldEngine.player.isMoving = true;
        });
        btn.addEventListener('touchend', (e) => {
          e.preventDefault();
          this.overworldEngine.keys[dpadMap[btnId]] = false;
          this.overworldEngine.player.isMoving = false;
        });
      }
    });
  }

  switchTab(tabId) {
    document.querySelectorAll('.nav-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));

    const targetBtn = document.getElementById(`tab-btn-${tabId}`);
    const targetSection = document.getElementById(`view-${tabId}`);

    if (targetBtn) targetBtn.classList.add('active');
    if (targetSection) targetSection.classList.add('active');

    if (tabId === 'deck') this.backpackGrid.render();
    if (tabId === 'combat') this.combatEngine.render();
  }

  handleFusionTrigger(cardA, cardB) {
    const fusionResult = GAME_RULES.getFusionResult(cardA, cardB);

    if (!fusionResult.allowed) {
      alert(fusionResult.reason || "Fusión no permitida.");
      this.backpackGrid.isFusing = false;
      this.backpackGrid.render();
      return;
    }

    const timer = fusionResult.timerSeconds || 5;

    setTimeout(() => {
      this.backpackGrid.removeCards([cardA.instanceId, cardB.instanceId]);

      const baseCreature = window.CREATURES_DB[fusionResult.targetCreatureId] || window.CREATURES_DB["tierra_t2_1"];
      const newCard = {
        instanceId: "card_" + Math.random().toString(36).substr(2, 9),
        ...baseCreature
      };

      this.backpackGrid.addCard(newCard);
    }, timer * 200); // Speeded up timer for immediate responsiveness
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new TurturaApp();
});
