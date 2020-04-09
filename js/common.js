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
		var url = window.location.href;
		var replUrl = url.replace('?', '&');
		$.ajax({
			type: "POST",
			url: "/mail.php", //Change
			data: th.serialize() +'&referer=' + replUrl
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

	$("section h2, .offer-head .descr, .offer-form, .benefit").animated("fadeInUp", "fadeInUp");
	$("h1, .subtitle, .maps .dealer:nth-child(odd) .dealer-info").animated("fadeInLeft", "fadeInLeft");
	$(".hero-form, .maps .dealer:nth-child(even) .dealer-info").animated("fadeInRight", "fadeInRight");

	if ($(window).width() > 768) {
		$('.player').mb_YTPlayer();
	}
		
	$('a[href*=#].scroll').bind("click", function(e){
		var anchor = $(this);
		var id = anchor.attr('data');
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top - 120
		}, 700);
		$(anchor.attr('href')).parent().addClass('active');
		$(anchor.attr('href')).children('h2').addClass('mypulse').removeClass('fadeInUp');
		setTimeout(function(){
			$(anchor.attr('href')).parent().removeClass('active');
			$(anchor.attr('href')).children('h2').removeClass('mypulse');
		}, 5000);
		e.preventDefault();
	});

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

	$('a[href="#credit"]').click(function(){
		var price = $(this).parent().prev().find('.relevant-price').text();
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
		var parent = th.closest('.car');
		var model = parent.find('h2').text();
		$('#cheaper form #val-model, #credit form #val-model').val(model);
	});

	// $('input[type="tel"]').mask('8 (999) 999-99-99');

	$('.lazyload').lazyload();


	var goals = [
		{
			selector: 'a[href^="tel:"]',
			action: 'click',
			goal: 'lead-click',
			title: 'Клик по телефону',
		},

		{
			selector: '.hero-form form',
			action: 'submit',
			hit: '/tilda/form127083022/submitted',
			title: 'Отправили форму на обложке',
		},

		{
			selector: '.offer-form form',
			action: 'submit',
			hit: '/tilda/form127083029/submitted',
			title: 'Отправили форму с комментарием внизу страницы',
		},

		{
			selector: 'a[href="#cheaper"]',
			action: 'click',
			hit: '/tilda/popup/rec129284270/opened',
			title: 'Открыли форму при клике на машину',
		},
		{
			selector: '#cheaper form',
			action: 'submit',
			hit: '/tilda/form129284270/submitted',
			title: 'Отправили форму при клике на машину',
		},
		
		{
			selector: 'a[href="#credit"]',
			action: 'click',
			hit: '/tilda/popup/rec149722414/opened',
			title: 'Открыли форму Рассчитать кредит',
		},
		{
			selector: '#credit form',
			action: 'submit',
			hit: '/tilda/form149722414/submitted',
			title: 'Отправили форму Рассчитать кредит',
		},
		
		/*{
			selector: 'a[href="#callbackForm"]',
			action: 'click',
			hit: '/tilda/click/rec127105691/button1',
			title: 'Нажали на кноку Обратного звонка',
		},*/
		{
			selector: 'a[href="#callbackForm"]',
			action: 'click',
			hit: '/tilda/popup/rec138809081/opened',
			title: 'Открыли форму Обратного звонка',
		},
		{
			selector: '#callbackForm form',
			action: 'submit',
			hit: '/tilda/form138809081/submitted',
			title: 'Отправили форму Обратного звонка',
		},

		{
			selector: 'a[href="#popup"]',
			action: 'click',
			hit: '/tilda/popup/rec138246172/opened',
			title: 'Смотрели соглашение в попапе',
		},
	];

	goals.forEach(function(value, index, array){
		if(value.goal != null) {
			$(value.selector).on(value.action, function(){
				ymGoal(value.goal);
			});
		} else if(value.hit != null) {
			$(value.selector).on(value.action, function(){
				dataLayer.push({
					event:"pageView",
					eventAction: value.hit,
					title: value.title,
				});
			});
		} else {

		}
	});

});