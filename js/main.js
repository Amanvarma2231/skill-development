// DOM Elements
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');

// Navigation Toggle
function toggleSidebar() {
    sidebar.classList.toggle('active');
    mainContent.classList.toggle('shifted');
    
    // Add overlay when sidebar is open on mobile
    if (window.innerWidth <= 768) {
        if (sidebar.classList.contains('active')) {
            createOverlay();
        } else {
            removeOverlay();
        }
    }
}

// Create overlay for mobile
function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
    `;
    overlay.addEventListener('click', toggleSidebar);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
}

// Remove overlay
function removeOverlay() {
    const overlay = document.querySelector('.sidebar-overlay');
    if (overlay) {
        overlay.remove();
    }
    document.body.style.overflow = '';
}

// Event Listeners
menuBtn.addEventListener('click', toggleSidebar);
closeBtn.addEventListener('click', toggleSidebar);

// Close sidebar when clicking on nav links (mobile)
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            toggleSidebar();
        }
    });
});

// Statistics Counter Animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    statNumber.textContent = Math.floor(current);
                }, 16);
                
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Smooth scrolling for anchor links
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

// Add fade-in animation to elements on scroll
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.tool-card, .feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => observer.observe(element));
}

// Form handling (placeholder for future forms)
function handleFormSubmission(formId, successCallback) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add form submission logic here
            if (successCallback) {
                successCallback();
            }
        });
    }
}

// Enhanced button functionality with loading states
function showLoading(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    button.disabled = true;
    return originalText;
}

function hideLoading(button, originalText) {
    button.innerHTML = originalText;
    button.disabled = false;
}

function navigateWithTransition(url, button) {
    const originalText = showLoading(button);
    
    // Add page transition effect
    document.body.style.opacity = '0.8';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

// Tool functionality with enhanced UX
function initTools() {
    const toolButtons = document.querySelectorAll('.tool-card .btn-outline');
    toolButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const toolName = this.closest('.tool-card').querySelector('h3').textContent;
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            let url = '';
            if (toolName.includes('Password Strength')) {
                url = 'tools/password-strength-checker.html';
            } else if (toolName.includes('Privacy Checker')) {
                url = 'tools/privacy-checker.html';
            } else if (toolName.includes('Cybersecurity Quiz')) {
                url = 'tools/cybersecurity-quiz.html';
            }
            
            if (url) {
                navigateWithTransition(url, this);
            }
        });
    });
}

// Enhanced hero button functionality
function initHeroButtons() {
    const exploreCourses = document.querySelector('.hero-buttons .btn-primary');
    const joinWorkshop = document.querySelector('.hero-buttons .btn-secondary');
    
    if (exploreCourses) {
        exploreCourses.addEventListener('click', (e) => {
            e.preventDefault();
            navigateWithTransition('pages/courses.html', exploreCourses);
        });
    }
    
    if (joinWorkshop) {
        joinWorkshop.addEventListener('click', (e) => {
            e.preventDefault();
            navigateWithTransition('pages/workshops.html', joinWorkshop);
        });
    }
}

// Enhanced donate button functionality
function initDonateButton() {
    const donateBtn = document.querySelector('.header-actions .btn-primary');
    if (donateBtn) {
        donateBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navigateWithTransition('pages/donate.html', donateBtn);
        });
    }
}

// Feature cards click functionality
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            let url = '';
            if (title.includes('Technical Skills')) {
                url = 'pages/courses.html';
            } else if (title.includes('Cybersecurity')) {
                url = 'pages/courses.html?filter=cybersecurity';
            } else if (title.includes('Girls')) {
                url = 'pages/events.html?filter=safety';
            } else if (title.includes('Tech Tools')) {
                url = 'tools/password-strength-checker.html';
            }
            
            if (url) {
                setTimeout(() => {
                    window.location.href = url;
                }, 200);
            }
        });
    });
}

// Social links functionality
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className;
            
            let url = '#';
            if (platform.includes('facebook')) {
                url = 'https://facebook.com/techskillngo';
            } else if (platform.includes('twitter')) {
                url = 'https://twitter.com/techskillngo';
            } else if (platform.includes('linkedin')) {
                url = 'https://linkedin.com/company/techskillngo';
            } else if (platform.includes('instagram')) {
                url = 'https://instagram.com/techskillngo';
            }
            
            if (url !== '#') {
                window.open(url, '_blank');
            }
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    animateStats();
    initScrollAnimations();
    initTools();
    initHeroButtons();
    initDonateButton();
    initFeatureCards();
    initSocialLinks();
    initFooterLinks();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const focused = document.activeElement;
            if (focused.classList.contains('btn') || focused.classList.contains('tool-card') || focused.classList.contains('feature-card')) {
                focused.click();
            }
        }
    });
});

// Footer links functionality
function initFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-section a');
    footerLinks.forEach(link => {
        if (link.getAttribute('href') === '#') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const text = this.textContent;
                
                if (text.includes('Privacy Policy')) {
                    showModal('Privacy Policy', 'Our privacy policy content will be available soon.');
                } else if (text.includes('Terms of Service')) {
                    showModal('Terms of Service', 'Our terms of service will be available soon.');
                } else if (text.includes('Help Center')) {
                    window.location.href = 'pages/contact.html';
                }
            });
        }
    });
}

// Modal functionality
function showModal(title, content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>${content}</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary modal-close">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            modal.remove();
        });
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
        toggleSidebar();
        removeOverlay();
    }
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click effects to cards
    const cards = document.querySelectorAll('.tool-card, .feature-card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});