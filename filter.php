<?php

//print_r(json_encode($_GET));

// $filter = array();

// 	if($_GET['year']) {
// 		$filter[] = 'year='.$_GET['year'];
// 	}
// 	print_r(json_encode($filter));

$array = json_decode(substr(file_get_contents(__DIR__ . '/unload.json'), 3), true);
	$i=0;
	for ($array; $i < 50; $i++) : 
 		if ($array[$i]['year'] == $_GET['year'] or $array[$i]['year'] == $_GET['year2']) {

 			echo '<div class="avn__item" data-year="'.$array[$i]['year'].'" data-engine="1.6 MPI 128"><div class="avn__item--img"><img class="" src="img/cars/SELTOS-1.png" data-src="img/cars/SELTOS-1.png" alt="Seltos SP2"></div><div class="avn__item--info"><div class="avn__item--info_name"><h2>KIA '.$array[$i]['name'].'</h2></div><div class="parameter parameter-price">Стоимость: <strong>1799900&nbsp;₽</strong><s>1799900&nbsp;₽</s></div><div class="parameter">Год: <strong class="year">'.$array[$i]['year'].'</strong></div><div class="parameter__row"><div class="parameter">Комплектация: <strong>Classic 1.6 6AT</strong></div><div class="parameter">Двигатель: <strong>1.6 MPI 123 л.с</strong></div></div><div class="parameter__row"><div class="parameter">Привод: <strong>Передний</strong></div><div class="parameter">Трансмиссия: <strong>AT</strong></div></div></div><div class="avn__item--links"><a href="#cheaper" class="btn btn-white modal-link">Хочу дешевле</a><a href="#cheaper" class="btn modal-link">Забронировать</a><a href="#credit" class="btn modal-link btn-white credit-link">Расчитать кредит</a></div></div>';

 		}
 		if (!$_GET) {

		echo '<div class="avn__item" data-year="'.$array[$i]['year'].'" data-engine="1.6 MPI 128"><div class="avn__item--img"><img class="" src="img/cars/SELTOS-1.png" data-src="img/cars/SELTOS-1.png" alt="Seltos SP2"></div><div class="avn__item--info"><div class="avn__item--info_name"><h2>KIA '.$array[$i]['name'].'</h2></div><div class="parameter parameter-price">Стоимость: <strong>1799900&nbsp;₽</strong><s>1799900&nbsp;₽</s></div><div class="parameter">Год: <strong class="year">'.$array[$i]['year'].'</strong></div><div class="parameter__row"><div class="parameter">Комплектация: <strong>Classic 1.6 6AT</strong></div><div class="parameter">Двигатель: <strong>1.6 MPI 123 л.с</strong></div></div><div class="parameter__row"><div class="parameter">Привод: <strong>Передний</strong></div><div class="parameter">Трансмиссия: <strong>AT</strong></div></div></div><div class="avn__item--links"><a href="#cheaper" class="btn btn-white modal-link">Хочу дешевле</a><a href="#cheaper" class="btn modal-link">Забронировать</a><a href="#credit" class="btn modal-link btn-white credit-link">Расчитать кредит</a></div></div>';
	}
		
	endfor;

