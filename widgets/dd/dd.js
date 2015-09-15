define(function(require, exports, module){

    function DD(config){
        var s = this;
        /**
         * config.ddnode : node节点 拖动元素
         * config.exceptClassName : "string" 不希望发生拖动效果的元素, 主要是表单元素
         */
        s.config = config;
        s.ev = $({});
        s.config.html = $('html');

//    s.top;
//    s.left;

        s._bind();
    }
    $.extend(DD.prototype, {
        _bind : function(){
            var s = this,
	            trigger = $('.closepop');
	        trigger.mousedown(function(e){

                if ($(e.target).hasClass(s.config.exceptClassName)) {
                    return true;
                }

                e.preventDefault();
//                console.log('start');
                s.ev.trigger('start');

                s.position = s.config.ddnode.position();
                s.top = s.position.top;
                s.left = s.position.left;

                s.oldx = e.pageX;
                s.oldy = e.pageY;

                s.config.html.mousemove(function(e){
                    s.newtop = e.pageY - s.oldy + s.top;
                    s.newleft = e.pageX - s.oldx + s.left;
                    s.config.ddnode.css({'top': s.newtop+'px', 'left': s.newleft+'px'});
                });

//            return false;
            });
	        trigger.mouseup(function(e){
                e.preventDefault();
//                console.log('end');
                s.ev.trigger('end');
		        s.config.html.unbind('mousemove');
            });
        }
    });

    module.exports = DD;
});