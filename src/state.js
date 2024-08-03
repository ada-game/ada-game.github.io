import { playerOriginalText, cpuOriginalText, gpuOriginalText, cpuCost, gpuCost } from './constants.js';
import { TypingEntity } from './typing.js';
import { resetVisibility, updateVisibility } from './ui.js';

class GameState {
    constructor(
        playerTypingEntity, 
        cpuTypingEntity,
        gpuTypingEntity,
        flopsDisplay, 
        cpuCoresDisplay, 
        gpuCoresDisplay,
        flops=0, 
        cpuCores=0,
        gpuCores=0
    ) {
        this.playerTypingEntity = playerTypingEntity;
        this.cpuTypingEntity = cpuTypingEntity;
        this.gpuTypingEntity = gpuTypingEntity;
        this.flopsDisplay = flopsDisplay;
        this.cpuCoresDisplay = cpuCoresDisplay;
        this.gpuCoresDisplay = gpuCoresDisplay;
        this.flops = flops;
        this.cpuCores = cpuCores;
        this.gpuCores = gpuCores;
    }

    updateFlops(amount=0) {
        this.flops += amount;
        this.flopsDisplay.textContent = `FLOPS: ${Math.floor(this.flops)}`;
        updateVisibility(this);
    }

    updateCpuCores(amount=0) {
        this.cpuCores += amount;
        this.cpuCoresDisplay.textContent = `CPU Cores: ${this.cpuCores}`;
        updateVisibility(this);
    }

    updateGpuCores(amount=0) {
        this.gpuCores += amount;
        this.gpuCoresDisplay.textContent = `GPU Cores: ${this.gpuCores}`;
        updateVisibility(this);
    }

    buyCore(debug=false) {
        if (debug===true) {
            this.updateFlops(cpuCost);
        }
        if (this.flops >= cpuCost) {
            this.updateFlops(-cpuCost);
            this.updateCpuCores(1);
        }
    }

    buyGpuCore(debug=false) {
        if (debug===true) {
            this.updateFlops(gpuCost);
        }
        if (this.flops >= gpuCost) {
            this.updateFlops(-gpuCost);
            this.updateGpuCores(1);
        }
    }
    
    reset() {
        this.flops = 0;
        this.cpuCores = 0;
        this.gpuCores = 0;
        this.updateFlops();
        this.updateCpuCores();
        this.updateGpuCores();
        this.playerTypingEntity.reset();
        this.cpuTypingEntity.reset();
        this.gpuTypingEntity.reset();
        resetVisibility();
    }
}

let playerTypedText = document.querySelector('#player-typing-area .typed-text');
let playerUntypedText = document.querySelector('#player-typing-area .untyped-text');
let playerTypingEntity = new TypingEntity(playerOriginalText, playerTypedText, playerUntypedText);

let cpuTypedText = document.querySelector('#cpu-typing-area .typed-text');
let cpuUntypedText = document.querySelector('#cpu-typing-area .untyped-text');
let cpuTypingEntity = new TypingEntity(cpuOriginalText, cpuTypedText, cpuUntypedText);

let gpuTypedText = document.querySelector('#gpu-typing-area .typed-text');
let gpuUntypedText = document.querySelector('#gpu-typing-area .untyped-text');
let gpuTypingEntity = new TypingEntity(gpuOriginalText, gpuTypedText, gpuUntypedText);

let flopsDisplay = document.getElementById('flops');
let cpuCoresDisplay = document.getElementById('cpu-cores');
let gpuCoresDisplay = document.getElementById('gpu-cores');

export let gameState = new GameState(
    playerTypingEntity, 
    cpuTypingEntity, 
    gpuTypingEntity,
    flopsDisplay, 
    cpuCoresDisplay,
    gpuCoresDisplay
);
