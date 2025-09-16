// Import lodash (if available)
// const _ = require('lodash'); // This would work in Node.js, but for browser we'll use vanilla JS

// Fibonacci calculator (like our bot counter!)
function fibonacci(n) {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        const temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

// Click counter with fibonacci progression
let clickCount = 0;
let fibPosition = 0;
let lastMilestoneLevel = 0; // Track the last milestone level reached

// Get DOM elements
const clickButton = document.getElementById('clickMe');
const counterDisplay = document.getElementById('counter-display');

// Add click event listener
clickButton.addEventListener('click', function() {
    clickCount++;
    fibPosition++;

    const fibValue = fibonacci(fibPosition);

    // Update display with both regular count and fibonacci
    counterDisplay.innerHTML = `
        <div>Regular Clicks: ${clickCount}</div>
        <div>Fibonacci Position ${fibPosition}: ${fibValue.toLocaleString()} 🍪</div>
    `;

    // Add some visual feedback
    clickButton.textContent = `Clicked ${clickCount} times!`;

    // Check for dynamic milestone crossings
    const currentMilestone = getMilestoneInfo(fibValue);
    if (currentMilestone && currentMilestone.value > lastMilestoneLevel) {
        const milestoneMessage = getMilestoneMessage(currentMilestone);
        showCelebration(milestoneMessage);
        lastMilestoneLevel = currentMilestone.value;

        // Log milestone for debugging
        console.log(`🎉 Milestone reached: ${currentMilestone.name} (${currentMilestone.value.toLocaleString()})`);
    }
});

// Dynamic milestone detection - works with any number size!
function getMilestoneInfo(number) {
    if (number < 1000) return null; // No milestone under 1000

    // Calculate the order of magnitude (how many digits)
    const digits = Math.floor(Math.log10(number)) + 1;

    // Find the highest round number this beats
    const magnitude = Math.floor(Math.log10(number));
    const powerOf10 = Math.pow(10, magnitude);

    // Check if this is a "nice" milestone (1, 2, 5 times a power of 10)
    const leadingDigit = Math.floor(number / powerOf10);

    // Only celebrate round milestones: 1x, 2x, 5x each power of 10
    if (![1, 2, 5].includes(leadingDigit)) return null;

    const milestoneValue = leadingDigit * powerOf10;

    // Generate dynamic name
    const names = {
        3: 'Thousand', 4: 'Ten Thousand', 5: 'Hundred Thousand',
        6: 'Million', 7: 'Ten Million', 8: 'Hundred Million',
        9: 'Billion', 10: 'Ten Billion', 11: 'Hundred Billion',
        12: 'Trillion', 13: 'Ten Trillion', 14: 'Hundred Trillion',
        15: 'Quadrillion', 16: 'Ten Quadrillion', 17: 'Hundred Quadrillion',
        18: 'Quintillion', 19: 'Ten Quintillion', 20: 'Hundred Quintillion',
        21: 'Sextillion', 22: 'Ten Sextillion', 23: 'Hundred Sextillion'
    };

    const baseName = names[magnitude] || `10^${magnitude}`;
    const prefix = leadingDigit === 1 ? '' : `${leadingDigit} `;

    return {
        value: milestoneValue,
        name: `${prefix}${baseName}`,
        magnitude: magnitude,
        digits: digits
    };
}

// Generate dynamic celebration message
function getMilestoneMessage(milestoneInfo) {
    if (!milestoneInfo) return '';

    // Dynamic emoji selection based on magnitude
    const emojiSets = [
        ['🎉', '🎊'], // Thousands
        ['💫', '⭐'], // Ten thousands
        ['✨', '🌟'], // Hundred thousands
        ['🚀', '🛸'], // Millions
        ['🎆', '🎇'], // Ten millions
        ['💎', '💠'], // Hundred millions
        ['🔥', '💥'], // Billions
        ['⚡', '🌩️'], // Ten billions
        ['🌊', '🌀'], // Hundred billions
        ['🌟', '💫'], // Trillions
        ['🌌', '🪐'], // Ten trillions+
        ['🌈', '🦄'], // Even higher
        ['👑', '💫'], // Quadrillions+
        ['🎯', '🏆'], // Quintillions+
        ['🔮', '✨']  // Beyond comprehension
    ];

    const emojiIndex = Math.min(Math.floor(milestoneInfo.magnitude / 3), emojiSets.length - 1);
    const [emoji1, emoji2] = emojiSets[emojiIndex];

    return `${emoji1} ${milestoneInfo.name.toUpperCase()} MILESTONE! ${emoji2}`;
}

// Celebration function
function showCelebration(message) {
    const celebration = document.createElement('div');
    celebration.textContent = message;
    celebration.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
        color: white;
        padding: 20px;
        border-radius: 10px;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 1000;
        animation: bounce 0.5s ease-in-out;
    `;

    document.body.appendChild(celebration);

    // Remove after 2 seconds
    setTimeout(() => {
        document.body.removeChild(celebration);
    }, 2000);
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translate(-50%, -50%) translateY(0);
        }
        40% {
            transform: translate(-50%, -50%) translateY(-30px);
        }
        60% {
            transform: translate(-50%, -50%) translateY(-15px);
        }
    }
`;
document.head.appendChild(style);

// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add some dynamic content
document.addEventListener('DOMContentLoaded', function() {
    // Add current time
    const footer = document.querySelector('footer p');
    const now = new Date();
    footer.innerHTML += ` | Generated at ${now.toLocaleTimeString()}`;

    // Add random fun fact
    const funFacts = [
        "Fibonacci sequences appear everywhere in nature! 🌻",
        "The golden ratio is hidden in fibonacci numbers! ✨",
        "Half Sword Enhancer has an awesome community! ⚔️",
        "Discord bots can build websites too! 🤖",
        "yoyo's fibonacci counter once reached quintillions! 🚀"
    ];

    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    const factElement = document.createElement('p');
    factElement.textContent = `Fun fact: ${randomFact}`;
    factElement.style.cssText = `
        margin-top: 1rem;
        padding: 1rem;
        background: rgba(102, 126, 234, 0.1);
        border-radius: 5px;
        font-style: italic;
    `;

    document.querySelector('#about').appendChild(factElement);
});

console.log('🤖 Steward\'s website loaded successfully!');
console.log('Try clicking the button to see fibonacci magic! 🍪');

// ===========================================
// 🧮 GRAPHING CALCULATOR FUNCTIONALITY
// ===========================================

class GraphingCalculator {
    constructor() {
        this.canvas = document.getElementById('graph-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.functionInput = document.getElementById('function-input');
        this.coordinatesDisplay = document.getElementById('coordinates');

        // Graph settings
        this.xMin = -10;
        this.xMax = 10;
        this.yMin = -10;
        this.yMax = 10;
        this.gridSpacing = 1;

        this.setupEventListeners();
        this.drawGrid();
        this.plotFunction('sin(x)'); // Default function
    }

    setupEventListeners() {
        // Plot button
        document.getElementById('plot-button').addEventListener('click', () => {
            const func = this.functionInput.value;
            this.plotFunction(func);
        });

        // Clear button
        document.getElementById('clear-button').addEventListener('click', () => {
            this.clearGraph();
        });

        // Preset buttons
        document.getElementById('preset-sin').addEventListener('click', () => {
            this.functionInput.value = 'sin(x)';
            this.plotFunction('sin(x)');
        });

        document.getElementById('preset-cos').addEventListener('click', () => {
            this.functionInput.value = 'cos(x)';
            this.plotFunction('cos(x)');
        });

        document.getElementById('preset-parabola').addEventListener('click', () => {
            this.functionInput.value = 'x^2';
            this.plotFunction('x^2');
        });

        document.getElementById('preset-fibonacci').addEventListener('click', () => {
            this.functionInput.value = 'fibonacci(x)';
            this.plotFibonacci();
        });

        // Mouse coordinates
        this.canvas.addEventListener('mousemove', (e) => {
            this.showCoordinates(e);
        });

        // Enter key support
        this.functionInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.plotFunction(this.functionInput.value);
            }
        });
    }

    clearGraph() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGrid();
    }

    drawGrid() {
        const { width, height } = this.canvas;
        this.ctx.strokeStyle = '#e0e0e0';
        this.ctx.lineWidth = 0.5;

        // Calculate step size
        const xStep = width / (this.xMax - this.xMin);
        const yStep = height / (this.yMax - this.yMin);

        // Vertical grid lines
        for (let x = this.xMin; x <= this.xMax; x += this.gridSpacing) {
            const canvasX = (x - this.xMin) * xStep;
            this.ctx.beginPath();
            this.ctx.moveTo(canvasX, 0);
            this.ctx.lineTo(canvasX, height);
            this.ctx.stroke();
        }

        // Horizontal grid lines
        for (let y = this.yMin; y <= this.yMax; y += this.gridSpacing) {
            const canvasY = height - (y - this.yMin) * yStep;
            this.ctx.beginPath();
            this.ctx.moveTo(0, canvasY);
            this.ctx.lineTo(width, canvasY);
            this.ctx.stroke();
        }

        // Draw axes
        this.ctx.strokeStyle = '#333333';
        this.ctx.lineWidth = 2;

        // X-axis
        const yZero = height - (0 - this.yMin) * yStep;
        this.ctx.beginPath();
        this.ctx.moveTo(0, yZero);
        this.ctx.lineTo(width, yZero);
        this.ctx.stroke();

        // Y-axis
        const xZero = (0 - this.xMin) * xStep;
        this.ctx.beginPath();
        this.ctx.moveTo(xZero, 0);
        this.ctx.lineTo(xZero, height);
        this.ctx.stroke();
    }

    evaluateFunction(funcStr, x) {
        try {
            // Convert common math notation to JavaScript
            let jsFunc = funcStr
                .replace(/\^/g, '**')  // x^2 → x**2
                .replace(/sin/g, 'Math.sin')
                .replace(/cos/g, 'Math.cos')
                .replace(/tan/g, 'Math.tan')
                .replace(/log/g, 'Math.log10')
                .replace(/ln/g, 'Math.log')
                .replace(/sqrt/g, 'Math.sqrt')
                .replace(/abs/g, 'Math.abs')
                .replace(/pi/g, 'Math.PI')
                .replace(/e/g, 'Math.E')
                .replace(/x/g, `(${x})`);

            // Evaluate the function
            return Function('"use strict"; return (' + jsFunc + ')')();
        } catch (error) {
            return NaN;
        }
    }

    plotFunction(funcStr) {
        this.clearGraph();

        const { width, height } = this.canvas;
        const xStep = width / (this.xMax - this.xMin);
        const yStep = height / (this.yMax - this.yMin);

        this.ctx.strokeStyle = '#ff6b6b';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();

        let firstPoint = true;
        const step = (this.xMax - this.xMin) / width;

        for (let canvasX = 0; canvasX <= width; canvasX++) {
            const x = this.xMin + (canvasX / width) * (this.xMax - this.xMin);
            const y = this.evaluateFunction(funcStr, x);

            if (!isNaN(y) && isFinite(y)) {
                const canvasY = height - (y - this.yMin) * yStep;

                if (canvasY >= 0 && canvasY <= height) {
                    if (firstPoint) {
                        this.ctx.moveTo(canvasX, canvasY);
                        firstPoint = false;
                    } else {
                        this.ctx.lineTo(canvasX, canvasY);
                    }
                }
            } else {
                firstPoint = true;
            }
        }

        this.ctx.stroke();
    }

    plotFibonacci() {
        this.clearGraph();

        const { width, height } = this.canvas;
        this.ctx.strokeStyle = '#4ecdc4';
        this.ctx.lineWidth = 3;

        // Plot fibonacci sequence as points
        for (let n = 0; n <= 15; n++) {
            const fibValue = fibonacci(n);
            if (fibValue > this.yMax) break;

            const canvasX = (n - this.xMin) * (width / (this.xMax - this.xMin));
            const canvasY = height - (fibValue - this.yMin) * (height / (this.yMax - this.yMin));

            if (canvasX >= 0 && canvasX <= width && canvasY >= 0 && canvasY <= height) {
                this.ctx.beginPath();
                this.ctx.arc(canvasX, canvasY, 5, 0, 2 * Math.PI);
                this.ctx.fillStyle = '#4ecdc4';
                this.ctx.fill();

                // Add number labels
                this.ctx.fillStyle = '#333';
                this.ctx.font = '12px Arial';
                this.ctx.fillText(fibValue, canvasX + 8, canvasY - 8);
            }
        }
    }

    showCoordinates(event) {
        const rect = this.canvas.getBoundingClientRect();
        const canvasX = event.clientX - rect.left;
        const canvasY = event.clientY - rect.top;

        const x = this.xMin + (canvasX / this.canvas.width) * (this.xMax - this.xMin);
        const y = this.yMax - (canvasY / this.canvas.height) * (this.yMax - this.yMin);

        this.coordinatesDisplay.textContent = `Coordinates: (${x.toFixed(2)}, ${y.toFixed(2)})`;
    }
}

// Initialize the graphing calculator when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize if calculator elements exist (in case this script runs elsewhere)
    if (document.getElementById('graph-canvas')) {
        window.calculator = new GraphingCalculator();
        console.log('📊 Graphing calculator initialized!');
    }

    // Initialize video player functionality
    initializeVideoPlayer();

    // Initialize theme toggle
    initializeThemeToggle();
});

// ===========================================
// 🎥 VIDEO PLAYER FUNCTIONALITY
// ===========================================

function initializeVideoPlayer() {
    const supportButton = document.getElementById('support-button');
    const videoContainer = document.getElementById('video-container');
    const closeButton = document.getElementById('close-video');
    const video = document.getElementById('support-video');

    if (!supportButton || !videoContainer || !closeButton || !video) {
        console.log('Video player elements not found');
        return;
    }

    // Show video when support button is clicked
    supportButton.addEventListener('click', function() {
        videoContainer.classList.remove('hidden');
        video.play().catch(e => {
            console.log('Auto-play prevented:', e);
            // If autoplay is blocked, that's fine - user can click play
        });
        console.log('🎥 Support video opened!');
    });

    // Close video when X button is clicked
    closeButton.addEventListener('click', function() {
        video.pause();
        video.currentTime = 0; // Reset to beginning
        videoContainer.classList.add('hidden');
        console.log('🎥 Support video closed!');
    });

    // Close video when clicking outside the video
    videoContainer.addEventListener('click', function(e) {
        if (e.target === videoContainer) {
            video.pause();
            video.currentTime = 0;
            videoContainer.classList.add('hidden');
            console.log('🎥 Support video closed by clicking outside!');
        }
    });

    // Close video with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !videoContainer.classList.contains('hidden')) {
            video.pause();
            video.currentTime = 0;
            videoContainer.classList.add('hidden');
            console.log('🎥 Support video closed with Escape key!');
        }
    });

    console.log('🎥 Video player initialized!');
}

// ===========================================
// 🌓 DARK/LIGHT MODE TOGGLE FUNCTIONALITY
// ===========================================

function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) {
        console.log('Theme toggle button not found');
        return;
    }

    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    const isLightMode = savedTheme === 'light';

    // Set initial theme (default is dark)
    if (isLightMode) {
        document.documentElement.classList.add('light-mode');
        themeToggle.textContent = '🌙'; // Moon for dark mode option
    } else {
        document.documentElement.classList.remove('light-mode');
        themeToggle.textContent = '☀️'; // Sun for light mode option
    }

    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        const isCurrentlyLight = document.documentElement.classList.contains('light-mode');

        if (isCurrentlyLight) {
            // Switch to dark mode
            document.documentElement.classList.remove('light-mode');
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
            console.log('🌙 Switched to dark mode');
        } else {
            // Switch to light mode
            document.documentElement.classList.add('light-mode');
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
            console.log('☀️ Switched to light mode');
        }

        // Add a subtle animation effect
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });

    console.log('🌓 Theme toggle initialized! Default: Dark mode');
}