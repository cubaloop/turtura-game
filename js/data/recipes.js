// Fusion Rules, Recipe Upgrade Logic, and RNG for Turtura
const GAME_RULES = {
  FUSION_TIMERS: {
    2: 15,    // Tier 1 -> Tier 2: 15 seconds
    3: 60,    // Tier 2 -> Tier 3: 60 seconds (1 minute)
    4: 300,   // Tier 3 -> Tier 4: 5 minutes
    5: 900    // Tier 4 -> Tier 5 (AI Unique): 15 minutes
  },

  // Check fusion compatibility and return target EVOLVED creature
  getFusionResult: function(cardA, cardB) {
    if (!cardA || !cardB) return { allowed: false, reason: "Selecciona 2 criaturas." };
    if (cardA.instanceId === cardB.instanceId) return { allowed: false, reason: "No puedes fusionar la misma carta consigo misma." };

    if (cardA.tier !== cardB.tier) {
      return { allowed: false, reason: `No se pueden fusionar Tiers distintos (Tier ${cardA.tier} vs Tier ${cardB.tier}).` };
    }

    // Tier 4 + Tier 4 = AI Genesis Tier 5 Unique Creature!
    if (cardA.tier === 4 && cardB.tier === 4) {
      return {
        allowed: true,
        isAiUnique: true,
        targetTier: 5,
        timerSeconds: this.FUSION_TIMERS[5]
      };
    }

    // Determine target tier
    const nextTier = cardA.tier + 1;
    const sameCategory = cardA.category === cardB.category;

    // Find all target creatures in the database matching the target tier
    const dbKeys = Object.keys(window.CREATURES_DB);
    let candidateKeys;

    if (sameCategory) {
      candidateKeys = dbKeys.filter(k => {
        const c = window.CREATURES_DB[k];
        return c.category === cardA.category && c.tier === nextTier && c.id !== cardA.id && c.id !== cardB.id;
      });
    } else {
      // Cross category fusion creates a hybrid or next tier creature
      candidateKeys = dbKeys.filter(k => {
        const c = window.CREATURES_DB[k];
        return c.tier === nextTier && c.id !== cardA.id && c.id !== cardB.id;
      });
    }

    if (!candidateKeys || candidateKeys.length === 0) {
      // Fallback to any creature of next tier
      candidateKeys = dbKeys.filter(k => window.CREATURES_DB[k].tier === nextTier);
    }

    // Select a distinct evolved creature so it NEVER repeats the input cards!
    const selectedKey = candidateKeys[Math.floor(Math.random() * candidateKeys.length)];

    return {
      allowed: true,
      isAiUnique: false,
      targetTier: nextTier,
      targetCreatureId: selectedKey,
      timerSeconds: this.FUSION_TIMERS[nextTier] || 15
    };
  },

  // Initial 4 random cards generator algorithm (4 distinct Tier 1 cards)
  getRandomInitialCards: function() {
    const tier1Keys = Object.keys(window.CREATURES_DB).filter(k => window.CREATURES_DB[k].tier === 1);
    const initialHand = [];
    const usedKeys = new Set();

    while (initialHand.length < 4 && tier1Keys.length > 0) {
      const randomIndex = Math.floor(Math.random() * tier1Keys.length);
      const key = tier1Keys[randomIndex];
      if (!usedKeys.has(key)) {
        usedKeys.add(key);
        const baseCreature = window.CREATURES_DB[key];
        initialHand.push({
          instanceId: "card_" + Math.random().toString(36).substr(2, 9),
          ...baseCreature
        });
      }
    }
    return initialHand;
  }
};

window.GAME_RULES = GAME_RULES;
