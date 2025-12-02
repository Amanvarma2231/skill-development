// Gallery Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery filtering
    initGalleryFiltering();
    
    // Initialize gallery item animations
    initGalleryAnimations();
    
    // Initialize video gallery
    initVideoGallery();
    
    // Initialize download buttons
    initDownloadButtons();
    
    // Initialize load more functionality
    initLoadMore();
});

// Gallery Filtering Functionality
function initGalleryFiltering() {
    const categoryFilter = document.getElementById('galleryCategoryFilter');
    const yearFilter = document.getElementById('galleryYearFilter');
    const resetFiltersBtn = document.getElementById('resetGalleryFilters');
    const resetFiltersBtn2 = document.getElementById('resetGalleryFiltersBtn');
    const galleryGrid = document.getElementById('galleryGrid');
    const noResults = document.getElementById('noGalleryResults');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Filter gallery based on selections
    function filterGallery() {
        const categoryValue = categoryFilter.value;
        const yearValue = yearFilter.value;
        
        let visibleCount = 0;

        galleryItems.forEach(item => {
            const itemCategory = item.dataset.category;
            const itemYear = item.dataset.year;
            
            const categoryMatch = categoryValue === 'all' || itemCategory === categoryValue;
            const yearMatch = yearValue === 'all' || itemYear === yearValue;
            
            if (categoryMatch && yearMatch) {
                item.style.display = 'block';
                visibleCount++;
                
                // Add animation for appearing items
                item.style.animation = 'fadeIn 0.6s ease';
            } else {
                item.style.display = 'none';
            }
        });

        // Show/hide no results message
        if (visibleCount === 0) {
            noResults.style.display = 'block';
            galleryGrid.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            galleryGrid.style.display = 'grid';
        }
    }

    // Event listeners for filters
    categoryFilter.addEventListener('change', filterGallery);
    yearFilter.addEventListener('change', filterGallery);

    // Reset filters
    function resetFilters() {
        categoryFilter.value = 'all';
        yearFilter.value = 'all';
        filterGallery();
    }

    resetFiltersBtn.addEventListener('click', resetFilters);
    if (resetFiltersBtn2) {
        resetFiltersBtn2.addEventListener('click', resetFilters);
    }
}

// Gallery Item Animations
function initGalleryAnimations() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const videoItems = document.querySelectorAll('.video-item');
    const downloadItems = document.querySelectorAll('.download-item');
    
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
    
    // Animate gallery items
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Animate video items
    videoItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        item.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(item);
    });
    
    // Animate download items
    downloadItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
}

// Video Gallery Functionality
function initVideoGallery() {
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const videoItem = this.closest('.video-item');
            const videoTitle = videoItem.querySelector('h4').textContent;
            
            showVideoModal(videoTitle);
        });
    });
}

// View Gallery Button Functionality
function initViewGalleryButtons() {
    const viewButtons = document.querySelectorAll('.view-gallery-btn');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const galleryItem = this.closest('.gallery-item');
            const galleryTitle = galleryItem.querySelector('.gallery-title').textContent;
            
            showPhotoGallery(galleryTitle);
        });
    });
}

// Download Buttons Functionality
function initDownloadButtons() {
    const downloadButtons = document.querySelectorAll('.download-item .btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const downloadItem = this.closest('.download-item');
            const resourceName = downloadItem.querySelector('h4').textContent;
            
            // Simulate download
            simulateDownload(resourceName);
        });
    });
}

// Load More Functionality
function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more items
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                // In a real implementation, this would fetch more data
                showLoadMoreModal();
                this.innerHTML = '<i class="fas fa-plus"></i> Load More Events';
                this.disabled = false;
            }, 1500);
        });
    }
}

// Modal Functions
function showVideoModal(videoTitle) {
    const modalHTML = `
        <div class="modal-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        ">
            <div class="modal-content" style="
                background: transparent;
                padding: 20px;
                max-width: 800px;
                width: 90%;
                text-align: center;
                color: white;
            ">
                <h3 style="margin-bottom: 20px;">${videoTitle}</h3>
                <div style="
                    background: var(--primary-color);
                    height: 400px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    margin-bottom: 20px;
                ">
                    <i class="fas fa-play-circle" style="font-size: 4rem;"></i>
                </div>
                <p style="margin-bottom: 24px; opacity: 0.8;">Video player will be implemented in the next phase.</p>
                <button class="btn btn-primary" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

function showPhotoGallery(galleryTitle) {
    const modalHTML = `
        <div class="modal-overlay" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        ">
            <div class="modal-content" style="
                background: transparent;
                padding: 20px;
                max-width: 900px;
                width: 90%;
                text-align: center;
                color: white;
            ">
                <h3 style="margin-bottom: 20px;">${galleryTitle} - Photo Gallery</h3>
                <p style="margin-bottom: 24px; opacity: 0.8;">Photo gallery viewer will be implemented in the next phase.</p>
                <button class="btn btn-primary" onclick="closeModal()">Close Gallery</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.body.style.overflow = 'hidden';
}

function simulateDownload(resourceName) {
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
                <h3 style="color: var(--primary-color); margin-bottom: 16px;">Download ${resourceName}</h3>
                <p style="margin-bottom: 24px; color: var(--text-color);">Download functionality will be implemented in the next phase.</p>
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
                <p style="margin-bottom: 24px; color: var(--text-color);">In a real implementation, this would load more gallery items from the server.</p>
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

// Initialize view gallery buttons when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initViewGalleryButtons();
    
    // Add hover effects
    const galleryItems = document.querySelectorAll('.gallery-item, .video-item, .download-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});