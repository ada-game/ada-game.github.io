
import { gameState } from './state.js';
import { updateSpeed, cpuSpeed, gpuSpeed } from './constants.js';
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

export function buyGpuCore(debug=false) {
    gameState.buyGpuCore(debug);
    removeFocus();
}

export function autoType() {
    let cpuCores = gameState.cpuCores;
    let gpuCores = gameState.gpuCores;
    let cpuTypeSpeed = cpuSpeed * Math.sqrt(cpuCores) * updateSpeed / 1000;
    let gpuTypeSpeed = gpuSpeed * Math.sqrt(gpuCores) * updateSpeed / 1000;
    gameState.cpuTypingEntity.type(cpuTypeSpeed);
    gameState.gpuTypingEntity.type(gpuTypeSpeed);
    gameState.updateFlops(cpuTypeSpeed + gpuTypeSpeed);
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