;

function Bridge(native_, http) {
    var internalQueueName = '__internal__';
    var callbacks = {};
    var events = {};
    events[internalQueueName] = [];

    var _uuid = 1;

    function getUuid() {
        var result = _uuid;
        _uuid++;
        return result;
    }

    function remove(event, callbackId) {
        for (var i = 0; i < events[event].length; i++) {
            if (events[event][i].id == callbackId) {
                events[event].splice(i, 1);
                return true;
            }
        }
        return false;
    }

    var bridge = {
        // @description 选择图片并上传
        // event
        // uploadStateChange - 通知图片上传状态变化
        // 事件参数
        // state: uploadState
        // data: {
        //  progress: .5 // 上传进度
        // }
        //
        //
        // @param {Object} - param {
        //  count: 1: // 允许上传的最大图片数,
        //  uploadUrl: "", // 上传地址,
        //  success: function(res) {
        //    var localIds = res.localIds; // 直接绑定到img的src属性上显示待上传图片
        // }
        // }
        chooseImage: function(params) {
            var funcId = getUuid();
            var self = this;
            var uploadState = {
                init: 1, // 开始上传
                process: 2, // 上传中
                complete: 3 // 完成上传
            };
            if (params.success) {
                callbacks[funcId] = function() {
                    params.success.apply(null, arguments);
                    if (!params.uploadUrl) return;
                    http.post(params.uploadUrl, {}, function() {
                        self.trigger('uploadStateChange', {
                            state: uploadState.complete
                        });
                        // cleanup the registered callbacks
                    });
                };
            }
            native_.displayImageChooser(funcId);
        },
        displayToast: function(str) {
            native_.displayToast(str);
        },
        displayDatePicker: function(title, initDate, callback) {
            function isDate(v) {
                return (Object.prototype.toString.call(v) == '[object Date]');
            }
            if (arguments.length == 1) {
                callback = title;
                title = null;
            } else if (arguments.length == 2) {
                if (isDate(title)) {
                    initDate = title;
                    title = null;
                }
                callback = initDate;
            }
            console.log(title + ',' + initDate);
            var funcId = getUuid();
            if (!initDate) initDate = new Date();
            if (!title) title = "选择日期";
            initDate = initDate.valueOf();
            callbacks[funcId] = function(dateValue) {
                var date = new Date(dateValue);
                callback(date);
            }
            native_.displayDatePicker(title, initDate, funcId);
        },
        getLocation: function() {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var coords = position.coords;
                    alert(coords.latitude + ',' + coords.longitude + ',' + coords.accuracy);
                }, function(err) {
                    alert('getLocation error ' + err.code + ':' + err.message);
                }, {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 10000
                });
            } else {
                // alert to try opening GPS
                alert('geolocation is not supported');
            }
        },
        getContext: function(cb) {
            return native_.getContext(cb);
        },
        setTitle: function(str, cb) {
            if (!str) return;
            native_.setTitle(str, cb);
        },
        addRightButtons: function(data, cb) {
            if (!data) return;
            native_.addRightButtons(data, cb);
        },
        showDialog: function(data, cb) {
            if (!data) return;
            native_.showDialog(data, cb);
        },
        startRefresh: function(cb) {
            native_.startRefresh(cb);
        },
        stopRefresh: function(cb) {
            native_.stopRefresh(cb);
        },
        pushStack: function(data, cb) {
            if (!data) return;
            native_.pushStack(data, cb);
        },
        popStack: function(cb) {
            native_.popStack(cb);
        },
        on: function(event, callback) {
            if (!event || !callback) return;
            if (!events[event]) events[event] = [];
            var callbackId = getUuid();
            events[event].push({
                id: callbackId,
                cb: callback
            });
            return callbackId;
        },
        off: function(event, callbckId) {
            if (!event || !events[event]) return false;
            if (!callbackId) {
                events[event] = undefined;
                return true;
            }
            return remove(event, callbackId);
        },
        trigger: function(event, data) {
            var len;
            if (!event || !events[event] || !(len = events[event].length)) return;
            for (var i = 0; i < len; i++) {
                events[event].cb.call(null, data);
            }
        },
        attach: function(callback) {
            var callbackId = getUuid();
            events[internalQueueName].push({
                id: callbackId,
                cb: callback
            });
            return callbackId;
        },
        detach: function(callbackId) {
            return remove(internalQueueName, callbackId);
        },
        callback: function(functionId) {
            var cb = callbacks[functionId];
            var isOnce = !!cb;
            if (!cb) {
                var queue = events[internalQueueName];
                for (var i = 0; i < queue.length; i++) {
                    if (queue[i].id == functionId) {
                        cb = queue[i].cb;
                        break;
                    }
                }
            }

            if (!cb) return;
            console.log(functionId);
            console.log(arguments[1]);
            var args = Array.prototype.slice.call(arguments, 1);
            cb.apply(null, args);
            if (isOnce) callbacks[functionId] = null;
        }
    }
    return bridge;
}
