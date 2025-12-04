// Google OAuth Configuration
// To set up Google Sign-In:
// 1. Go to Google Cloud Console (https://console.cloud.google.com/)
// 2. Create a new project or select existing one
// 3. Enable Google+ API
// 4. Create OAuth 2.0 credentials
// 5. Add your domain to authorized origins
// 6. Replace YOUR_GOOGLE_CLIENT_ID in auth.js with your actual client ID

const GOOGLE_CONFIG = {
    // Replace with your actual Google Client ID
    CLIENT_ID: "YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com",
    
    // Authorized domains (add your domain here)
    AUTHORIZED_DOMAINS: [
        "localhost",
        "127.0.0.1",
        "your-domain.com"
    ],
    
    // Scopes requested
    SCOPES: [
        "profile",
        "email"
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GOOGLE_CONFIG;
}
