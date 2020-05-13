jQuery(function($) {

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

	//E-mail Ajax Send
	$("form").submit(function() { //Change
		var th = $(this);
		var btnSubmit = th.find('button[type="submit"]');
		btnSubmit.attr("disabled", true);
		var url = window.location.href;
		var replUrl = url.replace('?', '&');
		$.ajax({
			type: "POST",
			url: "/mail.php", //Change
			data: th.serialize() +'&referer=' + replUrl
		}).done(function( data ) {
			// console.log( "success data:", data );
			setTimeout(function() {
				$.magnificPopup.close();
				$.magnificPopup.open({
					items: {
						src: (data == 'OK') ? '.thanks' : '.error',
						type: 'inline'
					}
				});
				if(data == 'OK'){
					th.trigger("reset");
				}
				btnSubmit.removeAttr("disabled");
			}, 1000);
		}).fail(function() {
			setTimeout(function() {
				$.magnificPopup.close();
				$.magnificPopup.open({
					items: {
						src: '.error',
						type: 'inline'
					}
				});
				btnSubmit.removeAttr("disabled");
			}, 1000);
		});
		return false;
	});

	$("section h2, h1, .offer-head .descr, .offer-form").animated("fadeInUp", "fadeInUp");
	$(".subtitle, .maps .dealer:nth-child(odd) .dealer-info, .model__header--img").animated("fadeInLeft", "fadeInLeft");
	$(".hero-form, .maps .dealer:nth-child(even) .dealer-info, .model__header--text").animated("fadeInRight", "fadeInRight");

	$('.top').click(function() {
		$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
	});
	$(window).scroll(function() {
		if ($(this).scrollTop() > 100) {
			$('.top').addClass("active");
		} else {
			$('.top').removeClass("active");
		};
	});

	$('a[href="#popup"]').on('click', function(){
		$('.overlay').show();
		$('.privacy-wrap').show();
		$('html').css({
			'margin-right': '17px',
			'overflow': 'hidden'
		});
		return false;
	});
	$('.overlay, .privacy-close').on('click', function(){
		$('.overlay').hide();
		$('.privacy-wrap').hide();
		$('html').removeAttr('style');
	});

	$('a[href="#credit"]').click(function(){
		var price = $(this).closest('.model__header--text').find('.real-price').text();
		var str = price.replace(/[^\d]/g, '');
		$('.contribution').find('.range').attr('max', str);
		$('.contribution').find('.range__interval-txt_max').text(str);
		try {
			input_range_init('.kia-form', '.contribution', 0, str, 10000);
		} catch (err) {};
		try {
			input_range_init('.kia-form', '.term', 0, 72, 1);
		} catch (err) {};
	});

	$('a[href="#cheaper"]').on('click', function(){
		var th = $(this);
		var text = th.text();
		$('#cheaper h2').text(text);
	});

	$('.modal-link').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		preloader: false,
	});

	$('.model__info--item h2').each(function(){
		var th = $(this);
		if (th.hasClass('active')) {
			th.next().slideDown();
		}else{
			th.next().slideUp();
		}
	});

	$('.model__info--table ul').each(function(){
		var li = $(this).find('li').lenght;
		for( var i=0; i < li; i++){
			console.log(i);
		}
	});
	
	$('.model__info--item h2').on('click', function(){
		var th = $(this);
		th.toggleClass('active');
		if (th.hasClass('active')) {
			th.next().slideDown();
		}else{
			th.next().slideUp();
		}
	});

});