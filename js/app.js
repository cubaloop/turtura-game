// Main Application Controller for Turtura RPG Game
class TurturaApp {
  constructor() {
    this.initialCards = GAME_RULES.getRandomInitialCards();
    this.cardModal = new CardModal('card-modal-container');
    this.rewardModal = new RewardModal('reward-modal-container');
    
    this.categorySelector = new CategorySelector(
      'category-selector-container',
      (category) => this.switchTab('combat')
    );

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
  }

  switchTab(tabId) {
    document.querySelectorAll('.nav-tabs .tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));

    const targetBtn = document.getElementById(`tab-btn-${tabId}`);
    const targetSection = document.getElementById(`view-${tabId}`);

    if (targetBtn) targetBtn.classList.add('active');
    if (targetSection) targetSection.classList.add('active');

    if (tabId === 'world') this.categorySelector.render();
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
    }, timer * 200);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new TurturaApp();
});
