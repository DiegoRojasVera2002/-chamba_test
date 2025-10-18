// ========================================
// GLOBAL VARIABLES
// ========================================
const modal = document.getElementById('waitlistModal');
const heroCTA = document.getElementById('heroCTA');
const finalCTA = document.getElementById('finalCTA');
const closeModalBtn = document.getElementById('closeModal');
const waitlistForm = document.getElementById('waitlistForm');

// ========================================
// MODAL FUNCTIONALITY
// ========================================
function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event Listeners for Modal
heroCTA.addEventListener('click', openModal);
finalCTA.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ========================================
// FORM HANDLING
// ========================================
waitlistForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        business: document.getElementById('business').value
    };

    // Simulate form submission
    console.log('Form submitted:', formData);

    // Show success message
    const modalContent = document.querySelector('.modal-content');
    modalContent.innerHTML = `
        <div style="text-align: center; padding: 2rem 0;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
            <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem; color: var(--text-primary);">
                ¡Bienvenido a +chamba!
            </h2>
            <p style="color: var(--text-secondary); margin-bottom: 2rem; font-size: 1.125rem;">
                Gracias por unirte a la lista de espera, ${formData.name}. Te contactaremos pronto a <strong>${formData.email}</strong> con todos los detalles.
            </p>
            <button class="cta-button primary" onclick="location.reload()">
                Cerrar
            </button>
        </div>
    `;

    // Optional: Send data to a backend
    // fetch('/api/waitlist', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    // });
});

// ========================================
// FAQ ACCORDION
// ========================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all FAQ items
        faqItems.forEach(faq => faq.classList.remove('active'));

        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// HEADER SCROLL EFFECT
// ========================================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 10) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const animatedElements = document.querySelectorAll(
    '.problem-card, .step-card, .feature-card, .testimonial-card'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// HERO CARDS PARALLAX EFFECT
// ========================================
const heroCards = document.querySelectorAll('.hero-card');

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    heroCards.forEach((card, index) => {
        const depth = (index + 1) * 10;
        const moveX = (mouseX - 0.5) * depth;
        const moveY = (mouseY - 0.5) * depth;

        card.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// ========================================
// COUNTER ANIMATION (for stats)
// ========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ========================================
// FORM VALIDATION
// ========================================
const formInputs = document.querySelectorAll('.form-group input');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = '#10b981';
        }
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = '#6366f1';
    });
});

// Email validation
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value && !emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = '#ef4444';
    }
});

// ========================================
// PREVENT ANIMATIONS ON PAGE LOAD
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ========================================
// EASTER EGG: Konami Code
// ========================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Rainbow animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ========================================
// PERFORMANCE: Lazy Loading Images
// ========================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ========================================
// CONSOLE MESSAGE
// ========================================
console.log('%c+chamba', 'font-size: 48px; font-weight: bold; color: #6366f1;');
console.log('%c¿Eres desarrollador? ¡Únete a nuestro equipo!', 'font-size: 16px; color: #10b981;');
console.log('%cEnvía tu CV a: jobs@chamba.pe', 'font-size: 14px; color: #64748b;');
