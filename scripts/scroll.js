$(document).ready(function() {
    var lastScrollTop = 0;
    
    // Function to fix footer position
    function fixFooterPosition() {
        var footer = $('footer');
        // Force footer to absolute bottom
        footer.css({
            'position': 'fixed',
            'bottom': '0px',
            'transform': 'translateZ(0)',
            '-webkit-transform': 'translateZ(0)'
        });
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
        
        // Force footer to bottom on every scroll
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