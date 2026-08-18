// Turtura Core Game Application Orchestrator
class TurturaApp {
  constructor() {
    this.currentTab = 'world';
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.initComponents();
      this.attachNavigation();
    });
  }

  initComponents() {
    // 0. Landing Page Hero
    if (document.getElementById('landing-page-container')) {
      this.landingPage = new window.LandingPage('landing-page-container', () => this.switchTab('world'));
    }

    // 1. World / Calabozo Main Menu Hub
    if (document.getElementById('category-selector-container')) {
      this.categorySelector = new window.CategorySelector('category-selector-container', (targetTab) => this.switchTab(targetTab));
    }

    // 2. Criaturas / Pokémon TCG Style Card Inventory
    if (document.getElementById('deck-manager-container')) {
      this.deckManager = new window.DeckManager('deck-manager-container');
    }

    // 3. JvsJ / Combat Engine & 100-Floor Babel Tower
    if (document.getElementById('view-combat')) {
      this.combatEngine = new window.CombatEngine('view-combat');
    }

    // 4. Fusion Chamber
    if (document.getElementById('view-shop')) {
      this.fusionSynthesizer = new window.FusionSynthesizer('view-shop');
    }

    // 5. Live AI Assistant Chatbot
    this.aiAssistant = new window.AIAssistant();
  }

  attachNavigation() {
    const navItems = document.querySelectorAll('.bottom-nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetTab = item.getAttribute('data-target-tab');
        if (targetTab) this.switchTab(targetTab);
      });
    });

    const btnHeaderHome = document.getElementById('btn-header-home');
    if (btnHeaderHome) {
      btnHeaderHome.addEventListener('click', () => this.switchTab('world'));
    }
  }

  switchTab(tabId) {
    this.currentTab = tabId;

    // Hide all view sections
    const sections = document.querySelectorAll('.view-section');
    sections.forEach(sec => sec.classList.remove('active'));

    // Show target view section
    const targetSection = document.getElementById(`view-${tabId}`);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // Update bottom nav active state
    const navItems = document.querySelectorAll('.bottom-nav-item');
    navItems.forEach(item => {
      if (item.getAttribute('data-target-tab') === tabId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

window.app = new TurturaApp();
