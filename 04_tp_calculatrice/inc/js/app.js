/*jshint esversion: 6*/
/*global document, window, console*/

var calculator = (function calculator() {
  "use strict";
  const init = function init() {
    const input = document.querySelectorAll('input');
    var inputValue = function inputValue() {
      input.forEach(function(val) {
        val.addEventListener('click', function() {
          console.log(val.value);
        });
      });
    };
    inputValue();
  };
  window.addEventListener("DOMContentLoaded", init);
}());
