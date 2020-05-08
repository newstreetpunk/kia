<!DOCTYPE html>
<html lang="ru">

<head>

	<meta charset="utf-8">
	<!-- <base href="/"> -->
	<meta name="robots" content="noindex">

	<title>Авто в наличии</title>
	<meta name="description" content="" />	
    <!-- <link rel="canonical" href="https://promo.kia-samara.ru"> -->

	<!-- <meta property="og:url" content="https://promo.kia-samara.ru" /> -->
	<meta property="og:title" content="Специальные предложения на сервис KIA в Самаре" />
	<meta property="og:description" content="" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/img/kia-logo.svg" />

	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<!-- Custom Browsers Color Start -->
	<meta name="theme-color" content="#bb162a">
	<!-- Custom Browsers Color End -->

	<!-- Favicon -->
	<link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon">
	<!-- Style -->

	<link rel="stylesheet" href="css/cars-style.css?040520201505">

</head>

<body>
	
	<header class="header">
		<div class="container">
			<div class="header-wrap">
				<span class="header-logo">
					<img src="img/kia-logo.svg" alt="Kia">
				</span>
				<!-- /.header-logo -->
				<div class="header-phones rand">
					<div class="phone phone-one">
						<img src="img/phone.svg" alt="Иконка">
						<span class="phone-info">
							<a href="tel:+78469777700">+7 (846) 977-77-00</a>
							<small>Ново-Урицкая, 22</small>
						</span>							
					</div>
					<div class="phone phone-two">
						<img src="img/phone.svg" alt="Иконка">
						<span class="phone-info">
							<a href="tel:+78462059999">+7 (846) 205-99-99</a>
							<small>Московское шоссе, 262&nbsp;А</small>
						</span>							
					</div>
				</div>
				<!-- /.header-phones -->
				<div class="header-right">
					<a href="#callbackForm" class="btn modal-link">Обратный&nbsp;звонок</a>
				</div>
				<!-- /.header-right -->
			</div>
			<!-- /.header-wrap -->
		</div>
		<!-- /.container -->
	</header>
	<!-- /.header -->

	<main>

		<h1>Авто в наличии</h1>

		<section class="avn">
			<div class="container">
				
				<?php 
				$array = json_decode(substr(file_get_contents(__DIR__ . '/unload.json'), 3), true);

				$years = $array;
				// цикл объединения одинаковых значений value и запись в новый массив
				foreach ($years as $key => $value) {
					if ( in_array($value['year'], $year) ) unset($years[$key]); else $year[] = $value['year'];
					if ( in_array($value['code'], $code) ) unset($years[$key]); else $code[] = $value['code'];
					}
				?>

				<div class="avn__filter">
					<div class="avn__filter--head">
						<div class="avn__filter--title open">
							<div class="avn__filter--icon">
								<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 321.9 321.9" xml:space="preserve">
								<path d="M128.25,175.6c1.7,1.8,2.7,4.1,2.7,6.6v139.7l60-51.3v-88.4c0-2.5,1-4.8,2.7-6.6L295.15,65H26.75L128.25,175.6z"/><rect x="13.95" y="0" width="294" height="45"/></svg>
							</div>
							<span>Фильтр</span>
						</div>
						<!-- /.avn__filter--title -->
						<span class="avn__filter--reset">&times; Сбросить</span>
					</div>
					<!-- /.avn__filter--head -->
					<div class="avn__filter--body">
						<form class="avn__filter--form">
							
							<div class="form-item">
								<h4>Год</h4>
								<label class="form-group">
									
									<?php foreach ($year as $key => $value): ?>

									<span class="item-group">

										<?php if ($value == '2020') { ?>
											<input type="checkbox" name="year" id="<?= $value; ?>" value="<?= $value; ?>" checked="true">
											<label for="<?= $value; ?>"><?= $value; ?></label>
										<?php } else{ ?>
											<input type="checkbox" name="year" id="<?= $value; ?>" value="<?= $value; ?>">
											<label for="<?= $value; ?>"><?= $value; ?></label>
										<?php }?>
										
									</span>
									<?php endforeach; ?>
								</label>
							</div>
							<!-- /.form-item -->

							<div class="form-item">
								<h4>Комплектация</h4>
								<label class="form-group">
									<select name="complect" id="complect">
										<?php foreach ($code as $key => $value):
											if ($value != '') {
												echo '<option value="'.substr($value,-4).'">'.substr($value,-4).'</option>';
											} endforeach;?>

									</select>
								</label>
							</div>
							<!-- /.form-item -->

							<div class="form-item">
								<h4>Двигатель</h4>
								<label class="form-group">
									<span class="item-group">
										<input type="checkbox" name="engine" id="engine-1" value="2">
										<label for="engine-1">1.6 MPI 128 л.с</label>
									</span>
									<span class="item-group">
										<input type="checkbox" name="engine-2" id="engine-2" value="1">
										<label for="engine-2">2.0 MPI 149 л.с</label>
									</span>
								</label>
							</div>
							<!-- /.form-item -->

							<div class="form-item">
								<h4>Трансмиссия</h4>
								<label class="form-group">
									<span class="item-group">
										<input type="checkbox" name="transmission" id="transmission-1">
										<label for="transmission-1">AT</label>
									</span>
									<span class="item-group">
										<input type="checkbox" name="transmission" id="transmission-2">
										<label for="transmission-2">MT</label>
									</span>
								</label>
							</div>
							<!-- /.form-item -->

							<div class="form-item">
								<h4>Привод</h4>
								<label class="form-group">
									<span class="item-group">
										<input type="checkbox" name="wheels" id="wheels-1">
										<label for="wheels-1">Полный</label>
									</span>
									<span class="item-group">
										<input type="checkbox" name="wheels" id="wheels-2">
										<label for="wheels-2">Передний</label>
									</span>
								</label>
							</div>
							<!-- /.form-item -->
						</form>
					</div>
					<!-- /.avn__filter--body -->
				</div>
				<!-- /.avn__filter -->
				
				<div class="avn__list">

					<?php 
					$i=0;
					for ($array; $i < 10; $i++) : ?>
						<div class="avn__item" data-year="<?= $array[$i]['year']; ?>" data-engine="2" data-complect="<?=substr($array[$i]['code'],-4)?>">
							<div class="avn__item--img">
								<img class="lazyload" src="img/loading.gif" data-src="img/cars/<?=strtoupper(stristr($array[$i]['name'], ' ', true))?>-1.png" alt="ALT">
							</div>
							<div class="avn__item--info">
								<div class="avn__item--info_name">

									<?php
									$filename = 'img/cars_name/'.strtolower(stristr($array[$i]['name'], ' ', true)).'.svg';
									if (file_exists($filename)) {
										echo '<img src="'.$filename.'" alt="KIA '.$array[$i]['name'].'">';
									}else{
										echo '<h2>KIA '.$array[$i]['name'].'</h2>';
									} ?>

								</div>
								<div class="parameter parameter-price">Стоимость: <strong><?= $array[$i]['price']; ?>&nbsp;₽</strong>
								<?php
								if ($value[$i]['price']!=$value[$i]['special']) {
									echo '<s>'.$array[$i]['special'].'&nbsp;₽</s>';
								}
								?>
								</div>
								<?php
									if ($array[$i]['pts']>0): ?>
								<div class="parameter__row">
									<div class="parameter">Год: <strong class="year"><?= $array[$i]['year']; ?></strong></div>
									<div class="parameter">Птс: <strong class="year">В наличии</strong></div>
								</div>		
								<?php else: ?>
								<div class="parameter">Год: <strong class="year"><?= $array[$i]['year']; ?></strong></div>
								<?php endif; ?>
								
								<div class="parameter__row">
									<div class="parameter">Комплектация: <strong><?=substr($array[$i]['code'],-4)?></strong></div>
									<div class="parameter">Двигатель: <strong>1.6 MPI 123 л.с</strong></div>
								</div>
								<div class="parameter__row">
									<div class="parameter">Привод: <strong>Передний</strong></div>
									<div class="parameter">Трансмиссия: <strong>AT</strong></div>
								</div>
							</div>
							<div class="avn__item--links">
								<a href="#cheaper" class="btn btn-white modal-link">Хочу дешевле</a>
								<a href="#cheaper" class="btn modal-link">Забронировать</a>
								<a href="#credit" class="btn modal-link btn-white credit-link">Расчитать кредит</a>
							</div>
						</div>
					<?php endfor?>
					
					<!-- <div class="avn__item">
						<div class="avn__item--img">
							<img class="lazyload" src="img/loading.gif" data-src="img/cars/Seltos-1.png" alt="ALT">
						</div>
						<div class="avn__item--info">
							<div class="avn__item--info_name">
								<img src="img/cars_name/seltos.svg" alt="ALT">
							</div>
							<div class="parameter parameter-price">Стоимость: <strong>1799900&nbsp;₽</strong><s>1900000&nbsp;₽</s></div>
							<div class="parameter">Год: <strong>2020</strong></div>
							<div class="parameter__row">
								<div class="parameter">Комплектация: <strong>Classic 1.6 6AT</strong></div>
								<div class="parameter">Двигатель: <strong>1.6 MPI 123 л.с</strong></div>
							</div>
							<div class="parameter__row">
								<div class="parameter">Привод: <strong>Передний</strong></div>
								<div class="parameter">Трансмиссия: <strong>AT</strong></div>
							</div>
						</div>
						<div class="avn__item--links">
							<a href="#cheaper" class="btn btn-white modal-link">Хочу дешевле</a>
							<a href="#cheaper" class="btn modal-link">Забронировать</a>
							<a href="#credit" class="btn modal-link btn-white credit-link">Расчитать кредит</a>
						</div>
					</div> -->

				</div>
				<!-- /.avn__list -->

			</div>
			<!-- /.container -->
		</section>
		<!-- /.cars -->

	</main>

	<footer class="footer">
		<p>Специальные предложения на сервис KIA в Самаре</p>
		<img src="img/kia-logo.svg" alt="KIA">
	</footer>

	<div class="top">
		<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 48 48" enable-background="new 0 0 48 48" xml:space="preserve">
			<path style="fill:#000000;" d="M43.006,47.529H4.964c-2.635,0-4.791-2.156-4.791-4.791V4.697c0-2.635,2.156-4.791,4.791-4.791h38.042
			c2.635,0,4.791,2.156,4.791,4.791v38.042C47.797,45.373,45.641,47.529,43.006,47.529z M25.503,16.881l6.994,7.049
			c0.583,0.588,1.532,0.592,2.121,0.008c0.588-0.583,0.592-1.533,0.008-2.122l-9.562-9.637c-0.281-0.283-0.664-0.443-1.063-0.443
			c0,0,0,0-0.001,0c-0.399,0-0.782,0.159-1.063,0.442l-9.591,9.637c-0.584,0.587-0.583,1.537,0.005,2.121
			c0.292,0.292,0.675,0.437,1.058,0.437c0.385,0,0.77-0.147,1.063-0.442L22.5,16.87v19.163c0,0.828,0.671,1.5,1.5,1.5
			s1.5-0.672,1.5-1.5L25.503,16.881z"></path>
		</svg>
	</div>

	<!-- MODALS -->
	<div class="privacy-wrap">
	<div class="overlay"></div>
	<!-- Политика -->
	<div class="privacy" id="popup">
		<button class="privacy-close">×</button>
		<h2>Условия и способы обработки и хранения персональных данных</h2>
		<p>Настоящее согласие дается на выполнение следующих действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными: сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача, в том числе трансграничная (распространение в случаях и в объеме, предусмотренных законодательством РФ, в том числе предоставление в государственные органы и иные организации), обезличивание, блокирование, удаление, уничтожение персональных данных в целях:<br>а) продвижения товаров и услуг, поставляемых ООО «Киа Моторс Россия и СНГ» и официальными дилерами ООО «Киа Моторс Россия и СНГ»;<br>б) получения и исследования статистических данных об объемах продаж и качестве услуг, оказываемых ООО «Киа Моторс Россия и СНГ» и официальными дилерами ООО «Киа Моторс Россия и СНГ» при продаже автомобилей;<br>в) изучения конъюнктуры рынка автомобилей, автомобильных запасных частей и аксессуаров;<br>г) совершенствования уровня предоставляемых ООО «Киа Моторс Россия и СНГ» и официальными дилерами ООО «Киа Моторс Россия и СНГ» услуг;<br>д) осуществления гарантийного ремонта и технического обслуживания автомобилей;<br>е) осуществления других видов деятельности в рамках законодательства РФ с обязательным выполнением требований законодательства РФ в области персональных данных.<br><br>Настоящим Вы выражаете свое согласие на получение от ООО «Киа Моторс Россия и СНГ» и официальных дилеров ООО «Киа Моторс Россия и СНГ» рекламных материалов, связанных с продвижением товаров и услуг, поставляемых ООО «Киа Моторс Россия и СНГ» и официальными дилерами ООО «Киа Моторс Россия и СНГ», путем осуществления прямых контактов с помощью различных средств связи, включая, но, не ограничиваясь: почтовая рассылка, sms – рассылка, электронная почта, телефон, Интернет.<br><br>Персональные данные, полученные ООО «Киа Моторс Россия и СНГ» и официальными дилерами ООО «Киа Моторс Россия и СНГ», хранятся в соответствии с требованиями законодательства РФ на условиях конфиденциальности. Вы соглашаетесь с тем, что, если это необходимо для реализации целей, указанных выше, Ваши персональные данные могут быть переданы третьим лицам, которым ООО «Киа Моторс Россия и СНГ» и официальные дилеры ООО «Киа Моторс Россия и СНГ» могут поручить обработку Ваших персональных данных на основании договора, заключенного с такими лицами, при условии соблюдения требований законодательства РФ об обеспечении такими третьими лицами конфиденциальности и безопасности персональных данных при их обработке.<br><br>Оператор (Операторы) персональных данных ведет (ведут) деятельность на территории Российской Федерации в соответствии с законодательством Российской Федерации. Предлагаемые товары/работы/услуги доступны к получению на территории Российской Федерации. Мониторинг потребительского поведения субъектов, находящихся за пределами Российской Федерации, не ведется.<br><br>Настоящее согласие на обработку персональных данных действует с момента проставления отметки и до получения письменного отзыва данного согласия. Настоящим Вы подтверждаете, что ознакомлены с порядком отзыва согласия на обработку персональных данных, представленным ниже.<br><br><br>«Порядок отзыва» Согласие может быть в любое время отозвано Вами путем уведомления официального дилера ООО «Киа Моторс Россия и СНГ» на территории России, либо путем направления в письменной форме уведомления в адрес ООО «Киа Моторс Россия и СНГ» (заказным почтовым отправлением с описью вложения).<br><br>*ООО «Киа Моторс Россия и СНГ», г. Москва, Валовая ул., д. 26 (<a href="https://www.kia.ru/" style="background-color: rgba(255, 255, 255, 0.97); color: rgb(17, 85, 204); text-decoration-line: underline; font-size: 16px;">www.kia.ru</a>)<br>**Актуальный список официальных дилеров ООО «Киа Моторс Россия и СНГ» на территории России доступен по ссылке: <a href="https://www.kia.ru/dealers/" style="background-color: rgba(255, 255, 255, 0.97); color: rgb(17, 85, 204); text-decoration-line: underline; font-size: 16px;">www.kia.ru/dealers/</a><br>***ООО «Киа Моторс Россия и СНГ» оставляет за собой право поручать обработку предоставленных персональных данных другим лицам, в том числе находящимся за пределами Российской Федерации»</p>
	</div>
	</div>

	<!-- Обратная связь -->
	<div class="modal mfp-hide white-popup-block" id="callbackForm">
		<h2>Перезвоните мне</h2>
		<p>Можем предложить специальные условия именно для вас!</p>
		<form method="POST">
			<!-- Hidden Required Fields -->
			<input type="hidden" name="project_name" value="KIA">
			<input type="hidden" name="admin_email" value="<?php echo $email; ?>">
			<input type="hidden" name="form_subject" value="Форма - Заказ обратного звонка">
			<!-- END Hidden Required Fields -->

			<input type="text" placeholder="Ваше имя*" name="Имя" required>
			<input type="tel" placeholder="8 (999) 999-99-99" name="Телефон" required>
			<span class="dealer-choice">выберите дилерский центр:</span>
			<div class="rand">
				<div>
					<label class="t-radio__control t-text t-text_xs">
						<input type="radio" name="Дилер" value="КИА Центр Самара" class="t-radio js-tilda-rule" required>
						<span class="t-radio__indicator"></span>КИА Центр Самара
					</label>
				</div>
				<div>
					<label class="t-radio__control t-text t-text_xs">
						<input type="radio" name="Дилер" value="КИА Центр на Московском" class="t-radio js-tilda-rule" required>
						<span class="t-radio__indicator"></span>КИА Центр на Московском
					</label>
				</div>
			</div>
			<button class="btn">Перезвоните</button>
			<small>Нажимая на кнопку действия, я даю согласие на <a href="#popup">обработку персональных данных</a></small>
		</form>
	</div>

	<!-- Узнать цену -->
	<div class="modal mfp-hide white-popup-block" id="cheaper">
		<h2></h2>
		<p>Оставьте свой номер телефона и наш менеджер свяжется с Вами</p>
		<form method="POST">
			<!-- Hidden Required Fields -->
			<input type="hidden" name="project_name" value="KIA">
			<input type="hidden" name="admin_email" value="<?php echo $email; ?>">
			<input type="hidden" name="form_subject" value="Попап форма - хочу дешевле">
			<!-- END Hidden Required Fields -->

			<input type="text" placeholder="Ваше имя*" name="Имя" required>
			<input type="tel" placeholder="8 (999) 999-99-99" name="Телефон" required>
			<span class="dealer-choice">выберите дилерский центр:</span>
			<div class="rand">
				<div>
					<label class="t-radio__control t-text t-text_xs">
						<input type="radio" name="Дилер" value="КИА Центр Самара" class="t-radio js-tilda-rule" required>
						<span class="t-radio__indicator"></span>КИА Центр Самара
					</label>
				</div>
				<div>
					<label class="t-radio__control t-text t-text_xs">
						<input type="radio" name="Дилер" value="КИА Центр на Московском" class="t-radio js-tilda-rule" required>
						<span class="t-radio__indicator"></span>КИА Центр на Московском
					</label>
				</div>
			</div>
			<button class="btn">Узнать цену</button>
			<small>Нажимая на кнопку действия, я даю согласие на <a href="#popup">обработку персональных данных</a></small>
		</form>
	</div>

	<div class="thanks modal mfp-hide white-popup-block">
		<h2>Спасибо!</h2>
		<p>Ваше сообщение успешно отправлено!<br>В скором времени мы свяжемся с Вами!</p>
	</div>

	<div class="error modal mfp-hide white-popup-block">
		<h2>Спасибо!</h2>
		<p>Ваше сообщение успешно отправлено!<br>В скором времени мы свяжемся с Вами!</p>
	</div>

	<!-- Расчитать кредит -->
	<div class="modal mfp-hide white-popup-block credit" id="credit">
		<h2>Рассчитать кредит</h2>
		<p>Оставьте заявку и мы сформируем для Вас персональное предложение</p>
		<form action="#" method="GET" class="kia-form" style="display: block; width: 100%">
			<div class="contribution" data-input-lid="contribution">
				<p class="range__title">Первоначальный взнос</p>
				<div class="range__wrapper">
					<input name="Взнос" class="range" type="range" min="0" max="1249900" step="10000" value="500000">
					<div class="range__value-txt t-descr" style="display: none;"></div>
					<div class="range__interval-txt-wrapper">
						<div class="range__interval-txt range__interval-txt_min t-descr">0</div>
						<div class="range__interval-txt range__interval-txt_max t-descr">1249900</div>
					</div>
				</div>				
			</div>
			<div class="term" data-input-lid="term">
				<p class="range__title">Срок кредитования</p>
				<div class="range__wrapper">
					<input name="Срок" class="range" type="range" min="0" max="72" step="1" value="36">
					<div class="range__value-txt t-descr" style="display: none;"></div>
					<div class="range__interval-txt-wrapper">
						<div class="range__interval-txt range__interval-txt_min t-descr">0</div>
						<div class="range__interval-txt range__interval-txt_max t-descr">72</div>
					</div>
				</div>
			</div>
			<input type="text" placeholder="Ваше имя*" required>
			<input type="tel" placeholder="+7 (999)999-99-99 " required>
			<input type="email" name="Email" placeholder="mail@example.com">
			<span class="dealer-choice">выберите дилерский центр:</span>
			<div class="rand">
				<div>
					<label class="t-radio__control t-text t-text_xs">
						<input type="radio" name="dealer" value="КИА Центр Самара" class="t-radio js-tilda-rule" required>
						<span class="t-radio__indicator"></span>КИА Центр Самара
					</label>
				</div>
				<div>
					<label class="t-radio__control t-text t-text_xs">
						<input type="radio" name="dealer" value="КИА Центр на Московском" class="t-radio js-tilda-rule" required>
						<span class="t-radio__indicator"></span>КИА Центр на Московском
					</label>
				</div>
			</div>
			<button class="btn">Рассчитать кредит</button>
			<small>Нажимая на кнопку "Подписаться", я даю согласие на <a href="#popup">обработку персональных данных</a></small>
		</form>
	</div>

	<!-- /MODALS -->

	<script src="js/cars-scripts.min.js?040520201505"></script>

	<script>
			$('.lazyload').lazyload();
			//$(".avn__item").animated("fadeInUp", "fadeInUp");
	</script>

</body>
</html>