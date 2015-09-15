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
							var cancel = $('.J_cancel', node.node),
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

							//untested
							function jsonKeyFn(e) {
								e.preventDefault();
								var source = $(e.target).parent();
								var key = source.find(".json_key").val();
								var val = source.find(".json_value").val();
								source.parent().find(".show_json").append("<option selected>" + key + ":" + val + "</option>");

							}

							$(".J_add_json").on('click', jsonKeyFn);

							submit.on('click', submitFn);

							function cancelFn() {
								pop.close();
							}

							cancel.on('click', cancelFn);
						});
						pop.init();
					});
				}
			 });
		});
	}

	function tableEv(){

	}


})();