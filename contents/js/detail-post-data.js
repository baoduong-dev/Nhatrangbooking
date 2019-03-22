// for detail post, blog

$(function() {
    $('.rating-star').barrating({
    theme: 'fontawesome-stars',
    readonly: true
  });

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
      // getCaptionFromTitleOrAlt: false,
      preload: 0,
      hash: false,
      thumbnail: false,
      addClass: 'ntbk-gallery',
      prevHtml: '<i class="fas fa-arrow-left"></i>',
      nextHtml: '<i class="fas fa-arrow-right"></i>'
    });
  }
  
  $('.image-popup').each(function() {
    gallery($(this));
  }).on('onAferAppendSlide.lg', function(event, index) {
    // get alt img
    // console.log(event)
    var altText = event.target.children[index].children[0].alt;
    console.log(altText);
    // // add alt to image: image large and thumbnail
    $('.ntbk-gallery').find('.lg-current .lg-image').attr('alt', altText);
    $('.lg-thumb-item img').attr('alt', altText);
    
  });
  

  // on click button gallery
  $('#btn_gallery').on('click', function() {
    var $gl = $('#gallery');

    // call function
    gallery($gl)
    // bind click for first element in gallery
    $($gl[0].children[0]).trigger('click');

    // event on show appendSlide
    $gl.on('onAferAppendSlide.lg', function(event, index) {
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
  })

  

  
})