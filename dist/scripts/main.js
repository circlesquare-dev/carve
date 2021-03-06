// Parallax amination start

'use strict';

function animateProducts(productAnimate, productCover) {
	var xAnimation = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
	var yAnimation = arguments.length <= 3 || arguments[3] === undefined ? 60 : arguments[3];
	var opacityAnimation = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
	var topOffset = arguments.length <= 5 || arguments[5] === undefined ? 400 : arguments[5];
	var mainDelay = arguments.length <= 6 || arguments[6] === undefined ? 0.25 : arguments[6];

	var productItem = productAnimate;
	var section = productCover;

	if (!$(section).length) {
		return;
	}

	TweenMax.set(productItem, {
		y: yAnimation,
		x: xAnimation,
		autoAlpha: opacityAnimation,
		transition: 'none'
	});

	var tl = new TimelineMax({ delay: mainDelay }).staggerTo(productItem, 0.4, {
		y: 0,
		x: 0,
		autoAlpha: 1,
		clearProps: 'transition, transform, opacity',
		ease: Power1.easeOut
	}, 0.15);

	var controller = new ScrollMagic.Controller({
		globalSceneOptions: {
			triggerHook: 'onEnter'
		}
	});

	// build scenes
	new ScrollMagic.Scene({
		triggerElement: section,
		offset: topOffset,
		reverse: true
	}).setTween(tl).addTo(controller);
}

function addAnimateClass(productAnimate, productCover) {
	var classItem = arguments.length <= 2 || arguments[2] === undefined ? 'k-animate' : arguments[2];
	var repeatAnimation = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	var offsetTop = arguments.length <= 4 || arguments[4] === undefined ? 300 : arguments[4];
	var durItem = arguments.length <= 5 || arguments[5] === undefined ? 0.5 : arguments[5];
	var delayItem = arguments.length <= 6 || arguments[6] === undefined ? 0.15 : arguments[6];

	var productItem = productAnimate;
	var section = productCover;

	if (!$(section).length) {
		return;
	}

	var tl = new TimelineMax().staggerTo(productItem, durItem, { css: { className: '+=' + classItem } }, delayItem);

	var controller = new ScrollMagic.Controller({
		globalSceneOptions: {
			triggerHook: 'onEnter'
		}
	});

	// build scenes
	new ScrollMagic.Scene({
		triggerElement: section,
		offset: offsetTop,
		reverse: repeatAnimation
	}).setTween(tl).on("end", function (e) {
		$(productItem).toggleClass('end-parallax');
	}).addTo(controller);
}

// Parallax animation end

function readyPage() {
	if (!mobDev) {
		animateProducts('.main-cover .fade-up', '.main-cover', 0, 60, 0, 0, 0.7);
	}
}

// Animation just for web start
$(document).ready(function () {
	if (!mobDev) {
		// Bg circles Animation start

		animateProducts('.partners .bg-icons', '.partners', 0, 10, 1);
		animateProducts('.how-it-works .bg-icons', '.how-it-works', 0, 30, 1);
		animateProducts('.our-cars .bg-icons', '.our-cars', 0, 40, 1, -200);

		// Bg circles Animation end

		animateProducts('.partner_img .k-img', '.partners');
		animateProducts('.how-it-works .fade-up', '.how-it-works');
		animateProducts('.platform-info .fade-up', '.platform-info');
		animateProducts('.our-cars .fade-up', '.our-cars');
		animateProducts('.testimonials .fade-up', '.testimonials');
		animateProducts('.testimonials .tt-info', '.testimonials-items', '0', 60, 0, 300, 0.7);
	}

	// animation for images start

	addAnimateClass('.hw-img1 .k-norm', '.hw-img1');
	addAnimateClass('.hw-img2 .k-norm', '.hw-img2');
	addAnimateClass('.hw-img3 .k-norm', '.hw-img3');

	addAnimateClass('.ims-img1 .k-norm', '.ims-img1');
	addAnimateClass('.ims-img2 .k-norm', '.ims-img2');
	addAnimateClass('.ims-img3 .k-norm', '.ims-img3');
	addAnimateClass('.ims-img4 .k-norm', '.ims-img4');

	addAnimateClass('.testimonials', '.testimonials', 'focusIn', true, '800');

	// animation for images end

	// } else {
	// 	$('body').addClass('show-img');
	// }

	// Animation just for web end
});
; // Preloader start

$('.preloader__ico').fadeIn('slow');

$(window).on('load', function () {
	setTimeout(function () {
		$('.preloader').fadeOut('slow');
		readyPage();
	}, 1000);
});

// Preloader end

var mobDev = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
// let mobDev = false;

var timeout = false;
function toggleArrow(arrowClass) {
	var item = arrowClass;
	$(item).addClass('active-bounch');
	setTimeout(function () {
		$(item).removeClass('active-bounch');
	}, 2000);
}

function checkActivity(itemActive) {
	var item = itemActive;
	clearTimeout(timeout);
	timeout = setTimeout(function () {
		toggleArrow(item);
	}, 5000);
}
document.addEventListener('keydown', checkActivity);
document.addEventListener('mousedown', checkActivity);
document.addEventListener('mousemove', checkActivity);

$(window).on('scroll', function () {
	// $('video').each(function(){
	// 	if ($(this).is(":in-viewport")) {
	// 		$(this)[0].play();
	// 	} else {
	// 		$(this)[0].pause();
	// 	}
	// });
	if ($('.pi-slider_wrap').is(":in-viewport")) {
		checkActivity('.pi-next');
	}
});

$(document).ready(function () {

	if (!mobDev) {
		$('.data-picker').each(function () {
			$(this).attr('type', 'text').addClass('datetimepicker-input').attr('data-toggle', 'datetimepicker');
		});

		// Data script start

		$('.pickup_data').datetimepicker({
			format: 'DD.MM.YYYY'
		});

		$('.dropoff_data').datetimepicker({
			format: 'DD.MM.YYYY',
			useCurrent: false
		});

		$(".pickup_data").on("change.datetimepicker", function (e) {
			$('.dropoff_data').datetimepicker('minDate', e.date);
		});
		$(".dropoff_data").on("change.datetimepicker", function (e) {
			$('.pickup_data').datetimepicker('maxDate', e.date);
		});

		// $('.pickup_time').datetimepicker({
		// 	format: 'HH:mm',
		// 	stepping: 30,
		// 	useCurrent: false,
		// });
		// $('.dropoff_time').datetimepicker({
		// 	format: 'HH:mm',
		// 	stepping: 30,
		// 	useCurrent: false
		// });

		// Data script end
	}

	// slider for cover section start

	$('.pi-slider').slick({
		infinite: true,
		fade: true,
		dots: true,
		autoplay: true,
		focusOnSelect: true,
		prevArrow: '.pi-prev',
		nextArrow: '.pi-next',
		dotsClass: 'slider_dots',
		responsive: [{
			breakpoint: 820,
			settings: {
				fade: false
			}
		}]
	});
	$('.oc-slider').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		focusOnSelect: true,
		prevArrow: '.oc-prev',
		nextArrow: '.oc-next',
		dotsClass: 'slider_dots',
		responsive: [{
			breakpoint: 1367,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				prevArrow: '.oc-prev',
				nextArrow: '.oc-next'
			}
		}, {
			breakpoint: 820,
			settings: {
				slidesToShow: 2,
				variableWidth: true
			}
		}, {
			breakpoint: 767,
			settings: {
				slidesToShow: 1,
				variableWidth: true
			}
		}]
	});

	if ($(window).width() <= 820) {
		$('.partners_slider').slick({
			arrows: false,
			infinite: true,
			centerMode: true,
			autoplay: true,
			variableWidth: true,
			slidesToShow: 1
		});
		$('.tt-items').slick({
			arrows: false,
			autoplay: true,
			autoplaySpeed: 5000,
			dots: true,
			dotsClass: 'slider_dots',
			slidesToShow: 1
		});
	}

	if ($('.bg-video_slider').length) {
		(function () {
			var resetVideo = function resetVideo(videoClass) {
				$(videoClass).each(function () {
					$(this).get(0).pause();
					$(this).get(0).load();
				});
			};

			var playVideo = function playVideo(videoItem) {
				videoItem.get(0).play();
			};

			var myHandler = function myHandler(e) {
				$('.bg-video_slider').slick('slickNext');
			};

			$('.bg-video_slider').on('init', function (slick) {
				resetVideo('.video-bg');
				var currentSlide = $(this).find('.slick-current');
				var eltVideo = $(currentSlide).children('.video-bg');
				playVideo(eltVideo);
			});

			$('.bg-video_slider').slick({
				arrows: false,
				fade: true
			});

			$('.video-bg').each(function () {
				$(this).get(0).addEventListener('ended', myHandler, false);
			});

			$('.bg-video_slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
				var elt = slick.$slides.get(currentSlide);
				var eltVideo = $(elt).children('.video-bg');
				playVideo(eltVideo);
			});
		})();
	}

	// slider for cover section end

	// Smooth anchor scroll start

	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top
		}, 500);
	});

	// Smooth anchor scroll end

	// Hamburger menu start

	$('.hamburger').on('click', function () {
		var $containerMob = $('.main-header');
		var $mobMenu = $('.mob-menu');
		var $thisActive = $containerMob.hasClass('active');

		if ($thisActive) {
			$containerMob.removeClass('active');
			$mobMenu.removeClass('active');
		} else {
			$containerMob.addClass('active');
			$mobMenu.addClass('active');
		}
	});

	// Hamburger menu end
});

;function parallaxScroll(coverSection, parallaxItem) {
	var yAnimate = arguments.length <= 2 || arguments[2] === undefined ? '-40%' : arguments[2];
	var yStart = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
	var offsetTop = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
	var mainDur = arguments.length <= 5 || arguments[5] === undefined ? '200%' : arguments[5];

	var cSection = coverSection,
	    pItem = parallaxItem,
	    controller = new ScrollMagic.Controller({ globalSceneOptions: { triggerHook: "onEnter", duration: mainDur } });

	TweenMax.set(pItem, {
		y: yStart
	});

	// build scenes
	new ScrollMagic.Scene({
		triggerElement: cSection,
		offset: offsetTop
	}).setTween(pItem, { y: yAnimate, ease: Linear.easeNone }).setClassToggle(pItem, "active").on("end", function (e) {
		$(pItem).toggleClass('end-parallax');
	}).addTo(controller);
}

function newParallax(coverSection, parallaxItem, itemWrap) {
	var coverTop = $(coverSection).offset().top + 90;
	var itemTop = $(parallaxItem).offset().top;
	var itemHeight = $(parallaxItem).height();
	var durHeight = itemTop - coverTop;
	var controller = new ScrollMagic.Controller();

	$('.tt-title_parallax').css({
		'position': 'absolute'
	});
	$(itemWrap).css('height', itemHeight);
	$(parallaxItem).offset({ top: coverTop });

	new ScrollMagic.Scene({ triggerElement: coverSection, duration: durHeight, offset: 200 }).setPin(parallaxItem).addTo(controller);
}

// if (!mobDev) {
parallaxScroll('.how-it-works', '.hw-img1', '-30%');
parallaxScroll('.how-it-works', '.hw-img2', '-60%');
parallaxScroll('.how-it-works', '.hw-img3', '-70%');

parallaxScroll('.img-section', '.ims-img1', '-47%');
parallaxScroll('.img-section', '.ims-img2', '-62%');
parallaxScroll('.img-section', '.ims-img3, .ims-img4');

parallaxScroll('.img-section', '.img-section .bg-icons', '5%');

if (!mobDev) {
	parallaxScroll('.img-section', '.tt-title', '1px', '-700px', '900', '100%');
} else {
	newParallax('.img-section', '.tt-title', '.tt-title_wrap');
	addAnimateClass('.tt-title', '.testimonials', 'end-parallax', true, '600');
	addAnimateClass('.tt-title', '.img-section', 'scroll-it', true, '600');
}