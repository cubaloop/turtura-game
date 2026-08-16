// Turtura Live AI Assistant Component powered by Google AI Studio Gemini API
class AIAssistant {
  constructor(apiKey) {
    this.apiKey = apiKey || atob("QVEuQWI4Uk42SnRIRWNPbFlyUWJ0NEhsNFh1OEQybUtEUTJrNnUyNzVPbkNDcWQ5SUo0Z1E=");
    this.isOpen = false;
    this.history = [];
    this.init();
  }

  init() {
    this.createWidgetHtml();
    this.attachEvents();
  }

  createWidgetHtml() {
    const existing = document.getElementById('ai-assistant-widget');
    if (existing) existing.remove();

    const widget = document.createElement('div');
    widget.id = 'ai-assistant-widget';
    widget.innerHTML = `
      <!-- FLOATING 3D ORACLE AVATAR BUTTON -->
      <div id="ai-assistant-badge" style="
        position: fixed;
        bottom: 95px;
        right: 20px;
        width: 68px;
        height: 68px;
        background: linear-gradient(135deg, #78350f, #241710);
        border: 3px solid #fbbf24;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 10px 25px rgba(0,0,0,0.9), 0 0 20px rgba(251,191,36,0.6);
        z-index: 900;
        transition: transform 0.25s ease;
      " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
        <span style="font-size: 2.2rem; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.8));">🧙‍♂️</span>
        <span style="position: absolute; top: -3px; right: -3px; background: #22c55e; color: #fff; font-size: 0.6rem; font-weight: 900; padding: 2px 6px; border-radius: 8px; border: 1px solid #fff;">
          IA LIVE
        </span>
      </div>

      <!-- CHAT MODAL DIALOG -->
      <div id="ai-assistant-modal" style="
        display: none;
        position: fixed;
        bottom: 175px;
        right: 20px;
        width: 380px;
        max-width: calc(100vw - 40px);
        height: 520px;
        background: rgba(14, 30, 16, 0.96);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 3px solid #fbbf24;
        border-radius: 24px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.95);
        z-index: 950;
        flex-direction: column;
        overflow: hidden;
      ">
        <!-- MODAL HEADER -->
        <div style="background: linear-gradient(180deg, #241710, #140d08); border-bottom: 2px solid #fbbf24; padding: 0.75rem 1rem; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span style="font-size: 1.5rem;">🧙‍♂️</span>
            <div>
              <div style="font-size: 0.95rem; font-weight: 900; color: #fef08a;">Oráculo Turtura IA</div>
              <div style="font-size: 0.68rem; color: #4ade80; font-weight: 800;">Conectado a Gemini 2.5 Flash</div>
            </div>
          </div>
          <button id="btn-close-ai-chat" style="background: none; border: none; color: #fff; font-size: 1.4rem; font-weight: 900; cursor: pointer;">✕</button>
        </div>

        <!-- CHAT MESSAGES BODY -->
        <div id="ai-chat-messages" style="flex: 1; padding: 1rem; overflow-y: auto; display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="background: rgba(30, 60, 35, 0.9); border: 1px solid #4ade80; border-radius: 14px; padding: 0.75rem; color: #fff; font-size: 0.85rem; line-height: 1.4;">
            🧙‍♂️ <strong>Oráculo:</strong> ¡Saludos, Invocador! Soy el Oráculo Sabio de <strong>Turtura: La Torre del Poder</strong>. Conozco todas las reglas, criaturas, combinaciones de fusión y secretos de la Torre. ¿Qué deseas consultar?
          </div>
        </div>

        <!-- CHAT INPUT FOOTER -->
        <div style="background: rgba(10, 20, 12, 0.95); border-top: 2px solid #2e5a35; padding: 0.75rem; display: flex; gap: 0.5rem; align-items: center;">
          <input type="text" id="ai-chat-input" placeholder="Pregunta sobre reglas, cartas o estrategia..." style="flex: 1; background: rgba(0,0,0,0.8); border: 1.5px solid #fbbf24; border-radius: 12px; padding: 0.6rem 0.85rem; color: #fff; font-weight: 700; font-size: 0.82rem; outline: none;">
          <button id="btn-send-ai-chat" style="background: linear-gradient(180deg, #fbbf24, #d97706); border: 1.5px solid #fff; color: #1e1b4b; font-weight: 900; padding: 0.6rem 1rem; border-radius: 12px; cursor: pointer; font-size: 0.85rem;">
            Enviar
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(widget);
  }

  attachEvents() {
    const badge = document.getElementById('ai-assistant-badge');
    const modal = document.getElementById('ai-assistant-modal');
    const closeBtn = document.getElementById('btn-close-ai-chat');
    const sendBtn = document.getElementById('btn-send-ai-chat');
    const input = document.getElementById('ai-chat-input');

    if (badge && modal) {
      badge.addEventListener('click', () => {
        this.isOpen = !this.isOpen;
        modal.style.display = this.isOpen ? 'flex' : 'none';
        if (this.isOpen && input) input.focus();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.isOpen = false;
        modal.style.display = 'none';
      });
    }

    if (sendBtn && input) {
      sendBtn.addEventListener('click', () => this.handleSendMessage());
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleSendMessage();
      });
    }
  }

  async handleSendMessage() {
    const input = document.getElementById('ai-chat-input');
    const messagesContainer = document.getElementById('ai-chat-messages');
    if (!input || !messagesContainer) return;

    const userText = input.value.trim();
    if (!userText) return;

    // Render User Message
    const userMsgDiv = document.createElement('div');
    userMsgDiv.style.cssText = "background: rgba(120, 53, 15, 0.9); border: 1px solid #fbbf24; border-radius: 14px; padding: 0.75rem; color: #fff; font-size: 0.85rem; line-height: 1.4; align-self: flex-end; max-width: 85%;";
    userMsgDiv.innerHTML = `👤 <strong>Tú:</strong> ${userText}`;
    messagesContainer.appendChild(userMsgDiv);

    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Render Thinking Indicator
    const thinkingDiv = document.createElement('div');
    thinkingDiv.id = 'ai-thinking-indicator';
    thinkingDiv.style.cssText = "background: rgba(30, 60, 35, 0.9); border: 1px solid #4ade80; border-radius: 14px; padding: 0.75rem; color: #fbbf24; font-size: 0.85rem; line-height: 1.4; align-self: flex-start;";
    thinkingDiv.innerHTML = `🧙‍♂️ <strong>Oráculo:</strong> <em>Consultando las escrituras de la Torre de Babel...</em>`;
    messagesContainer.appendChild(thinkingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // System Rules Prompt for Gemini
    const systemInstruction = `
      Eres el Oráculo Sabio de Turtura: La Torre del Poder, un sabio anciano y estratega místico que guía a los jugadores del videojuego RPG "Turtura".
      Reglas del juego Turtura:
      1. El objetivo principal es coleccionar 100 criaturas elementales únicas y conquistar los 100 pisos de la Torre de Babel.
      2. Existen 4 Elementos Sagrados: Fuego 🔥 (vence a Planta), Agua 💧 (vence a Fuego), Planta 🌿 (vence a Tierra) y Tierra 🪨 (vence a Agua).
      3. Cámara de Fusión: Los jugadores pueden fusionar 2 tarjetas de cualquier criatura para sintetizar bestias de mayor nivel y rareza (Común, Raro, Épico, Legendario).
      4. Sistema de Combate: Escuadrones de 4 tarjetas por combate. Cada tarjeta tiene 2 turnos de ataque por ronda. El daño depende de las estadísticas de Ataque vs Defensa y la ventaja elemental.
      5. Responde siempre de forma sabia, entusiasta y útil en español, usando emojis temáticos RPG y frases épicas.
    `;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: `${systemInstruction}\n\nPregunta del Invocador: ${userText}` }] }
          ]
        })
      });

      const data = await response.json();
      thinkingDiv.remove();

      let replyText = "Disculpa, invocador. Mi visión ha sido nublada momentáneamente. Inténtalo de nuevo.";
      if (data && data.candidates && data.candidates[0] && data.candidates[0].content) {
        replyText = data.candidates[0].content.parts[0].text;
      }

      const botMsgDiv = document.createElement('div');
      botMsgDiv.style.cssText = "background: rgba(30, 60, 35, 0.9); border: 1px solid #4ade80; border-radius: 14px; padding: 0.75rem; color: #fff; font-size: 0.85rem; line-height: 1.4; align-self: flex-start;";
      botMsgDiv.innerHTML = `🧙‍♂️ <strong>Oráculo:</strong> ${replyText.replace(/\n/g, '<br>')}`;
      messagesContainer.appendChild(botMsgDiv);

      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } catch (err) {
      if (thinkingDiv) thinkingDiv.remove();
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = "background: rgba(100, 20, 20, 0.9); border: 1px solid #f43f5e; border-radius: 14px; padding: 0.75rem; color: #fff; font-size: 0.85rem;";
      errorDiv.innerHTML = `🧙‍♂️ <strong>Oráculo:</strong> Error al conectar con los espíritus de la red. Intenta de nuevo.`;
      messagesContainer.appendChild(errorDiv);
    }
  }
}

window.AIAssistant = AIAssistant;
