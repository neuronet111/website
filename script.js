// script.js
document.addEventListener('DOMContentLoaded', function () {
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
        mobileToggle.addEventListener('click', function (e) {
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
        document.addEventListener('click', function (e) {
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
            link.addEventListener('click', function () {
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
            const targetId = this.getAttribute('href');

            // Special handling for home section - scroll to top
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
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
                <p>Learn to name your feelings (happy, sad, angry, confused) and understand why you feel them.</p>
                
                <h4>The Fun Part</h4>
                <p>Build your own chatbot that can guess emotions from text! Just copy-paste some code, type in messages, and watch the AI figure out if you're happy or upset.</p>
                
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
});