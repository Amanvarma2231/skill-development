// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form
    initContactForm();
    
    // Initialize department contacts
    initDepartmentContacts();
    
    // Initialize FAQ functionality
    initFAQ();
    
    // Initialize emergency contact
    initEmergencyContact();
    
    // Initialize animations
    initContactAnimations();
});

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                submitForm();
            }
        });
        
        // Real-time validation
        setupRealTimeValidation();
    }
}

function validateForm() {
    let isValid = true;
    const form = document.getElementById('contactForm');
    
    // Clear previous errors
    clearErrors();
    
    // Validate full name
    const fullName = document.getElementById('fullName');
    if (!fullName.value.trim()) {
        showError('nameError', 'Full name is required');
        isValid = false;
    } else if (fullName.value.trim().length < 2) {
        showError('nameError', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError('emailError', 'Email address is required');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate phone (optional but if provided, validate format)
    const phone = document.getElementById('phone');
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (phone.value.trim() && !phoneRegex.test(phone.value.replace(/[\s\-\(\)]/g, ''))) {
        showError('phoneError', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate subject
    const subject = document.getElementById('subject');
    if (!subject.value) {
        showError('subjectError', 'Please select a subject');
        isValid = false;
    }
    
    // Validate message
    const message = document.getElementById('message');
    if (!message.value.trim()) {
        showError('messageError', 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError('messageError', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    return isValid;
}

function setupRealTimeValidation() {
    const inputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const fieldId = field.id;
    const value = field.value.trim();
    
    switch (fieldId) {
        case 'fullName':
            if (!value) {
                showError('nameError', 'Full name is required');
            } else if (value.length < 2) {
                showError('nameError', 'Name must be at least 2 characters long');
            } else {
                clearError('nameError');
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                showError('emailError', 'Email address is required');
            } else if (!emailRegex.test(value)) {
                showError('emailError', 'Please enter a valid email address');
            } else {
                clearError('emailError');
            }
            break;
            
        case 'phone':
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (value && !phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                showError('phoneError', 'Please enter a valid phone number');
            } else {
                clearError('phoneError');
            }
            break;
            
        case 'subject':
            if (!value) {
                showError('subjectError', 'Please select a subject');
            } else {
                clearError('subjectError');
            }
            break;
            
        case 'message':
            if (!value) {
                showError('messageError', 'Message is required');
            } else if (value.length < 10) {
                showError('messageError', 'Message must be at least 10 characters long');
            } else {
                clearError('messageError');
            }
            break;
    }
}

function clearFieldError(field) {
    const fieldId = field.id;
    const errorElementId = fieldId + 'Error';
    clearError(errorElementId);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Add error class to input
        const inputElement = document.getElementById(elementId.replace('Error', ''));
        if (inputElement) {
            inputElement.style.borderColor = '#E74C3C';
        }
    }
}

function clearError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        
        // Remove error class from input
        const inputElement = document.getElementById(elementId.replace('Error', ''));
        if (inputElement) {
            inputElement.style.borderColor = '';
        }
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
    
    const inputElements = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    inputElements.forEach(element => {
        element.style.borderColor = '';
    });
}

function submitForm() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showSuccessModal();
        
        // Reset form
        form.reset();
        clearErrors();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Department Contacts
function initDepartmentContacts() {
    const departmentButtons = document.querySelectorAll('.contact-dept-btn');
    
    departmentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const department = this.getAttribute('data-dept');
            showDepartmentContact(department);
        });
    });
}

// FAQ Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    const askQuestionBtn = document.getElementById('askQuestionBtn');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    if (askQuestionBtn) {
        askQuestionBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showAskQuestionModal();
        });
    }
}

// Emergency Contact
function initEmergencyContact() {
    // This would typically connect to emergency contact systems
    // For now, we'll just ensure the section is properly styled
}

// Animations
function initContactAnimations() {
    const contactCards = document.querySelectorAll('.contact-info-card');
    const departmentCards = document.querySelectorAll('.department-card');
    const faqItems = document.querySelectorAll('.faq-item');
    const visitNotes = document.querySelectorAll('.visit-note');
    
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
    
    // Animate contact info cards
    contactCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animate department cards
    departmentCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animate FAQ items
    faqItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.6s ease';
        item.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(item);
    });
    
    // Animate visit notes
    visitNotes.forEach((note, index) => {
        note.style.opacity = '0';
        note.style.transform = 'translateY(20px)';
        note.style.transition = 'all 0.6s ease';
        note.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(note);
    });
}

// Modal Functions
function showSuccessModal() {
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
                <div style="color: var(--secondary-color); font-size: 3rem; margin-bottom: 20px;">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3 style="color: var(--primary-color); margin-bottom: 16px;">Message Sent Successfully!</h3>
                <p style="margin-bottom: 24px; color: var(--text-color);">Thank you for contacting us. We have received your message and will get back to you within 24 hours.</p>
                <button class="btn btn-primary" onclick="closeModal()">Got it!</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

function showDepartmentContact(department) {
    const departmentNames = {
        'admissions': 'Course Admissions',
        'partnerships': 'Partnerships & Donations',
        'volunteer': 'Volunteer Program',
        'support': 'Technical Support'
    };
    
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
                <h3 style="color: var(--primary-color); margin-bottom: 16px;">Contact ${departmentNames[department]}</h3>
                <p style="margin-bottom: 24px; color: var(--text-color);">Department-specific contact form will be implemented in the next phase.</p>
                <button class="btn btn-primary" onclick="closeModal()">Got it!</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

function showAskQuestionModal() {
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
                <h3 style="color: var(--primary-color); margin-bottom: 16px;">Ask a Question</h3>
                <p style="margin-bottom: 24px; color: var(--text-color);">Question submission system will be implemented in the next phase.</p>
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
    const interactiveCards = document.querySelectorAll('.contact-info-card, .department-card');
    
    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});