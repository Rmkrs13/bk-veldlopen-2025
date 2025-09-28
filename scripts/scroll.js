$(document).ready(function() {
    var lastScrollTop = 0;
    var isScrollingDown = false;
    var scrollTimeout;
    
    // Detect iOS Safari (iOS 18 has a positioning bug)
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    var isIOSSafari = isIOS && isSafari;
    
    // iOS 18 Safari fix - hide footer during scroll down, reposition when stopped
    function handleIOSFooter() {
        if (!isIOSSafari) return;
        
        var footer = $('footer');
        
        // Clear any existing timeout
        clearTimeout(scrollTimeout);
        
        if (isScrollingDown) {
            // Hide footer while scrolling down to avoid floating issue
            footer.css({
                'opacity': '0',
                'pointer-events': 'none',
                'transition': 'opacity 0.2s'
            });
        }
        
        // Show footer again after scroll stops
        scrollTimeout = setTimeout(function() {
            // Recalculate position using getBoundingClientRect
            var rect = footer[0].getBoundingClientRect();
            var windowHeight = window.innerHeight;
            
            // Check if footer is mispositioned
            if (rect.bottom < windowHeight - 10) {
                // Force reposition to bottom
                footer.css({
                    'position': 'fixed',
                    'bottom': '0px',
                    'transform': 'translateZ(0)'
                });
            }
            
            // Show footer
            footer.css({
                'opacity': '1',
                'pointer-events': 'auto',
                'transition': 'opacity 0.2s'
            });
        }, 150);
    }

    $(window).scroll(function() {
        var currentScrollTop = $(this).scrollTop();
        
        isScrollingDown = currentScrollTop > lastScrollTop;

        if (isScrollingDown) {
            // User is scrolling down
            $('#mobile-menu').show();
        } else {
            // User is scrolling up
            $('#mobile-menu').hide();
        }

        lastScrollTop = currentScrollTop;
        
        // Handle iOS footer
        if (isIOSSafari) {
            handleIOSFooter();
        }
    });
    
    // Touch events for more responsive handling on iOS
    if (isIOSSafari) {
        var touchStartY = 0;
        
        $(document).on('touchstart', function(e) {
            touchStartY = e.originalEvent.touches[0].clientY;
        });
        
        $(document).on('touchmove', function(e) {
            var touchY = e.originalEvent.touches[0].clientY;
            var deltaY = touchStartY - touchY;
            
            if (Math.abs(deltaY) > 5) {
                isScrollingDown = deltaY > 0;
                handleIOSFooter();
            }
        });
        
        // Fix after orientation change
        $(window).on('orientationchange', function() {
            setTimeout(function() {
                $('footer').css({
                    'position': 'fixed',
                    'bottom': '0px',
                    'opacity': '1',
                    'pointer-events': 'auto'
                });
            }, 500);
        });
    }
});