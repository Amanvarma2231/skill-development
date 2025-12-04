// Authentication JavaScript
let isLoginMode = true;

// Toggle between login and signup forms
function toggleForm() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle');
    const toggleText = document.getElementById('toggleText');

    if (isLoginMode) {
        // Switch to signup
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
        authTitle.textContent = 'Create Account';
        authSubtitle.textContent = 'Join us to start your learning journey';
        toggleText.innerHTML = 'Already have an account? <a href="#" onclick="toggleForm()">Sign in</a>';
        isLoginMode = false;
    } else {
        // Switch to login
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
        authTitle.textContent = 'Welcome Back';
        authSubtitle.textContent = 'Sign in to continue your learning journey';
        toggleText.innerHTML = 'Don\'t have an account? <a href="#" onclick="toggleForm()">Sign up</a>';
        isLoginMode = true;
    }
}

// Google Sign-In Configuration
window.onload = function () {
    google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with your actual Google Client ID
        callback: handleCredentialResponse
    });
    
    google.accounts.id.renderButton(
        document.querySelector('.google-btn'),
        { 
            theme: "outline", 
            size: "large",
            width: "100%"
        }
    );
};

// Handle Google Sign-In Response
function handleCredentialResponse(response) {
    // Decode the JWT token
    const responsePayload = decodeJwtResponse(response.credential);
    
    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
    
    // Store user data in localStorage
    localStorage.setItem('user', JSON.stringify({
        id: responsePayload.sub,
        name: responsePayload.name,
        email: responsePayload.email,
        picture: responsePayload.picture,
        loginMethod: 'google'
    }));
    
    // Show success message
    showMessage('Successfully signed in with Google!', 'success');
    
    // Redirect to dashboard or home page after 2 seconds
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 2000);
}

// Alternative Google Sign-In function (fallback)
function signInWithGoogle() {
    google.accounts.id.prompt();
}

// Decode JWT token
function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

// Handle regular form submissions
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    
    // Basic validation
    if (!email || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate login process
    showMessage('Signing in...', 'info');
    
    // Here you would typically send data to your backend
    setTimeout(() => {
        // Store user data (simulate successful login)
        localStorage.setItem('user', JSON.stringify({
            email: email,
            name: email.split('@')[0],
            loginMethod: 'email'
        }));
        
        showMessage('Successfully signed in!', 'success');
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1500);
    }, 1000);
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('Password must be at least 6 characters', 'error');
        return;
    }
    
    // Simulate signup process
    showMessage('Creating account...', 'info');
    
    // Here you would typically send data to your backend
    setTimeout(() => {
        // Store user data (simulate successful signup)
        localStorage.setItem('user', JSON.stringify({
            name: name,
            email: email,
            loginMethod: 'email'
        }));
        
        showMessage('Account created successfully!', 'success');
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1500);
    }, 1000);
});

// Show message function
function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.auth-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `auth-message ${type}`;
    messageDiv.textContent = message;
    
    // Add styles
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            messageDiv.style.background = '#10b981';
            break;
        case 'error':
            messageDiv.style.background = '#ef4444';
            break;
        case 'info':
            messageDiv.style.background = '#3b82f6';
            break;
    }
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
