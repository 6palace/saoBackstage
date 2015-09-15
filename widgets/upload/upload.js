/**
 * @version 1
 */
define(function (require, exports, module) {
	/**
	 * @param config
	 *      form        : 需要提交的表单node
	 *      callback    : 回调函数
	 *      enctype     : 设置编码 默认application/x-www-form-urlencoded
	 *      method      : 传输格式 默认get
	 *      action      : 传输地址
	 *      error       : 错误接收的ajax地址
	 *
	 * @constructor
	 *
	 * seajs.use('upload', function(u){
            new u.Upload({
                form     : $('form'),
                method   : 传输格式 默认get,
                action   : 传输地址,
                callback : callback,
                enctype  : 设置编码 默认application/x-www-form-urlencoded
            });
        });
	 */
	function Upload(config) {
		var s = this;
		this.config = config;
		s._form();
	}

	$.extend(Upload.prototype, {
		_form: function () {
			var s = this,
				time = 'i' + (new Date() - 0),
				iframe = $('<iframe id="' + time + '" name="' + time + '" src="about:blank" style="display:none"></iframe>'),
				_config = {
					enctype: 'application/x-www-form-urlencoded',
					method: 'get',
					action: '',
					error: './TEMPLATE.html'
				};

			_config = $.extend(_config, s.config);
//			console.log(_config);

			s.config.form.attr('target', time);
			s.config.form.attr('method', _config.method);
			s.config.form.attr('action', _config.action);
			s.config.form.attr('enctype', _config.enctype);
			iframe.appendTo('body');
			iframe.on('load', function () {
				var doc, bodyNode, bodyStr, data;
				try {
					doc = iframe[0].contentWindow.document;
				} catch (e) {
					alert('环境错误, 请联系开发同学');
				}
				if (doc) {
					bodyNode = $('body', doc);
					bodyStr = bodyNode.html();
					try {
						data = JSON.parse(bodyStr);
					} catch (e) {
						data = {'msg': '返回的数据是非json的'};
					}

					if (bodyNode.attr('data-error') === 'true') {
						seajs.use('popwin', function (P) {
							var pop = new P({
								wh: [400, 200],
								mouse: false,
								content: '<div style="margin: 0 0 0 10px"><h2 style="color: #ff0000;">出错啦~!</h2><textarea style="width: 360px; height: 120px;">' + data.msg + '</textarea><button type="button">发送错误报告</button>'
							});
							pop.ev.bind('afterinsert', function (e, o) {
								$('button', o.node).click(function () {
									$.ajax(_config.error, {
										dataType: 'json',
										type: 'POST',
										data: {
											msg: data.msg
										}
									});
									pop.close();
								});
							});
							pop.init();
						});
					} else {
						s.config.callback(data, bodyNode);
					}

					iframe.remove();
				}
			});
			s.config.form[0].submit();
		}
	});
	exports.Upload = Upload;
});