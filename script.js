// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
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

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'var(--background-light)';
        navbar.style.boxShadow = '0 2px 20px var(--shadow-dark)';
    } else {
        navbar.style.background = 'var(--background-light)';
        navbar.style.boxShadow = '0 2px 10px var(--shadow-light)';
    }
});

// Skills Progress Animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Counter Animation for Fun Facts
function animateCounters() {
    const counters = document.querySelectorAll('.funfact-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-item');
const testimonialDots = document.querySelectorAll('.testimonial-dot');

function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    // Remove active class from all dots
    testimonialDots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current testimonial and activate dot
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
        testimonialDots[index].classList.add('active');
    }
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Auto-advance testimonials
setInterval(nextTestimonial, 5000);

// Testimonial dot click handlers
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Trigger specific animations based on section
            if (entry.target.classList.contains('skills')) {
                animateSkills();
            }
            
            if (entry.target.classList.contains('funfacts')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    section.classList.add('animate-on-scroll');
    observer.observe(section);
});

// Service Cards Hover Effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Work Cards Hover Effect
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) rotateY(5deg)';
        this.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateY(0deg)';
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple form validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Show success message (in a real application, you would send this to a server)
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
    
    // Add animation to form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.style.background = '#27ae60';
    submitButton.style.borderColor = '#27ae60';
    submitButton.textContent = 'Message Sent!';
    
    setTimeout(() => {
        submitButton.style.background = '';
        submitButton.style.borderColor = '';
        submitButton.textContent = 'Submit Message';
    }, 3000);
});

// Load More Button (Works Section)
const loadMoreBtn = document.querySelector('.load-more .btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        // In a real application, this would load more projects
        this.textContent = 'No More Projects';
        this.style.background = '#95a5a6';
        this.style.cursor = 'not-allowed';
        
        setTimeout(() => {
            this.textContent = 'Load More';
            this.style.background = '';
            this.style.cursor = 'pointer';
        }, 2000);
    });
}

// Removed parallax effect for hero section

// Add typing effect to hero title
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

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 30);
        }, 1000);
    }
});

// Client logos animation
document.querySelectorAll('.client-logo').forEach(logo => {
    logo.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.6s ease-in-out';
    });
    
    logo.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// Add pulse animation to CSS if not already present
if (!document.querySelector('#pulse-animation')) {
    const style = document.createElement('style');
    style.id = 'pulse-animation';
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Social links hover effect
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
        this.style.transition = 'all 0.3s ease';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Theme Toggle Functionality
function initializeThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-label', 'Toggle theme');
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Set initial icon based on theme
    if (currentTheme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update button icon
        const icon = themeToggle.querySelector('i');
        if (newTheme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
        
        // Add smooth transition animation
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    });
    
    document.body.appendChild(themeToggle);
}

// Initialize theme toggle
initializeThemeToggle();

// Console message for developers
console.log(`
🚀 Developer Portfolio
Built with HTML, CSS, and JavaScript
Design inspired by HashamX
Created with attention to detail and modern web practices
`);

// Performance optimization: Lazy load images if any are added
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();
