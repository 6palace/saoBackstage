/**
 * @version 1
 **/
define("falseaddress/requires", [ "wd/distpublish/widgets/lhgcalendar/lhgcalendar", "wd/distpublish/widgets/dd/dd", "wd/distpublish/widgets/popwin/popwin", "wd/distpublish/widgets/tabChange/tabChange", "wd/distpublish/widgets/upload/upload", "wd/distpublish/widgets/ejs/ejs_production" ], function(require, exports, module) {
    require("wd/distpublish/widgets/lhgcalendar/lhgcalendar");
    require("wd/distpublish/widgets/dd/dd");
    require("wd/distpublish/widgets/popwin/popwin");
    require("wd/distpublish/widgets/tabChange/tabChange");
    require("wd/distpublish/widgets/upload/upload");
    require("wd/distpublish/widgets/ejs/ejs_production");
});

define("wd/distpublish/widgets/lhgcalendar/lhgcalendar.css", [], function() {
    seajs.importStyle('.lcui_border{font:12px/1.333 tahoma,arial,\\5b8b\\4f53,sans-serif;background-color:#fff;border:2px solid #ddd;-webkit-box-shadow:3px 3px 3px #aaa}.lcui_lt,.lcui_rt,.lcui_lb,.lcui_rb,.lcui_l,.lcui_r,.cui_py,.cui_ny,.cui_pm,.cui_nm{width:3px}.cui_pm,.cui_nm,.cui_py,.cui_ny{font-family:FontAwesome;line-height:16px}.cui_pm:hover,.cui_nm:hover,.cui_py:hover,.cui_ny:hover{text-decoration:none}.cui_pm:before,.cui_py:before{content:"\\f0a8"}.cui_nm:before,.cui_ny:before{content:"\\f0a9"}.lcui_lt,.lcui_rt{height:3px}.lcui_lt{background-position:-65px 0}.lcui_rt{background-position:-69px 0}.lcui_lb,.lcui_rb{height:3px}.lcui_lb{background-position:-65px -11px}.lcui_rb{background-position:-69px -11px}.lcui_l,.lcui_r{background-repeat:repeat-y}.lcui_l{background-position:-73px 0}.lcui_r{background-position:-77px 0}.lcui_t,.lcui_b{font-size:0}.lcui_t{background-position:0 0}.lcui_b{background-position:0 -10px}.lcui_head{padding:5px 8px 3px}.lcui_body thead{text-align:center;color:#0597db;font:14px "幼圆",Tahoma,Arial,sans-serif;font-weight:700;height:18px}.cui_py{display:block;width:9px;height:16px;background-position:-25px 0}.cui_ny{display:block;width:9px;height:16px;background-position:-35px 0}.cui_iy{width:40px;margin:0;padding:0;border:1px solid #eee;height:14px;font:12px tahoma,arial;cursor:pointer;text-align:center;_vertical-align:middle;margin-right:2px}.cui_pm{display:block;width:9px;height:16px;background-position:-45px 0}.cui_nm{display:block;width:9px;height:16px;background-position:-55px 0}.cui_im{width:20px;margin:0;padding:0;border:1px solid #eee;height:14px;font:12px tahoma,arial;cursor:pointer;text-align:center;_vertical-align:middle;margin-right:2px}.cui_db td{background-color:#f7f7f7;color:#999;font:11px verdana,arial,sans-serif;cursor:default;height:20px;width:24px;text-align:center}.cui_db a{color:#000;text-decoration:none;display:block;height:20px;line-height:20px;width:24px;cursor:default}.cui_db a:hover,.cui_today{background-position:0 0;background:#129a03;color:#fff;border-radius:3px}.cui_foot{padding:2px 0 1px;_padding:1px 0 0}.lcui_today,.lcui_empty{width:44px}.cui_tbtn:link,.cui_dbtn:link{display:block;border:1px solid #428BCA;color:#fff;text-decoration:none;background-color:#428BCA;width:38px;height:17px;line-height:17px;line-height:20px\\0;border-radius:1px}.cui_tbtn:hover,.cui_dbtn:hover{border:1px solid #3276b1;background-color:#3276b1}.lcui_time input{margin:0;padding:0;border:1px solid #999;width:20px;height:17px;font:11px Verdana,Arial;text-align:center;background-color:#f2f2f2;line-height:17px}.cui_ymlist{position:absolute;border:2px solid #ddd;background-color:#fff;width:120px;padding:2px}.cui_lbox a{display:block;padding:3px 0;background:#f7f7f7;text-decoration:none;cursor:default;color:#000;text-align:center;font:11px verdana,arial,sans-serif}.cui_lbox a:hover{background:#129a03;color:#fff;border-radius:3px}.cui_ybar{background-color:#f7f7f7}.cui_ybar a{display:block;text-decoration:none;text-align:center;color:#000}');
});

/*!
 * lhgcore Calendar Plugin v3.0.0
 * Date : 2012-03-13 10:35:11
 * Copyright (c) 2009 - 2012 By Li Hui Gang
 */
define("wd/distpublish/widgets/lhgcalendar/lhgcalendar", [], function(require, exports, module) {
    require("./lhgcalendar.css");
    (function($, window, undefined) {
        var document = window.document, _box, addzero = /\b(\w)\b/g, _ie = !!window.ActiveXObject, _ie6 = _ie && !window.XMLHttpRequest, _$window = $(window), expando = "JCA" + new Date().getTime(), _path = function(script, i) {
            var l = script.length, path;
            for (;i < l; i++) {
                path = !!document.querySelector ? script[i].src : script[i].getAttribute("src", 4);
                if (path.substr(path.lastIndexOf("/")).indexOf("lhgcalendar") !== -1) break;
            }
            return path.substr(0, path.lastIndexOf("/") + 1);
        }(document.getElementsByTagName("script"), 0), iframeTpl = _ie6 ? '<iframe id="lhgcal_frm" hideFocus="true" ' + 'frameborder="0" src="about:blank" style="position:absolute;' + "z-index:-1;width:100%;top:0px;left:0px;filter:" + 'progid:DXImageTransform.Microsoft.Alpha(opacity=0)"></iframe>' : "", calendarTpl = '<table class="lcui_border" border="0" cellspacing="0" cellpadding="0">' + "<tbody>" + "<tr>" + '<td class="lcui_lt"></td>' + '<td class="lcui_t"></td>' + '<td class="lcui_rt"></td>' + "</tr>" + "<tr>" + '<td class="lcui_l"></td>' + "<td>" + '<div class="lcui_head">' + '<table width="100%" cellspacing="0" cellpadding="0" border="0">' + "<tr>" + '<td width="14"><a class="cui_pm" href="javascript:void(0);"></a></td>' + '<td width="40"><input class="cui_im" maxlength="4" value=""/>月</td>' + '<td><a class="cui_nm" href="javascript:void(0);"></a></td>' + '<td width="14"><a class="cui_py" href="javascript:void(0);"></a></td>' + '<td width="60"><input class="cui_iy" maxlength="4" value=""/>年</td>' + '<td width="9"><a class="cui_ny" href="javascript:void(0);"></a></td>' + "</tr>" + "</table>" + '<div class="cui_ymlist" style="display:none;">' + '<table width="100%" cellspacing="1" cellpadding="0" border="0">' + '<thead class="cui_ybar"><tr>' + '<td><a class="cui_pybar" href="javascript:void(0);">«</a></td>' + '<td><a class="cui_cybar" href="javascript:void(0);">×</a></td>' + '<td><a class="cui_nybar" href="javascript:void(0);">»</a></td>' + "</tr></thead>" + '<tbody class="cui_lbox">' + "</tbody>" + "</table>" + "</div>" + "</div>" + '<div class="lcui_body">' + '<table cellspacing="1" cellpadding="0" border="0">' + "<thead><tr>" + "<td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td>" + "</tr></thead>" + '<tbody class="cui_db">' + "</tbody>" + "</table>" + "</div>" + '<div class="cui_foot">' + '<table width="100%" cellspacing="0" cellpadding="0" border="0">' + "<tr>" + '<td align="center" class="lcui_today"><a class="cui_tbtn" href="javascript:void(0);">今天</a></td>' + '<td align="center" class="lcui_time"><input class="cui_hour" maxlength="2"/>:<input class="cui_minute" maxlength="2"/>:<input class="cui_second" maxlength="2"/></td>' + '<td align="center" class="lcui_empty"><a class="cui_dbtn" href="javascript:void(0);">清空</a></td>' + "</tr>" + "</table>" + "</div>" + "</td>" + '<td class="lcui_r"></td>' + "</tr>" + "<tr>" + '<td class="lcui_lb"></td>' + '<td class="lcui_b"></td>' + '<td class="lcui_rb"></td>' + "</tr>" + "</tbody>" + "</table>" + iframeTpl;
        /*! 开启IE6 CSS背景图片缓存 */
        try {
            document.execCommand("BackgroundImageCache", false, true);
        } catch (e) {}
        //		(function (head) {
        //			var link = document.createElement('link');
        //
        //			link.href = _path + 'skins/lhgcalendar.css';
        //			link.rel = 'stylesheet';
        //
        //			head.appendChild(link);
        //		})(document.getElementsByTagName('head')[0]);
        function isDigit(ev) {
            var iCode = ev.keyCode || ev.charCode;
            return iCode >= 48 && iCode <= 57 || iCode >= 37 && iCode <= 40 || iCode == 8 || iCode == 46;
        }
        function dateFormat(format) {
            var that = this, o = {
                "M+": that.getMonth() + 1,
                "d+": that.getDate(),
                "h+": that.getHours() % 12 == 0 ? 12 : that.getHours() % 12,
                "H+": that.getHours(),
                "m+": that.getMinutes(),
                "s+": that.getSeconds(),
                "q+": Math.floor((that.getMonth() + 3) / 3),
                w: "0123456".indexOf(that.getDay()),
                S: that.getMilliseconds()
            };
            if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (that.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
            return format;
        }
        function getDate(string, format) {
            var regexp, tmpnow = new Date();
            /** year : /yyyy/ */
            y4 = "([0-9]{4})", /** year : /yy/ */
            y2 = "([0-9]{2})", /** index year */
            yi = -1, /** month : /MM/ */
            M2 = "(0[1-9]|1[0-2])", /** month : /M/ */
            M1 = "([1-9]|1[0-2])", /** index month */
            Mi = -1, /** day : /dd/ */
            d2 = "(0[1-9]|[1-2][0-9]|30|31)", /** day : /d/ */
            d1 = "([1-9]|[1-2][0-9]|30|31)", /** index day */
            di = -1, /** hour : /HH/ */
            H2 = "([0-1][0-9]|20|21|22|23)", /** hour : /H/ */
            H1 = "([0-9]|1[0-9]|20|21|22|23)", /** index hour */
            Hi = -1, /** minute : /mm/ */
            m2 = "([0-5][0-9])", /** minute : /m/ */
            m1 = "([0-9]|[1-5][0-9])", /** index minute */
            mi = -1, /** second : /ss/ */
            s2 = "([0-5][0-9])", /** second : /s/ */
            s1 = "([0-9]|[1-5][0-9])", /** index month */
            si = -1;
            if (validDate(string, format)) {
                var val = regexp.exec(string), reDate, index = getIndex(format), year = index[0] >= 0 ? val[index[0] + 1] : tmpnow.getFullYear(), month = index[1] >= 0 ? val[index[1] + 1] - 1 : tmpnow.getMonth(), day = index[2] >= 0 ? val[index[2] + 1] : tmpnow.getDate(), hour = index[3] >= 0 ? val[index[3] + 1] : tmpnow.getHours(), minute = index[4] >= 0 ? val[index[4] + 1] : tmpnow.getMinutes(), second = index[5] >= 0 ? val[index[5] + 1] : tmpnow.getSeconds(), reDate = new Date(year, month, day, hour, minute, second);
                if (reDate.getDate() == day) return reDate; else return tmpnow;
            } else return tmpnow;
            function validDate(string, format) {
                sting = $.trim(string);
                if (string === "") return;
                format = format.replace(/yyyy/, y4).replace(/yy/, y2).replace(/MM/, M2).replace(/M/, M1).replace(/dd/, d2).replace(/d/, d1).replace(/HH/, H2).replace(/H/, H1).replace(/mm/, m2).replace(/m/, m1).replace(/ss/, s2).replace(/s/, s1);
                format = new RegExp("^" + format + "$");
                regexp = format;
                return format.test(string);
            }
            function getIndex(format) {
                var ia = [], i = 0, ia2;
                yi = format.indexOf("yyyy");
                if (yi < 0) yi = format.indexOf("yy");
                if (yi >= 0) {
                    ia[i] = yi;
                    i++;
                }
                Mi = format.indexOf("MM");
                if (Mi < 0) Mi = format.indexOf("M");
                if (Mi >= 0) {
                    ia[i] = Mi;
                    i++;
                }
                di = format.indexOf("dd");
                if (di < 0) di = format.indexOf("d");
                if (di >= 0) {
                    ia[i] = di;
                    i++;
                }
                Hi = format.indexOf("HH");
                if (Hi < 0) Hi = format.indexOf("H");
                if (Hi >= 0) {
                    ia[i] = Hi;
                    i++;
                }
                mi = format.indexOf("mm");
                if (mi < 0) mi = format.indexOf("m");
                if (mi >= 0) {
                    ia[i] = mi;
                    i++;
                }
                si = format.indexOf("ss");
                if (si < 0) si = format.indexOf("s");
                if (si >= 0) {
                    ia[i] = si;
                    i++;
                }
                ia2 = [ yi, Mi, di, Hi, mi, si ];
                for (i = 0; i < ia.length - 1; i++) {
                    for (j = 0; j < ia.length - 1 - i; j++) {
                        if (ia[j] > ia[j + 1]) {
                            var temp = ia[j];
                            ia[j] = ia[j + 1];
                            ia[j + 1] = temp;
                        }
                    }
                }
                for (i = 0; i < ia.length; i++) {
                    for (j = 0; j < ia2.length; j++) {
                        if (ia[i] == ia2[j]) ia2[j] = i;
                    }
                }
                return ia2;
            }
        }
        function convertDate(date, format, day) {
            var tmpnow = new Date();
            if (/%/.test(date)) {
                day = day || 0;
                date = date.replace(/%y/, tmpnow.getFullYear()).replace(/%M/, tmpnow.getMonth() + 1).replace(/%d/, tmpnow.getDate() + day).replace(/%H/, tmpnow.getHours()).replace(/%m/, tmpnow.getMinutes()).replace(/%s/, tmpnow.getSeconds()).replace(addzero, "0$1");
            } else if (/^#[\w-]+$/.test(date)) {
                date = $.trim($(date)[0].value);
                if (date.length > 0 && format) date = dateFormat.call(getDate(date, format), "yyyy-MM-dd");
            }
            return date;
        }
        /*!--------------------------------------------------------------*/
        var lhgcalendar = function(config) {
            config = config || {};
            var setting = lhgcalendar.setting;
            for (var i in setting) {
                if (config[i] === undefined) config[i] = setting[i];
            }
            return _box ? _box._init(config) : new lhgcalendar.fn._init(config);
        };
        lhgcalendar.fn = lhgcalendar.prototype = {
            constructor: lhgcalendar,
            _init: function(config) {
                var that = this, DOM, evt = that._getEvent(), inpVal, date;
                that.config = config;
                that.DOM = DOM = that.DOM || that._getDOM();
                that.evObj = evt.srcElement || evt.target;
                that.inpE = config.id ? $(config.id)[0] : that.evObj;
                if (!config.btnBar) DOM.foot[0].style.display = "none"; else DOM.foot[0].style.display = "";
                if (config.minDate) config.minDate = convertDate(config.minDate, config.targetFormat, config.noToday ? 1 : 0);
                if (config.maxDate) config.maxDate = convertDate(config.maxDate, config.targetFormat, config.noToday ? -1 : 0);
                inpVal = $.trim(that.inpE.value);
                if (inpVal.length > 0) date = getDate(inpVal, config.format); else date = new Date();
                DOM.hour[0].value = (date.getHours() + "").replace(addzero, "0$1");
                DOM.minute[0].value = (date.getMinutes() + "").replace(addzero, "0$1");
                DOM.second[0].value = (date.getSeconds() + "").replace(addzero, "0$1");
                $("input", DOM.foot[0]).attr({
                    disabled: config.format.indexOf("H") >= 0 ? false : true
                });
                that._draw(date).show()._offset(that.evObj);
                _ie6 && $("#lhgcal_frm").css({
                    height: DOM.wrap[0].offsetHeight + "px"
                });
                if (!_box) {
                    DOM.wrap[0].style.width = DOM.wrap[0].offsetWidth + "px";
                    that._addEvent();
                    _box = that;
                }
                return that;
            },
            _draw: function(date, day) {
                var that = this, DOM = that.DOM, firstDay, befMonth, curMonth, arrDate = [], inpYear, inpMonth, opt = that.config, frag, row, cell, n = 0, curDateStr;
                that.year = inpYear = date.getFullYear();
                that.month = inpMonth = date.getMonth() + 1;
                that.day = day || date.getDate();
                DOM.iy[0].value = inpYear;
                DOM.im[0].value = inpMonth;
                firstDay = new Date(inpYear, inpMonth - 1, 1).getDay();
                befMonth = new Date(inpYear, inpMonth - 1, 0).getDate();
                curMonth = new Date(inpYear, inpMonth, 0).getDate();
                for (var i = 0; i < firstDay; i++) {
                    arrDate.push(befMonth);
                    befMonth--;
                }
                arrDate.reverse();
                for (var i = 1; i <= curMonth; i++) arrDate.push(i);
                for (var i = 1; i <= 42 - curMonth - firstDay; i++) arrDate.push(i);
                frag = document.createDocumentFragment();
                for (var i = 0; i < 6; i++) {
                    row = document.createElement("tr");
                    for (var j = 0; j < 7; j++) {
                        cell = document.createElement("td");
                        curDateStr = (inpYear + "-" + inpMonth + "-" + arrDate[n]).replace(addzero, "0$1");
                        if (n < firstDay || n >= curMonth + firstDay || opt.minDate && opt.minDate > curDateStr || opt.maxDate && opt.maxDate < curDateStr || opt.disWeek && opt.disWeek.indexOf(j) >= 0) {
                            that._setCell(cell, arrDate[n]);
                        } else if (opt.disDate) {
                            for (var m = 0, l = opt.disDate.length; m < l; m++) {
                                if (/%/.test(opt.disDate[m])) opt.disDate[m] = convertDate(opt.disDate[m]);
                                var regex = new RegExp(opt.disDate[m]), tmpre = opt.enDate ? !regex.test(curDateStr) : regex.test(curDateStr);
                                if (tmpre) break;
                            }
                            if (tmpre) that._setCell(cell, arrDate[n]); else that._setCell(cell, arrDate[n], true);
                        } else that._setCell(cell, arrDate[n], true);
                        row.appendChild(cell);
                        n++;
                    }
                    frag.appendChild(row);
                }
                while (DOM.db[0].firstChild) DOM.db[0].removeChild(DOM.db[0].firstChild);
                DOM.db[0].appendChild(frag);
                return that;
            },
            _setCell: function(cell, num, enabled) {
                if (enabled) {
                    cell.innerHTML = '<a href="javascript:void(0);">' + num + "</a>";
                    cell.firstChild[expando + "D"] = num + "";
                    if (num === this.day) $(cell).addClass("cui_today");
                } else cell.innerHTML = num + "";
            },
            _drawList: function(val, arr) {
                var DOM = this.DOM, row, cell, frag = document.createDocumentFragment();
                for (var i = 0; i < 4; i++) {
                    row = document.createElement("tr");
                    for (var j = 0; j < 3; j++) {
                        cell = document.createElement("td");
                        cell.innerHTML = '<a href="javascript:void(0);">' + (arr ? arr[val] : val) + "</a>";
                        row.appendChild(cell);
                        if (arr) cell.firstChild[expando + "M"] = val; else cell.firstChild[expando + "Y"] = val;
                        val++;
                    }
                    frag.appendChild(row);
                }
                while (DOM.lbox[0].firstChild) DOM.lbox[0].removeChild(DOM.lbox[0].firstChild);
                DOM.lbox[0].appendChild(frag);
                return this;
            },
            _showList: function() {
                this.DOM.ymlist[0].style.display = "block";
            },
            _hideList: function() {
                this.DOM.ymlist[0].style.display = "none";
            },
            _offset: function() {
                var that = this, DOM = that.DOM, ltop, inpP = $(that.evObj).offset(), inpY = inpP.top + that.evObj.offsetHeight, ww = _$window.width(), wh = _$window.height(), dl = _$window.scrollLeft(), dt = _$window.scrollTop(), cw = DOM.wrap[0].offsetWidth, ch = DOM.wrap[0].offsetHeight;
                if (inpY + ch > wh + dt) inpY = inpP.top - ch - 2;
                if (inpP.left + cw > ww + dl) inpP.left -= cw;
                DOM.wrap.css({
                    left: inpP.left + "px",
                    top: inpY + "px"
                });
                ltop = DOM.im.offset().top + DOM.im[0].offsetHeight;
                DOM.ymlist[0].style.top = ltop - inpY + "px";
                return that;
            },
            _getDOM: function() {
                var wrap = document.createElement("div");
                wrap.style.cssText = "position:absolute;display:none;z-index:" + this.config.zIndex + ";";
                wrap.innerHTML = calendarTpl;
                var name, i = 0, DOM = {
                    wrap: $(wrap)
                }, els = wrap.getElementsByTagName("*"), len = els.length;
                for (;i < len; i++) {
                    name = els[i].className.split("cui_")[1];
                    if (name) DOM[name] = $(els[i]);
                }
                document.body.appendChild(wrap);
                return DOM;
            },
            _getEvent: function() {
                if (_ie) return window.event;
                var func = this._getEvent.caller;
                while (func != null) {
                    var arg = func.arguments[0];
                    if (arg && (arg + "").indexOf("Event") >= 0) return arg;
                    func = func.caller;
                }
                return null;
            },
            _setDate: function(day) {
                day = parseInt(day, 10);
                var that = this, opt = that.config, DOM = that.DOM, tmpDate = new Date(that.year, that.month - 1, day);
                if (opt.format.indexOf("H") >= 0) {
                    var hourVal = parseInt(DOM.hour[0].value, 10), minuteVal = parseInt(DOM.minute[0].value, 10), secondVal = parseInt(DOM.second[0].value, 10);
                    tmpDate = new Date(that.year, that.month - 1, day, hourVal, minuteVal, secondVal);
                }
                that.day = day;
                opt.onSetDate && opt.onSetDate.call(that);
                that.inpE.value = dateFormat.call(tmpDate, opt.format);
                if (opt.real) {
                    var realFormat = opt.format.indexOf("H") >= 0 ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd";
                    $(opt.real)[0].value = dateFormat.call(tmpDate, realFormat);
                }
                that.hide();
            },
            _addEvent: function() {
                var that = this, DOM = that.DOM;
                DOM.wrap.bind("click", function(evt) {
                    var target = evt.target;
                    if (target[expando + "D"]) that._setDate(target[expando + "D"]); else if (target === DOM.pm[0]) that._draw(new Date(that.year, that.month - 2), that.day); else if (target === DOM.nm[0]) that._draw(new Date(that.year, that.month), that.day); else if (target === DOM.py[0]) that._draw(new Date(that.year - 1, that.month - 1), that.day); else if (target === DOM.ny[0]) that._draw(new Date(that.year + 1, that.month - 1), that.day); else if (target === DOM.tbtn[0]) {
                        var today = new Date();
                        that.year = today.getFullYear();
                        that.month = today.getMonth() + 1;
                        that.day = today.getDate();
                        that._setDate(that.day);
                    } else if (target === DOM.dbtn[0]) {
                        var config = that.config;
                        if (config.onSetDate) {
                            that.year = "";
                            that.month = "";
                            that.day = "";
                            config.onSetDate.call(that);
                        }
                        that.inpE.value = "";
                        that.hide();
                        if (config.real) $(config.real)[0].value = "";
                    } else if (target === DOM.im[0]) {
                        var marr = [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ], x = DOM.im.offset().left - parseInt(DOM.wrap[0].style.left, 10);
                        DOM.im[0].select();
                        DOM.ybar[0].style.display = "none";
                        DOM.ymlist[0].style.left = x + "px";
                        that._drawList(0, marr)._showList();
                        return false;
                    } else if (target === DOM.iy[0]) {
                        var x = DOM.iy.offset().left - parseInt(DOM.wrap[0].style.left, 10);
                        DOM.iy[0].select();
                        DOM.ybar[0].style.display = "";
                        DOM.ymlist[0].style.left = x + "px";
                        that._drawList(that.year - 4)._showList();
                        return false;
                    } else {
                        var today = new Date(), m = DOM.im[0].value || today.getMonth() + 1, y = DOM.iy[0].value || today.getFullYear();
                        that._draw(new Date(y, m - 1), that.day);
                    }
                    that._hideList();
                    return false;
                });
                DOM.ymlist.bind("click", function(evt) {
                    var target = evt.target;
                    if (target[expando + "M"] >= 0) {
                        DOM.im[0].value = target[expando + "M"] + 1;
                        that._draw(new Date(that.year, target[expando + "M"]), that.day)._hideList();
                    } else if (target[expando + "Y"]) {
                        DOM.iy[0].value = target[expando + "Y"];
                        that._draw(new Date(target[expando + "Y"], that.month - 1), that.day)._hideList();
                    } else if (target === DOM.pybar[0]) {
                        var p = $("a", DOM.lbox[0])[0][expando + "Y"];
                        that._drawList(p - 12);
                    } else if (target === DOM.nybar[0]) {
                        var p = $("a", DOM.lbox[0])[0][expando + "Y"];
                        that._drawList(p + 12);
                    } else if (target === DOM.cybar[0]) that._hideList();
                    return false;
                });
                DOM.im.bind("keypress", isDigit);
                DOM.iy.bind("keypress", isDigit);
                DOM.hour.bind("keypress", isDigit);
                DOM.minute.bind("keypress", isDigit);
                DOM.second.bind("keypress", isDigit);
                $(document).bind("click", function(evt) {
                    if (evt.target !== that.evObj) that.hide()._hideList();
                });
            },
            show: function() {
                this.DOM.wrap[0].style.display = "block";
                return this;
            },
            hide: function() {
                this.DOM.wrap[0].style.display = "none";
                return this;
            },
            getDate: function(type) {
                var that = this, DOM = that.DOM, h = parseInt(DOM.hour[0].value, 10), m = parseInt(DOM.minute[0].value, 10), s = parseInt(DOM.second[0].value, 10);
                if (that.year === "" && that.month === "" && that.day === "") return "";
                switch (type) {
                  case "y":
                    return that.year;

                  case "M":
                    return that.month;

                  case "d":
                    return that.day;

                  case "H":
                    return h;

                  case "m":
                    return m;

                  case "s":
                    return s;

                  case "date":
                    return that.year + "-" + that.month + "-" + that.day;

                  case "dateTime":
                    return that.year + "-" + that.month + "-" + that.day + " " + h + ":" + m + ":" + s;
                }
            }
        };
        lhgcalendar.fn._init.prototype = lhgcalendar.fn;
        lhgcalendar.formatDate = function(date, format) {
            return dateFormat.call(date, format);
        };
        lhgcalendar.setting = {
            id: null,
            format: "yyyy-MM-dd",
            minDate: null,
            maxDate: null,
            btnBar: true,
            targetFormat: null,
            disWeek: null,
            onSetDate: null,
            real: null,
            disDate: null,
            enDate: false,
            zIndex: 91978,
            noToday: false,
            linkageObj: null
        };
        $.fn.calendar = function(config, event) {
            event = event || "click";
            this.bind(event, function() {
                lhgcalendar(config);
                return false;
            });
            return this;
        };
        window.lhgcalendar = $.calendar = lhgcalendar;
    })(this.jQuery || this.lhgcore, this);
});

define("wd/distpublish/widgets/dd/dd", [], function(require, exports, module) {
    function DD(config) {
        var s = this;
        /**
         * config.ddnode : node节点 拖动元素
         * config.exceptClassName : "string" 不希望发生拖动效果的元素, 主要是表单元素
         */
        s.config = config;
        s.ev = $({});
        s.config.html = $("html");
        //    s.top;
        //    s.left;
        s._bind();
    }
    $.extend(DD.prototype, {
        _bind: function() {
            var s = this, trigger = $(".closepop");
            trigger.mousedown(function(e) {
                if ($(e.target).hasClass(s.config.exceptClassName)) {
                    return true;
                }
                e.preventDefault();
                //                console.log('start');
                s.ev.trigger("start");
                s.position = s.config.ddnode.position();
                s.top = s.position.top;
                s.left = s.position.left;
                s.oldx = e.pageX;
                s.oldy = e.pageY;
                s.config.html.mousemove(function(e) {
                    s.newtop = e.pageY - s.oldy + s.top;
                    s.newleft = e.pageX - s.oldx + s.left;
                    s.config.ddnode.css({
                        top: s.newtop + "px",
                        left: s.newleft + "px"
                    });
                });
            });
            trigger.mouseup(function(e) {
                e.preventDefault();
                //                console.log('end');
                s.ev.trigger("end");
                s.config.html.unbind("mousemove");
            });
        }
    });
    module.exports = DD;
});

define("wd/distpublish/widgets/popwin/popwin.css", [], function() {
    seajs.importStyle(".J_popwin{position:absolute;z-index:9999}.J_popwin .closepop{color:#b6b6b6;padding:0 5px 0 0;line-height:20px;text-align:right;font-size:20px;background-color:#fff;cursor:move}.J_popwin .closepop b{cursor:pointer}.J_popwin .opacity{padding:5px;background-color:rgba(64,64,64,.2)}.lte8 .J_popwin .opacity{filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#22404040, endColorstr=#22404040);zoom:1}.J_popwin .popbg{background-color:#fff}.J_popwin_mask{position:absolute;z-index:9998;top:0;left:0;background-color:rgba(0,0,0,.1);text-align:center}.lte8 .J_popwin_mask{filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#10000000, endColorstr=#10000000);zoom:1}.J_popwin_mask b{display:inline-block;width:0;height:100%;vertical-align:middle}.J_popwin_mask img{display:none;vertical-align:middle}.J_popwin_alert{text-align:center}.J_popwin_alert p{color:red;margin:20px 0 0}.J_popwin_alert .close{width:70px;height:28px;border:1px solid #404040;margin:30px 0 0}.J_popwin_confirm{text-align:center}.J_popwin_confirm p{color:red;margin:20px 0 0}.J_popwin_confirm .yes,.J_popwin_confirm .no{width:70px;height:28px;border:1px solid #404040;margin:30px 5px 0}.J_popwin_loading{z-index:10000}.J_popwin_loading img{display:inline-block}");
});

/**
 * @version 1
 */
define("wd/distpublish/widgets/popwin/popwin", [ "../dd/dd" ], function(require, exports, module) {
    require("./popwin.css");
    var DD = require("../dd/dd");
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
    function PopWin(config) {
        config.wh = config.wh === undefined ? [ 300, 200 ] : config.wh;
        this.config = config;
        this.ev = $({});
    }
    $.extend(PopWin.prototype, {
        init: function() {
            this._createPop();
        },
        _createPop: function() {
            var s = this, popstr = '<div class="J_popwin">' + '<div class="opacity">' + '<div class="popbg" style="width:' + (s.config.wh[0] - 10) + "px;height:" + (s.config.wh[1] ? s.config.wh[1] - 10 + "px;" : "auto") + '">' + '<div class="closepop"><b>&times;</b></div>' + '<div class="popcontent">' + s.config.content + "</div>" + "</div>" + "</div>" + "</div>";
            s._insert(popstr);
        },
        _insert: function(domstr) {
            var s = this;
            s.node = $(domstr);
            $("body").append(s.node);
            s._position(s.node);
            s.ev.trigger("afterinsert", {
                node: s.node
            });
            s._bind(s.node);
            s._addmask();
        },
        _bind: function(wrap) {
            var s = this;
            $("b", wrap).click(function() {
                s.close();
            });
            new DD({
                ddnode: s.node,
                exceptClassName: s.config.exceptClassName
            });
        },
        _position: function(wrap) {
            var s = this, height, width = $("body").outerWidth(), scrollTop;
            if (s.config.mouse) {
                width = width - s.config.e.pageX > s.config.wh[0] ? s.config.e.pageX : width - s.config.wh[0] - 30;
                wrap.css({
                    top: s.config.e.pageY + "px",
                    left: width + "px"
                });
            } else {
                //	            console.log(wrap, wrap.height())
                console.log(s.config.wh[1]);
                var popheight = s.config.wh[1] ? s.config.wh[1] : wrap.height();
                console.log(popheight);
                height = $("body").outerHeight();
                scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
                wrap.css({
                    top: (height - popheight) / 2 - 10 + scrollTop + "px",
                    left: (width - s.config.wh[0]) / 2 + "px"
                });
            }
        },
        _addmask: function() {
            var mask = $('<div class="J_popwin_mask"><b></b><img src="http://img03.taobaocdn.com/tps/i3/T1FoJ4FkReXXaE4r73-100-35.gif" /></div>'), allheight, allwidth;
            allheight = document.documentElement.scrollHeight === undefined ? document.body.scrollHeight : document.documentElement.scrollHeight;
            allwidth = document.documentElement.scrollWidth === undefined ? document.body.scrollWidth : document.documentElement.scrollWidth;
            $(mask).css({
                width: allwidth + "px",
                height: allheight + "px"
            }).appendTo("body");
        },
        _rmmask: function() {
            $(".J_popwin_mask").remove();
        },
        close: function() {
            var s = this;
            s.node.remove();
            s._rmmask();
            s.ev.trigger("afterclose");
            return null;
        }
    });
    PopWin.alert = function(csmsg, fn, color) {
        var msg = csmsg === undefined ? "系统错误" : csmsg, color = color || "#ff0000", str = '<div class="J_popwin_alert">' + '<p style="color:' + color + '">' + msg + "</p>" + '<button type="button" class="close">确 定</button>' + "</div>", pop = new PopWin({
            content: str,
            wh: [ 200, 160 ]
        });
        pop.ev.bind("afterinsert", function(e, o) {
            $(".close", o.node).click(function() {
                pop.close();
            });
        });
        pop.ev.bind("afterclose", function(e, o) {
            fn && fn();
        });
        pop.init();
    };
    PopWin.confirm = function(csmsg, yesFn, noFn) {
        var msg = csmsg === undefined ? "确认操作" : csmsg, str = '<div class="J_popwin_confirm">' + "<p>" + msg + "</p>" + '<button type="button" class="yes">确认操作</button>' + '<button type="button" class="no">取消操作</button>' + "</div>", pop = new PopWin({
            content: str,
            wh: [ 200, 160 ]
        });
        pop.ev.bind("afterinsert", function(e, o) {
            $(".yes", o.node).click(function() {
                yesFn && yesFn();
                pop.close();
            });
            $(".no", o.node).click(function() {
                noFn && noFn();
                pop.close();
            });
        });
        pop.init();
    };
    module.exports = PopWin;
});

define("wd/distpublish/widgets/dd/dd", [], function(require, exports, module) {
    function DD(config) {
        var s = this;
        /**
         * config.ddnode : node节点 拖动元素
         * config.exceptClassName : "string" 不希望发生拖动效果的元素, 主要是表单元素
         */
        s.config = config;
        s.ev = $({});
        s.config.html = $("html");
        //    s.top;
        //    s.left;
        s._bind();
    }
    $.extend(DD.prototype, {
        _bind: function() {
            var s = this, trigger = $(".closepop");
            trigger.mousedown(function(e) {
                if ($(e.target).hasClass(s.config.exceptClassName)) {
                    return true;
                }
                e.preventDefault();
                //                console.log('start');
                s.ev.trigger("start");
                s.position = s.config.ddnode.position();
                s.top = s.position.top;
                s.left = s.position.left;
                s.oldx = e.pageX;
                s.oldy = e.pageY;
                s.config.html.mousemove(function(e) {
                    s.newtop = e.pageY - s.oldy + s.top;
                    s.newleft = e.pageX - s.oldx + s.left;
                    s.config.ddnode.css({
                        top: s.newtop + "px",
                        left: s.newleft + "px"
                    });
                });
            });
            trigger.mouseup(function(e) {
                e.preventDefault();
                //                console.log('end');
                s.ev.trigger("end");
                s.config.html.unbind("mousemove");
            });
        }
    });
    module.exports = DD;
});

/**
 * @version 1
 */
define("wd/distpublish/widgets/tabChange/tabChange", [], function(require, exports, module) {
    /*
    * o.triggers
    * o.cur
    **/
    function TabChange(o) {
        var s = this;
        s.cur = o.cur || 0;
        s.target;
        s.triggers = o.triggers;
        s.ev = {};
        s._bindClick();
    }
    $.extend(TabChange.prototype, {
        _bindClick: function() {
            var s = this;
            s.triggers.eq(s.cur).addClass("cur");
            s.triggers.click(function(e) {
                s._clickOp(e, s);
            });
        },
        _clickOp: function(e, s) {
            var dom = e.target, fireObj = {};
            s.triggers.each(function(i) {
                if (dom === s.triggers[i]) {
                    s.target = i;
                    return false;
                }
            });
            if (s.target === s.cur) return;
            $(s.triggers.get(s.target)).addClass("cur");
            $(s.triggers.get(s.cur)).removeClass("cur");
            fireObj.oldIndex = s.cur;
            s.cur = s.target;
            fireObj.index = s.cur;
            $(s.ev).trigger("fireChange", fireObj);
        }
    });
    exports.TabChange = TabChange;
});

/**
 * @version 1
 */
define("wd/distpublish/widgets/upload/upload", [], function(require, exports, module) {
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
        _form: function() {
            var s = this, time = "i" + (new Date() - 0), iframe = $('<iframe id="' + time + '" name="' + time + '" src="about:blank" style="display:none"></iframe>'), _config = {
                enctype: "application/x-www-form-urlencoded",
                method: "get",
                action: "",
                error: "./TEMPLATE.html"
            };
            _config = $.extend(_config, s.config);
            //			console.log(_config);
            s.config.form.attr("target", time);
            s.config.form.attr("method", _config.method);
            s.config.form.attr("action", _config.action);
            s.config.form.attr("enctype", _config.enctype);
            iframe.appendTo("body");
            iframe.on("load", function() {
                var doc, bodyNode, bodyStr, data;
                try {
                    doc = iframe[0].contentWindow.document;
                } catch (e) {
                    alert("环境错误, 请联系开发同学");
                }
                if (doc) {
                    bodyNode = $("body", doc);
                    bodyStr = bodyNode.html();
                    try {
                        data = JSON.parse(bodyStr);
                    } catch (e) {
                        data = {
                            msg: "返回的数据是非json的"
                        };
                    }
                    if (bodyNode.attr("data-error") === "true") {
                        seajs.use("popwin", function(P) {
                            var pop = new P({
                                wh: [ 400, 200 ],
                                mouse: false,
                                content: '<div style="margin: 0 0 0 10px"><h2 style="color: #ff0000;">出错啦~!</h2><textarea style="width: 360px; height: 120px;">' + data.msg + '</textarea><button type="button">发送错误报告</button>'
                            });
                            pop.ev.bind("afterinsert", function(e, o) {
                                $("button", o.node).click(function() {
                                    $.ajax(_config.error, {
                                        dataType: "json",
                                        type: "POST",
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

/*@version 0-1-0*/
define("wd/distpublish/widgets/ejs/ejs_production", [], function(require, exports, module) {
    (function() {
        var rsplit = function(string, regex) {
            var result = regex.exec(string), retArr = new Array(), first_idx, last_idx, first_bit;
            while (result != null) {
                first_idx = result.index;
                last_idx = regex.lastIndex;
                if (first_idx != 0) {
                    first_bit = string.substring(0, first_idx);
                    retArr.push(string.substring(0, first_idx));
                    string = string.slice(first_idx);
                }
                retArr.push(result[0]);
                string = string.slice(result[0].length);
                result = regex.exec(string);
            }
            if (!string == "") {
                retArr.push(string);
            }
            return retArr;
        }, chop = function(string) {
            return string.substr(0, string.length - 1);
        }, extend = function(d, s) {
            for (var n in s) {
                if (s.hasOwnProperty(n)) {
                    d[n] = s[n];
                }
            }
        };
        EJS = function(options) {
            options = typeof options == "string" ? {
                view: options
            } : options;
            this.set_options(options);
            if (options.precompiled) {
                this.template = {};
                this.template.process = options.precompiled;
                EJS.update(this.name, this);
                return;
            }
            if (options.element) {
                if (typeof options.element == "string") {
                    var name = options.element;
                    options.element = document.getElementById(options.element);
                    if (options.element == null) {
                        throw name + "does not exist!";
                    }
                }
                if (options.element.value) {
                    this.text = options.element.value;
                } else {
                    this.text = options.element.innerHTML;
                }
                this.name = options.element.id;
                this.type = "[";
            } else {
                if (options.url) {
                    options.url = EJS.endExt(options.url, this.extMatch);
                    this.name = this.name ? this.name : options.url;
                    var url = options.url;
                    var template = EJS.get(this.name, this.cache);
                    if (template) {
                        return template;
                    }
                    if (template == EJS.INVALID_PATH) {
                        return null;
                    }
                    try {
                        this.text = EJS.request(url + (this.cache ? "" : "?" + Math.random()));
                    } catch (e) {}
                    if (this.text == null) {
                        throw {
                            type: "EJS",
                            message: "There is no template at " + url
                        };
                    }
                }
            }
            var template = new EJS.Compiler(this.text, this.type);
            template.compile(options, this.name);
            EJS.update(this.name, this);
            this.template = template;
        };
        EJS.prototype = {
            render: function(object, extra_helpers) {
                object = object || {};
                this._extra_helpers = extra_helpers;
                var v = new EJS.Helpers(object, extra_helpers || {});
                return this.template.process.call(object, object, v);
            },
            update: function(element, options) {
                if (typeof element == "string") {
                    element = document.getElementById(element);
                }
                if (options == null) {
                    _template = this;
                    return function(object) {
                        EJS.prototype.update.call(_template, element, object);
                    };
                }
                if (typeof options == "string") {
                    params = {};
                    params.url = options;
                    _template = this;
                    params.onComplete = function(request) {
                        var object = eval(request.responseText);
                        EJS.prototype.update.call(_template, element, object);
                    };
                    EJS.ajax_request(params);
                } else {
                    element.innerHTML = this.render(options);
                }
            },
            out: function() {
                return this.template.out;
            },
            set_options: function(options) {
                this.type = options.type || EJS.type;
                this.cache = options.cache != null ? options.cache : EJS.cache;
                this.text = options.text || null;
                this.name = options.name || null;
                this.ext = options.ext || EJS.ext;
                this.extMatch = new RegExp(this.ext.replace(/\./, "."));
            }
        };
        EJS.endExt = function(path, match) {
            if (!path) {
                return null;
            }
            match.lastIndex = 0;
            return path + (match.test(path) ? "" : this.ext);
        };
        EJS.Scanner = function(source, left, right) {
            extend(this, {
                left_delimiter: left + "%",
                right_delimiter: "%" + right,
                double_left: left + "%%",
                double_right: "%%" + right,
                left_equal: left + "%=",
                left_comment: left + "%#"
            });
            this.SplitRegexp = left == "[" ? /(\[%%)|(%%\])|(\[%=)|(\[%#)|(\[%)|(%\]\n)|(%\])|(\n)/ : new RegExp("(" + this.double_left + ")|(%%" + this.double_right + ")|(" + this.left_equal + ")|(" + this.left_comment + ")|(" + this.left_delimiter + ")|(" + this.right_delimiter + "\n)|(" + this.right_delimiter + ")|(\n)");
            this.source = source;
            this.stag = null;
            this.lines = 0;
        };
        EJS.Scanner.to_text = function(input) {
            if (input == null || input === undefined) {
                return "";
            }
            if (input instanceof Date) {
                return input.toDateString();
            }
            if (input.toString) {
                return input.toString();
            }
            return "";
        };
        EJS.Scanner.prototype = {
            scan: function(block) {
                scanline = this.scanline;
                regex = this.SplitRegexp;
                if (!this.source == "") {
                    var source_split = rsplit(this.source, /\n/);
                    for (var i = 0; i < source_split.length; i++) {
                        var item = source_split[i];
                        this.scanline(item, regex, block);
                    }
                }
            },
            scanline: function(line, regex, block) {
                this.lines++;
                var line_split = rsplit(line, regex);
                for (var i = 0; i < line_split.length; i++) {
                    var token = line_split[i];
                    if (token != null) {
                        try {
                            block(token, this);
                        } catch (e) {
                            throw {
                                type: "EJS.Scanner",
                                line: this.lines
                            };
                        }
                    }
                }
            }
        };
        EJS.Buffer = function(pre_cmd, post_cmd) {
            this.line = new Array();
            this.script = "";
            this.pre_cmd = pre_cmd;
            this.post_cmd = post_cmd;
            for (var i = 0; i < this.pre_cmd.length; i++) {
                this.push(pre_cmd[i]);
            }
        };
        EJS.Buffer.prototype = {
            push: function(cmd) {
                this.line.push(cmd);
            },
            cr: function() {
                this.script = this.script + this.line.join("; ");
                this.line = new Array();
                this.script = this.script + "\n";
            },
            close: function() {
                if (this.line.length > 0) {
                    for (var i = 0; i < this.post_cmd.length; i++) {
                        this.push(pre_cmd[i]);
                    }
                    this.script = this.script + this.line.join("; ");
                    line = null;
                }
            }
        };
        EJS.Compiler = function(source, left) {
            this.pre_cmd = [ "var ___ViewO = [];" ];
            this.post_cmd = new Array();
            this.source = " ";
            if (source != null) {
                if (typeof source == "string") {
                    source = source.replace(/\r\n/g, "\n");
                    source = source.replace(/\r/g, "\n");
                    this.source = source;
                } else {
                    if (source.innerHTML) {
                        this.source = source.innerHTML;
                    }
                }
                if (typeof this.source != "string") {
                    this.source = "";
                }
            }
            left = left || "<";
            var right = ">";
            switch (left) {
              case "[":
                right = "]";
                break;

              case "<":
                break;

              default:
                throw left + " is not a supported deliminator";
                break;
            }
            this.scanner = new EJS.Scanner(this.source, left, right);
            this.out = "";
        };
        EJS.Compiler.prototype = {
            compile: function(options, name) {
                options = options || {};
                this.out = "";
                var put_cmd = "___ViewO.push(";
                var insert_cmd = put_cmd;
                var buff = new EJS.Buffer(this.pre_cmd, this.post_cmd);
                var content = "";
                var clean = function(content) {
                    content = content.replace(/\\/g, "\\\\");
                    content = content.replace(/\n/g, "\\n");
                    content = content.replace(/"/g, '\\"');
                    return content;
                };
                this.scanner.scan(function(token, scanner) {
                    if (scanner.stag == null) {
                        switch (token) {
                          case "\n":
                            content = content + "\n";
                            buff.push(put_cmd + '"' + clean(content) + '");');
                            buff.cr();
                            content = "";
                            break;

                          case scanner.left_delimiter:
                          case scanner.left_equal:
                          case scanner.left_comment:
                            scanner.stag = token;
                            if (content.length > 0) {
                                buff.push(put_cmd + '"' + clean(content) + '")');
                            }
                            content = "";
                            break;

                          case scanner.double_left:
                            content = content + scanner.left_delimiter;
                            break;

                          default:
                            content = content + token;
                            break;
                        }
                    } else {
                        switch (token) {
                          case scanner.right_delimiter:
                            switch (scanner.stag) {
                              case scanner.left_delimiter:
                                if (content[content.length - 1] == "\n") {
                                    content = chop(content);
                                    buff.push(content);
                                    buff.cr();
                                } else {
                                    buff.push(content);
                                }
                                break;

                              case scanner.left_equal:
                                buff.push(insert_cmd + "(EJS.Scanner.to_text(" + content + ")))");
                                break;
                            }
                            scanner.stag = null;
                            content = "";
                            break;

                          case scanner.double_right:
                            content = content + scanner.right_delimiter;
                            break;

                          default:
                            content = content + token;
                            break;
                        }
                    }
                });
                if (content.length > 0) {
                    buff.push(put_cmd + '"' + clean(content) + '")');
                }
                buff.close();
                this.out = buff.script + ";";
                var to_be_evaled = "/*" + name + "*/this.process = function(_CONTEXT,_VIEW) { try { with(_VIEW) { with (_CONTEXT) {" + this.out + " return ___ViewO.join('');}}}catch(e){e.lineNumber=null;throw e;}};";
                try {
                    eval(to_be_evaled);
                } catch (e) {
                    if (typeof JSLINT != "undefined") {
                        JSLINT(this.out);
                        for (var i = 0; i < JSLINT.errors.length; i++) {
                            var error = JSLINT.errors[i];
                            if (error.reason != "Unnecessary semicolon.") {
                                error.line++;
                                var e = new Error();
                                e.lineNumber = error.line;
                                e.message = error.reason;
                                if (options.view) {
                                    e.fileName = options.view;
                                }
                                throw e;
                            }
                        }
                    } else {
                        throw e;
                    }
                }
            }
        };
        EJS.config = function(options) {
            EJS.cache = options.cache != null ? options.cache : EJS.cache;
            EJS.type = options.type != null ? options.type : EJS.type;
            EJS.ext = options.ext != null ? options.ext : EJS.ext;
            var templates_directory = EJS.templates_directory || {};
            EJS.templates_directory = templates_directory;
            EJS.get = function(path, cache) {
                if (cache == false) {
                    return null;
                }
                if (templates_directory[path]) {
                    return templates_directory[path];
                }
                return null;
            };
            EJS.update = function(path, template) {
                if (path == null) {
                    return;
                }
                templates_directory[path] = template;
            };
            EJS.INVALID_PATH = -1;
        };
        EJS.config({
            cache: true,
            type: "<",
            ext: ".ejs"
        });
        EJS.Helpers = function(data, extras) {
            this._data = data;
            this._extras = extras;
            extend(this, extras);
        };
        EJS.Helpers.prototype = {
            view: function(options, data, helpers) {
                if (!helpers) {
                    helpers = this._extras;
                }
                if (!data) {
                    data = this._data;
                }
                return new EJS(options).render(data, helpers);
            },
            to_text: function(input, null_text) {
                if (input == null || input === undefined) {
                    return null_text || "";
                }
                if (input instanceof Date) {
                    return input.toDateString();
                }
                if (input.toString) {
                    return input.toString().replace(/\n/g, "<br />").replace(/''/g, "'");
                }
                return "";
            }
        };
        EJS.newRequest = function() {
            var factories = [ function() {
                return new ActiveXObject("Msxml2.XMLHTTP");
            }, function() {
                return new XMLHttpRequest();
            }, function() {
                return new ActiveXObject("Microsoft.XMLHTTP");
            } ];
            for (var i = 0; i < factories.length; i++) {
                try {
                    var request = factories[i]();
                    if (request != null) {
                        return request;
                    }
                } catch (e) {
                    continue;
                }
            }
        };
        EJS.request = function(path) {
            var request = new EJS.newRequest();
            request.open("GET", path, false);
            try {
                request.send(null);
            } catch (e) {
                return null;
            }
            if (request.status == 404 || request.status == 2 || request.status == 0 && request.responseText == "") {
                return null;
            }
            return request.responseText;
        };
        EJS.ajax_request = function(params) {
            params.method = params.method ? params.method : "GET";
            var request = new EJS.newRequest();
            request.onreadystatechange = function() {
                if (request.readyState == 4) {
                    if (request.status == 200) {
                        params.onComplete(request);
                    } else {
                        params.onComplete(request);
                    }
                }
            };
            request.open(params.method, params.url);
            request.send(null);
        };
    })();
    EJS.Helpers.prototype.date_tag = function(C, O, A) {
        if (!(O instanceof Date)) {
            O = new Date();
        }
        var B = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        var G = [], D = [], P = [];
        var J = O.getFullYear();
        var H = O.getMonth();
        var N = O.getDate();
        for (var M = J - 15; M < J + 15; M++) {
            G.push({
                value: M,
                text: M
            });
        }
        for (var E = 0; E < 12; E++) {
            D.push({
                value: E,
                text: B[E]
            });
        }
        for (var I = 0; I < 31; I++) {
            P.push({
                value: I + 1,
                text: I + 1
            });
        }
        var L = this.select_tag(C + "[year]", J, G, {
            id: C + "[year]"
        });
        var F = this.select_tag(C + "[month]", H, D, {
            id: C + "[month]"
        });
        var K = this.select_tag(C + "[day]", N, P, {
            id: C + "[day]"
        });
        return L + F + K;
    };
    EJS.Helpers.prototype.form_tag = function(B, A) {
        A = A || {};
        A.action = B;
        if (A.multipart == true) {
            A.method = "post";
            A.enctype = "multipart/form-data";
        }
        return this.start_tag_for("form", A);
    };
    EJS.Helpers.prototype.form_tag_end = function() {
        return this.tag_end("form");
    };
    EJS.Helpers.prototype.hidden_field_tag = function(A, C, B) {
        return this.input_field_tag(A, C, "hidden", B);
    };
    EJS.Helpers.prototype.input_field_tag = function(A, D, C, B) {
        B = B || {};
        B.id = B.id || A;
        B.value = D || "";
        B.type = C || "text";
        B.name = A;
        return this.single_tag_for("input", B);
    };
    EJS.Helpers.prototype.is_current_page = function(A) {
        return window.location.href == A || window.location.pathname == A ? true : false;
    };
    EJS.Helpers.prototype.link_to = function(B, A, C) {
        if (!B) {
            var B = "null";
        }
        if (!C) {
            var C = {};
        }
        if (C.confirm) {
            C.onclick = ' var ret_confirm = confirm("' + C.confirm + '"); if(!ret_confirm){ return false;} ';
            C.confirm = null;
        }
        C.href = A;
        return this.start_tag_for("a", C) + B + this.tag_end("a");
    };
    EJS.Helpers.prototype.submit_link_to = function(B, A, C) {
        if (!B) {
            var B = "null";
        }
        if (!C) {
            var C = {};
        }
        C.onclick = C.onclick || "";
        if (C.confirm) {
            C.onclick = ' var ret_confirm = confirm("' + C.confirm + '"); if(!ret_confirm){ return false;} ';
            C.confirm = null;
        }
        C.value = B;
        C.type = "submit";
        C.onclick = C.onclick + (A ? this.url_for(A) : "") + "return false;";
        return this.start_tag_for("input", C);
    };
    EJS.Helpers.prototype.link_to_if = function(F, B, A, D, C, E) {
        return this.link_to_unless(F == false, B, A, D, C, E);
    };
    EJS.Helpers.prototype.link_to_unless = function(E, B, A, C, D) {
        C = C || {};
        if (E) {
            if (D && typeof D == "function") {
                return D(B, A, C, D);
            } else {
                return B;
            }
        } else {
            return this.link_to(B, A, C);
        }
    };
    EJS.Helpers.prototype.link_to_unless_current = function(B, A, C, D) {
        C = C || {};
        return this.link_to_unless(this.is_current_page(A), B, A, C, D);
    };
    EJS.Helpers.prototype.password_field_tag = function(A, C, B) {
        return this.input_field_tag(A, C, "password", B);
    };
    EJS.Helpers.prototype.select_tag = function(D, G, H, F) {
        F = F || {};
        F.id = F.id || D;
        F.value = G;
        F.name = D;
        var B = "";
        B += this.start_tag_for("select", F);
        for (var E = 0; E < H.length; E++) {
            var C = H[E];
            var A = {
                value: C.value
            };
            if (C.value == G) {
                A.selected = "selected";
            }
            B += this.start_tag_for("option", A) + C.text + this.tag_end("option");
        }
        B += this.tag_end("select");
        return B;
    };
    EJS.Helpers.prototype.single_tag_for = function(A, B) {
        return this.tag(A, B, "/>");
    };
    EJS.Helpers.prototype.start_tag_for = function(A, B) {
        return this.tag(A, B);
    };
    EJS.Helpers.prototype.submit_tag = function(A, B) {
        B = B || {};
        B.type = B.type || "submit";
        B.value = A || "Submit";
        return this.single_tag_for("input", B);
    };
    EJS.Helpers.prototype.tag = function(C, E, D) {
        if (!D) {
            var D = ">";
        }
        var B = " ";
        for (var A in E) {
            if (E[A] != null) {
                var F = E[A].toString();
            } else {
                var F = "";
            }
            if (A == "Class") {
                A = "class";
            }
            if (F.indexOf("'") != -1) {
                B += A + '="' + F + '" ';
            } else {
                B += A + "='" + F + "' ";
            }
        }
        return "<" + C + B + D;
    };
    EJS.Helpers.prototype.tag_end = function(A) {
        return "</" + A + ">";
    };
    EJS.Helpers.prototype.text_area_tag = function(A, C, B) {
        B = B || {};
        B.id = B.id || A;
        B.name = B.name || A;
        C = C || "";
        if (B.size) {
            B.cols = B.size.split("x")[0];
            B.rows = B.size.split("x")[1];
            delete B.size;
        }
        B.cols = B.cols || 50;
        B.rows = B.rows || 4;
        return this.start_tag_for("textarea", B) + C + this.tag_end("textarea");
    };
    EJS.Helpers.prototype.text_tag = EJS.Helpers.prototype.text_area_tag;
    EJS.Helpers.prototype.text_field_tag = function(A, C, B) {
        return this.input_field_tag(A, C, "text", B);
    };
    EJS.Helpers.prototype.url_for = function(A) {
        return 'window.location="' + A + '";';
    };
    EJS.Helpers.prototype.img_tag = function(B, C, A) {
        A = A || {};
        A.src = B;
        A.alt = C;
        return this.single_tag_for("img", A);
    };
});
