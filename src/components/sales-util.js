import {Dom7 as $} from '../components/dom7.js';
export default class SalesUtil {
    static isFunction(obj) {
        return (Object.prototype.toString.call(obj) == '[object Function]');
    }

    static ajax(method, url, param, successCallback, closeLoadingImmediate) {
        var root = 'http://localhost:3334';
        if (SalesUtil.isFunction(param)) {
            closeLoadingImmediate = successCallback;
            successCallback = param;
            param = {};
        }
        if (closeLoadingImmediate === undefined) closeLoadingImmediate = true;
        param = {
            url: root + url,
            method: method,
            data: param,
            success: function(result) {
                successCallback(JSON.parse(result));
            }
        };
        param.error = function() {
            var cb = window.bridge.attach(function() {
                console.log('get data error');
            });
            window.bridge.showDialog({
                message: '服务器拉取数据失败',
                okAction: cb,
                cancelAction: cb
            });
        };
        param.complete = function() {
            if (closeLoadingImmediate) window.bridge.stopRefresh();
        };
        window.bridge.startRefresh();
        $.ajax(param);
    }

    static get(url, param, successCallback, closeLoadingImmediate) {
        return SalesUtil.ajax('GET', url, param, successCallback, closeLoadingImmediate);
    }

    static post(url, param, successCallback, closeLoadingImmediate) {
        return SalesUtil.ajax('POST', url, param, successCallback, closeLoadingImmediate);
    }

    static delete(url, param, successCallback, closeLoadingImmediate) {
        SalesUtil.post(url, param, successCallback, closeLoadingImmediate);
    }
}
