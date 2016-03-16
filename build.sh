#! /bin/sh
#
# build.sh
# Copyright (C) 2016 tristan <tristan@tristan-VirtualBox>
#
# Distributed under terms of the MIT license.
#

build() {
    echo "====================build for $1===================="
    TARGET_JS_DIR="./dist/$1/js/"
    WP_BUILD_PLATFORM=$1 webpack -p
    ./node_modules/uglify-js/bin/uglifyjs ./src/sdk/bridge.js ./src/sdk/native.js "./src/sdk/native-$1.js" -o sdk.js
    mkdir -p $TARGET_JS_DIR && mv sdk.js $TARGET_JS_DIR
}

build android
build ios
