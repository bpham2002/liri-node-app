require("dotenv").config();
var fs = require('fs')
var req = require('request')
var keys = require("./keys.js")

var Twitter = require('twitter')
var inq = require('inquirer')
var pmpt = inq.createPromptModule()
    // credentials are optional
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify)

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
        spotify
            .request('https://api.spotify.com/v1/search?q=' + title + '%20&type=album')
            .then(function(data) {
                for (var key in data.albums.items[0].artists) {
                    console.log('Atist: ' + data.albums.items[0].artists[key].name);
                }
                console.log('Album: ' + data.albums.items[0].name)
            })
            .catch(function(err) {
                console.error('Error occurred: ' + err);
            });
        spotify
            .search({ type: 'track', query: 'All the Small Things' })
            .then(function(response) {
                console.log('Album: ' + response.tracks.items[0].album.name);
                for (var key in response.tracks.items[0].artists) {
                    console.log('Atist: ' + response.tracks.items[0].artists[key].name);
                }
                console.log(`Song's name: ` + response.tracks.items[0].name)
                console.log(`preview link: ` + response.tracks.items[0].external_urls.spotify)
            })
            .catch(function(err) {
                console.log(err);
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