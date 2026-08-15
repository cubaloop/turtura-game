// 3D Card Viewer Component with 360-Degree Drag Rotation for Turtura
class CardModal {
  constructor() {
    this.modalEl = null;
    this.currentRotationY = 0;
    this.currentRotationX = 0;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.createModalDOM();
  }

  createModalDOM() {
    this.modalEl = document.createElement('div');
    this.modalEl.id = 'card-3d-modal';
    this.modalEl.style.cssText = `
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(11, 15, 25, 0.92);
      backdrop-filter: blur(16px);
      z-index: 1000;
      display: none;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      perspective: 1200px;
    `;

    this.modalEl.innerHTML = `
      <div style="position: absolute; top: 1.5rem; right: 2rem; z-index: 1010;">
        <button id="close-card-3d" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; font-size: 1.5rem; width: 44px; height: 44px; border-radius: 50%; cursor: pointer;">✕</button>
      </div>

      <div style="text-align: center; margin-bottom: 1rem; z-index: 1010;">
        <h3 id="modal-card-title" style="font-size: 1.5rem; font-weight: 800; color: var(--accent-cyan);">Inspección 3D de Carta</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary);">Arrastra con el ratón o el dedo para girar la carta 360° en 3D</p>
      </div>

      <!-- 3D CARD WRAPPER -->
      <div id="card-3d-scene" style="width: 260px; height: 380px; position: relative; transform-style: preserve-3d; cursor: grab; transition: transform 0.1s ease-out;">
        <div id="card-3d-face-front" class="creature-card common holographic" style="width: 100%; height: 100%; position: absolute; backface-visibility: hidden; border-width: 4px; box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
          <!-- Front content populated dynamically -->
        </div>

        <div id="card-3d-face-back" style="width: 100%; height: 100%; position: absolute; backface-visibility: hidden; transform: rotateY(180deg); background: linear-gradient(135deg, #1e1b4b, #311b92); border: 4px solid var(--accent-cyan); border-radius: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
          <div style="font-size: 4rem; filter: drop-shadow(0 0 20px rgba(6,182,212,0.8));">🐢</div>
          <div style="font-weight: 800; font-size: 1.25rem; letter-spacing: 3px; color: var(--accent-cyan);">TURTURA</div>
          <div style="font-size: 0.7rem; color: var(--text-secondary); text-transform: uppercase;">Sello Holográfico de Autenticidad</div>
        </div>
      </div>

      <div style="margin-top: 1.5rem; text-align: center; z-index: 1010;" id="modal-card-lore">
        <!-- Ability and stats details -->
      </div>
    `;

    document.body.appendChild(this.modalEl);
    this.attachEvents();
  }

  attachEvents() {
    const scene = this.modalEl.querySelector('#card-3d-scene');
    const closeBtn = this.modalEl.querySelector('#close-card-3d');

    closeBtn.addEventListener('click', () => this.hide());

    // Mouse drag for 360-degree rotation
    const onStart = (e) => {
      this.isDragging = true;
      this.startX = e.clientX || (e.touches && e.touches[0].clientX);
      this.startY = e.clientY || (e.touches && e.touches[0].clientY);
      scene.style.cursor = 'grabbing';
    };

    const onMove = (e) => {
      if (!this.isDragging) return;
      const currentX = e.clientX || (e.touches && e.touches[0].clientX);
      const currentY = e.clientY || (e.touches && e.touches[0].clientY);

      const deltaX = currentX - this.startX;
      const deltaY = currentY - this.startY;

      this.currentRotationY += deltaX * 0.8;
      this.currentRotationX -= deltaY * 0.8;

      scene.style.transform = `rotateY(${this.currentRotationY}deg) rotateX(${this.currentRotationX}deg)`;

      this.startX = currentX;
      this.startY = currentY;
    };

    const onEnd = () => {
      this.isDragging = false;
      scene.style.cursor = 'grab';
    };

    scene.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    scene.addEventListener('touchstart', onStart);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onEnd);
  }

  open(card) {
    if (!card) return;
    this.currentRotationY = 0;
    this.currentRotationX = 0;

    const scene = this.modalEl.querySelector('#card-3d-scene');
    scene.style.transform = `rotateY(0deg) rotateX(0deg)`;

    const titleEl = this.modalEl.querySelector('#modal-card-title');
    titleEl.innerText = `${card.name} (Tier ${card.tier})`;

    const frontEl = this.modalEl.querySelector('#card-3d-face-front');
    const frameClass = card.frameStyle || (card.rarity === 'common' ? 'common' : card.rarity === 'rare' ? 'rare' : card.rarity === 'epic' ? 'epic' : card.rarity === 'legendary' ? 'legendary' : 'ai_unique');
    frontEl.className = `creature-card ${frameClass} holographic`;

    frontEl.innerHTML = `
      <div class="card-header">
        <span class="card-category-badge">${card.category}</span>
        <span class="card-tier-badge">T${card.tier}</span>
      </div>
      <div class="card-art-container" style="height: 160px;">
        ${card.image ? `<img src="${card.image}" class="card-art-img" alt="${card.name}">` : `<span class="card-art-fallback" style="font-size:5rem;">${card.icon}</span>`}
      </div>
      <div class="card-name" style="font-size: 1.1rem; margin: 6px 0;">${card.name}</div>
      <div style="font-size: 0.75rem; color: var(--text-secondary); text-align: center; margin-bottom: 6px; line-height: 1.2;">
        ${card.ability}
      </div>
      <div class="card-stats" style="font-size: 0.85rem; padding: 6px;">
        <span class="stat-atk">⚔️ ${card.atk}</span>
        <span class="stat-def">🛡️ ${card.def}</span>
        <span class="stat-spd">⚡ ${card.spd}</span>
      </div>
    `;

    const loreEl = this.modalEl.querySelector('#modal-card-lore');
    loreEl.innerHTML = `
      <div style="background: rgba(255,255,255,0.05); padding: 1rem 2rem; border-radius: 14px; border: 1px solid rgba(255,255,255,0.1);">
        <span style="font-size: 0.85rem; font-weight: 700; color: var(--accent-cyan);">Habilidad Especial:</span>
        <p style="font-size: 0.9rem; color: #fff; margin-top: 4px;">${card.ability}</p>
        ${card.isAiUnique ? `<div style="margin-top: 8px; font-size: 0.75rem; font-weight: 800; color: #ec4899;">🌟 ${card.ownerSignature}</div>` : ''}
      </div>
    `;

    this.modalEl.style.display = 'flex';
  }

  hide() {
    this.modalEl.style.display = 'none';
  }
}

window.CardModal = CardModal;
