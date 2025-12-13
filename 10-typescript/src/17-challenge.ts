// 17-challenge.ts - Juego TypeScript con diseño corregido

// ========== 1. BASIC TYPES ==========
const PLAYER_NAME: string = "Hornet";
const PLAYER_MAX_HEALTH: number = 100;
let playerHealth: number = PLAYER_MAX_HEALTH;
const PLAYER_SKILLS: string[] = ["Attack", "Heal", "Defense"];

// ========== 2. INTERFACES ==========
interface GameCharacter {
    name: string;
    health: number;
}

// ========== 3. ENUMS ==========
enum GameState {
    WAITING = "WAITING",
    PLAYER_TURN = "PLAYER_TURN",
    ENEMY_TURN = "ENEMY_TURN",
    VICTORY = "VICTORY",
    DEFEAT = "DEFEAT"
}

// ========== 4. CLASSES ==========
class Enemy implements GameCharacter {
    name: string;
    health: number;
    maxHealth: number;
    
    constructor(name: string, health: number) {
        this.name = name;
        this.maxHealth = health;
        this.health = health;
    }
    
    takeDamage(damage: number): void {
        this.health -= damage;
        if (this.health < 0) this.health = 0;
    }
    
    isAlive(): boolean {
        return this.health > 0;
    }
    
    attack(): number {
        return Math.floor(Math.random() * 15) + 8;
    }
}

// ========== 5. GAME STATE ==========
let currentEnemy: Enemy | null = null;
let gameState: GameState = GameState.WAITING;
let gameRound: number = 1;
const gameMessages: string[] = [];

// ========== 6. GAME FUNCTIONS ==========
function createEnemy(): Enemy {
    const enemies = [
        { name: "Mosskin", health: 80 },
        { name: "Grub", health: 60 },
        { name: "Husk", health: 100 }
    ];
    const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    return new Enemy(randomEnemy.name, randomEnemy.health);
}

function addMessage(message: string): void {
    gameMessages.push(message);
    if (gameMessages.length > 8) {
        gameMessages.shift();
    }
    updateGameDisplay();
}

async function playerAttack(): Promise<void> {
    if (gameState !== GameState.PLAYER_TURN || !currentEnemy) return;
    
    const damage = Math.floor(Math.random() * 20) + 10;
    currentEnemy.takeDamage(damage);
    addMessage(`⚔️ Hornet attacks for ${damage} damage!`);
    
    if (!currentEnemy.isAlive()) {
        gameState = GameState.VICTORY;
        addMessage(`🏆 VICTORY! You defeated ${currentEnemy.name}!`);
        updateGameDisplay();
        return;
    }
    
    gameState = GameState.ENEMY_TURN;
    updateGameDisplay();
    
    await new Promise(resolve => setTimeout(resolve, 800));
    await enemyTurn();
}

async function enemyTurn(): Promise<void> {
    if (gameState !== GameState.ENEMY_TURN || !currentEnemy) return;
    
    const damage = currentEnemy.attack();
    playerHealth -= damage;
    if (playerHealth < 0) playerHealth = 0;
    
    addMessage(`👹 ${currentEnemy.name} attacks for ${damage} damage!`);
    
    if (playerHealth <= 0) {
        gameState = GameState.DEFEAT;
        addMessage(`💀 DEFEAT! ${currentEnemy.name} defeated you!`);
    } else {
        gameState = GameState.PLAYER_TURN;
        gameRound++;
    }
    
    updateGameDisplay();
}

async function playerHeal(): Promise<void> {
    if (gameState !== GameState.PLAYER_TURN) return;
    
    const healAmount = Math.floor(Math.random() * 20) + 10;
    playerHealth = Math.min(PLAYER_MAX_HEALTH, playerHealth + healAmount);
    addMessage(`💚 Hornet heals for ${healAmount} HP!`);
    
    gameState = GameState.ENEMY_TURN;
    updateGameDisplay();
    
    await new Promise(resolve => setTimeout(resolve, 800));
    await enemyTurn();
}

function startNewGame(): void {
    playerHealth = PLAYER_MAX_HEALTH;
    currentEnemy = createEnemy();
    gameState = GameState.PLAYER_TURN;
    gameRound = 1;
    gameMessages.length = 0;
    
    addMessage(`🎮 NEW GAME STARTED!`);
    addMessage(`✨ Player: Hornet`);
    addMessage(`👹 Enemy: ${currentEnemy.name} appears!`);
    addMessage(`⚔️ Round ${gameRound} begins!`);
    
    updateGameDisplay();
}

// ========== 7. DISPLAY FUNCTIONS ==========
function updateGameDisplay(): void {
    const output = document.getElementById('output17');
    if (!output) return;
    
    output.innerHTML = '';
    
    // Crear contenedor principal con tamaño limitado
    const container = document.createElement('div');
    container.style.maxWidth = '900px';
    container.style.margin = '0 auto';
    container.style.padding = '15px';
    container.style.fontFamily = 'Arial, Helvetica, sans-serif';
    container.style.boxSizing = 'border-box';
    
    // Título del juego
    const title = document.createElement('div');
    title.style.textAlign = 'center';
    title.style.marginBottom = '15px';
    title.style.paddingBottom = '15px';
    title.style.borderBottom = '2px solid #4cc9f0';
    title.innerHTML = `
        <h1 style="color: #4cc9f0; margin: 0; font-size: 1.8em; font-weight: bold;">TypeScript RPG</h1>
        <p style="color: #666666; margin: 5px 0 0 0; font-size: 1em;">
            Build a complete project using TypeScript features
        </p>
    `;
    container.appendChild(title);
    
    // Estado del juego
    const statusDiv = document.createElement('div');
    statusDiv.style.textAlign = 'center';
    statusDiv.style.marginBottom = '15px';
    statusDiv.style.padding = '12px';
    statusDiv.style.backgroundColor = '#f0f0f0';
    statusDiv.style.borderRadius = '8px';
    statusDiv.style.border = '2px solid #4cc9f0';
    
    let statusText = '';
    let statusColor = '#333333';
    
    switch(gameState) {
        case GameState.WAITING:
            statusText = '🔄 Waiting to start';
            statusColor = '#FF9800';
            break;
        case GameState.PLAYER_TURN:
            statusText = '✅ Your Turn - Choose an action';
            statusColor = '#4CAF50';
            break;
        case GameState.ENEMY_TURN:
            statusText = '⚡ Enemy Turn';
            statusColor = '#f44336';
            break;
        case GameState.VICTORY:
            statusText = '🏆 VICTORY! You won!';
            statusColor = '#FFC107';
            break;
        case GameState.DEFEAT:
            statusText = '💀 DEFEAT! You lost!';
            statusColor = '#f44336';
            break;
    }
    
    statusDiv.innerHTML = `
        <div style="font-size: 1.1em; font-weight: bold; color: ${statusColor}; margin-bottom: 5px;">
            ${statusText}
        </div>
        <div style="color: #666666; font-size: 0.9em;">
            Round: ${gameRound} | Game State: ${gameState}
        </div>
    `;
    container.appendChild(statusDiv);
    
    // Información de personajes
    const charactersDiv = document.createElement('div');
    charactersDiv.style.display = 'grid';
    charactersDiv.style.gridTemplateColumns = '1fr 1fr';
    charactersDiv.style.gap = '15px';
    charactersDiv.style.marginBottom = '15px';
    
    // Jugador - fondo blanco, letras negras
    const playerDiv = document.createElement('div');
    playerDiv.style.padding = '15px';
    playerDiv.style.backgroundColor = '#ffffff';
    playerDiv.style.borderRadius = '8px';
    playerDiv.style.border = '2px solid #4CAF50';
    playerDiv.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    
    const playerHealthPercent = (playerHealth / PLAYER_MAX_HEALTH) * 100;
    const playerHealthColor = playerHealthPercent > 50 ? '#4CAF50' : playerHealthPercent > 20 ? '#FF9800' : '#f44336';
    
    playerDiv.innerHTML = `
        <div style="font-size: 1.2em; font-weight: bold; color: #4CAF50; margin-bottom: 10px; text-align: center;">
            🎮 PLAYER
        </div>
        <div style="margin-bottom: 8px; line-height: 1.5; color: #333333;">
            <div><strong>Name:</strong> Hornet</div>
            <div><strong>Skills:</strong> Attack, Heal, Defense</div>
            <div><strong>Health:</strong> ${playerHealth}/${PLAYER_MAX_HEALTH}</div>
        </div>
        <div style="background: #e0e0e0; height: 15px; border-radius: 7px; margin: 10px 0; overflow: hidden;">
            <div style="background: ${playerHealthColor}; width: ${playerHealthPercent}%; height: 100%;"></div>
        </div>
    `;
    charactersDiv.appendChild(playerDiv);
    
    // Enemigo - fondo blanco, letras negras
    const enemyDiv = document.createElement('div');
    enemyDiv.style.padding = '15px';
    enemyDiv.style.backgroundColor = '#ffffff';
    enemyDiv.style.borderRadius = '8px';
    enemyDiv.style.border = '2px solid #f44336';
    enemyDiv.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    
    if (currentEnemy) {
        const enemyHealthPercent = currentEnemy.isAlive() ? (currentEnemy.health / currentEnemy.maxHealth) * 100 : 0;
        const enemyHealthColor = enemyHealthPercent > 50 ? '#f44336' : enemyHealthPercent > 20 ? '#FF9800' : '#ff4444';
        
        enemyDiv.innerHTML = `
            <div style="font-size: 1.2em; font-weight: bold; color: #f44336; margin-bottom: 10px; text-align: center;">
                👹 ENEMY
            </div>
            <div style="margin-bottom: 8px; line-height: 1.5; color: #333333;">
                <div><strong>Name:</strong> ${currentEnemy.name}</div>
                <div><strong>Status:</strong> ${currentEnemy.isAlive() ? 'Alive' : 'Defeated'}</div>
                <div><strong>Health:</strong> ${currentEnemy.health}/${currentEnemy.maxHealth}</div>
            </div>
            <div style="background: #e0e0e0; height: 15px; border-radius: 7px; margin: 10px 0; overflow: hidden;">
                <div style="background: ${enemyHealthColor}; width: ${enemyHealthPercent}%; height: 100%;"></div>
            </div>
        `;
    }
    charactersDiv.appendChild(enemyDiv);
    container.appendChild(charactersDiv);
    
    // Botones de acción
    const buttonsDiv = document.createElement('div');
    buttonsDiv.style.textAlign = 'center';
    buttonsDiv.style.marginBottom = '15px';
    buttonsDiv.style.display = 'flex';
    buttonsDiv.style.justifyContent = 'center';
    buttonsDiv.style.gap = '10px';
    buttonsDiv.style.flexWrap = 'wrap';
    
    const attackBtn = document.createElement('button');
    attackBtn.textContent = '⚔️ ATTACK';
    attackBtn.style.padding = '12px 25px';
    attackBtn.style.backgroundColor = '#f44336';
    attackBtn.style.color = 'white';
    attackBtn.style.border = 'none';
    attackBtn.style.borderRadius = '6px';
    attackBtn.style.cursor = 'pointer';
    attackBtn.style.fontSize = '14px';
    attackBtn.style.fontWeight = 'bold';
    attackBtn.style.minWidth = '120px';
    attackBtn.disabled = gameState !== GameState.PLAYER_TURN;
    attackBtn.onclick = playerAttack;
    if (attackBtn.disabled) {
        attackBtn.style.opacity = '0.5';
        attackBtn.style.cursor = 'not-allowed';
    }
    
    const healBtn = document.createElement('button');
    healBtn.textContent = '💚 HEAL';
    healBtn.style.padding = '12px 25px';
    healBtn.style.backgroundColor = '#4CAF50';
    healBtn.style.color = 'white';
    healBtn.style.border = 'none';
    healBtn.style.borderRadius = '6px';
    healBtn.style.cursor = 'pointer';
    healBtn.style.fontSize = '14px';
    healBtn.style.fontWeight = 'bold';
    healBtn.style.minWidth = '120px';
    healBtn.disabled = gameState !== GameState.PLAYER_TURN;
    healBtn.onclick = playerHeal;
    if (healBtn.disabled) {
        healBtn.style.opacity = '0.5';
        healBtn.style.cursor = 'not-allowed';
    }
    
    const newGameBtn = document.createElement('button');
    newGameBtn.textContent = '🎮 NEW GAME';
    newGameBtn.style.padding = '12px 25px';
    newGameBtn.style.backgroundColor = '#2196F3';
    newGameBtn.style.color = 'white';
    newGameBtn.style.border = 'none';
    newGameBtn.style.borderRadius = '6px';
    newGameBtn.style.cursor = 'pointer';
    newGameBtn.style.fontSize = '14px';
    newGameBtn.style.fontWeight = 'bold';
    newGameBtn.style.minWidth = '120px';
    newGameBtn.onclick = startNewGame;
    
    buttonsDiv.appendChild(attackBtn);
    buttonsDiv.appendChild(healBtn);
    buttonsDiv.appendChild(newGameBtn);
    container.appendChild(buttonsDiv);
    
    // Registro del juego - fondo oscuro, letras blancas
    const logDiv = document.createElement('div');
    logDiv.style.backgroundColor = '#1a1a2e';
    logDiv.style.borderRadius = '8px';
    logDiv.style.padding = '15px';
    logDiv.style.marginBottom = '10px';
    logDiv.style.border = '2px solid #4cc9f0';
    
    logDiv.innerHTML = `
        <div style="font-size: 1.2em; font-weight: bold; color: #ffffff; margin-bottom: 10px; text-align: center;">
            📜 GAME LOG
        </div>
        <div id="game-log" style="height: 180px; overflow-y: auto; padding: 10px; background: rgba(0, 0, 0, 0.3); border-radius: 5px; font-size: 13px; line-height: 1.4;">
            ${gameMessages.map(msg => `<div style="padding: 6px; margin: 4px 0; border-left: 3px solid #4cc9f0; color: #ffffff;">${msg}</div>`).join('')}
        </div>
    `;
    container.appendChild(logDiv);
    
    output.appendChild(container);
    
    // Auto-scroll del log
    const logContent = document.getElementById('game-log');
    if (logContent) {
        logContent.scrollTop = logContent.scrollHeight;
    }
}

// ========== 8. INITIALIZE GAME ==========
function initGame(): void {
    const output = document.getElementById('output17');
    if (!output) return;
    
    // Asegurar que las funciones estén en el ámbito global
    (window as any).startNewGame = startNewGame;
    (window as any).playerAttack = playerAttack;
    (window as any).playerHeal = playerHeal;
    
    // Pantalla de inicio
    output.innerHTML = `
        <div style="max-width: 900px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; text-align: center;">
            <div style="margin-bottom: 20px;">
                <h1 style="color: #4cc9f0; margin: 0; font-size: 1.8em;">TypeScript RPG</h1>
                <p style="color: #666666; margin: 5px 0 20px 0;">
                    Build a complete project using TypeScript features
                </p>
                <button onclick="startNewGame()" 
                    style="padding: 15px 30px; background: #4CAF50; color: white; border: none; 
                        border-radius: 6px; font-size: 16px; font-weight: bold; cursor: pointer;">
                    🎮 START GAME
                </button>
            </div>
            <div style="background: #ffffff; padding: 20px; border-radius: 8px; border: 2px solid #4cc9f0; text-align: left; display: inline-block;">
                <h3 style="color: #333333; margin-bottom: 15px; text-align: center;">🎮 How to Play</h3>
                <div style="color: #333333; line-height: 1.6;">
                    <div>✅ Click START GAME to begin</div>
                    <div>⚔️ Use ATTACK to damage the enemy</div>
                    <div>💚 Use HEAL to restore your health</div>
                    <div>👹 Enemy attacks after your turn</div>
                    <div>🏆 Defeat the enemy to win!</div>
                </div>
            </div>
        </div>
    `;
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initGame);