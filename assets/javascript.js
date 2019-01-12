console.log("JavaScript is loaded")
$(document).ready(function(){

var moods = ["whyyy", "I'm fine", "sad", "happy", "furious", "fml", "eh", "whatever", "crazy", "hungry"];
var moodGIF = "";
renderButtons();

// this creates the buttons
function renderButtons() {
	$("#buttonDiv").empty();
	for (var i = 0; i < moods.length; i++) {
		var buttn = $("<button>");
			buttn.addClass("movieButton btn btn-primary");
            buttn.css("margin", "15px");
            buttn.css("background", "pink");
            buttn.css("borderColor", "purple");
			buttn.attr("data-name", moods[i]);
			buttn.text(moods[i]);
			$("#buttonDiv").append(buttn);
		};
	};

//new buttons
$(document.body).on('click', '#submitBtn', function() {
	event.preventDefault();
	var newMood = $("#formInput").val().trim();
	moods.push(newMood);
	renderButtons();
	$("#formInput").val("");
	});

// display the related GIF
$(document.body).on('click', '.movieButton', function() {
	moodGIF = $(this).attr("data-name");
	$("#giphyDiv").empty();
	for (i=0; i<10; i++) {
		getGiphy(i, moodGIF);
	};
});


function getGiphy(i, title) {
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=w6skDb3bVpSH3akfsKjgt2h2jfKq4Iou&q=" + title + "&limit=10&offset=0&rating=G&lang=en";
    $.ajax({
      url: queryURL,
      method: "GET"
    	}).done(function(response) {
    		var still = response.data[i].images.fixed_width_still.url; 
    		var animate = response.data[i].images.fixed_width.url;
    		var giphyObj = $("<div class='gifs panel panel-info'>");
    		var rating = response.data[i].rating;
    		var display = $("<p>").text("click to see it in action or pause");
    		var addOne = i + 1;
    		var label = $("<h4>").text(title);
 	    	var Image = $("<img>");
 	    	Image.attr({"data-still":still, "data-animate":animate, "data-state":"still", "src":still, "id":title+"label"+i});
 	    	Image.addClass("btn btn-default gifImage");
    		giphyObj.append(label); 	    	   		
    		giphyObj.append(display);
    		giphyObj.append(Image);
    		giphyObj.attr("id", "gif" + i);
    		giphyObj.css({"width":"250px", "display":"inline-grid", "margin":"15px", "padding":"10px", "text-align":"center"})
    		$("#giphyDiv").append(giphyObj);
	});
};

// This enables animation when the user clicks on the gif image
$(document.body).on('click', '.gifImage', function() {
	var ani = $(this);	
	var state = ani.attr("data-state");
	if (state === "still") {
	  ani.attr("src", ani.attr("data-animate"));
	  ani.attr("data-state", "animate");
	} else {
	  ani.attr("src", ani.attr("data-still"));
	  ani.attr("data-state", "still");
	 }

});


});
