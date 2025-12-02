// Events Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize event filtering
    initEventFiltering();
    
    // Initialize tab functionality
    initEventTabs();
    
    // Initialize event card animations
    initEventAnimations();
    
    // Initialize calendar
    initCalendar();
    
    // Initialize event actions
    initEventActions();
    
    // Initialize load more functionality
    initLoadMoreEvents();
});

// Event Filtering Functionality
function initEventFiltering() {
    const categoryFilter = document.getElementById('eventCategoryFilter');
    const dateFilter = document.getElementById('eventDateFilter');
    const locationFilter = document.getElementById('eventLocationFilter');
    const resetFiltersBtn = document.getElementById('resetEventFilters');
    const resetFiltersBtn2 = document.getElementById('resetEventsFiltersBtn');
    const eventsGrid = document.getElementById('eventsGrid');
    const noResults = document.getElementById('noEventsResults');
    const eventCards = document.querySelectorAll('.event-card');

    // Event Filtering Functionality
function initEventFiltering() {
    const categoryFilter = document.getElementById('eventCategoryFilter');
    const dateFilter = document.getElementById('eventDateFilter');
    const locationFilter = document.getElementById('eventLocationFilter');
    const resetFiltersBtn = document.getElementById('resetEventFilters');
    const resetFiltersBtn2 = document.getElementById('resetEventsFiltersBtn');
    const eventsGrid = document.getElementById('eventsGrid');
    const noResults = document.getElementById('noEventsResults');
    const eventCards = document.querySelectorAll('.event-card');

    // Filter events based on selections
    function filterEvents() {
        const categoryValue = categoryFilter.value;
        const dateValue = dateFilter.value;
        const locationValue = locationFilter.value;
        
        let visibleCount = 0;

        eventCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardDate = card.dataset.date;
            const cardLocation = card.dataset.location;
            
            const categoryMatch = categoryValue === 'all' || cardCategory === categoryValue;
            const dateMatch = dateValue === 'all' || cardDate === dateValue;
            const locationMatch = locationValue === 'all' || cardLocation === locationValue;
            
            if (categoryMatch && dateMatch && locationMatch) {
                card.style.display = 'flex';
                visibleCount++;
                
                // Add animation for appearing cards
                card.style.animation = 'fadeIn 0.6s ease';
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide no results message
        if (visibleCount === 0) {
            noResults.style.display = 'block';
            eventsGrid.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            eventsGrid.style.display = 'grid';
        }
    }

    // Event listeners for filters
    categoryFilter.addEventListener('change', filterEvents);
    dateFilter.addEventListener('change', filterEvents);
    locationFilter.addEventListener('change', filterEvents);

    // Reset filters
    function resetFilters() {
        categoryFilter.value = 'all';
        dateFilter.value = 'all';
        locationFilter.value = 'all';
        filterEvents();
    }

    resetFiltersBtn.addEventListener('click', resetFilters);
    if (resetFiltersBtn2) {
        resetFiltersBtn2.addEventListener('click', resetFilters);
    }
}

// Event Tabs Functionality
function initEventTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const eventSections = document.querySelectorAll('.events-section');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide relevant content
            // In a real implementation, this would load different event sets
            showTabContent(targetTab);
        });
    });
}

function showTabContent(tab) {
    const message = `Showing ${tab.replace('-', ' ')} content. This would load different events in a real implementation.`;
    
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
                <h3 style="color: var(--primary-color); margin-bottom: 16px;">${tab.charAt(0).toUpperCase() + tab.slice(1)} Events</h3>
                <p style="margin-bottom: 24px; color: var(--text-color);">${message}</p>
                <button class="btn btn-primary" onclick="closeModal()">Got it!</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

// Event Card Animations
function initEventAnimations() {
    const eventCards = document.querySelectorAll('.event-card');
    const highlightCards = document.querySelectorAll('.highlight-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                observer.unobserve(card);
            }
        });
    }, { threshold: 0.1 });
    
    // Animate event cards
    eventCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Animate highlight cards
    highlightCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        card.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
}

// Calendar Functionality
function initCalendar() {
    const currentMonthElement = document.getElementById('currentMonth');
    const calendarGrid = document.getElementById('calendarGrid');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Sample events data for the calendar
    const sampleEvents = {
        '2024-4-15': 'Cybersecurity Workshop',
        '2024-4-18': 'Girls Safety Webinar',
        '2024-4-20': 'Data Privacy Webinar',
        '2024-4-22': 'Python Seminar',
        '2024-5-5': 'Web Development Training',
        '2024-5-12': 'Cyber Security Challenge'
    };
    
    function renderCalendar() {
        // Update month header
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
        
        // Clear calendar grid
        calendarGrid.innerHTML = '';
        
        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day header';
            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);
        });
        
        // Get first day of month and number of days
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        // Add empty days for previous month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day other-month';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of current month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.innerHTML = `<div class="day-number">${day}</div>`;
            
            // Check if this day has an event
            const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;
            if (sampleEvents[dateKey]) {
                dayElement.classList.add('has-event');
                dayElement.innerHTML += `<div class="event-dot"></div>`;
                
                // Add click event to show event details
                dayElement.addEventListener('click', () => {
                    showCalendarEvent(sampleEvents[dateKey], `${monthNames[currentMonth]} ${day}, ${currentYear}`);
                });
            }
            
            calendarGrid.appendChild(dayElement);
        }
    }
    
    // Navigation event listeners
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });
    
    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });
    
    // Initial render
    renderCalendar();
}

function showCalendarEvent(eventTitle, eventDate) {
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
                <h3 style="color: var(--primary-color); margin-bottom: 16px;">${eventTitle}</h3>
                <p style="color: var(--secondary-color); font-weight: 600; margin-bottom: 16px;">${eventDate}</p>
                <p style="margin-bottom: 24px; color: var(--text-color);">Click "View Details" on the event card for more information.</p>
                <button class="btn btn-primary" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

// Event Actions
function initEventActions() {
    const registerButtons = document.querySelectorAll('.register-btn');
    const detailsButtons = document.querySelectorAll('.details-btn');
    const highlightButtons = document.querySelectorAll('.highlight-card .btn');

    registerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const eventCard = this.closest('.event-card');
            const eventTitle = eventCard.querySelector('.event-title').textContent;
            
            showRegistrationModal(eventTitle);
        });
    });

    detailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const eventCard = this.closest('.event-card');
            const eventTitle = eventCard.querySelector('.event-title').textContent;
            const eventDate = eventCard.querySelector('.date-day').textContent + ' ' + 
                            eventCard.querySelector('.date-month').textContent + ' ' + 
                            eventCard.querySelector('.date-year').textContent;
            
            showEventDetails(eventTitle, eventDate);
        });
    });

    highlightButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const highlightCard = this.closest('.highlight-card');
            const programTitle = highlightCard.querySelector('h3').textContent;
            
            showProgramDetails(programTitle);
        });
    });
}

// Load More Events Functionality
function initLoadMoreEvents() {
    const loadMoreBtn = document.getElementById('loadMoreEventsBtn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more events
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                showLoadMoreModal();
                this.innerHTML = '<i class="fas fa-plus"></i> Load More Events';
                this.disabled = false;
            }, 1500);
        });
    }
}

// Modal Functions
function showRegistrationModal(eventTitle) {
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
                <h3 style="color: var(--primary-color); margin-bottom: 16px;">Register for ${eventTitle}</h3>
                <p style="margin-bottom: 24px; color: var(--text-color);">Event registration system will be implemented in the next phase.</p>
                <button class="btn btn-primary" onclick="closeModal()">Got it!</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

function showEventDetails(eventTitle, eventDate) {
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
                <h3 style="color: var(--primary-color); margin-bottom: 16px;">${eventTitle}</h3>
                <p style="color: var(--secondary-color); font-weight: 600; margin-bottom: 24px;">${eventDate}</p>
                <p style="margin-bottom: 24px; color: var(--text-color);">Detailed event information including agenda, speakers, and requirements will be available in the next phase.</p>
                <button class="btn btn-primary" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

function showProgramDetails(programTitle) {
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
                <h3 style="color: var(--primary-color); margin-bottom: 16px;">${programTitle}</h3>
                <p style="margin-bottom: 24px; color: var(--text-color);">Program details and enrollment information will be available in the next phase.</p>
                <button class="btn btn-primary" onclick="closeModal()">Got it!</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

function showLoadMoreModal() {
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
                <h3 style="color: var(--primary-color); margin-bottom: 16px;">Load More Events</h3>
                <p style="margin-bottom: 24px; color: var(--text-color);">In a real implementation, this would load more events from the server.</p>
                <button class="btn btn-primary" onclick="closeModal()">Got it!</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

// CTA Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const suggestEventBtn = document.querySelector('.events-cta-section .btn-primary');
    const contactOrganizerBtn = document.querySelector('.events-cta-section .btn-secondary');
    
    if (suggestEventBtn) {
        suggestEventBtn.addEventListener('click', function() {
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
                        <h3 style="color: var(--primary-color); margin-bottom: 16px;">Suggest an Event</h3>
                        <p style="margin-bottom: 24px; color: var(--text-color);">Event suggestion system will be implemented in the next phase.</p>
                        <button class="btn btn-primary" onclick="closeModal()">Got it!</button>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (contactOrganizerBtn) {
        contactOrganizerBtn.addEventListener('click', function() {
            window.location.href = 'contact.html';
        });
    }
});

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
    const eventCards = document.querySelectorAll('.event-card, .highlight-card');
    
    eventCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});