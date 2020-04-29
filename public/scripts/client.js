$(document).ready(function() {

  // saftey feature, escapes untrusted text input
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }  

  //loads and renders tweets from /tweets 
  const loadTweets = function() {

    $.ajax({
      method: "GET",
      url: "/tweets",
      dataType: "JSON"
    })
      .then(response => {
        renderTweets(response)
      });
  }
  loadTweets();

  // hides new tweet input box
  $('.new-tweet').hide();
  //triggers once "write new tweet" button is clicked from nav bar to display new tweet input box
  $('.write-new-tweet-button').click(function(event) {
    $('.new-tweet').slideDown();
    $('.new-tweet').show();
  })


  // hides error message for invalud tweet as default
  $('.error-message').hide();
  //triggers once button is clicked to submit a new tweet
  $("#tweet-button").submit(function(event) {
    event.preventDefault()

    // if user attempts to submit tweet that is more than limit or that is empty, shows error
    if ($('.new-tweet textarea').val().length > 140) {
      $('.error-message').slideDown();
      $('.error-message').show();
      return false;
    } if (!$('.new-tweet textarea').val()) {
      $('.error-message').slideDown();
      $('.error-message').show();
    } 

    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $("#tweet-button").serialize()
    })
    // when new tweet is submitted, clears previously displayed tweets so there are no repeats
      .then(function() {
        loadTweets();
        $("#tweet-container").empty()
        $('.error-message').hide();
        // resets counter and empties text input box after tweet is submitted
        $(".counter").empty();
        $(".counter").append("140");
        $("#tweet-text").val('');
      })
  })

  // creates a new tweet according to the html structure below
  const createTweetElement = (tweetInput) => {
    return `<article class="tweet">

    <header>
      <img class="profile-picture" src=${tweetInput.user.avatars}>
      <p class="display-name">${tweetInput.user.name}</p>
      <p class="handle">${tweetInput.user.handle}</p>
    </header>
    
    <p class="submission">${escape(tweetInput.content.text)}</p>

    <footer>
      <p class="timestamp">Potsed 10 days ago</p>
        <div class="icons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fa fa-heart"></i>
        </div>
    </footer>

  </article>`
  }

  // renders tweets prepending most recently submitted tweet at top of tweet container
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      $("#tweet-container").prepend(createTweetElement(tweet));
    }
  }

  renderTweets(data);

})