$(document).ready(function(){
  
//array of movies
var topics = ["Contra", "Super Mario Bros.", "Pac-Man", "The Legend of Zelda", "Final Fantasy"];
var favs= [];
//Ajax call function
function displayMovieInfo() {
  $("#gifBoard").empty();
  var videoGames = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" + videoGames +"&api_key=rbsSwRcRQdQnLHNS3XDDHt4xxTdp5eR4&limit=10&offset=15";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

   
   
    //For loop to loop through response
     for(var i=0; i <response.data.length;i++){
    //Variables for gifs
      var gifMoving = response.data[i].images.fixed_height.url;
      var gifStill=response.data[i].images.fixed_height_still.url;
      var rating=response.data[i].rating;
      //Variables for dynamically made elements
      var rate=$("<p>").text("Rating: " + rating);
      var holderDiv = $("<div class = 'holder'>");
      var gif = $("<img>");
     
      //State change of gif;
      gif.attr("src", gifStill);
      gif.attr("data-still", gifStill);
      gif.attr("data-animate", gifMoving);
      gif.attr("data-state", "still");
      gif.addClass("picture");
      gif.addClass("card");

      //Adding elements to html
      holderDiv.append(gif);
      holderDiv.append(rate);
      $("#gifBoard").append(holderDiv);
     
      

     //Showing card when video game button is clicked
     $("h3").show();
     }     
    });
  
}
function favorites(){

}
//Function that dynamically makes user buttons 
function createButtons() {
  $("#gifButtons").empty();
  $("h3").hide();
  for (var i = 0; i < topics.length; i++) {
    var buttons = $("<button class= 'btn'>");
    buttons.addClass("videoGameButton");
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
$("#addvideoGame").on("click", function(event) {
  event.preventDefault();
  var games = $("#gifSearch").val().trim();  
  $("#gifSearch").val("");
  topics.push(games);
  createButtons();
});
//Calling function createButtons
createButtons();

//displaying gifs when video game name button is clicked
$(document).on("click", ".videoGameButton", displayMovieInfo);

//Onclick event that handles state change of gif
$(document).on("click", ".picture", gifChange);
});