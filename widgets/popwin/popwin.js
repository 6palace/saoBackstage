/**
 * @version 1
 */
define(function(require, exports, module){
	require('./popwin.css');
	var DD = require('../dd/dd');
	/**
	 * config.wh = [width, height];      弹窗宽高 || [300, 200]
	 * config.mouse = true||false;       弹窗跟随鼠标 || 窗口内居中
	 * config.content = 'html string'    弹窗内的内容
	 * config.e = {}                     跟随鼠标定位时, 传入的事件对象
	 * config.exceptClassName = ''       拖动功能, 忽略拖动功能的元素
	 * @param config
	 * @constructor
	 *
	 * e.g.
	 *   seajs.use('../widgets/popwin/popwin.js', function(pop){
     *       var po = new pop({content:'<p>333</p>', e : e, mouse : true});
     *       po.ev.bind('afterinsert', function(e,o){
     *           
     *           
     *       });
     *       po.init();
     *   });
	 */
	function PopWin (config){
		config.wh = config.wh === undefined ? [300, 200] : config.wh;
		this.config = config;
		this.ev = $({});
	}
	$.extend(PopWin.prototype, {
		init : function(){
			this._createPop();
		},
		_createPop : function(){
			var s = this,
				popstr = '<div class="J_popwin">'+
					'<div class="opacity">'+
					'<div class="popbg" style="width:'+(s.config.wh[0]-10)+'px;height:'+ (s.config.wh[1] ? (s.config.wh[1] - 10)+'px;' : 'auto') +'">'+
					'<div class="closepop"><b>&times;</b></div>'+
					'<div class="popcontent">' +
					s.config.content +
					'</div>'+
					'</div>'+
					'</div>'+
					'</div>';
			s._insert(popstr);
		},
		_insert : function(domstr){
			var s = this;
			s.node = $(domstr);
			$('body').append(s.node);
			s._position(s.node);
			s.ev.trigger('afterinsert', {node: s.node});
			s._bind(s.node);
			s._addmask();
		},
		_bind:function(wrap){
			var s = this;
			$('b', wrap).click(function(){
				s.close();
			});
			new DD({ddnode: s.node, exceptClassName: s.config.exceptClassName});
		},
		_position : function(wrap){
			var s = this, height, width = $('body').outerWidth(), scrollTop;
			if(s.config.mouse){
				width = width - s.config.e.pageX > s.config.wh[0] ? s.config.e.pageX : width - s.config.wh[0] -30 ;
				wrap.css({top : s.config.e.pageY + 'px', left : width + 'px'});
			}else{
//	            console.log(wrap, wrap.height())
				console.log(s.config.wh[1])
				var popheight = s.config.wh[1] ? s.config.wh[1] : wrap.height();
				console.log(popheight)
				height = $('body').outerHeight();
				scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
				wrap.css({top : Math.max(((height - popheight)/2 - 10 + scrollTop),0) + 'px', left : ((width - s.config.wh[0])/2)+'px'});
			}
		},
		_addmask : function(){
			var mask = $('<div class="J_popwin_mask"><b></b><img src="http://img03.taobaocdn.com/tps/i3/T1FoJ4FkReXXaE4r73-100-35.gif" /></div>'),
				allheight, allwidth;
			allheight = document.documentElement.scrollHeight === undefined ? document.body.scrollHeight : document.documentElement.scrollHeight;
			allwidth = document.documentElement.scrollWidth === undefined ? document.body.scrollWidth : document.documentElement.scrollWidth;
			$(mask).css({width:allwidth+'px', height:allheight+'px'}).appendTo('body');
		},
		_rmmask: function(){
			$('.J_popwin_mask').remove();
		},
		close : function(){
			var s = this;
			s.node.remove();
			s._rmmask();
			s.ev.trigger('afterclose');
			return null;
		}
	});
	PopWin.alert = function(csmsg, fn, color){
		var msg = csmsg === undefined ? '系统错误' : csmsg,
			color = color || '#ff0000',
			str = '<div class="J_popwin_alert">' +
				'<p style="color:'+color+'">'+msg+'</p>' +
				'<button type="button" class="close">确 定</button>'+
				'</div>',
			pop = new PopWin({content:str, wh:[200,160]});
		pop.ev.bind('afterinsert', function(e,o){
			$('.close', o.node).click(function(){
				pop.close();
			});
		});
		pop.ev.bind('afterclose', function(e,o){
			fn && fn();
		});
		pop.init();
	};
	PopWin.confirm = function(csmsg, yesFn, noFn){
		var msg = csmsg === undefined ? '确认操作' : csmsg,
			str = '<div class="J_popwin_confirm">' +
				'<p>'+msg+'</p>' +
				'<button type="button" class="yes">确认操作</button>'+
				'<button type="button" class="no">取消操作</button>'+
				'</div>',
			pop = new PopWin({content:str, wh:[200,160]});
		pop.ev.bind('afterinsert', function(e,o){
			$('.yes', o.node).click(function(){
				yesFn && yesFn();
				pop.close();
			});
			$('.no', o.node).click(function(){
				noFn && noFn();
				pop.close();
			});
		});
		pop.init();
	}
	module.exports = PopWin;
});