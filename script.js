// script.js
document.addEventListener('DOMContentLoaded', function() {
    // --- Configuration ---
    // !!! IMPORTANT: REPLACE "YOUR_SERVICE_ID" WITH YOUR ACTUAL EMAILJS SERVICE ID (e.g., service_gmail) !!!
    const EMAILJS_SERVICE_ID = "service_kir0ule"; // Your provided Service ID
    const EMAILJS_TEMPLATE_ID = "template_t3o2or4"; // Your provided Template ID
    const EMAILJS_USER_ID = "2w3atmy2XtphlHOCs"; // Your provided Public Key
    
    // Initialize EmailJS
    emailjs.init(EMAILJS_USER_ID); 

    // Mobile menu toggle (Code kept the same)
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            const isVisible = navLinks.style.display === 'flex';
            navLinks.style.display = isVisible ? 'none' : 'flex';

            if (!isVisible) {
                // Apply mobile menu styles only when opening
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.right = '20px';
                navLinks.style.flexDirection = 'column';
                navLinks.style.background = 'white';
                navLinks.style.padding = '1rem';
                navLinks.style.borderRadius = '10px';
                navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            }
        });
    }

    // Smooth scrolling for navigation links (Code kept the same)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Navbar scroll effect (Code kept the same)
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });

    // --- NEW/UPDATED: EmailJS Form Submission Logic ---
    const contactForm = document.querySelector('.contact-form');
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    if (contactForm && submitButton) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Disable button and show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            const now = new Date();
            const timeString = now.toLocaleString();
            
            // Collect form data for EmailJS. Keys must match template variables (e.g., 'name', 'email', 'institution', 'message', 'time')
            const templateParams = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value, // This is sent to the template
                institution: document.getElementById('institution').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                time: timeString 
            };

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    // Success alert
                    alert('Thank you for your message! We will get back to you soon.');
                    contactForm.reset();
                    // Re-enable button
                    submitButton.textContent = 'Send Message';
                    submitButton.disabled = false;
                }, function(error) {
                    console.log('FAILED...', error);
                    // Failure alert
                    alert('Oops! The message could not be sent. Please try again or email us directly.');
                    // Re-enable button
                    submitButton.textContent = 'Send Message';
                    submitButton.disabled = false;
                });
        });
    }
    // --- End: EmailJS Form Submission ---


    // Intersection Observer for animations (Code kept the same)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
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
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add parallax effect to hero section (Code kept the same)
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});