$(document).ready(function() {
    var lastScrollTop = 0;
    
    // Detect iOS Safari
    var isIOSSafari = /iP(ad|hone|od).+Version\/[\d\.]+.*Safari/i.test(navigator.userAgent);
    
    // Function to fix footer position on iOS Safari
    function fixFooterPosition() {
        if (isIOSSafari) {
            var footer = $('footer');
            // Get the actual viewport height
            var viewportHeight = window.innerHeight;
            // Force footer to bottom of visual viewport
            footer.css({
                'position': 'fixed',
                'bottom': '0px',
                'transform': 'translateZ(0)',
                '-webkit-transform': 'translateZ(0)'
            });
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
        
        // Fix footer position on every scroll
        fixFooterPosition();
    });
    
    // Also fix on resize (when URL bar shows/hides)
    $(window).on('resize orientationchange', function() {
        fixFooterPosition();
    });
    
    // Initial fix
    fixFooterPosition();
    
    // Fix after a small delay to ensure page is fully loaded
    setTimeout(fixFooterPosition, 100);
});