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
							var reset = $('.J_reset', node.node),
								submit = $('.J_submit', node.node),
								form = $('form', node.node),
								deleteKey = $(".J_delete_json", node.node);

							//TODO unconfirmed interaction with server
							function submitFn() {
								e.preventDefault();

								var contentWrap = form.find('.contentWrap');
								var jsonCombine = $(document.createElement('textarea')).attr('name', 'Contents').html(jsonConvert(contentWrap)).hide();
								contentWrap.find('input, textarea, select, radio').attr('name', "");
								jsonCombine.appendTo(form);

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

							$(".J_add_json").on('click', jsonKeyFn);
							deleteKey.on('click', deleteKeyFn);
							submit.on('click', submitFn);

							function resetFn() {
								e.preventDefault();
								$(".J_json_fill .show_json").html("");
								form[0].reset();
							}

							reset.on('click', resetFn);
						});
						pop.init();
					});
				}
			 });
		});
	}

	function tableEv(){
		var table = $('.m-rule-control table');
		table.on('click', tableFn);
		function tableFn(e) {
			var node = $(e.target);
			if (node.hasClass('fix')) {
				fixFn(table, node);
			} else if (node.hasClass('unpublish')) {
				delFn(table, node);
			}
		}
	}

	function fixFn(table, node){
		var tr = node.parent().parent(),
		id = tr.find(':first-child').html();
		console.log(id);
		$.ajax(A.main.config.ajax.getAdd, {
			dataType: 'html',
			method: 'get',
			data: {
				id: id
			},
			success: function (data) {
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
						deleteKey = $(".J_delete_json", node.node);

						//what about id?
						function submitFn() {
							e.preventDefault();

							var contentWrap = form.find('.contentWrap');
							var jsonCombine = $(document.createElement('textarea')).attr('name', 'Contents').html(jsonConvert(contentWrap)).hide();
							contentWrap.find('input, textarea, select, radio').attr('name', "");

							//id field only exists for modify, let server supply information
							var idField = $('<input type="text" name="data-id" value=' + id + "/>");

							jsonCombine.appendTo(form);
							idField.appendTo(form);

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

						$(".J_add_json").on('click', jsonKeyFn);
						deleteKey.on('click', deleteKeyFn);
						submit.on('click', submitFn);

						reset.attr("disabled", true);
					});
					pop.init();
				});

			}
		});
	}


	function jsonConvert(form){
		var res = {};
		form.find("select").each(function(){
			if($(this).attr("multiple") == "multiple"){
				var sel = $(this).attr("name");
				res[sel] = {};
				$(this).children().each(function(){
					var keyValPair = this.innerHTML.split(':');
					console.log(keyValPair);

					res[sel][keyValPair[0] + ''] = '' + keyValPair[1];
				});
			} else{
				res[this.name] = $(this).find(":selected").val();
			}
		});
		form.find("input[type='text']").each(function(){
			$(this).attr('name') ? res[$(this).attr('name')] = $(this).val() : 0 ;
		});
		form.find("input[type='radio']:checked").each(function(){
				res[$(this).attr('name')] = this.value;
		});
		form.find("textarea").each(function(){
			res[this.name] = this.value;
		})
		console.log(JSON.stringify(res));
		return JSON.stringify(res);
	}

	function jsonKeyFn(e) {
		e.preventDefault();
		var source = $(e.target).parent();
		var key = source.find(".json_key").val();
		var val = source.find(".json_value").val();
		source.find(".json_key, .json_value").val('');
		source.parent().find(".show_json").append("<option selected>" + key + ":" + val + "</option>");

	}


	function deleteKeyFn(e){
		e.preventDefault();
		console.log("deleteKey");
		var delTarget = $(this).attr("action");
		$("select[name*='" + delTarget + "']").find("option:selected").each(function(){
			console.log(this);
			$(this).remove();
		});
	}

	function delFn(table, node){
		var tr = node.parent().parent(),
		id = tr.find(':first-child').html();

		$.ajax(A.main.config.ajax.delete, {
			dataType: 'json',
			data: {
				id: id
			},
			method: 'get',
			success: function (data) {
				if (data.success === true) {
					tr.remove();
				} else {
					alert(data.message)
				}
			}
		});
	}

})();