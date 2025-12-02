// About Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize timeline animations
    initTimelineAnimations();
    
    // Initialize trust member cards
    initTrustMemberCards();
    
    // Initialize value cards animations
    initValueCardsAnimations();
    
    // Initialize partner logos animation
    initPartnersAnimation();
});

// Timeline Animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const timelineItem = entry.target;
                
                // Add staggered animation
                setTimeout(() => {
                    timelineItem.style.opacity = '1';
                    timelineItem.style.transform = 'translateX(0)';
                }, parseInt(timelineItem.dataset.delay) || 200);
                
                observer.unobserve(timelineItem);
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transition = 'all 0.6s ease';
        
        // Set initial position and delay
        if (index % 2 === 0) {
            item.style.transform = 'translateX(-50px)';
        } else {
            item.style.transform = 'translateX(50px)';
        }
        
        item.dataset.delay = index * 200;
        observer.observe(item);
    });
}

// Trust Member Cards Interaction
function initTrustMemberCards() {
    const trustCards = document.querySelectorAll('.trust-card');
    
    trustCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effect
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Value Cards Animation
function initValueCardsAnimations() {
    const valueCards = document.querySelectorAll('.value-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                card.classList.add('fade-in');
                
                // Add staggered animation
                const delay = Array.from(valueCards).indexOf(card) * 100;
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, delay);
                
                observer.unobserve(card);
            }
        });
    }, { threshold: 0.2 });
    
    valueCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Partners Animation
function initPartnersAnimation() {
    const partnerLogos = document.querySelectorAll('.partner-logo');
    
    partnerLogos.forEach((logo, index) => {
        logo.style.opacity = '0';
        logo.style.transform = 'scale(0.8)';
        logo.style.transition = 'all 0.5s ease';
        
        // Staggered appearance
        setTimeout(() => {
            logo.style.opacity = '1';
            logo.style.transform = 'scale(1)';
        }, index * 150);
    });
}

// Mission Vision Cards Animation
function initMVCardsAnimation() {
    const mvCards = document.querySelectorAll('.mv-card');
    
    mvCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 300);
    });
}

// Initialize when page loads
window.addEventListener('load', function() {
    initMVCardsAnimation();
    
    // Add loading animation to page header
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
        pageHeader.classList.add('fade-in');
    }
});

// Smooth scrolling for internal links
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

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});