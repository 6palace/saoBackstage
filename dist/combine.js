/*@version 150910*/
$(document).ready(function () {
	$('form').each(function (i, el) {
		console.log(el);
		el.reset();
	});


	//定义顶部Banner可固定
	var _fixBtn = $('#fixedBtn'), _b = $('.banner');
	_fixBtn.bind('click', function (e) {

		if (window.localStorage) {
			var _ls = localStorage["banner"], _fx = "fixed";

			if (_ls != _fx) {
				_b.addClass(_fx);
				localStorage["banner"] = _fx;
				_fixBtn.addClass(_fx);
			} else {

				_b.removeClass(_fx);
				localStorage["banner"] = "";
				_fixBtn.removeClass(_fx);
			}
		}
	});
	_b.addClass(localStorage["banner"]);
	_fixBtn.addClass(localStorage["banner"]);
	//定义顶部Banner可固定

});

/* auto complete for p-banner search*/
/*
  $(function() {   
    $('#appsearch').autocomplete({
		
		source: function( request, response ) {
			
			//alert(request.term);
			reqData='{"id":348,"system":{"productVer":"0","lang":"cn","imei":"","productId":"0"},"method":"searchAppNameSimple","params":{"keyWord":"'+request.term+'","size":12}}';
			$.ajax({
				url: "http://apps.aliyun.com/as.htm",
				data:{"reqData":reqData},
				dataType: "json",
				type:"post",
				success: function( data ) {
					_temp=data.result.appList.split(',');
					response(_temp);
				}	 	
	    	})	
		},
		select: function( event, ui ) {
			this.value=ui.item.value;
			$(this).parent().submit();		
		}
    });
});

//  $(function() {
//    $('#appsearch').autocomplete({
//
//		source: function( request, response ) {
//
//			//alert(request.term);
//			reqData='{"id":348,"system":{"productVer":"0","lang":"cn","imei":"","productId":"0"},"method":"searchAppNameSimple","params":{"keyWord":"'+request.term+'","size":12}}';
//			$.ajax({
//				url: "http://apps.yunos.com/web.htm",
//				data:{"reqData":reqData},
//				dataType: "json",
//				type:"post",
//				success: function( data ) {
//					_temp=data.result.appList.split(',');
//					response(_temp);
//				}
//			})
//		},
//		select: function( event, ui ) {
//			this.value=ui.item.value;
//			$(this).parent().submit();
//		}
//    });
//});
*/


$.extend({
	/**
	 * {
	 *      start : 初始时间input
	 *      end   : 结束时间input
	 * }
	 * @param config
	 */
	initDate: function (config) {
//		var start = config.start,
//			end = config.end,
//			start_t = 0,
//			end_t = 0,
//			_con = {
//				maxDate: "+0d"
//			};
//		_con = $(_con, config);
//		seajs.use('datepicker', function () {
//			start.datepicker({
//				dateFormat: 'yy-mm-dd',
//				maxDate: _con.maxDate,
//				onSelect: function (dateText, inst) {
//					start_t = dateText.replace(/-/g, '') - 0;
//					(start_t <= end_t || end_t === 0) ? 1 : (function () {
//						end.val('');
//						end_t = 0;
//					})();
//				}
//			});
//			end.datepicker({
//				dateFormat: 'yy-mm-dd',
//				maxDate: _con.maxDate,
//				onSelect: function (dateText, inst) {
//					end_t = dateText.replace(/-/g, '') - 0;
//					(start_t <= end_t) ? 1 : (function () {
//						start.val('');
//						start_t = 0;
//					})();
//				}
//			});
//		});

		var start = config.start,
			end = config.end;
		seajs.use('lhgcalendar', function () {
			start && start.calendar({
				'format': 'yyyy-MM-dd HH:mm:ss'
			});
			end && end.calendar({
				'format': 'yyyy-MM-dd HH:mm:ss'
			});

		});
	},
	goTop: function () {
		var topNode = $('<a href="#" class="iconfont go-top">&#61534</a>'),
			body = $('body'),
			doc = $(document),
			flag = 1;
		topNode.appendTo('.sub-col');
		$(window).scroll(function () {
			if (doc.scrollTop() > 200 && !!flag) {
				flag = 0;
				topNode.addClass('go-top-display');
			} else if (doc.scrollTop() < 200 && !flag) {
				flag = 1;
				topNode.removeClass('go-top-display');
			}
		});
	},
	selectLink: function (firSelectNode, layout_map, callback) {
		for (var i in layout_map) {
			if(layout_map[i].num){
				layout_map[i].num = layout_map[i].num.split(',');
			}
		}
		var str = '<label>位置:</label>' +
			'       <select name="position" class="J_pos-select">' +
			'			<% for(var i = 0, l = this.num.length; i < l; i++){ var acc=this.num[i]; %>' +
			'			<option value="<%=acc%>"><% if(acc==="all"){ %> 全部 <%}else{%> <%=acc%><% } %></option>' +
			'			<%}%>' +
			'		</select>',
			strIndex = function(str, arr){
				for(var i = 0, m = arr.length; i != m; i++){
					if(arr[i]===str){
						return i;
					}
				}
			};

		//...
		var lay = firSelectNode[0].options[firSelectNode[0].selectedIndex].text;
		lay = lay === '全部' ? 'all' : lay;
		var domstr = $.jqote(str, layout_map[lay]),
			insertNode = $(domstr);
		insertNode.insertAfter(firSelectNode);
		if(lay !== 'all'){
			console.log($('.J_pos-select')[0])

//			$('.J_pos-select')[0].selectedIndex = 3;
			$('.J_pos-select')[0].selectedIndex = strIndex(layout_map.curPos, layout_map[lay].num);
		}


		firSelectNode.change(function () {
			lay = firSelectNode[0].options[firSelectNode[0].selectedIndex].text;
			lay = lay === '全部' ? 'all' : lay;
			domstr = $.jqote(str, layout_map[lay]);
			insertNode.remove();
			insertNode = $(domstr);
			insertNode.insertAfter(firSelectNode);
			callback && callback($(insertNode[2]));
		});
		return $(insertNode[2]);
	},
	//页码部分初始化 by:baohe.oyt
	pagination: function (formNode, paginationBox, callback) {
		var pagination = paginationBox ? $('.p-pagination', paginationBox) : $('.p-pagination'),
			dom = {
				pageIndex: $('.J_pageIndex', formNode),
				pageSize: $('.J_pageSize', formNode),
				pageCount: $('.J_pageCount', formNode),
				gotoIpt: $('.goto', pagination)
			};
		//翻页
		pagination.bind('click', function (e) {
			e.preventDefault();
			var tar = $(e.target);
			var cIndex = parseInt(dom.pageIndex.val(), 10);
			//上一页
			if (tar.hasClass('page-prev')) {
				changePage({
					pageIndex: cIndex - 1
				});
			}
			//下一页
			if (tar.hasClass('page-next')) {
				changePage({
					pageIndex: cIndex + 1
				});
			}
			//go
			if (tar.hasClass('page-go')) {
				var pageIndex = parseInt(dom.pageIndex.val(), 10),
					page = parseInt(dom.gotoIpt.val(), 10);

				if (page === pageIndex) {
					dom.gotoIpt.val('');
					return;
				}
				changePage({
					pageIndex: page
				});
			}
			//每页多少条
			if (tar.hasClass('J_page-size')) {
				changePage({
					pageIndex: 1,
					pageSize: parseInt(tar.html(), 10)
				});
			}
		});
		/**
		 * 修改页码信息的input的value并且重新搜索
		 * @param o
		 * @private
		 */
		function changePage(o) {
			var page = o.pageIndex,
				pageCount = parseInt(dom.pageCount.val(), 10);

			if (page < 1 || page > pageCount || isNaN(page)) {
				dom.gotoIpt.val('');
				return;
			}
			if (o.pageIndex) {
				dom.pageIndex.val(o.pageIndex);
			}
			if (o.pageSize) {
				dom.pageSize.val(o.pageSize);
			}
			if (callback) {
				callback();
				return;
			}
			formNode.submit();
		}
	}
});
var base,
	alias = {
		'popwin': 'popwin/popwin',
		'tabchange': 'tabChange/tabChange',
		'upload': 'upload/upload',
		'dd': 'dd/dd',
		'lhgcalendar': 'lhgcalendar/lhgcalendar',
		'ejs': 'ejs/ejs_production'
	};
location.href.indexOf('com') !== -1 ? (function () {
	base = "wd/distpublish/widgets";
})() : (function () {
	base = "./widgets/";
})();
seajs.config({
	charset: 'utf-8',
	debug: false,
	base: base,
	alias: alias
});
var console = console || {};
if (!console.log) {
	console.log = function () {
	}
}
$.extend({
	unparam: function (str, sep, eq) {
		if (typeof str != 'string' || !(str = $.trim(str))) {
			return {};
		}
		sep = sep || '&';
		eq = eq || '=';
		var ret = {},
			eqIndex,
			decode = function (s) {
				return decodeURIComponent(s.replace(/\+/g, ' '));
			},
			endsWith = function (str, suffix) {
				var ind = str.length - suffix.length;
				return ind >= 0 && str.indexOf(suffix, ind) == ind;
			},
			pairs = str.split(sep),
			key, val,
			i = 0, len = pairs.length;
		for (; i < len; ++i) {
			eqIndex = pairs[i].indexOf(eq);
			if (eqIndex == -1) {
				key = decode(pairs[i]);
				val = undefined;
			} else {
				key = decode(pairs[i].substring(0, eqIndex));
				val = pairs[i].substring(eqIndex + 1);
				try {
					val = decode(val);
				} catch (e) {
				}
				if (endsWith(key, '[]')) {
					key = key.substring(0, key.length - 2);
				}
			}
			if (key in ret) {
				if ($.isArray(ret[key])) {
					ret[key].push(val);
				} else {
					ret[key] = [ret[key], val];
				}
			} else {
				ret[key] = val;
			}
		}
		return ret;
	},
	cloneObject: function (obj) {
		var o = obj.constructor === Array ? [] : {};
		for (var i in obj) {
			if (obj.hasOwnProperty(i)) {
				o[i] = typeof obj[i] === "object" ? cloneObject(obj[i]) : obj[i];
			}
		}
		return o;
	}
});
if (!$.fn.extend) $.extend($.fn, {'extend': $.extend});
$.fn.extend({
	zIndex: function (zIndex) {
		if (zIndex !== undefined) {
			return this.css("zIndex", zIndex);
		}
		if (this.length) {
			var elem = $(this[ 0 ]), position, value;
			while (elem.length && elem[ 0 ] !== document) {
				position = elem.css("position");
				if (position === "absolute" || position === "relative" || position === "fixed") {
					value = parseInt(elem.css("zIndex"), 10);
					if (!isNaN(value) && value !== 0) {
						return value;
					}
				}
				elem = elem.parent();
			}
		}
		return 0;
	}
});
(function () {
	var matched, browser;
	$.uaMatch = function (ua) {
		ua = ua.toLowerCase();
		var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
			/(webkit)[ \/]([\w.]+)/.exec(ua) ||
			/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
			/(msie) ([\w.]+)/.exec(ua) ||
			ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
			[];
		return {
			browser: match[ 1 ] || "",
			version: match[ 2 ] || "0"
		};
	};
	matched = $.uaMatch(navigator.userAgent);
	browser = {};
	if (matched.browser) {
		browser[ matched.browser ] = true;
		browser.version = matched.version;
	}
	if (browser.chrome) {
		browser.webkit = true;
	} else if (browser.webkit) {
		browser.safari = true;
	}
	$.browser = browser;
})();
(function () {
	if (typeof JSON !== 'object') {
		JSON = {};
	}
	(function () {
		'use strict';
		function f(n) {
			return n < 10 ? '0' + n : n;
		}

		if (typeof Date.prototype.toJSON !== 'function') {
			Date.prototype.toJSON = function (key) {
				return isFinite(this.valueOf())
					? this.getUTCFullYear() + '-' +
					f(this.getUTCMonth() + 1) + '-' +
					f(this.getUTCDate()) + 'T' +
					f(this.getUTCHours()) + ':' +
					f(this.getUTCMinutes()) + ':' +
					f(this.getUTCSeconds()) + 'Z'
					: null;
			};
			String.prototype.toJSON =
				Number.prototype.toJSON =
					Boolean.prototype.toJSON = function (key) {
						return this.valueOf();
					};
		}
		var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			gap,
			indent,
			meta = {    // table of character substitutions
				'\b': '\\b',
				'\t': '\\t',
				'\n': '\\n',
				'\f': '\\f',
				'\r': '\\r',
				'"': '\\"',
				'\\': '\\\\'
			},
			rep;

		function quote(string) {
			escapable.lastIndex = 0;
			return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
				var c = meta[a];
				return typeof c === 'string'
					? c
					: '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
			}) + '"' : '"' + string + '"';
		}

		function str(key, holder) {
			var i,          // The loop counter.
				k,          // The member key.
				v,          // The member value.
				length,
				mind = gap,
				partial,
				value = holder[key];
			if (value && typeof value === 'object' &&
				typeof value.toJSON === 'function') {
				value = value.toJSON(key);
			}
			if (typeof rep === 'function') {
				value = rep.call(holder, key, value);
			}
			switch (typeof value) {
				case 'string':
					return quote(value);
				case 'number':
					return isFinite(value) ? String(value) : 'null';
				case 'boolean':
				case 'null':
					return String(value);
				case 'object':
					if (!value) {
						return 'null';
					}
					gap += indent;
					partial = [];
					if (Object.prototype.toString.apply(value) === '[object Array]') {
						length = value.length;
						for (i = 0; i < length; i += 1) {
							partial[i] = str(i, value) || 'null';
						}
						v = partial.length === 0
							? '[]'
							: gap
							? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
							: '[' + partial.join(',') + ']';
						gap = mind;
						return v;
					}
					if (rep && typeof rep === 'object') {
						length = rep.length;
						for (i = 0; i < length; i += 1) {
							if (typeof rep[i] === 'string') {
								k = rep[i];
								v = str(k, value);
								if (v) {
									partial.push(quote(k) + (gap ? ': ' : ':') + v);
								}
							}
						}
					} else {
						for (k in value) {
							if (Object.prototype.hasOwnProperty.call(value, k)) {
								v = str(k, value);
								if (v) {
									partial.push(quote(k) + (gap ? ': ' : ':') + v);
								}
							}
						}
					}
					v = partial.length === 0
						? '{}'
						: gap
						? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
						: '{' + partial.join(',') + '}';
					gap = mind;
					return v;
			}
		}

		if (typeof JSON.stringify !== 'function') {
			JSON.stringify = function (value, replacer, space) {
				var i;
				gap = '';
				indent = '';
				if (typeof space === 'number') {
					for (i = 0; i < space; i += 1) {
						indent += ' ';
					}
				} else if (typeof space === 'string') {
					indent = space;
				}
				rep = replacer;
				if (replacer && typeof replacer !== 'function' &&
					(typeof replacer !== 'object' ||
						typeof replacer.length !== 'number')) {
					throw new Error('JSON.stringify');
				}
				return str('', {'': value});
			};
		}
		if (typeof JSON.parse !== 'function') {
			JSON.parse = function (text, reviver) {
				var j;

				function walk(holder, key) {
					var k, v, value = holder[key];
					if (value && typeof value === 'object') {
						for (k in value) {
							if (Object.prototype.hasOwnProperty.call(value, k)) {
								v = walk(value, k);
								if (v !== undefined) {
									value[k] = v;
								} else {
									delete value[k];
								}
							}
						}
					}
					return reviver.call(holder, key, value);
				}

				text = String(text);
				cx.lastIndex = 0;
				if (cx.test(text)) {
					text = text.replace(cx, function (a) {
						return '\\u' +
							('0000' + a.charCodeAt(0).toString(16)).slice(-4);
					});
				}
				if (/^[\],:{}\s]*$/
					.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
						.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
						.replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
					j = eval('(' + text + ')');
					return typeof reviver === 'function'
						? walk({'': j}, '')
						: j;
				}
				throw new SyntaxError('JSON.parse');
			};
		}
	}());
})();
$.NM = function (lv1, lv2) {
	var w = window;
	w.APP = w.APP || {};
	w.APP[lv1] = w.APP[lv1] || {};
	if (lv2 !== undefined) {
		w.APP[lv1][lv2] = w.APP[lv1][lv2] || {};
	}
	return w.APP[lv1];
};
/*加载模版引擎*/
seajs.use('ejs');

var SEP = '&',
	EMPTY = '',
	EQ = '=',
	TRUE = true,
// FALSE = false,
	HEX_BASE = 16,
// http://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet
// http://wonko.com/post/html-escaping
	htmlEntities = {
		'&amp;': '&',
		'&gt;': '>',
		'&lt;': '<',
		'&#x60;': '`',
		'&#x2F;': '/',
		'&quot;': '"',
		'&#x27;': "'"
	},
	reverseEntities = {},
	escapeReg,
	unEscapeReg,
// - # $ ^ * ( ) + [ ] { } | \ , . ?
	escapeRegExp = /[\-#$\^*()+\[\]{}|\\,.?\s]/g;
(function () {
	for (var k in htmlEntities) {
		reverseEntities[htmlEntities[k]] = k;
	}
})();

function isValidParamValue(val) {
	var t = typeof val;
	// If the type of val is null, undefined, number, string, boolean, return TRUE.
	return val == null || (t !== 'object' && t !== 'function');
}
function getEscapeReg() {
	if (escapeReg) {
		return escapeReg
	}
	var str = EMPTY;
	$.each(htmlEntities, function (i, entity) {
		str += entity + '|';
	});
	str = str.slice(0, -1);
	return escapeReg = new RegExp(str, 'g');
}
function getUnEscapeReg() {
	if (unEscapeReg) {
		return unEscapeReg
	}
	var str = EMPTY;
	$.each(reverseEntities, function (entity) {
		str += entity + '|';
	});
	str += '&#(\\d{1,5});';
	return unEscapeReg = new RegExp(str, 'g');
}
$.extend({
	urlEncode: function (s) {
		return encodeURIComponent(String(s));
	},
	urlDecode: function (s) {
		return decodeURIComponent(s.replace(/\+/g, ' '));
	},
	fromUnicode: function (str) {
		return str.replace(/\\u([a-f\d]{4})/ig, function (m, u) {
			return  String.fromCharCode(parseInt(u, HEX_BASE));
		});
	},
	escapeHtml: function (str) {
		return (str + '').replace(getEscapeReg(), function (m) {
			return reverseEntities[m];
		});
	},
	escapeRegExp: function (str) {
		return str.replace(escapeRegExp, '\\$&');
	},
	unEscapeHtml: function (str) {
		return str.replace(getUnEscapeReg(), function (m, n) {
			return htmlEntities[m] || String.fromCharCode(+n);
		});
	}
});

(function () {
	var A = $.NM('p_save_filter', 'saveFilter'),
	opFilter = {};
	A.opFilter = opFilter;

	function saveFilterCallback(json, bodyNode){
		var ddStr = '<dd><a class="filter" href="<%=this.url%>"><%=this.term_name%></a> <b data-term_name="<%=this.term_name%>" class="del">×</b></dd>';
		$($.jqote(ddStr, json)).insertAfter('.p-save-filter dt');
	}

	opFilter.saveOp = function(config){
		var io = prompt('输入快捷搜索名称(不能同名):'),
			dd = $('.p-save-filter .filter'),
			flag = true;

		if(io !== null && io.length > 0){

			dd.each(function(i, el){
				if($(el).html() === io){
					flag = false
				}
			});

			if(!flag){
				alert('该名字已存在, 请换个名字');
				return;
			}
			config.input.val(io);
			seajs.use('upload', function (up) {
				new up.Upload({
					form: config.form,
					callback: saveFilterCallback,
					action: config.save_filter
				});
			});
		}
	};

//	opFilter.getOp = function(config){
//		$.ajax(A.main.config.ajax.get_filter, {
//			type : 'GET',
//			dataType: 'json',
//			data: {
//
//			},
//			success: function (data) {
//				if (data.success === true) {
//
//				} else {
//
//				}
//			}
//		});
//	};

	opFilter.delOp = function(config){
		$.ajax(config.del_filter, {
			type : 'GET',
			dataType: 'json',
			data: {
				term_name:config.term_name
			},
			success: function (data) {
				if (data.success === true) {
					config.targetNode.parent().remove();
				} else {
					alert(data.message);
				}
			}
		});
	};

})();
var APP = APP || {};
(function () {
	var A = APP, sobj = {};
	A.p_search_filter = sobj;

	sobj.init = function () {
		var wrap = $('.p-search-filter');
		$.initDate({
			start: $('.start-input', wrap),
			end: $('.end-input', wrap)
		});
		openSearch(wrap);
		/*
		 add localStorage support
		 default search-filter is close	 
		*/		
		if(window.localStorage){
			if(!localStorage["fieldset"]){localStorage["fieldset"]=""}
			$('fieldset', wrap)[0].className=localStorage["fieldset"];
		}		
	};

	function openSearch(wrap) {
		var openTrigger = $('legend', wrap),
			fieldset = $('fieldset', wrap);
		openTrigger.click(function (e) {

			if (fieldset.hasClass('open')) {
				fieldset.removeClass('open');
				localStorage["fieldset"]="";
			} else {
				fieldset.addClass('open');
				localStorage["fieldset"]="open";
			}
		});
	}
})();
(function(){
	var A = $.NM('card_control', 'main');

	A.main.init = function(){
		addCard();
	};

	function addCard(){
		var addBtn = $('J_popwin_card_add');

		function addfn(e){
			$.ajax(A.main.config.ajax.getMsg, {
				data : {
					id : ''
				},
				dataType : 'html',
				method : 'get',
				success : function(data){
					seajs.use('popwin', function (p) {
						var pop = new p({
							wh: [450],
							mouse: false,
							content: data
						});
						pop.ev.bind('afterinsert', function (e, node) {
							var cancel = $('.J_cancel', node.node),
								submit = $('.J_submit', node.node),
								form = $('form', node.node);


							upload(form);

							//TODO unconfirmed interaction with server
							function submitFn() {
								seajs.use('upload', function (u) {
									new u.Upload({
										form: form,
										action: A.main.config.action.addAndFix,
										callback: function (data, node) {
											if (data.success === true) {
												location.reload();
											} else {
												alert(data.message);
											}
										}
									});
								});
							}

							submit.on('click', submitFn);

							function cancelFn() {
								pop.close();
							}

							cancel.on('click', cancelFn);
						});
						pop.init();
					})
				}
			});
		}

		addBtn.on('click', addFn);
	}

	//上传卡片
	function upload(){
		//TODO
	}
})();
(function(){
	var A = $.NM('rule_control','main');

	A.main.init = function(){
		addRule();
		tableEv();
	}

	function addRule(){
		var addBtn = $(".m-rule-control .J_add");

		addBtn.on('click', function(e){
			$.ajax(A.main.config.ajax.getAdd, {
				data : {
					id : '',
				},
				dataType : 'html',
				method : 'get',
				success : function(data){

					seajs.use('popwin', function (p) {
						var pop = new p({
							wh: [450],
							mouse: false,
							content: data
						});
						pop.ev.bind('afterinsert', function (e, node) {
							var cancel = $('.J_cancel', node.node),
								submit = $('.J_submit', node.node),
								form = $('form', node.node);

							//TODO unconfirmed interaction with server
							function submitFn() {
								seajs.use('upload', function (u) {
									new u.Upload({
										form: form,
										action: A.main.config.action.addAndFix,
										callback: function (data, node) {
											if (data.success === true) {
												location.reload();
											} else {
												alert(data.message);
											}
										}
									});
								});
							}

							//untested
							function jsonKeyFn(e) {
								e.preventDefault();
								var source = $(e.target).parent();
								var key = source.find(".json_key").val();
								var val = source.find(".json_value").val();
								source.parent().find(".show_json").append("<option selected>" + key + ":" + val + "</option>");

							}

							$(".J_add_json").on('click', jsonKeyFn);

							submit.on('click', submitFn);

							function cancelFn() {
								pop.close();
							}

							cancel.on('click', cancelFn);
						});
						pop.init();
					});
				}
			 });
		});
	}

	function tableEv(){

	}


})();
(function(){
	var A = $.NM('service_control','main');

	A.main.init = function(){
		addRule();
		tableEv();
	}

	function addRule(){
		var addBtn = $(".m-service-control .J_add");

		addBtn.on('click', function(e){
			$.ajax(A.main.config.ajax.getAdd, {
				data : {
					id : '',
				},
				dataType : 'html',
				method : 'get',
				success : function(data){

					seajs.use('popwin', function (p) {
						var pop = new p({
							wh: [450],
							mouse: false,
							content: data
						});
						pop.ev.bind('afterinsert', function (e, node) {
							var reset = $('.J_reset', node.node),
								submit = $('.J_submit', node.node),
								form = $('form', node.node),
								jsonAdd = $(".J_add_json"),
								protocolSelector = $(".protocolSelect"),
								deleteKey = $(".J_delete_json");

							//TODO unconfirmed interaction with server
							//All multiple select boxes select all options for all bey-values
							function submitFn() {
								//preprocess
								var keyval = $(".J_popwin_service_control_add select");
								keyval.each(function(index){
									if($(this).attr("multiple")){
										$(this).children().attr("selected", true);
									}
								});

								seajs.use('upload', function (u) {
									new u.Upload({
										form: form,
										action: A.main.config.action.addAndFix,
										callback: function (data, node) {
											if (data.success === true) {
												location.reload();
											} else {
												alert(data.message);
											}
										}
									});
								});
							}

							function jsonKeyFn(e) {
								console.log(e);
								e.preventDefault();
								var source = $(e.target).parent();
								var key = source.find(".json_key").val();
								var val = source.find(".json_value").val();
								var type = source.parent();
								if(type.hasClass("J_json_fill_indexed")){
									var i = source.find(".json_index").val();
									type.find(".show_json").append('<option>{' + i + ':{"' +key + '":"' + val + '"}}</option>');
								} else{
									source.parent().find(".show_json").append("<option>" + key + ":" + val + "</option>");
								}
							}

							function deleteKeyFn(e){
								e.preventDefault();
								var delTarget = $(this).attr("action");
								$("#" + delTarget).find("option:selected").each(function(){
									console.log(this);
									$(this).remove();
								});
							}

							function protocolDisplayFn(e){
								var sel = $(e.target).attr("value");
								var protocolForm = $(".protocolDetail");
								protocolForm.hide();
								protocolForm.filter("." + sel).show();
							}

							jsonAdd.on('click', jsonKeyFn);
							protocolSelector.on('click', protocolDisplayFn);
							deleteKey.on('click', deleteKeyFn);

							submit.on('click', submitFn);

							function resetFn() {
								pop.close();
							}

							cancel.on('click', cancelFn);
						});
						pop.init();
					});
				}
			 });
		});
	}

	function tableEv(){

	}


})();