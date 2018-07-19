$(document).ready(function(){
    //array of movies
    var topics = ["IT", "Hocus Pocus", "Halloween", "Dirty Dancing"];
    
    function displayMovieInfo() {
      $("#gifBoard").empty();
      var movieInfo = $(this).attr("data-name");
      var queryURL =
        "https://api.giphy.com/v1/gifs/search?q=" + movieInfo +"&api_key=rbsSwRcRQdQnLHNS3XDDHt4xxTdp5eR4&limit=10";
    
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        console.log(response);
         for(var i=0; i <response.data.length;i++){
          var imgUrlAnimated = response.data[i].images.fixed_height.url;
          var imgUrlStill=response.data[i].images.fixed_height_still.url;
          var rating=response.data[i].rating;
          var rate=$("<p>").text("Rating: " + rating);
          
          //State change of gif;
          var image = $("<img>");
          image.attr("src", imgUrlStill);
          image.attr("data-still", imgUrlStill);
          image.attr("data-animate", imgUrlAnimated);
          image.attr("data-state", "still");
          image.addClass("picture");
    
          $("#gifBoard").append(image);
          $("#gifBoard").append(rate);
         }     
        });

      var title = $(this).attr("data-name");
      var queryURL = "http://www.giantbomb.com/api/games/?api_key=9c90c2d86375133f56eb2fa60ccd98216618196d";
  
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
         console.log(response);
        //  var year = response.Released;
        //  var plot = response.Plot;
        //  var p = $("<p>").text("Released Date: " + year);
        //  var about = $("<p>").text("Plot: " + plot);
        
        //  $("#gifBoard").prepend(about);
        //  $("#gifBoard").prepend(p);
      });
      
    }
     

      
    
    
    
    function createButtons() {
      $("#gifButtons").empty();
    
      for (var i = 0; i < topics.length; i++) {
        var buttons = $("<button class ='pulse'>");
        buttons.addClass("movieButton");
        buttons.attr("data-name", topics[i]);
        buttons.text(topics[i]);
        $("#gifButtons").append(buttons);
    
      }
    }
    //Function that changes the state of the gif
    function gifChangeState(){
      var stateChange = $(this).attr("data-state");
      var imageMove = $(this).attr("data-animate");
      var imageStill = $(this).attr("data-still");
    
      if (stateChange === "still"){
        $(this).attr("src", imageMove);
        $(this).attr("data-state", "animate");
      }
      else if (stateChange === "animate"){
        $(this).attr("src", imageStill);
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
    $(document).on("click", ".picture", gifChangeState);
    });