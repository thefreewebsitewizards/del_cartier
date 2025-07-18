// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileServicesToggle = document.getElementById('mobile-services-toggle');
    const mobileServicesMenu = document.getElementById('mobile-services-menu');
    
    // Enhanced mobile menu toggle
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Mobile menu button clicked'); // Debug log
            
            // Toggle the hidden class
            mobileMenu.classList.toggle('hidden');
            
            // Update button icon
            const icon = this.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    } else {
        console.error('Mobile menu elements not found');
    }
    
    // Enhanced mobile services dropdown toggle
    if (mobileServicesToggle && mobileServicesMenu) {
        mobileServicesToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
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
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuButton.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
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

// Form submission handler for Gmail redirect
function handleFormSubmission(event, serviceType) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Get form values
    const name = form.querySelector('input[type="text"]').value || 'Not provided';
    const email = form.querySelector('input[type="email"]').value || 'Not provided';
    const phone = form.querySelector('input[type="tel"]')?.value || 'Not provided';
    const preferredDate = form.querySelector('input[type="date"]')?.value || 'Not provided';
    
    let subject = '';
    let body = '';
    
    // Create service-specific email content
    if (serviceType === 'content-filming') {
        const packageSelect = form.querySelector('#packageSelect') || form.querySelector('select[required]');
        const selectedPackage = packageSelect?.value || 'Not specified';
        const projectDetails = form.querySelector('textarea[required]')?.value || 'Not provided';
        
        subject = `Content Filming Booking Request - ${name}`;
        body = `Hi Delanna,\n\nI would like to book a content filming session with the following details:\n\n` +
               `Name: ${name}\n` +
               `Email: ${email}\n` +
               `Phone: ${phone}\n` +
               `Package Interest: ${selectedPackage}\n` +
               `Preferred Date: ${preferredDate}\n` +
               `Project Details: ${projectDetails}\n\n` +
               `Please let me know your availability and next steps.\n\n` +
               `Best regards,\n${name}`;
    } 
    else if (serviceType === 'academy') {
        const experienceLevel = form.querySelector('select[required]')?.value || 'Not specified';
        const goalsAndChallenges = form.querySelector('textarea[required]')?.value || 'Not provided';
        const preferredTime = form.querySelector('select:not([required])')?.value || 'Not specified';
        
        subject = `Del Cartier Academy Strategy Session Booking - ${name}`;
        body = `Hi Delanna,\n\nI would like to schedule a 90-minute strategy session with the following details:\n\n` +
               `Name: ${name}\n` +
               `Email: ${email}\n` +
               `Phone: ${phone}\n` +
               `Preferred Date: ${preferredDate}\n` +
               `Experience Level: ${experienceLevel}\n` +
               `Preferred Time: ${preferredTime}\n` +
               `Goals & Challenges: ${goalsAndChallenges}\n\n` +
               `I'm excited to work with you on developing my media strategy!\n\n` +
               `Best regards,\n${name}`;
    }
    else if (serviceType === 'media-management') {
        const serviceLevel = form.querySelector('select[required]')?.value || 'Not specified';
        const currentChallenges = form.querySelector('textarea[required]')?.value || 'Not provided';
        const businessType = form.querySelector('input[placeholder*="business"]')?.value || 'Not provided';
        
        subject = `Media Management Service Inquiry - ${name}`;
        body = `Hi Delanna,\n\nI'm interested in your media management services with the following details:\n\n` +
               `Name: ${name}\n` +
               `Email: ${email}\n` +
               `Phone: ${phone}\n` +
               `Business Type: ${businessType}\n` +
               `Service Level Interest: ${serviceLevel}\n` +
               `Preferred Start Date: ${preferredDate}\n` +
               `Current Challenges: ${currentChallenges}\n\n` +
               `I look forward to discussing how you can help grow my online presence.\n\n` +
               `Best regards,\n${name}`;
    }
    
    // Create Gmail URL with pre-filled content
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=Delannarichardson9@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Close the modal
    closeBookingModal();
    
    // Open Gmail in a new tab
    window.open(gmailUrl, '_blank');
}

// Add form submission listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add form submission handlers for all booking forms
    const contentFilmingForm = document.querySelector('#bookingModal form');
    if (contentFilmingForm && window.location.pathname.includes('content-filming')) {
        contentFilmingForm.addEventListener('submit', function(event) {
            handleFormSubmission(event, 'content-filming');
        });
    }
    
    if (contentFilmingForm && window.location.pathname.includes('del-cartier-academy')) {
        contentFilmingForm.addEventListener('submit', function(event) {
            handleFormSubmission(event, 'academy');
        });
    }
    
    if (contentFilmingForm && window.location.pathname.includes('media-management')) {
        contentFilmingForm.addEventListener('submit', function(event) {
            handleFormSubmission(event, 'media-management');
        });
    }
});
