$(function() {

	$("section h2, .offer-head .descr, .offer-form").animated("fadeInUp", "fadeOutDown");
	$("h1, .subtitle").animated("fadeInLeft", "fadeOutLeft");
	$(".hero-form").animated("fadeInRight", "fadeOutRight");

	$('.rand').each(function(){
		var $divs = $(this).children('div');
		var arr = [];
		$divs.each(function(){
			arr.push($(this).detach());
		});
		arr.sort(function(a, b){
			return Math.random() - 0.5;
		});
		for (var index in arr) {
			$(this).append(arr[index]);
		}
	});

	if ($(window).width() > 768) {
		$('.player').mb_YTPlayer();
	}
	


});
