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
	if ($(window).width() > 992) {
		$('.avn__filter--title').toggleClass('open').parent().next().slideToggle();
	}

	$('.avn__filter--reset').click(function(){
		$(this).hide();
		let select = $('#complect').find('option[selected="true"]').val();
		$('.select2-selection__rendered').text(select);
		$('.avn__filter--body form').trigger('reset');
		$('.avn__item').show();
	});

	$('.avn__filter--form').on('change', function(){
		// filter();
		
		let data = $('.avn__filter--form').serializeArray();

		$('.avn__item').removeClass("show");
		$('.avn__item').removeClass("notshow");
		if(data.length == 0) {
			$('.avn__item').show();
		} else {
			let arr = ['year', 'complect', 'engine', 'transmission', 'wheels'];

			$.each(arr, function(index, prop){
				
				$('.avn__item').removeClass(prop);

				let propArr = data.filter(function(el) {
					return el.name === prop;
				});
				$.each(propArr, function(index, el) {
					var data = 'data-'+prop+'="'+el.value+'"';
					// console.log(data, $('.avn__item['+data+']'))
					$('.avn__item['+data+']').addClass("show");
					$('.avn__item['+data+']').addClass(prop);
				});
				if(propArr.length>0) {
					// console.log('notshow', $('.avn__item[data-'+prop+']:not(.'+prop+')'));
					$('.avn__item[data-'+prop+']:not(.'+prop+')').addClass("notshow");
				}
			});

			$('.avn__item.show:not(.notshow)').show();
			$('.avn__item.notshow').hide();
			$('.avn__item:not(.show)').hide();
		}

		// console.log(['form-change',data]);


	});
	$('input[type="checkbox"]').change(function() {
		/* * /
		var data = 'data-'+$(this).prop('name')+'="'+$(this).prop('value')+'"';
		if(this.checked) {
			console.log(['checked', $(this).prop('name'), $(this).prop('value')], $('.avn__item[data-'+$(this).prop('name')+'="'+$(this).prop('value')+'"]'));
			$('.avn__item['+data+']').addClass("show");
			$('.avn__item:not(['+data+'])').addClass("notshow");
		} else {
			console.log(['unchecked', $(this).prop('name'), $(this).prop('value')]);
			// $('.avn__item['+data+']').removeClass("notshow");
			$('.avn__item.show['+data+']').removeClass("notshow");
		}
		$('.avn__item.show:not(.notshow)').show();
		$('.avn__item.notshow').hide();
		$('.avn__item:not(.show)').hide();
		/**/
	});

	function filter(){
		let data = $('.avn__filter--form').serialize();
		$.ajax({
			data: data,
			url: 'filter.php',
			type: 'get',
			beforeSend: function(){
				$('body').css('filter', 'blur(5px)');
			}
		}).done(function(res){

			$('.avn__item').remove();
			$('.avn__list').append(res);
			$('body').removeAttr('style');


			// let data = JSON.parse(res);

			// $.each(data, function(k, v){
			// 	$('.avn__item').hide();

			// 	$('.avn__item').each(function(){
			// 		dataVal = $(this).data(k);
			// 		if (dataVal == v) {
			// 			$(this).show();
			// 		}
			// 	});
			// });
		});
	};

	// filter();
	


	/* работа со списком машин */

	function getModel(what) {
		/* qwe=asd&zxc=rty#cvb */
		let query = document.location.hash.substring(1);
		// console.log("query : " + query); // cvb

		let params = window.location.search.substring(1);
		// console.log("params : " + params); // qwe=asd&zxc=rty

		let vars = params.split("&");
		// console.log("vars : " + vars); // qwe=asd,zxc=rty

		for (let i = 0; i < vars.length; i++) { 
			let pair=vars[i].split("=");
			// console.log(" pair : " + pair); // qwe,asd  zxc,rty
			if(pair[0] === what) {
				return pair[1];
			}
		}
	}

	let cars = [],
		jsonCount = 2,
		model = getModel('model');

	if(model.toLowerCase().includes('line')) model = 'line';

	$.getJSON('KCM.json', getJsonFunc);
	$.getJSON('KCS.json', getJsonFunc);
	
	function getJsonFunc(data){
		cars = cars.concat(data);
		jsonCount--;
		if(jsonCount==0) createCarsList();
	}

	function createCarsList() {

		cars = cars.filter(function(car) {
			let name = car.name.toLowerCase(),
				modelLower = model.toLowerCase();
			return ((model != 'line') ? name.includes(modelLower) && !name.includes('line') : name.includes(modelLower));
		});

		if(cars.length==0) return;

		let i = 0;	

		let check_load = setInterval(function() {
			
			let name = cars[i].name;
			
			if( name.toLowerCase().includes(model.toLowerCase()) === true ) {
				let img = name.match(/(\w+)/),
					imgName = img[0].toUpperCase(),
					engine = (Math.random()<0.5?'1.6 MPI 128 л.с':'2.0 MPI 149 л.с'),
					complect = (Math.random()<0.5?'Classic':(Math.random()<0.5?'Comfort':'Luxe')),
					transmission = (Math.random()<0.5?'AT':'MT'),
					wheels = (Math.random()<0.5?'Полный':'Передний');
				out = '\
				<div class="avn__item" data-year="'+cars[i].year+'" data-engine="'+engine+'" data-complect="'+complect+'" data-transmission="'+transmission+'" data-wheels="'+wheels+'">\
					<a href="model.html" class="avn__item--img"><img class="lazyload" src="img/loading.gif" data-src="img/cars/'+imgName+'-1.png" alt="'+name+'"></a>\
					<div class="avn__item--info">\
						<a href="model.html" class="avn__item--info_name"><h2>KIA '+name+'</h2></a>\
						<div class="parameter parameter-price">Стоимость: <strong>'+cars[i].price+'&nbsp;₽</strong><s>'+cars[i].special+'&nbsp;₽</s></div>\
						<div class="parameter">Год: <strong class="year">'+cars[i].year+'</strong></div>\
						<div class="parameter__row">\
							<div class="parameter">Комплектация: <strong>'+complect+'</strong></div>\
							<div class="parameter">Двигатель: <strong>'+engine+'</strong></div>\
						</div>\
						<div class="parameter__row">\
							<div class="parameter">Привод: <strong>'+wheels+'</strong></div>\
							<div class="parameter">Трансмиссия: <strong>'+transmission+'</strong></div>\
						</div>\
					</div>\
					<div class="avn__item--links">\
						<a href="#cheaper" class="btn btn-white modal-link">Хочу дешевле</a>\
						<a href="#cheaper" class="btn modal-link">Забронировать</a>\
						<a href="#credit" class="btn modal-link btn-white credit-link">Расчитать кредит</a>\
					</div>\
				</div>\
				';

				$('.avn__list').append(out);
			}

			i++;
            if( i >= cars.length ) {
                clearInterval(check_load);
                $('.lazyload').lazyload();
            } 
        }, 10);
	};

	/* работа со списком машин закончили */

});