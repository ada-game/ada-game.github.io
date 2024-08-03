import { playerOriginalText, cpuOriginalText } from './constants.js';
import { TypingEntity } from './typing.js';

class GameState {
    constructor(playerTypingEntity, 
                cpuTypingEntity,
                cpuTypingArea,
                flopsDisplay, 
                cpuCoresDisplay, 
                flops=0, 
                cpuCores=0) {
        this.playerTypingEntity = playerTypingEntity;
        this.cpuTypingEntity = cpuTypingEntity;
        this.cpuTypingArea = cpuTypingArea;
        this.flopsDisplay = flopsDisplay;
        this.cpuCoresDisplay = cpuCoresDisplay;
        this.flops = flops;
        this.cpuCores = cpuCores;
    }

    updateFlops(amount=0) {
        this.flops += amount;
        this.flopsDisplay.textContent = `FLOPS: ${Math.floor(this.flops)}`;
    }

    updateCpuCores(amount=0) {
        this.cpuCores += amount;
        this.cpuCoresDisplay.textContent = `CPU Cores: ${this.cpuCores}`;
        if (this.cpuCores > 0) {
            this.cpuTypingArea.style.display = 'block';
        } else {
            this.cpuTypingArea.style.display = 'none';
        }
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

const cpuTypingArea = document.getElementById('cpu-typing-area');

export let gameState = new GameState(
    playerTypingEntity, 
    cpuTypingEntity, 
    cpuTypingArea, 
    flopsDisplay, 
    cpuCoresDisplay
);
