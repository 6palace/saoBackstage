define(function(require, exports, module){
    require('./notify.css');
    exports.notify = function(str) {
        this.notify = init();
        this.notify(str);
        function init() {
            var topValueDefault = -300;
            var topValueShow = -2;
            var tipBox = $('<div id="global-tipBox" style="top: '+ topValueDefault +'px;"></div>');
            var con = $('body');
            var timer;
            con.append(tipBox);
            return function(str) {
                if(timer !== false) {
                    clearTimeout(timer)
                }
                tipBox.css('top', topValueDefault);
                tipBox.html(str);
                tipBox.animate( {
                    top: topValueShow
                }, 400, 'linear', function() {
                    timer = setTimeout(function() {
                        tipBox.animate({
                            top: topValueDefault
                        }, 400);
                        timer = false;
                    }, 3500);
                });
            };
        }
    };
});