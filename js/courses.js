// Course filtering and interaction functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryFilter = document.getElementById('categoryFilter');
    const levelFilter = document.getElementById('levelFilter');
    const durationFilter = document.getElementById('durationFilter');
    const resetFilters = document.getElementById('resetFilters');
    const resetFiltersBtn = document.getElementById('resetFiltersBtn');
    const coursesGrid = document.getElementById('coursesGrid');
    const noResults = document.getElementById('noResults');
    
    // Filter courses
    function filterCourses() {
        const category = categoryFilter.value;
        const level = levelFilter.value;
        const duration = durationFilter.value;
        
        const courseCards = document.querySelectorAll('.course-card');
        let visibleCount = 0;
        
        courseCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardLevel = card.dataset.level;
            const cardDuration = card.dataset.duration;
            
            const categoryMatch = category === 'all' || cardCategory === category;
            const levelMatch = level === 'all' || cardLevel === level;
            const durationMatch = duration === 'all' || cardDuration === duration;
            
            if (categoryMatch && levelMatch && durationMatch) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        if (visibleCount === 0) {
            noResults.style.display = 'block';
            coursesGrid.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            coursesGrid.style.display = 'grid';
        }
    }
    
    // Reset all filters
    function resetAllFilters() {
        categoryFilter.value = 'all';
        levelFilter.value = 'all';
        durationFilter.value = 'all';
        filterCourses();
    }
    
    // Event listeners for filters
    categoryFilter.addEventListener('change', filterCourses);
    levelFilter.addEventListener('change', filterCourses);
    durationFilter.addEventListener('change', filterCourses);
    resetFilters.addEventListener('click', resetAllFilters);
    resetFiltersBtn.addEventListener('click', resetAllFilters);
    
    // Category card clicks
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            categoryFilter.value = category;
            filterCourses();
            
            // Scroll to courses section
            document.querySelector('.courses-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Enroll Now buttons
    document.querySelectorAll('.course-card .btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const courseCard = this.closest('.course-card');
            const courseTitle = courseCard.querySelector('.course-title').textContent;
            
            showEnrollmentModal(courseTitle);
        });
    });
    
    // View Details buttons
    document.querySelectorAll('.course-details-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const courseCard = this.closest('.course-card');
            const courseTitle = courseCard.querySelector('.course-title').textContent;
            const courseDescription = courseCard.querySelector('.course-description').textContent;
            const courseLevel = courseCard.querySelector('.course-badge').textContent;
            const courseDuration = courseCard.querySelector('.meta-item').textContent.trim();
            
            showCourseDetails(courseTitle, courseDescription, courseLevel, courseDuration);
        });
    });
    
    // CTA buttons
    document.querySelector('.cta-section .btn-primary').addEventListener('click', function() {
        document.querySelector('.courses-section').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    document.querySelector('.cta-section .btn-secondary').addEventListener('click', function() {
        window.location.href = 'contact.html';
    });
    
    // Donate button
    document.querySelector('.header-actions .btn-primary').addEventListener('click', function() {
        window.location.href = 'donate.html';
    });
});

// Show enrollment modal
function showEnrollmentModal(courseTitle) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content enrollment-modal">
            <div class="modal-header">
                <h3><i class="fas fa-graduation-cap"></i> Enroll in Course</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <h4>${courseTitle}</h4>
                <form class="enrollment-form" onsubmit="submitEnrollment(event, '${courseTitle}')">
                    <div class="form-group">
                        <label for="studentName">Full Name *</label>
                        <input type="text" id="studentName" required>
                    </div>
                    <div class="form-group">
                        <label for="studentEmail">Email Address *</label>
                        <input type="email" id="studentEmail" required>
                    </div>
                    <div class="form-group">
                        <label for="studentPhone">Phone Number *</label>
                        <input type="tel" id="studentPhone" required>
                    </div>
                    <div class="form-group">
                        <label for="studentLevel">Education Level *</label>
                        <select id="studentLevel" required>
                            <option value="">Select Level</option>
                            <option value="school">School Student</option>
                            <option value="college">College Student</option>
                            <option value="graduate">Graduate</option>
                            <option value="working">Working Professional</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="experience">Prior Experience</label>
                        <select id="experience">
                            <option value="none">No Experience</option>
                            <option value="basic">Basic Knowledge</option>
                            <option value="intermediate">Some Experience</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="motivation">Why do you want to take this course?</label>
                        <textarea id="motivation" rows="3" placeholder="Tell us about your goals..."></textarea>
                    </div>
                    <div class="enrollment-info">
                        <div class="info-item">
                            <i class="fas fa-calendar"></i>
                            <span>Next batch starts: January 15, 2025</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-users"></i>
                            <span>Limited seats: 25 students per batch</span>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-certificate"></i>
                            <span>Certificate provided upon completion</span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                <button type="submit" class="btn btn-primary" onclick="document.querySelector('.enrollment-form').requestSubmit()">
                    <i class="fas fa-paper-plane"></i> Submit Enrollment
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Show course details modal
function showCourseDetails(title, description, level, duration) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content course-details-modal">
            <div class="modal-header">
                <h3><i class="fas fa-info-circle"></i> Course Details</h3>
                <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="course-detail-header">
                    <h4>${title}</h4>
                    <span class="level-badge ${level.toLowerCase()}">${level}</span>
                </div>
                <div class="course-detail-content">
                    <div class="detail-section">
                        <h5><i class="fas fa-align-left"></i> Description</h5>
                        <p>${description}</p>
                    </div>
                    <div class="detail-section">
                        <h5><i class="fas fa-list"></i> What You'll Learn</h5>
                        <ul class="learning-outcomes">
                            <li>Fundamental concepts and practical applications</li>
                            <li>Hands-on projects and real-world scenarios</li>
                            <li>Industry best practices and current trends</li>
                            <li>Problem-solving and critical thinking skills</li>
                            <li>Certification preparation and career guidance</li>
                        </ul>
                    </div>
                    <div class="detail-section">
                        <h5><i class="fas fa-clock"></i> Course Information</h5>
                        <div class="course-info-grid">
                            <div class="info-item">
                                <strong>Duration:</strong> ${duration}
                            </div>
                            <div class="info-item">
                                <strong>Format:</strong> Online + Practical Sessions
                            </div>
                            <div class="info-item">
                                <strong>Language:</strong> English & Hindi
                            </div>
                            <div class="info-item">
                                <strong>Support:</strong> 24/7 Doubt Resolution
                            </div>
                        </div>
                    </div>
                    <div class="detail-section">
                        <h5><i class="fas fa-users"></i> Prerequisites</h5>
                        <p>Basic computer literacy and enthusiasm to learn. No prior technical experience required for beginner courses.</p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Close</button>
                <button type="button" class="btn btn-primary" onclick="this.closest('.modal-overlay').remove(); showEnrollmentModal('${title}')">
                    <i class="fas fa-graduation-cap"></i> Enroll Now
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Submit enrollment
function submitEnrollment(event, courseTitle) {
    event.preventDefault();
    
    const formData = {
        course: courseTitle,
        name: document.getElementById('studentName').value,
        email: document.getElementById('studentEmail').value,
        phone: document.getElementById('studentPhone').value,
        level: document.getElementById('studentLevel').value,
        experience: document.getElementById('experience').value,
        motivation: document.getElementById('motivation').value
    };
    
    // Simulate form submission
    const submitBtn = event.target.querySelector('button[type="submit"]') || 
                     document.querySelector('.modal-footer .btn-primary');
    
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Close modal and show success message
        document.querySelector('.modal-overlay').remove();
        
        showSuccessMessage(`
            <h4>🎉 Enrollment Successful!</h4>
            <p>Thank you for enrolling in <strong>${courseTitle}</strong>!</p>
            <p>We'll contact you within 24 hours with course details and payment information.</p>
            <div class="next-steps">
                <h5>Next Steps:</h5>
                <ul>
                    <li>Check your email for confirmation</li>
                    <li>Join our WhatsApp group for updates</li>
                    <li>Prepare for an amazing learning journey!</li>
                </ul>
            </div>
        `);
    }, 2000);
}

// Show success message
function showSuccessMessage(content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content success-modal">
            <div class="modal-body">
                ${content}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-check"></i> Got it!
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.remove();
    }, 10000); // Auto-close after 10 seconds
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .enrollment-modal, .course-details-modal {
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
    }
    
    .enrollment-form .form-group {
        margin-bottom: 20px;
    }
    
    .enrollment-form label {
        display: block;
        margin-bottom: 5px;
        font-weight: 600;
        color: var(--primary-color);
    }
    
    .enrollment-form input,
    .enrollment-form select,
    .enrollment-form textarea {
        width: 100%;
        padding: 10px;
        border: 2px solid var(--gray-light);
        border-radius: 5px;
        font-family: inherit;
        transition: border-color 0.3s ease;
    }
    
    .enrollment-form input:focus,
    .enrollment-form select:focus,
    .enrollment-form textarea:focus {
        outline: none;
        border-color: var(--secondary-color);
    }
    
    .enrollment-info {
        background: var(--background-color);
        padding: 20px;
        border-radius: 8px;
        margin-top: 20px;
    }
    
    .enrollment-info .info-item {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
        color: var(--text-color);
    }
    
    .enrollment-info i {
        color: var(--secondary-color);
        width: 20px;
    }
    
    .course-detail-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 2px solid var(--gray-light);
    }
    
    .level-badge {
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .level-badge.beginner {
        background: var(--secondary-color);
        color: white;
    }
    
    .level-badge.intermediate {
        background: var(--accent-color);
        color: white;
    }
    
    .level-badge.advanced {
        background: #e74c3c;
        color: white;
    }
    
    .detail-section {
        margin-bottom: 25px;
    }
    
    .detail-section h5 {
        color: var(--primary-color);
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .learning-outcomes {
        list-style: none;
        padding: 0;
    }
    
    .learning-outcomes li {
        padding: 8px 0;
        padding-left: 25px;
        position: relative;
    }
    
    .learning-outcomes li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--secondary-color);
        font-weight: bold;
    }
    
    .course-info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
    }
    
    .course-info-grid .info-item {
        padding: 10px;
        background: var(--background-color);
        border-radius: 5px;
    }
    
    .success-modal {
        max-width: 500px;
        text-align: center;
    }
    
    .success-modal h4 {
        color: var(--secondary-color);
        margin-bottom: 15px;
    }
    
    .next-steps {
        background: var(--background-color);
        padding: 20px;
        border-radius: 8px;
        margin-top: 20px;
        text-align: left;
    }
    
    .next-steps h5 {
        color: var(--primary-color);
        margin-bottom: 10px;
    }
    
    .next-steps ul {
        list-style: none;
        padding: 0;
    }
    
    .next-steps li {
        padding: 5px 0;
        padding-left: 20px;
        position: relative;
    }
    
    .next-steps li::before {
        content: '→';
        position: absolute;
        left: 0;
        color: var(--secondary-color);
        font-weight: bold;
    }
`;

document.head.appendChild(style);