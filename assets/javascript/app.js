$(document).ready(function(){
//array of movies
var topics = ["Contra", "Super Mario Bros.", "Pac-Man", "The Legend of Zelda", "Final Fantasy"];

function displayMovieInfo() {
  $("#gifBoard").empty();
  var videoGames = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" + videoGames +"&api_key=rbsSwRcRQdQnLHNS3XDDHt4xxTdp5eR4&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
     for(var i=0; i <response.data.length;i++){
      var gifMoving = response.data[i].images.fixed_height.url;
      var gifStill=response.data[i].images.fixed_height_still.url;
      var rating=response.data[i].rating;
      var rate=$("<p>").text("Rating: " + rating);
      var holderDiv = $("<div class = 'holder'>");
     
      //State change of gif;
      var gif = $("<img>");
      gif.attr("src", gifStill);
      gif.attr("data-still", gifStill);
      gif.attr("data-animate", gifMoving);
      gif.attr("data-state", "still");
      gif.addClass("picture");
      holderDiv.append(gif);
      holderDiv.append(rate);
      $("#gifBoard").append(holderDiv);
     
     $(".card").show();
     }     
    });
  
}

//Function that dynamically makes user buttons 
function createButtons() {
  $("#gifButtons").empty();
  $(".card").hide();
  for (var i = 0; i < topics.length; i++) {
    var buttons = $("<button>");
    buttons.addClass("movieButton");
    buttons.attr("data-name", topics[i]);
    buttons.text(topics[i]);
    $("#gifButtons").append(buttons);

  }
}
//Function that changes the state of the gif
function gifChange(){
  var change = $(this).attr("data-state");
  var gifMove = $(this).attr("data-animate");
  var gifStill = $(this).attr("data-still");

  if (change === "still"){
    $(this).attr("src", gifMove);
    $(this).attr("data-state", "animate");
  }
  else if (change === "animate"){
    $(this).attr("src", gifStill);
    $(this).attr("data-state", "still");
  }

}
//User created buttons
$("#add-movie").on("click", function(event) {
 
  event.preventDefault();
  
  var movies = $("#gifSearch").val().trim();  
  topics.push(movies);
  createButtons();
});
createButtons();

//displaying gif
$(document).on("click", ".movieButton", displayMovieInfo);

//Onclick event that handles state change of gif
$(document).on("click", ".picture", gifChange);
});