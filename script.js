// script.js

// Intro Animation State
let isIntroComplete = false;
let introStartTime = null;

// Typewriter Effect
function initTypewriter() {
    const phrases = [
        "Artificial Intelligence?",
        "Psychology?",
        "Why not both?",
        "Neuro.Net"
    ];
    
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;
    const typewriterElement = document.querySelector('.typewriter');
    
    function type() {
        const phrase = phrases[currentPhrase];
        
        if (isDeleting) {
            currentChar--;
        } else {
            currentChar++;
        }
        
        typewriterElement.textContent = phrase.substring(0, currentChar);
        
        let speed = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentChar === phrase.length) {
            // Pause before backspacing
            speed = 1500;
            isDeleting = true;
        } else if (isDeleting && currentChar === 0) {
            // Move to next phrase
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            speed = 500;
        }
        
        setTimeout(type, speed);
    }
    
    type();
}

document.addEventListener('DOMContentLoaded', function () {
    // Add intro active class
    document.body.classList.add('intro-active');
    
    // After 4.5 seconds, complete intro and start typewriter
    setTimeout(() => {
        document.body.classList.remove('intro-active');
        document.body.classList.add('intro-complete');
        initTypewriter();
    }, 4500);
    
    // --- Configuration ---
    const EMAILJS_SERVICE_ID = "service_kir0ule";
    const EMAILJS_TEMPLATE_ID = "template_t3o2or4";
    const EMAILJS_USER_ID = "2w3atmy2XtphlHOCs";

    // Initialize EmailJS
    emailjs.init(EMAILJS_USER_ID);

    // Animated Neural Network Background - Optimized
    function initNeuralNetwork() {
        const canvas = document.createElement('canvas');
        canvas.id = 'neural-network';
        document.body.prepend(canvas);
        
        const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
        let particles = [];
        let animationId;
        let mouse = { x: null, y: null, radius: 120 };
        let lastMouseUpdate = 0;
        const mouseUpdateThrottle = 50; // ms
        
        // Only render visible viewport area
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                resizeCanvas();
                initParticles();
            }, 250);
        });
        
        // Track mouse position with throttling
        window.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastMouseUpdate > mouseUpdateThrottle) {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
                lastMouseUpdate = now;
            }
        });
        
        // Reset mouse position when cursor leaves window
        window.addEventListener('mouseout', () => {
            mouse.x = null;
            mouse.y = null;
        });
        
        // Particle class
        class Particle {
            constructor() {
                this.baseX = Math.random() * canvas.width;
                this.baseY = Math.random() * canvas.height;
                this.x = this.baseX;
                this.y = this.baseY;
                this.targetX = this.baseX;
                this.targetY = this.baseY;
                this.vx = (Math.random() - 0.5) * 1;
                this.vy = (Math.random() - 0.5) * 1;
                this.radius = Math.random() * 2.5 + 2;
                this.opacity = Math.random() * 0.3 + 0.5;
                this.baseOpacity = this.opacity;
                this.targetOpacity = this.baseOpacity;
                this.mouseConnectionOpacity = 0;
                this.targetMouseConnectionOpacity = 0;
            }
            
            update() {
                // Random movement
                this.baseX += this.vx;
                this.baseY += this.vy;
                
                // Wrap around edges
                if (this.baseX < 0) this.baseX = canvas.width;
                if (this.baseX > canvas.width) this.baseX = 0;
                if (this.baseY < 0) this.baseY = canvas.height;
                if (this.baseY > canvas.height) this.baseY = 0;
                
                // Mouse interaction - smooth with interpolation
                if (mouse.x != null && mouse.y != null) {
                    const dx = mouse.x - this.baseX;
                    const dy = mouse.y - this.baseY;
                    const distanceSq = dx * dx + dy * dy;
                    const radiusSq = mouse.radius * mouse.radius;
                    
                    if (distanceSq < radiusSq) {
                        const distance = Math.sqrt(distanceSq);
                        const force = (mouse.radius - distance) / mouse.radius;
                        const angle = Math.atan2(dy, dx);
                        
                        const attractionX = Math.cos(angle) * force * 6;
                        const attractionY = Math.sin(angle) * force * 6;
                        
                        this.targetX = this.baseX + attractionX;
                        this.targetY = this.baseY + attractionY;
                        this.targetOpacity = Math.min(this.baseOpacity + force * 0.4, 0.9);
                    } else {
                        this.targetX = this.baseX;
                        this.targetY = this.baseY;
                        this.targetOpacity = this.baseOpacity;
                    }
                } else {
                    this.targetX = this.baseX;
                    this.targetY = this.baseY;
                    this.targetOpacity = this.baseOpacity;
                }
                
                // Calculate target mouse connection opacity
                if (mouse.x != null && mouse.y != null) {
                    const dx = mouse.x - this.baseX;
                    const dy = mouse.y - this.baseY;
                    const distanceSq = dx * dx + dy * dy;
                    const radiusSq = mouse.radius * mouse.radius;
                    
                    if (distanceSq < radiusSq) {
                        const distance = Math.sqrt(distanceSq);
                        this.targetMouseConnectionOpacity = (1 - distance / mouse.radius) * 0.6;
                    } else {
                        this.targetMouseConnectionOpacity = 0;
                    }
                } else {
                    this.targetMouseConnectionOpacity = 0;
                }
                
                // Smooth interpolation (lerp) for position and opacity
                const smoothness = 0.15;
                this.x += (this.targetX - this.x) * smoothness;
                this.y += (this.targetY - this.y) * smoothness;
                this.opacity += (this.targetOpacity - this.opacity) * smoothness;
                this.mouseConnectionOpacity += (this.targetMouseConnectionOpacity - this.mouseConnectionOpacity) * smoothness;
            }
            
            draw() {
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Initialize particles - reduced count
        function initParticles() {
            particles = [];
            // Increase particle count: 100 on desktop, 80 on tablet, 60+ on mobile
            const baseCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100);
            for (let i = 0; i < baseCount; i++) {
                particles.push(new Particle());
            }
        }
        
        initParticles();
        
        // Draw connections - optimized
        function drawConnections() {
            const maxDistance = 120;
            const maxDistanceSq = maxDistance * maxDistance;
            
            // Only check connections for particles in viewport
            for (let i = 0; i < particles.length; i++) {
                let connectionsDrawn = 0;
                const maxConnections = 3; // Limit connections per particle
                
                for (let j = i + 1; j < particles.length && connectionsDrawn < maxConnections; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distanceSq = dx * dx + dy * dy;
                    
                    if (distanceSq < maxDistanceSq) {
                        const distance = Math.sqrt(distanceSq);
                        const opacity = (1 - distance / maxDistance) * 0.5;
                        ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`;
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        connectionsDrawn++;
                    }
                }
                
                // Mouse connections - smooth with interpolated opacity
                if (mouse.x != null && mouse.y != null && particles[i].mouseConnectionOpacity > 0.01) {
                    ctx.strokeStyle = `rgba(100, 200, 255, ${particles[i].mouseConnectionOpacity})`;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
        
        // Simplified mouse effect
        function drawMouseEffect() {
            if (mouse.x != null && mouse.y != null) {
                const gradient = ctx.createRadialGradient(
                    mouse.x, mouse.y, 0,
                    mouse.x, mouse.y, 25
                );
                gradient.addColorStop(0, 'rgba(100, 200, 255, 0.15)');
                gradient.addColorStop(1, 'rgba(100, 200, 255, 0)');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, 25, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Animation loop with FPS limiting
        let lastFrameTime = 0;
        const targetFPS = 30;
        const frameInterval = 1000 / targetFPS;
        
        // Interactive click ripple effect
        let ripples = [];
        
        class RippleParticle {
            constructor(x, y, angle, boost = false) {
                this.x = x;
                this.y = y;
                this.startX = x;
                this.startY = y;
                this.angle = angle;
                this.speed = (Math.random() * 3 + 2) * (boost ? 1.4 : 1);
                this.radius = (Math.random() * 4 + 3) * (boost ? 1.5 : 1); // larger base radius
                this.life = 1;
                this.decay = (Math.random() * 0.012 + 0.008) * (boost ? 0.7 : 1); // slower decay when boosted
                const hue = Math.random() * 40 + 200; // cooler cyan/blue palette
                const sat = boost ? 95 : 85;
                const light = boost ? 72 : 65;
                this.color = `hsl(${hue}, ${sat}%, ${light}%)`;
            }
            
            update() {
                this.x += Math.cos(this.angle) * this.speed;
                this.y += Math.sin(this.angle) * this.speed;
                this.life -= this.decay;
                this.speed *= 0.98;
            }
            
            draw() {
                if (this.life <= 0) return;
                
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.radius
                );
                gradient.addColorStop(0, this.color.replace(')', `, ${this.life})`).replace('hsl', 'hsla'));
                gradient.addColorStop(1, this.color.replace(')', ', 0)').replace('hsl', 'hsla'));
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius * this.life, 0, Math.PI * 2);
                ctx.fill();
                
                // Draw connection to origin
                const distFromOrigin = Math.sqrt((this.x - this.startX) ** 2 + (this.y - this.startY) ** 2);
                if (distFromOrigin < 150) {
                    const lineOpacity = (1 - distFromOrigin / 150) * this.life * 0.3;
                    ctx.strokeStyle = this.color.replace(')', `, ${lineOpacity})`).replace('hsl', 'hsla');
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(this.startX, this.startY);
                    ctx.lineTo(this.x, this.y);
                    ctx.stroke();
                }
            }
        }
        
        // Unified ripple trigger for desktop (click) and touch
        let lastRippleTime = 0;
        function spawnRipple(clientX, clientY, boost = false) {
            const now = performance.now();
            if (now - lastRippleTime < 140) return; // throttle spam
            lastRippleTime = now;
            const rect = canvas.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            const particleCount = boost ? 60 : 40; // more particles when boosted (e.g. long press)
            for (let i = 0; i < particleCount; i++) {
                const angle = (Math.PI * 2 * i) / particleCount;
                ripples.push(new RippleParticle(x, y, angle, boost));
            }
        }

        canvas.addEventListener('click', (e) => spawnRipple(e.clientX, e.clientY));
        canvas.addEventListener('mousedown', (e) => {
            if (e.button === 0) spawnRipple(e.clientX, e.clientY, true); // stronger ripple on press
        });
        canvas.addEventListener('touchstart', (e) => {
            const t = e.changedTouches[0];
            spawnRipple(t.clientX, t.clientY, e.touches.length > 1); // multi-touch => boost
        }, { passive: true });
        
        // Main animation loop with ripples integrated
        function animate(currentTime) {
            // Initialize intro timing
            if (introStartTime === null) {
                introStartTime = currentTime;
            }

            const deltaTime = currentTime - lastFrameTime;
            
            if (deltaTime >= frameInterval) {
                lastFrameTime = currentTime - (deltaTime % frameInterval);
                
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Intro animation logic
                const elapsedTime = currentTime - introStartTime;
                const introDuration = 4000; // 4 seconds for intro
                const formationDuration = 2800; // Time for neurons to form
                const blastDuration = 400; // Time for blast off
                
                if (!isIntroComplete && elapsedTime < introDuration) {
                    // During intro: guide particles to form hero content pattern
                    const formationProgress = Math.min(elapsedTime / formationDuration, 1);
                    const blastProgress = Math.max((elapsedTime - formationDuration) / blastDuration, 0);
                    
                    particles.forEach((particle, index) => {
                        // Create multiple formation zones (logo, text, buttons areas)
                        const heroX = canvas.width / 2;
                        const heroY = canvas.height / 2;
                        
                        // Distribute particles across multiple formations
                        const zone = Math.floor((index / particles.length) * 4);
                        let targetX, targetY;
                        
                        if (zone === 0) {
                            // Logo area - left side
                            const angle = (index / (particles.length * 0.25)) * Math.PI * 2;
                            const radius = 80;
                            targetX = heroX - 250 + Math.cos(angle) * radius;
                            targetY = heroY - 100 + Math.sin(angle) * radius;
                        } else if (zone === 1) {
                            // Main text area - center
                            const angle = ((index - particles.length * 0.25) / (particles.length * 0.25)) * Math.PI * 2;
                            const radius = 150;
                            targetX = heroX + 50 + Math.cos(angle) * radius;
                            targetY = heroY + Math.sin(angle) * radius;
                        } else if (zone === 2) {
                            // Subtitle area - lower
                            const angle = ((index - particles.length * 0.5) / (particles.length * 0.25)) * Math.PI * 1.5;
                            const radius = 120;
                            targetX = heroX + 100 + Math.cos(angle) * radius;
                            targetY = heroY + 150 + Math.sin(angle) * radius;
                        } else {
                            // Buttons area - bottom
                            const angle = ((index - particles.length * 0.75) / (particles.length * 0.25)) * Math.PI * 1.2;
                            const radius = 100;
                            targetX = heroX + Math.cos(angle) * radius;
                            targetY = heroY + 250 + Math.sin(angle) * radius;
                        }
                        
                        // Interpolate to formation
                        const easeProgress = formationProgress < 1 ? 
                            Math.pow(formationProgress, 0.5) : // Ease in
                            1;
                            
                        particle.x = particle.baseX + (targetX - particle.baseX) * easeProgress;
                        particle.y = particle.baseY + (targetY - particle.baseY) * easeProgress;
                        
                        // After formation, blast off with acceleration
                        if (blastProgress > 0) {
                            const blastVX = (Math.random() - 0.5) * 15 * blastProgress;
                            const blastVY = (Math.random() - 0.5) * 15 * blastProgress;
                            particle.x += blastVX;
                            particle.y += blastVY;
                            // Fade out during blast
                            particle.opacity = particle.baseOpacity * (1 - blastProgress * 0.8);
                        } else {
                            // Fade in particles during formation
                            particle.opacity = particle.baseOpacity * easeProgress;
                        }
                    });
                    
                    // Draw bright connections during intro formation
                    const maxDistance = 160;
                    const maxDistanceSq = maxDistance * maxDistance;
                    
                    for (let i = 0; i < particles.length; i++) {
                        let connectionsDrawn = 0;
                        const maxConnections = 5;
                        
                        for (let j = i + 1; j < particles.length && connectionsDrawn < maxConnections; j++) {
                            const dx = particles[i].x - particles[j].x;
                            const dy = particles[i].y - particles[j].y;
                            const distanceSq = dx * dx + dy * dy;
                            
                            if (distanceSq < maxDistanceSq) {
                                const distance = Math.sqrt(distanceSq);
                                let opacity = (1 - distance / maxDistance) * 0.8 * (1 - blastProgress * 0.9);
                                ctx.strokeStyle = `rgba(100, 200, 255, ${opacity})`;
                                ctx.lineWidth = 2 + blastProgress * 2;
                                ctx.beginPath();
                                ctx.moveTo(particles[i].x, particles[i].y);
                                ctx.lineTo(particles[j].x, particles[j].y);
                                ctx.stroke();
                                connectionsDrawn++;
                            }
                        }
                    }
                    
                    particles.forEach(particle => particle.draw());
                } else {
                    // Intro complete - switch to normal flow
                    if (!isIntroComplete) {
                        isIntroComplete = true;
                        // Reset particles for normal random movement
                        particles.forEach(particle => {
                            particle.vx = (Math.random() - 0.5) * 1;
                            particle.vy = (Math.random() - 0.5) * 1;
                        });
                    }
                    
                    // Normal animation flow
                    drawMouseEffect();
                    
                    particles.forEach(particle => {
                        particle.update();
                        particle.draw();
                    });
                    
                    drawConnections();
                    
                    // Update and draw ripples
                    ripples = ripples.filter(ripple => {
                        ripple.update();
                        ripple.draw();
                        return ripple.life > 0;
                    });
                }
            }
            
            animationId = requestAnimationFrame(animate);
        }
        
        animate(0);
    }
    
    initNeuralNetwork();

    // iOS-style pill highlight for navigation - Complete rewrite
    function initNavPillHighlight() {
        const navLinksContainer = document.querySelector('.nav-links');
        const navLinks = navLinksContainer.querySelectorAll('a');
        
        if (!navLinksContainer || navLinks.length === 0) return;

        // Create and append pill element
        const pill = document.createElement('div');
        pill.className = 'nav-pill-highlight';
        navLinksContainer.appendChild(pill);

        // Helper function to update pill position
        function updatePillPosition(link) {
            if (!link) return;
            requestAnimationFrame(() => {
                pill.style.left = link.offsetLeft + 'px';
                pill.style.width = link.offsetWidth + 'px';
                pill.style.height = link.offsetHeight + 'px';
            });
        }

        // Helper function to set active link
        function setActiveLink(link) {
            navLinks.forEach(l => l.classList.remove('active'));
            if (link) {
                link.classList.add('active');
                updatePillPosition(link);
            }
        }

        // Initialize with home link
        setActiveLink(navLinks[0]);

        // Handle nav link clicks
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                setActiveLink(link);
                
                // Smooth scroll to target
                const targetId = link.getAttribute('href');
                if (targetId === '#home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    const target = document.querySelector(targetId);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });

        // Update pill position on window resize
        window.addEventListener('resize', () => {
            const activeLink = navLinksContainer.querySelector('a.active');
            if (activeLink) updatePillPosition(activeLink);
        }, { passive: true });

        // Update active link based on scroll position
        function updateActiveOnScroll() {
            const scrollY = window.pageYOffset;

            // If at top, activate home
            if (scrollY < 300) {
                setActiveLink(navLinks[0]);
                return;
            }

            // Find which section matches current scroll position
            for (let link of navLinks) {
                const href = link.getAttribute('href');
                if (!href || href === '#home') continue;

                const section = document.querySelector(href);
                if (!section) continue;

                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionEnd = sectionTop + sectionHeight;

                // Use 200px threshold for better UX
                if (scrollY >= sectionTop - 200 && scrollY < sectionEnd - 200) {
                    const currentActive = navLinksContainer.querySelector('a.active');
                    if (currentActive !== link) {
                        setActiveLink(link);
                    }
                    return;
                }
            }
        }

        // Add scroll listener with debouncing
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateActiveOnScroll, 50);
        }, { passive: true });
    }

    // Initialize after fonts load
    document.fonts.ready.then(() => {
        initNavPillHighlight();
    });

    // Scroll Progress Bar
    function initScrollProgressBar() {
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (!progressBar) return;

        function updateProgressBar() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = scrolled + '%';
        }

        window.addEventListener('scroll', updateProgressBar, { passive: true });
        updateProgressBar();
    }

    initScrollProgressBar();

    // Navbar scroll effect (minimal - just shadow changes)
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
        }
    });

    // --- EmailJS Form Submission Logic ---
    const contactForm = document.querySelector('.contact-form');
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    // Toast notification function
    function showToast(message, type = 'success') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast-notification';

        const icon = type === 'success' ? '✅' : '❌';
        const title = type === 'success' ? 'Success!' : 'Error';

        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">${icon}</div>
                <div class="toast-message">
                    <h4>${title}</h4>
                    <p>${message}</p>
                </div>
            </div>
            <button class="toast-close">×</button>
        `;

        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);

        // Close button functionality
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 5000);

        // Trigger confetti for success
        if (type === 'success') {
            createConfetti();
        }
    }

    // Confetti function
    function createConfetti() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';

            // Random horizontal position
            confetti.style.left = Math.random() * 100 + '%';

            // Random color from array
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            // Random size variation
            const size = Math.random() * 5 + 8;
            confetti.style.width = size + 'px';
            confetti.style.height = size + 'px';

            // Random animation duration and delay
            const duration = Math.random() * 2 + 3;
            const delay = Math.random() * 0.3;
            confetti.style.animation = `confettiFall ${duration}s ${delay}s linear forwards`;

            // Random starting position slightly above viewport
            confetti.style.top = '-10px';

            document.body.appendChild(confetti);

            // Remove confetti after animation completes
            setTimeout(() => {
                confetti.remove();
            }, (duration + delay) * 1000);
        }
    }

    if (contactForm && submitButton) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Get form values with detailed logging
            const nameInput = contactForm.querySelector('input[name="name"]');
            const emailInput = contactForm.querySelector('input[name="reply_to"]');
            const institutionInput = contactForm.querySelector('input[name="institution"]');
            const subjectInput = contactForm.querySelector('input[name="subject"]');
            const messageInput = contactForm.querySelector('textarea[name="message"]');

            console.log('Form inputs found:', {
                nameInput: nameInput,
                emailInput: emailInput,
                institutionInput: institutionInput
            });

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const institution = institutionInput ? institutionInput.value.trim() : '';
            const subject = subjectInput ? subjectInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            console.log('Form values extracted:', {
                name: name,
                email: email,
                institution: institution,
                subject: subject,
                message: message
            });

            const templateParams = {
                from_name: name,
                from_email: email,
                institution: institution,
                subject: subject,
                message: message
            };

            console.log('Template params being sent:', templateParams);

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showToast('Message sent successfully! We will get back to you soon.', 'success');
                    contactForm.reset();
                }, function (error) {
                    console.error('FAILED...', error);
                    showToast('Failed to send message. Please try again or contact us directly via email.', 'error');
                })
                .finally(function () {
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                });
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    document.querySelectorAll('.problem-card, .solution-card, .workshop-card, .team-card, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // --- Accordion Functionality ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const accordionItem = this.parentElement;
            const container = accordionItem.closest('.accordion-container');
            const isPricing = container && container.classList.contains('pricing');
            const isActive = accordionItem.classList.contains('active');

            if (isPricing) {
                // Pricing accordion: allow multiple items open
                accordionItem.classList.toggle('active');
            } else {
                // Default behavior: single open within the same container
                if (container) {
                    container.querySelectorAll('.accordion-item').forEach(item => {
                        if (item !== accordionItem) item.classList.remove('active');
                    });
                }
                accordionItem.classList.toggle('active');
            }
        });
    });

    // --- Team Member Modal Functionality ---
    const modal = document.getElementById('teamModal');
    const modalClose = document.querySelector('.modal-close');
    const learnMoreLinks = document.querySelectorAll('.learn-more-link');

    // Team member data
    const teamData = {
        alina: {
            name: "Alina Khan",
            role: "Co-Founder",
            image: "Photos/ALINA.webp",
            bio: `
                <p>Alina Khan is a visionary entrepreneur and co-founder of Neuro.net, dedicated to bridging the gap between artificial intelligence and human psychology.</p>
                <p>With a passion for mental health and technology, she believes in empowering young minds to navigate the digital age with resilience and awareness.</p>
                <p><strong>Key Contributions:</strong></p>
                <ul>
                    <li>Strategic leadership and business development</li>
                    <li>Workshop curriculum design</li>
                    <li>Community outreach and partnerships</li>
                </ul>
                <p><strong>Education:</strong> Pursuing degree in Psychology and AI Ethics</p>
            `
        },
        khatija: {
            name: "Khatija Patel",
            role: "Co-Founder",
            image: "Photos/KHATIJA.webp",
            bio: `
                <p>Khatija Patel is a passionate advocate for digital literacy and co-founder of Neuro.net, committed to making AI education accessible and meaningful for students.</p>
                <p>Her expertise lies in creating engaging educational content that demystifies complex technological concepts while addressing mental wellness.</p>
                <p><strong>Key Contributions:</strong></p>
                <ul>
                    <li>Educational program development</li>
                    <li>Psychology workshop facilitation</li>
                    <li>Student engagement strategies</li>
                </ul>
                <p><strong>Education:</strong> Studying Clinical Psychology and Educational Technology</p>
            `
        },
        ameya: {
            name: "Ameya (JARVIS)",
            role: "Tech Workshop Lead",
            image: "Photos/AMEYA.webp",
            bio: `
                <p>Known as JARVIS, Ameya brings technical expertise and a passion for AI education to Neuro.net's technical workshops.</p>
                <p>He specializes in making complex AI concepts accessible through hands-on, practical learning experiences that inspire curiosity and creativity.</p>
                <p><strong>Key Contributions:</strong></p>
                <ul>
                    <li>Leading technical AI workshops</li>
                    <li>Chatbot development training</li>
                    <li>Ethical AI education</li>
                </ul>
                <p><strong>Expertise:</strong> Machine Learning, Natural Language Processing, Educational Technology</p>
            `
        },
        gurleen: {
            name: "Gurleenkaur Chhabda",
            role: "Psychology Workshop Lead",
            image: "Photos/GURLEEN.webp",
            bio: `
                <p>Gurleenkaur Chhabda leads the psychological wellness component of Neuro.net's workshops, bringing thoughtful insight into emotional intelligence, behavior patterns, and youth mental well-being.</p>
                <p>She focuses on making psychology student-friendly by simplifying complex ideas into practical tools that young people can actually use. Her approach integrates psychoanalytic understanding, emotional literacy, and real-life experiences from the digital world to help students build awareness and resilience.</p>
                <p><strong>Key Contributions</strong></p>
                <ul>
                    <li>Designing & leading workshop structure and activities</li>
                    <li>Creating youth-focused mental health awareness modules</li>
                    <li>Developing student-friendly emotional literacy tools</li>
                    <li>Facilitating communication & emotional intelligence practices</li>
                </ul>
                <p><strong>Expertise</strong></p>
                <ul>
                    <li>Emotional Intelligence</li>
                    <li>Youth Psychology Understanding</li>
                    <li>Psychoanalytic Concepts & Behavior Interpretation</li>
                    <li>Workshop Design + Educational Content Writing</li>
                    <li>Public Speaking & Student Engagement</li>
                </ul>
            `
        },
        zain: {
            name: "Zain Ahmad",
            role: "Social Media Manager",
            image: "Photos/ZAIN.webp",
            bio: `
                <p>Zain Ahmad manages Neuro.net's digital presence and community engagement, ensuring our message reaches and resonates with students, educators, and institutions.</p>
                <p>His creative approach to social media storytelling helps amplify the impact of our mission and workshops.</p>
                <p><strong>Key Contributions:</strong></p>
                <ul>
                    <li>Social media strategy and content creation</li>
                    <li>Community management and engagement</li>
                    <li>Brand awareness campaigns</li>
                </ul>
                <p><strong>Skills:</strong> Digital Marketing, Content Strategy, Community Building</p>
            `
        },
        sana: {
            name: "Sanna",
            role: "Photographer",
            image: "Photos/SANA.webp",
            bio: `
                <p>Sanna captures the essence of Neuro.net's workshops and events through powerful visual storytelling.</p>
                <p>Her photography brings to life the transformative moments of learning, discovery, and emotional growth that students experience in our programs.</p>
                <p><strong>Key Contributions:</strong></p>
                <ul>
                    <li>Event and workshop photography</li>
                    <li>Visual content for marketing materials</li>
                    <li>Student testimonial documentation</li>
                </ul>
                <p><strong>Expertise:</strong> Event Photography, Portrait Photography, Visual Storytelling</p>
            `
        },
        mufaiz: {
            name: "Mufaiz Athar",
            role: "Video Editor",
            image: "Photos/MUFAIZ.webp",
            bio: `
                <p>Mufaiz Athar transforms raw footage into compelling narratives that showcase the impact of Neuro.net's workshops on students and communities.</p>
                <p>His video editing skills help communicate complex concepts and emotional journeys in an accessible and engaging format.</p>
                <p><strong>Key Contributions:</strong></p>
                <ul>
                    <li>Workshop recap videos and highlights</li>
                    <li>Educational content production</li>
                    <li>Promotional video creation</li>
                </ul>
                <p><strong>Expertise:</strong> Video Editing, Motion Graphics, Content Production</p>
            `
        }
    };

    // Open modal when Learn More is clicked
    learnMoreLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const memberId = this.getAttribute('data-member');
            const member = teamData[memberId];

            if (member) {
                document.getElementById('modalMemberImage').src = member.image;
                document.getElementById('modalMemberName').textContent = member.name;
                document.getElementById('modalMemberRole').textContent = member.role;
                document.getElementById('modalMemberBio').innerHTML = member.bio;

                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal when X is clicked
    if (modalClose) {
        modalClose.addEventListener('click', function () {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // --- Integration Topic Modal Functionality ---
    const integrationModal = document.getElementById('integrationModal');
    const integrationClose = document.querySelector('.integration-close');
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');

    // Integration topics data
    const integrationData = {
        emotions: {
            title: "Understand Your Feelings",
            content: `
                <h4>What You'll Do</h4>
                <p>Learn to recognize and label your complex feelings (disgust, vigilance, anticipation) and understand it's roots and how to cope with them in healthy way.</p>
                
                <h4>The Fun Part</h4>
                <p>Build your own chatbot that can guess emotions from text! Just copy-paste some code, type in messages, and watch AI breakdown your complex emotions for you.</p>
                
                <h4>What You'll Learn</h4>
                <ul>
                    <li>Recognize your own emotions better</li>
                    <li>Understand what triggers different feelings</li>
                    <li>See how AI tries to understand human emotions</li>
                    <li>Learn when AI gets it right and when it doesn't</li>
                </ul>
                <p><strong>Why It Matters:</strong> You'll get better at understanding yourself AND learn how technology reads emotions.</p>
            `
        },
        empathy: {
            title: "Behind the Mask meets AI Empathy",
            content: `
                <h4>Psychology Module: Behind the Mask</h4>
                <p>Defense mechanisms — how the mind unconsciously protects itself through projection, denial, displacement, rationalization.</p>
                
                <h4>Tech Module: AI Empathy Limits</h4>
                <p>Explore what AI can simulate (pattern recognition, consistent responses) vs what it cannot feel (genuine understanding, warmth, moral judgment).</p>
                
                <h4>The Integration</h4>
                <ul>
                    <li>Identify personal defense mechanisms students use online vs offline</li>
                    <li>Test AI chatbot responses to emotional scenarios</li>
                    <li>Recognize when AI gives surface-level "empathy" vs when humans provide depth</li>
                    <li>Understand why we might hide behind digital masks with both humans and AI</li>
                </ul>
                <p><strong>Outcome:</strong> Students distinguish authentic connection from algorithmic responses and understand their own emotional defenses.</p>
            `
        },
        attention: {
            title: "The Bias Code meets Algorithmic Attention",
            content: `
                <h4>Psychology Module: The Bias Code</h4>
                <p>Cognitive biases — how we perceive the world inaccurately through confirmation bias, attention bias, social media influence.</p>
                
                <h4>Tech Module: Algorithmic Attention Manipulation</h4>
                <p>How platforms use variable rewards, infinite scroll, personalization, and FOMO to capture attention.</p>
                
                <h4>The Integration</h4>
                <ul>
                    <li>Map personal cognitive biases: What content do you seek out?</li>
                    <li>Analyze how algorithms reinforce those biases (filter bubbles)</li>
                    <li>Understand why you can't stop scrolling (psychological triggers × algorithmic design)</li>
                    <li>Design counter-strategies: timers, intentional feed curation, bias awareness</li>
                </ul>
                <p><strong>Outcome:</strong> Recognize the double impact of internal biases + external algorithmic manipulation on attention.</p>
            ` 
        },
        dopamine: {
            title: "Break Phone Addiction",
            content: `
                <h4>What You'll Do</h4>
                <p>Discover why you can't stop checking your phone. Learn about the reward system in your brain that makes social media so addictive.</p>
                
                <h4>The Fun Part</h4>
                <p>Use AI to analyze your own stress! Write about your day, feed it to the AI, and it will show you stress patterns you didn't even notice.</p>
                
                <h4>What You'll Learn</h4>
                <ul>
                    <li>Why your brain loves notifications and likes</li>
                    <li>How apps are designed to keep you hooked</li>
                    <li>Track your own stress levels using AI</li>
                    <li>Simple tricks to break the phone-checking habit</li>
                </ul>
                <p><strong>Why It Matters:</strong> Take control of your phone time instead of letting it control you.</p>
            `
        },
        strain: {
            title: "In My Head meets Psychological Strain",
            content: `
                <h4>Psychology Module: In My Head</h4>
                <p>Social psychology — peer pressure, conformity, group behavior, social comparison, digital identity, and belonging.</p>
                
                <h4>Tech Module: Early Warning Signs</h4>
                <p>Recognize digital-era stressors: comparison anxiety, cyberbullying, information overload, blurred identity boundaries.</p>
                
                <h4>The Integration</h4>
                <ul>
                    <li>Explore social comparison on social media vs real-world peer dynamics</li>
                    <li>Identify early signs: irritability, withdrawal, sleep issues, foggy focus</li>
                    <li>Connect psychological theory (social identity) to digital behavior (online personas)</li>
                    <li>Practice peer support scripts for digital wellness conversations</li>
                </ul>
                <p><strong>Outcome:</strong> Students recognize strain in themselves and friends, bridging psychology concepts with digital realities.</p>
            `
        },
        wellness: {
            title: "Talk Therapy meets AI Wellness",
            content: `
                <h4>Psychology Module: Talk Therapy</h4>
                <p>Communication & emotional intelligence — active listening, empathy, boundary-setting, interpersonal skills, expressing emotions safely.</p>
                
                <h4>Tech Module: AI as Mental Wellness Assistant</h4>
                <p>AI strengths (on-demand prompts, tracking, structured tools) vs limits (no real empathy, misses nuance, not for crises).</p>
                
                <h4>The Integration</h4>
                <ul>
                    <li>Practice human-to-human communication skills first</li>
                    <li>Then explore AI wellness tools: journaling apps, CBT exercises, mindfulness guides</li>
                    <li>Create a decision tree: When to talk to a friend, when to use AI, when to seek professional help</li>
                    <li>Understand AI as supplement, not replacement, for human connection</li>
                </ul>
                <p><strong>Outcome:</strong> Balanced perspective on using AI for wellness while prioritizing authentic human support when needed.</p>
            `
        },
        learning: {
            title: "Use AI Smartly",
            content: `
                <h4>What You'll Do</h4>
                <p>Learn how to ask AI tools like ChatGPT better questions so you get actually helpful answers instead of confusing ones.</p>
                
                <h4>The Fun Part</h4>
                <p>Practice writing prompts and see the difference between "bad" questions and "good" questions. Watch how changing a few words completely changes what AI gives you!</p>
                
                <h4>What You'll Learn</h4>
                <ul>
                    <li>How to ask clear questions to get better answers</li>
                    <li>Use ChatGPT for homework and learning (not just copying!)</li>
                    <li>Understand how habits work in your brain</li>
                    <li>Turn AI into a study buddy instead of a distraction</li>
                </ul>
                <p><strong>Why It Matters:</strong> AI can help you learn faster if you know how to use it right.</p>
            `
        }
    };

    // Open integration modal when Learn More is clicked
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const topicId = this.getAttribute('data-integration');
            const topic = integrationData[topicId];

            if (topic) {
                document.getElementById('modalIntegrationTitle').textContent = topic.title;
                document.getElementById('modalIntegrationContent').innerHTML = topic.content;

                integrationModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close integration modal when X is clicked
    if (integrationClose) {
        integrationClose.addEventListener('click', function () {
            integrationModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close integration modal when clicking outside
    window.addEventListener('click', function (e) {
        if (e.target === integrationModal) {
            integrationModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close integration modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && integrationModal.style.display === 'block') {
            integrationModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Video Autoplay on Visibility
    const workVideo = document.querySelector('.work-video');
    if (workVideo) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Video is visible, play it
                    workVideo.play().catch(err => {
                        console.log('Autoplay prevented:', err);
                    });
                } else {
                    // Video is not visible, pause it
                    workVideo.pause();
                }
            });
        }, {
            threshold: 0.5 // Play when 50% of video is visible
        });

        videoObserver.observe(workVideo);
    }
});