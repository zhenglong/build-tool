/*
 * native-ios.js
 * Copyright (C) 2016 tristan <tristan@tristan-VirtualBox>
 *
 * Distributed under terms of the MIT license.
 */

"use strict";

function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
setupWebViewJavascriptBridge(function(bridge) {
    bridge.registerHandler('callback', function(data, responseCallback) {
        var responseData = window.bridge.callback.apply(data);
        responseCallback(responseData);
    });
    var iosNative = {
        getContext : function(cb) {
            bridge.callHandler('getContext', cb);
        },
        setTitle : function(str, cb) {
            bridge.callHandler('setTitle', str, cb);
        },
        addRightButtons: function(data, cb) {
            bridge.callHandler('addRightButtons', data, cb);
        },
        showDialog: function(data, cb) {
            bridge.callHandler('showDialog', data, cb);
        },
        startRefresh: function(cb) {
            bridge.callHandler('startRefresh', cb);
        },
        stopRefresh: function(cb) {
            bridge.callHandler('stopRefresh', cb);
        },
        pushStack: function(data, cb) {
            bridge.callHandler('pushStack', data, cb);
        },
        popStack: function(cb) {
            bridge.callHandler('popStack', cb);
        }
    };
    var $$ = Dom7;
    window.bridge = new Bridge(new Native(iosNative));
    $$(document).trigger('bridgeReady');

});
