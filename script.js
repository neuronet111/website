// script.js
document.addEventListener('DOMContentLoaded', function() {
    // --- Configuration ---
    const EMAILJS_SERVICE_ID = "service_kir0ule";
    const EMAILJS_TEMPLATE_ID = "template_t3o2or4";
    const EMAILJS_USER_ID = "2w3atmy2XtphlHOCs";
    
    // Initialize EmailJS
    emailjs.init(EMAILJS_USER_ID); 

    // Mobile menu toggle - UPDATED
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = mobileToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Smooth scrolling for navigation links
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

    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            navbar.style.transform = 'translateX(-50%) translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateX(-50%) translateY(0)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
        }
        
        lastScroll = currentScroll;
    });

    // --- EmailJS Form Submission Logic ---
    const contactForm = document.querySelector('.contact-form');
    const submitButton = contactForm ? contactForm.querySelector('button[type="submit"]') : null;

    if (contactForm && submitButton) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            const templateParams = {
                from_name: contactForm.querySelector('input[name="name"]').value,
                reply_to: contactForm.querySelector('input[name="reply_to"]').value, // Changed from from_email
                institution: contactForm.querySelector('input[name="institution"]').value, // Added institution field
                subject: contactForm.querySelector('input[name="subject"]').value,
                message: contactForm.querySelector('textarea[name="message"]').value,
            };

            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Message sent successfully! We will get back to you soon.');
                    contactForm.reset();
                }, function(error) {
                    console.error('FAILED...', error);
                    alert('Failed to send message. Please try again or contact us directly via email.');
                })
                .finally(function() {
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

    // --- Team Member Modal Functionality ---
    const modal = document.getElementById('teamModal');
    const modalClose = document.querySelector('.modal-close');
    const learnMoreLinks = document.querySelectorAll('.learn-more-link');

    // Team member data
    const teamData = {
        alina: {
            name: "Alina Khan",
            role: "Co-Founder",
            image: "Photos/ALINA.jpeg",
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
            image: "Photos/KHATIJA.jpeg",
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
            image: "Photos/AMEYA.JPG",
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
            image: "Photos/GURLEEN.jpeg",
            bio: `
                <p>Gurleenkaur Chhabda leads the psychological wellness component of Neuro.net's workshops, bringing deep understanding of emotional intelligence and mental health.</p>
                <p>She specializes in psychoanalytic approaches and helps students develop self-awareness and emotional resilience in the digital age.</p>
                <p><strong>Key Contributions:</strong></p>
                <ul>
                    <li>Wheel of Emotions workshop facilitation</li>
                    <li>Mental health awareness programs</li>
                    <li>Emotional intelligence training</li>
                </ul>
                <p><strong>Expertise:</strong> Psychoanalysis, Emotional Intelligence, Youth Psychology</p>
            `
        },
        zain: {
            name: "Zain Ahmad",
            role: "Social Media Manager",
            image: "Photos/ZAIN.JPG",
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
            image: "Photos/SANA.jpeg",
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
            image: "Photos/MUFAIZ.jpeg",
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
        link.addEventListener('click', function(e) {
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
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});