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