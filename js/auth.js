// Authentication functionality
document.addEventListener('DOMContentLoaded', function() {
    initAuthPage();
    createAuthParticles();
});

// Initialize auth page
function initAuthPage() {
    // Tab switching
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchTab(tabName);
        });
    });
    
    // Form validation
    setupFormValidation();
}

// Switch between login and signup tabs
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update forms
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.parentElement.querySelector('.toggle-password i');
    
    if (input.type === 'password') {
        input.type = 'text';
        button.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        button.className = 'fas fa-eye';
    }
}

// Check password strength
function checkPasswordStrength() {
    const password = document.getElementById('signupPassword').value;
    const strengthContainer = document.getElementById('passwordStrength');
    const strengthBar = strengthContainer.querySelector('.strength-bar');
    const strengthText = strengthContainer.querySelector('.strength-text');
    
    let score = 0;
    let feedback = '';
    
    // Length check
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 10;
    
    // Character variety
    if (/[a-z]/.test(password)) score += 15;
    if (/[A-Z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 20;
    
    // Update visual feedback
    strengthBar.style.width = score + '%';
    
    if (score < 30) {
        strengthBar.className = 'strength-bar weak';
        feedback = 'Weak password';
    } else if (score < 60) {
        strengthBar.className = 'strength-bar medium';
        feedback = 'Medium strength';
    } else if (score < 80) {
        strengthBar.className = 'strength-bar strong';
        feedback = 'Strong password';
    } else {
        strengthBar.className = 'strength-bar very-strong';
        feedback = 'Very strong password';
    }
    
    strengthText.textContent = feedback;
}

// Setup form validation
function setupFormValidation() {
    // Real-time email validation
    document.querySelectorAll('input[type="email"]').forEach(input => {
        input.addEventListener('blur', validateEmail);
    });
    
    // Password confirmation
    document.getElementById('confirmPassword').addEventListener('input', validatePasswordMatch);
}

// Validate email format
function validateEmail(event) {
    const email = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        showFieldError(event.target, 'Please enter a valid email address');
    } else {
        clearFieldError(event.target);
    }
}

// Validate password match
function validatePasswordMatch() {
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (confirmPassword && password !== confirmPassword) {
        showFieldError(document.getElementById('confirmPassword'), 'Passwords do not match');
    } else {
        clearFieldError(document.getElementById('confirmPassword'));
    }
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    field.parentElement.parentElement.appendChild(errorDiv);
    field.parentElement.classList.add('error');
}

// Clear field error
function clearFieldError(field) {
    const errorDiv = field.parentElement.parentElement.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.parentElement.classList.remove('error');
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Mock authentication
        if (email && password) {
            // Store user session
            const userData = {
                email: email,
                name: email.split('@')[0],
                loginTime: new Date().toISOString(),
                rememberMe: rememberMe
            };
            
            localStorage.setItem('techskill_user', JSON.stringify(userData));
            
            // Show success and redirect
            showSuccessModal('Welcome Back!', `Great to see you again, ${userData.name}!`);
        } else {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            alert('Please check your credentials and try again.');
        }
    }, 2000);
}

// Handle signup form submission
function handleSignup(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const userType = document.getElementById('userType').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    const newsletter = document.getElementById('newsletter').checked;
    
    // Validation
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    if (!agreeTerms) {
        alert('Please agree to the Terms of Service and Privacy Policy');
        return;
    }
    
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Mock registration
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            userType: userType,
            newsletter: newsletter,
            registrationDate: new Date().toISOString()
        };
        
        localStorage.setItem('techskill_user', JSON.stringify(userData));
        
        // Show success and redirect
        showSuccessModal('Account Created!', `Welcome to TechSkill NGO, ${firstName}! Your learning journey starts now.`);
    }, 2500);
}

// Google Login
function loginWithGoogle() {
    // Simulate Google OAuth
    showLoadingOverlay('Connecting to Google...');
    
    setTimeout(() => {
        const userData = {
            name: 'Google User',
            email: 'user@gmail.com',
            provider: 'google',
            avatar: 'https://via.placeholder.com/150',
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('techskill_user', JSON.stringify(userData));
        hideLoadingOverlay();
        showSuccessModal('Google Login Successful!', 'Welcome! You\'ve successfully signed in with Google.');
    }, 2000);
}

// Google Signup
function signupWithGoogle() {
    // Simulate Google OAuth for signup
    showLoadingOverlay('Creating account with Google...');
    
    setTimeout(() => {
        const userData = {
            name: 'New Google User',
            email: 'newuser@gmail.com',
            provider: 'google',
            avatar: 'https://via.placeholder.com/150',
            registrationDate: new Date().toISOString()
        };
        
        localStorage.setItem('techskill_user', JSON.stringify(userData));
        hideLoadingOverlay();
        showSuccessModal('Account Created with Google!', 'Your account has been created successfully using Google.');
    }, 2000);
}

// Facebook Login
function loginWithFacebook() {
    showLoadingOverlay('Connecting to Facebook...');
    
    setTimeout(() => {
        const userData = {
            name: 'Facebook User',
            email: 'user@facebook.com',
            provider: 'facebook',
            avatar: 'https://via.placeholder.com/150',
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('techskill_user', JSON.stringify(userData));
        hideLoadingOverlay();
        showSuccessModal('Facebook Login Successful!', 'Welcome! You\'ve successfully signed in with Facebook.');
    }, 2000);
}

// Facebook Signup
function signupWithFacebook() {
    showLoadingOverlay('Creating account with Facebook...');
    
    setTimeout(() => {
        const userData = {
            name: 'New Facebook User',
            email: 'newuser@facebook.com',
            provider: 'facebook',
            avatar: 'https://via.placeholder.com/150',
            registrationDate: new Date().toISOString()
        };
        
        localStorage.setItem('techskill_user', JSON.stringify(userData));
        hideLoadingOverlay();
        showSuccessModal('Account Created with Facebook!', 'Your account has been created successfully using Facebook.');
    }, 2000);
}

// Show loading overlay
function showLoadingOverlay(message) {
    const overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(overlay);
}

// Hide loading overlay
function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.remove();
    }
}

// Show success modal
function showSuccessModal(title, message) {
    document.getElementById('successTitle').textContent = title;
    document.getElementById('successMessage').textContent = message;
    document.getElementById('successModal').style.display = 'flex';
}

// Close success modal
function closeSuccessModal() {
    document.getElementById('successModal').style.display = 'none';
}

// Redirect to dashboard
function redirectToDashboard() {
    // Create a simple dashboard page or redirect to courses
    window.location.href = '../pages/courses.html';
}

// Show forgot password modal
function showForgotPassword() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Reset Password</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <p>Enter your email address and we'll send you a link to reset your password.</p>
                <form onsubmit="sendResetEmail(event)">
                    <div class="form-group">
                        <label for="resetEmail">Email Address</label>
                        <input type="email" id="resetEmail" placeholder="Enter your email" required>
                    </div>
                    <button type="submit" class="btn btn-primary">Send Reset Link</button>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Send reset email
function sendResetEmail(event) {
    event.preventDefault();
    const email = document.getElementById('resetEmail').value;
    
    setTimeout(() => {
        alert(`Password reset link sent to ${email}!`);
        document.querySelector('.modal-overlay').remove();
    }, 1000);
}

// Show terms modal
function showTerms() {
    alert('Terms of Service: By using TechSkill NGO services, you agree to our educational mission and community guidelines.');
}

// Show privacy modal
function showPrivacy() {
    alert('Privacy Policy: We protect your personal information and use it only to enhance your learning experience.');
}

// Create auth particles
function createAuthParticles() {
    const container = document.querySelector('.auth-particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(particle);
    }
}