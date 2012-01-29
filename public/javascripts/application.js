$(document).ready(function() {
	$(".main_header").fitText(1.33);
	$(".main_subtitle").fitText(2);
	$("article.main h1").fitText(1.5);
	
	$('.carousel').carousel({
		slider: '.slider',
		slide: '.slide',
		addPagination: false,
		addNav: true,
		nextSlide: '.next',
		prevSlide: '.prev',
		speed: 300 // ms.
	});

});
