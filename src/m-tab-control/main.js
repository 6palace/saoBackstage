(function(){
	var A = $.NM('tab_control', 'main');

	A.main.init = function(){
		addTab();
		tableEv();
	};

	function addTab(){
		var addBtn = $('.m-tab-control .J_add');

		function addFn(e){
			$.ajax(A.main.config.ajax.getAdd, {
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
							var reset = $('.J_reset', node.node),
								submit = $('.J_submit', node.node),
								form = $('form', node.node);


							//TODO unconfirmed interaction with server
							function submitFn() {
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

							submit.on('click', submitFn);

							function resetFn(e){
								e.preventDefault();
								form[0].reset();
							}

							reset.on('click', resetFn);
						});
						pop.init();
					})
				}
			});
		}

		addBtn.on('click', addFn);
	}

	function tableEv(){
		var table = $('.m-tab-control table');
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

	//修改存在
	function fixFn(table, node){
		var tr = node.parent().parent(),
			id = tr.attr('data-id') || 'no id for entry';
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
			id = tr.attr('data-id') || "no id for entry";
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