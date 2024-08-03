import { playerOriginalText, cpuOriginalText } from './constants.js';
import { TypingEntity } from './typing.js';
import { resetVisibility, updateVisibility } from './ui.js';

class GameState {
    constructor(playerTypingEntity, 
                cpuTypingEntity,
                flopsDisplay, 
                cpuCoresDisplay, 
                flops=0, 
                cpuCores=0) {
        this.playerTypingEntity = playerTypingEntity;
        this.cpuTypingEntity = cpuTypingEntity;
        this.flopsDisplay = flopsDisplay;
        this.cpuCoresDisplay = cpuCoresDisplay;
        this.flops = flops;
        this.cpuCores = cpuCores;
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

    buyCore(debug=false) {
        if (debug===true) {
            this.updateFlops(100);
        }
        if (this.flops >= 100) {
            this.updateFlops(-100);
            this.updateCpuCores(1);
        }
    }
    
    reset() {
        this.flops = 0;
        this.cpuCores = 0;
        this.updateFlops();
        this.updateCpuCores();
        this.playerTypingEntity.reset();
        this.cpuTypingEntity.reset();
        resetVisibility();
    }
}

let playerTypedText = document.querySelector('#player-typing-area .typed-text');
let playerUntypedText = document.querySelector('#player-typing-area .untyped-text');
let playerTypingEntity = new TypingEntity(playerOriginalText, playerTypedText, playerUntypedText);

let cpuTypedText = document.querySelector('#cpu-typing-area .typed-text');
let cpuUntypedText = document.querySelector('#cpu-typing-area .untyped-text');
let cpuTypingEntity = new TypingEntity(cpuOriginalText, cpuTypedText, cpuUntypedText);

let flopsDisplay = document.getElementById('flops');
let cpuCoresDisplay = document.getElementById('cpu-cores');

export let gameState = new GameState(
    playerTypingEntity, 
    cpuTypingEntity, 
    flopsDisplay, 
    cpuCoresDisplay
);
