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

							function deleteKeyFn(e){
								e.preventDefault();
								var delTarget = $(this).attr("action");
								$("#" + delTarget).find("option:selected").each(function(){
									console.log(this);
									$(this).remove();
								});
							}

							function protocolDisplayFn(e){
								var sel = $(e.target).attr("value");
								var protocolForm = $(".protocolDetail");
								protocolForm.hide();
								protocolForm.filter("." + sel).show();
							}

							jsonAdd.on('click', jsonKeyFn);
							protocolSelector.on('click', protocolDisplayFn);
							deleteKey.on('click', deleteKeyFn);

							submit.on('click', submitFn);

							function resetFn() {
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