$(document).ready(function() {
    var lastScrollTop = 0;
    
    // Detect iOS Safari (iOS 18 has a positioning bug)
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    var isIOSSafari = isIOS && isSafari;
    
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

    // Handle scroll for mobile menu visibility
    $(window).scroll(function() {
        var currentScrollTop = $(this).scrollTop();

        if (currentScrollTop > lastScrollTop) {
            // User is scrolling down
            $('#mobile-menu').show();
        } else {
            // User is scrolling up
            $('#mobile-menu').hide();
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