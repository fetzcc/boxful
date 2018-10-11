var o = {};
var p = {};

o.init = function() {

}
p.init = function() {
    p.ww = jQuery(window).width()
    p.wh = jQuery(window).height()
    p.iw = jQuery('.inner').width()
    p.innerOffsetLeft = jQuery('.inner').offset().left
}

jQuery(document).ready(function() {
    o.init();
    p.init();
})
