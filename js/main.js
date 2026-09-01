// ===================================
// GLOBAL VARIABLES
// ===================================

let scrollPosition = 0;
let ticking = false;

// ===================================
// INITIALIZE ON PAGE LOAD
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeParticles();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeContactForm();
    initializeSmoothScroll();
    initializeMobileMenu();
    initializeEncryptedText();
    initializeCardSpotlight();
    initializeCoverBadge();
    initializeContainerTextFlip();
    initializePointerHighlight();
    initializeEducationCanvasReveal();
    initializeGlowingEffect();
    initializeHeroHighlight();
    initializeLinkPreview();
    initializeAceternityInputs();
    initializeFollowerPointer();
    initializeNavbarMenu();
    initializeHoverBorderGradient();
    initializeColourfulText();
    initializeBookChatAnimation();
});

// ===================================
// THEME TOGGLE (DARK/LIGHT MODE)
// ===================================

function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
}

// ===================================
// NAVIGATION
// ===================================

function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scrolled class to navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Set active link on click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===================================
// MOBILE MENU
// ===================================

function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Change icon
        const icon = this.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ===================================
// PARTICLES.JS BACKGROUND
// ===================================

function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// ===================================
// SCROLL ANIMATIONS
// ===================================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                // If it's a skill item, animate the progress bar
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillBar(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===================================
// SKILL BARS ANIMATION
// ===================================

function initializeSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const progress = item.getAttribute('data-skill');
        const progressBar = item.querySelector('.skill-progress');
        if (progressBar) {
            progressBar.style.setProperty('--progress-width', progress + '%');
        }
    });
}

function animateSkillBar(skillItem) {
    if (!skillItem.classList.contains('animated')) {
        const progressBar = skillItem.querySelector('.skill-progress');
        const progress = skillItem.getAttribute('data-skill');
        
        if (progressBar) {
            setTimeout(() => {
                progressBar.style.width = progress + '%';
                skillItem.classList.add('animated');
            }, 100);
        }
    }
}

// ===================================
// SMOOTH SCROLL
// ===================================

function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// CONTACT FORM
// ===================================

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const contactSubmitBtn = document.getElementById('contactSubmitBtn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values including phone
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: (document.getElementById('phone') ? document.getElementById('phone').value.trim() : '') || 'Not provided',
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            // Validate form
            if (validateForm(formData)) {
                if (contactSubmitBtn) {
                    contactSubmitBtn.disabled = true;
                    contactSubmitBtn.innerHTML = '<span><i class="fas fa-spinner fa-spin"></i> Sending...</span>';
                }

                // Dispatch to serverless endpoint so Vishwajeet receives it directly
                fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        access_key: 'ecc07fa5-6c70-4f51-bfa6-1e961fa6623d',
                        from_name: formData.name,
                        subject: `Portfolio Contact: ${formData.subject}`,
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        message: formData.message
                    })
                }).catch(() => {});

                // Show success message
                contactForm.style.display = 'none';
                formSuccess.classList.add('show');
                
                // Allow resetting after 6 seconds
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'flex';
                    formSuccess.classList.remove('show');
                    if (contactSubmitBtn) {
                        contactSubmitBtn.disabled = false;
                        contactSubmitBtn.innerHTML = '<span><i class="fas fa-paper-plane"></i> Send Message</span><span class="btn-bottom-gradient"></span><span class="btn-bottom-gradient-glow"></span>';
                    }
                }, 6000);
            }
        });
    }
}

function validateForm(data) {
    // Basic validation
    if (!data.name || data.name.trim() === '') {
        alert('Please enter your name');
        return false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (!data.subject || data.subject.trim() === '') {
        alert('Please enter a subject');
        return false;
    }
    
    if (!data.message || data.message.trim() === '') {
        alert('Please enter a message');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

function requestTick() {
    if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
    }
}

function update() {
    ticking = false;
    const currentScrollPosition = window.pageYOffset;
    
    // Update scroll position
    scrollPosition = currentScrollPosition;
}

window.addEventListener('scroll', function() {
    scrollPosition = window.pageYOffset;
    requestTick();
});

// ===================================
// TYPING ANIMATION (Optional Enhancement)
// ===================================

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===================================
// SCROLL TO TOP BUTTON (Optional Enhancement)
// ===================================

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        box-shadow: var(--shadow-lg);
        z-index: 999;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// ===================================
// LAZY LOADING IMAGES (Optional Enhancement)
// ===================================

function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// PRELOADER (Optional Enhancement)
// ===================================

function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }, 500);
    }
}

// Hide preloader when page is fully loaded
window.addEventListener('load', hidePreloader);

// ===================================
// CURSOR TRAIL EFFECT (Optional Enhancement)
// ===================================

function createCursorTrail() {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll('.cursor-circle');
    
    if (circles.length === 0) return;
    
    circles.forEach(function(circle) {
        circle.x = 0;
        circle.y = 0;
    });
    
    window.addEventListener('mousemove', function(e) {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });
    
    function animateCircles() {
        let x = coords.x;
        let y = coords.y;
        
        circles.forEach(function(circle, index) {
            circle.style.left = x - 12 + 'px';
            circle.style.top = y - 12 + 'px';
            circle.style.transform = `scale(${(circles.length - index) / circles.length})`;
            
            circle.x = x;
            circle.y = y;
            
            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });
        
        requestAnimationFrame(animateCircles);
    }
    
    animateCircles();
}

// ===================================
// INTERSECTION OBSERVER FOR STATS COUNTER
// ===================================

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = entry.target;
                const text = target.textContent.trim();
                const isFloat = text.includes('.');
                const numMatch = text.match(/[\d.]+/);
                const number = numMatch ? parseFloat(numMatch[0]) : 0;
                const suffix = text.replace(/[\d.]/g, '');
                const decimals = isFloat ? 1 : 0;
                
                animateCounter(target, 0, number, 1800, suffix, decimals);
                target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, start, end, duration, suffix = '', decimals = 0) {
    const range = end - start;
    const steps = duration / 16;
    const increment = range / steps;
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = (decimals > 0 ? end.toFixed(decimals) : Math.round(end)) + suffix;
            clearInterval(timer);
        } else {
            element.textContent = (decimals > 0 ? current.toFixed(decimals) : Math.floor(current)) + suffix;
        }
    }, 16);
}

// Initialize counter animation
animateCounters();

// ===================================
// PROJECT FILTER (Optional Enhancement)
// ===================================

function initializeProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===================================
// ENCRYPTED TEXT ANIMATION (MATRIX REVEAL)
// ===================================

const ENCRYPTED_DEFAULT_CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?";

function generateRandomCharacter(charset) {
    return charset.charAt(Math.floor(Math.random() * charset.length));
}

function createEncryptedTextInstance(element, customOptions = {}) {
    const originalText = (element.getAttribute('data-text') || element.textContent).trim();
    if (!originalText) return;

    const revealDelayMs = parseInt(element.getAttribute('data-reveal-delay') || customOptions.revealDelayMs || 40, 10);
    const flipDelayMs = parseInt(element.getAttribute('data-flip-delay') || customOptions.flipDelayMs || 45, 10);
    const charset = customOptions.charset || ENCRYPTED_DEFAULT_CHARSET;
    const pauseBeforeLoopMs = 3500; // Hold decrypted text for 3.5s before looping

    let animationFrameId = null;
    let loopTimeoutId = null;
    let isRunning = false;
    let revealedCount = 0;

    // Build persistent DOM character spans once to prevent innerHTML thrashing
    element.innerHTML = '';
    const spanList = [];
    for (let i = 0; i < originalText.length; i++) {
        const char = originalText[i];
        if (char === ' ') {
            element.appendChild(document.createTextNode(' '));
            spanList.push(null);
        } else {
            const span = document.createElement('span');
            span.className = 'char-revealed';
            span.textContent = char;
            element.appendChild(span);
            spanList.push(span);
        }
    }

    const totalLength = originalText.length;
    let scrambleChars = [];

    function startDecryption() {
        if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        if (loopTimeoutId !== null) {
            clearTimeout(loopTimeoutId);
            loopTimeoutId = null;
        }

        isRunning = true;
        revealedCount = 0;

        // Initialize scrambled character array
        scrambleChars = [];
        for (let i = 0; i < totalLength; i++) {
            scrambleChars[i] = originalText[i] === ' ' ? ' ' : generateRandomCharacter(charset);
        }

        // Set initial encrypted state on all spans
        for (let i = 0; i < totalLength; i++) {
            const span = spanList[i];
            if (span) {
                span.className = 'char-encrypted';
                span.textContent = scrambleChars[i];
            }
        }

        const startTime = performance.now();
        let lastFlipTime = startTime;

        function tick(now) {
            const elapsedMs = now - startTime;
            const targetRevealCount = Math.min(
                totalLength,
                Math.floor(elapsedMs / Math.max(1, revealDelayMs))
            );

            // Re-randomize unrevealed characters on flipDelay interval
            const timeSinceFlip = now - lastFlipTime;
            if (timeSinceFlip >= Math.max(0, flipDelayMs)) {
                for (let i = revealedCount; i < totalLength; i++) {
                    if (originalText[i] !== ' ') {
                        scrambleChars[i] = generateRandomCharacter(charset);
                        if (i >= targetRevealCount && spanList[i]) {
                            spanList[i].textContent = scrambleChars[i];
                        }
                    }
                }
                lastFlipTime = now;
            }

            // Reveal characters up to targetRevealCount
            while (revealedCount < targetRevealCount) {
                const idx = revealedCount;
                const span = spanList[idx];
                if (span) {
                    span.className = 'char-revealed char-just-revealed';
                    span.textContent = originalText[idx];
                }
                revealedCount++;
            }

            if (revealedCount < totalLength) {
                animationFrameId = requestAnimationFrame(tick);
            } else {
                // Decryption complete! Hold text, then loop
                isRunning = false;
                animationFrameId = null;
                loopTimeoutId = setTimeout(() => {
                    startDecryption();
                }, pauseBeforeLoopMs);
            }
        }

        animationFrameId = requestAnimationFrame(tick);
    }

    // Start immediately
    startDecryption();

    // Replay on hover over the subtitle or element
    const container = element.closest('.hero-subtitle') || element;
    container.addEventListener('mouseenter', () => {
        if (!isRunning) {
            startDecryption();
        }
    });

    return {
        replay: startDecryption
    };
}

function initializeEncryptedText() {
    const encryptedElements = document.querySelectorAll('.encrypted-text');
    encryptedElements.forEach(element => {
        createEncryptedTextInstance(element);
    });
}

// ===================================
// CARD SPOTLIGHT & CANVAS REVEAL EFFECT
// ===================================

function initializeCardSpotlight() {
    const cards = document.querySelectorAll('.card-spotlight');
    if (cards.length === 0) return;

    cards.forEach(card => {
        // Create mouse spotlight overlay
        let glow = card.querySelector('.spotlight-glow');
        if (!glow) {
            glow = document.createElement('div');
            glow.className = 'spotlight-glow';
            card.prepend(glow);
        }

        // Create canvas reveal element
        let canvas = card.querySelector('.spotlight-canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.className = 'spotlight-canvas';
            card.prepend(canvas);
        }

        const ctx = canvas.getContext('2d');
        let animationFrameId = null;
        let isHovered = false;
        let mouseX = -999;
        let mouseY = -999;
        let cardWidth = 0;
        let cardHeight = 0;

        function resizeCanvas() {
            const rect = card.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            cardWidth = rect.width;
            cardHeight = rect.height;
            canvas.width = cardWidth * dpr;
            canvas.height = cardHeight * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        // Dot Matrix Configuration
        const dotSpacing = 11;
        const spotlightRadius = 220;
        const colors = [
            [59, 130, 246],  // Electric Blue
            [139, 92, 246], // Purple
            [6, 182, 212]   // Cyan
        ];

        function draw(time) {
            if (!isHovered) return;

            ctx.clearRect(0, 0, cardWidth, cardHeight);

            // Compute grid bounds near cursor
            const startX = Math.max(0, Math.floor((mouseX - spotlightRadius) / dotSpacing) * dotSpacing);
            const endX = Math.min(cardWidth, Math.ceil((mouseX + spotlightRadius) / dotSpacing) * dotSpacing);
            const startY = Math.max(0, Math.floor((mouseY - spotlightRadius) / dotSpacing) * dotSpacing);
            const endY = Math.min(cardHeight, Math.ceil((mouseY + spotlightRadius) / dotSpacing) * dotSpacing);

            const t = time * 0.003;

            for (let x = startX; x <= endX; x += dotSpacing) {
                for (let y = startY; y <= endY; y += dotSpacing) {
                    const dx = x - mouseX;
                    const dy = y - mouseY;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < spotlightRadius) {
                        const falloff = 1 - (dist / spotlightRadius);
                        const intensity = falloff * falloff;

                        // Shimmer modulation matching Aceternity CanvasRevealEffect
                        const shimmer = 0.35 + 0.65 * Math.sin(t * 3 + x * 0.3 + y * 0.2);
                        const alpha = intensity * shimmer * 0.85;

                        // Dynamic dual-tone palette
                        const colorIdx = Math.floor(Math.abs(Math.sin(x * 0.05 + y * 0.05 + t)) * colors.length) % colors.length;
                        const [r, g, b] = colors[colorIdx];

                        const dotSize = 1.2 + intensity * 1.2;

                        ctx.beginPath();
                        ctx.arc(x, y, dotSize, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                        ctx.fill();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        }

        card.addEventListener('mouseenter', (e) => {
            isHovered = true;
            resizeCanvas();
            const rect = card.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', mouseX + 'px');
            card.style.setProperty('--mouse-y', mouseY + 'px');

            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(draw);
            }
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', mouseX + 'px');
            card.style.setProperty('--mouse-y', mouseY + 'px');
        });

        card.addEventListener('mouseleave', () => {
            isHovered = false;
            card.style.setProperty('--mouse-x', '-999px');
            card.style.setProperty('--mouse-y', '-999px');
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            ctx.clearRect(0, 0, cardWidth, cardHeight);
        });

        window.addEventListener('resize', debounce(() => {
            if (isHovered) resizeCanvas();
        }, 150));
    });
}

// ===================================
// COVER "WARP SPEED" COMPONENT
// ===================================

function initializeCoverBadge() {
    const badges = document.querySelectorAll('.cover-badge');
    if (badges.length === 0) return;

    badges.forEach(badge => {
        const beamsContainer = badge.querySelector('.cover-beams');
        const canvas = badge.querySelector('.cover-sparkles');

        // Dynamically add laser beam lines
        if (beamsContainer && beamsContainer.children.length === 0) {
            const beamCount = 3;
            for (let i = 0; i < beamCount; i++) {
                const line = document.createElement('div');
                line.className = 'cover-beam-line';
                line.style.top = `${((i + 1) * (100 / (beamCount + 1)))}%`;
                line.style.setProperty('--beam-duration', `${1.8 + Math.random() * 1.4}s`);
                line.style.setProperty('--beam-delay', `${Math.random() * 1.5}s`);
                beamsContainer.appendChild(line);
            }
        }

        // Sparkles Canvas effect on hover
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let isHovered = false;
            let animId = null;
            let particles = [];

            function resize() {
                const rect = badge.getBoundingClientRect();
                const dpr = window.devicePixelRatio || 1;
                canvas.width = rect.width * dpr;
                canvas.height = rect.height * dpr;
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            }

            function initParticles() {
                const rect = badge.getBoundingClientRect();
                particles = [];
                const count = 22;
                for (let i = 0; i < count; i++) {
                    particles.push({
                        x: Math.random() * rect.width,
                        y: Math.random() * rect.height,
                        vx: (Math.random() - 0.5) * 1.5,
                        vy: (Math.random() - 0.5) * 1.5,
                        size: 0.6 + Math.random() * 1.2,
                        alpha: 0.2 + Math.random() * 0.8,
                        color: Math.random() > 0.4 ? '#ffffff' : '#38bdf8'
                    });
                }
            }

            function draw() {
                if (!isHovered) return;
                const rect = badge.getBoundingClientRect();
                ctx.clearRect(0, 0, rect.width, rect.height);

                particles.forEach(p => {
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0) p.x = rect.width;
                    if (p.x > rect.width) p.x = 0;
                    if (p.y < 0) p.y = rect.height;
                    if (p.y > rect.height) p.y = 0;

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = p.alpha;
                    ctx.fill();
                });
                ctx.globalAlpha = 1;

                animId = requestAnimationFrame(draw);
            }

            badge.addEventListener('mouseenter', () => {
                isHovered = true;
                resize();
                initParticles();
                if (!animId) animId = requestAnimationFrame(draw);
            });

            badge.addEventListener('mouseleave', () => {
                isHovered = false;
                if (animId) {
                    cancelAnimationFrame(animId);
                    animId = null;
                }
                const rect = badge.getBoundingClientRect();
                ctx.clearRect(0, 0, rect.width, rect.height);
            });
        }
    });
}

// ===================================
// CONTAINER TEXT FLIP COMPONENT
// ===================================

function initializeContainerTextFlip() {
    const flipContainers = document.querySelectorAll('.container-text-flip');
    if (flipContainers.length === 0) return;

    flipContainers.forEach(container => {
        const wordsData = container.getAttribute('data-words');
        let words = ["AI SaaS Platforms", "Autonomous AI Agents", "Full Stack Web Apps", "Enterprise Pipelines"];
        if (wordsData) {
            try {
                words = JSON.parse(wordsData);
            } catch (e) {
                console.warn('Could not parse data-words JSON:', e);
            }
        }

        let currentIndex = 0;
        const intervalMs = 2800;

        function setWord(word) {
            let inner = container.querySelector('.flip-text-inner');
            if (!inner) {
                inner = document.createElement('span');
                inner.className = 'flip-text-inner';
                container.innerHTML = '';
                container.appendChild(inner);
            }

            inner.innerHTML = '';
            for (let i = 0; i < word.length; i++) {
                const char = word[i];
                if (char === ' ') {
                    inner.appendChild(document.createTextNode(' '));
                } else {
                    const span = document.createElement('span');
                    span.className = 'flip-letter';
                    span.textContent = char;
                    span.style.animationDelay = `${i * 22}ms`;
                    inner.appendChild(span);
                }
            }

            // Dynamically animate container width with padding
            requestAnimationFrame(() => {
                const padding = container.classList.contains('subtitle-flip') ? 48 : 30;
                const measuredWidth = inner.scrollWidth + padding;
                container.style.width = `${measuredWidth}px`;
            });
        }

        // Initialize with first word
        setWord(words[0]);

        // Auto-cycle through words
        setInterval(() => {
            currentIndex = (currentIndex + 1) % words.length;
            setWord(words[currentIndex]);
        }, intervalMs);
    });
}

// ===================================
// POINTER HIGHLIGHT COMPONENT
// ===================================

function initializePointerHighlight() {
    const highlights = document.querySelectorAll('.pointer-highlight');
    if (highlights.length === 0) return;

    highlights.forEach((el, index) => {
        // Ensure box element exists
        let box = el.querySelector('.ph-box');
        if (!box) {
            box = document.createElement('span');
            box.className = 'ph-box';
            el.appendChild(box);
        }

        // Ensure cursor element exists
        let cursor = el.querySelector('.ph-cursor');
        if (!cursor) {
            cursor = document.createElement('span');
            cursor.className = 'ph-cursor';

            const badgeText = el.getAttribute('data-badge') || '';
            cursor.innerHTML = `
                <svg class="ph-cursor-icon" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
                </svg>
                ${badgeText ? `<span class="ph-badge">${badgeText}</span>` : ''}
            `;
            el.appendChild(cursor);
        }

        function triggerHighlight() {
            el.classList.remove('ph-active');
            void el.offsetWidth; // force reflow for animation restart
            el.classList.add('ph-active');
        }

        // Trigger when scrolled into view
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            el.classList.add('ph-active');
                        }, index * 220);
                        observer.unobserve(el);
                    }
                });
            }, { threshold: 0.2 });
            observer.observe(el);
        } else {
            el.classList.add('ph-active');
        }

        // Replay on hover
        el.addEventListener('mouseenter', () => {
            triggerHighlight();
        });
    });
}

// ===================================
// CANVAS REVEAL EFFECT (EDUCATION CARDS)
// ===================================

function initializeEducationCanvasReveal() {
    const cards = document.querySelectorAll('.canvas-reveal-card');
    if (cards.length === 0) return;

    cards.forEach(card => {
        const canvas = card.querySelector('.canvas-reveal-layer');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let isHovered = false;
        let animationFrameId = null;
        let mouseX = 0;
        let mouseY = 0;
        let startTime = performance.now();

        let colors = [
            [236, 72, 153],
            [232, 121, 249],
            [168, 85, 247]
        ];

        const rawColors = card.getAttribute('data-colors');
        if (rawColors) {
            try {
                colors = JSON.parse(rawColors);
            } catch (e) {
                console.warn('Could not parse data-colors:', e);
            }
        }

        let width = 0;
        let height = 0;
        const totalSize = 10;
        const dotSize = 2.2;

        function resizeCanvas() {
            const rect = card.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            width = rect.width;
            height = rect.height;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function draw(now) {
            if (!isHovered) return;

            const time = (now - startTime) * 0.0025;
            ctx.clearRect(0, 0, width, height);

            const cols = Math.ceil(width / totalSize);
            const rows = Math.ceil(height / totalSize);

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = c * totalSize + totalSize / 2;
                    const y = r * totalSize + totalSize / 2;

                    const dist = Math.hypot(x - mouseX, y - mouseY);
                    const wave = Math.sin(c * 0.25 + r * 0.25 + time * 3);
                    const rand = Math.sin(c * 12.9898 + r * 78.233 + Math.floor(time * 2));
                    
                    if (rand < 0.2 && dist > 140) continue;

                    let alpha = 0.2 + (wave + 1) * 0.25;
                    if (dist < 120) {
                        alpha = Math.min(1.0, alpha + (120 - dist) / 120 * 0.6);
                    }

                    const colorIndex = (c + r) % colors.length;
                    const [red, green, blue] = colors[colorIndex];

                    ctx.beginPath();
                    ctx.arc(x, y, dotSize, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
                    ctx.fill();
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        }

        card.addEventListener('mouseenter', (e) => {
            isHovered = true;
            resizeCanvas();
            const rect = card.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            startTime = performance.now();
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(draw);
            }
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });

        card.addEventListener('mouseleave', () => {
            isHovered = false;
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            ctx.clearRect(0, 0, width, height);
        });

        window.addEventListener('resize', debounce(() => {
            if (isHovered) resizeCanvas();
        }, 150));
    });
}

// ===================================
// GLOWING EFFECT (BORDER & GLOW)
// ===================================

function initializeGlowingEffect() {
    const cards = document.querySelectorAll('.glowing-effect-card');
    if (cards.length === 0) return;

    cards.forEach(card => {
        // Inject glowing blur layer if not present
        let glowBlur = card.querySelector('.glowing-glow-blur');
        if (!glowBlur) {
            glowBlur = document.createElement('div');
            glowBlur.className = 'glowing-glow-blur';
            card.prepend(glowBlur);
        }

        // Inject glowing border layer if not present
        let borderLayer = card.querySelector('.glowing-border-layer');
        if (!borderLayer) {
            borderLayer = document.createElement('div');
            borderLayer.className = 'glowing-border-layer';
            card.prepend(borderLayer);
        }

        let currentAngle = 0;
        let targetAngle = 0;
        let isMoving = false;
        let animId = null;

        function update() {
            const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
            currentAngle += angleDiff * 0.18;
            card.style.setProperty('--start', currentAngle.toFixed(2));

            if (Math.abs(angleDiff) > 0.1) {
                animId = requestAnimationFrame(update);
            } else {
                isMoving = false;
                animId = null;
            }
        }

        function handlePointerMove(e) {
            const rect = card.getBoundingClientRect();
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const proximity = 70;

            const isNear = (
                mouseX > rect.left - proximity &&
                mouseX < rect.right + proximity &&
                mouseY > rect.top - proximity &&
                mouseY < rect.bottom + proximity
            );

            card.style.setProperty('--active', isNear ? '1' : '0');

            if (!isNear) return;

            const center = [rect.left + rect.width * 0.5, rect.top + rect.height * 0.5];
            targetAngle = (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) / Math.PI + 90;

            if (!isMoving) {
                isMoving = true;
                animId = requestAnimationFrame(update);
            }
        }

        window.addEventListener('pointermove', handlePointerMove, { passive: true });
    });
}

// ===================================
// HERO HIGHLIGHT (DOT MATRIX FLASHLIGHT & SWEEP MARKER)
// ===================================

function initializeHeroHighlight() {
    const hero = document.querySelector('.hero-highlight');
    if (hero) {
        function handlePointerMove(e) {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            hero.style.setProperty('--hh-x', `${x}px`);
            hero.style.setProperty('--hh-y', `${y}px`);
            hero.classList.add('hh-active');
        }

        hero.addEventListener('pointermove', handlePointerMove, { passive: true });
        hero.addEventListener('pointerleave', () => {
            hero.classList.remove('hh-active');
        });
    }

    // Trigger highlighter marker sweep on text
    const markers = document.querySelectorAll('.highlight-marker');
    if (markers.length > 0) {
        setTimeout(() => {
            markers.forEach(marker => {
                marker.classList.add('marker-active');
            });
        }, 600);
    }
}

// ===================================
// LINK PREVIEW COMPONENT
// ===================================

function initializeLinkPreview() {
    // Inject single global popover if not present
    let popover = document.getElementById('globalLinkPreview');
    if (!popover) {
        popover = document.createElement('div');
        popover.id = 'globalLinkPreview';
        popover.className = 'link-preview-popup';
        popover.innerHTML = `
            <div class="link-preview-card">
                <div class="link-preview-skeleton"><i class="fas fa-spinner fa-spin"></i></div>
                <img class="link-preview-image" alt="Preview" />
                <div class="link-preview-footer">
                    <span class="link-preview-host"></span>
                    <i class="fas fa-external-link-alt"></i>
                </div>
            </div>
        `;
        document.body.appendChild(popover);
    }

    const card = popover.querySelector('.link-preview-card');
    const img = popover.querySelector('.link-preview-image');
    const skeleton = popover.querySelector('.link-preview-skeleton');
    const hostEl = popover.querySelector('.link-preview-host');

    const previewLinks = document.querySelectorAll('.link-preview');
    if (previewLinks.length === 0) return;

    previewLinks.forEach(link => {
        let hideTimeout = null;

        function getPreviewSrc(url, staticImg) {
            if (staticImg) return staticImg;
            const encoded = encodeURIComponent(url);
            return `https://api.microlink.io/?url=${encoded}&screenshot=true&embed=screenshot.url&viewport.width=600&viewport.height=380&viewport.deviceScaleFactor=1`;
        }

        link.addEventListener('mouseenter', () => {
            clearTimeout(hideTimeout);
            const url = link.getAttribute('data-preview-url') || link.getAttribute('href');
            if (!url) return;

            const staticImg = link.getAttribute('data-preview-img');
            const previewSrc = getPreviewSrc(url, staticImg);

            try {
                const parsed = new URL(url.startsWith('http') ? url : window.location.origin + '/' + url);
                hostEl.textContent = parsed.hostname;
            } catch (e) {
                hostEl.textContent = url;
            }

            skeleton.style.opacity = '1';
            img.style.opacity = '0';
            img.src = previewSrc;

            img.onload = () => {
                skeleton.style.opacity = '0';
                img.style.opacity = '1';
            };

            img.onerror = () => {
                skeleton.style.opacity = '0';
                img.style.opacity = '1';
            };

            // Position centered above the link
            const rect = link.getBoundingClientRect();
            const popWidth = 220;
            const popHeight = 140;
            let left = rect.left + rect.width / 2 - popWidth / 2;
            let top = rect.top - popHeight - 12;

            // Keep within viewport horizontally
            left = Math.max(10, Math.min(window.innerWidth - popWidth - 10, left));
            if (top < 10) {
                top = rect.bottom + 12;
            }

            popover.style.left = `${left}px`;
            popover.style.top = `${top}px`;
            popover.classList.add('active');
        });

        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const tilt = (offsetX - rect.width / 2) * 0.35;
            card.style.transform = `translateX(${tilt.toFixed(1)}px)`;
        });

        link.addEventListener('mouseleave', () => {
            hideTimeout = setTimeout(() => {
                popover.classList.remove('active');
                card.style.transform = '';
            }, 100);
        });
    });
}

// ===================================
// ACETERNITY INTERACTIVE GLOWING INPUTS
// ===================================

function initializeAceternityInputs() {
    const inputWrappers = document.querySelectorAll('.acet-input-wrapper');
    if (inputWrappers.length === 0) return;

    inputWrappers.forEach(wrapper => {
        const radius = 100; // radius of glowing gradient

        wrapper.addEventListener('mouseenter', () => {
            wrapper.style.setProperty('--input-radius', `${radius}px`);
        });

        wrapper.addEventListener('mouseleave', () => {
            wrapper.style.setProperty('--input-radius', '0px');
        });

        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            wrapper.style.setProperty('--input-x', `${x}px`);
            wrapper.style.setProperty('--input-y', `${y}px`);
        });
    });
}

// ===================================
// FOLLOWER POINTER (COLLABORATIVE CURSOR)
// ===================================

function initializeFollowerPointer() {
    const cards = document.querySelectorAll('.follower-pointer-card');
    if (cards.length === 0) return;

    cards.forEach(card => {
        let badge = card.querySelector('.follower-pointer-badge');
        if (!badge) {
            badge = document.createElement('div');
            badge.className = 'follower-pointer-badge';
            badge.innerHTML = `
                <svg stroke="currentColor" fill="currentColor" stroke-width="1" viewBox="0 0 16 16" class="pointer-arrow" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
                </svg>
                <div class="pointer-title-tag">
                    <img src="assets/pro2 bg remove.png" class="pointer-avatar" alt="Avatar" />
                    <span class="pointer-text"></span>
                </div>
            `;
            card.appendChild(badge);
        }

        const title = card.getAttribute('data-pointer-title') || 'Vishwajeet';
        const color = card.getAttribute('data-pointer-color') || '#3b82f6';

        const arrow = badge.querySelector('.pointer-arrow');
        const titleTag = badge.querySelector('.pointer-title-tag');
        const textSpan = badge.querySelector('.pointer-text');

        textSpan.textContent = title;
        arrow.style.color = color;
        titleTag.style.backgroundColor = color;

        card.addEventListener('mouseenter', () => {
            badge.classList.add('active');
        });

        card.addEventListener('mouseleave', () => {
            badge.classList.remove('active');
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            badge.style.left = `${x}px`;
            badge.style.top = `${y}px`;
        });
    });
}

// ===================================
// ACETERNITY NAVBAR MENU POPOVERS
// ===================================

function initializeNavbarMenu() {
    const dropdownItems = document.querySelectorAll('.nav-item-dropdown');
    if (dropdownItems.length === 0) return;

    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const popover = item.querySelector('.nav-dropdown-menu');

        // Toggle on mobile click
        if (link) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    item.classList.toggle('dropdown-active');
                }
            });
        }

        // Close on clicking links inside popover
        if (popover) {
            popover.querySelectorAll('a').forEach(sublink => {
                sublink.addEventListener('click', () => {
                    item.classList.remove('dropdown-active');
                    const navMenu = document.getElementById('navMenu');
                    if (navMenu && window.innerWidth <= 992) {
                        navMenu.classList.remove('active');
                        const toggle = document.getElementById('mobileMenuToggle');
                        if (toggle) toggle.classList.remove('active');
                    }
                });
            });
        }
    });

    // Close any open mobile dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-item-dropdown')) {
            dropdownItems.forEach(item => item.classList.remove('dropdown-active'));
        }
    });
}

// ===================================
// ACETERNITY HOVER BORDER GRADIENT
// ===================================

function initializeHoverBorderGradient() {
    const elements = document.querySelectorAll('.hover-border-gradient');
    if (elements.length === 0) return;

    const movingMap = {
        TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
        RIGHT: "radial-gradient(16.2% 41.2% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
        BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
        LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)"
    };

    const highlight = "radial-gradient(75% 181.2% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)";
    const directions = ["TOP", "RIGHT", "BOTTOM", "LEFT"];

    elements.forEach(el => {
        let motionLayer = el.querySelector('.hbg-motion-border');
        if (!motionLayer) {
            motionLayer = document.createElement('div');
            motionLayer.className = 'hbg-motion-border';
            el.prepend(motionLayer);
        }

        let innerBg = el.querySelector('.hbg-inner-bg');
        if (!innerBg) {
            innerBg = document.createElement('div');
            innerBg.className = 'hbg-inner-bg';
            el.insertBefore(innerBg, motionLayer.nextSibling);
        }

        let currentIndex = 0;
        let isHovered = false;
        const durationSec = parseFloat(el.getAttribute('data-duration') || '1');
        const durationMs = durationSec * 1000;

        motionLayer.style.background = movingMap[directions[currentIndex]];

        setInterval(() => {
            if (!isHovered) {
                currentIndex = (currentIndex + 1) % directions.length;
                motionLayer.style.background = movingMap[directions[currentIndex]];
            }
        }, durationMs);

        el.addEventListener('mouseenter', () => {
            isHovered = true;
            motionLayer.style.background = highlight;
        });

        el.addEventListener('mouseleave', () => {
            isHovered = false;
            motionLayer.style.background = movingMap[directions[currentIndex]];
        });
    });
}

// ===================================
// ACETERNITY COLOURFUL TEXT
// ===================================

function initializeColourfulText() {
    const elements = document.querySelectorAll('.colourful-text');
    if (elements.length === 0) return;

    const colors = [
        "rgb(131, 179, 32)",
        "rgb(47, 195, 106)",
        "rgb(42, 169, 210)",
        "rgb(4, 112, 202)",
        "rgb(107, 10, 255)",
        "rgb(183, 0, 218)",
        "rgb(218, 0, 171)",
        "rgb(230, 64, 92)",
        "rgb(232, 98, 63)",
        "rgb(249, 129, 47)",
    ];

    elements.forEach(el => {
        const text = el.getAttribute('data-text') || el.textContent.trim();
        el.innerHTML = '';
        el.setAttribute('aria-label', text);

        let currentColors = [...colors];
        const chars = [];

        Array.from(text).forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'colourful-char';
            span.textContent = char;
            span.style.color = currentColors[index % currentColors.length];
            el.appendChild(span);
            chars.push(span);
        });

        function triggerShuffleWave() {
            currentColors = [...colors].sort(() => Math.random() - 0.5);

            chars.forEach((span, index) => {
                const delay = index * 50;

                setTimeout(() => {
                    span.classList.remove('animating');
                    void span.offsetWidth;
                    span.style.color = currentColors[index % currentColors.length];
                    span.classList.add('animating');

                    setTimeout(() => {
                        span.classList.remove('animating');
                    }, 550);
                }, delay);
            });
        }

        // Automatic shuffle interval every 5000ms
        setInterval(triggerShuffleWave, 5000);

        // Hover triggers instant wave
        el.addEventListener('mouseenter', () => {
            triggerShuffleWave();
        });
    });
}

// ===================================
// ACETERNITY PRODUCTIZED AGENCY "CHAT / BOOK" COMPONENT (CAL.COM)
// ===================================

function initializeBookChatAnimation() {
    const chatButtons = document.querySelectorAll('.book-chat-btn');
    const modalOverlay = document.getElementById('chatModalOverlay');
    const modalClose = document.getElementById('chatModalClose');
    const bookingView = document.getElementById('calBookingView');
    const detailsPanel = document.getElementById('calDetailsPanel');
    const slotsPanel = document.getElementById('calTimeSlotsPanel');
    const successView = document.getElementById('calSuccessView');
    const doneBtn = document.getElementById('calDoneBtn');
    const backToSlotsBtn = document.getElementById('calBackToSlots');
    const bookingForm = document.getElementById('calBookingForm');

    const calMonthYear = document.getElementById('calMonthYear');
    const calPrevMonth = document.getElementById('calPrevMonth');
    const calNextMonth = document.getElementById('calNextMonth');
    const calDaysGrid = document.getElementById('calDaysGrid');
    const calSlotsDate = document.getElementById('calSlotsDate');
    const calSlotsContainer = document.getElementById('calSlotsContainer');
    const calSelectedPillText = document.getElementById('calSelectedPillText');
    const calSuccessDate = document.getElementById('calSuccessDate');
    const calSuccessTime = document.getElementById('calSuccessTime');
    const calGcalLink = document.getElementById('calGcalLink');
    const calWhatsappLink = document.getElementById('calWhatsappLink');

    if (!modalOverlay) return;

    // Available daily time slots: strictly 3:00 PM to 9:00 PM everyday
    const dailySlots = [
        "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
        "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
        "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM", "09:00 PM"
    ];

    let currentDate = new Date();
    let viewYear = currentDate.getFullYear();
    let viewMonth = currentDate.getMonth();

    // Default selected date: tomorrow if past 9:00 PM today, otherwise today
    let selectedDate = new Date();
    if (currentDate.getHours() >= 21) {
        selectedDate.setDate(selectedDate.getDate() + 1);
    }
    let selectedSlot = "04:00 PM";
    let selectedDuration = 30; // 30 or 15 mins
    const calLinks = {
        30: 'https://cal.com/vishwajeet-srk/30min',
        15: 'https://cal.com/vishwajeet-srk/15min'
    };

    const dur30Btn = document.getElementById('dur30Btn');
    const dur15Btn = document.getElementById('dur15Btn');
    const calHostTitle = document.getElementById('calHostTitle');
    const calDirectLink = document.getElementById('calDirectLink');
    const calSuccessDirectLink = document.getElementById('calSuccessDirectLink');

    function setDuration(dur) {
        selectedDuration = dur;
        if (dur30Btn) dur30Btn.classList.toggle('active', dur === 30);
        if (dur15Btn) dur15Btn.classList.toggle('active', dur === 15);
        if (calHostTitle) {
            calHostTitle.textContent = dur === 15 ? '15 Min Quick Chat' : '30 Min Chat';
        }
        if (calDirectLink) {
            calDirectLink.href = calLinks[dur];
        }
        if (calSuccessDirectLink) {
            calSuccessDirectLink.href = calLinks[dur];
        }
        updateSelectedPill();
    }

    if (dur30Btn) dur30Btn.addEventListener('click', () => setDuration(30));
    if (dur15Btn) dur15Btn.addEventListener('click', () => setDuration(15));

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    function formatDayHeader(date) {
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }

    function formatFullDate(date) {
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    }

    // Render Slots with Cal.com split Confirm button interaction
    function renderTimeSlots() {
        if (!calSlotsContainer) return;
        if (calSlotsDate) {
            calSlotsDate.textContent = formatDayHeader(selectedDate);
        }
        calSlotsContainer.innerHTML = '';

        dailySlots.forEach(slotTime => {
            const row = document.createElement('div');
            row.className = 'cal-slot-row';
            if (slotTime === selectedSlot) {
                row.classList.add('active');
            }

            const slotBtn = document.createElement('button');
            slotBtn.type = 'button';
            slotBtn.className = 'cal-slot-btn';
            slotBtn.textContent = slotTime;

            slotBtn.addEventListener('click', () => {
                selectedSlot = slotTime;
                renderTimeSlots();
            });

            row.appendChild(slotBtn);

            // Cal.com style: When active, render animated Confirm Pill
            if (slotTime === selectedSlot) {
                const confirmPill = document.createElement('button');
                confirmPill.type = 'button';
                confirmPill.className = 'cal-confirm-pill';
                confirmPill.textContent = 'Confirm';

                confirmPill.addEventListener('click', () => {
                    updateSelectedPill();
                    if (slotsPanel) slotsPanel.style.display = 'none';
                    if (detailsPanel) detailsPanel.style.display = 'flex';
                });

                row.appendChild(confirmPill);
            }

            calSlotsContainer.appendChild(row);
        });
    }

    function updateSelectedPill() {
        if (calSelectedPillText) {
            calSelectedPillText.textContent = `${formatDayHeader(selectedDate)} at ${selectedSlot} (${selectedDuration} mins)`;
        }
    }

    // Render Calendar Month Grid
    function renderCalendar() {
        if (!calDaysGrid || !calMonthYear) return;

        calMonthYear.textContent = `${monthNames[viewMonth]} ${viewYear}`;
        calDaysGrid.innerHTML = '';

        const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
        let startDay = firstDayOfMonth.getDay();
        startDay = (startDay === 0) ? 6 : startDay - 1; // Mon = 0, Sun = 6

        const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < startDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'cal-day-cell empty';
            calDaysGrid.appendChild(emptyCell);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayBtn = document.createElement('button');
            dayBtn.type = 'button';
            dayBtn.className = 'cal-day-cell';
            dayBtn.textContent = day;

            const thisDate = new Date(viewYear, viewMonth, day);
            thisDate.setHours(0, 0, 0, 0);

            if (thisDate < today) {
                dayBtn.classList.add('disabled');
                dayBtn.disabled = true;
            } else {
                if (thisDate.getTime() === today.getTime()) {
                    dayBtn.classList.add('today');
                }
                const isSelected = selectedDate &&
                    thisDate.getFullYear() === selectedDate.getFullYear() &&
                    thisDate.getMonth() === selectedDate.getMonth() &&
                    thisDate.getDate() === selectedDate.getDate();

                if (isSelected) {
                    dayBtn.classList.add('selected');
                }

                dayBtn.addEventListener('click', () => {
                    selectedDate = new Date(viewYear, viewMonth, day);
                    renderCalendar();
                    renderTimeSlots();
                });
            }

            calDaysGrid.appendChild(dayBtn);
        }
    }

    if (calPrevMonth) {
        calPrevMonth.addEventListener('click', () => {
            viewMonth--;
            if (viewMonth < 0) {
                viewMonth = 11;
                viewYear--;
            }
            renderCalendar();
        });
    }

    if (calNextMonth) {
        calNextMonth.addEventListener('click', () => {
            viewMonth++;
            if (viewMonth > 11) {
                viewMonth = 0;
                viewYear++;
            }
            renderCalendar();
        });
    }

    if (backToSlotsBtn) {
        backToSlotsBtn.addEventListener('click', () => {
            if (detailsPanel) detailsPanel.style.display = 'none';
            if (slotsPanel) slotsPanel.style.display = 'flex';
        });
    }

    function openModal() {
        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        if (bookingView) bookingView.style.display = 'grid';
        if (slotsPanel) slotsPanel.style.display = 'flex';
        if (detailsPanel) detailsPanel.style.display = 'none';
        if (successView) successView.style.display = 'none';

        renderCalendar();
        renderTimeSlots();
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    chatButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Form Submission: Schedule Call
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('calName').value.trim();
            const email = document.getElementById('calEmail').value.trim();
            const notes = (document.getElementById('calNotes') ? document.getElementById('calNotes').value.trim() : '') || '1-on-1 Discussion';

            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');

            let [timePart, meridiem] = selectedSlot.split(' ');
            let [hours, mins] = timePart.split(':');
            let h = parseInt(hours, 10);
            if (meridiem === 'PM' && h !== 12) h += 12;
            if (meridiem === 'AM' && h === 12) h = 0;

            // Calculate Indian Standard Time (IST: UTC+05:30) to strict UTC dates
            const yearNum = selectedDate.getFullYear();
            const monthIdx = selectedDate.getMonth();
            const dayNum = selectedDate.getDate();
            const minsNum = parseInt(mins, 10);

            const startUtc = new Date(Date.UTC(yearNum, monthIdx, dayNum, h - 5, minsNum - 30, 0));
            const endUtc = new Date(startUtc.getTime() + selectedDuration * 60000);

            function toGcalUtc(d) {
                const y = d.getUTCFullYear();
                const mo = String(d.getUTCMonth() + 1).padStart(2, '0');
                const da = String(d.getUTCDate()).padStart(2, '0');
                const ho = String(d.getUTCHours()).padStart(2, '0');
                const mi = String(d.getUTCMinutes()).padStart(2, '0');
                const se = String(d.getUTCSeconds()).padStart(2, '0');
                return `${y}${mo}${da}T${ho}${mi}${se}Z`;
            }

            const gcalStart = toGcalUtc(startUtc);
            const gcalEnd = toGcalUtc(endUtc);
            const startIsoUtc = startUtc.toISOString();
            const endIsoUtc = endUtc.toISOString();

            // Calculate formatted meeting end time string in IST
            let endH = h;
            let endM = minsNum + selectedDuration;
            if (endM >= 60) {
                endM -= 60;
                endH += 1;
            }
            let endPeriod = endH >= 12 ? 'PM' : 'AM';
            let endDisplayH = endH % 12;
            if (endDisplayH === 0) endDisplayH = 12;
            const endTimeStr = `${String(endDisplayH).padStart(2, '0')}:${String(endM).padStart(2, '0')} ${endPeriod}`;

            const meetingName = selectedDuration === 15 ? `15 Min Quick Chat` : `30 Min Chat`;
            const googleMeetUrl = 'https://meet.google.com/new';

            // Populate Success Screen details
            const calSuccessWhat = document.getElementById('calSuccessWhat');
            const calSuccessWhen = document.getElementById('calSuccessWhen');
            const calGuestNameWho = document.getElementById('calGuestNameWho');
            const calGuestEmailWho = document.getElementById('calGuestEmailWho');
            const calMeetDirectLink = document.getElementById('calMeetDirectLink');

            if (calSuccessWhat) {
                calSuccessWhat.innerHTML = `${meetingName} between Vishwajeet and <span id="calGuestNameDisplay">${name}</span>`;
            }
            if (calSuccessWhen) {
                calSuccessWhen.textContent = `${formatFullDate(selectedDate)}, ${selectedSlot} – ${endTimeStr} (India Standard Time)`;
            }
            if (calGuestNameWho) calGuestNameWho.textContent = name;
            if (calGuestEmailWho) calGuestEmailWho.textContent = email;
            if (calMeetDirectLink) {
                calMeetDirectLink.href = googleMeetUrl;
            }

            // 1. Real Google Calendar Link with UTC time, attendee auto-invite & Google Meet
            const calGcal = document.getElementById('calGcalLink');
            if (calGcal) {
                const gcalDetails = `Chat with Vishwajeet (AI Software Engineer)\n\n` +
                    `📌 Topic: ${notes}\n` +
                    `👤 Host: Vishwajeet (vishwajeetsrk@gmail.com)\n` +
                    `👤 Guest: ${name} (${email})\n` +
                    `🎥 Google Meet: ${googleMeetUrl}\n\n` +
                    `Looking forward to our conversation!`;

                let gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE` +
                    `&text=${encodeURIComponent(`${meetingName}: Vishwajeet & ${name}`)}` +
                    `&dates=${gcalStart}/${gcalEnd}` +
                    `&ctz=Asia/Kolkata` +
                    `&location=${encodeURIComponent(googleMeetUrl)}` +
                    `&details=${encodeURIComponent(gcalDetails)}`;

                if (email && email.toLowerCase() !== 'vishwajeetsrk@gmail.com') {
                    gcalUrl += `&add=${encodeURIComponent(email)}`;
                }

                calGcal.href = gcalUrl;
            }

            // 2. Real Outlook Web / Office 365 Deeplink with ISO UTC dates
            const calOutlook = document.getElementById('calOutlookLink');
            if (calOutlook) {
                const outlookBody = `Chat with Vishwajeet (AI Software Engineer)\n\n` +
                    `Topic: ${notes}\n` +
                    `Host: Vishwajeet (vishwajeetsrk@gmail.com)\n` +
                    `Guest: ${name} (${email})\n` +
                    `Video Call: Google Meet (${googleMeetUrl})`;

                const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent` +
                    `&subject=${encodeURIComponent(`${meetingName}: Vishwajeet & ${name}`)}` +
                    `&startdt=${encodeURIComponent(startIsoUtc)}` +
                    `&enddt=${encodeURIComponent(endIsoUtc)}` +
                    `&location=${encodeURIComponent(`Google Meet (${googleMeetUrl})`)}` +
                    `&body=${encodeURIComponent(outlookBody)}`;

                calOutlook.href = outlookUrl;
            }

            // 3. Real Native RFC 5545 ICS File Download via direct data URI
            const calIcsLink = document.getElementById('calIcsDownloadLink');
            if (calIcsLink) {
                const nowIso = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
                const uid = `meet-${Date.now()}-${Math.random().toString(36).substr(2, 8)}@vishwajeetsrk.github.io`;
                const cleanNotes = notes.replace(/(\r\n|\n|\r)/gm, ' ');

                const icsLines = [
                    'BEGIN:VCALENDAR',
                    'VERSION:2.0',
                    'PRODID:-//Vishwajeet SRK//Chat with Vishwajeet//EN',
                    'CALSCALE:GREGORIAN',
                    'METHOD:REQUEST',
                    'BEGIN:VEVENT',
                    `UID:${uid}`,
                    `DTSTAMP:${nowIso}`,
                    `DTSTART:${gcalStart}`,
                    `DTEND:${gcalEnd}`,
                    `SUMMARY:${meetingName}: Vishwajeet & ${name}`,
                    `DESCRIPTION:Meeting with Vishwajeet\\nTopic: ${cleanNotes}\\nHost: Vishwajeet (vishwajeetsrk@gmail.com)\\nGuest: ${name} (${email})\\nGoogle Meet: ${googleMeetUrl}`,
                    `LOCATION:Google Meet (${googleMeetUrl})`,
                    `URL:${googleMeetUrl}`,
                    'ORGANIZER;CN="Vishwajeet":mailto:vishwajeetsrk@gmail.com',
                    `ATTENDEE;CUTYPE=INDIVIDUAL;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN="${name}":mailto:${email}`,
                    'STATUS:CONFIRMED',
                    'SEQUENCE:0',
                    'BEGIN:VALARM',
                    'TRIGGER:-PT15M',
                    'ACTION:DISPLAY',
                    `DESCRIPTION:Reminder: ${meetingName} with Vishwajeet starts in 15 minutes`,
                    'END:VALARM',
                    'END:VEVENT',
                    'END:VCALENDAR'
                ];

                const icsString = icsLines.join('\r\n');
                calIcsLink.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(icsString);
                calIcsLink.setAttribute('download', 'Meeting-with-Vishwajeet.ics');
            }

            // 4. Update Cal.com badge link in success view
            if (calSuccessDirectLink) {
                calSuccessDirectLink.href = calLinks[selectedDuration];
            }

            // 5. Send booking payload to Vishwajeet
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    access_key: 'ecc07fa5-6c70-4f51-bfa6-1e961fa6623d',
                    from_name: name,
                    subject: `📅 New ${meetingName} Booked: ${name} on ${formatDayHeader(selectedDate)} at ${selectedSlot}`,
                    name: name,
                    email: email,
                    duration: `${selectedDuration} mins`,
                    meeting_date: formatFullDate(selectedDate),
                    meeting_time: `${selectedSlot} – ${endTimeStr} (IST)`,
                    google_meet: googleMeetUrl,
                    notes: notes,
                    cal_link: calLinks[selectedDuration],
                    type: 'Call Booking'
                })
            }).catch(() => {});

            // Switch to success view
            if (bookingView) bookingView.style.display = 'none';
            if (successView) successView.style.display = 'flex';
        });
    }

    // Reschedule & Cancel actions
    const rescheduleBtn = document.getElementById('calRescheduleBtn');
    const cancelBtn = document.getElementById('calCancelBtn');

    if (rescheduleBtn) {
        rescheduleBtn.addEventListener('click', () => {
            if (successView) successView.style.display = 'none';
            if (bookingView) bookingView.style.display = 'grid';
            if (detailsPanel) detailsPanel.style.display = 'none';
            if (slotsPanel) slotsPanel.style.display = 'flex';
            renderCalendar();
            renderTimeSlots();
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }

    if (doneBtn) {
        doneBtn.addEventListener('click', closeModal);
    }
}

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c👋 Welcome to Vishwajeet\'s Portfolio!', 'color: #1e40af; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out the GitHub repository!', 'color: #10b981; font-size: 14px;');
console.log('%cLooking for a talented developer? Let\'s connect!', 'color: #f59e0b; font-size: 14px;');

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===================================
// EXPORT FOR POTENTIAL USE
// ===================================

window.portfolioUtils = {
    typeWriter,
    animateCounter,
    debounce,
    throttle
};