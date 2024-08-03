import { windowSize, textFadeStart } from './constants.js';

export class TypingEntity {
    constructor(originalText, typedTextElement, untypedTextElement, typedIndex=0) {
        this.originalText = originalText;
        this.text = originalText + originalText.substring(0, windowSize);
        this.typedIndex = typedIndex;
        this.typedTextElement = typedTextElement;
        this.untypedTextElement = untypedTextElement;
    }

    type(amount=1) {
        this.typedIndex += amount;
        this.update();
    }

    getCurrentChar() {
        return this.text[this.typedIndex];
    }

    update() {
        this.renderTypingArea();
        this.typedIndex = this.typedIndex % this.text.length;
    }

    renderTypingArea() {
        // Looping behavior
        if (this.typedIndex >= this.text.length - windowSize) {
            this.text = this.originalText.substring(this.originalText.length - windowSize) + this.originalText + this.originalText.substring(0, windowSize);
            this.typedIndex = windowSize;
        }
        
        let startIndex = this.typedIndex;
        
        // Calculate the start and end indices for the typed and untyped portions
        let typedStart = Math.max(0, startIndex - windowSize);
        let typedEnd = startIndex;
        let untypedStart = startIndex;
        let untypedEnd = startIndex + windowSize;
        
        // Extract the portions of text to display
        let typedPortion = this.text.slice(typedStart, typedEnd);
        let untypedPortion = this.text.slice(untypedStart, untypedEnd);
        
        // Pad the typed portion with spaces if it's shorter than the window size
        while (typedPortion.length < windowSize) {
            typedPortion = ' ' + typedPortion;
        }
        
        // Trim both portions to ensure they fit within the window
        typedPortion = typedPortion.slice(-windowSize);
        untypedPortion = untypedPortion.slice(0, windowSize);
        
        // Apply fading effect and update the DOM
        this.typedTextElement.innerHTML = applyFadingEffect(typedPortion, true);
        this.untypedTextElement.innerHTML = applyFadingEffect(untypedPortion, false);
    }

    reset() {
        this.typedIndex = 0;
        this.text = this.originalText + this.originalText.substring(0, windowSize);
        this.update();
    }
}

function applyFadingEffect(str, isTyped) {
    return str.split('').map((char, index) => {
        let opacity = calculateOpacity(index, isTyped);
        return `<span style="opacity: ${opacity}">${char === ' ' ? '&nbsp;' : char}</span>`;
    }).join('');
}

function calculateOpacity(index, isTyped) {
    let distance = isTyped ? index : (windowSize - 1 - index);
    
    if (distance >= textFadeStart) return 1;
    
    // Quadratic easing
    let t = distance / textFadeStart;
    return t * t;
}