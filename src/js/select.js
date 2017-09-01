
		;$(function () {
			$('#header__select').select();
		});

		;$(function () {
			$('#search__select').select({options:["Политехнический институт", "Шулявская", "Берестейская", "Нивки"], listClass:"search__select_options", textClass:"search__select_text", optionsClass:"search__option"});
		});

		;$(function () {
			$('#popup__select').select({options:["Голосеевский", "Печерский", "Дарницкий", "Днепровский"], listClass:"popup__select_options", textClass:"popup__select_text", optionsClass:"popup__option"});
		});


		;(function($){

	var defaults={
		options: ["Киев", "Одесса", "Львов", "Харьков"],
		listClass: "header__select_options",
		optionsClass: "header__option",
		textClass: "header__select_text"
	};
	

	$.fn.select = function(options){

		var config = $.extend({}, defaults, options);


		this.init = function(){
			$('<span/>', {
				text: config.options[0],
				"class" : "select__text"
			}).addClass(config.textClass).appendTo(this);

			var selectList = $('<ul/>',{
				"class": "select__options"
			} ).addClass(config.listClass).appendTo(this);

			var options = config.options;

			for (var i = 0; i < options.length; i++) {
				$("<li/>", {
					text: options[i],
					"class" : "option"
				}).addClass(config.optionsClass).appendTo(selectList);
			}
		};


		this.init();

		var optionsClass = "." + config.optionsClass;
		var listClass = "." + config.listClass;
		var selectId = "#" + $(this).attr('id');
		var a=1;
		var optionText;
		var textClass = "." + config.textClass;


		$(selectId).bind("click", selectClick);
		function selectClick (event) {
			if (a === 0){
			$(listClass).css("display", "none");
			a = a+1;
			}
			else{
				$(listClass).css("display", "flex");
				a = a-1;
			}
		};


		$(optionsClass).bind("click", optionClick);
		function optionClick (event){
			optionText =  $(this).text();
			// alert(optionText);
			$(textClass).text(optionText);
		};

		return this;
	};

})(jQuery);
 