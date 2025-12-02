// Interactive Tools for TechSkill NGO Website

class SecurityTools {
    constructor() {
        this.init();
    }

    init() {
        this.initPasswordStrengthChecker();
        this.initPrivacyChecker();
        this.initCybersecurityQuiz();
    }

    // Password Strength Checker
    initPasswordStrengthChecker() {
        const passwordInput = document.getElementById('passwordInput');
        const strengthMeter = document.getElementById('strengthMeter');
        const strengthText = document.getElementById('strengthText');
        const suggestions = document.getElementById('passwordSuggestions');

        if (!passwordInput) return;

        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            const strength = this.checkPasswordStrength(password);
            
            this.updateStrengthMeter(strength, strengthMeter, strengthText);
            this.showPasswordSuggestions(password, suggestions);
        });
    }

    checkPasswordStrength(password) {
        let score = 0;
        let feedback = [];

        // Length check
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;

        // Character variety checks
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/\d/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        // Common password check
        const commonPasswords = ['password', '123456', 'qwerty', 'letmein', 'welcome'];
        if (commonPasswords.includes(password.toLowerCase())) {
            score = 0;
            feedback.push('This is a very common password. Please choose something more unique.');
        }

        // Sequential characters check
        if (/(.)\1{2,}/.test(password)) {
            score -= 1;
            feedback.push('Avoid repeating characters multiple times.');
        }

        // Score mapping
        if (score <= 2) return { level: 'weak', score, feedback };
        if (score <= 4) return { level: 'fair', score, feedback };
        if (score <= 5) return { level: 'good', score, feedback };
        return { level: 'strong', score, feedback };
    }

    updateStrengthMeter(strength, meter, text) {
        if (!meter || !text) return;

        const levels = {
            weak: { color: '#e74c3c', text: 'Weak', width: '25%' },
            fair: { color: '#e67e22', text: 'Fair', width: '50%' },
            good: { color: '#f1c40f', text: 'Good', width: '75%' },
            strong: { color: '#27ae60', text: 'Strong', width: '100%' }
        };

        const level = levels[strength.level];
        
        meter.style.width = level.width;
        meter.style.backgroundColor = level.color;
        text.textContent = level.text;
        text.style.color = level.color;
    }

    showPasswordSuggestions(password, container) {
        if (!container) return;

        const suggestions = [];
        
        if (password.length < 8) {
            suggestions.push('Use at least 8 characters');
        }
        if (!/[a-z]/.test(password)) {
            suggestions.push('Include lowercase letters');
        }
        if (!/[A-Z]/.test(password)) {
            suggestions.push('Include uppercase letters');
        }
        if (!/\d/.test(password)) {
            suggestions.push('Include numbers');
        }
        if (!/[^A-Za-z0-9]/.test(password)) {
            suggestions.push('Include special characters');
        }

        container.innerHTML = suggestions.length > 0 
            ? '<strong>Suggestions:</strong><br>' + suggestions.join('<br>')
            : 'Great! Your password meets all security criteria.';
    }

    // Privacy Checker
    initPrivacyChecker() {
        const privacyForm = document.getElementById('privacyForm');
        const privacyResult = document.getElementById('privacyResult');

        if (!privacyForm || !privacyResult) return;

        privacyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.runPrivacyCheck(privacyResult);
        });
    }

    runPrivacyCheck(resultContainer) {
        const questions = [
            'Do you use unique passwords for different accounts?',
            'Do you enable two-factor authentication?',
            'Do you regularly review privacy settings?',
            'Do you avoid sharing personal information publicly?',
            'Do you use privacy-focused browsers/extensions?',
            'Do you regularly update your software?',
            'Do you use a VPN on public Wi-Fi?',
            'Do you review app permissions before installing?'
        ];

        let score = 0;
        const results = [];

        // Simulate checking user responses
        questions.forEach((question, index) => {
            const randomResponse = Math.random() > 0.3; // 70% chance of good practice
            if (randomResponse) score++;
            
            results.push({
                question,
                status: randomResponse ? 'good' : 'needs-improvement',
                recommendation: randomResponse ? 
                    'Good practice!' : 
                    'Consider improving this area for better privacy.'
            });
        });

        this.displayPrivacyResults(score, results.length, results, resultContainer);
    }

    displayPrivacyResults(score, total, results, container) {
        const percentage = Math.round((score / total) * 100);
        let rating, color, message;

        if (percentage >= 80) {
            rating = 'Excellent';
            color = '#27ae60';
            message = 'Your privacy practices are strong! Keep up the good work.';
        } else if (percentage >= 60) {
            rating = 'Good';
            color = '#f1c40f';
            message = 'Your privacy is fairly protected, but there is room for improvement.';
        } else {
            rating = 'Needs Improvement';
            color = '#e74c3c';
            message = 'Your privacy practices need significant improvement for better protection.';
        }

        const resultsHTML = `
            <div class="privacy-score" style="text-align: center; margin-bottom: 30px;">
                <div class="score-circle" style="
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    background: ${color};
                    color: white;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    font-weight: bold;
                ">
                    <div style="font-size: 2rem;">${percentage}%</div>
                    <div style="font-size: 0.9rem;">${rating}</div>
                </div>
                <p style="font-size: 1.1rem; color: ${color}; font-weight: 600;">${message}</p>
            </div>
            <div class="detailed-results">
                <h4 style="margin-bottom: 20px;">Detailed Analysis:</h4>
                ${results.map(result => `
                    <div class="result-item" style="
                        display: flex;
                        align-items: center;
                        gap: 15px;
                        padding: 15px;
                        background: ${result.status === 'good' ? '#d4edda' : '#f8d7da'};
                        border-radius: 8px;
                        margin-bottom: 10px;
                    ">
                        <i class="fas fa-${result.status === 'good' ? 'check' : 'exclamation'}-circle" 
                           style="color: ${result.status === 'good' ? '#27ae60' : '#e74c3c'};"></i>
                        <div>
                            <strong>${result.question}</strong>
                            <div style="color: #666; font-size: 0.9rem; margin-top: 5px;">
                                ${result.recommendation}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        container.innerHTML = resultsHTML;
        container.style.display = 'block';
    }

    // Cybersecurity Quiz
    initCybersecurityQuiz() {
        const quizContainer = document.getElementById('quizContainer');
        const startQuizBtn = document.getElementById('startQuizBtn');
        const quizResult = document.getElementById('quizResult');

        if (!startQuizBtn) return;

        startQuizBtn.addEventListener('click', () => {
            this.startQuiz(quizContainer, quizResult);
        });
    }

    startQuiz(container, resultContainer) {
        const quizData = [
            {
                question: "What is the most secure way to create a password?",
                options: [
                    "Using personal information like birthdates",
                    "A combination of random words with numbers and symbols",
                    "Simple words that are easy to remember",
                    "The same password for all accounts"
                ],
                correct: 1,
                explanation: "A combination of random words with numbers and symbols creates a strong, memorable password that's hard to crack."
            },
            {
                question: "What should you do if you receive a suspicious email asking for personal information?",
                options: [
                    "Reply with the requested information",
                    "Click on any links to verify the sender",
                    "Delete the email and report it as spam",
                    "Forward it to friends to warn them"
                ],
                correct: 2,
                explanation: "Always delete suspicious emails and report them as spam. Never click links or provide personal information."
            },
            {
                question: "Why is two-factor authentication important?",
                options: [
                    "It makes logging in faster",
                    "It provides an extra layer of security",
                    "It's required by all websites",
                    "It replaces the need for strong passwords"
                ],
                correct: 1,
                explanation: "Two-factor authentication adds an extra security layer by requiring both your password and a second verification method."
            },
            {
                question: "What is phishing?",
                options: [
                    "A fishing hobby",
                    "A type of computer virus",
                    "A fraudulent attempt to obtain sensitive information",
                    "A method to speed up internet connection"
                ],
                correct: 2,
                explanation: "Phishing is a cyber attack that uses disguised emails or websites to trick users into revealing sensitive information."
            },
            {
                question: "When should you update your software?",
                options: [
                    "Only when new features are added",
                    "Whenever updates are available",
                    "Once a year",
                    "Never, to avoid changes"
                ],
                correct: 1,
                explanation: "Regular software updates include security patches that protect against newly discovered vulnerabilities."
            }
        ];

        this.displayQuiz(quizData, container, resultContainer);
    }

    displayQuiz(quizData, container, resultContainer) {
        let currentQuestion = 0;
        let score = 0;
        let userAnswers = [];

        const showQuestion = () => {
            if (currentQuestion >= quizData.length) {
                this.showQuizResults(score, quizData.length, userAnswers, resultContainer);
                return;
            }

            const question = quizData[currentQuestion];
            const questionHTML = `
                <div class="quiz-question">
                    <h3>Question ${currentQuestion + 1} of ${quizData.length}</h3>
                    <p style="font-size: 1.1rem; margin-bottom: 20px;">${question.question}</p>
                    <div class="quiz-options">
                        ${question.options.map((option, index) => `
                            <label class="quiz-option" style="
                                display: block;
                                padding: 15px;
                                margin-bottom: 10px;
                                border: 2px solid #e0e0e0;
                                border-radius: 8px;
                                cursor: pointer;
                                transition: all 0.3s ease;
                            ">
                                <input type="radio" name="quiz-answer" value="${index}" style="margin-right: 10px;">
                                ${option}
                            </label>
                        `).join('')}
                    </div>
                    <button class="btn btn-primary" onclick="tools.submitAnswer()" style="margin-top: 20px;">
                        ${currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    </button>
                </div>
            `;

            container.innerHTML = questionHTML;

            // Add hover effects to options
            const options = container.querySelectorAll('.quiz-option');
            options.forEach(option => {
                option.addEventListener('mouseenter', function() {
                    this.style.borderColor = '#3498db';
                    this.style.backgroundColor = '#f8f9fa';
                });
                option.addEventListener('mouseleave', function() {
                    this.style.borderColor = '#e0e0e0';
                    this.style.backgroundColor = 'transparent';
                });
            });
        };

        this.submitAnswer = () => {
            const selectedOption = container.querySelector('input[name="quiz-answer"]:checked');
            if (!selectedOption) {
                alert('Please select an answer before continuing.');
                return;
            }

            const answer = parseInt(selectedOption.value);
            const isCorrect = answer === quizData[currentQuestion].correct;
            
            if (isCorrect) score++;

            userAnswers.push({
                question: quizData[currentQuestion].question,
                userAnswer: quizData[currentQuestion].options[answer],
                correctAnswer: quizData[currentQuestion].options[quizData[currentQuestion].correct],
                explanation: quizData[currentQuestion].explanation,
                isCorrect
            });

            currentQuestion++;
            showQuestion();
        };

        showQuestion();
    }

    showQuizResults(score, total, answers, container) {
        const percentage = Math.round((score / total) * 100);
        let message, color;

        if (percentage >= 80) {
            message = 'Excellent! You have strong cybersecurity knowledge.';
            color = '#27ae60';
        } else if (percentage >= 60) {
            message = 'Good! You have basic cybersecurity awareness.';
            color = '#f1c40f';
        } else {
            message = 'You should learn more about cybersecurity basics.';
            color = '#e74c3c';
        }

        const resultsHTML = `
            <div class="quiz-results" style="text-align: center;">
                <h3 style="color: ${color}; margin-bottom: 20px;">Quiz Complete!</h3>
                <div class="score-display" style="
                    background: ${color};
                    color: white;
                    padding: 30px;
                    border-radius: 12px;
                    margin-bottom: 30px;
                ">
                    <div style="font-size: 3rem; font-weight: bold;">${score}/${total}</div>
                    <div style="font-size: 1.5rem;">${percentage}%</div>
                    <div style="margin-top: 10px;">${message}</div>
                </div>
                
                <div class="answers-review">
                    <h4 style="margin-bottom: 20px;">Review Your Answers:</h4>
                    ${answers.map((answer, index) => `
                        <div class="answer-item" style="
                            padding: 20px;
                            margin-bottom: 15px;
                            border-radius: 8px;
                            background: ${answer.isCorrect ? '#d4edda' : '#f8d7da'};
                            border-left: 4px solid ${answer.isCorrect ? '#27ae60' : '#e74c3c'};
                        ">
                            <div style="font-weight: bold; margin-bottom: 10px;">
                                Q${index + 1}: ${answer.question}
                            </div>
                            <div style="margin-bottom: 5px;">
                                <strong>Your answer:</strong> ${answer.userAnswer}
                                ${answer.isCorrect ? 
                                    ' <i class="fas fa-check" style="color: #27ae60;"></i>' : 
                                    ' <i class="fas fa-times" style="color: #e74c3c;"></i>'
                                }
                            </div>
                            ${!answer.isCorrect ? `
                                <div style="margin-bottom: 5px;">
                                    <strong>Correct answer:</strong> ${answer.correctAnswer}
                                </div>
                            ` : ''}
                            <div style="color: #666; font-size: 0.9rem;">
                                <strong>Explanation:</strong> ${answer.explanation}
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <button class="btn btn-primary" onclick="tools.restartQuiz()" style="margin-top: 20px;">
                    <i class="fas fa-redo"></i> Take Quiz Again
                </button>
            </div>
        `;

        container.innerHTML = resultsHTML;
        container.style.display = 'block';
    }

    restartQuiz() {
        // This would reload the quiz - implementation depends on specific structure
        location.reload();
    }
}

// Initialize tools when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.tools = new SecurityTools();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SecurityTools;
}