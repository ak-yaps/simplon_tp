/*jshint esversion: 6*/
/*global console, document, window*/

/**
 * tpGestionDesStocks
 * mini application de gestion des stocks côté client.
 * @return {object} les propriétés et méthodes publiques du module
 */
const tpGestionDesStocks = (function () {
    "use strict";
    // votre code JS à partir d'ici ...
    const produits = [];
    var maxProducts = 0;

    const afficherStock = function afficherStock() {
      document.getElementById("stock_actuel").textContent = produits.length;
    }

    /**
     * Fonction pour faire apparaître/disparaître la page active
     * @param {object} prod - le produit à afficher
     * @return {undefined} RAS
     */
    const ajouterTableur = function ajouterTableur(prod) {
        const ligne = document.createElement("tr");
        const icon = document.createElement("i");
        const tableur = document.getElementById("tableur_lignes");

        for (let prop in prod) {
            if (prod.hasOwnProperty(prop)) {
                const td = document.createElement("td");
                td.textContent = prod[prop];
                ligne.appendChild(td);
            }
        }

        const td = document.createElement("td");
        td.classList.add("delete");
        icon.textContent = "X";
        icon.onclick = supprimerProduit;

        td.appendChild(icon);
        ligne.appendChild(td);
        ligne.id = "prod_" + prod.ref;
        tableur.appendChild(ligne);
    };


    /**
     * Fonction pour faire apparaître/disparaître la page active
     * @param {string} mode - le suffixe de l'id de la page à afficher
     * @return {object} l'objet DOM représentant la page active'
     */
    const changerAffichage = function changerAffichage(mode) {
        const prec = document.querySelector(".page.is-active");
        const active = document.getElementById("page_" + mode);

        if (prec === active) {
            return active;

        } else if (prec) {
            prec.classList.remove("is-active");
        }

        active.classList.add("is-active");

        return active;
    };


    /**
     * Ajoute un produit au stock et dans le DOM
     * @param {object} evt - l'objet représentant l'event click du form
     * @return {object|boolean} le nouveau produit créé si aucune erreur de formulaire OU false sinon
     */
    const creerProduit = function creerProduit(evt) {

        evt.preventDefault();
        // si balise form, empêche le reload !!!

        const valid = validerProduit();

        console.log("saisie valide ? => " + valid);

        if (!valid) {
            return false;
        }

        const prod = new Produit({
            nom: document.getElementById("nom").value,
            prix: Number(document.getElementById("prix").value)
        });

        produits.push(prod); // le tableu js est mis à jour !
        ajouterTableur(prod); // la ligne est ajoutée au tableur
        afficherStock();
        verifierTableurVide(); // vérifie la longueur du tableau pour éventuellement retirer la ligne par défaut dans le HTML
        console.log("nouveau produit saisi => ");
        console.log(prod);
        console.log("stock =>");
        console.log(produits);
        return prod;
    };


    /**
     * Lance les actions initiales du module
     * @return {undefined} objet contenant les fonctions publiques du module
     */
    const init = function init() {
        const btnAccueil = document.getElementById("aller_accueil");
        const btnLister = document.getElementById("lister_prods");
        const btnCreer = document.getElementById("creer_prod");
        const btnValider = document.getElementById("valider_prod");
        // lancez vos actions DOM à partir d'ici ...
        btnAccueil.onclick = function() {
            changerAffichage("accueil");
        };
        btnLister.onclick = function() {
            changerAffichage("lister");
        };
        btnCreer.onclick = function() {
            changerAffichage("creer");
        };

        btnValider.onclick = creerProduit;
    };


    /**
     * Produit à ajouter au stock de produits
     * @constructor
     * @param {object} param - les infos du nouveau produit
     * @return {object} le nouveau produit créé
     */
    const Produit = function Produit(p) {
        maxProducts += 1;
        this.ref = "ref_" + maxProducts;
        this.nom = p.nom || null;
        this.prix = p.prix || null;
    };


    /**
     * Supprime un produit donné du stock et du DOM
     * @param {object} evt - l'objet représentant l'event click sur supprimer
     * @return {number} la taille du stock mis à jour
     */
    const supprimerProduit = function supprimerProduit(evt) {
        const ligneSupprimee = supprimerDuTableur(this);
        // console.log("ligneSupprimee =>");
        // console.log(ligneSupprimee);

        produits.forEach(function(prod, i) {
            if ("prod_" + prod.ref === ligneSupprimee.id) {
                produits.splice(i, 1);
            }
        });

        afficherStock();
        verifierTableurVide();
        // console.log("stock mis à jour =>");
        // console.log(produits);
        return produits.length;
    };


    /**
     * Supprime un produit donné du stock et du DOM
     * @param {object} icon - objet DOM de l'icône suppression cliquée
     * @return {object} l'objet DOM retiré de l'arbre DOM
     */
    const supprimerDuTableur = function supprimerDuTableur(icon) {
        const ligne = icon.parentElement.parentElement;
        return document.getElementById("tableur_lignes").removeChild(ligne);
    };


    /**
     * Supprime un produit donné du stock et du DOM
     * @return {undefined}
     */
    const validerProduit = function validerProduit() {
        var error = 0, requis = document.querySelectorAll("#form_prod [required]");
        // console.log(requis);
        for (let i = 0; i < requis.length; i += 1) {
            requis[i].classList.remove("error");

            if (requis[i].type === "number" &&
            isNaN(requis[i].value) || !requis[i].value) {
                requis[i].classList.add("error");
                error += 1;

            } else if (requis[i].type === "text" &&
            !requis[i].value) {
                requis[i].classList.add("error");
                error += 1;
            }
        }
        return error === 0;
    };


    /**
     * Affiche ou masque la ligne du tableur indiquant un stock vide
     * @return {boolean} true si la ligne tableurVide est visible, false sinon
     */
    const verifierTableurVide = function verifierTableurVide() {
        const vide = document.getElementById("stock_vide");

        if (produits.length) {
            vide.classList.add("is-hidden");
        } else {
            vide.classList.remove("is-hidden");
        }

        return vide.classList.contains("is-hidden");
    };


    window.addEventListener("DOMContentLoaded", init);

    return {

    };
}());
