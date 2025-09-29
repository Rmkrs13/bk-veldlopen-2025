$(document).ready(function() {
    // Add animation classes to elements
    $('.info').addClass('slide-up');
    $('.info-section').addClass('slide-up');
    $('.table-container').addClass('slide-up');
    $('.countdown-section').addClass('slide-up');
    $('.parcours-section').addClass('slide-up');
    $('.contact').addClass('slide-up');
    $('.main-content > div').addClass('slide-up');
    $('.info h2').addClass('slide-up');
    $('.info p').addClass('slide-up');
    $('.info ul').addClass('slide-up');
    $('.titlebar').addClass('slide-up');
    
    // Specific sections
    $('#intro').addClass('slide-up');
    $('#intro h2').addClass('slide-up');
    $('#intro p').addClass('slide-up');
    $('#intro ul').addClass('slide-up');
    
    $('#inschrijven').addClass('slide-up');
    $('#inschrijven h2').addClass('slide-up');
    $('#inschrijven p').addClass('slide-up');
    $('#inschrijven .button-container').addClass('slide-up');
    
    $('#tijdschema').addClass('slide-up');
    $('#tijdschema h2').addClass('slide-up');
    $('#tijdschema .table-container').each(function(index) {
        $(this).addClass('slide-up');
        $(this).css('transition-delay', (index * 0.1) + 's');
    });
    
    $('#parcours').addClass('slide-up');
    $('#parcours h2').addClass('slide-up');
    $('#parcours .parcours-section').addClass('slide-up');
    $('#parcours img').addClass('slide-up');
    
    // Add stagger effect to table rows
    $('.timetable tr').each(function(index) {
        $(this).addClass('slide-up-row');
        $(this).css('transition-delay', (index * 0.05) + 's');
    });
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        
        return elementBottom > viewportTop && elementTop < viewportBottom - 100;
    }
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
        $('.fade-in-up, .fade-in, .fade-in-left, .fade-in-right, .slide-up, .slide-up-row').each(function() {
            if (isInViewport(this) && !$(this).hasClass('animated')) {
                $(this).addClass('animated');
                
                // If it's a table container, animate its rows
                if ($(this).hasClass('table-container')) {
                    $(this).find('tr').each(function(index) {
                        var row = $(this);
                        setTimeout(function() {
                            row.addClass('animated');
                        }, index * 50);
                    });
                }
            }
        });
    }
    
    // Initial check
    handleScrollAnimations();
    
    // Check on scroll
    $(window).scroll(function() {
        handleScrollAnimations();
    });
    
    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 800, 'swing');
        }
    });
    
    // Parallax effect for hero image on desktop
    if ($(window).width() > 1015) {
        $(window).scroll(function() {
            var scrolled = $(window).scrollTop();
            $('#hero-desktop').css('transform', 'translateY(' + (scrolled * 0.3) + 'px)');
        });
    }
});