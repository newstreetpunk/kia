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
		var form = parent.find('#form-'+ localItemId +'');

		if (parent.hasClass('active')) {
			parent.find('.services-item--dropdown').slideUp();
			parent.removeClass('active');
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

			if (localStorage.getItem('form-'+ localItemId +'') ) {
				fields = localStorage.getItem('form-'+ localItemId +'');
				fields = JSON.parse(fields);
				input = form.find(':radio');

				parent.find('.services-item--dropdown[data-id="'+ localItemId +'"]').find('.avn__filter--reset').show();
				parent.find('.services-item--dropdown[data-id="'+ localItemId +'"]').find('.serv-table').show();

				$.each(fields, function(i, field){
					input.each(function(){
						var val = $(this).val();
						if (val == field.value) {
							$(this).prop('checked', true);
						}
					});
				});
			}else{
				form.trigger('reset');
				parent.find('.services-item--dropdown[data-id="'+ localItemId +'"]').find('.avn__filter--reset').hide();
				parent.find('.services-item--dropdown[data-id="'+ localItemId +'"]').find('.serv-table').hide();
			}

		parent.addClass('active');
		th.next().slideDown();
		}
	});

	//при клике на заголовок модели
	$('.services-item__car').on('click', function(){
		var th = $(this);
		var id = th.attr('id');
		var parent = th.closest('.services-item');
		var form = parent.find('#form-'+ id +'');
		

		if (th.hasClass('active')) {
			$('.services-item__car').removeClass('active');
			th.removeClass('active');
			$('.services-item--dropdown').slideUp();
		}else{
			parent.find('.services-item__car').removeClass('active');
			parent.find('.services-item--dropdown').slideUp();
			th.addClass('active');
			parent.find('.services-item--dropdown[data-id="'+ id +'"]').slideDown();

			localStorage.setItem('servicesItemCar', id);

			if (localStorage.getItem('form-'+ id +'') ) {
				fields = localStorage.getItem('form-'+ id +'');
				fields = JSON.parse(fields);
				
				input = form.find(':radio');

				parent.find('.services-item--dropdown[data-id="'+ id +'"]').find('.avn__filter--reset').show();
				parent.find('.services-item--dropdown[data-id="'+ id +'"]').find('.serv-table').show();

				$.each(fields, function(i, field){
					input.each(function(){
						var val = $(this).val();
						if (val == field.value) {
							$(this).prop('checked', true);
						}
					});
				});
			}else{
				form.trigger('reset');
				parent.find('.services-item--dropdown[data-id="'+ localItemId +'"]').find('.avn__filter--reset').hide();
				parent.find('.services-item--dropdown[data-id="'+ localItemId +'"]').find('.serv-table').hide();
			}
		}

	});

	$('.avn__filter--form').on('change', function(){
		var th = $(this);
		var id = th.attr('id');
		var parent = th.closest('.services-item--dropdown');
		var fields = th.serializeArray();
		var serialObj = JSON.stringify(fields);

		localStorage.setItem(id, serialObj);

		if (localStorage.getItem(id)) {
			parent.find('.avn__filter--reset').show();
			parent.find('.serv-table').show();
		}
		
	});

	$('.avn__filter--reset').on('click', function(){
		var th = $(this);
		var parent = th.closest('.services-item--dropdown');
		var form = parent.find('.avn__filter--form');
		var formId = form.attr('id');

		form.trigger('reset');
		localStorage.removeItem(formId);
		parent.find('.serv-table').hide();
		th.hide();
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


	$('.prace-link').on('click', function(){
		var dataId = $(this).closest('.services-item--dropdown').data('id');
		console.log(dataId);
		var carModel = $(this).closest('.services-item').find("#" + dataId).text();
		var servName = $(this).closest('.services-item').children('.services-item__title').text();
		
		$('#cheaper').find('h2').text('KIA ' + carModel);
		$('#cheaper').find('h3').text(servName);

	});

});
