/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }  

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


  $('.error-message').hide();

  $("#tweet-button").submit(function(event) {
    event.preventDefault()

    if ($('.new-tweet textarea').val().length > 140) {
      $('.error-message').slideDown();
      $('.error-message').show();
      // $('.error-message').val() === "too many chars";
      // alert("too many chars");
      return false;
    } if ($('.new-tweet textarea').val() === "") {
      $('.error-message').slideDown();
      $('.error-message').show();
      // $('.error-message').val("empty tweet not allowed");
      // alert("tweet can't be empty");
    } 

    // console.log("testing that this submit is working")
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $("#tweet-button").serialize()
    })
      .then(function() {
        $("#tweet-container").empty()
        loadTweets();
        $('.error-message').hide();
        console.log($('.new-tweet textarea').val())
      })
  })

  const createTweetElement = (tweetInput) => {
    return `<article class=""tweet">

    <header>
      <img class="profile-picture" src=${tweetInput.user.avatars}>
      <p class="display-name">${tweetInput.user.name}</p>
      <p class="handle">${tweetInput.user.handle}</p>
    </header>
    
    <p class="submission">${escape(tweetInput.content.text)}</p>

    <footer>
      <p class="timestamp">Potsed 10 days ago</p>
      <a class="flag-icon">Flag</a>
      <a class="retweet-icon">Retweet</a>
      <a class="like-icon">Like</a>
    </footer>

  </article>`
  }


const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    $("#tweet-container").append(createTweetElement(tweet));
  }
}

renderTweets(data);

})