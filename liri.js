// require npm packages
var Twitter = require('twitter');
var keys = require('./keys.js');

// end golbalvariables
var argumentTwo = process.argv[2];
var argumentThree = process.argv[3];

if (argumentTwo === "my-tweets") {
	myTweets();
}

// gets info for the last 200 tweets
function myTweets() {
	var client = new Twitter(keys.twitterKeys);

	var params = {screen_name: '@willsmith'};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
  			if (!error) {
  				for (var i = tweets.length - 1; i >= 0; i--) {
  					console.log("-----------------------------\n");
  					console.log(tweets[i].text);
  					console.log("-----------------------------\n");

  				}
    		
  } 
});
}


// This block of code will read from the "random.txt" file.
// The code will store the contents of the reading inside the variable "data"
function readRandom() {
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function(error, data) {
        // the first parameter is always an error which gets sets to null if there is no error

        var dataArr = data.split(",");
        var randNum = Math.floor(Math.random() * 10 + 1);
        var randSong = dataArr[randNum];
        argumentThree = randSong;

        spotifyCommand(argumentThree); // calls the spotify-this-song function with the random song
    });
}

function spotifyCommand(song) {
    var spotify = require('spotify');
    if (argumentThree) {
        spotify.search({ type: 'track', query: song }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            } else {
                console.log("---------------------------------");
                console.log("ARTIST NAME: " + data.tracks.items[0].album.artists[0].name);
                console.log("SONG NAME: " + data.tracks.items[0].name);
                console.log("SONG PREVIEW URL: " + data.tracks.items[0].preview_url);
                console.log("ALBUM NAME: " + data.tracks.items[0].album.name);
            }
        });
    }

    // If the user doesn't type a song in, "The Sign by Ace of Base" is returned to console
    else {

        spotify.lookup({ type: 'track', id: "0hrBpAOgrt8RXigk83LLNE" }, function(err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            } else {
                console.log("\nSONG NAME: " + data.name);
                console.log("ALBUM: " + data.album.name);
                console.log("ARTIST: " + data.artists[0].name);
                console.log("SONG PREVIEW URL: " + data.preview_url);
            }
        });
    }
    if (argumentThree) {
        recordData(argumentTwo, argumentThree);
    } else {
        recordData(argumentTwo, "The Sign by Ace of Base");
    }

}

function getMovieInfo(movie) {

    var movieDb = require('moviedb')('40e9cece');
    if (argumentThree) {
        movieDb.searchMovie({ query: movie }, function(err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log("------------------------");
                console.log("\nMOVIE TITLE: " + res.results[0].original_title);
                console.log("RELEASE DATE: " + res.results[0].release_date);
                console.log("RATING: " + res.results[0].vote_average);
                console.log("PLOT SUMMARY: " + res.results[0].overview);
            }
        });
    }
    // If the user doesn't type a movie in, "Mr. Nobody" info is returned to console
    else {
        movieDb.searchMovie({ query: "Mr. Nobody" }, function(err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log("------------------------");
                console.log("\nMOVIE TITLE: " + res.results[0].original_title);
                console.log("RELEASE DATE: " + res.results[0].release_date);
                console.log("RATING: " + res.results[0].vote_average);
                console.log("PLOT SUMMARY: " + res.results[0].overview);
            }
        });