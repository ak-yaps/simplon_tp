/*jshint esversion: 6*/
/*global console, document, window*/

/**
 * Module contenant une mini application de gestion des stocks côté client.
 * @return {object} objet contenant les fonctions publiques du module
 */
const tpGestionDesStocks = (function () {
    "use strict";
    // votre code JS à partir d'ici ...

    console.log("TP gestionDesStocks - ready to rock !");

    const test = function(msg) {
        return msg;
    };

    window.onload = function init() {
        console.log(testFunc("document chargé à 100%"));
        // lancez vos actions DOM à partir d'ici ici ...
    };

    return {
        test: test
    };
}());
