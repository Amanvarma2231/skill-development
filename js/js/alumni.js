// Alumni Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize alumni stats counter
    initAlumniStats();
    
    // Initialize success stories
    initSuccessStories();
    
    // Initialize testimonials slider
    initTestimonialsSlider();
    
    // Initialize mentorship program
    initMentorshipProgram();
    
    // Initialize alumni network
    initAlumniNetwork();
    
    // Initialize animations
    initAlumniAnimations();
});

// Alumni Stats Counter
function initAlumniStats() {
    const statNumbers = document.querySelectorAll('.alumni-stats-section .stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    const target = parseFloat(stat.getAttribute('data-count'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        
                        if (stat.getAttribute('data-count').includes('.')) {
                            stat.textContent = current.toFixed(1);
                        } else {
                            stat.textContent = Math.floor(current).toLocaleString();
                        }
                    }, 16);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.alumni-stats-section'));
}

// Success Stories
function initSuccessStories() {
    const viewStoryButtons = document.querySelectorAll('.view-story-btn');
    const loadMoreBtn = document.getElementById('loadMoreStoriesBtn');
    
    viewStoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const storyCard = this.closest('.story-card');
            const alumniName = storyCard.querySelector('.story-name').textContent;
            const alumniRole = storyCard.querySelector('.story-role').textContent;
            
            showFullStory(alumniName, alumniRole);
        });
    });
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more stories
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                showLoadMoreStoriesModal();
                this.innerHTML = '<i class="fas fa-plus"></i> Load More Stories';
                this.disabled = false;
            }, 1500);
        });
    }
}

// Testimonials Slider
function initTestimonialsSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        showSlide(prevIndex);
    }
    
    // Auto-advance slides
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Event listeners
    nextBtn.addEventListener('click', function() {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    prevBtn.addEventListener('click', function() {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            clearInterval(slideInterval);
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            showSlide(slideIndex);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
    
    // Pause auto-advance on hover
    const slider = document.querySelector('.testimonials-slider');
    slider.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', function() {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// Mentorship Program
function initMentorshipProgram() {
    const mentorButtons = document.querySelectorAll('.mentorship-card .btn');
    
    mentorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const mentorshipCard = this.closest('.mentorship-card');
            const programType = mentorshipCard.querySelector('h3').textContent;
            
            if (programType === 'Become a Mentor') {
                showMentorApplication();
            } else {
                showFindMentor();
            }
        });
    });
}

// Alumni Network
function initAlumniNetwork() {
    const registerButton = document.querySelector('.network-cta .btn-primary');
    const loginButton = document.querySelector('.network-cta .btn-outline');
    const updateProfileButton = document.querySelector('.alumni-cta-section .btn-primary');
    const shareStoryButton = document.querySelector('.alumni-cta-section .btn-secondary');
    
    if (registerButton) {
        registerButton.addEventListener('click', function() {
            showAlumniRegistration();
        });
    }
    
    if (loginButton) {
        loginButton.addEventListener('click', function() {
            showAlumniLogin();
        });
    }
    
    if (updateProfileButton) {
        updateProfileButton.addEventListener('click', function() {
            showUpdateProfile();
        });
    }
    
    if (shareStoryButton) {
        shareStoryButton.addEventListener('click', function() {
            showShareStory();
        });
    }
}

// Alumni Animations
function initAlumniAnimations() {
    const storyCards = document.querySelectorAll('.story-card');
    const networkFeatures = document.querySelectorAll('.network-feature');
    const mentorshipCards = document.querySelectorAll('.mentorship-card');
    const outcomeItems = document.querySelectorAll('.outcome-item');
    const companyLogos = document.querySelectorAll('.company-logo');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                observer.unobserve(item);
            }
        });
    }, { threshold: 0.1 });
    
    // Animate story cards
    storyCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animate network features
    networkFeatures.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(30px)';
        feature.style.transition = 'all 0.6s ease';
        feature.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(feature);
    });
    
    // Animate mentorship cards
    mentorshipCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animate outcome items
    outcomeItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Animate company logos
    companyLogos.forEach((logo, index) => {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(20px)';
        logo.style.transition = 'all 0.6s ease';
        logo.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(logo);
    });
}

// Modal Functions
function showFullStory(alumniName, alumniRole) {
    const modalHTML = `
        <div class="modal-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        ">
            <div class="modal-content" style="
                background: white;
                padding: 40px;
                border-radius: 12px;
                max-width: 600px;
                width: 90%;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            ">
                <h3 style="color: var(--primary-color); margin-bottom: 16px;">${alumniName}</h3>
                <p style="color: var(--secondary-color); font-weight: 600; margin-bottom: 24px;">${alumniRole}</p>
                <p style="margin-bottom: 24px; color: var(--text-color);">Full success story and detailed journey will be available in the next phase.</p>
                <button class="btn btn-primary" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

function showLoadMoreStoriesModal() {
    const modalHTML = `
        <div class="modal-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        ">
            <div class="modal-content" style="
                background: white;
                padding: 40px;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            ">
                <h3 style="color: var(--primary-color); margin-bottom: 16px;">Load More Stories</h3>
                <p style="margin-bottom: 24px; color: var(--text-color);">In a real implementation, this would load more alumni success stories from the server.</p>
                <button class="btn btn-primary" onclick="closeModal()">Got it!</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

function showMentorApplication() {
    const modalHTML = `
        <div class="modal-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        ">
            <div class="modal-content" style="
                background: white;
                padding: 40px;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            ">
                <h3 style="color: var(--primary-color); margin-bottom: 16px;">Become a Mentor</h3>
                <p style="margin-bottom: 24px; color: var(--text-color);">Mentor application system will be implemented in the next phase.</p>
                <button class="btn btn-primary" onclick="closeModal()">Got it!</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

function showFindMentor() {
    const modalHTML = `
        <div class="modal-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        ">
            <div class="modal-content" style="
                background: white;
                padding: 40px;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            ">
                <h3 style="color: var(--primary-color); margin-bottom: 16px;">Find a Mentor</h3>
                <p style="margin-bottom: 24px; color: var(--text-color);">Mentor matching system will be implemented in the next phase.</p>
                <button class="btn btn-primary" onclick="closeModal()">Got it!</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

function showAlumniRegistration() {
    const modalHTML = `
        <div class="modal-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        ">
            <div class="modal-content" style="
                background: white;
                padding: 40px;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            ">
                <h3 style="color: var(--primary-color); margin-bottom: 16px;">Alumni Registration</h3>
                <p style="margin-bottom: 24px; color: var(--text-color);">Alumni registration system will be implemented in the next phase.</p>
                <button class="btn btn-primary" onclick="closeModal()">Got it!</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

function showAlumniLogin() {
    const modalHTML = `
        <div class="modal-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        ">
            <div class="modal-content" style="
                background: white;
                padding: 40px;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            ">
                <h3 style="color: var(--primary-color); margin-bottom: 16px;">Alumni Login</h3>
                <p style="margin-bottom: 24px; color: var(--text-color);">Alumni login system will be implemented in the next phase.</p>
                <button class="btn btn-primary" onclick="closeModal()">Got it!</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

function showUpdateProfile() {
    const modalHTML = `
        <div class="modal-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        ">
            <div class="modal-content" style="
                background: white;
                padding: 40px;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            ">
                <h3 style="color: var(--primary-color); margin-bottom: 16px;">Update Alumni Profile</h3>
                <p style="margin-bottom: 24px; color: var(--text-color);">Profile update system will be implemented in the next phase.</p>
                <button class="btn btn-primary" onclick="closeModal()">Got it!</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

function showShareStory() {
    const modalHTML = `
        <div class="modal-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        ">
            <div class="modal-content" style="
                background: white;
                padding: 40px;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            ">
                <h3 style="color: var(--primary-color); margin-bottom: 16px;">Share Your Success Story</h3>
                <p style="margin-bottom: 24px; color: var(--text-color);">Story submission system will be implemented in the next phase.</p>
                <button class="btn btn-primary" onclick="closeModal()">Got it!</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

// Close modal function
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
});

// Add keyboard escape functionality
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Add hover effects
document.addEventListener('DOMContentLoaded', function() {
    const interactiveElements = document.querySelectorAll('.story-card, .network-feature, .mentorship-card, .outcome-item, .company-logo');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});