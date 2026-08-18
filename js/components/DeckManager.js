// Turtura Paso 3: 2-Panel Deck & Creature Inventory Manager Component with Live 3D Model Viewer
class DeckManager {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.creatures = window.CREATURES_DATA || [];
    this.equippedIds = [1, 2, 5, 9]; // Active squad of 4 creatures
    this.selectedCreature = this.creatures[0] || null;
    this.currentFilter = 'All';
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
              🎴 Colección de Criaturas & Escuadrón 3D
            </h2>
            <p style="font-size: 0.88rem; color: #cbd5e1; font-weight: 600;">
              Equipa hasta 4 criaturas en tu escuadrón activo para la Torre de Babel.
            </p>
          </div>

          <!-- ELEMENTAL FILTER BUTTONS -->
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;" id="deck-filter-bar">
            ${['All', 'Fuego', 'Agua', 'Planta', 'Tierra'].map(elem => `
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
                ${elem === 'All' ? '🌐 Todos' : elem === 'Fuego' ? '🔥 Fuego' : elem === 'Agua' ? '💧 Agua' : elem === 'Planta' ? '🌿 Planta' : '🪨 Tierra'}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- 2-PANEL LAYOUT CONTAINER -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1.5rem; align-items: start;">
          
          <!-- LEFT PANEL: ACTIVE SQUAD (4 EQUIPPED SLOTS) & LIVE 3D INSPECTOR -->
          <div style="display: flex; flex-direction: column; gap: 1.25rem;">
            
            <!-- ACTIVE SQUAD CARD SLOTS -->
            <div style="background: rgba(18, 38, 22, 0.92); border: 3px solid var(--border-gold-3d); border-radius: 24px; padding: 1.25rem; box-shadow: 0 10px 30px rgba(0,0,0,0.85);">
              <h3 style="font-size: 1.2rem; font-weight: 900; color: #fbbf24; margin-bottom: 0.85rem; display: flex; align-items: center; gap: 0.5rem;">
                ⚔️ Escuadrón Activo (4/4)
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
                      <div style="width: 44px; height: 44px; border-radius: 10px; overflow: hidden; border: 1.5px solid #4ade80; flex-shrink: 0; background: #000;">
                        <img src="${creature.icon}" style="width: 100%; height: 100%; object-fit: cover;" alt="${creature.name}">
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

            <!-- LIVE 3D CREATURE INSPECTOR PANEL -->
            ${this.selectedCreature ? `
              <div style="background: rgba(18, 38, 22, 0.95); border: 3.5px solid var(--border-gold-3d); border-radius: 28px; padding: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 1rem; box-shadow: 0 15px 40px rgba(0,0,0,0.9);">
                <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                  <span style="background: #78350f; color: #fbbf24; font-size: 0.75rem; font-weight: 900; padding: 4px 12px; border-radius: 12px; border: 1px solid #fbbf24;">
                    ${this.selectedCreature.rarity}
                  </span>
                  <span style="color: #4ade80; font-size: 0.85rem; font-weight: 900;">
                    ${this.selectedCreature.element === 'Fuego' ? '🔥 Fuego' : this.selectedCreature.element === 'Agua' ? '💧 Agua' : this.selectedCreature.element === 'Planta' ? '🌿 Planta' : '🪨 Tierra'}
                  </span>
                </div>

                <!-- 3D MODEL VIEWER CONTAINER -->
                <div style="width: 100%; height: 260px; border-radius: 20px; overflow: hidden; border: 2.5px solid #fbbf24; background: radial-gradient(circle, rgba(25,50,30,0.95), rgba(5,15,8,0.98)); box-shadow: inset 0 0 25px rgba(0,0,0,0.9);">
                  <model-viewer src="${this.selectedCreature.model}" alt="${this.selectedCreature.name}" auto-rotate camera-controls shadow-intensity="1.5" style="width: 100%; height: 100%;"></model-viewer>
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
                    ${this.equippedIds.includes(this.selectedCreature.id) ? 'Desequipar' : '⚔️ Equipar'}
                  </button>
                </div>
              </div>
            ` : ''}

          </div>

          <!-- RIGHT PANEL: FULL CREATURE COLLECTION GRID -->
          <div style="background: rgba(18, 38, 22, 0.92); border: 3px solid var(--border-gold-3d); border-radius: 28px; padding: 1.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.85);">
            <h3 style="font-size: 1.3rem; font-weight: 900; color: #fbbf24; margin-bottom: 1rem;">
              📜 Inventario de Bestias (${filteredCreatures.length})
            </h3>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 1rem; max-height: 620px; overflow-y: auto; padding-right: 0.5rem;">
              ${filteredCreatures.map(creature => {
                const isSelected = this.selectedCreature && this.selectedCreature.id === creature.id;
                const isEquipped = this.equippedIds.includes(creature.id);
                return `
                  <div class="creature-card-item" data-id="${creature.id}" style="
                    background: ${isSelected ? 'rgba(120, 53, 15, 0.95)' : 'rgba(10, 25, 14, 0.9)'};
                    border: 2px solid ${isSelected ? '#fbbf24' : isEquipped ? '#4ade80' : '#2e5a35'};
                    border-radius: 18px;
                    padding: 0.75rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                    cursor: pointer;
                    box-shadow: 0 6px 15px rgba(0,0,0,0.8);
                    transition: transform 0.2s ease, border-color 0.2s ease;
                    position: relative;
                  " onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
                    
                    ${isEquipped ? `
                      <span style="position: absolute; top: 6px; right: 6px; background: #22c55e; color: #fff; font-size: 0.6rem; font-weight: 900; padding: 2px 6px; border-radius: 8px;">EQUIPADO</span>
                    ` : ''}

                    <div style="width: 70px; height: 70px; border-radius: 14px; overflow: hidden; border: 1.5px solid #fbbf24; background: #000;">
                      <img src="${creature.icon}" style="width: 100%; height: 100%; object-fit: cover;" alt="${creature.name}">
                    </div>

                    <div style="font-size: 0.8rem; font-weight: 900; color: #fff; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%;">
                      ${creature.name}
                    </div>

                    <div style="font-size: 0.7rem; color: #fbbf24; font-weight: 800;">
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
  }
}

window.DeckManager = DeckManager;
