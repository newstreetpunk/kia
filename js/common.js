$(function() {

	var $divs = $('.rand div');
	var arr = [];
	$divs.each(function(){
		arr.push($(this).detach());
	});
	arr.sort(function(a, b){
		return Math.random() - 0.5;
	});
	for (var index in arr) {
		$('.rand').append(arr[index]);
	}

	$('.player').mb_YTPlayer();


});
