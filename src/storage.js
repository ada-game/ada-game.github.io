export function saveGame() {
    localStorage.setItem('adaTypingFlops', flops.toString());
    localStorage.setItem('adaTypingPlayerIndex', playerTypedIndex.toString());
    localStorage.setItem('adaTypingCpuIndex', cpuTypedIndex.toString());
    localStorage.setItem('adaTypingCpuCores', cpuCores.toString());
}

export function loadGame() {
    const savedFlops = localStorage.getItem('adaTypingFlops');
    const savedPlayerIndex = localStorage.getItem('adaTypingPlayerIndex');
    const savedCpuIndex = localStorage.getItem('adaTypingCpuIndex');
    const savedCpuCores = localStorage.getItem('adaTypingCpuCores');
    if (savedFlops !== null && savedPlayerIndex !== null && savedCpuIndex !== null && savedCpuCores !== null) {
        flops = parseFloat(savedFlops);
        playerTypedIndex = parseInt(savedPlayerIndex);
        cpuTypedIndex = parseInt(savedCpuIndex);
        cpuCores = parseInt(savedCpuCores);
        updateFlops();
        updateCpuCores();
        renderGame();
    }
}