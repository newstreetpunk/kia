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
		$.ajax({
			type: "POST",
			url: "/kia-service/inc/mail.php", //Change
			data: th.serialize()
		}).done(function() {
			setTimeout(function() {
				$.magnificPopup.close();
				$.magnificPopup.open({
					items: {
						src: '.thanks',
						type: 'inline'
					}
				});
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	$("form").submit(function() {
		var th = $(this);
		var rq = $.ajax({
			type: 'POST',
			url: 'https://script.google.com/macros/s/AKfycbwAAys-ruP5TbG5ERYos9YS91mRiTYQwTIqrkFZZsJ-ftpAuso/exec',
			data: th.serialize(),
			dataType: 'jsonp'
		});
		rq.done(function(data) {
		//var data = JSON.stringify(data);
		console.log('success', data);
		});
		rq.fail(function(err) {
		//var err = JSON.stringify(err);
		console.log('error', err);
		});
		return false;
	});

	$("section h2, .offer-head .descr, .offer-form, .benefit").animated("fadeInUp", "fadeInUp");
	$("h1, .subtitle, .maps .dealer:nth-child(odd) .dealer-info").animated("fadeInLeft", "fadeInLeft");
	$(".hero-form, .maps .dealer:nth-child(even) .dealer-info").animated("fadeInRight", "fadeInRight");

	if ($(window).width() > 768) {
		$('.player').mb_YTPlayer();
	}

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

	$('.modal-link').magnificPopup({
		type: 'inline',
		fixedContentPos: true,
		preloader: false,
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

	$('.lazyload').lazyload();

	//при клике на заголовок ТО
	$('.services-item__title').on('click', function(){
		var th = $(this);
		var parent = th.parent();
		th.closest('.services-item').find('.services-item__car').removeClass('active');
		th.closest('.services-item').find('.serv-table').slideUp(100);

		if (parent.hasClass('active')) {
			parent.removeClass('active');
			th.closest('.services-item').find('.services-item').removeClass('active');
			th.next().slideUp(100);
		}else{
			th.closest('.services-item').find('.services-item').removeClass('active');
			th.closest('.services-item').find('.services-item__car--list').slideUp(100);
			parent.addClass('active');
			th.next().slideDown(300);
		}
	});

	//при клике на заголовок модели
	$('.services-item__car').on('click', function(){
		var th = $(this);
		var id = th.attr('id');

		th.closest('.services-item').find('.serv-table').slideUp(100);

		if (th.hasClass('active')) {
			th.removeClass('active');
			th.closest('.services-item').find('.services-item__car').removeClass('active');
			th.closest('.services-item').find('.serv-table').slideUp(100);
		}else{
			th.closest('.services-item').find('.services-item__car').removeClass('active');
			th.closest('.services-item').find('.serv-table').slideUp(100);
			th.addClass('active');
			th.closest('.services-item').find('.serv-table[data-id="'+ id +'"]').slideDown(300);
		}

	});

	$('.prace-link').on('click', function(){
		var dataId = $(this).closest('.serv-table').data('id');
		console.log(dataId);
		var carModel = $(this).closest('.services-item').find("#" + dataId).text();
		var servName = $(this).closest('.services-item').children('.services-item__title').text();
		
		$('#cheaper').find('h2').text('KIA ' + carModel);
		$('#cheaper').find('h3').text(servName);

	});

	function words (){
		if($(window).width() < 600){
			var eco = 'Эко-<br>ном',
			stndr = 'Стан-<br>дарт',
			stndr2 = 'Стан-<br>дарт+';
		}else{
			var eco = 'Эконом',
			stndr = 'Стандарт',
			stndr2 = 'Стандарт+';
		}
		$('.serv-table-head .serv-table-td:nth-child(2)').html(eco);
		$('.serv-table-head .serv-table-td:nth-child(3)').html(stndr);
		$('.serv-table-head .serv-table-td:nth-child(4)').html(stndr2);
	}
	words();
	$(window).on('resize', function(){
		words();
	});

	$('input[type="tel"]').mask('8 (999) 999-99-99');

});
