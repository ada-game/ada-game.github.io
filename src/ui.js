import { devMode } from "./constants.js";

export const resetButton = document.getElementById('reset-button');
export const buyCpuCoreButton = document.getElementById('buy-cpu-core');
const shopArea = document.getElementById('shop');
const cpuTypingArea = document.getElementById('cpu-typing-area');
const flopsDisplay = document.getElementById('flops');
const cpuCoresDisplay = document.getElementById('cpu-cores');

// Dev mode elements
const devSidebar = document.getElementById('dev-sidebar');
export const addOneCPUCoreButton = document.getElementById('add-one-cpu');
export const addCpuCoreButton = document.getElementById('add-cpu');
export const addCpuCoreField = document.getElementById('add-cpu-input');
export const addFlopsButton = document.getElementById('add-flops');
export const addFlopsField = document.getElementById('add-flops-input');

devSidebar.style.display = devMode ? 'block' : 'none';

export function resetVisibility() {
    toggleFade('flops', false);
    toggleFade('cpu-cores', false);
    toggleFade('shop', false);
    toggleFade('cpu-typing-area', false);
    toggleFade('buy-cpu-core', false);
}

export function updateVisibility(gameState) {
    if (gameState.flops >= 50) {
        toggleFade('flops');
    }
    if (gameState.cpuCores >= 1) {
        toggleFade('cpu-cores');
    }
    if (gameState.flops >= 100) {
        toggleFade('shop');
        toggleFade('buy-cpu-core', true, 'inline');
    }
    if (gameState.cpuCores > 0) {
        toggleFade('cpu-typing-area');
    }
}

export function toggleFade(elementId, forceState=true, display='block') {
    const element = document.getElementById(elementId);
    const isCurrentlyActive = element.classList.contains('active');
    
    // Determine if we need to show or hide based on forceState
    const shouldShow = (forceState === undefined) ? !isCurrentlyActive : forceState;
    
    if (shouldShow) {
        // Show the element
        element.style.display = display;
        element.offsetHeight; // Trigger reflow
        element.classList.add('active');
    } else {
        // Hide the element
        element.classList.remove('active');
        setTimeout(() => {
            if (!element.classList.contains('active')) {
                element.style.display = 'none';
            }
        }, 500); // Match this to your transition duration
    }
}