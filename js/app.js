// Main Application Controller for Turtura
document.addEventListener("DOMContentLoaded", () => {
  console.log("🎮 Turtura inicializando con Inspección 3D y Animación de Premio...");

  const cardModal = new window.CardModal();
  const rewardModal = new window.RewardModal();

  // Generate 4 initial random cards for player
  const initialCards = window.GAME_RULES.getRandomInitialCards();
  console.log("🃏 Mano inicial generada:", initialCards);

  // Initialize Engines
  const fusionEngine = new window.FusionEngine();

  // Navigation Controller
  const tabChapters = document.getElementById("tab-chapters");
  const tabBackpack = document.getElementById("tab-backpack");
  const tabCombat = document.getElementById("tab-combat");

  const viewChapters = document.getElementById("view-chapters");
  const viewBackpack = document.getElementById("view-backpack");
  const viewCombat = document.getElementById("view-combat");

  function switchTab(activeTab, activeView) {
    [tabChapters, tabBackpack, tabCombat].forEach(t => t.classList.remove("active"));
    [viewChapters, viewBackpack, viewCombat].forEach(v => v.classList.remove("active"));

    activeTab.classList.add("active");
    activeView.classList.add("active");
  }

  tabChapters.addEventListener("click", () => switchTab(tabChapters, viewChapters));
  tabBackpack.addEventListener("click", () => switchTab(tabBackpack, viewBackpack));
  tabCombat.addEventListener("click", () => switchTab(tabCombat, viewCombat));

  // Initialize Components
  const categorySelector = new window.CategorySelector("container-category-selector", (categoryName) => {
    console.log("Mundo seleccionado:", categoryName);
    switchTab(tabBackpack, viewBackpack);
  });

  let backpackGrid;
  backpackGrid = new window.BackpackGrid("container-backpack", initialCards, (cardA, cardB) => {
    const statusMsg = document.getElementById("fusion-status-msg");
    const check = fusionEngine.canFuse(cardA, cardB);

    if (!check.allowed) {
      if (statusMsg) statusMsg.innerHTML = `<span style="color:#f43f5e;">❌ ${check.reason}</span>`;
      return;
    }

    if (statusMsg) {
      statusMsg.innerHTML = `<span style="color:#06b6d4;">🔥 Fusión iniciada. Tiempo restante: ${check.timerSeconds}s</span>`;
    }

    fusionEngine.startFusion(cardA, cardB, (newCard) => {
      console.log("✨ Fusión completada:", newCard);
      backpackGrid.removeCards([cardA.instanceId, cardB.instanceId]);
      backpackGrid.addCard(newCard);
    }, (fusionId, pct, remainingSecs) => {
      if (statusMsg) {
        statusMsg.innerHTML = `<span style="color:#06b6d4;">⏳ Sintetizando criatura... ${pct}% (${remainingSecs}s)</span>`;
      }
    });
  }, cardModal, rewardModal);

  const combatEngine = new window.CombatEngine("container-combat", () => backpackGrid.cards);
});
