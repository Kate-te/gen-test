//= nouislider.js
//--------------------------------AGE SLIDER----------------------------------------
var slider = document.getElementById('slider');

noUiSlider.create(slider, {
	start: [18, 23],
	connect: true,
	range: {
		'min': 18,
		'max': 35
	}
});

var minAge = 18;
var maxAge = 35;
var mouseDown = false;

$( ".noUi-handle-lower" )
.mousedown( function(){
	mouseDown = true;
})
.mousemove( function(){
	if(mouseDown){
		$( ".minAge" )
		.html(Math.round(parseInt(document.getElementsByClassName('noUi-origin')[0].style.left)*(maxAge-minAge)/100 +18));
	}
})
.mouseup( function(){
	mouseDown = false;
});


$( ".noUi-handle-upper" )
.mousedown( function(){
	mouseDown = true;
})
.mousemove( function(){
	if(mouseDown){
		$( ".maxAge" )
		.html(Math.round(parseInt(document.getElementsByClassName('noUi-origin')[1].style.left)*(maxAge-minAge)/100 +18));
	}
})
.mouseup( function(){
	mouseDown = false;
});

$( ".noUi-handle-lower" ).html("<div class='minAge'>"+ minAge +"</div>" );
$( ".noUi-handle-upper" ).after("<div class='maxAge'>"+ 23 +"</div>" );

//----------------------------------------SHOW MORE FORM--------------------------------------------
var details = false;
$(".search__form-more").click(function(){
	details = !details;
	showOrHide();
});

function showOrHide(){
	if(details){
		document.getElementsByClassName('search__form-more')[0].innerHTML= 
		'<div class="hidden">Больше деталей</div><div class="hide flex"><hr><a class="hide_text flex">Скрыть<i class="fa fa-angle-up bold" aria-hidden="true"></i></a><hr></div>';
	}else{
		document.getElementsByClassName('search__form-more')[0].innerHTML= 
		'<div class="show-more flex"><hr><a class="show-more_text">Расширеный поиск<i class="fa fa-angle-down bold" aria-hidden="true"></i></a><hr></div>';
	}
};

//----------------------------------------FILTER ACTIVE---------------------------------------------------

$(".filter-list_item").click(function(e){
	$(".active").toggleClass("active");	
	$(e.target).toggleClass("active");
});

//-------------------------------------------ONLINE-----------------------------------------------------

$('.online').after('<i class="fa fa-circle" aria-hidden="true"></i>');

//-------------------------------------------PAGE ACTIVE-------------------------------------------------

$(".page").click(function(e){
	$(".active-page").toggleClass("active-page");	
	$(e.target).toggleClass("active-page");
});

//-------------------------------------------CITY PICKER-------------------------------------------------

$('#city-picker').keypress(function(e) {
    if(e.which == 13) {
		event.preventDefault();		
		$(".cities").append("<div class='city'>"+e.target.value+"<i class='fa fa-times del-city' aria-hidden='true'></i></div>");
		e.target.value = '';
    }
});

//---------REMOVE CITY---------------

$('.del-city').click(function(e){
	alert($(e.target).parent(".city"));
	$(e.target).parent(".city").remove();
});

//----------------------------------------