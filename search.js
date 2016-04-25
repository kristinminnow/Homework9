// The application should first allow the user to enter a search query and see a list of results populated. (see search endpoint)
$("document").ready(function(){
	    // listen to the form submission
	    var source = $("#song-template").html();
  		// compile the handlebars template (outside of loop)
  		var songTemplate = Handlebars.compile(source);


  		$("#spotify-search").on("submit", function(event) {
    	// keep the form from going anywhere
    	event.preventDefault();    
    	// wipe any previous searches
    	$("#song-output").empty();
    	// url encode the form submission
    	var songSearch = encodeURIComponent($(".form-control").val());
    	//create the query string
    	var searchURL = "https://api.spotify.com/v1/search?query=" + songSearch + "&type=track";
    	// get the HTML for handlebars to use (outside of loop)
	// start the jQuery ajax request
	$.ajax({
		type: "GET",
					// use the search URL component we created above
					url: searchURL,
					headers: {
						"Authorization": "Bearer " + window.sessionStorage.getItem("spotify_access_token")
					},
				// if we get the data back, then
				success: function(response){
				// get each song out of the master object and for each song
				var singleSong = response.tracks.items.forEach(function(song) {
				 			// create the new html for that song
				 			var newHTML = songTemplate(song);
				 			// append the new HTML to the page
				 			$("#song-output").append(newHTML);
				 		});
			},
			error: function(){
				alert("Can't get tracks");
			}
		});
});


// The app should also allow the user to log into Spotify with their credentials. 

var tokenMatches = window.location.hash.match(/access_token=(.*)&token_type=*/);
var accessToken = tokenMatches[1];


	// what is returned is an array, so we take the 2nd item in that array
	if (tokenMatches){
		var accessToken = tokenMatches[1];
		console.log(accessToken);

		// then we store it in Session Storage (not local storage b/c we don't want it to persist)
		window.sessionStorage.setItem("spotify_access_token", accessToken);

		 // use this code below to get the access token or else you will get a 401 status "unauthorized"
		// window.sessionStorage.getItem("spotify_access_token");
	}

// The app should allow the user to save a track to their saved list and see all of their saves on the saved.html template. (see library endpoints)

$(document).on("click", ".btn-success", function(event) {
    	// keep the form from going anywhere
    	event.preventDefault();
    	putURL = $(this).attr("href");
    	console.log(putURL);
    	$.ajax({
    		type: "PUT",
    		url: putURL,
    		headers: {
    			"Content-Type" : "application/json",
    			"Authorization": "Bearer " + 
    			window.sessionStorage.getItem("spotify_access_token")
    		},
				// if we get the data back, then
				success: function(response){
					alert("yay");
					// can't figure out how to change the button text
				},
				error: function(){
					alert("Can't get tracks");
				}
			});
    });


});