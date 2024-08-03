import { initGame, handleKeypress, buyCore, cpuAutoType, resetGame, addArbitraryFlops, addArbitraryCPUCores } from './game.js';
import { devMode, cpuUpdateSpeed } from './constants.js';
import { saveGame, loadGame } from './storage.js';

const resetButton = document.getElementById('reset-button');
const buyCpuCoreButton = document.getElementById('buy-cpu-core');

// Dev mode elements
const devSidebar = document.getElementById('dev-sidebar');
const addOneCPUCoreButton = document.getElementById('add-one-cpu');
const addCpuCoreButton = document.getElementById('add-cpu');
const addCpuCoreField = document.getElementById('add-cpu-input');
const addFlopsButton = document.getElementById('add-flops');
const addFlopsField = document.getElementById('add-flops-input');

devSidebar.style.display = devMode ? 'block' : 'none';

// Initial setup
initGame();
// loadGame();

// Event listeners
document.addEventListener('keypress', handleKeypress);
buyCpuCoreButton.addEventListener('click', buyCore);

// Dev mode event listeners
resetButton.addEventListener('click', resetGame);
addOneCPUCoreButton.addEventListener('click', () => addArbitraryCPUCores(1));
addCpuCoreButton.addEventListener('click', () => {
    let amount = parseInt(addCpuCoreField.value);
    if (isNaN(amount)) {
        amount = 0;
    }
    addArbitraryCPUCores(amount);
}

);
addFlopsButton.addEventListener('click', () => {
    let amount = parseInt(addFlopsField.value);
    if (isNaN(amount)) {
        amount = 0;
    }
    addArbitraryFlops(amount);
});

// Start CPU auto-typing
setInterval(cpuAutoType, cpuUpdateSpeed);

// Save game state every second
// setInterval(saveGame, 1000);