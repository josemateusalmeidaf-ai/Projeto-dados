// Premier League 23/24 - Dashboard Interactive Animations Script
// Implements premium micro-interactions, smooth count-up animations, and layout visual polish.

document.addEventListener('DOMContentLoaded', () => {
    // Initiate KPI count-up animations
    initKpiCountUp();
    
    // Add subtle interactive tracking effect to the containers
    initGlassmorphicGlowFollower();
});

/**
 * Counts up the KPI statistic numbers smoothly from 0 to their target value on page load
 */
function initKpiCountUp() {
    const kpiNumbers = document.querySelectorAll('.kpi-number');
    const animationDuration = 1500; // Animation duration in milliseconds (1.5s)

    kpiNumbers.forEach(element => {
        const targetValue = parseFloat(element.getAttribute('data-target'));
        const decimals = parseInt(element.getAttribute('data-decimals') || '0');
        const startTime = performance.now();

        function updateNumber(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);
            
            // Cubic ease-out easing function for realistic momentum deceleration
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = easeOutProgress * targetValue;

            // Format number based on decimal configuration
            if (decimals > 0) {
                element.textContent = currentValue.toLocaleString('pt-BR', {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals
                });
            } else {
                element.textContent = Math.floor(currentValue).toLocaleString('pt-BR');
            }

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                // Ensure absolute precision on completion
                if (decimals > 0) {
                    element.textContent = targetValue.toLocaleString('pt-BR', {
                        minimumFractionDigits: decimals,
                        maximumFractionDigits: decimals
                    });
                } else {
                    element.textContent = Math.floor(targetValue).toLocaleString('pt-BR');
                }
            }
        }

        requestAnimationFrame(updateNumber);
    });
}

/**
 * Adds an extremely subtle, luxury glow tracking effect following the user's cursor
 * across the premium glassmorphic dashboard cards.
 */
function initGlassmorphicGlowFollower() {
    const cards = document.querySelectorAll('.container-grafico, .kpi-card, .intro-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x coordinate within the element.
            const y = e.clientY - rect.top;  // y coordinate within the element.

            // Inject coordinate variables directly into element's style scope
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}