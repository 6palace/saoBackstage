/**
 * @version 1
 */
define(function(require, exports, module){
    /*
    * o.triggers
    * o.cur
    **/
    function TabChange (o){
        var s = this;
        s.cur = o.cur || 0;
        s.target;
        s.triggers = o.triggers;
        s.ev = {};
        s._bindClick();
    }
    $.extend(TabChange.prototype, {
        _bindClick:function(){
            var s = this;
            s.triggers.eq(s.cur).addClass('cur');
            s.triggers.click(function(e){
                s._clickOp(e, s);
            });
        },
        _clickOp : function(e, s){
            var dom = e.target,
                fireObj = {};
            s.triggers.each(function(i){
                if(dom === s.triggers[i]){
                    s.target = i;
                    return false;
                }
            });
            if(s.target === s.cur) return;
            $(s.triggers.get(s.target)).addClass('cur');
            $(s.triggers.get(s.cur)).removeClass('cur');
            fireObj.oldIndex = s.cur;
            s.cur = s.target;
            fireObj.index = s.cur;
            $(s.ev).trigger('fireChange', fireObj);
        }
    });
    exports.TabChange = TabChange;
});