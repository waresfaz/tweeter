// when ready event happens ... run the following 
$(document).ready(function() {
  // console.log('testing');

  $('.new-tweet textarea').on('input', function() {
    // console.log('testing event handler')
    const input = $(this).val().length;
    let max = 140;
    let charsLeft = max - input;
    console.log(input, charsLeft);

    let charCounter = document.querySelector(this.parentNode)
    console.log(charCounter)

    $('.counter').text(charsLeft)

    // if (charsLeft < 0) {
    //   $('.counter').addClass('red')
    // } else {
    //   $('.counter').removeClass('red')
    // }

  })
});
