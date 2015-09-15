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