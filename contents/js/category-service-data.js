$(function() {

  //############# For post-item (Category Tour)
  
  // post-link on click
  $('.post-link').click(function(event) {
    // console.log(event);
    var target = $(event.currentTarget.offsetParent);
    target.find('a').trigger('click');
  });

  // if tab on show
  $('#post-tab a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    // console.log(e);
    var parent = e.target.offsetParent;
    $(parent).addClass('show');

    // var post_tab_content_height = $('.post-list').height();
    var post_tab_content_position = $('.post-tab-content').offset().top;
    console.log(post_tab_content_position)
    $('html, body').animate({
      scrollTop: post_tab_content_position - ($(window).height()/2 - 130)
    }, 300)
    // console.log(post_list_height);
    // console.log(post_list_position);

  });

  // if tab on hide
  $('#post-tab a[data-toggle="tab"]').on('hidden.bs.tab', function (e) {
    // console.log(e);
    var parent = e.target.offsetParent;
    $(parent).removeClass('show');
  });










  //############ No Delete/Remove this
  // $('.star').rating();
  // $('.star').barrating({
  //   theme: 'fontawesome-stars',
  //   readonly: true,
  //   emptyValue: ''
  // });

  // $('.select2').select2({
  //   language: "vi"
  // });

  // $('#filter-road').select2({
  //   placeholder: 'Nhập tên đường...'
  // });
  

  // var filter = $('.filter-group .custom-control-input');
  // var filter_checked = $('.filter-group .custom-control-input:checked');
  // var filter_selected = $('.filter-selected');


  // filter_checked.each(function() {
  //   $(this).filter(function(value) {
  //     id = $(this).attr('id');
  //     value = $(this).val();
  //     return filterAdd(id, value);
  //   });

  //   if ($('.filter-item').length) {
  //     $('.filter-item').each(function() {
  //       $(this).click(function() {
  //         var id = $(this).data('id');
  //         console.log(id)
  //         $('#'+id).prop('checked', false).trigger('change');
  //         // return true;
  //       })
  //     })
  //   }
  // })
  

  // filter.each(function() {
  //   $(this).on('change', function(event) {
  //     var id = event.target.id,
  //         value = event.target.value,
  //         check = event.target.checked;

  //     if (check == true) {
  //       filterAdd(id, value);
  //     } else {
  //       filterRemove(id);
  //     }
  //   })
  // });

  // function filterAdd(id, value) {
  //   filter_selected.append(`<span class="filter-item" data-id="${id}">${value} sao<i class="fas fa-times"></i></span>`);
  // }

  // function filterRemove(id) {
  //   $(`[data-id="${id}"]`).remove();
  // }

  //#########################
  
})