;(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);
	var animatedElements = '.block-sectors-links, .block-innovation, .block-boundless, .visiteurs, .block-double, .block-playlist, .block-pub, .article_list .la-item'; 
	var timer, timer2;


	// Scroll down animation
	function animateElement(winO) {
		var $animate = $(animatedElements);

		$animate.each(function(){
			var $this = $(this);
			var offset = $this.offset().top;

			if (winO + ($win.outerHeight() * 0.8) > offset) {
				$this.addClass('animated');
			}
		});

		if (winO + $win.outerHeight() > $('.site-footer').offset().top) {
			$animate.addClass('animated');
		}
	}

	$doc.ready(function() {
		if ($('.fix-bg').length) {
			$('.fix-bg').each(function(){
				$(this).css({
					'backgroundImage': 'url(' + $(this).find('.background').attr('src') + ')'
				});
			});
		}

		$('body').append($('.header-socials').clone().removeClass().addClass('sticky-socials'));

		$(window).unbind('scroll mousewheel DOMMouseScroll MozMousePixelScroll');

		if ($('.quicklinks.objectifs').length) {
			$('.quicklinks.objectifs').wrapInner('<div class="shell"></div>')
		}

		// Focus Search 
		$('.gsf-trigger').on('click', function() {
			setTimeout(function() {
				$('.gsf-input').trigger('focus');
			}, 500);
		});

		// Accordion 
		if( $('.accordion').length ) {
			$('.accordion').each(function() {
				$(this).find('.accordion-section').eq(0).find('.accordion-body').slideDown();
			});

			$('.accordion-head').on('click', function() {
				$(this).closest('.accordion-section').addClass('accordion-expanded').siblings().removeClass('accordion-expanded');
				$(this).closest('.accordion-section').find('.accordion-body').slideDown();
				$(this).closest('.accordion-section').siblings().find('.accordion-body').slideUp();
			});
		}

		var navOffset = $('.main-navigation').offset().top;

		if( $('.lien4').length ) {
			$('<i class="ico-download"></i>').prependTo( $('.lien4') );
		}

		if( $('.article-navigation .an-item-illust').length ) {
			$('.article-navigation .an-item-illust').wrap('<div class="an-item-illust-wrapper"></div>');
		}

		if( $('.article-navigation .an-item').length ) {
			$('<div class="an-item-illust-placeholder"></div>').prependTo( $('.article-navigation .an-item-previous > a') );
			$('<div class="an-item-illust-placeholder"></div>').appendTo( $('.article-navigation .an-item-next > a') );

			$('.article-navigation .an-item').each(function() {
				if( !$(this).find('.an-item-illust').length ) {
					$(this).addClass('visible');
				}
			});
		}

		$(window).on('load scroll', function() {
			var winO = $(window).scrollTop();

			animateElement(winO);

			if( winO > navOffset ) {
				$('header.site-banner').addClass('header-fixed');

				setTimeout(function() {
					$('header.site-banner').addClass('header-show');
					$('#zone3').addClass('top');
				}, 10);
			} else {
				$('header.site-banner').removeClass('header-fixed header-show');
				$('#zone3').removeClass('top');
			}

			if( $('.block.quicklinks.cta ul li').length || $('.list-stats li').length) {
				var $target = $('.block.quicklinks.cta').length ? $('.block.quicklinks.cta') : $('.list-stats');
				var linksOffset = $target.offset().top;

				if ($target.is('.list-stats')) {
					$('.list-stats').addClass('loaded');
				}

				$target.find('li').each(function(index) {
					$(this).find('.btn-primary, > span span, > span i').css({
						'-webkit-transition-delay': index * .2 + 's',
						'-moz-transition-delay': index * .2 + 's',
						'-ms-transition-delay': index * .2 + 's',
						'-o-transition-delay': index * .2 + 's',
						'transition-delay': index * .2 + 's'
					});
				});

				setTimeout(function() {
					if( winO > linksOffset - $(window).height() * .8 ) {
						$target.find('.btn-primary, li > span').addClass('animate');				
					}
				}, 500);
			}
		});

		$win.on('load', function() {
			if ($('.slider-intro').length && $('.slider-intro .slide').length > 1) {
				$('.slider-intro').carouFredSel({
					items: {
						visible: 1,
						width: 'variable'
					},
					scroll: {
						fx: 'crossfade',
						duration: 700
					},
					auto: {
						play: true,
						timeoutDuration: 7000
					},
					pagination: {
						container: $('.slider-container').find('.slider-paging')
					}
				});
			}

			// Newsletter form
			if ($('.newsletter-form').length) {
				var $form = $('.newsletter-form');

				$form.find('.nf-form-input input').attr('placeholder', 'Votre email');
				$form.find('.nf-main-content').append('<a href="#" class="form-close"/>');

				$('[href*="#newsletter"]').on('click', function(e){
					e.preventDefault();

					$form.addClass('form-shown');
				});

				$doc.on('click', function(e){
					var $target = $(e.target);

					if (($target.is('.form-close, .form-close *') || !$target.is('.nf-main-content, .nf-main-content *, [href*="#newsletter"], [href*="#newsletter"] *')) && $form.hasClass('form-shown')) {
						e.preventDefault();

						$form.removeClass('form-shown');
					}
				});

				if (window.location.href.indexOf('#newsletter') >= 0) {
					$form.addClass('form-shown');
				}
			}


			$('header').removeClass('is-stuck');

			if( $('#zone1 .la-slider').length ) {
				var $sliderMain =  $('#zone1 .la-slider').clone();
				$('#zone1 .la-slider').detach();
				$sliderMain.prependTo('.front #zone1 .list-articles');

				$('#zone1 .la-slider .slider-content .la-item-content').wrap('<div class="la-item-content-outer"></div>');

				$('.la-item-content-outer').css({
					'width': '100%',
					'maxWidth': '1120px',
					'margin': '0 auto',
					'height': '370px',
					'display': 'table',
					'verticalAlign': 'middle',
					'position': 'relative',
					'zIndex': '10'
				});

				var pagingSize = $sliderMain.find('.slider-item').length;
				var $sliderPaging = '<ol class="slider-paging"></ol>';

				$($sliderPaging).appendTo( $('#zone1 .la-slider') );
				$('<div class="slider-paging-hidden"></div>').appendTo( $('#zone1 .la-slider') );

				$('#zone1 .la-slider .swiper-wrapper').attr('style', '');

				for( var i = 0; i < pagingSize; i++ ) {
					var index = i + 1;

					if( index < 10 ) {
						index = '0' + index;
					}

					$('<li><a href="#">' + index + '</a></li>').appendTo( $('#zone1 .la-slider ol.slider-paging') );
				}

				setTimeout(function() {
					$('#zone1 .la-slider .slider-content').carouFredSel({
						width: '100%',
						circular: true,
						infinite: true,
						responsive: true,
						swipe: true,
						auto: {
							play: true,
							timeoutDuration: 7000
						},
						pagination: {
							container: '#zone1 .la-slider .slider-paging-hidden',
							anchorBuilder: true
						},
						onCreate: function() {
							var $slider = $(this);

							timer = setTimeout(function() {
								$slider.addClass('animate-out');
							}, 5700);

							setTimeout(function() {
								$slider.addClass('animate-in');
								var idx = $('#zone1 .la-slider .slider-paging-hidden .selected').index();
								$('#zone1 .la-slider').find('.slider-paging li').eq(idx).addClass('active');
							}, 500);

							$('#zone1 .la-slider .slider-paging a').on('click', function(event) {
								event.preventDefault();

								var index = $(this).parent().index();
								$(this).parent().addClass('active')
									.siblings().removeClass('active');

								$slider.addClass('animate-out');

								setTimeout(function() {
									$slider.trigger('slideTo', index);
								}, 1200);
							});
						},
						scroll: {
							fx: 'crossfade',
							duration: 0,
							pauseOnHover: false,
							onBefore: function() {
								var $slider = $(this);

								clearTimeout(timer);
								clearTimeout(timer2);

								$slider.removeClass('animate-out animate-in');
							},
							onAfter: function() {
								var $slider = $(this);


								setTimeout(function() {
								var idx = $('#zone1 .la-slider .slider-paging-hidden .selected').index();

								$('#zone1 .la-slider').find('.slider-paging li').eq(idx).addClass('active')
									.siblings().removeClass('active');
									$slider.addClass('animate-in');	

								}, 500);

								timer2 = setTimeout(function() {
									$slider.addClass('animate-out');
								}, 5700);
							}
						}						
					});

					$('#zone1 .list-articles').addClass('loaded');
				}, 3000);
			}

			if( $('#zone1 .partner.visiteurs .partner-gallery .slider-content').length ) {
				var $sliderPartner =  $('#zone1 .partner.visiteurs .partner-gallery .slider-content').clone();
				$('#zone1 .partner.visiteurs .partner-gallery .slider-content').detach();
				$sliderPartner.appendTo('.front #zone1 .partner.visiteurs .inside');

				$sliderPartner.find('.pg-item').each(function(index) {
					if( index % 2 === 0 ) {
						$(this).addClass('even');
						$(this).addClass('bubble-down');
					} else {
						$(this).addClass('bubble-up');						
					}

				});		

				$sliderPartner.carouFredSel({
					width: '100%',
					circular: true,
					infinite: true,
					responsive: true,					
					auto: {
						play: true,
						timeoutDuration: 0
					},
					items: {
						visible: 9
					},
					scroll: {
						duration: 60000,
						easing: 'linear'
					}
				});
			}
		});
		
		if ( $('#youmax').length ) {
		// Init Youtube Videos Slider
				
		$('#youmax').youmax({
			apiKey: 'AIzaSyCNbIqgoVrq7IPkHr_NBMquEXAFu9zv474',
			vimeoAccessToken: '',
			clientId: '438137961980-vlefbf8sgps4r5fqon9u92m93n0hc1pi.apps.googleusercontent.com',
			channel: '',
			youtube_playlist_videos: [{
				name: 'Videos',
				url: 'https://www.youtube.com/playlist?list=PLXejX05KCwBGpkz7nYFWQT0_VS7MLuZUM',
				selected: true
			}],
			
			loadMode: 'paginate-sides',
			loadButtonSize: 'small',
			hideHeader: true,
			hideNavigation: true,
			hideComments: true,
			maxResults: 4,
			tabStyle: 'wire',
			youmaxBackgroundColor: '#ffffff',
			maxContainerWidth: 1120,
			fourColumnThumbnailWidth: '21.429%',
  			fourColumnThumbnailLeftRightMargin: '1.78%',
  			videoProtocol: 'https:'
		});
	};
		

	});

})(jQuery, window, document);
