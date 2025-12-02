// Form Validation Utility Functions
class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.fields = {};
        this.errors = {};
        this.init();
    }

    init() {
        if (!this.form) return;

        // Find all form fields
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            const fieldName = input.name || input.id;
            if (fieldName) {
                this.fields[fieldName] = input;
                
                // Add event listeners for real-time validation
                input.addEventListener('blur', () => this.validateField(fieldName));
                input.addEventListener('input', () => this.clearFieldError(fieldName));
            }
        });

        // Add submit event listener
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    addRule(fieldName, rule) {
        if (!this.fields[fieldName]) return;
        
        if (!this.fields[fieldName].rules) {
            this.fields[fieldName].rules = [];
        }
        this.fields[fieldName].rules.push(rule);
    }

    validateField(fieldName) {
        const field = this.fields[fieldName];
        if (!field || !field.rules) return true;

        let isValid = true;
        const value = field.value.trim();

        for (const rule of field.rules) {
            if (!rule.validator(value)) {
                this.showError(fieldName, rule.message);
                isValid = false;
                break;
            }
        }

        if (isValid) {
            this.clearError(fieldName);
        }

        return isValid;
    }

    validateAll() {
        let isValid = true;

        Object.keys(this.fields).forEach(fieldName => {
            const field = this.fields[fieldName];
            if (field.rules && !this.validateField(fieldName)) {
                isValid = false;
            }
        });

        return isValid;
    }

    showError(fieldName, message) {
        // Remove existing error
        this.clearError(fieldName);

        // Add error class to field
        const field = this.fields[fieldName];
        field.classList.add('error');

        // Create or update error message
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }

        errorElement.textContent = message;
        errorElement.style.display = 'block';

        this.errors[fieldName] = message;
    }

    clearError(fieldName) {
        const field = this.fields[fieldName];
        if (!field) return;

        field.classList.remove('error');

        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }

        delete this.errors[fieldName];
    }

    clearFieldError(fieldName) {
        const field = this.fields[fieldName];
        if (field && field.classList.contains('error')) {
            this.clearError(fieldName);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateAll()) {
            this.submitForm();
        } else {
            this.showFirstError();
        }
    }

    showFirstError() {
        const firstErrorField = Object.keys(this.errors)[0];
        if (firstErrorField) {
            const field = this.fields[firstErrorField];
            field.focus();
            
            // Scroll to first error
            field.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }

    submitForm() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());

        // Show loading state
        const submitButton = this.form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
            this.onSuccess(data);
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    }

    onSuccess(data) {
        // Show success message
        this.showSuccessMessage();
        
        // Reset form
        this.form.reset();
        
        // Clear all errors
        Object.keys(this.fields).forEach(fieldName => {
            this.clearError(fieldName);
        });
    }

    showSuccessMessage() {
        const successHTML = `
            <div class="form-success" style="
                background: #d4edda;
                border: 1px solid #c3e6cb;
                color: #155724;
                padding: 16px;
                border-radius: 8px;
                margin-bottom: 20px;
                text-align: center;
            ">
                <i class="fas fa-check-circle"></i>
                Form submitted successfully! We'll get back to you soon.
            </div>
        `;
        
        this.form.insertAdjacentHTML('beforebegin', successHTML);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            const successElement = this.form.previousElementSibling;
            if (successElement && successElement.classList.contains('form-success')) {
                successElement.remove();
            }
        }, 5000);
    }
}

// Common validation rules
const ValidationRules = {
    required: {
        validator: (value) => value && value.trim().length > 0,
        message: 'This field is required'
    },
    email: {
        validator: (value) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        },
        message: 'Please enter a valid email address'
    },
    phone: {
        validator: (value) => {
            if (!value) return true; // Optional field
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            return phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''));
        },
        message: 'Please enter a valid phone number'
    },
    minLength: (min) => ({
        validator: (value) => value.length >= min,
        message: `Must be at least ${min} characters long`
    }),
    maxLength: (max) => ({
        validator: (value) => value.length <= max,
        message: `Must be less than ${max} characters long`
    }),
    password: {
        validator: (value) => {
            const hasUpperCase = /[A-Z]/.test(value);
            const hasLowerCase = /[a-z]/.test(value);
            const hasNumbers = /\d/.test(value);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
            return value.length >= 8 && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
        },
        message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
    }
};

// Initialize form validation for all forms on page load
document.addEventListener('DOMContentLoaded', function() {
    // Contact form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const contactValidator = new FormValidator('contactForm');
        
        // Add validation rules
        contactValidator.addRule('fullName', ValidationRules.required);
        contactValidator.addRule('fullName', ValidationRules.minLength(2));
        contactValidator.addRule('email', ValidationRules.required);
        contactValidator.addRule('email', ValidationRules.email);
        contactValidator.addRule('phone', ValidationRules.phone);
        contactValidator.addRule('subject', ValidationRules.required);
        contactValidator.addRule('message', ValidationRules.required);
        contactValidator.addRule('message', ValidationRules.minLength(10));
    }

    // Newsletter form validation (if exists)
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        const newsletterValidator = new FormValidator('newsletterForm');
        newsletterValidator.addRule('email', ValidationRules.required);
        newsletterValidator.addRule('email', ValidationRules.email);
    }
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FormValidator, ValidationRules };
}