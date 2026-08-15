// Database of Creatures for Turtura
const CREATURES_DB = {
  // --- TIERRA ---
  "tierra_t1": {
    id: "tierra_t1",
    name: "Escarabajo Rinoceronte",
    category: "Tierra",
    tier: 1,
    icon: "🪲",
    atk: 12,
    def: 25,
    spd: 5,
    ability: "Caparazón: +5 DEF al recibir daño",
    rarity: "common",
    color: "#4caf50"
  },
  "tierra_t2": {
    id: "tierra_t2",
    name: "Tigre de Bengala",
    category: "Tierra",
    tier: 2,
    icon: "🐅",
    atk: 35,
    def: 20,
    spd: 15,
    ability: "Garrazo: 10% probabilidad de crítico x2",
    rarity: "rare",
    color: "#8bc34a"
  },
  "tierra_t3": {
    id: "tierra_t3",
    name: "Elefante Antiguo",
    category: "Tierra",
    tier: 3,
    icon: "🐘",
    atk: 55,
    def: 60,
    spd: 8,
    ability: "Pisotón: Aturde al enemigo por 1 turno",
    rarity: "epic",
    color: "#2e7d32"
  },
  "tierra_t4": {
    id: "tierra_t4",
    name: "Behemoth de Roca",
    category: "Tierra",
    tier: 4,
    icon: "🦣",
    atk: 95,
    def: 110,
    spd: 12,
    ability: "Escudo Telúrico: Absorbe 30% del daño entrante",
    rarity: "legendary",
    color: "#1b5e20"
  },

  // --- AIRE ---
  "aire_t1": {
    id: "aire_t1",
    name: "Gorrión Silvestre",
    category: "Aire",
    tier: 1,
    icon: "🐦",
    atk: 15,
    def: 8,
    spd: 25,
    ability: "Esquiva: +15% probabilidad de evasión",
    rarity: "common",
    color: "#03a9f4"
  },
  "aire_t2": {
    id: "aire_t2",
    name: "Halcón Peregrino",
    category: "Aire",
    tier: 2,
    icon: "🦅",
    atk: 40,
    def: 12,
    spd: 35,
    ability: "Picado Veloz: Asesta 2 golpes en el primer turno",
    rarity: "rare",
    color: "#29b6f6"
  },
  "aire_t3": {
    id: "aire_t3",
    name: "Águila de Harpía",
    category: "Aire",
    tier: 3,
    icon: "🦤",
    atk: 65,
    def: 25,
    spd: 40,
    ability: "Ráfaga de Viento: Reduce la velocidad del enemigo un 25%",
    rarity: "epic",
    color: "#0288d1"
  },
  "aire_t4": {
    id: "aire_t4",
    name: "Roc Caelum",
    category: "Aire",
    tier: 4,
    icon: "🕊️",
    atk: 115,
    def: 45,
    spd: 55,
    ability: "Tormenta Aérea: Inflige daño continuo por ráfagas",
    rarity: "legendary",
    color: "#01579b"
  },

  // --- AGUA ---
  "agua_t1": {
    id: "agua_t1",
    name: "Pez Globo",
    category: "Agua",
    tier: 1,
    icon: "🐡",
    atk: 10,
    def: 18,
    spd: 10,
    ability: "Espinas Venenosas: Daña al atacante al recibir contacto",
    rarity: "common",
    color: "#00bcd4"
  },
  "agua_t2": {
    id: "agua_t2",
    name: "Tiburón Martillo",
    category: "Agua",
    tier: 2,
    icon: "🦈",
    atk: 38,
    def: 22,
    spd: 20,
    ability: "Sangrado: Inflige 5 de daño adicional por turno",
    rarity: "rare",
    color: "#00acc1"
  },
  "agua_t3": {
    id: "agua_t3",
    name: "Calamar Gigante",
    category: "Agua",
    tier: 3,
    icon: "🦑",
    atk: 60,
    def: 35,
    spd: 22,
    ability: "Tinta Cegadora: Reduce la precisión enemiga un 30%",
    rarity: "epic",
    color: "#00838f"
  },
  "agua_t4": {
    id: "agua_t4",
    name: "Leviatán de las Profundidades",
    category: "Agua",
    tier: 4,
    icon: "🐋",
    atk: 90,
    def: 85,
    spd: 28,
    ability: "Marea Curativa: Regenera 20% de HP cada turno",
    rarity: "legendary",
    color: "#006064"
  },

  // --- MICROBIOS ---
  "microbios_t1": {
    id: "microbios_t1",
    name: "Ameba Mutante",
    category: "Microbios",
    tier: 1,
    icon: "🦠",
    atk: 8,
    def: 5,
    spd: 18,
    ability: "División Celular: Se regenera 3 HP al atacar",
    rarity: "common",
    color: "#e91e63"
  },
  "microbios_t2": {
    id: "microbios_t2",
    name: "Bacteria de Esporas",
    category: "Microbios",
    tier: 2,
    icon: "🧫",
    atk: 25,
    def: 10,
    spd: 22,
    ability: "Infección: Reduce la defensa enemiga un 20%",
    rarity: "rare",
    color: "#d81b60"
  },
  "microbios_t3": {
    id: "microbios_t3",
    name: "Virión Quimérico",
    category: "Microbios",
    tier: 3,
    icon: "🧪",
    atk: 50,
    def: 15,
    spd: 30,
    ability: "Parálisis Viral: Ocasionalmente paraliza al enemigo",
    rarity: "epic",
    color: "#c2185b"
  },
  "microbios_t4": {
    id: "microbios_t4",
    name: "Parásito Titánico",
    category: "Microbios",
    tier: 4,
    icon: "🧬",
    atk: 85,
    def: 40,
    spd: 38,
    ability: "Drenaje Genético: Absorbe el 15% del ataque del rival",
    rarity: "legendary",
    color: "#880e4f"
  },

  // --- HÍBRIDOS CROSS-CATEGORY ---
  "hibrido_anfibio": {
    id: "hibrido_anfibio",
    name: "Quimera Anfibio",
    category: "Híbrido (Tierra + Agua)",
    tier: 3,
    icon: "🐊",
    atk: 58,
    def: 50,
    spd: 18,
    ability: "Piel Acuática: Inmune a veneno y +15 DEF",
    rarity: "epic",
    color: "#009688"
  },
  "hibrido_bioaereo": {
    id: "hibrido_bioaereo",
    name: "Espora Voladora",
    category: "Híbrido (Aire + Microbios)",
    tier: 3,
    icon: "🦇",
    atk: 52,
    def: 20,
    spd: 45,
    ability: "Infección Aérea: Esparce toxinas a alta velocidad",
    rarity: "epic",
    color: "#9c27b0"
  },
  "hibrido_abisal": {
    id: "hibrido_abisal",
    name: "Toxina Abisal",
    category: "Híbrido (Agua + Microbios)",
    tier: 3,
    icon: "🪼",
    atk: 48,
    def: 30,
    spd: 25,
    ability: "Neurotoxina Acuática: Aturde y envenena",
    rarity: "epic",
    color: "#673ab7"
  }
};

window.CREATURES_DB = CREATURES_DB;
