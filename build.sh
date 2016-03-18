#! /bin/bash
#
# build.sh
# Copyright (C) 2016 tristan <tristan@tristan-VirtualBox>
#
# Distributed under terms of the MIT license.
#

BUILD_TYPE=production
build() {
    echo "====================build for $1===================="
    echo "clean dist directory..." && rm -R "./dist/$1/"
    TARGET_JS_DIR="./dist/$1/js/"
    WP_BUILD_PLATFORM=$1 WP_BUILD_TYPE=$BUILD_TYPE webpack -p
    ./node_modules/uglify-js/bin/uglifyjs ./src/sdk/bridge.js ./src/sdk/native.js "./src/sdk/native-$1.js" -o sdk.js
    mkdir -p $TARGET_JS_DIR && mv sdk.js $TARGET_JS_DIR
    pushd $TARGET_JS_DIR && sed -i 's/http:\/\/localhost:3334/http:\/\/172.16.10.222:3334/g' common.js && popd
}
build android
build ios
