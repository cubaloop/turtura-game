# ESPECIFICACIÓN TÉCNICA Y LIBRO DE REGLAS OFICIALES DE COMBATE
## **Turtura: La Torre del Poder**
**Versión del Sistema:** 1.0.4 — *Core Combat Architecture & Dungeon Engine*  
**Rol del Documento:** Documento de Diseño de Sistemas (GDD / Technical Ruleset)  
**Autor:** Dirección Principal de Sistemas de Combate TCG & Mecánicas RPG  

---

## 1. ARQUITECTURA GENERAL Y PARÁMETROS BASE

### 1.1 Estructura del Escuadrón (Deck Activo)
* **Tamaño del Escuadrón:** Exactamente **4 Cartas de Criatura**.
* **Puntos de Vida del Jugador / Escuadrón:** Cada criatura cuenta con su propia reserva de salud calculada como:
  $$HP_{criatura} = DEF_{base} \times 1.5$$
  La vida total del escuadrón equivale a la suma acumulada de las 4 criaturas activas.
* **Alineación en Campo:** 
  * **Vanguardia (Posición Activa):** 1 Carta en combate directo.
  * **Retaguardia (Banquillo de Reserva):** 3 Cartas en espera táctica (habilitadas para rotación y soporte pasivo).

---

### 1.2 Rueda Elemental Sagrada (Afinidad & Modificadores)
El flujo de ventaja elemental es cíclico y cerrado:

```
        [ 🌪️ Aire ]
        /          \
  (+50%)            (+50%)
      /              \
     v                v
 [ 🪨 Tierra ] <─── [ 🔥 Fuego ]
     \                ^
      \              /
     (+50%)        (+50%)
        \          /
         v        /
        [ 💧 Agua ]
```

* **🌪️ Aire** vence a **🪨 Tierra** $\rightarrow$ Multiplicador Elemental = **$1.50\times$** (+50% Daño)
* **🔥 Fuego** vence a **🌪️ Aire** $\rightarrow$ Multiplicador Elemental = **$1.50\times$** (+50% Daño)
* **💧 Agua** vence a **🔥 Fuego** $\rightarrow$ Multiplicador Elemental = **$1.50\times$** (+50% Daño)
* **🪨 Tierra** vence a **💧 Agua** $\rightarrow$ Multiplicador Elemental = **$1.50\times$** (+50% Daño)
* **Mismo Elemento / Neutro:** Multiplicador Elemental = **$1.00\times$**
* **Desventaja Elemental (ej. Fuego atacando a Agua):** Multiplicador Elemental = **$0.75\times$** (-25% Reducción)

---

### 1.3 Compendio Oficial de Cartas Registradas (#1 a #10)

| ID | Nombre | Elemento | Rareza | Nivel | ATQ Base | DEF Base | Coste Energía (Básico / Definitivo) | Habilidad Pasiva / Efecto Especial |
|---|---|---|---|:---:|:---:|:---:|:---:|---|
| **#1** | **Águila Harpía** | 🌪️ Aire | Raro | 10 | 1,300 | 850 | 1 / 3 | **Corte Huracán:** Ignora un 20% de la DEF si el rival es de elemento 🪨 Tierra. |
| **#2** | **Tigre de Bengala** | 🪨 Tierra | Épico | 14 | 1,820 | 1,450 | 2 / 4 | **Embestida Sísmica:** +15% de Probabilidad Crítica en el turno de entrada. |
| **#3** | **Dragón de Obsidiana** | 🔥 Fuego | Legendario | 25 | 2,450 | 1,200 | 2 / 5 | **Aliento de Magma:** Quema al rival infligiendo 10% de su ATQ por turno durante 2 rondas. |
| **#4** | **Tortuga Cristalina** | 💧 Agua | Épico | 12 | 1,450 | 1,890 | 1 / 4 | **Reflejo Prismático:** Reduce en 25% todo el daño recibido mientras mantenga más del 50% HP. |
| **#5** | **Kraken Colosal** | 💧 Agua | Legendario | 30 | 2,890 | 2,100 | 3 / 6 | **Tsunami Abisal:** Aturde a la criatura rival por 1 turno al asestar su Habilidad Definitiva. |
| **#6** | **Escarabajo Escarlata**| 🔥 Fuego | Común | 5 | 850 | 1,100 | 1 / 3 | **Caparazón Ígneo:** Devuelve 150 de daño directo al recibir un ataque frontal. |
| **#7** | **Tiburón Martillo** | 💧 Agua | Épico | 15 | 1,750 | 1,300 | 2 / 4 | **Frenesí Hidráulico:** +250 ATQ adicional si el enemigo objetivo está por debajo del 50% HP. |
| **#8** | **Fénix Celestial** | 🔥 Fuego | Legendario | 28 | 2,650 | 1,400 | 3 / 6 | **Renacimiento Solar:** Revive una vez por partida con 30% de HP al ser derrotado. |
| **#9** | **Behemoth de Roca** | 🪨 Tierra | Épico | 22 | 1,950 | 2,500 | 2 / 5 | **Fortaleza Inamovible:** Inmune a efectos de aturdimiento y reducción de estadísticas. |
| **#10**| **Hormiga Guerrera** | 🪨 Tierra | Común | 4 | 650 | 720 | 1 / 2 | **Enjambre Táctico:** Gana +120 ATQ acumulativo por cada criatura aliada derrotada en la partida. |

---

## 2. MODO DUELO JVSJ 3D (PvP COMPETITIVO)

### 2.1 Estructura del Turno de Combate (4 Fases Obligatorias)

Cada ronda de juego se ejecuta bajo un estricto bucle secuencial por turnos:

1. **FASE 1: Robo de Energía (Energy Draw Phase)**
   * +2 Orbes de Energía universales (Capacidad máx: 10).
   * Resolución de efectos "Inicio de Turno".
2. **FASE 2: Habilidad y Gadgets (Tactical Phase)**
   * Uso de Gadgets / Consumibles (Límite 1 por turno).
   * Rotación Táctica (Cambio Vanguardia/Retaguardia = 1 Orbe).
   * Activación de buffs o posturas defensivas.
3. **FASE 3: Ataque y Resolución (Combat Phase)**
   * Declaración: Ataque Básico o Habilidad Definitiva.
   * Deducción de Energía requerida.
   * Ejecución del Motor Matemático de Daño.
4. **FASE 4: Cierre (End Phase)**
   * Aplicación de DoTs (Quemadura, Sangrado, etc.).
   * Comprobación de K.O. y reemplazo de bajas.
   * Transferencia de prioridad al adversario.

---

### 2.2 Motor Matemático de Daño (Fórmula Oficial)

Todo cálculo de daño directo contra una criatura oponente se procesa mediante la siguiente fórmula:

$$Daño = \max\left(10, \; \Big(ATQ_{atacante} - (DEF_{defensor} \times Coef_{mitigacion})\Big) \times Multiplicador_{Elemental} \times Crítico\right)$$

* **$ATQ_{atacante}$:** Ataque total de la criatura atacante (incluyendo buffs de estado y modificadores climáticos).
* **$DEF_{defensor}$:** Defensa total de la criatura objetivo.
* **$Coef_{mitigacion}$:** Coeficiente estándar de absorción por blindaje:
  * Ataques Básicos: $Coef = 0.60$
  * Habilidades Definitivas (Burst): $Coef = 0.35$ (mayor penetración de armadura).
* **$Multiplicador_{Elemental}$:** $1.50$ (Ventaja), $1.00$ (Neutro), $0.75$ (Desventaja).
* **$Crítico$ ($CRIT$):**
  * Tasa de Crítico Base: **10%** (escalable por equipo y pasivas).
  * Multiplicador Crítico: **$1.50\times$** (en caso de impacto normal, $1.00\times$).
* **Suelo de Daño ($\max(10, \dots)$):** Asegura que ningún ataque exitoso genere 0 daño.

---

### 2.3 Gestión y Economía de Energía
1. **Generación:** Se generan automáticamente **+2 Orbes de Energía** por turno.
2. **Capacidad Máxima:** El reservorio de energía elemental tiene un tope de **10 Orbes**.
3. **Mecánica de Sobrecarga:** Si un jugador no gasta energía en su fase de ataque, acumula **Sobrecarga Elemental**, otorgando un **+15% de penetración de armadura** al siguiente ataque.

---

### 2.4 Condiciones de Victoria en Duelo JvsJ
1. **Eliminación Total del Escuadrón (Squad Wipeout):** Las 4 criaturas del equipo rival son reducidas a 0 HP.
2. **Agotamiento de Reserva Vital (Total LP 0):** La reserva de vida acumulada del contrincante se vacía por completo.
3. **Victoria Técnica / Rendición:** Rendición voluntaria o expiración del temporizador de turno (60 segundos por fase).

---

## 3. MODO MAZMORRA: LA TORRE DE BABEL (100 PISOS)

* **Pisos 1 a 25 (Novatos):** Multiplicador Stats 1.0x. Jefe Piso 25: Escarabajo de Lava Nvl 16.
* **Pisos 26 a 50 (Élite):** Multiplicador Stats 1.5x + Estados alterados (Quemadura, Congelación, Ceguera, Petrificación). Jefe Piso 50: Tortuga Cristalina Ancestral Nvl 38.
* **Pisos 51 a 75 (Mitológicas):** Multiplicador Stats 2.2x + Climas dinámicos (Tormenta Solar, Diluvio del Abismo, Vórtice Ciclónico, Dominio Telúrico). Jefe Piso 75: Dragón de Obsidiana Alfa Nvl 60.
* **Pisos 76 a 100 (Titanes):** Multiplicador Stats 3.5x + Escudo de Fusión (70% reducción hasta 3 golpes del elemento opuesto) + Fase Berserk (30% HP). Jefe Final Piso 100: *Turtura, Titán Cuádruple Primordial*.
