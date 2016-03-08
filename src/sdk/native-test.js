/*
 * native-test.js
 * Copyright (C) 2016 tristan <tristan@tristan-VirtualBox>
 *
 * Distributed under terms of the MIT license.
 */

"use strict";

var TestNative = {
    startRefresh: function() {
        console.log('startRefresh called');
    },
    stopRefresh: function() {
        console.log('stopRefresh called');
    }
};
window.bridge = new Bridge(TestNative, {});
