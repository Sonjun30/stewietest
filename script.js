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

    // Check for milestone crossings (only trigger when crossing to new level)
    const currentMilestoneLevel = getMilestoneLevel(fibValue);
    if (currentMilestoneLevel > lastMilestoneLevel) {
        const milestoneMessage = getMilestoneMessage(currentMilestoneLevel);
        showCelebration(milestoneMessage);
        lastMilestoneLevel = currentMilestoneLevel;
    }
});

// Get milestone level based on number (0=under 1000, 1=thousands, 2=millions, etc.)
function getMilestoneLevel(number) {
    if (number < 1000) return 0;
    if (number < 1000000) return 1; // Thousands
    if (number < 1000000000) return 2; // Millions
    if (number < 1000000000000) return 3; // Billions
    return 4; // Trillions+
}

// Get celebration message for milestone level
function getMilestoneMessage(level) {
    const messages = [
        '', // Level 0 - no message
        '🎉 Thousands milestone! 🎉',
        '🚀 MILLION CLUB! 🚀',
        '💎 BILLION TERRITORY! 💎',
        '🌟 TRILLION LEGENDS! 🌟'
    ];
    return messages[level] || '🔥 ASTRONOMICAL NUMBERS! 🔥';
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