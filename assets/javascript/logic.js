//RUNNING JQUERY CODE ONCE PAGE LOADS
$(document).ready(function(){

//CREATING TV SHOW ARRAY
	var tvShows = ["Parks and Recreation", "The Office", "Seinfeld", "Twin Peaks", "How I Met Your Mother", "Friends"];

//CREATING API KEY VARIABLE
	var apiKey = "AlnAq1mnmvfLgK29TS2HMsHvbNuV8LGf";

//FOR LOOP THAT CREATES BUTTONS FROM ARRAY
	for (var i = 0; i < tvShows.length; i++){
		var button = $("<button>");
		button.text(tvShows[i]);
		button.attr("dataName", tvShows[i]);
		button.addClass("tvShowButtons");
		$("#buttonsHolder").append(button);
	}

//EVENT LISTENER THAT LISTENS FOR USER CLICK AND STORES BUTTON DATA VALUE
	$(document).on("click", ".tvShowButtons", function(){
		var userInput = $(this).attr("dataName");
		
//IF INPUT IS TWO WORDS REPLACE SPACE WITH PLUS SIGN
		var input = userInput.replace(" ", "+")
		
//CREATING GIPHY API URL VARIABLE
		var url = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=" + apiKey + "&limit=5";
		
//GETTING DATA FROM GIPHY SERVER
		$.ajax({
        url: url,
        method: "GET"
      	}).done(function(response) {

//BEGIN FOR LOOP
	      	for (var i = 0; i < 5; i++){

//CREATING VARIABLES TO HOLD RATING INFO, GIFS & GIF STATUS
	      		var gifDiv = $("<div>");
	      		var ratingInfo = $("<p>");
	      		var rating = response.data[i].rating;
				    ratingInfo.text("Rating: " + rating);
			    	var gifP = $("<p>");
            var gif = $("<img>");
	      		var gifStatus = response.data[i].images.original_still.url;
	      		var gifStatusPlay = response.data[i].images.original.url;
            var gifStatusPause = response.data[i].images.original_still.url;
            
//ADDING ATTRIBUTES TO GIFS
	      		gif.attr("src", gifStatus);
	      		gif.addClass("gif");
	      		gif.attr("play", gifStatusPlay);
	      		gif.attr("pause", gifStatusPause);
            gif.attr("status", "still");
	      		gifP.append(gif);
	      		ratingInfo.append(gifP);
	      		$("#gifsHolder").prepend(ratingInfo);
	      	}	
      	});
	});


//EVENT LISTENER THAT LISTENS FOR USER INPUT BUTTON CLICK
	$("#tvShowName").on("click", function(){
		

//CREATING VARIBALE TO STORE USER INPUT & PUSHING TO ARRAY
		var buttonValue = $("#tvShowSubmit").val().trim();{
			tvShows.push(buttonValue);
			$("#buttonsHolder").empty();

//FOR LOOP THAT CREATES BUTTONS FROM ARRAY
			for (var i = 0; i <tvShows.length; i++){
				var button = $("<button>");
				button.text(tvShows[i]);
				button.attr("dataName", tvShows[i]);
				button.addClass("tvShowButtons");
				$("#buttonsHolder").append(button);
			}
		}}
	);

//EVENT LISTENER THAT LISTENS FOR USER GIF CICK 
	$(document).on("click", ".gif", function(){

//IF GIF STATUS IS ANIMATED 
		if($(this).attr("status") == "animated"){

//CHANGE GIF STATUS TO PAUSE
      $(this).attr("status", "still");
      $(this).attr("src", $(this).attr("pause"));
      
//OR ELSE SET GIF STATUS TO PLAY
		} else {
			$(this).attr("status", "animated");
			$(this).attr("src", $(this).attr("play"));
		}
	});
});