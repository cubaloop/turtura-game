// Fusion Rules, Timers, Compatibility Matrix, and RNG Rates for Turtura
const GAME_RULES = {
  // Fusion timers by target tier (in seconds)
  FUSION_TIMERS: {
    2: 15,    // Tier 1 -> Tier 2: 15 seconds
    3: 60,    // Tier 2 -> Tier 3: 60 seconds (1 minute)
    4: 300,   // Tier 3 -> Tier 4: 300 seconds (5 minutes)
    5: 900    // Tier 4 -> Tier 5 (Unique AI): 900 seconds (15 minutes)
  },

  // Compatibility matrix between categories
  COMPATIBILITY_MATRIX: {
    "Tierra+Tierra": { allowed: true, resultType: "same_category", resultId: "tierra_t2" },
    "Aire+Aire": { allowed: true, resultType: "same_category", resultId: "aire_t2" },
    "Agua+Agua": { allowed: true, resultType: "same_category", resultId: "agua_t2" },
    "Microbios+Microbios": { allowed: true, resultType: "same_category", resultId: "microbios_t2" },
    
    // Cross-category hybrids
    "Tierra+Agua": { allowed: true, resultType: "hybrid", resultId: "hibrido_anfibio" },
    "Agua+Tierra": { allowed: true, resultType: "hybrid", resultId: "hibrido_anfibio" },
    "Aire+Microbios": { allowed: true, resultType: "hybrid", resultId: "hibrido_bioaereo" },
    "Microbios+Aire": { allowed: true, resultType: "hybrid", resultId: "hibrido_bioaereo" },
    "Agua+Microbios": { allowed: true, resultType: "hybrid", resultId: "hibrido_abisal" },
    "Microbios+Agua": { allowed: true, resultType: "hybrid", resultId: "hibrido_abisal" },

    // Incompatible pairs (returns false)
    "Tierra+Aire": { allowed: false, reason: "Incompatible: Tierra y Aire repelen sus energías elementalmente." },
    "Aire+Tierra": { allowed: false, reason: "Incompatible: Tierra y Aire repelen sus energías elementalmente." }
  },

  // Helper to check fusion result
  getFusionResult: function(cardA, cardB) {
    if (cardA.tier !== cardB.tier) {
      return { allowed: false, reason: "Solo se pueden fusionar criaturas del mismo Tier/Nivel." };
    }

    const key = `${cardA.category}+${cardB.category}`;
    const rule = this.COMPATIBILITY_MATRIX[key];

    if (!rule || !rule.allowed) {
      return { allowed: false, reason: rule ? rule.reason : "Combinación inestable de elementos." };
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

    // Tier upgrade in same category
    const nextTier = cardA.tier + 1;
    let targetId = rule.resultId;

    if (rule.resultType === "same_category") {
      const catLower = cardA.category.toLowerCase();
      targetId = `${catLower}_t${nextTier}`;
    }

    return {
      allowed: true,
      isAiUnique: false,
      targetTier: nextTier,
      targetCreatureId: targetId,
      timerSeconds: this.FUSION_TIMERS[nextTier] || 15
    };
  },

  // Initial 4 random cards generator algorithm
  getRandomInitialCards: function() {
    const tier1Keys = ["tierra_t1", "aire_t1", "agua_t1", "microbios_t1"];
    const initialHand = [];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * tier1Keys.length);
      const creatureId = tier1Keys[randomIndex];
      const baseCreature = window.CREATURES_DB[creatureId];
      initialHand.push({
        instanceId: "card_" + Math.random().toString(36).substr(2, 9),
        ...baseCreature
      });
    }
    return initialHand;
  }
};

window.GAME_RULES = GAME_RULES;
