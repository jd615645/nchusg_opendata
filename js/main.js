$(document).ready(function() {
  var apiKey = 'AKfycbwB_a3eHJFraiYM_MzpXa9VD-PYoU2B7ZHT87CmJ6mlSKGrj6hf',
      url = 'https://script.google.com/macros/s/' + apiKey + '/exec';
  change_year(2016);
  $('.item').click(function(event) {
    $('.active').removeClass('active');
    sn=$(this).text();
    $('#metting_record').empty();
    $('#conference').empty();
    $('#committee').empty();
    $(this).addClass('active');
    change_year(sn);
  });

  function change_year(sn){
    $('.container').append('<div class="ui active dimmer">'+'<div class="ui active loader">'+'</div>');
    var query_obj = {
      SHEET_NAME: sn,
      SELECT_COLUMN: [
        "行政常會會議記錄", "線上瀏覽_行政常會會議記錄", "下載_行政常會會議記錄","學生代表大會", "線上瀏覽_學生代表大會", "下載_學生代表大會","仲裁評議委員會", "線上瀏覽_仲裁評議委員會", "下載_仲裁評議委員會"
      ]
    }
    $.get(url, {query: JSON.stringify(query_obj)}, function(response){
      var inputData = response.output;
      // console.log(response);
      inputData.forEach(function(data){
        // console.log(data);
        mrFunction(data)
      });
      $('.dimmer').removeClass('active');
      $('.dimmer').addClass('disabled');
      $('.loader').removeClass('active');
      $('.loader').addClass('disable');
    });
  }
  function mrFunction(element) {
    if(judge(element['行政常會會議記錄'])) {
      if(judge(element['下載_行政常會會議記錄'])) {
        $('#metting_record').append('<tr>'+'<td>'+element['行政常會會議記錄']+'</td>'+'<td>'+'<a href=\"'+element['線上瀏覽_行政常會會議記錄']+'\">'+"線上瀏覽"+'</a>'+'</td>'+'<td class="right aligned">'+'<a href=\"'+element['下載_行政常會會議記錄']+'\">'+"點我下載"+'</a>'+'</td>'+'</tr>');
      }
      else {
        $('#metting_record').append('<tr>'+'<td>'+element['行政常會會議記錄']+'</td>'+'<td>'+'<a href=\"'+element['線上瀏覽_行政常會會議記錄']+'\">'+"線上瀏覽"+'</a>'+'</td>'+'<td>'+'</td>'+'</tr>');
      }
    }
  if (judge(element['學生代表大會'])) {
      if(judge(element['下載_學生代表大會'])) {
        $('#conference').append('<tr>'+'<td>'+element['學生代表大會']+'</td>'+'<td>'+'<a href=\"'+element['線上瀏覽_學生代表大會']+'\">'+"線上瀏覽"+'</a>'+'</td>'+'<td class="right aligned">'+'<a href=\"'+element['下載_學生代表大會']+'\">'+"點我下載"+'</a>'+'</td>'+'</tr>');
      }
      else {
        $('#conference').append('<tr>'+'<td>'+element['學生代表大會']+'</td>'+'<td>'+'<a href=\"'+element['線上瀏覽_學生代表大會']+'\">'+"線上瀏覽"+'</a>'+'</td>'+'<td>'+'</td>'+'</tr>');
      }
    }
    if (judge(element['仲裁評議委員會'])) {
      if(judge(element['下載_仲裁評議委員會'])) {
        $('#committee').append('<tr>'+'<td>'+element['仲裁評議委員會']+'</td>'+'<td>'+'<a href=\"'+element['線上瀏覽_仲裁評議委員會']+'\">'+"線上瀏覽"+'</a>'+'</td>'+'<td class="right aligned">'+'<a href=\"'+element['下載_仲裁評議委員會']+'\">'+"點我下載"+'</a>'+'</td>'+'</tr>');
      }
      else {
        $('#committee').append('<tr>'+'<td>'+element['仲裁評議委員會']+'</td>'+'<td>'+'<a href=\"'+element['線上瀏覽_仲裁評議委員會']+'\">'+"線上瀏覽"+'</a>'+'</td>'+'<td>'+'</td>'+'</tr>');
      }
    }
  }
  function judge(data) {
    if(data!==null && typeof data !== "undefined" && data !=="") {
      return true;
    }
    return false;
  }
});
