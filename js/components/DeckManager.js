// Turtura Pokémon TCG Style Card Inventory & 3D Interactive Card Inspector Component
class DeckManager {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.creatures = window.CREATURES_DATA || [];
    this.equippedIds = [1, 2, 3, 4]; // Active squad of 4 cards
    this.selectedCreature = this.creatures[0] || null;
    this.currentFilter = 'All';
    this.isCardFlipped = false;
    this.init();
  }

  init() {
    this.render();
  }

  render() {
    if (!this.container) return;

    const filteredCreatures = this.creatures.filter(c => {
      if (this.currentFilter === 'All') return true;
      return c.element === this.currentFilter;
    });

    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem; width: 100%; max-width: 1380px; margin: 0 auto; color: #fff;">
        
        <!-- INVENTORY TITLE HEADER & ELEMENTAL FILTERS -->
        <div style="background: rgba(14, 30, 16, 0.92); border: 3px solid var(--border-gold-3d); border-radius: 24px; padding: 1.25rem 1.5rem; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.85);">
          <div>
            <h2 style="font-size: 1.8rem; font-weight: 900; color: #fef08a; text-shadow: 0 2px 5px rgba(0,0,0,0.9);">
              🎴 Colección de Cartas Turtura (Pokémon TCG Style)
            </h2>
            <p style="font-size: 0.88rem; color: #cbd5e1; font-weight: 600;">
              Equipa hasta 4 cartas en tu mazo activo para la Torre de Babel.
            </p>
          </div>

          <!-- ELEMENTAL FILTER BUTTONS -->
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;" id="deck-filter-bar">
            ${['All', 'Aire', 'Fuego', 'Agua', 'Tierra'].map(elem => `
              <button class="filter-btn ${this.currentFilter === elem ? 'active' : ''}" data-elem="${elem}" style="
                background: ${this.currentFilter === elem ? 'linear-gradient(180deg, #fbbf24, #d97706)' : 'rgba(0,0,0,0.6)'};
                color: ${this.currentFilter === elem ? '#1e1b4b' : '#fff'};
                font-weight: 900;
                font-size: 0.85rem;
                padding: 0.5rem 1rem;
                border-radius: 12px;
                border: 1.5px solid ${this.currentFilter === elem ? '#fff' : '#4ade80'};
                cursor: pointer;
                transition: all 0.2s ease;
              ">
                ${elem === 'All' ? '🌐 Todos' : elem === 'Aire' ? '🌪️ Aire' : elem === 'Fuego' ? '🔥 Fuego' : elem === 'Agua' ? '💧 Agua' : '🪨 Tierra'}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- 2-PANEL LAYOUT CONTAINER -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 1.5rem; align-items: start;">
          
          <!-- LEFT PANEL: ACTIVE SQUAD (4 EQUIPPED SLOTS) & 3D FLOATING CARD INSPECTOR -->
          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            
            <!-- ACTIVE SQUAD CARD SLOTS -->
            <div style="background: rgba(18, 38, 22, 0.92); border: 3px solid var(--border-gold-3d); border-radius: 24px; padding: 1.25rem; box-shadow: 0 10px 30px rgba(0,0,0,0.85);">
              <h3 style="font-size: 1.2rem; font-weight: 900; color: #fbbf24; margin-bottom: 0.85rem; display: flex; align-items: center; gap: 0.5rem;">
                ⚔️ Mazo Activo (4/4 Cartas)
              </h3>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem;">
                ${this.equippedIds.map((id, index) => {
                  const creature = this.creatures.find(c => c.id === id);
                  if (!creature) return '';
                  return `
                    <div class="squad-slot" data-id="${creature.id}" style="
                      background: rgba(10, 25, 14, 0.9);
                      border: 2px solid #fbbf24;
                      border-radius: 16px;
                      padding: 0.65rem;
                      display: flex;
                      align-items: center;
                      gap: 0.65rem;
                      cursor: pointer;
                      box-shadow: 0 4px 12px rgba(0,0,0,0.8);
                      transition: transform 0.2s ease;
                    " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                      <div style="width: 44px; height: 58px; border-radius: 6px; overflow: hidden; border: 1.5px solid #fbbf24; flex-shrink: 0; background: #000;">
                        <img src="${creature.cardArt}" style="width: 100%; height: 100%; object-fit: cover;" alt="${creature.name}">
                      </div>
                      <div style="overflow: hidden;">
                        <div style="font-size: 0.82rem; font-weight: 900; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${creature.name}</div>
                        <div style="font-size: 0.72rem; color: #4ade80; font-weight: 700;">Nvl ${creature.level} • ⚔️ ${creature.atk}</div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- 3D FLOATING HOLOGRAPHIC CARD INSPECTOR PANEL (DARK GREEN BACKGROUND) -->
            ${this.selectedCreature ? `
              <div style="background: rgba(18, 38, 22, 0.95); border: 3.5px solid var(--border-gold-3d); border-radius: 28px; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; box-shadow: 0 15px 40px rgba(0,0,0,0.9);">
                
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                  <span style="background: #78350f; color: #fbbf24; font-size: 0.75rem; font-weight: 900; padding: 4px 12px; border-radius: 12px; border: 1px solid #fbbf24;">
                    ${this.selectedCreature.rarity}
                  </span>
                  <span style="color: #4ade80; font-size: 0.85rem; font-weight: 900;">
                    ${this.selectedCreature.element === 'Aire' ? '🌪️ Aire' : this.selectedCreature.element === 'Fuego' ? '🔥 Fuego' : this.selectedCreature.element === 'Agua' ? '💧 Agua' : '🪨 Tierra'}
                  </span>
                </div>

                <!-- 3D FLOATING CARD STAGE WITH MOUSE GYRO PERSPECTIVE & FOIL SHINE -->
                <div id="card-3d-stage" style="
                  width: 100%;
                  height: 380px;
                  border-radius: 20px;
                  overflow: hidden;
                  border: 3px solid #fbbf24;
                  background: radial-gradient(circle, #102a18 0%, #051409 100%);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  perspective: 1000px;
                  box-shadow: inset 0 0 35px rgba(0,0,0,0.9);
                  cursor: pointer;
                ">
                  
                  <!-- 3D CARD OBJECT (CSS 3D TRANSFORM WITH DEPTH & SHINE) -->
                  <div id="card-3d-object" style="
                    width: 220px;
                    height: 310px;
                    border-radius: 14px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.9), 0 0 25px rgba(251,191,36,0.6);
                    border: 3px solid #fbbf24;
                    position: relative;
                    transition: transform 0.15s ease-out;
                    transform-style: preserve-3d;
                    overflow: hidden;
                    background: #000;
                  ">
                    <!-- CARD FRONT FACE (2D POKEMON TCG ARTWORK) -->
                    <img src="${this.selectedCreature.cardArt}" style="width: 100%; height: 100%; object-fit: cover;" alt="${this.selectedCreature.name}">
                    
                    <!-- HOLOGRAPHIC SHINE OVERLAY -->
                    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 60%); pointer-events: none;"></div>
                  </div>

                </div>

                <div style="font-size: 0.8rem; color: #fbbf24; font-weight: 800;">
                  💡 Mueve el ratón sobre el recuadro para girar la carta en 3D
                </div>

                <h3 style="font-size: 1.4rem; font-weight: 900; color: #fff; text-shadow: 0 2px 4px #000;">
                  ${this.selectedCreature.name} (Nvl ${this.selectedCreature.level})
                </h3>

                <div style="display: flex; gap: 1.5rem; width: 100%; justify-content: center; background: rgba(0,0,0,0.5); padding: 0.75rem; border-radius: 14px; border: 1px solid #2e5a35;">
                  <div style="color: #ef4444; font-weight: 900; font-size: 0.95rem;">⚔️ ATQ: ${this.selectedCreature.atk}</div>
                  <div style="color: #3b82f6; font-weight: 900; font-size: 0.95rem;">🛡️ DEF: ${this.selectedCreature.def}</div>
                </div>

                <!-- EQUIP / FUSION ACTION BUTTONS -->
                <div style="display: flex; gap: 0.75rem; width: 100%;">
                  <button id="btn-toggle-equip" class="rpg-btn-gold" style="flex: 1; padding: 0.75rem; font-size: 0.9rem; font-weight: 900;">
                    ${this.equippedIds.includes(this.selectedCreature.id) ? 'Desequipar del Mazo' : '⚔️ Equipar en Mazo'}
                  </button>
                </div>
              </div>
            ` : ''}

          </div>

          <!-- RIGHT PANEL: FULL 2D POKEMON TCG CARD COLLECTION GRID -->
          <div style="background: rgba(18, 38, 22, 0.92); border: 3px solid var(--border-gold-3d); border-radius: 28px; padding: 1.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.85);">
            <h3 style="font-size: 1.3rem; font-weight: 900; color: #fbbf24; margin-bottom: 1rem;">
              📜 Inventario de Cartas (${filteredCreatures.length})
            </h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 1.1rem; max-height: 640px; overflow-y: auto; padding-right: 0.5rem;">
              ${filteredCreatures.map(creature => {
                const isSelected = this.selectedCreature && this.selectedCreature.id === creature.id;
                const isEquipped = this.equippedIds.includes(creature.id);
                return `
                  <div class="creature-card-item" data-id="${creature.id}" style="
                    background: ${isSelected ? 'rgba(120, 53, 15, 0.95)' : 'rgba(10, 25, 14, 0.9)'};
                    border: 2.5px solid ${isSelected ? '#fbbf24' : isEquipped ? '#4ade80' : '#2e5a35'};
                    border-radius: 14px;
                    padding: 0.5rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.4rem;
                    cursor: pointer;
                    box-shadow: 0 6px 15px rgba(0,0,0,0.8);
                    transition: transform 0.2s ease, border-color 0.2s ease;
                    position: relative;
                  " onmouseover="this.style.transform='scale(1.06)'" onmouseout="this.style.transform='scale(1)'">
                    
                    ${isEquipped ? `
                      <span style="position: absolute; top: 4px; right: 4px; background: #22c55e; color: #fff; font-size: 0.55rem; font-weight: 900; padding: 2px 5px; border-radius: 6px; z-index: 5;">EQUIPADO</span>
                    ` : ''}

                    <!-- 2D POKEMON TCG CARD IMAGE -->
                    <div style="width: 100%; height: 160px; border-radius: 10px; overflow: hidden; border: 1.5px solid #fbbf24; background: #000;">
                      <img src="${creature.cardArt}" style="width: 100%; height: 100%; object-fit: cover;" alt="${creature.name}">
                    </div>

                    <div style="font-size: 0.78rem; font-weight: 900; color: #fff; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%;">
                      ${creature.name}
                    </div>

                    <div style="font-size: 0.68rem; color: #fbbf24; font-weight: 800;">
                      Nvl ${creature.level}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

        </div>

      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    // Filter buttons
    const filterBtns = this.container.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentFilter = btn.getAttribute('data-elem');
        this.render();
      });
    });

    // Select creature card item
    const creatureCards = this.container.querySelectorAll('.creature-card-item, .squad-slot');
    creatureCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = parseInt(card.getAttribute('data-id'), 10);
        const creature = this.creatures.find(c => c.id === id);
        if (creature) {
          this.selectedCreature = creature;
          this.render();
        }
      });
    });

    // Toggle equip / unequip
    const btnEquip = this.container.querySelector('#btn-toggle-equip');
    if (btnEquip && this.selectedCreature) {
      btnEquip.addEventListener('click', () => {
        const id = this.selectedCreature.id;
        if (this.equippedIds.includes(id)) {
          if (this.equippedIds.length > 1) {
            this.equippedIds = this.equippedIds.filter(eId => eId !== id);
          }
        } else {
          if (this.equippedIds.length < 4) {
            this.equippedIds.push(id);
          } else {
            this.equippedIds[3] = id;
          }
        }
        this.render();
      });
    }

    // 3D Card Stage Mouse Gyro Perspective Interaction
    const cardStage = this.container.querySelector('#card-3d-stage');
    const cardObject = this.container.querySelector('#card-3d-object');
    if (cardStage && cardObject) {
      cardStage.addEventListener('mousemove', (e) => {
        const rect = cardStage.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = (-y / rect.height) * 35;
        const rotateY = (x / rect.width) * 35;
        cardObject.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      });

      cardStage.addEventListener('mouseleave', () => {
        cardObject.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
      });
    }
  }
}

window.DeckManager = DeckManager;
