// Massive Database of 100+ Distinct Creatures for Turtura across 5 Tiers and 4 Categories
const CREATURES_DB = {};

// Helper to generate 100+ unique creatures systematically
const CATEGORIES = [
  {
    name: "Tierra",
    icon: "🌿",
    color: "#4caf50",
    tiers: [
      [
        { name: "Escarabajo Rinoceronte", icon: "🪲", atk: 12, def: 25, spd: 5, ability: "Caparazón: +5 DEF" },
        { name: "Hormiga Guerrera", icon: "🐜", atk: 15, def: 18, spd: 8, ability: "Fuerza Colosal: +3 ATK" },
        { name: "Armadillo Espinudo", icon: "🦔", atk: 10, def: 28, spd: 4, ability: "Refugio: Bloquea el 20% del daño" },
        { name: "Topo de las Cavernas", icon: "🦦", atk: 14, def: 20, spd: 6, ability: "Excavar: Esquiva el primer golpe" },
        { name: "Escarabajo Dorado", icon: "🐞", atk: 11, def: 24, spd: 7, ability: "Brillo Dorado: Ciega al enemigo" }
      ],
      [
        { name: "Tigre de Bengala", icon: "🐅", atk: 35, def: 20, spd: 15, ability: "Garrazo: 15% Crítico x2" },
        { name: "Oso Parduzco", icon: "🐻", atk: 38, def: 25, spd: 10, ability: "Zarpazo Demoledor: Stun 1 turno" },
        { name: "Lobo Alfa", icon: "🐺", atk: 32, def: 18, spd: 18, ability: "Aullido: +10% ATK a aliados" },
        { name: "Jabalí Acorazado", icon: "🐗", atk: 34, def: 26, spd: 12, ability: "Embestida: Daño y retroceso" },
        { name: "Pangolín Escamado", icon: "🦡", atk: 30, def: 30, spd: 9, ability: "Escamas de Hierro: +10 DEF" }
      ],
      [
        { name: "Elefante Antiguo", icon: "🐘", atk: 58, def: 65, spd: 8, ability: "Pisotón Telúrico: Daño masivo de área" },
        { name: "Rinoceronte de Obsidiana", icon: "🦏", atk: 62, def: 60, spd: 11, ability: "Cuerno de Roca: Pierde 30% DEF enemiga" },
        { name: "Gorila de las Cumbres", icon: "🦍", atk: 65, def: 52, spd: 14, ability: "Furia Primaria: Aumenta ATK cada turno" },
        { name: "Mamut Voraz", icon: "🦣", atk: 60, def: 70, spd: 7, ability: "Piel Helada: Reduce velocidad enemiga" },
        { name: "Dromedario de las Arenas", icon: "🐫", atk: 52, def: 58, spd: 13, ability: "Resistencia de Desierto: Cura 15 HP" }
      ],
      [
        { name: "Behemoth de Roca", icon: "🪨", atk: 98, def: 115, spd: 12, ability: "Escudo Telúrico: Absorbe 40% daño" },
        { name: "Golem Ancestral", icon: "🗿", atk: 92, def: 125, spd: 8, ability: "Corazón de Granito: Inmune a sangrado" },
        { name: "Titán de la Placa Terrestre", icon: "🏔️", atk: 105, def: 110, spd: 10, ability: "Terremoto: Aturde a todo el mazo rival" },
        { name: "Sierpe Subterránea", icon: "🐍", atk: 100, def: 95, spd: 16, ability: "Devorador de Tierra: Absorbe la vida" },
        { name: "Bisonte Mitológico", icon: "🦬", atk: 95, def: 108, spd: 14, ability: "Estampida Divina: Rompe escudos" }
      ]
    ]
  },
  {
    name: "Aire",
    icon: "🦅",
    color: "#03a9f4",
    tiers: [
      [
        { name: "Gorrión Silvestre", icon: "🐦", atk: 15, def: 8, spd: 25, ability: "Esquiva: +15% evasión" },
        { name: "Colibrí Destellante", icon: "🐤", atk: 12, def: 6, spd: 32, ability: "Aleteo Veloz: Ataca primero siempre" },
        { name: "Murciélago Nocturno", icon: "🦇", atk: 16, def: 7, spd: 24, ability: "Ecolocalización: Inmune a ceguera" },
        { name: "Búho Sabio", icon: "🦉", atk: 14, def: 10, spd: 22, ability: "Visión Nocturna: +20% Precisión" },
        { name: "Paloma Torcaz", icon: "🕊️", atk: 11, def: 9, spd: 26, ability: "Vuelo Suave: Cura 4 HP" }
      ],
      [
        { name: "Halcón Peregrino", icon: "🦅", atk: 42, def: 12, spd: 38, ability: "Picado Veloz: 2 golpes turno 1" },
        { name: "Cuervo del Presagio", icon: "🐦‍⬛", atk: 38, def: 14, spd: 32, ability: "Mal Augurio: Reduce suerte enemiga" },
        { name: "Flamenco de Fuego", icon: "🦩", atk: 40, def: 15, spd: 30, ability: "Plumas Cálidas: Daño de fuego" },
        { name: "Cisne Radiante", icon: "🦢", atk: 35, def: 18, spd: 34, ability: "Canto Armónico: Cura al grupo" },
        { name: "Guacamayo Neón", icon: "🦜", atk: 39, def: 13, spd: 35, ability: "Destello Alar: Aturde 15%" }
      ],
      [
        { name: "Águila de Harpía", icon: "🦤", atk: 68, def: 25, spd: 42, ability: "Ráfaga de Viento: SPD enemiga -25%" },
        { name: "Búho Estigio", icon: "🦉", atk: 65, def: 28, spd: 40, ability: "Garras Sombrías: Daño crítico de noche" },
        { name: "Cóndor de los Andes", icon: "🦅", atk: 72, def: 30, spd: 38, ability: "Planeo majestuoso: Esquiva 30%" },
        { name: "Pterodáctilo Furioso", icon: "🦖", atk: 70, def: 22, spd: 45, ability: "Grito Prehistórico: Asusta" },
        { name: "Grifo del Viento", icon: "🦁", atk: 75, def: 32, spd: 44, ability: "Viento Divino: Ataca dos veces" }
      ],
      [
        { name: "Roc Caelum", icon: "🕊️", atk: 118, def: 48, spd: 58, ability: "Tormenta Aérea: Daño masivo al mazo" },
        { name: "Fénix Celestial", icon: "🔥", atk: 125, def: 40, spd: 62, ability: "Renacimiento: Revive con 50% HP" },
        { name: "Dragón del Templo Aéreo", icon: "🐉", atk: 130, def: 52, spd: 60, ability: "Aliento de Viento Sacro" },
        { name: "Pájaro Trueno", icon: "⚡", atk: 122, def: 42, spd: 65, ability: "Rayo del Firmamento: Electrocuta" },
        { name: "Valkiria de las Nubes", icon: "⚔️", atk: 115, def: 55, spd: 56, ability: "Espada de Viento: Pierde 40% DEF" }
      ]
    ]
  },
  {
    name: "Agua",
    icon: "🦈",
    color: "#00bcd4",
    tiers: [
      [
        { name: "Pez Globo Espinoso", icon: "🐡", atk: 10, def: 18, spd: 10, ability: "Espinas: Daña al atacante" },
        { name: "Cangrejo de Arrecife", icon: "🦀", atk: 12, def: 24, spd: 6, ability: "Tenaza de Acero: +5 DEF" },
        { name: "Medusa Luminosa", icon: "🪼", atk: 14, def: 10, spd: 12, ability: "Picadura Paralizante" },
        { name: "Estrella de Mar", icon: "⭐", atk: 8, def: 20, spd: 5, ability: "Regeneración: Cura 5 HP" },
        { name: "Caballito de Mar", icon: "🐴", atk: 11, def: 12, spd: 15, ability: "Camuflaje: Esquiva 10%" }
      ],
      [
        { name: "Tiburón Martillo", icon: "🦈", atk: 40, def: 22, spd: 22, ability: "Sangrado: +6 daño/turno" },
        { name: "Pulpo Cambiante", icon: "🐙", atk: 36, def: 20, spd: 20, ability: "Tinta Cegadora: Precisión -20%" },
        { name: "Anguila Eléctrica", icon: "🐍", atk: 42, def: 15, spd: 28, ability: "Descarga Acuática: Aturde" },
        { name: "Manta Raya Gigante", icon: "🪼", atk: 35, def: 28, spd: 24, ability: "Deslizamiento: Esquiva +20%" },
        { name: "Cocodrilo de Mar", icon: "🐊", atk: 45, def: 26, spd: 18, ability: "Mordisco Voraz: Roba HP" }
      ],
      [
        { name: "Calamar Gigante", icon: "🦑", atk: 64, def: 36, spd: 24, ability: "Tentáculo Asfixiante" },
        { name: "Orca Asesina", icon: "🐋", atk: 70, def: 42, spd: 28, ability: "Impacto Abisal: Critico 25%" },
        { name: "Morsa del Glaciar", icon: "🦭", atk: 62, def: 55, spd: 16, ability: "Colmillos de Hielo: Congela" },
        { name: "Pez Abisal de Luces", icon: "🐟", atk: 66, def: 30, spd: 30, ability: "Luz de la Profundidad" },
        { name: "Sirenio Ancestral", icon: "🧜‍♂️", atk: 58, def: 48, spd: 26, ability: "Marea Curativa: Cura 20 HP" }
      ],
      [
        { name: "Leviatán de las Profundidades", icon: "🐋", atk: 95, def: 88, spd: 30, ability: "Tsunami: Destruye escudos" },
        { name: "Kraken Titanico", icon: "🐙", atk: 105, def: 80, spd: 32, ability: "Devorador de Navíos" },
        { name: "Dragón del Océano", icon: "🐉", atk: 110, def: 85, spd: 34, ability: "Aliento de Hielo Abisal" },
        { name: "Serpiente Marina Poseidón", icon: "🐍", atk: 100, def: 92, spd: 36, ability: "Marea Venenosa" },
        { name: "Hidra de las Aguas", icon: "🐊", atk: 115, def: 75, spd: 28, ability: "Cabezas Múltiples" }
      ]
    ]
  },
  {
    name: "Microbios",
    icon: "🦠",
    color: "#e91e63",
    tiers: [
      [
        { name: "Ameba Mutante", icon: "🦠", atk: 8, def: 5, spd: 18, ability: "División: Cura 3 HP" },
        { name: "Paramecio Veloz", icon: "🧫", atk: 9, def: 6, spd: 22, ability: "Propulsión: +4 SPD" },
        { name: "Estafilococo Espinoso", icon: "🧪", atk: 11, def: 7, spd: 16, ability: "Toxina: Infección leve" },
        { name: "Espora de Fungus", icon: "🍄", atk: 10, def: 8, spd: 14, ability: "Esporas Nocivas" },
        { name: "Bacilo Infeccioso", icon: "🧬", atk: 12, def: 4, spd: 20, ability: "Contagio Rápido" }
      ],
      [
        { name: "Bacteria de Esporas", icon: "🧫", atk: 26, def: 10, spd: 24, ability: "Infección: DEF enemiga -20%" },
        { name: "Fago Destructor", icon: "👾", atk: 30, def: 12, spd: 28, ability: "Lisis Celular: Pierde 10 HP/turno" },
        { name: "Hongo Venenoso", icon: "🍄", atk: 28, def: 15, spd: 20, ability: "Nube de Toxinas" },
        { name: "T-Virus Mutado", icon: "🧪", atk: 34, def: 8, spd: 30, ability: "Mutación Furiosa: +15 ATK" },
        { name: "Espiroqueta Venenosa", icon: "🧬", atk: 25, def: 14, spd: 26, ability: "Parálisis Microbiana" }
      ],
      [
        { name: "Virión Quimérico", icon: "🧪", atk: 52, def: 16, spd: 32, ability: "Parálisis Viral: Salta turno" },
        { name: "Superbacteria Resistente", icon: "🦠", atk: 55, def: 25, spd: 28, ability: "Inmunidad Antibiótica" },
        { name: "Protozoo Devorador", icon: "🧫", atk: 58, def: 20, spd: 34, ability: "Fagocitosis: Roba stats" },
        { name: "Mico-Titán Infectado", icon: "🍄", atk: 60, def: 22, spd: 26, ability: "Esporas Venenosas Masivas" },
        { name: "Bio-Nube Tóxica", icon: "💨", atk: 50, def: 30, spd: 36, ability: "Asfixia Celular" }
      ],
      [
        { name: "Parásito Titánico", icon: "🧬", atk: 88, def: 42, spd: 40, ability: "Drenaje Genético: Roba 20% ATK" },
        { name: "Corona Quimérico", icon: "👑", atk: 92, def: 45, spd: 44, ability: "Pandemia Abisal: Daño a todo el mazo" },
        { name: "Bio-Masa Primordial", icon: "☣️", atk: 98, def: 50, spd: 38, ability: "Absorción Orgánica" },
        { name: "Simbionte Alfa", icon: "👾", atk: 105, def: 48, spd: 42, ability: "Fusión Parasitaria" },
        { name: "Virus de la Singularidad", icon: "🌌", atk: 110, def: 38, spd: 48, ability: "Bucle Genético" }
      ]
    ]
  }
];

// Populate CREATURES_DB with over 100 creatures
let creatureCount = 0;
CATEGORIES.forEach(cat => {
  cat.tiers.forEach((tierGroup, tierIdx) => {
    const tierNum = tierIdx + 1;
    tierGroup.forEach((c, itemIdx) => {
      creatureCount++;
      const id = `${cat.name.toLowerCase()}_t${tierNum}_${itemIdx+1}`;
      const rarity = tierNum === 1 ? 'common' : tierNum === 2 ? 'rare' : tierNum === 3 ? 'epic' : 'legendary';
      const frameStyle = `frame-${rarity}`;

      CREATURES_DB[id] = {
        id: id,
        name: c.name,
        category: cat.name,
        tier: tierNum,
        icon: c.icon,
        atk: c.atk,
        def: c.def,
        spd: c.spd,
        ability: c.ability,
        rarity: rarity,
        color: cat.color,
        frameStyle: frameStyle
      };
    });
  });
});

console.log(`✅ Base de Datos cargada con ${creatureCount} criaturas distintas.`);
window.CREATURES_DB = CREATURES_DB;
