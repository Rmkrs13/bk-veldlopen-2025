$(document).ready(function() {
    var lastScrollTop = 0;

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
    });
});