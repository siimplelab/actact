// lazy loading
$(window).on("load", function() {
    // $('.screen-loading').delay(2500).fadeOut(500);
});

// scroll to top
$(window).scroll(function() {
    // if ($(this).scrollTop() >= 50) {       
    //     $('#return-to-top').fadeIn(200);   
    // } else {
    //     $('#return-to-top').fadeOut(200);  
    // }
});
$('#return-to-top').click(function() {      // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
});

// parallax

// $('.parallax-window').parallax({
//     naturalWidth: 600,
//     naturalHeight: 400
//   });