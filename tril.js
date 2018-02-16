var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var client = new Twitter(keys.twitter);
//var spotify = new Spotify(keys.spotify);
var userInput = process.argv;
var request = require('request');
var fs = require('fs');

var inquirer =require('inquirer');

var userChoices=inquirer.prompt([
        {
            type:'list',
            message:'choose your choice',
            choices:['my-tweets','spotify-this-song','movie-this','do-what-it-says'],
            name:'userChoice'
        }



    ]).then(function(response){
        //console.log(response.userChoice);
        if (response.userChoice === "my-tweets") {
        twitterFunction();
    }
    else{
        console.log(
            "try again");
    }

    })









/*function controler() {

    if (userInput[2] === "my-tweets") {
        twitterFunction();
    } else if (userInput[2] === "spotify-this-song") {
        spotifyFunction();
    } else if (userInput[2] === 'movie-this') {
        movieThis();
    }
    else if(userInput[2]==='do-what-it-says'){
        doWhatItSays();

    }
}*/

function validator() {
    if (process.argv.length > 4) {
        //console.log('length ' + process.argv.length);
        userInput[3] = process.argv.splice(3, process.argv.length - 1).join('');
        //console.log(a);
    }
}

var twitterFunction = function() {

    
    validator();

    console.log("process argv   " + response.userChoice)
    var params = { screen_name: userInput[3] };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            if (tweets.length > 20) {
                for (var i = 0; i < 20; i++) {
                    console.log('********************************');
                    console.log(tweets[i].created_at);
                    console.log(tweets[i].text);
                    console.log('********************************');

                }
            } else if (tweets.length === 0) {
                console.log('********************************');
                console.log('no tweets to show');
                console.log('********************************');
            } else {
                for (var i = 0; i < tweets.length; i++) {
                    console.log('********************************');
                    console.log(tweets[i].created_at);
                    console.log(tweets[i].text);
                    console.log('********************************');
                }
            }
        } else {
            console.log("error", error)
        }
    });


}


/*var spotifyFunction = function() {
    validator();

    spotify.search({ type: 'track', query: userInput[3] }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (var i = 0; i < data.tracks.items.length; i++) {
            console.log(data.tracks.items[i].artists[0].name);
            console.log(data.tracks.items[i].preview_url)
        }


    });

}

var movieThis = function() {
    validator();

    request('http://www.omdbapi.com/?t=' + userInput[3] + '&apikey=trilogy', function(err, response, body) {
        if ((!err) && (response.statusCode === 200)) {
            console.log('********************************');
            console.log('Title: ' + JSON.parse(body).Title);
            console.log('Year: ' + JSON.parse(body).Year);
            console.log('Imdba Rating: ' + JSON.parse(body).imdbRating);
            console.log('Country: ' + JSON.parse(body).Country);
            console.log('Plot: ' + JSON.parse(body).Plot);
            console.log('Plot: ' + JSON.parse(body).Actors);
            console.log('********************************');



        } else {
            console.log(err);

        }


    });



}

var doWhatItSays = function(){
    fs.readFile('random.txt','utf8',function(err,response){
        if(!err)
        console.log(response);
    })

}*/




/*module.exports = {
    //twitterFunction,
    //spotifyFunction,
    controler
}*/