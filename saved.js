// The application should first allow the user to enter a search query and see a list of results populated. (see search endpoint)
$("document").ready(function(){
	// listen to the form submission
	var source = $("#song-template").html();
  		// compile the handlebars template (outside of loop)
  		var songTemplate = Handlebars.compile(source);

// getting the user's saved tracks

$(window).on("load", function(){
		// keep the form from going anywhere
		event.preventDefault();   
		$.ajax({
			type: "GET",
			url: "https://api.spotify.com/v1/me/tracks",
			headers: {
				"Authorization": "Bearer " + window.sessionStorage.getItem("spotify_access_token")
			},
			success: function(tracks){
				// get each song out of the master object and for each song

				var usersSongs = tracks.items.forEach(function(song) {
					console.log(song);
				 			// create the new html for that song
				 			var newHTML = songTemplate(song);
				 			// append the new HTML to the page
				 			$("#users-songs").append(newHTML);
				 		});
			},
			error: function(){
				alert("Can't get users tracks");
			}
		});
	});


	//remove track
	$(document).on("click", ".btn-danger", function(event) {
    	// keep the form from going anywhere
    	event.preventDefault();
    	deleteURL = $(this).attr("href");
    	console.log(deleteURL);
    	$.ajax({
    		url: deleteURL,
    		headers: {
    			"Content-Type" : "application/json",
    			"Authorization": "Bearer " + 
    			window.sessionStorage.getItem("spotify_access_token")
    		},
    		type: "DELETE",
				// if we get the data back, then
				success: function(response){
					location.reload();
				},
				error: function(){
					alert("Can't delete track");
				}
			});
    });



});