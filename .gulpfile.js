		scripts_promo: {
			src: [
				base.kia + '/libs/jquery/dist/jquery.min.js',
				base.kia + '/libs/Magnific-Popup-master/jquery.magnific-popup.js',
				base.kia + '/libs/range/range.js',
				base.kia + '/libs/animate-css.js',
				base.kia + '/libs/jquery.mb.YTPlayer.min.js',
				base.kia + '/libs/lazyload.min.js',
				base.kia + '/libs/waypoint.js',
				base.kia + '/js/kia-map.js',
				base.kia + '/js/common.js', // Custom scripts. Always at the end
			],
			dest:       base.kia + '/js',
			output:     'main-scripts.min.js',
		},
		scripts_service: {
			src: [
				base.kia + '/libs/jquery/dist/jquery.min.js',
				base.kia + '/libs/Magnific-Popup-master/jquery.magnific-popup.js',
				'node_modules/slick-1.8.1/slick/slick.min.js',
				base.kia + '/libs/animate-css.js',
				base.kia + '/libs/lazyload.min.js',
				base.kia + '/libs/waypoint.js',
				base.kia + '/js/kia-map.js',
				base.kia + '/js/service-common.js', // Custom scripts. Always at the end
			],
			dest:       base.kia + '/js',
			output:     'service-scripts.min.js',
		},