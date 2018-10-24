/*jshint esversion: 6*/
/*global document, window, console*/

var  modVision = (function modVision() {
  "use strict";
const initVision = function initVision() {
  function celebritiesButtonClick() {
    // Clear the display fields.
    $("#sourceImage").attr("src", "#");
    $("#responseTextArea").val("");
    $("#captionSpan").text("");

    // Display the image.
    var sourceImageUrl = $("#inputImage").val();
    $("#sourceImage").attr("src", sourceImageUrl);

    IdentifyCelebrities(sourceImageUrl, $("#responseTextArea"), $("#captionSpan"));
  }

  /* Identify celebrities in the image at the specified URL by using Microsoft Cognitive Services
   * Celebrities API.
   * @param {string} sourceImageUrl - The URL to the image to analyze for celebrities.
   * @param {<textarea> element} responseTextArea - The text area to display the JSON string returned
   *                             from the REST API call, or to display the error message if there was
   *                             an error.
   * @param {<span> element} captionSpan - The span to display the image caption.
   */
  function IdentifyCelebrities(sourceImageUrl, responseTextArea, captionSpan, getName) {
    // Request parameters.
    var params = {
      "model": "celebrities"
    };

    // Perform the REST API call.
    $.ajax({
        url: common.uriBasePreRegion +
          $("#subscriptionRegionSelect").val() +
          common.uriBasePostRegion +
          common.uriBaseCelebrities +
          "?" +
          $.param(params),

        // Request headers.
        beforeSend: function(jqXHR) {
          jqXHR.setRequestHeader("Content-Type", "application/json");
          jqXHR.setRequestHeader("Ocp-Apim-Subscription-Key",
            encodeURIComponent($("#subscriptionKeyInput").val()));
        },

        type: "POST",

        // Request body.
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
      })

      .done(function(data) {

        // Show formatted JSON on webpage.
        responseTextArea.val(JSON.stringify(data, null, 2));
        // responseTextArea.val(JSON.stringify(data.result.celebrities[0].name));
        // var getName = JSON.stringify(data.result.celebrities[0].name);
        // console.log(getName);

        // Extract and display the caption and confidence from the first caption in the description object.
        if (data.result && data.result.celebrities) {
          var celebrity = data.result.celebrities[0];

          if (celebrity.name && celebrity.confidence) {
            captionSpan.text("Celebrity name: " + celebrity.name +
              " (confidence: " + celebrity.confidence + ").");
          }
        }

        console.log(data);

      })

      .fail(function(jqXHR, textStatus, errorThrown) {
        // Prepare the error string.
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
          jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;

        // Put the error JSON in the response textarea.
        responseTextArea.val(JSON.stringify(jqXHR, null, 2));

        // Show the error message.
        alert(errorString);
      });
  }
};

  window.addEventListener("DOMContentLoaded", initVision);
}());
