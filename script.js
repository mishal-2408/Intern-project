// ========== LOADING BAR ========== //
const loadingContainer = document.querySelector('.loading-container');
const loadingProgress = document.querySelector('.loading-progress');
const loadingPercentage = document.querySelector('.loading-percentage');

let currentProgress = 0;
const targetProgress = 100;

// Simulate loading progress
function startLoadingAnimation() {
    // Slow start
    const interval = setInterval(() => {
        if (currentProgress < 30) {
            currentProgress += Math.random() * 15;
        } else if (currentProgress < 60) {
            currentProgress += Math.random() * 8;
        } else if (currentProgress < 85) {
            currentProgress += Math.random() * 4;
        } else if (currentProgress < 95) {
            currentProgress += Math.random() * 2;
        }

        currentProgress = Math.min(currentProgress, 95);
        updateLoadingBar(currentProgress);

        if (currentProgress >= 95) {
            clearInterval(interval);
        }
    }, 200);

    // Finish loading when page is fully loaded
    window.addEventListener('load', () => {
        clearInterval(interval);
        currentProgress = 100;
        updateLoadingBar(currentProgress);

        // Hide loading screen after reaching 100%
        setTimeout(() => {
            loadingContainer.classList.add('hidden');
        }, 500);
    });
}

function updateLoadingBar(progress) {
    progress = Math.round(progress);
    loadingProgress.style.width = progress + '%';
    loadingPercentage.textContent = progress;
}

// Start loading animation
startLoadingAnimation();

// ========== SMOOTH SCROLL & NAV ========== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========== PROJECT FILTER ========== //
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                if (card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            }
        });
    });
});

// ========== HAMBURGER MENU ========== //
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ========== SCROLL ANIMATIONS ========== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all elements with animation
document.querySelectorAll('.project-card, .expertise-card, .feature-card, .team-member, .feedback-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========== CONTACT FORM ========== //
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// ========== COUNTER ANIMATION ========== //
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats section is in view
const statsSection = document.querySelector('.stat');
let statsAnimated = false;

if (statsSection) {
    const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                document.querySelectorAll('.stat h4').forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.match(/\d+/)[0]);
                    animateCounter(stat, number);
                });
                statsAnimated = true;
            }
        });
    });
    
    statsObserver.observe(statsSection);
}

// ========== NAVIGATION HIGHLIGHT ========== //
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// ========== BUTTON CLICK EFFECTS ========== //
const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .view-btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// ========== ADD RIPPLE STYLES ========== //
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========== LAZY LOADING ========== //
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ========== SCROLL TO TOP BUTTON ========== //
const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '↑';
scrollTopButton.className = 'scroll-to-top';
scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 24px;
    font-weight: bold;
    display: none;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopButton.style.display = 'flex';
        scrollTopButton.style.alignItems = 'center';
        scrollTopButton.style.justifyContent = 'center';
    } else {
        scrollTopButton.style.display = 'none';
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollTopButton.addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.1)';
});

scrollTopButton.addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
});

// ========== NAVBAR BACKGROUND ON SCROLL ========== //
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ========== INITIALIZE ON LOAD ========== //
window.addEventListener('load', () => {
    console.log('Growvix - Website loaded successfully!');
});

// ========== HOME PAGE ROBOT TYPING GREETING ========== //
(function() {
    const robotTextEl = document.getElementById('robotText');
    const robotCursor = document.getElementById('robotCursor');
    if (!robotTextEl) return;

    const message = 'Hello! Welcome to Growvix.';
    let idx = 0;

    function type() {
        if (idx <= message.length) {
            robotTextEl.textContent = message.slice(0, idx);
            idx++;
            setTimeout(type, 70 + Math.random() * 80);
        } else {
            robotCursor.classList.add('blink');
        }
    }

    // Start typing a little after load completes so loading screen hides first
    window.addEventListener('load', () => setTimeout(type, 650));
})();
