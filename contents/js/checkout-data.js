$(function() {

  function numeric(el) {
    el.autoNumeric({
        aSep: '.',
        aDec: ',',
        aPad: false ,
        aSign: ' đ',
        pSign: ' đ'  
    })
  }

  function mathPrice() {
    var adults_count = $('#adults').val();
    var childs_count = $('#childs').val();
    var trans_fee = 3.3;
    var adults = parseFloat(adults_price) * parseFloat(adults_count);
    var childs = parseFloat(childs_price) * parseFloat(childs_count);
    var price = adults + childs;
    var transaction = (price * trans_fee)/100;
    // console.log(price)
    return totalPrice(price, transaction);
  }

  // hien thi ket qua 'tong thanh toan' va 'phi giao dich'
  function totalPrice(price, fee) {
    total_price.autoNumeric('set', price + fee);
    trans_price.autoNumeric('set',fee);
    return $('#total-price-value').val(total_price.autoNumeric('get'));
  }

  // call numeric for all price
  numeric($('.price-value'));
  var people = $('.people-count'); // so luong: nguoi lon, tre em
  var date = $('#date-go'); //ngay di
  var adult_text = ' người lớn',
      child_text = ' trẻ em',
      adults_price = $('#adults-price').text().replace(' đ','').replace('.',''), // value
      childs_price = $('#childs-price').text().replace(' đ','').replace('.',''), // value
      trans_price = $('#transaction-price'),
      total_price = $('#total-price'); // total-price

  mathPrice();

  date.datepicker({
    autoHide: true,
    autoPick: true,
    language: 'vi-VN'
  });

  // up,down people count
  people.TouchSpin({
    min: 0,
    mousewheel: false,
    buttondown_class: 'btn btn-normal',
    buttonup_class: 'btn btn-normal'
  });

  people.on('change keyup keydown', function(e) {
    if (e.target.id == 'adults') {
      $(`.${e.target.id}-count`).text($(this).val() + adult_text);
    } else {
      $(`.${e.target.id}-count`).text($(this).val() + child_text);
    };

    return mathPrice();
    
  });
  // total_price.text(totalPrice());

  // console.log(parseFloat(adults_price));



})