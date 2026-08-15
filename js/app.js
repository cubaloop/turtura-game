// Main Application Controller for Turtura RPG Game & Backpack Brawl Engine
class TurturaApp {
  constructor() {
    this.animatedBackground = new AnimatedBackground('animated-nature-canvas');
    this.authSystem = new AuthSystem(this.handleUserLoggedIn.bind(this));
    this.initialCards = this.authSystem.currentUser ? this.authSystem.currentUser.cards : GAME_RULES.getRandomInitialCards();
    
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

    // Presenter Onboarding Avatar 3D
    const hasSeenIntro = localStorage.getItem('turtura_has_seen_intro');
    if (!hasSeenIntro) {
      this.presenterAvatar = new PresenterAvatar('presenter-avatar-container', () => {
        localStorage.setItem('turtura_has_seen_intro', 'true');
      });
    }

    this.initBottomNav();
    this.initAuthModal();
    this.switchTab('deck'); // Default active tab is deck (Criaturas)
  }

  handleUserLoggedIn(user) {
    const badge = document.getElementById('user-badge-label');
    if (badge) badge.innerText = `🧔🏻‍♂️ ${user.displayName}`;
    this.backpackGrid.cards = user.cards || [];
    this.backpackGrid.render();
  }

  initBottomNav() {
    const bottomNavItems = document.querySelectorAll('.bottom-nav-bar .bottom-nav-item');
    bottomNavItems.forEach(item => {
      item.addEventListener('click', () => {
        bottomNavItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const targetTab = item.getAttribute('data-target-tab');
        this.switchTab(targetTab);
      });
    });
  }

  initAuthModal() {
    const btnAuth = document.getElementById('btn-auth-open');
    if (btnAuth) {
      btnAuth.addEventListener('click', () => {
        const username = prompt("Introduce tu nombre de usuario para Registrarte o Iniciar Sesión:");
        if (username) {
          const pass = prompt("Introduce tu contraseña:");
          if (pass) {
            let res = this.authSystem.login(username, pass);
            if (!res.success) {
              res = this.authSystem.register(username, pass);
            }
            if (res.success) {
              alert(`¡Bienvenido ${res.user.displayName}! Tu cuenta y progreso han sido guardados.`);
              this.handleUserLoggedIn(res.user);
            } else {
              alert(res.msg || "Error de inicio de sesión.");
            }
          }
        }
      });
    }
  }

  switchTab(tabId) {
    // Dynamic full-screen body background class
    document.body.className = `bg-${tabId}`;

    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));

    const targetSection = document.getElementById(`view-${tabId}`);
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

      if (this.authSystem.currentUser) {
        this.authSystem.saveUserData({ cards: this.backpackGrid.cards });
      }
    }, timer * 200);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new TurturaApp();
});
