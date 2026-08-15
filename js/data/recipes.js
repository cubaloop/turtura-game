// Safeguarded Recipe Logic for Turtura
const GAME_RULES = {
  FUSION_TIMERS: {
    2: 15,
    3: 60,
    4: 300,
    5: 900
  },

  getFusionResult: function(cardA, cardB) {
    if (!cardA || !cardB) return { allowed: false, reason: "Selecciona 2 criaturas." };
    if (cardA.instanceId === cardB.instanceId) return { allowed: false, reason: "No puedes fusionar la misma carta." };

    if (cardA.tier !== cardB.tier) {
      return { allowed: false, reason: `No se pueden fusionar Tiers distintos (Tier ${cardA.tier} vs Tier ${cardB.tier}).` };
    }

    if (cardA.tier === 4 && cardB.tier === 4) {
      return {
        allowed: true,
        isAiUnique: true,
        targetTier: 5,
        timerSeconds: this.FUSION_TIMERS[5]
      };
    }

    const nextTier = cardA.tier + 1;
    const dbKeys = Object.keys(window.CREATURES_DB);
    let candidateKeys = dbKeys.filter(k => {
      const c = window.CREATURES_DB[k];
      return c && c.tier === nextTier && c.id !== cardA.id && c.id !== cardB.id;
    });

    if (!candidateKeys || candidateKeys.length === 0) {
      candidateKeys = dbKeys.filter(k => window.CREATURES_DB[k] && window.CREATURES_DB[k].tier === nextTier);
    }

    if (!candidateKeys || candidateKeys.length === 0) {
      candidateKeys = ["tierra_t2_1"];
    }

    const selectedKey = candidateKeys[Math.floor(Math.random() * candidateKeys.length)];

    return {
      allowed: true,
      isAiUnique: false,
      targetTier: nextTier,
      targetCreatureId: selectedKey,
      timerSeconds: this.FUSION_TIMERS[nextTier] || 15
    };
  },

  getRandomInitialCards: function() {
    const dbKeys = Object.keys(window.CREATURES_DB);
    const tier1Keys = dbKeys.filter(k => window.CREATURES_DB[k] && window.CREATURES_DB[k].tier === 1);
    const initialHand = [];

    for (let i = 0; i < 4; i++) {
      const key = tier1Keys[i % tier1Keys.length];
      const base = window.CREATURES_DB[key] || window.CREATURES_DB["tierra_t1_1"];
      initialHand.push({
        instanceId: "card_" + Math.random().toString(36).substr(2, 9),
        id: base.id || "tierra_t1_1",
        name: base.name || "Escarabajo Rinoceronte",
        category: base.category || "Tierra",
        tier: base.tier || 1,
        icon: base.icon || "🪲",
        image: base.image || "assets/rhino_beetle.jpg",
        atk: base.atk || 12,
        def: base.def || 25,
        spd: base.spd || 5,
        ability: base.ability || "Caparazón: +5 DEF",
        rarity: base.rarity || "common",
        frameStyle: base.frameStyle || "frame-common"
      });
    }
    return initialHand;
  }
};

window.GAME_RULES = GAME_RULES;
