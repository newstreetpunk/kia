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

	var arrow = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 477.175 477.175" xml:space="preserve">	<path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225 c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></svg>';

	// $('.banner-slider').slick({
	// 	autoplay: true,
	// 	adaptiveHeight: true,
	// 	arrows: true,
	// 	dots: false,
	// 	prevArrow: '<button class="arrow prev-arrow">'+arrow+'</button>',
	// 	nextArrow: '<button class="arrow next-arrow">'+arrow+'</button>',
	// 	responsive: [
	// 	{
	// 		breakpoint: 992,
	// 		settings: {
	// 			arrows: false,
	// 			dots: true
	// 		}
	// 	}
	// 	]
	// });


	$("section h2, .offer-head .descr, .offer-form, .benefit").animated("fadeInUp", "fadeInUp");
	$("h1, .subtitle, .maps .dealer:nth-child(odd) .dealer-info, .big-title").animated("fadeInLeft", "fadeInLeft");
	$(".banner-form, .maps .dealer:nth-child(even) .dealer-info").animated("fadeInRight", "fadeInRight");

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
		var itemCar = parent.find('.services-item__car');
		var localItemId = localStorage.getItem('servicesItemCar');

		if (parent.hasClass('active')) {
			parent.removeClass('active');
			parent.find('.services-item--dropdown').slideUp();
			th.next().slideUp();
		}else{
			itemCar.each(function(){
				var id = $(this).attr('id');

				if( localItemId && localItemId == id ){
					itemCar.removeClass('active');
					$(this).addClass('active');
					parent.find('.services-item--dropdown[data-id="'+ id +'"]').slideDown();
				}
			});

			parent.addClass('active');
			th.next().slideDown();
		}
	});

	//при клике на заголовок модели
	// $('.services-item__car').on('click', function(){
	// 	var th = $(this);
	// 	var id = th.attr('id');
	// 	var parent = th.closest('.services-item');

	// 	th.closest('.services-item').find('.services-item--dropdown').slideUp();
		

	// 	if (th.hasClass('active')) {
	// 		$('.services-item__car').removeClass('active');
	// 		th.removeClass('active');
	// 		$('.services-item--dropdown').slideUp();
	// 	}else{
	// 		parent.find('.services-item__car').removeClass('active');
	// 		parent.find('.services-item--dropdown').slideUp();
	// 		th.addClass('active');
	// 		parent.find('.services-item--dropdown[data-id="'+ id +'"]').slideDown();

	// 		$('.services-item').not(parent).each(function(){
	// 			$(this).find('.services-item__car#'+ id +'').addClass('active');
	// 			if ($(this).hasClass('active')) {
	// 				$(this).find('.services-item--dropdown').slideUp();
	// 				$(this).find('.services-item--dropdown[data-id="'+ id +'"]').slideDown();
	// 			}
	// 		});
	// 	}

	// });


	$('.services-item__car').on('click', function(){
		var th = $(this);
		var id = th.attr('id');
		var parent = th.closest('.services-item');
		

		if (th.hasClass('active')) {
			$('.services-item__car').removeClass('active');
			th.removeClass('active');
			$('.services-item--dropdown').slideUp();
		}else{
			parent.find('.services-item__car').removeClass('active');
			parent.find('.services-item--dropdown').slideUp();
			th.addClass('active');
			parent.find('.services-item--dropdown[data-id="'+ id +'"]').slideDown();
			//Добавляем или изменяем значение:
			localStorage.setItem('servicesItemCar', id);
		}

	});


	$('.prace-link').on('click', function(){
		var dataId = $(this).closest('.services-item--dropdown').data('id');
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


	$('.avn__filter--form').on('change', function(){
		$('.avn__filter--reset').show();
	});

	$('.avn__filter--reset').on('click', function(){
		$('.avn__filter--form').trigger('reset');
		$('.serv-table').hide();
		$('input[type="radio"]').removeAttr('checked');
		$('.avn__filter--reset').hide();
	});

	// дата
	nowDate = new Date();
	// год
	nowYear = nowDate.getFullYear();

	$('.services-item--dropdown').each(function(){
		id = $(this).data('id');
		parent = $(this).closest('.services-item');
		title = parent.find('h2').text();
		title = title.replace(/[^\d]/g, '');
		formYearItemGroup = $(this).find('.year-item .form-group');
		formItem = $(this).find('.form-item').not($('.form-item.year-item'));

		carname = parent.find('.services-item__car#'+ id +'').text();
		carname = carname.replace(/\s/g, '-').toLowerCase();

		// ЕСЛИ НЕ ПОСТГАРАНТИЯ
		if (title != '') {

			i = nowYear - title - 1;
			for (i; i <= nowYear; i++) {
				formYearItemGroup.append(
					'<span class="item-group">\
					<input type="radio" name="year" id="'+carname+'-'+title+'-'+ i +'" value="'+ i +'">\
					<label for="'+carname+'-'+title+'-'+ i +'">'+ i +'</label>\
					</span>');
			}

			formItem.each(function(){
				$(this).find('input').each(function(){
					val = $(this).attr('id');
					$(this).attr('id', carname+'-'+title+'-'+val);
					$(this).next().attr('for', carname+'-'+title+'-'+val);
				});
			});

		}else{

			formItem.each(function(){
				$(this).find('input').each(function(){
					val = $(this).attr('id');
					$(this).attr('id', carname+'-'+val);
					$(this).next().attr('for', carname+'-'+val);
				});
			});
		}

	});

	$('input[type="radio"]').change(function(){
		$('.serv-table').show();
		name = $(this).attr('name');
		value = $(this).val();
		$('input[name="'+name+'"]').removeAttr('checked');
		$('input[name="'+name+'"]').each(function(){
			value2 = $(this).val();
			if (value == value2) {
				$(this).prop('checked', true);
			}
		});

	});

});
