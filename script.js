// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileServicesToggle = document.getElementById('mobile-services-toggle');
    const mobileServicesMenu = document.getElementById('mobile-services-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Mobile services dropdown toggle
    if (mobileServicesToggle && mobileServicesMenu) {
        mobileServicesToggle.addEventListener('click', function() {
            const chevron = this.querySelector('i');
            
            mobileServicesMenu.classList.toggle('hidden');
            
            // Rotate chevron icon
            if (mobileServicesMenu.classList.contains('hidden')) {
                chevron.classList.remove('fa-chevron-up');
                chevron.classList.add('fa-chevron-down');
            } else {
                chevron.classList.remove('fa-chevron-down');
                chevron.classList.add('fa-chevron-up');
            }
        });
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', function() {
        document.getElementById('mobile-menu').classList.add('hidden');
        // Also close services submenu
        document.getElementById('mobile-services-menu').classList.add('hidden');
        const chevron = document.querySelector('#mobile-services-toggle i');
        chevron.classList.remove('fa-chevron-up');
        chevron.classList.add('fa-chevron-down');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Booking Modal Functions
function openBookingModal(selectedPackage = '') {
    const modal = document.getElementById('bookingModal');
    const packageSelect = document.getElementById('packageSelect') || document.querySelector('select[required]');
    
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Pre-select package if provided
        if (selectedPackage && packageSelect) {
            packageSelect.value = selectedPackage;
        }
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Close modal when clicking outside of it
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('bookingModal');
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeBookingModal();
            }
        });
    }
    
    // Close modal with Escape key
     document.addEventListener('keydown', function(e) {
         if (e.key === 'Escape') {
             closeBookingModal();
         }
     });
 });