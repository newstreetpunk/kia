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

	$("section h2, h1, .offer-head .descr, .offer-form, .benefit").animated("fadeInUp", "fadeInUp");
	$(".subtitle, .maps .dealer:nth-child(odd) .dealer-info").animated("fadeInLeft", "fadeInLeft");
	$(".hero-form, .maps .dealer:nth-child(even) .dealer-info").animated("fadeInRight", "fadeInRight");

	$('.top').click(function() {
		$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
	});
	$(window).scroll(function() {
		if ($(this).scrollTop() > 100) {
			$('.top').addClass("active");
		} else {
			$('.top').removeClass("active");
		};

		filterPosition();

	});

	function filterPosition(){
		if ($(window).width() > 992) {
			if ($(this).scrollTop() > $(document).height() - 1000){
				$('.avn__filter').css({
					'position': 'absolute',
					'height': 'auto',
					'top': 'auto',
					'bottom': $('footer').height() + 100,
					'padding-bottom': 55
				});
			}else{
				$('.avn__filter').removeAttr('style');
			}
		}
	}

	$(window).on('resize', function(){
		filterPosition();
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
		var price = $(this).closest('.avn__item').find('.parameter-price strong').text();
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

	// $('input[type="tel"]').mask('8 (999) 999-99-99');		

	$('.avn__filter--title').click(function(){
		$(this).toggleClass('open').parent().next().slideToggle();
	});

	$('.avn__filter--reset').click(function(){
		$(this).hide();
		let select = $('#complect').find('option[selected="true"]').val();
		$('.select2-selection__rendered').text(select);
		$('.avn__filter--body form').trigger('reset');
		$('.avn__item').show();
	});

	$('.avn__filter--form').on('change', function(){
		let data = $(this).serialize();
		$.ajax({
			data: data,
			url: 'filter.php',
			type: 'get'
		}).done(function(res){

			let data = JSON.parse(res);

			$.each(data, function(k, v){
				$('.avn__item').hide();

				$('.avn__item').each(function(){
					dataVal = $(this).data(k);
					if (dataVal == v) {
						$(this).show();
					}
				});
			});
		});
	});

});