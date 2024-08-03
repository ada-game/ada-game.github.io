
import { gameState } from './state.js';
import { cpuUpdateSpeed } from './constants.js';
import { toggleFade } from './ui.js';

export function initGame() {
    toggleFade('player-typing-area');
    gameState.reset();
}

export function handleKeypress(event) {
    let playerText = gameState.playerTypingEntity.text;
    let playerTypedIndex = gameState.playerTypingEntity.typedIndex;
    if (event.key === playerText[playerTypedIndex % playerText.length]) {
        gameState.playerTypingEntity.type();
        gameState.updateFlops(1);
    }
}

export function buyCore(debug=false) {
    gameState.buyCore(debug);
    removeFocus();
}

export function cpuAutoType() {
    let cpuCores = gameState.cpuCores;
    if (cpuCores > 0) {
        const autoTypeSpeed = Math.sqrt(cpuCores) * cpuUpdateSpeed / 1000;
        gameState.cpuTypingEntity.type(autoTypeSpeed);
        gameState.updateFlops(autoTypeSpeed);
    }
}

export function resetGame() {
    gameState.reset();
    removeFocus();
}

export function addArbitraryFlops(amount) {
    gameState.updateFlops(amount);
    removeFocus();
}

export function addArbitraryCPUCores(amount) {
    gameState.updateCpuCores(amount);
    removeFocus();
}

function removeFocus() {
    if (document.activeElement) {
        document.activeElement.blur();
    }
}