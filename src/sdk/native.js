;function Native(ctx) {
  var _context = ctx;

  /*
   * @desc 图片选择并上传
   * @param {number} callbackId - 回调函数的唯一标识符
   *
   */
  this.displayImageChooser = function(callbackId) {
    if (_context.loadImageFromGallery) {
      _context.loadImageFromGallery(callbackId);
      return;
    }
    console.log('should be implemented with native');
  };

  /*
   * @desc 显示toast
   * @param {string} str - toast内容
   *
   */
  this.displayToast = function(str) {
	  _context.showToast(str);
  };

  /*
   * @desc 显示日期选择控件
   * @param {string} title - 控件标题
   * @param {string} initDate - 控件的初始化日期，为ticks
   * @param {number} funcId - 选择日期之后的回调函数唯一标识符
   *
   */
  this.displayDatePicker = function(title, initDate, funcId) {
      _context.showDatePicker(title, initDate, funcId);
  };

  /*
   * @desc 获取登录用户的基本信息
   *       获取该页面初始化时候传过来的参数
   * @return {object}
   * {
   *    "user": {
   *      "userId":string,
   *      "unionId":string,
   *      "accessToken":string
   *     },
   *    "app": {
   *      "deviceType":string,
   *      "appVersion":string,
   *      "apiVersion":string
   *     },
   *    "customData": { // 自定义数据
   *   
   *    }
   * }
   *
   */
  this.getContext = function(cb) {
      if (!cb) {
        return JSON.parse(_context.getContext());
      } else {
          _context.getContext(function(res) {
              cb.call(null, JSON.parse(res));
          });
      }
  };

  /*
   * @desc 设置当前页面的标题
   * @param {string} str
   *
   */
  this.setTitle = function(str, cb) {
      if (!cb) {
        _context.setTitle(str);
      } else {
          _context.setTitle(str, cb);
      }
  };

  /*
   * @desc 添加当前页面右上角的菜单列表
   * @param {object} data
   * [{
   *     "name":string,
   *     "label":string,
   *     "action":js action
   *  }, ...]
   *
   */
  this.addRightButtons = function(data, cb) {
      if (!cb) {
          _context.addRightButtons(JSON.stringify(data));
      } else {
          _context.addRightButtons(JSON.stringify(data), cb);
      }
  };


  /*
   * @desc 弹出对话框
   * @param {object} data
   * {
   *    "message":string,
   *    "okAction":js action,
   *    "cancelAction":js action
   * }
   *
   */
  this.showDialog = function(data, cb) {
      if (!cb) {
          _context.showDialog(JSON.stringify(data));
      } else {
          _context.showDialog(JSON.stringify(data), cb);
      }
  };

  /*
   * @desc 显示刷新页面UI同时刷新页面
   *
   */
  this.startRefresh = function(cb) {
      if (!cb) {
          _context.startRefresh();
      } else {
          _context.startRefresh(cb);
      }
  };

  /*
   * @desc 隐藏刷新页面UI
   *
   */
  this.stopRefresh = function(cb) {
      if (!cb) {
          _context.stopRefresh();
      } else {
          _context.stopRefresh(cb);
      }
  };

  /*
   * @desc 打开新的页面
   * @param {object} data
   * {
   *    "title":string,
   *    "url":string,
   *    "customData":jsonString #创建页面的参数，新页面通过getContext()获取传递的参数
   * }
  */
  this.pushStack = function(data, cb) {
      if (!cb) {
          _context.pushStack(JSON.stringify(data));
      } else {
          _context.pushStack(JSON.stringify(data), cb);
      }
  };

  /* 
   * @desc 关闭当前的页面
   *
   */
  this.popStack = function(cb) {
      if (!cb) {
          _context.popStack();
      } else {
          _context.popStack(cb);
      }
  };
};
