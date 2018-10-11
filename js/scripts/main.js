
jQuery(document).ready(function() {
    jQuery('#slider').slick({
            slidesToShow: 1,
            infinite: true,
            speed: 500,
            arrows: false,
            fade: false,
            asNavFor: '#carousel'
        }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            var i = nextSlide
            jQuery('.slide').removeClass('slide-active');
            jQuery('.slide ').eq(i).addClass('slide-active');
        })
        jQuery('#carousel').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            dots: false,
            centerMode: false,
            focusOnSelect: true,
            arrows: false
        })

        jQuery(".tabs__container>.tabs__btn").each(function() {
            jQuery(this).find("a").each(function(i) {
              jQuery(this).on('click', function(event) {
                  event.preventDefault();
                  /* Act on the event */
                      jQuery(this).addClass("current").siblings().removeClass("current")
                  .parents(".tabs__container").find("div.tabs__box").eq(i).fadeIn(0).siblings("div.tabs__box").hide();
              });
            });
        });

}).on('click', 'a.btn__modal', function(event) {
    event.preventDefault();
    /* Act on the event */

    jQuery(this).each(function(){
        var _target = jQuery(this).data('target')
            over = jQuery('#overlay')
        over.addClass('is_visible')
        jQuery('.modal__' + _target).addClass('is_visible')
    })
}).on('click', 'a.scrollto', function(){
    event.preventDefault();
    /* Act on the event */
    jQuery('html, body').animate({
        scrollTop: jQuery( jQuery.attr(this, 'href') ).offset().top - 30
    }, 500);
}).mouseup(function(e) {
    var container = jQuery(".modal")
        over = jQuery('#overlay')
    if (container.has(e.target).length === 0){
        container.removeClass('is_visible')
        over.removeClass('is_visible')
    }
}).on('click', '.modal__close', function(event) {
    event.preventDefault();
    /* Act on the event */
    var container = jQuery(".modal")
        over = jQuery('#overlay')
        container.removeClass('is_visible')
        over.removeClass('is_visible')
})
.on('click', 'a.nav__visible', function(event) {
    event.preventDefault();
    /* Act on the event */
    jQuery('.nav__container').addClass('is_visible')
}).on('click', 'a.nav__close', function(event) {
    event.preventDefault();
    /* Act on the event */
    jQuery('.nav__container').removeClass('is_visible')
})
