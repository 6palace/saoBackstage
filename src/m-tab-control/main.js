(function(){
	var A = $.NM('tab_control', 'main');

	A.main.init = function(){
		addTab();
	};

	function addTab(){
		var addBtn = $('J_popwin_tab_add');

		function addFn(e){
			$.ajax(A.main.config.ajax.getMsg, {
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
							var cancel = $('.J_reset', node.node),
								submit = $('.J_submit', node.node),
								form = $('form', node.node);


							//TODO unconfirmed interaction with server
							function submitFn() {
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

							submit.on('click', submitFn);

							function cancelFn() {
								pop.close();
							}

							cancel.on('click', cancelFn);
						});
						pop.init();
					})
				}
			});
		}

		addBtn.on('click', addFn);
	}

	//上传卡片
	function upload(){
		//TODO
	}
})();