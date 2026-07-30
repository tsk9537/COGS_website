// Church of the Great Shepherd - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // =========================================
    // Header Slider Functionality
    // =========================================
    const slider = document.querySelector('.header-slider');
    
    if (slider) {
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.slider-btn.prev');
        const nextBtn = document.querySelector('.slider-btn.next');
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            if (index >= slides.length) currentSlide = 0;
            if (index < 0) currentSlide = slides.length - 1;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide++;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide--;
            showSlide(currentSlide);
        }
        
        // Auto-play slider
        let slideInterval = setInterval(nextSlide, 5000);
        
        // Manual navigation
        nextBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            nextSlide();
            slideInterval = setInterval(nextSlide, 5000);
        });
        
        prevBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            prevSlide();
            slideInterval = setInterval(nextSlide, 5000);
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval);
                currentSlide = index;
                showSlide(currentSlide);
                slideInterval = setInterval(nextSlide, 5000);
            });
        });
        
        // Pause slider on hover
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    // =========================================
    // Mobile Menu Toggle
    // =========================================
    const menuToggle = document.querySelectorAll('.menu-toggle');
    
    menuToggle.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const navLinks = this.closest('.main-nav') ? 
                this.closest('.main-nav').querySelectorAll('.nav-links') : null;
            
            if (navLinks) {
                navLinks[0].classList.toggle('active');
            }
        });
    });
    
    // =========================================
    // Events Page Filtering
    // =========================================
    const filterToggle = document.getElementById('filter-toggle');
    const eventsList = document.getElementById('events-list');
    const noEventsMessage = document.getElementById('no-events-message');
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    if (filterToggle && eventsList) {
        let showPastEvents = false;
        
        filterToggle.addEventListener('click', function() {
            showPastEvents = !showPastEvents;
            this.textContent = showPastEvents ? 'Hide Past Events' : 'Show Past Events';
            
            updateEventVisibility();
        });
        
        // Category filtering
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                updateEventVisibility();
            });
        });
        
        function updateEventVisibility() {
            const selectedCategory = document.querySelector('.category-btn.active').dataset.category;
            const now = new Date();
            let visibleCount = 0;
            
            Array.from(eventsList.children).forEach(event => {
                event.classList.remove('hidden');
                
                // Date filtering
                const eventDate = new Date(event.dataset.date + 'T00:00:00');
                const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                
                if (!showPastEvents && eventDate < today) {
                    event.classList.add('hidden');
                }
                
                // Category filtering
                if (selectedCategory !== 'all' && event.dataset.category !== selectedCategory) {
                    event.classList.add('hidden');
                }
                
                if (!event.classList.contains('hidden')) {
                    visibleCount++;
                }
            });
            
            noEventsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
        }
        
        // Initial filter
        updateEventVisibility();
    }
    
    // =========================================
    // Smooth Scroll for Anchor Links
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =========================================
    // Scroll to Top Button
    // =========================================
    let scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.textContent = '↑';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
        }
    });
    
    // =========================================
    // Contact Form Handling (if implemented)
    // =========================================
    const contactForm = document.querySelector('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageInput = contactForm.querySelector('textarea');
            
            if (!emailInput.value || !messageInput.value) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // =========================================
    // Dynamic Events Date Update
    // =========================================
    const eventsCardTitle = document.getElementById('events-card-title');
    
    if (eventsCardTitle) {
        const now = new Date();
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
        const monthName = months[now.getMonth()];
        const day = now.getDate();
        const year = now.getFullYear();
        
        eventsCardTitle.textContent = `Events - ${monthName} ${day}, ${year}`;
    }

    // =========================================
    // Anglican Liturgical Year — Nav & Footer Colors
    // =========================================
    const now = new Date();
    // Create a UTC version for consistent comparisons with UTC calendar dates
    const nowUTC = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()));

    /**
     * Finds the Sunday closest to November 30th of a given year.
     * Used to determine the first Sunday of Advent.
     */
    function getAdventSunday(yr) {
        const nov30 = new Date(Date.UTC(yr, 10, 30)); // November 30
        const dayOfWeek = nov30.getUTCDay(); // 0 = Sunday, 1 = Monday...

        // If dayOfWeek <= 3 (Sun-Wed), move back to Sunday. 
        // If dayOfWeek > 3 (Thu-Sat), move forward to Sunday.
        const offset = dayOfWeek <= 3 ? -dayOfWeek : 7 - dayOfWeek;

        const advent = new Date(nov30);
        advent.setUTCDate(advent.getUTCDate() + offset);
        return advent;
    }

    /**
     * Calculates key dates for the Anglican Church Calendar for a given year.
     * @param {number} year - The calendar year (e.g., 2026)
     * @returns {Object} An object containing JavaScript Date objects for key feasts.
     */
    function getAnglicanCalendar(year) {
        // 1. Calculate Easter Sunday using Meeus/Jones/Butcher Gregorian algorithm
        const a = year % 19;
        const b = Math.floor(year / 100);
        const c = year % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const month = Math.floor((h + l - 7 * m + 114) / 31); // 3 = March, 4 = April
        const day = ((h + l - 7 * m + 114) % 31) + 1;

        // Easter Sunday Date object (Note: JavaScript months are 0-indexed)
        const easter = new Date(Date.UTC(year, month - 1, day));

        // Helper function to add/subtract days relative to Easter
        const relativeToEaster = (daysOffset) => {
            const date = new Date(easter);
            date.setUTCDate(date.getUTCDate() + daysOffset);
            return date;
        };

        // 2. Map out the liturgical calendar anchors
        return {
            year: year,
            epiphany: new Date(Date.UTC(year, 0, 6)),              // Jan 6 (Fixed)
            ashWednesday: relativeToEaster(-46),                  // 46 days before Easter
            palmSunday: relativeToEaster(-7),                     // 1 week before Easter
            maundyThursday: relativeToEaster(-3),                 // Thursday before Easter
            goodFriday: relativeToEaster(-2),                     // Friday before Easter
            easterSunday: easter,
            ascensionDay: relativeToEaster(39),                   // 39 days after Easter (Thursday)
            pentecost: relativeToEaster(49),                       // 49 days after Easter (Whitsun)
            trinitySunday: relativeToEaster(56),                  // 56 days after Easter
            allSaintsDay: new Date(Date.UTC(year, 10, 1)),         // Nov 1 (Fixed)
            adventSunday: getAdventSunday(year),                  // First Sunday of Advent
            christmasDay: new Date(Date.UTC(year, 11, 25))         // Dec 25 (Fixed)
        };
    }

    function updateLiturgicalColors() {
        const year = now.getFullYear();
        const cal = getAnglicanCalendar(year);
        // Use the current-year advent for wrapping Christmas to Pentecost boundary
        const nextYearAdvent = getAdventSunday(year + 1);

        let season;
        if (nowUTC >= cal.adventSunday && nowUTC < cal.christmasDay) {
            // Advent — full period from first Sunday of Advent through Dec 24
            // Distinguish Gaudete Sunday (3rd Sunday of Advent) by finding it: ~17 days after adventSunday
            const gaudete = new Date(cal.adventSunday);
            gaudete.setUTCDate(gaudete.getUTCDate() + 17);
            if (nowUTC >= gaudete) {
                season = 'advent-gaudete';
            } else {
                season = 'advent-preparation';
            }
        } else if (nowUTC >= cal.christmasDay && nowUTC < cal.epiphany) {
            season = 'christmas-epiphany';
        } else if (nowUTC >= cal.epiphany && nowUTC < cal.ashWednesday) {
            season = 'ordinary-time-green';
        } else if (nowUTC >= cal.ashWednesday && nowUTC < cal.palmSunday) {
            season = 'lent-purp';
        } else if (nowUTC >= cal.palmSunday && nowUTC < cal.goodFriday) {
            season = 'holy-week-red';
        } else if (nowUTC >= cal.goodFriday && nowUTC < cal.pentecost) {
            season = 'easter-white-gold';
        } else if (nowUTC >= cal.pentecost && nowUTC < nextYearAdvent) {
            // After Pentecost through next Advent is Ordinary Time Green
            season = 'ordinary-time-green';
        } else {
            season = 'ordinary-time-green';
        }

        const navBg = season === 'christmas-epiphany' || season === 'easter-white-gold' ? '#f4e7c3' : 
                      (season === 'advent-preparation' ? '#1a3d6e' :
                       (season === 'advent-gaudete' ? '#c41e3a' :
                        (season === 'ordinary-time-green' ? '#5c9e47' :
                         (season === 'lent-purp' ? '#6b2c7e' : '#c41e3a'))));

        const navText = season === 'christmas-epiphany' || season === 'easter-white-gold' ? '#1a1a2e' : '#ffffff';
        const footerBorder = 'rgba(255,255,255,0.3)';

        if (season !== 'ordinary-time-green') {
            const navEl = document.querySelector('.main-nav');
            const footerEl = document.querySelector('.main-footer');
            
            if (navEl) {
                navEl.style.backgroundColor = navBg;
                navEl.style.color = navText;
            }
            
            if (footerEl) {
                footerEl.style.backgroundColor = navBg;
                const fc = footerEl.querySelector('.footer-content');
                if (fc) {
                    fc.style.borderBottomColor = footerBorder || 'rgba(255, 255, 255, 0.3)';
                }

                // Apply light warm gray text to non-ordinary seasons
                const isNonOrdinary = season !== 'ordinary-time-green';
                if (isNonOrdinary && fc) {
                    fc.style.color = '#f0ede8';
                } else if (!isNonOrdinary) {
                    // Keep ordinary green footer as default — no explicit text override needed.
                }
            }

            document.body.classList.add('anglican-calendar-active');
        } else {
            if (document.body.classList.contains('anglican-calendar-active')) {
                const navEl = document.querySelector('.main-nav');
                const footerEl = document.querySelector('.main-footer');
                
                if (navEl) {
                    navEl.style.removeProperty('background-color');
                }
                
                if (footerEl) {
                    footerEl.style.removeProperty('background-color');
                }

                document.body.classList.remove('anglican-calendar-active');
            }
        }
    }

    updateLiturgicalColors();
});
