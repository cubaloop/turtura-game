// Fully Safe Creature Database for Turtura with Exact Matching Artworks
const CREATURES_DB = {
  // --- TIERRA ---
  "tierra_t1_1": { id: "tierra_t1_1", name: "Escarabajo Rinoceronte", category: "Tierra", tier: 1, icon: "🪲", image: "assets/rhino_beetle.jpg", atk: 12, def: 25, spd: 5, ability: "Caparazón: +5 DEF", rarity: "common" },
  "tierra_t1_2": { id: "tierra_t1_2", name: "Hormiga Guerrera", category: "Tierra", tier: 1, icon: "🐜", image: "assets/rhino_beetle.jpg", atk: 15, def: 18, spd: 8, ability: "Fuerza Colosal: +3 ATK", rarity: "common" },

  "tierra_t2_1": { id: "tierra_t2_1", name: "Tigre de Bengala", category: "Tierra", tier: 2, icon: "🐅", image: "assets/bengal_tiger.jpg", atk: 35, def: 20, spd: 15, ability: "Garrazo: 15% Crítico x2", rarity: "rare" },
  "tierra_t2_2": { id: "tierra_t2_2", name: "Oso Parduzco", category: "Tierra", tier: 2, icon: "🐻", image: "assets/bengal_tiger.jpg", atk: 38, def: 25, spd: 10, ability: "Zarpazo Demoledor: Aturde", rarity: "rare" },

  "tierra_t3_1": { id: "tierra_t3_1", name: "Elefante Antiguo", category: "Tierra", tier: 3, icon: "🐘", image: "assets/rhino_beetle.jpg", atk: 58, def: 65, spd: 8, ability: "Pisotón Telúrico: Daño área", rarity: "epic" },
  "tierra_t4_1": { id: "tierra_t4_1", name: "Behemoth de Roca", category: "Tierra", tier: 4, icon: "🪨", image: "assets/bengal_tiger.jpg", atk: 98, def: 115, spd: 12, ability: "Escudo Telúrico: Absorbe 40%", rarity: "legendary" },

  // --- AIRE ---
  "aire_t1_1": { id: "aire_t1_1", name: "Gorrión Silvestre", category: "Aire", tier: 1, icon: "🐦", image: "assets/harpy_eagle.jpg", atk: 15, def: 8, spd: 25, ability: "Esquiva: +15% evasión", rarity: "common" },
  "aire_t2_1": { id: "aire_t2_1", name: "Halcón Peregrino", category: "Aire", tier: 2, icon: "🦅", image: "assets/harpy_eagle.jpg", atk: 42, def: 12, spd: 38, ability: "Picado Veloz: 2 golpes", rarity: "rare" },
  "aire_t3_1": { id: "aire_t3_1", name: "Águila de Harpía", category: "Aire", tier: 3, icon: "🦤", image: "assets/harpy_eagle.jpg", atk: 68, def: 25, spd: 42, ability: "Ráfaga: SPD enemiga -25%", rarity: "epic" },
  "aire_t4_1": { id: "aire_t4_1", name: "Roc Caelum", category: "Aire", tier: 4, icon: "🕊️", image: "assets/harpy_eagle.jpg", atk: 118, def: 48, spd: 58, ability: "Tormenta Aérea: Daño masivo", rarity: "legendary" },

  // --- AGUA ---
  "agua_t1_1": { id: "agua_t1_1", name: "Pez Globo Espinoso", category: "Agua", tier: 1, icon: "🐡", image: "assets/kraken.jpg", atk: 10, def: 18, spd: 10, ability: "Espinas: Daña atacante", rarity: "common" },
  "agua_t2_1": { id: "agua_t2_1", name: "Tiburón Martillo", category: "Agua", tier: 2, icon: "🦈", image: "assets/hammerhead_shark.jpg", atk: 40, def: 22, spd: 22, ability: "Sangrado: +6 daño/turno", rarity: "rare" },
  "agua_t2_2": { id: "agua_t2_2", name: "Pulpo Cambiante", category: "Agua", tier: 2, icon: "🐙", image: "assets/octopus.jpg", atk: 36, def: 20, spd: 20, ability: "Tinta Cegadora: Precisión -20%", rarity: "rare" },
  "agua_t3_1": { id: "agua_t3_1", name: "Calamar Gigante", category: "Agua", tier: 3, icon: "🦑", image: "assets/octopus.jpg", atk: 64, def: 36, spd: 24, ability: "Tinta Cegadora: Precisión -20%", rarity: "epic" },
  "agua_t4_1": { id: "agua_t4_1", name: "Kraken Abisal", category: "Agua", tier: 4, icon: "🐙", image: "assets/kraken.jpg", atk: 105, def: 88, spd: 32, ability: "Tsunami: Destruye escudos", rarity: "legendary" },

  // --- MICROBIOS ---
  "microbios_t1_1": { id: "microbios_t1_1", name: "Ameba Mutante", category: "Microbios", tier: 1, icon: "🦠", image: "assets/microbe_spore.jpg", atk: 8, def: 5, spd: 18, ability: "División: Cura 3 HP", rarity: "common" },
  "microbios_t1_2": { id: "microbios_t1_2", name: "Paramecio Veloz", category: "Microbios", tier: 1, icon: "🧫", image: "assets/microbe_spore.jpg", atk: 9, def: 6, spd: 22, ability: "Propulsión: +4 SPD", rarity: "common" },
  "microbios_t1_3": { id: "microbios_t1_3", name: "Estafilococo Espinoso", category: "Microbios", tier: 1, icon: "🧪", image: "assets/microbe_spore.jpg", atk: 11, def: 7, spd: 16, ability: "Toxina: Infección leve", rarity: "common" },
  "microbios_t2_1": { id: "microbios_t2_1", name: "Bacteria de Esporas", category: "Microbios", tier: 2, icon: "🧫", image: "assets/microbe_spore.jpg", atk: 26, def: 10, spd: 24, ability: "Infección: DEF -20%", rarity: "rare" },
  "microbios_t3_1": { id: "microbios_t3_1", name: "Virión Quimérico", category: "Microbios", tier: 3, icon: "🧪", image: "assets/microbe_spore.jpg", atk: 52, def: 16, spd: 32, ability: "Parálisis Viral: Salta turno", rarity: "epic" },
  "microbios_t4_1": { id: "microbios_t4_1", name: "Parásito Titánico", category: "Microbios", tier: 4, icon: "🧬", image: "assets/microbe_spore.jpg", atk: 88, def: 42, spd: 40, ability: "Drenaje: Roba 20% ATK", rarity: "legendary" }
};

window.CREATURES_DB = CREATURES_DB;
