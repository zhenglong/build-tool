/*
 * native-test.js
 * Copyright (C) 2016 tristan <tristan@tristan-VirtualBox>
 *
 * Distributed under terms of the MIT license.
 */

"use strict";

var TestNative = {
    setTitle: function() {
        console.log('setTitle called');
    },
    addRightButtons: function() {
        console.log('addRightButtons called');
    },
    startRefresh: function() {
        console.log('startRefresh called');
    },
    stopRefresh: function() {
        console.log('stopRefresh called');
    },
    showDialog: function() {
        console.log('showDialog called');
    }
};
window.bridge = new Bridge(TestNative);
setTimeout(function() {
    var $$ = Dom7; // TODO: use a better way
    $$(document).trigger('bridgeReady');
}, 0);
