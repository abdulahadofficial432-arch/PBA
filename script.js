// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (mobileMenuToggle && sidebar && overlay) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-open');
            overlay.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (sidebar.classList.contains('mobile-open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('mobile-open');
            overlay.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
        
        // Close menu when clicking a nav link on mobile
        const navLinksMobile = document.querySelectorAll('.nav-link');
        navLinksMobile.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('mobile-open');
                    overlay.classList.remove('active');
                    const icon = mobileMenuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link, .icon-link');
    const sections = document.querySelectorAll('.section');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section') || this.getAttribute('href').substring(1);
            
            // Remove active class from all links
            document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
            document.querySelectorAll('.icon-link').forEach(icon => icon.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Sync the corresponding link on the other sidebar
            if (this.classList.contains('icon-link')) {
                // If icon-link clicked, highlight corresponding nav-link
                const correspondingNavLink = document.querySelector(`.nav-link[data-section="${targetSection}"]`);
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            } else if (this.classList.contains('nav-link')) {
                // If nav-link clicked, highlight corresponding icon-link
                const correspondingIconLink = document.querySelector(`.icon-link[data-section="${targetSection}"]`);
                if (correspondingIconLink) {
                    correspondingIconLink.classList.add('active');
                }
            }
            
            // Show target section
            showSection(targetSection);
            
            // Update URL without reload
            history.pushState(null, null, `#${targetSection}`);
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1) || 'home';
        showSection(hash);
        updateActiveNav(hash);
    });
    
    // Check initial hash
    const initialHash = window.location.hash.substring(1) || 'home';
    showSection(initialHash);
    updateActiveNav(initialHash);
    
    // Portfolio filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach((item, index) => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Smooth scroll animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.stat-card, .service-card, .resume-item, .testimonial-card, .contact-method');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Button hover effects
    const btnPrimary = document.querySelector('.btn-primary');
    if (btnPrimary) {
        btnPrimary.addEventListener('click', function() {
            showSection('about');
            updateActiveNav('about');
        });
    }
    
    // Parallax effect removed to prevent scroll conflicts
    // Sections are now navigated only via menu, not by scrolling
    
    // Add typing effect to name (optional enhancement)
    const nameElement = document.querySelector('.name');
    if (nameElement && !nameElement.classList.contains('typed')) {
        nameElement.classList.add('typed');
    }
});

// Function to show a specific section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    
    // Reset scroll position for all sections before switching
    sections.forEach(section => {
        section.classList.remove('active');
        section.scrollTop = 0; // Reset scroll position of each section
    });
    
    // Reset window scroll position
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Ensure the new section starts at the top
        targetSection.scrollTop = 0;
        
        // Prevent body scroll on home page
        if (sectionId === 'home') {
            document.body.classList.add('home-active');
        } else {
            document.body.classList.remove('home-active');
        }
        
        // Small delay to ensure scroll reset happens after display
        setTimeout(() => {
            targetSection.scrollTop = 0;
            window.scrollTo(0, 0);
        }, 10);
        
        // Trigger animations
        const animatedElements = targetSection.querySelectorAll('.section-title, .section-subtitle, .section-text, .stat-card, .service-card, .resume-item, .portfolio-item, .testimonial-card, .contact-method');
        animatedElements.forEach((el, index) => {
            el.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
        });
    }
}

// Function to update active navigation
function updateActiveNav(sectionId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId || link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
    
    document.querySelectorAll('.icon-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId || link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// Add smooth transitions between sections
document.addEventListener('DOMContentLoaded', function() {
    // Add transition effect to sections
    const style = document.createElement('style');
    style.textContent = `
        .section {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .section:not(.active) {
            opacity: 0;
            transform: translateY(20px);
            pointer-events: none;
        }
        
        .section.active {
            opacity: 1;
            transform: translateY(0);
            pointer-events: all;
        }
    `;
    document.head.appendChild(style);
});

// Add hover effects to portfolio items
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Add counter animation to stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('K') ? 'K' : '');
            clearInterval(timer);
        } else {
            const value = Math.floor(start);
            if (target.toString().includes('K')) {
                element.textContent = value + 'K';
            } else {
                element.textContent = value + (element.textContent.includes('+') ? '+' : '');
            }
        }
    }, 16);
}

// Observe stats for counter animation
document.addEventListener('DOMContentLoaded', function() {
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber) {
                    const text = statNumber.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    if (!isNaN(number)) {
                        statNumber.textContent = '0';
                        setTimeout(() => {
                            animateCounter(statNumber, number, 2000);
                        }, 200);
                    }
                }
            }
        });
    }, { threshold: 0.5 });
    
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        statsObserver.observe(card);
    });
});

// Smooth scroll behavior - only for internal page scrolling, not section switching
document.documentElement.style.scrollBehavior = 'smooth';

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Keyboard navigation disabled - sections only change via menu clicks
// This prevents automatic section switching when scrolling

