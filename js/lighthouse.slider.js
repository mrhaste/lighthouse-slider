var sliderWidth = sliderHeight = 0;
var tid; // timer interval

// as the page loads, call these scripts
jQuery(document).ready(function($) {
	initialiseSlider();
	$(document).on('click', '.slider-nav a', function(e){
		if (e.originalEvent) {
			stopAutoSlide();
		}
		sliderWidth = $('.slider .mask').width();
		$('.item-container .item').removeClass('selected');
		$('.slider-nav a').removeClass('selected');
		$(this).addClass('selected');
		//work out which one has been clicked
		var n = $(this).parent('li').data('order');
		$('.item-container').animate({"margin-left":"-"+(sliderWidth*n)+'px'}, 500);
		$('.item-container .item[data-order='+(n)+']').addClass('selected');
		return false;
	});
});

jQuery('body').on('click', '.slider .arrow', function(e){
	if (e.originalEvent) {
		stopAutoSlide();
	}
	
	var n = jQuery('.item-container .selected').data('order');
	jQuery('.item-container .item, .slider-nav a').removeClass('selected');
	
	sliderWidth = jQuery('.slider .mask').width();
	sliderHeight = jQuery('.slider .mask').height();
	
	var reset = false;
	if (parseInt(n+1) > window.sliderCount) {
		reset = true;
		n = 0;
	}
	
	if (reset) {
		jQuery('.slider-nav li[data-order=1] a').addClass('selected');
	}
	
	jQuery('.item-container').animate({"margin-left":"-="+sliderWidth+'px'}, function(){ 
		if (reset) {
			jQuery('.item-container').css('margin-left','-' + sliderWidth + 'px');
			jQuery('.item-container .item').removeClass('selected');
			jQuery('.item[data-order=1]').addClass('selected');	
		}
	});

	jQuery('.item[data-order='+(n+1)+']').addClass('selected');
	jQuery('.slider-nav li[data-order='+(n+1)+'] a').addClass('selected');
		
	return false;
});

function stopAutoSlide() { 
  clearInterval(window.tid);
}

function initialiseSlider() {
	clearInterval(window.tid);
	// slider controls
	var slider = jQuery('.slider');
	if ( slider.length > 0 ) {
		
		if (jQuery('.slider').hasClass('autoslide')) {
			// set interval
			window.tid = setInterval(rotateSlider, 4000);
			function rotateSlider() {
			  jQuery('.slider .arrow.right').click();
			}
			//rotateSlider();
		}
		
		sliderWidth = jQuery('.slider').width();
		sliderHeight = jQuery('.slider').height();
		jQuery('.slider .mask').css({
			'height':sliderHeight+'px',
			'width':sliderWidth+'px',
		});
		jQuery('.slider .item').css({
			'width':sliderWidth+'px',
			'height':sliderHeight+'px'
		});
		jQuery('.slider .item').css('height',sliderHeight+'px');
		window.sliderCount = jQuery('.mask .item').length;
		jQuery('.item-container').css('width',((sliderCount+2)*sliderWidth)+'px')
		var sliderMargin = parseInt( jQuery('.item-container').css('margin-left') );
		
		jQuery('.item-container').append(jQuery('.item[data-order=1]').clone().attr('data-order', window.sliderCount + 1));
		jQuery('.item-container').prepend(jQuery('.item[data-order=' + window.sliderCount + ']').clone().attr('data-order', 0));
		
		jQuery('.item-container').css('margin-left','-' + sliderWidth + 'px');
		
		jQuery('.item[data-order=1]').addClass('selected');
		
	}	
}