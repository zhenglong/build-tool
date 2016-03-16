//window.Android = {
// setTitle: function() {
//   console.log('mock');
// }
//}
if (!window.Android) alert('Android is :' + Android);
window.bridge = new Bridge(new Native(window.Android));
