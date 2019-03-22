// script for all page

$(function() {
  var $body = $('body'),
      $html = $('html');

  var $overlay = 'screen-overlay';


  //menu more on click
  $('.menu-more').click(function() {
    $('.main-menu-2').toggleClass('show');

    // neu $overlay ton tai => remove,
    //              nguoc lai => append
    if ($(`.${$overlay}`).length !== 0) {
      $(`.${$overlay}`).remove();
    } else {
      $body.append(`<div class="${$overlay}"></div>`);
    }

    $(`.${$overlay}`).click(function() {
      $(this).remove();
      $('.main-menu-2').removeClass('show');
    })
    
  });


  //btn-toggle-menu on click
  $('.btn-toggle-menu').click(function() {
    $('.nav-menu-responsive').addClass('active');

    if ($(`.${$overlay}`).length !== 0) {
      $(`.${$overlay}`).remove();
    } else {
      $body.append(`<div class="${$overlay}"></div>`);
      $(`.${$overlay}`).click(function() {
        $(this).remove();
        $('.nav-menu-responsive').removeClass('active');
      })
    }
  });

  //btn-close-menu on click
  $('.btn-close-menu').click(function() {
    $('.nav-menu-responsive').removeClass('active');
    $(`.${$overlay}`).remove();
  })

  


  // menu-parent > a on click: for responsive
  $('.nav-menu-responsive .menu-parent > a').click(function(event) {
    $(this).toggleClass('active');
    $(this).parent(event.target.parentNode).children('.sub-menu').toggleClass('show');

  });

  // btn-search on click
  $('.btn-toggle-search').click(function() {
    var search = $('.search-bar');
    search.toggleClass('show');
    search.find('i').removeClass('fas fa-search').addClass('fas fa-times');
    search.find('i').click(function() {
      search.removeClass('show');
      search.find('i').removeClass('fas fa-times').addClass('fas fa-search');
      $(`.${$overlay}`).remove();
    });

    if ($(`.${$overlay}`).length !== 0) {
      $(`.${$overlay}`).remove();
    } else {
      $body.append(`<div class="${$overlay}"></div>`);
      $(`.${$overlay}`).click(function() {
        $(this).remove();
        search.find('i').removeClass('fas fa-times').addClass('fas fa-search');
        search.removeClass('show');
      })
    }

  });

  //enable tooltip any page
  $('[data-toggle="tooltip"]').tooltip();

  let images = document.querySelectorAll(".lazy");
  lazyload(images);
});