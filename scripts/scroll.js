$(document).ready(function() {
    var lastScrollTop = 0;
    
    // Detect iOS Safari (iOS 18 has a positioning bug)
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    var isIOSSafari = isIOS && isSafari;
    
    // iOS 18 Safari fix - use visual viewport API
    function fixIOSFooter() {
        if (!isIOSSafari) return;
        
        var footer = $('footer');
        
        if (window.visualViewport) {
            // Calculate the offset between layout viewport and visual viewport
            var visualBottom = window.visualViewport.height + window.visualViewport.offsetTop;
            var layoutHeight = window.innerHeight;
            var offset = Math.max(0, layoutHeight - visualBottom);
            
            // Apply the offset to keep footer at visual viewport bottom
            footer.css('bottom', offset + 'px');
        } else {
            // Fallback for older iOS versions
            footer.css('bottom', '0px');
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
            fixIOSFooter();
        }
    });
    
    // iOS 18: Listen to visual viewport changes
    if (isIOSSafari && window.visualViewport) {
        window.visualViewport.addEventListener('resize', fixIOSFooter);
        window.visualViewport.addEventListener('scroll', fixIOSFooter);
    }
    
    // Also fix on resize and orientation change
    if (isIOSSafari) {
        $(window).on('resize orientationchange', function() {
            fixIOSFooter();
        });
        
        // Initial fix
        setTimeout(fixIOSFooter, 100);
        setTimeout(fixIOSFooter, 500);
        
        // Fix after any focus events (keyboard show/hide)
        $('input, textarea').on('blur focus', function() {
            setTimeout(fixIOSFooter, 300);
        });
    }
});