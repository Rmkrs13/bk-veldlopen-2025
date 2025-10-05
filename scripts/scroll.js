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
    
    // Simple visual viewport height tracking for fallback
    function updateViewportHeight() {
        if (window.visualViewport) {
            var vh = window.visualViewport.height;
            document.documentElement.style.setProperty('--vvh', vh + 'px');
        } else {
            var vh = window.innerHeight;
            document.documentElement.style.setProperty('--vvh', vh + 'px');
        }
    }
    
    // Initialize and track viewport changes
    updateViewportHeight();
    if (window.visualViewport) {
        window.visualViewport.addEventListener('resize', updateViewportHeight);
        window.visualViewport.addEventListener('scroll', updateViewportHeight);
    }
    window.addEventListener('resize', updateViewportHeight);

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
});