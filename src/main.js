import { initGame, handleKeypress, buyCore, cpuAutoType, resetGame, addArbitraryFlops, addArbitraryCPUCores } from './game.js';
import { cpuUpdateSpeed } from './constants.js';
import { saveGame, loadGame } from './storage.js';

import { resetButton, buyCpuCoreButton, addOneCPUCoreButton, addCpuCoreButton, addCpuCoreField, addFlopsButton, addFlopsField } from './ui.js';

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