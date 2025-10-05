$(document).ready(function() {
    var lastScrollTop = 0;
    var scrollAccumulator = 0;
    
    // Detect iOS Safari (iOS 18 has a positioning bug)
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    var isIOSSafari = isIOS && isSafari;
    
    // Initialize footer visibility based on screen size
    function initializeFooter() {
        var windowWidth = $(window).width();
        
        if (windowWidth <= 767) {
            // Mobile: footer always visible
            $('footer').show();
            $('#mobile-menu').show();
        } else {
            // Desktop: hide initially, will show on scroll
            $('footer').hide();
            $('#mobile-menu').hide();
        }
    }
    
    // Call on page load
    initializeFooter();
    
    // Also reinitialize on window resize
    $(window).resize(function() {
        initializeFooter();
    });
    
    // iOS 18 Safari fix - dynamically adjust footer position
    function fixIOSFooter() {
        if (!isIOSSafari) return;
        
        var footer = $('footer');
        
        // Use visualViewport API if available
        if (window.visualViewport) {
            var vv = window.visualViewport;
            // Calculate the gap between layout and visual viewport
            var gap = window.innerHeight - (vv.height + vv.offsetTop);
            
            // Apply compensation for the gap
            if (gap > 0) {
                footer.css('bottom', gap + 'px');
            } else {
                footer.css('bottom', '0px');
            }
        } else {
            // Fallback: check position and force to bottom
            var rect = footer[0].getBoundingClientRect();
            var windowHeight = window.innerHeight;
            
            if (rect.bottom < windowHeight - 5) {
                // Footer is floating, force it down
                var offset = windowHeight - rect.bottom;
                footer.css('transform', 'translateY(' + offset + 'px)');
            } else {
                footer.css('transform', 'translateY(0)');
            }
        }
    }

    // Handle scroll for mobile menu and desktop sponsors bar visibility
    $(window).scroll(function() {
        var currentScrollTop = $(this).scrollTop();
        var windowWidth = $(window).width();
        var scrollDifference = currentScrollTop - lastScrollTop;

        // Mobile: 767px and below - show/hide nav based on scroll direction
        if (windowWidth <= 767) {
            // Footer container is always visible on mobile
            $('footer').show();
            
            // Always show mobile nav when at the very top of the page
            if (currentScrollTop <= 10) {
                $('#mobile-menu').slideDown(200);
                scrollAccumulator = 0;
            } else {
                // Accumulate scroll for smoother detection
                scrollAccumulator += scrollDifference;
                
                // Mobile nav shows/hides based on accumulated scroll
                if (scrollAccumulator > 10) {
                    // Scrolled down by at least 10px total - show mobile nav
                    $('#mobile-menu').slideDown(200);
                    scrollAccumulator = 0; // Reset accumulator
                } else if (scrollAccumulator < -10) {
                    // Scrolled up by at least 10px total - hide mobile nav
                    $('#mobile-menu').slideUp(200);
                    scrollAccumulator = 0; // Reset accumulator
                }
                
                // Prevent accumulator from getting too large
                if (Math.abs(scrollAccumulator) > 100) {
                    scrollAccumulator = 0;
                }
            }
        }
        // Desktop: 768px and above - show footer when scrolling down from hero
        else if (windowWidth >= 768) {
            var heroSection = $('.desktop-layout');
            if (heroSection.length) {
                // Show sponsors bar after scrolling past hero section
                var heroHeight = heroSection.outerHeight();
                var triggerPoint = heroSection.offset().top + (heroHeight * 0.5);
                
                if (currentScrollTop > triggerPoint) {
                    // Scrolled past trigger point - show sponsors bar
                    $('footer').fadeIn(300);
                } else {
                    // Still above trigger point - hide sponsors bar
                    $('footer').fadeOut(300);
                }
            }
        }

        lastScrollTop = currentScrollTop;
        
        // Fix iOS footer on every scroll
        if (isIOSSafari) {
            requestAnimationFrame(fixIOSFooter);
        }
    });
    
    // iOS 18: Listen to visual viewport changes
    if (isIOSSafari && window.visualViewport) {
        window.visualViewport.addEventListener('resize', fixIOSFooter);
        window.visualViewport.addEventListener('scroll', fixIOSFooter);
    }
    
    // Additional iOS handling
    if (isIOSSafari) {
        // Fix on resize and orientation change
        $(window).on('resize orientationchange', function() {
            setTimeout(fixIOSFooter, 100);
        });
        
        // Initial fixes
        $(window).on('load', fixIOSFooter);
        setTimeout(fixIOSFooter, 250);
        setTimeout(fixIOSFooter, 1000);
        
        // Continuous monitoring for iOS 18 bug
        setInterval(fixIOSFooter, 500);
    }
});