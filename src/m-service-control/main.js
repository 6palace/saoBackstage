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
								reset = $(".J_reset"),
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

								//复合卡片false时，renderType是必选
								if($(".J_popwin_service_control_add input[name='combineCard']:checked").val() === "0" &&
									$(".J_popwin_service_control_add input[name='renderType']").val() == ''){
									alert("render type is required!");
								} else{
									seajs.use('upload', function (u) {
										new u.Upload({
											form: form,
											action: A.main.config.action.add,
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

								
							}

							jsonAdd.on('click', jsonKeyFn);
							protocolSelector.on('click', protocolDisplayFn);
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
		var table = $('.m-service-control table');
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
			id = tr.attr('data-id');
		$.ajax(A.main.config.ajax.getAdd, {
			data : {
				id : id,
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
							//id field only exists for modify, let server supply information
							var idField = $('<input type="text" name="data-id" value=' + id + "/>");

							idField.appendTo(form);

							seajs.use('upload', function (u) {
								new u.Upload({
									form: form,
									action: A.main.config.action.add,
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

	// 删除
	function delFn(table, node) {
		var tr = node.parent().parent(),
			id = tr.attr('data-id');
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

	//for adding json key/value inputs
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

	//for removing json key/value inputs
	function deleteKeyFn(e){
		e.preventDefault();
		var delTarget = $(this).attr("action");
		$("#" + delTarget).find("option:selected").each(function(){
			console.log(this);
			$(this).remove();
		});
	}

	//display correct protocol inputs
	function protocolDisplayFn(e){
		var sel = $(e.target).attr("value");
		var protocolForm = $(".protocolDetail");
		protocolForm.hide();
		protocolForm.filter("." + sel).show();
	}


})();