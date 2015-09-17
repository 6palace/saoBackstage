(function(){
	var A = $.NM('card_control', 'main');

	A.main.init = function(){
		addCard();
	};

	function addCard(){
		var addBtn = $('.m-card-control .J_add');

		function addFn(e){
			console.log("what");
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


							upload(form);

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

							function resetFn() {
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

	//上传卡片
	function upload(){
		//TODO
	}

	

})();