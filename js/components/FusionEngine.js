// FusionEngine component for Turtura
class FusionEngine {
  constructor() {
    this.activeFusions = new Map();
  }

  // Check if two cards can be fused
  canFuse(cardA, cardB) {
    if (!cardA || !cardB) return { allowed: false, reason: "Selecciona 2 criaturas." };
    if (cardA.instanceId === cardB.instanceId) return { allowed: false, reason: "No puedes fusionar la misma carta consigo misma." };
    return window.GAME_RULES.getFusionResult(cardA, cardB);
  }

  // Synthesize a unique Tier 5 AI Creature
  generateAiUniqueCreature(cardA, cardB) {
    const prefixes = ["Omni", "Astral", "Zephyr", "Abyssal", "Hyperion", "Titan", "Vortex", "Cyber"];
    const suffixes = ["Rex", "Prime", "Genesis", "Apex", "Nexus", "Omega", "Phantom", "Elysium"];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const name = `${prefix} ${cardA.name.split(' ')[0]}-${suffix}`;

    const icons = ["✨🦖", "🐉✨", "🌌🦅", "⚡🐋", "🔮🦠", "🔥🐅"];
    const icon = icons[Math.floor(Math.random() * icons.length)];

    const seed = Math.floor(Math.random() * 1000000);

    return {
      instanceId: "card_ai_" + Math.random().toString(36).substr(2, 9),
      id: "unique_ai_" + seed,
      name: name,
      category: `Única IA (${cardA.category}+${cardB.category})`,
      tier: 5,
      icon: icon,
      atk: Math.floor(150 + Math.random() * 80),
      def: Math.floor(140 + Math.random() * 70),
      spd: Math.floor(60 + Math.random() * 40),
      ability: `Singularidad IA #${seed.toString(16).toUpperCase()}: Refleja el 40% del daño y duplica su velocidad`,
      rarity: "ai_unique",
      color: "#ec4899",
      isAiUnique: true,
      ownerSignature: "Firma Digital Registrada #" + seed
    };
  }

  // Execute fusion with timer
  startFusion(cardA, cardB, onComplete, onProgress) {
    const check = this.canFuse(cardA, cardB);
    if (!check.allowed) return check;

    const timerDuration = check.timerSeconds;
    const fusionId = "fusion_" + Math.random().toString(36).substr(2, 9);
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed++;
      const progressPct = Math.min(100, Math.floor((elapsed / timerDuration) * 100));
      const remainingSecs = Math.max(0, timerDuration - elapsed);

      if (onProgress) onProgress(fusionId, progressPct, remainingSecs);

      if (elapsed >= timerDuration) {
        clearInterval(interval);
        this.activeFusions.delete(fusionId);

        let resultCard;
        if (check.isAiUnique) {
          resultCard = this.generateAiUniqueCreature(cardA, cardB);
        } else {
          const base = window.CREATURES_DB[check.targetCreatureId];
          resultCard = {
            instanceId: "card_" + Math.random().toString(36).substr(2, 9),
            ...base
          };
        }

        if (onComplete) onComplete(resultCard);
      }
    }, 1000);

    this.activeFusions.set(fusionId, interval);
    return { allowed: true, fusionId, timerDuration };
  }
}

window.FusionEngine = FusionEngine;
