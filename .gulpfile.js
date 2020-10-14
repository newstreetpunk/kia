// VARIABLES & PATHS
let preprocessor = 'sass', // Preprocessor (sass, scss, less, styl)
    fileswatch   = 'html,htm,txt,json,md,woff2,php', // List of files extensions for watching & hard reload (comma separated)
    pageversion  = 'html,htm,php', // List of files extensions for watching change version files (comma separated)
    imageswatch  = 'jpg,jpeg,png,webp,svg', // List of images extensions for watching & compression (comma separated)
    online       = true, // If «false» - Browsersync will work offline without internet connection
    basename     = require('path').basename(__dirname),
    forProd      = [
					'/**',
					' * @author Alexsab.ru',
					' */',
					''].join('\n');

const { src, dest, parallel, series, watch, task } = require('gulp'),
	sass           = require('gulp-sass'),
	cleancss       = require('gulp-clean-css'),
	concat         = require('gulp-concat'),
	browserSync    = require('browser-sync').create(),
	uglify         = require('gulp-uglify-es').default,
	autoprefixer   = require('gulp-autoprefixer'),
	imagemin       = require('gulp-imagemin'),
	newer          = require('gulp-newer'),
	rsync          = require('gulp-rsync'),
	del            = require('del'),
	connect        = require('gulp-connect-php'),
	header         = require('gulp-header'),
	notify         = require('gulp-notify'),
	rename         = require('gulp-rename'),
	responsive     = require('gulp-responsive'),
	pngquant       = require('imagemin-pngquant'),
	merge          = require('merge-stream'),
	// version        = require('gulp-version-number'),
	// revAll         = require('gulp-rev-all'),
	replace        = require('gulp-replace');

if(typeof projects == 'undefined') 
	global.projects = {};
if(typeof port == 'undefined') 
	global.port = 8100;


projects.newstreetpunk_kia = {

	port: ++port,

	base: basename,
	dest: basename,

	styles_promo: {
		src:    basename + '/' + preprocessor + '/main.'+preprocessor,
		watch:    basename + '/' + preprocessor + '/**/*.'+preprocessor,
		dest:   basename + '/css',
		output: 'main.css',
	},
	styles_service: {
		src:    basename + '/' + preprocessor + '/service-style.'+preprocessor,
		watch:    basename + '/' + preprocessor + '/**/*.'+preprocessor,
		dest:   basename + '/css',
		output: 'service-style.css',
	},
	styles_cars: {
		src:    basename + '/' + preprocessor + '/cars-style.'+preprocessor,
		watch:    basename + '/' + preprocessor + '/**/*.'+preprocessor,
		dest:   basename + '/css',
		output: 'cars-style.css',
	},
	styles_model: {
		src:    basename + '/' + preprocessor + '/model-style.'+preprocessor,
		watch:    basename + '/' + preprocessor + '/**/*.'+preprocessor,
		dest:   basename + '/css',
		output: 'model-style.css',
	},

	scripts_promo: {
		src: [
			basename + '/libs/jquery/dist/jquery.min.js',
			basename + '/libs/Magnific-Popup-master/jquery.magnific-popup.js',
			basename + '/libs/range/range.js',
			basename + '/libs/animate-css.js',
			basename + '/libs/jquery.mb.YTPlayer.min.js',
			basename + '/libs/lazyload.min.js',
			basename + '/libs/waypoint.js',
			basename + '/js/kia-map.js',
			basename + '/js/common.js', // Custom scripts. Always at the end
		],
		dest:       basename + '/js',
		output:     'main-scripts.min.js',
	},
	scripts_service: {
		src: [
			basename + '/libs/jquery/dist/jquery.min.js',
			basename + '/libs/Magnific-Popup-master/jquery.magnific-popup.js',
			'node_modules/slick-carousel/slick/slick.js',
			basename + '/libs/animate-css.js',
			basename + '/libs/lazyload.min.js',
			basename + '/libs/waypoint.js',
			basename + '/js/kia-map.js',
			basename + '/js/service-common.js', // Custom scripts. Always at the end
		],
		dest:       basename + '/js',
		output:     'service-scripts.min.js',
	},
	scripts_cars: {
		src: [
			basename + '/libs/jquery/dist/jquery.min.js',
			basename + '/libs/Magnific-Popup-master/jquery.magnific-popup.js',
			basename + '/libs/range/range.js',
			basename + '/libs/animate-css.js',
			basename + '/libs/lazyload.min.js',
			basename + '/libs/waypoint.js',
			basename + '/js/cars-common.js', // Custom scripts. Always at the end
		],
		dest:       basename + '/js',
		output:     'cars-scripts.min.js',
	},
	scripts_model: {
		src: [
			basename + '/libs/jquery/dist/jquery.min.js',
			basename + '/libs/Magnific-Popup-master/jquery.magnific-popup.js',
			basename + '/libs/range/range.js',
			basename + '/libs/animate-css.js',
			basename + '/libs/lazyload.min.js',
			basename + '/libs/waypoint.js',
			basename + '/js/model-common.js', // Custom scripts. Always at the end
		],
		dest:       basename + '/js',
		output:     'model-scripts.min.js',
	},
	code: {
		src: [
			basename  + '/**/*.{' + fileswatch + '}',
			'!' + basename + '/cars.json'
		],
	},

	forProd: [
		'/**',
		' * @author https://github.com/newstreetpunk',
		' * @editor https://github.com/alexsab',
		' */',
		''].join('\n'),
}



/* newstreetpunk_kia BEGIN */

// Local Server
function newstreetpunk_kia_browsersync() {
	connect.server({
		port: projects.newstreetpunk_kia.port,
		base: projects.newstreetpunk_kia.base,
	}, function (){
		browserSync.init({
			// server: { baseDir: projects.newstreetpunk_kia.base + '/' },
			proxy: '127.0.0.1:' + projects.newstreetpunk_kia.port,
			notify: false,
			online: online
		});
	});
};

// Custom Styles
function newstreetpunk_kia_styles_promo() {
	return src(projects.newstreetpunk_kia.styles_promo.src)
	.pipe(eval(preprocessor)({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(concat(projects.newstreetpunk_kia.styles_promo.output))
	.pipe(autoprefixer({ grid: true, overrideBrowserslist: ['last 10 versions'] }))
	// .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
	.pipe(dest(projects.newstreetpunk_kia.styles_promo.dest))
	.pipe(browserSync.stream())

};
function newstreetpunk_kia_styles_service() {
	return src(projects.newstreetpunk_kia.styles_service.src)
	.pipe(eval(preprocessor)({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(concat(projects.newstreetpunk_kia.styles_service.output))
	.pipe(autoprefixer({ grid: true, overrideBrowserslist: ['last 10 versions'] }))
	// .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
	.pipe(dest(projects.newstreetpunk_kia.styles_service.dest))
	.pipe(browserSync.stream())

};
function newstreetpunk_kia_styles_cars() {
	return src(projects.newstreetpunk_kia.styles_cars.src)
	.pipe(eval(preprocessor)({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(concat(projects.newstreetpunk_kia.styles_cars.output))
	.pipe(autoprefixer({ grid: true, overrideBrowserslist: ['last 10 versions'] }))
	// .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
	.pipe(dest(projects.newstreetpunk_kia.styles_cars.dest))
	.pipe(browserSync.stream())

};
function newstreetpunk_kia_styles_model() {
	return src(projects.newstreetpunk_kia.styles_model.src)
	.pipe(eval(preprocessor)({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(concat(projects.newstreetpunk_kia.styles_model.output))
	.pipe(autoprefixer({ grid: true, overrideBrowserslist: ['last 10 versions'] }))
	// .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Optional. Comment out when debugging
	.pipe(dest(projects.newstreetpunk_kia.styles_model.dest))
	.pipe(browserSync.stream())

};


// Scripts & JS Libraries
function newstreetpunk_kia_scripts_promo() {
	return src(projects.newstreetpunk_kia.scripts_promo.src)
	.pipe(concat(projects.newstreetpunk_kia.scripts_promo.output))
	// .pipe(uglify()) // Minify js (opt.)
	.pipe(header(projects.newstreetpunk_kia.forProd))
	.pipe(dest(projects.newstreetpunk_kia.scripts_promo.dest))
	.pipe(browserSync.stream())
};
function newstreetpunk_kia_scripts_service() {
	return src(projects.newstreetpunk_kia.scripts_service.src)
	.pipe(concat(projects.newstreetpunk_kia.scripts_service.output))
	// .pipe(uglify()) // Minify js (opt.)
	.pipe(header(projects.newstreetpunk_kia.forProd))
	.pipe(dest(projects.newstreetpunk_kia.scripts_service.dest))
	.pipe(browserSync.stream())
};
function newstreetpunk_kia_scripts_cars() {
	return src(projects.newstreetpunk_kia.scripts_cars.src)
	.pipe(concat(projects.newstreetpunk_kia.scripts_cars.output))
	// .pipe(uglify()) // Minify js (opt.)
	.pipe(header(projects.newstreetpunk_kia.forProd))
	.pipe(dest(projects.newstreetpunk_kia.scripts_cars.dest))
	.pipe(browserSync.stream())
};
function newstreetpunk_kia_scripts_model() {
	return src(projects.newstreetpunk_kia.scripts_model.src)
	.pipe(concat(projects.newstreetpunk_kia.scripts_model.output))
	// .pipe(uglify()) // Minify js (opt.)
	.pipe(header(projects.newstreetpunk_kia.forProd))
	.pipe(dest(projects.newstreetpunk_kia.scripts_model.dest))
	.pipe(browserSync.stream())
};

function newstreetpunk_kia_watch() {
	watch(projects.newstreetpunk_kia.styles_promo.watch, newstreetpunk_kia_styles_promo);
	watch(projects.newstreetpunk_kia.styles_service.watch, newstreetpunk_kia_styles_service);
	watch(projects.newstreetpunk_kia.styles_cars.watch, newstreetpunk_kia_styles_cars);
	watch(projects.newstreetpunk_kia.styles_model.watch, newstreetpunk_kia_styles_model);
	watch(projects.newstreetpunk_kia.scripts_promo.src, newstreetpunk_kia_scripts_promo);
	watch(projects.newstreetpunk_kia.scripts_service.src, newstreetpunk_kia_scripts_service);
	watch(projects.newstreetpunk_kia.scripts_cars.src, newstreetpunk_kia_scripts_cars);
	watch(projects.newstreetpunk_kia.scripts_model.src, newstreetpunk_kia_scripts_model);

	watch(projects.newstreetpunk_kia.code.src).on('change', browserSync.reload);
};

module.exports = parallel(newstreetpunk_kia_styles_promo, newstreetpunk_kia_styles_service, newstreetpunk_kia_styles_cars, newstreetpunk_kia_styles_model, newstreetpunk_kia_scripts_promo, newstreetpunk_kia_scripts_service, newstreetpunk_kia_scripts_cars, newstreetpunk_kia_scripts_model, newstreetpunk_kia_browsersync, newstreetpunk_kia_watch);


/* newstreetpunk_kia END */
