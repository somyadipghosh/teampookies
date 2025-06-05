// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Ensure preloader is removed properly after exactly 5 seconds
    function removePreloader() {
        if (preloader) {
            preloader.classList.add('fade-out');
            // Enable scrolling on body once preloader is gone
            document.body.style.overflow = 'visible';
            // Make sure preloader is completely removed after animation completes
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1000);
        }
    }
    
    // Set a fixed 5-second timer for the preloader
    setTimeout(removePreloader, 5000);
    
    // Prevent scrolling while preloader is active
    if (preloader) {
        document.body.style.overflow = 'hidden';
    }
    
    // DOM Elements
    const nav = document.querySelector('nav');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    const cursor = document.querySelector('.cursor');
    const allLinks = document.querySelectorAll('a');
    const buttons = document.querySelectorAll('.btn');
    const projectsSlider = document.querySelector('.projects-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const sliderDots = document.querySelector('.slider-dots');
    const backToTopBtn = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.querySelector('.form-message');
    const revealElements = document.querySelectorAll('.reveal');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    const testimonialSlides = document.querySelector('.testimonial-slides');
    const testimonialNext = document.querySelector('.testimonial-next');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialDots = document.querySelector('.testimonial-dots');

    // Apply theme across all elements with transition
    function applyTheme(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
    
    // Set initial theme based on local storage or system preference
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkMode.matches)) {
        applyTheme(true);
    }

    // Toggle dark mode with smooth transition
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDarkMode = !document.body.classList.contains('dark-mode');
            
            // Apply theme changes
            applyTheme(isDarkMode);
            
            // Save preference to localStorage
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            
            // Add animation effect
            darkModeToggle.classList.add('clicked');
            setTimeout(() => {
                darkModeToggle.classList.remove('clicked');
            }, 500);
        });
    }
    
    // Listen for system preference changes
    prefersDarkMode.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches);
        }
    });

    // Custom cursor - Enhanced
    if (cursor) {
        // Custom cursor positioning
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Add hover effects to interactive elements
        const cursorInteractiveElements = document.querySelectorAll('a, button, .btn, input[type="submit"], .project-card, .team-member, .timeline-item, .testimonial-card, .testimonial-prev, .testimonial-next');
        
        cursorInteractiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('grow');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('grow');
            });
            
            element.addEventListener('mousedown', () => {
                cursor.classList.add('shrink');
            });
            
            element.addEventListener('mouseup', () => {
                cursor.classList.remove('shrink');
            });
        });
        
        // Hide default cursor on desktop
        document.body.style.cursor = 'none';
        cursorInteractiveElements.forEach(element => {
            element.style.cursor = 'none';
        });
        
        // Show default cursor on touch devices
        if ('ontouchstart' in window) {
            cursor.style.display = 'none';
            document.body.style.cursor = 'auto';
            
            cursorInteractiveElements.forEach(element => {
                element.style.cursor = 'pointer';
            });
        }
    }

    // Navigation Toggle
    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burger.classList.toggle('toggle');

            // Animation for nav items - modified to keep horizontal layout
            navItems.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    // Fade in animation for horizontal items
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }

    // Enhanced Scroll Reveal Animation
    function revealAnimation() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
                
                // Add specific animation class based on position
                if (element.classList.contains('about-text')) {
                    element.classList.add('fade-right');
                } else if (element.classList.contains('about-stats')) {
                    element.classList.add('fade-left');
                } else if (element.closest('.timeline-item')) {
                    const isEven = [...element.parentElement.children].indexOf(element) % 2 === 1;
                    element.classList.add(isEven ? 'fade-left' : 'fade-right');
                } else {
                    element.classList.add('fade-bottom');
                }
            }
        });
    }

    // Sticky Navigation and Scroll Events
    window.addEventListener('scroll', () => {
        if (nav) {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }

        // Back to Top Button
        if (backToTopBtn) {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }

        // Scroll Reveal Animation
        revealAnimation();
    });

    // Back to Top Button
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Projects Slider
    if (projectsSlider && prevBtn && nextBtn && sliderDots) {
        const projectCards = document.querySelectorAll('.project-card');
        let currentIndex = 0;
        
        // Clear existing dots to prevent duplication
        sliderDots.innerHTML = '';

        // Create dots
        projectCards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            sliderDots.appendChild(dot);
        });

        // Enhance with keyboard navigation
        projectsSlider.setAttribute('tabindex', '0');
        projectsSlider.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'Right') {
                e.preventDefault();
                nextBtn.click();
            } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
                e.preventDefault();
                prevBtn.click();
            }
        });

        // Dots array
        const dots = document.querySelectorAll('.slider-dots .dot');

        // Next slide
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % projectCards.length;
            goToSlide(currentIndex);
        });

        // Previous slide
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + projectCards.length) % projectCards.length;
            goToSlide(currentIndex);
        });

        function goToSlide(index) {
            projectsSlider.scrollTo({
                left: projectCards[index].offsetLeft,
                behavior: 'smooth'
            });

            // Update active dot
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            currentIndex = index;
        }

        // Auto slide every 5 seconds
        let slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % projectCards.length;
            goToSlide(currentIndex);
        }, 5000);

        // Stop auto slide on mouse enter
        projectsSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        // Resume auto slide on mouse leave
        projectsSlider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % projectCards.length;
                goToSlide(currentIndex);
            }, 5000);
        });
    }

    // Contact Form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation would go here
            const submitBtn = this.querySelector('.submit-btn');
            if (!submitBtn) return;
            
            // Simulate form submission
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                if (formMessage) {
                    formMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
                    formMessage.classList.add('success');
                }
                
                // Reset form
                contactForm.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    if (formMessage) {
                        formMessage.textContent = '';
                        formMessage.classList.remove('success');
                    }
                }, 3000);
            }, 1500);
        });
    }

    // Testimonials Slider
    if (testimonialSlides && testimonialNext && testimonialPrev && testimonialDots) {
        const testimonials = document.querySelectorAll('.testimonial-card');
        let currentTestimonial = 0;
        
        // Clear existing dots to prevent duplication
        testimonialDots.innerHTML = '';
        
        // Create dots
        testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToTestimonial(index);
            });
            testimonialDots.appendChild(dot);
        });
        
        // Next testimonial
        testimonialNext.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonialSlider();
        });
        
        // Previous testimonial
        testimonialPrev.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            updateTestimonialSlider();
        });
        
        // Go to specific testimonial
        function goToTestimonial(index) {
            currentTestimonial = index;
            updateTestimonialSlider();
        }
        
        // Update slider position
        function updateTestimonialSlider() {
            testimonialSlides.style.transform = `translateX(-${currentTestimonial * 100}%)`;
            
            // Update dots
            document.querySelectorAll('.testimonial-dots .dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentTestimonial);
            });
            
            // Update ARIA attributes for accessibility
            testimonials.forEach((testimonial, index) => {
                testimonial.setAttribute('aria-hidden', index !== currentTestimonial);
            });
        }
        
        // Enhance with keyboard navigation
        testimonialSlides.setAttribute('tabindex', '0');
        testimonialSlides.setAttribute('aria-label', 'Testimonials carousel, use arrow keys to navigate');
        testimonialSlides.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'Right') {
                e.preventDefault();
                testimonialNext.click();
            } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
                e.preventDefault();
                testimonialPrev.click();
            }
        });
        
        // Auto rotate testimonials
        let testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonialSlider();
        }, 8000);
        
        // Stop auto slide on mouse enter
        testimonialSlides.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        // Resume auto slide on mouse leave
        testimonialSlides.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                updateTestimonialSlider();
            }, 8000);
        });
    }
      // Gallery filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        // Show item with animation
                        item.style.opacity = '0';
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 100);
                    } else {
                        // Hide item
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Gallery lightbox functionality
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            const imgAlt = this.querySelector('img').getAttribute('alt');
            const imgCaption = this.querySelector('.gallery-text').textContent;
            
            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');
            
            // Add lightbox content
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <button class="lightbox-close">&times;</button>
                    <img src="${imgSrc}" alt="${imgAlt}" class="lightbox-image">
                    <div class="lightbox-caption">${imgCaption}</div>
                </div>
            `;
            
            // Add to DOM
            document.body.appendChild(lightbox);
            
            // Prevent scrolling on body
            document.body.style.overflow = 'hidden';
            
            // Add fade-in animation
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
            
            // Close lightbox on click
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                    lightbox.style.opacity = '0';
                    document.body.style.overflow = 'visible';
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                    }, 300);
                }
            });
        });
    });
    
    // Initial calls
    revealAnimation();
    
    // Detect if JS is running
    document.documentElement.classList.add('js-enabled');
});

// Ensure preloader is removed even if the DOMContentLoaded fails
window.onload = function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        document.body.style.overflow = 'visible';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 1000);
    }
};
