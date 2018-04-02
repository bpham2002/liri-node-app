require("dotenv").config();
var fs = require('fs')
var req = require('request')
var keys = require("./keys.js")

var Twitter = require('twitter')
var inq = require('inquirer')
var pmpt = inq.createPromptModule()
    // credentials are optional
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi(keys.spotify)

spotifyApi.setAccessToken('BQBKmgFUSybLehuYJLFdv9glJId17ImfFCuYhaO_uvE9G88bMLVhRb389TLByJ8fb2psAjVviR0JqbW4aAHygnumHYDNBFOSQdlpNjvBuFPlH4hwBQD7vHTAzicCSfg9gCVoXk8n_jbGnENwjhdfh0iwu2vE6GF8mq9pstmEkg');
var client = new Twitter(keys.twitter)
var command = process.argv[2]
var title = process.argv.slice(3)
switch (command) {
    case 'my-tweets':
        client.get('statuses/user_timeline', function(error, tweets, response) {
            if (error) throw error;
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text + ' created at: ' + tweets[i].created_at);
            }
        });
        break;
    case 'spotify-this-song':

        // Get Elvis' albums
        spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
            .then(function(data) {
                console.log('Artist albums', data.body);
            }, function(err) {
                console.error(err);
            });
        break;
    case 'movie-this':
        if (title != '') {

            showMovie()
        } else {
            title = 'Mr.Nobody'
            showMovie()
        }
        break;
    case 'do-what-it-says':
        fs.readFile('./random.txt', 'utf8', function(err, data) {
            if (err) {
                console.log(err)
            }
            console.log(JSON.parse(data));
        })
        break;
    default:


}

function showMovie() {
    req('http://www.omdbapi.com/?t=' + title + '&apikey=' + keys.omdb.omdbkey + '', function(error, response, body) {
        if (error != null) {
            console.log('error:', error); // Print the error if one occurred
        } else {

            var movie = JSON.parse(body)
            console.log('Title: ' + movie.Title)
            console.log('Year: ' + movie.Year)
            console.log('Imbd Rating: ' + movie.imdbRating)
            console.log(movie.Ratings[1].Source + ': ' + movie.Ratings[1].Value)
            console.log('Country: ' + movie.Country)
            console.log('Language: ' + movie.Language)
            console.log('Plot: ' + movie.Plot)
            console.log('Actors: ' + movie.Actors)
        }
    });
}