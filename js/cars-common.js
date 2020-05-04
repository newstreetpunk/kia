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

	$('#complect').select2({
		minimumResultsForSearch: Infinity // поле поиска по option's
	});

	$.getJSON('unload.json', function(data){
		$.each(data, function(k, v){

			var name = v.name;
			var img = name.match(/(\w+)/);
			var imgName = img[0].toUpperCase();

			var out = '<div class="avn__item"><div class="avn__item--img"><img class="lazyload" src="img/loading.gif" data-src="img/cars/'+imgName+'-1.png" alt="'+name+'"></div><div class="avn__item--info"><div class="avn__item--info_name"><h2>KIA '+name+'</h2></div><div class="parameter parameter-price">Стоимость: <strong>'+v.price+'&nbsp;₽</strong><s>'+v.special+'&nbsp;₽</s></div><div class="parameter">Год: <strong class="year">'+v.year+'</strong></div><div class="parameter__row"><div class="parameter">Комплектация: <strong>Classic 1.6 6AT</strong></div><div class="parameter">Двигатель: <strong>1.6 MPI 123 л.с</strong></div></div><div class="parameter__row"><div class="parameter">Привод: <strong>Передний</strong></div><div class="parameter">Трансмиссия: <strong>AT</strong></div></div></div><div class="avn__item--links"><a href="#cheaper" class="btn btn-white modal-link">Хочу дешевле</a><a href="#cheaper" class="btn modal-link">Забронировать</a><a href="#credit" class="btn modal-link btn-white credit-link">Расчитать кредит</a></div></div>';

			$('.avn__list').append(out);
		});
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
		if ($(this).scrollTop() > $(window).height()) {
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
		return false;
	});

	$('a[href="#cheaper"]').on('click', function(){
		var th = $(this);
		var text = th.text();
		$('#cheaper h2').text(text);
		return false;
	});

	$('.modal-link').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		preloader: false,
	});

	// $('input[type="tel"]').mask('8 (999) 999-99-99');

	setTimeout(function(){
		$('.lazyload').lazyload();
		$(".avn__item").animated("fadeInUp", "fadeInUp");
	}, 5000);

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

	$('.avn__filter--body form input').click(function(){
		let th = $(this);
		$('.avn__filter--reset').show();
		let val = th.val();
		$('.avn__item').each(function(){
			let year = $(this).find('.year').text();
			if (year != val) {
				$(this).hide();
			}
		});
	});

});