// Turtura Live 3D AI Assistant Component with Official Combat Rules Engine & 3D Presenter Avatar
class AIAssistant {
  constructor() {
    this.isOpen = false;
    this.init();
  }

  init() {
    this.createWidget();
    this.attachEvents();
  }

  createWidget() {
    // Floating 3D Presenter Avatar Trigger Badge
    const trigger = document.createElement('div');
    trigger.id = 'ai-assistant-trigger';
    trigger.style.cssText = `
      position: fixed;
      bottom: 85px;
      right: 25px;
      z-index: 9999;
      width: 78px;
      height: 78px;
      border-radius: 50%;
      background: radial-gradient(circle, #fbbf24 0%, #d97706 100%);
      border: 3.5px solid #fff;
      box-shadow: 0 10px 25px rgba(0,0,0,0.85), 0 0 20px rgba(251,191,36,0.6);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      overflow: hidden;
    `;

    trigger.innerHTML = `
      <model-viewer src="assets/models/hero_3d.glb" alt="3D Presenter Avatar" auto-rotate camera-controls style="width: 100%; height: 100%; pointer-events: none;"></model-viewer>
      <span style="position: absolute; bottom: 2px; background: rgba(0,0,0,0.85); color: #fbbf24; font-size: 0.6rem; font-weight: 900; padding: 1px 6px; border-radius: 8px; border: 1px solid #fbbf24;">3D LIVE</span>
    `;

    // Interactive Chatbot Modal Window
    const modal = document.createElement('div');
    modal.id = 'ai-assistant-modal';
    modal.style.cssText = `
      position: fixed;
      bottom: 175px;
      right: 25px;
      z-index: 10000;
      width: 380px;
      max-width: 90vw;
      height: 520px;
      background: rgba(14, 30, 16, 0.96);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 3.5px solid var(--border-gold-3d);
      border-radius: 28px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.95);
      display: none;
      flex-direction: column;
      overflow: hidden;
      color: #fff;
    `;

    modal.innerHTML = `
      <!-- CHATBOT HEADER WITH 3D AVATAR -->
      <div style="background: rgba(10, 25, 14, 0.95); border-bottom: 2px solid #fbbf24; padding: 0.85rem 1.25rem; display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 44px; height: 44px; border-radius: 50%; border: 2px solid #fbbf24; overflow: hidden; background: #000;">
            <model-viewer src="assets/models/hero_3d.glb" alt="3D Presenter Avatar" auto-rotate style="width: 100%; height: 100%;"></model-viewer>
          </div>
          <div>
            <div style="font-size: 0.95rem; font-weight: 900; color: #fef08a;">Oráculo de Turtura 3D</div>
            <div style="font-size: 0.72rem; color: #4ade80; font-weight: 700;">Asistente en Vivo • Reglas & Lore v1.0.4</div>
          </div>
        </div>
        <button id="ai-chat-close" style="background: none; border: none; color: #cbd5e1; font-size: 1.4rem; cursor: pointer; font-weight: 900;">✕</button>
      </div>

      <!-- MESSAGES DISPLAY CONTAINER -->
      <div id="ai-messages-container" style="flex: 1; padding: 1rem; overflow-y: auto; display: flex; flex-direction: column; gap: 0.85rem; font-size: 0.88rem; line-height: 1.45;">
        <div style="background: rgba(10, 25, 14, 0.9); border: 1.5px solid #2e5a35; border-radius: 16px; padding: 0.85rem; color: #e2e8f0; align-self: flex-start; max-width: 88%;">
          👋 ¡Hola, Invocador! Soy el <b>Presentador 3D y Oráculo Oficial de Turtura</b>.<br><br>
          Puedo resolver tus dudas sobre las <b>10 Cartas Oficiales</b>, el <b>Sistema de Combate JvsJ (Fórmula de Daño y 4 Fases)</b>, o la <b>Torre de Babel de 100 Pisos</b>. ¡Pregúntame lo que desees!
        </div>
      </div>

      <!-- CHAT INPUT BAR -->
      <div style="padding: 0.85rem; background: rgba(10, 25, 14, 0.95); border-top: 1.5px solid #2e5a35; display: flex; gap: 0.5rem;">
        <input id="ai-chat-input" type="text" placeholder="Pregunta sobre reglas, cartas o la torre..." style="flex: 1; background: rgba(0,0,0,0.6); border: 1.5px solid #4ade80; border-radius: 14px; padding: 0.65rem 0.85rem; color: #fff; font-size: 0.85rem; outline: none;">
        <button id="ai-chat-send" style="background: linear-gradient(180deg, #fbbf24, #d97706); border: none; border-radius: 14px; padding: 0 1.1rem; color: #1e1b4b; font-weight: 900; cursor: pointer; font-size: 0.85rem;">Enviar</button>
      </div>
    `;

    document.body.appendChild(trigger);
    document.body.appendChild(modal);

    this.trigger = trigger;
    this.modal = modal;
    this.messagesContainer = modal.querySelector('#ai-messages-container');
    this.input = modal.querySelector('#ai-chat-input');
  }

  attachEvents() {
    this.trigger.addEventListener('click', () => this.toggleModal());
    this.modal.querySelector('#ai-chat-close').addEventListener('click', () => this.toggleModal(false));

    const sendBtn = this.modal.querySelector('#ai-chat-send');
    sendBtn.addEventListener('click', () => this.sendMessage());

    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  toggleModal(forceState = null) {
    this.isOpen = forceState !== null ? forceState : !this.isOpen;
    this.modal.style.display = this.isOpen ? 'flex' : 'none';
  }

  async sendMessage() {
    const text = this.input.value.trim();
    if (!text) return;

    this.appendMessage('user', text);
    this.input.value = '';

    const typingDiv = this.appendMessage('assistant', '<i>Pensando...</i>');

    try {
      const answer = this.getGameAnswer(text);
      setTimeout(() => {
        typingDiv.innerHTML = answer;
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
      }, 500);
    } catch (e) {
      typingDiv.innerHTML = this.getGameAnswer(text);
    }
  }

  appendMessage(role, html) {
    const msg = document.createElement('div');
    const isUser = role === 'user';
    msg.style.cssText = `
      background: ${isUser ? 'linear-gradient(180deg, #fbbf24, #d97706)' : 'rgba(10, 25, 14, 0.9)'};
      color: ${isUser ? '#1e1b4b' : '#e2e8f0'};
      font-weight: ${isUser ? '800' : '500'};
      border: 1.5px solid ${isUser ? '#fff' : '#2e5a35'};
      border-radius: 16px;
      padding: 0.85rem;
      align-self: ${isUser ? 'flex-end' : 'flex-start'};
      max-width: 88%;
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
    `;
    msg.innerHTML = html;
    this.messagesContainer.appendChild(msg);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    return msg;
  }

  getGameAnswer(query) {
    const q = query.toLowerCase();

    if (q.includes('fórmula') || q.includes('formula') || q.includes('daño') || q.includes('dano') || q.includes('matemática')) {
      return `⚔️ <b>Fórmula Maestra de Daño JvsJ:</b><br><br>` +
        `$$Daño = \\max\\left(10, \\Big(ATQ_{atacante} - (DEF_{defensor} \\times Coef)\\Big) \\times Mult_{Elemental} \\times Crítico\\right)$$<br>` +
        `• <b>Coeficiente de Absorción:</b> 0.60 para Ataques Básicos y 0.35 para Habilidades Definitivas.<br>` +
        `• <b>Multiplicador Elemental:</b> 1.50x en ventaja, 1.00x en neutro, 0.75x en desventaja.<br>` +
        `• <b>Garantía:</b> Todo impacto asesta al menos 10 de daño residual.`;
    }

    if (q.includes('fase') || q.includes('turno') || q.includes('fases')) {
      return `🔄 <b>4 Fases Obligatorias por Turno:</b><br><br>` +
        `1️⃣ <b>Robo de Energía:</b> +2 Orbes de energía (máx 10).<br>` +
        `2️⃣ <b>Fase Táctica:</b> Usar Gadget/Consumible (1 por turno) o Relevo de Carta (1 Orbe).<br>` +
        `3️⃣ <b>Fase de Ataque:</b> Declaración de Ataque Básico o Habilidad Definitiva.<br>` +
        `4️⃣ <b>Fase de Cierre:</b> Resolución de estados alterados (Quemadura, Congelación, etc.).`;
    }

    if (q.includes('torre') || q.includes('piso') || q.includes('babel') || q.includes('mazmorra')) {
      return `🏰 <b>Estructura de la Torre de Babel (100 Pisos):</b><br><br>` +
        `• <b>Pisos 1-25 (Novatos):</b> Stats 1.0x. Jefe: Escarabajo de Lava (Piso 25).<br>` +
        `• <b>Pisos 26-50 (Élite):</b> Stats 1.5x + Estados Alterados (Quemadura, Congelación, Ceguera, Petrificación).<br>` +
        `• <b>Pisos 51-75 (Mitológicas):</b> Stats 2.2x + Climas Dinámicos (Tormenta Solar, Diluvio del Abismo, Vórtice Ciclónico, Dominio Telúrico).<br>` +
        `• <b>Pisos 76-100 (Titanes):</b> Stats 3.5x + Escudo de Fusión + Fase Berserk. Jefe Final: <b>Turtura Demiurgo Primordial (Piso 100)</b>!`;
    }

    if (q.includes('carta') || q.includes('cartas') || q.includes('harpía') || q.includes('dragón') || q.includes('tigre')) {
      return `🎴 <b>Compendio de Cartas Registradas (#1 a #10):</b><br><br>` +
        `1. 🌪️ <b>Águila Harpía #1</b> (Aire | ATQ 1300 / DEF 850)<br>` +
        `2. 🪨 <b>Tigre de Bengala #2</b> (Tierra | ATQ 1820 / DEF 1450)<br>` +
        `3. 🔥 <b>Dragón de Obsidiana #3</b> (Fuego | ATQ 2450 / DEF 1200)<br>` +
        `4. 💧 <b>Tortuga Cristalina #4</b> (Agua | ATQ 1450 / DEF 1890)<br>` +
        `5. 💧 <b>Kraken Colosal #5</b> (Agua | ATQ 2890 / DEF 2100)<br>` +
        `6. 🔥 <b>Escarabajo Escarlata #6</b> (Fuego | ATQ 850 / DEF 1100)<br>` +
        `7. 💧 <b>Tiburón Martillo #7</b> (Agua | ATQ 1750 / DEF 1300)<br>` +
        `8. 🔥 <b>Fénix Celestial #8</b> (Fuego | ATQ 2650 / DEF 1400)<br>` +
        `9. 🪨 <b>Behemoth de Roca #9</b> (Tierra | ATQ 1950 / DEF 2500)<br>` +
        `10. 🪨 <b>Hormiga Guerrera #10</b> (Tierra | ATQ 650 / DEF 720)`;
    }

    if (q.includes('elemento') || q.includes('elementos') || q.includes('rueda')) {
      return `🌟 <b>Rueda Elemental Sagrada (+50% Daño):</b><br><br>` +
        `• 🌪️ <b>Aire</b> vence a 🪨 <b>Tierra</b><br>` +
        `• 🪨 <b>Tierra</b> vence a 💧 <b>Agua</b><br>` +
        `• 💧 <b>Agua</b> vence a 🔥 <b>Fuego</b><br>` +
        `• 🔥 <b>Fuego</b> vence a 🌪️ <b>Aire</b>`;
    }

    return `🐢 <b>Reglas de Turtura: La Torre del Poder</b><br><br>` +
      `Puedes preguntarme sobre:<br>` +
      `• <b>"fórmula de daño"</b>: Motor matemático JvsJ.<br>` +
      `• <b>"fases de turno"</b>: Las 4 fases por ronda.<br>` +
      `• <b>"torre de babel"</b>: Los 100 pisos y recompensas.<br>` +
      `• <b>"cartas"</b>: Las 10 cartas oficiales creadas.<br>` +
      `• <b>"elementos"</b>: Ventajas de la Rueda Elemental.`;
  }
}

window.AIAssistant = AIAssistant;
