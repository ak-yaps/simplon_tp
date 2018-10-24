/*jshint esversion: 6*/
/*global document, window, console*/

var modSpot = (function modSpot() {
  "use strict";
  var   accessToken = 'BQB4QGADPkwzvidLgnVz8jSHQZNaXEYNjCqhsiuwZQYu1M3oaZYdpQGlUUGjATwwGChBuT_f7sRxw_h3kOQ3T_K1rJwaW0CMY7EwalJ8F2ql_n5GjlqTzsx_PoW9LcVsPQ7W674UhmhxYoW03_mLd_2t1RYOEZp_i7aql32yGKTw4D04FFcH5Q&refresh_token=AQADjy6cLRltN6mSQ8Qu0wQaetB0o8cFLe-Xu22mY6Ljy9U-P8VU3Wfr4XIjvKJ1fMKAzb-4dDovddiDYv00hr-uTepsonByq0wH71SWMgZXJKOHYXJzp8VXsBcrRc4nU9M';

  const init = function init() {
    var templateSource = document.getElementById('results-template').innerHTML,
        template = Handlebars.compile(templateSource),
        resultsPlaceholder = document.getElementById('results'),
        searchArtist = 'muse';

    var getAuth = function getAuth() {
      $.ajax({
        method: "get",
        headers: {
          "X-Requested-With": null
        },
        url: 'https://accounts.spotify.com/authorize/client_id=217wfdtp2xv5agfy7vj6si5gq&response_type=code&redirect_uri=http://localhost/simplon/tp/07_tp_projet_app/projet_littlebigtech/test_api_search_name',
        success: function(response) {
          callback(response);
        }
      });
    };

    var getToken = function getToken() {
      $.ajax({
        url: 'https://api.spotify.com/v1/me',
        headers: {
          'Authorization': 'Bearer ' + accessToken
        },
        success: function(response) {
          console.log('token ok');
          console.log(response);
        }
      });
    };

    var search = function search() {
      $.ajax({
        method: "get",
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        url: 'https://api.spotify.com/v1/search?q=' + searchArtist + '&type=album',
        success: function(response) {
          console.log(response);
          resultsPlaceholder.innerHTML += JSON.stringify(response.albums.items[0].name);

        }
      });
    };

    return {
      getAuth,
      search
    };
  };

  window.addEventListener("DOMContentLoaded", init);
}());
