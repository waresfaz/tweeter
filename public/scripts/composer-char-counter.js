// when ready event happens ... run the following 
$(document).ready(function() {
  

  $('.new-tweet textarea').on('input', function() {
    
    const input = $(this).val().length;
    let max = 140;
    let charsLeft = max - input;
    console.log(input, charsLeft);


    $('.counter').text(charsLeft)

    if (charsLeft < 0) {
      $('.counter').addClass('red')
    } else {
      $('.counter').removeClass('red')
    }

  })
});
