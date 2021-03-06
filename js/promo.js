jQuery(function($) {

	if((location.hostname == 'localhost' && location.pathname == '/index.html') || location.hostname == 'newstreetpunk.github.io') {
	document.querySelectorAll('.cars-links a').forEach(function(car){
		if(car.innerText != 'SELTOS') {
			var fileName = car.getAttribute('data');
			var newCar = document.querySelector('.cars-list .car').cloneNode(true);
			newCar.querySelector('h2').innerText = car.innerText;
			newCar.querySelector('a').href = 'cars.html?model='+car.innerText;
			newCar.querySelector('a').id = fileName;
			newCar.querySelectorAll('.photo img').forEach(function(image, index){
				image.alt = 'KIA '+car.innerText;
				image.src = 'img/cars/'+fileName+'-'+(index+1)+'.png';
				image.setAttribute('data-src', 'img/cars/'+fileName+'-'+(index+1)+'.png');

			})
			document.querySelector('.cars-list').append(newCar);
		}
	});
	}


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
			var res = JSON.parse(data);
			if(res.error) 
				$('.error-message').html(res.error);
			else
				$('.error-message').html("");
			setTimeout(function() {
				$.magnificPopup.close();
				$.magnificPopup.open({
					items: {
						src: (res.answer == 'ok') ? '.thanks' : '.error',
						type: 'inline'
					}
				});
				if(res.answer == 'ok') {
					th.trigger("reset");
				}
				btnSubmit.removeAttr("disabled");
			}, 100);
		}).fail(function( jqXHR, textStatus ) {
			$('.error-message').html("Request failed: " + textStatus);
			$.ajax({
				type: "GET",
				url: "/", //Change
				data: th.serialize() +'&referer=' + replUrl
			})
			setTimeout(function() {
				$.magnificPopup.close();
				$.magnificPopup.open({
					items: {
						src: '.error',
						type: 'inline'
					}
				});
				btnSubmit.removeAttr("disabled");
			}, 100);
		});
		return false;
	});

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

	$('.gosprogram').on('click', function(event){
		event.preventDefault();
		$.magnificPopup.open({
			items: {
				src: '#gosprogram',
				type: 'inline'
			}
		});
	});

	$('.modal-link-parent').each(function(el){
		var src = $(this)[0].hash;
		// console.log(['modal-link-parent', $(this)[0].hash, el, src]);
		$(this).find('h2, .benefit, .photo, .price, .descr-item:not(.gosprogram)').on('click', function(event) {
			event.preventDefault();

			$.magnificPopup.open({
				items: {
					src: src,
					type: 'inline',
				}
			});
		})
		
	});

	// Video Load & Popup
	$('.video-popup').magnificPopup({
		disableOn: 700,
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: true,

		fixedContentPos: true,
		type: 'iframe',
		iframe: {
			markup: '<div class="mfp-iframe-scaler">'+
			'<div class="mfp-close"></div>'+
			'<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
			'</div>',
			patterns: {
				youtube: {
					index: 'youtube.com/', 
					id: 'v=',
					src: 'https://www.youtube.com/embed/%id%?autoplay=1'
				},
				vimeo: {
					index: 'vimeo.com/',
					id: '/',
					src: '//player.vimeo.com/video/%id%?autoplay=1'
				},
				gmaps: {
					index: '//maps.google.',
					src: '%id%&output=embed'
				}
			},
			srcAction: 'iframe_src', 
		}
	});
	//

	$(function() {
	    count = -1; // start with -1
	    initText = "от стоимости автомобиля"; //set your init text here
	    wordsArray = ["для семей с&nbsp;одним ребёнком", "для медработников", "при покупке первого авто", "при сдаче авто старше 6&nbsp;лет"]; //change this text items to your own

	    $(".descr-text .word").html(initText).delay(2000);

		// return;
	    setInterval(function() {
	        count++;
	        $(".descr-text .word").fadeOut(400, function() {
	            $(this).html(wordsArray[count % wordsArray.length]).fadeIn(400);
	        });
	    }, 2500); // set interval time
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

	$('a[href="#cheaper"], a[href="#credit"]').on('click', function(){
		var th = $(this);
		var parent = th.closest('.car');
		var model = parent.find('h2').text();
		$('#cheaper form .val-model, #credit form .val-model, #gosprogram form .val-model').val(model);
	});

	// $('input[type="tel"]').mask('8 (999) 999-99-99');

	$('.lazyload').lazyload();

	$("section h2, .offer-head .descr, .offer-form, .benefit").animated("fadeInUp", "fadeInUp");
	$("h1, .subtitle, .maps .dealer:nth-child(odd) .dealer-info").animated("fadeInLeft", "fadeInLeft");
	$(".hero-form, .maps .dealer:nth-child(even) .dealer-info").animated("fadeInRight", "fadeInRight");

});