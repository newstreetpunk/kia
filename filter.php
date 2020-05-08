<?php

//print_r(json_encode($_GET));

// $filter = array();

// 	if($_GET['year']) {
// 		$filter[] = 'year='.$_GET['year'];
// 	}
// 	print_r(json_encode($filter));
$array = json_decode(substr(file_get_contents(__DIR__ . '/unload.json'), 3), true);

foreach ($array as $key => $value) {
	if ($value['name'] == 'Seltos SP2') {
		echo $value['name'] . '<br>';
	}
	
}
