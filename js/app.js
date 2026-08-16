// Turtura Application Controller with Landing Page & Main Menu Integration
class TurturaApp {
  constructor() {
    this.landingPage = new LandingPage(
      'landing-page-container',
      () => this.switchTab('world')
    );
    
    this.categorySelector = new CategorySelector(
      'category-selector-container',
      (category) => this.switchTab('combat')
    );

    this.initBottomNav();
    this.initHeaderHome();
  }

  initHeaderHome() {
    const headerHomeBtn = document.getElementById('btn-header-home');
    if (headerHomeBtn) {
      headerHomeBtn.addEventListener('click', () => this.switchTab('landing'));
    }
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

  switchTab(tabId) {
    const bgMap = {
      landing: 'bg-world',
      world: 'bg-world',
      deck: 'bg-deck',
      combat: 'bg-combat',
      shop: 'bg-shop',
      events: 'bg-world'
    };
    document.body.className = bgMap[tabId] || 'bg-world';

    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));

    const targetSection = document.getElementById(`view-${tabId}`);
    if (targetSection) targetSection.classList.add('active');

    if (tabId === 'landing') this.landingPage.render();
    if (tabId === 'world') this.categorySelector.render();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new TurturaApp();
});
