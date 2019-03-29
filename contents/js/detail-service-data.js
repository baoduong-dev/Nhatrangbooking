// for detail tour, service, hotel

$(function() {

  $('.rest-star .star').barrating({
    theme: 'fontawesome-stars',
    readonly: true
  });

  $('.rating-star').barrating({
    theme: 'fontawesome-stars',
    readonly: true
  });

  var device = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);
  var related_height = $('.related').height();
  var footer_height = $('footer').height();
  
  
  var top,
      left,
      tab_element = $('.tab-elements'),
      right_side = $('.right-side'),
      price_o = right_side.find('.new-price'),
      price_booking = $('#price_booking');


  tab_element.find('a').on('click', function() {
    var target = $(this).attr('href');
    $('html,body').animate({
      scrollTop: $(target).offset().top - 80
    }, 250)
    
  })

  function fixedMobile() {
    function getRightSidePosition(top,element) {
      
      $(document).on('scroll', function() {
        if ($(this).scrollTop() > top && $(this).scrollTop() < ($(document).height() - (related_height + footer_height) * 1.5)) {
          element.addClass('fixed');
          // right_side.addClass('fixed');
          // tab_element.addClass('fixed');
        } else {
          //right_side.removeClass('fixed');
          //tab_element.removeClass('fixed');
          element.removeClass('fixed');
          // right_side.css('left', 0);
        }
        
      });
    }
    

    // auto fixed right side
    if (tab_element.length) {
      top = tab_element.offset().top;
      getRightSidePosition(top,tab_element);
    }

    
    getRightSidePosition(400, right_side);
    
    // left = right_side.offset().left.toFixed();
    

    // if (tab_element.hasClass('fixed')) {
    //   alert('fixed')
    //   //$(tab_element[0].parentElement).append(`<div style="height:${tab_element.height()}px"></div>`);
    // } else {
    //   //$(tab_element[0].parentElement).find('div[style]').remove();
    // }

    // auto append call hotline on modal, for mobile
    // after click call hotline button, show #modal_hotline
    var callHtml = [];
    var modalHotline = $('#modal_hotline');

    $('.hotline .call > a').each(function() {
      callHtml.push($(this));
    });
    modalHotline.find('.modal-content').append('<div></div>');

    if (callHtml.length > 1) {
      return callHtml.forEach(function(call) {
        return modalHotline.find('.modal-content div').append(`${call[0].outerHTML}`);
      });
    } else {
      modalHotline.find('.modal-content div').append(`${callHtml[0][0].outerHTML}`);
      modalHotline.find('.modal-content div > a').addClass('only-one');
    }
  }

  function fixedDesk() {
     // auto follow
    function getRightSidePosition(top,left) {
      $(document).on('scroll', function() {
        if ($(this).scrollTop() > top && $(this).scrollTop() < ($(document).height() - (related_height + footer_height) * 1.5)) {
          right_side.addClass('fixed');
          right_side.css('left', left+'px');
        } else {
          right_side.removeClass('fixed');
          right_side.css('left', 'auto');
        }
      });
    }

    // auto fixed right side
    top = right_side.offset().top.toFixed();
    left = right_side.offset().left.toFixed();
    getRightSidePosition(top,left);

    $(window).on('resize', function() {
        
      //if ($(window).height() !== 0 || $(window).width() !== 0) {
        top = right_side.offset().top.toFixed();
        left = right_side.offset().left.toFixed();
        return getRightSidePosition(top, left);
        
      //}
    });
  } 
  
  // update price with package selected
  function updatePrice(price) {      
    // first selected click, create price original to return.  
    if (!price_o.attr('data-source-price')) {
      var source_price = price_o.attr('data-source-price', price_o.text());
    } 
    
    //change price
    price_o.hide();
    price_o.text(price).fadeIn(300);
    // right_side.find('.loading').remove();
  }

  //return price original
  function getBackPrice() {
    price_o.hide();
    price_o.text(price_o.data('source-price')).fadeIn(300);
    // right_side.find('.loading').remove();
  }

  // initialize gallery
  function gallery($el) {
    $el.lightGallery({
      mode: 'lg-fade',
      download: false,
      zoom: false,
      pager: false,
      fullScreen: false,
      autoplay: false,
      autoplayControls: false,
      share: false,
      mousewheel: false,
      getCaptionFromTitleOrAlt: false,
      hash: false,
      addClass: 'ntbk-gallery',
      prevHtml: '<i class="fas fa-arrow-left"></i>',
      nextHtml: '<i class="fas fa-arrow-right"></i>'
    });
  }

  //check device is mobile or desktop
  if (device) {
    fixedMobile();
  } else {
    fixedDesk();
  }
  
  // view full/short service package
  $('.package-service .btn-viewmore').on('click', function(e) {
    var full = 'Xem chi tiết';
    var short = 'Thu gọn';
    // console.log(e);
    $(e.target.parentElement).toggleClass('show');
    if ($(this).text() == full) {
      return $(this).text(short);
    } else {
      return $(this).text(full);
    }
  });
  

  // select/unselect service package
  $('.package-price .btn-select').on('click', function(e) {
    //add loading animation
    //right_side.append('<div class="loading"><div class="lds-facebook"><div></div><div></div><div></div></div></div>');

    var package = $('.package-item');
    var package_selected = $('.package-item.selected');
    var selected = 'Đã chọn';
    var unselect = 'Chọn';
    var price_selected = $(e.currentTarget.previousElementSibling);// price selected class
    
    $(this).parents(package).toggleClass('selected');
    
    //change text on click button
    if ($(this).text() == selected) {
      $(this).text(unselect);
    } else {
      $(this).text(selected);
    }
    
    //remove all package selected
    if (package_selected.length > 0) {
      package_selected.removeClass('selected');
      package_selected.find('.btn-select').text(unselect);
    }

    // if selected, change price
    if ($(this).parents(package).hasClass('selected')) {
      var current_price = price_selected.text();
      price_booking.val(current_price.replace(/đ/g,'').replace('.',''));
      return updatePrice(current_price);
    } else {
      // no selected, return price original
      price_booking.val('');
      $(this).text(unselect);
      return getBackPrice();
    }
  });

  // on click button gallery
  $('#btn_gallery').on('click', function() {
    var $gl = $('#gallery');

    // call function
    gallery($gl)
    // bind click for first element in gallery
    $($gl[0].children[0]).trigger('click');

    // event on show appendSlide
    $gl.on('onAferAppendSlide.lg', function(event) {
      // get alt img
      var altText = event.currentTarget.firstElementChild.children[0].alt;
      // add alt to image: image large and thumbnail
      $('.ntbk-gallery').find('.lg-image').attr('alt', altText);
      $('.lg-thumb-item img').attr('alt', altText);
    });
  });

  //modal video on show
  $('#modal_video').on('show.bs.modal', function() {
    // detect format video youtube: www.youtube.com/watch?v=, youtu.be or www.youtube.com/embed
    var regex = /(\?v=|\&v=|\/\d\/|\/embed\/|\/v\/|\.be\/)([a-zA-Z0-9\-\_]+)/;
    var videoUrl = $('#btn_video').data('youtube').match(regex);
    if (videoUrl) {
      // get id from youtube
      var videoId = videoUrl[2];
      $(this).find('.embed-video-url').attr('src', 'https://www.youtube.com/embed/'+ videoId+ '?autoplay=1');
    }
  })
  // modal video on hide
  .on('hide.bs.modal', function() {
    $(this).find('.embed-video-url').attr('src', '');
  });

  

  
})