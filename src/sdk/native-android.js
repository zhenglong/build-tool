//window.Android = {
// setTitle: function() {
//   console.log('mock');
// }
//}
if (!window.Android) alert('Android is :' + Android);
window.bridge = new Bridge(new Native(window.Android));
setTimeout(function() {
    var $$ = Dom7; // TODO: use a better way
    $$(document).trigger('bridgeReady');
}, 0);
