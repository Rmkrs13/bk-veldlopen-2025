$(document).ready(function() {
    var lastScrollTop = 0;
    
    // Detect iOS Safari (iOS 18 has a positioning bug)
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    var isIOSSafari = isIOS && isSafari;
    
    // iOS 18 Safari fix for fixed footer
    function fixIOSFooter() {
        if (!isIOSSafari) return;
        
        var footer = $('footer');
        var footerRect = footer[0].getBoundingClientRect();
        var windowHeight = window.innerHeight;
        
        // Check if footer is not at the bottom
        if (footerRect.bottom < windowHeight - 5 || footerRect.bottom > windowHeight + 5) {
            // Force recalculation by toggling transform
            footer.css('transform', 'translateZ(0.01px)');
            setTimeout(function() {
                footer.css('transform', 'translateZ(0)');
            }, 0);
        }
    }

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
        
        // Fix iOS footer position on scroll
        if (isIOSSafari) {
            requestAnimationFrame(fixIOSFooter);
        }
    });
    
    // Also fix on resize and orientation change
    if (isIOSSafari) {
        $(window).on('resize orientationchange', function() {
            setTimeout(fixIOSFooter, 100);
        });
        
        // Initial fix
        setTimeout(fixIOSFooter, 500);
        
        // Fix after any focus events (keyboard show/hide)
        $('input, textarea').on('blur', function() {
            setTimeout(fixIOSFooter, 300);
        });
    }
});