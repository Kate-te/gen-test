;(function(factory){
  
  if (typeof define === 'function' && define.amd) {
      define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
      module.exports = factory(require('jquery'));
  } else {
      factory(jQuery);
  }

})(function($){
  
  var Carousel = (function(element, settings){

    /*
     * Конструктор для Carousel
     *
     */
    function _Carousel(element, settings){
      this.defaults = {
        //infinite: true,
        //slidesVisible: 1,
        //slidesToScroll: 1,
        //arrows: true,
        //swipeAble: true,
        pagination: true,
        //autoplay: true,
        slideDuration: '1000',
        autoplaySpeed: 5000

      };
      // Свойства по умолчанию
      this.settings = $.extend({},this,this.defaults,settings);
      
      // Значения которые будут изменены в процессе работы плагина
      this.initials = {
        index : 0,
        $index: null,
        totalSlides : false,
        csstransitions: false
      };
      
      $.extend(this,this.initials);
      
      this.$el = $(element);
      
      this.changeSlide = $.proxy(this.changeSlide,this);
      
      this.init();
      
    }
    
    return _Carousel;
  
  })();
  
    Carousel.prototype.init = function(){
    this.addPagination();
    this.addEvents();
    this.activatePagination();
    this.initTimer();
   };
	
	/*
	 * Создаем ссылки на пагинцию
	 *
	 */ 
    Carousel.prototype.addPagination = function(){
        var dots = this.$el.find('.connect__dots');
		this.totalSlides = this.$el.find('.js-slide').length;
        for(var i = 0; i < this.totalSlides; i++) {
            var dot = document.createElement('li');
            dot.className = 'connect__dot';
            dots.append(dot);
        }
	};
	
	/*
	 * Активируем ссылку на index
	 *
	 */ 
	Carousel.prototype.activatePagination = function(){
		this.$index = this.$el.find('.js-slide').eq(0);
		this.$el.find('.connect__dots li').eq(0).addClass('active');
	};
	
	/*
	 * Создаем ивент на нажатие кнопок пагинации
	 *
	 */ 
	Carousel.prototype.addEvents = function(){
		$('body')
			.on('click','.connect__dots li',this.changeSlide);
	};
	
	/*
	 * Таймер
	 *
	 */ 
	Carousel.prototype.clearTimer = function(){
		if (this.timer) clearInterval(this.timer);
	};
	
	Carousel.prototype.initTimer = function(){
		this.timer = setInterval(this.changeSlide, this.settings.slideDuration);
	};
	
	Carousel.prototype.startTimer = function(){
		this.initTimer();
		this.throttle = false;
	};
	
	/*
	 * Смена слайда
	 *
	 */ 
	Carousel.prototype.changeSlide = function(e){
		
		if (this.throttle) return;
		this.throttle = true;
		
		this.clearTimer();
		
        // Направление
		var direction = this._direction(e);
		
		// Выбираем следующий слайд
		var animate = this._next(e,direction);
		if (!animate) return;
		
		// Активируем следующий слайд
		var $nextSlide = this.$el.find('.js-slide').eq(this.index).addClass(direction + ' active').fadeIn(1000);
		
        this._animation($nextSlide,direction);
		
	};
	
	/*
	 * Направление
	 *
	 */ 
	Carousel.prototype._direction = function(e){
		var direction;
		
		if (typeof e !== 'undefined'){
			direction = (typeof e.data === 'undefined' ? 'right' : e.data.direction);
		} else {
			direction = 'right';
		}
		return direction;
	};
	
	Carousel.prototype._next = function(e,direction){
		
    // If the event was triggered by a slide indicator, we store the data-index value of that indicator
		var index = (typeof e !== 'undefined' ? $(e.currentTarget).index() : undefined);
		
		//Logic for determining the next slide
	    switch(true){
			//If the event was triggered by an indicator, we set the next slide based on index
       case( typeof index !== 'undefined'):
				if (this.index == index){
					this.startTimer();
					return false;
				} 
				this.index = index;
			break;
			case(direction == 'right' && this.index < (this.totalSlides - 1)):
				this.index++;
			break;
			case(direction == 'right'):
				this.index = 0;
			break;
			case(direction == 'left' && this.index === 0):
				this.index = (this.totalSlides - 1);
			break;
			case(direction == 'left'):
				this.index--;
			break;
		}
		return true;
	};
	
	/*
	 * Прячем слайд
	 *
	 */ 
    Carousel.prototype._animation = function($nextSlide,direction){
        this.$index.removeClass('active').fadeOut(0);
        this.$index = $nextSlide.removeClass(direction);
        this._updatePagination();
        this.startTimer();
	};
	
	Carousel.prototype._updatePagination = function(){
		this.$el.find('.connect__dots li').removeClass('active').eq(this.index).addClass('active');
	};
	
	$.fn.Carousel = function(options){
    
    return this.each(function(index,el){
      
      el.Carousel = new Carousel(el,options);
      
    });
    
  };
  

});


/*
* Кастомные параметры
*
*/ 
var args = {
	autoplaySpeed : 1000, 
	slideDuration : 2000 
};

$('.connect__main').Carousel(args);