/**
 * This file just holds the base url to the test server
 * and
 * the snippet for pageproofer live commenting tool
 * @author Gaurav Agarwal
 */

var ws_base = "http://tst.api.glygen.org/";



/**
 * for the pageproofer feedback.
 */
(function (d, t) {
   var pp = d.createElement(t), s = d.getElementsByTagName(t)[0];
   pp.src = '//app.pageproofer.com/overlay/js/3487/1801';
   pp.type = 'text/javascript';
   pp.async = true;
   s.parentNode.insertBefore(pp, s);
})(document, 'script');