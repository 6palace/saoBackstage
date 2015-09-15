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