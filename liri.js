require("dotenv").config();
var keys = require("./keys.js")
var SpotifyWebApi = require('spotify-web-api-node');
var Twitter = require('twitter')
var inq = require('inquirer')
var pmpt = inq.createPromptModule()
    // credentials are optional
var spotify = new SpotifyWebApi(keys.spotify);
spotify.setAccessToken('BQBKmgFUSybLehuYJLFdv9glJId17ImfFCuYhaO_uvE9G88bMLVhRb389TLByJ8fb2psAjVviR0JqbW4aAHygnumHYDNBFOSQdlpNjvBuFPlH4hwBQD7vHTAzicCSfg9gCVoXk8n_jbGnENwjhdfh0iwu2vE6GF8mq9pstmEkg');
var client = new Twitter(keys.twitter)
var command = process.argv[2]
    //var title = process.argv.slice[3]
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
        // Search tracks whose name, album or artist contains 'Love'
        var title = process.argv.slice(3)
        spotify.searchTracks('love')
            .then(function(data) {
                console.log('Search by "Love"', data.body);
            }, function(err) {
                console.error(err);
            });

        break;
    case 'movie-this':
        break;
    case 'do-what-it-says':
        break;
    default:


}