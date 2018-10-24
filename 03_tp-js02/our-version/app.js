var tbl = [];

// fonction contructeur
var Produit = function(info) {
  this.reference = info.reference;
  this.nom = info.nom;
  this.prix = info.prix;
  this.couleur = info.couleur;
  this.poids = info.poids;
};

// fonction pour créer un nouveau produit
var saisirProduit = function() {

  var reference = 0;
  var nom = document.getElementById('nom');
  var prix = document.getElementById('prix');
  var couleur = document.getElementById('couleur');
  var poids = document.getElementById('poids');

  var p = new Produit({
    reference: 'Ref ' + reference++,
    nom: nom.value,
    prix: prix.value,
    couleur: couleur.value,
    poids: poids.value
  });

  tbl.push(p);

  // créer un tableau
  for (var i = 0; i < tbl.length; i++) {

    var nouvelleLigne = document.querySelector("tbody").insertRow(-1);

    function verifNom() {
      if (nom.value === "") {
        return false;
      } else {
        var colonne0 = nouvelleLigne.insertCell(0);
        colonne0.innerHTML += tbl[i].reference;

        var colonne1 = nouvelleLigne.insertCell(1);
        colonne1.innerHTML += tbl[i].nom;
      }
    };

    function verifPrix(e) {
      if (isNaN(prix.value) === false && prix.value !== "") {
        var colonne2 = nouvelleLigne.insertCell(2);
        colonne2.innerHTML += tbl[i].prix + ' &euro;';
      } else {
        return false;
      };
    };

    function verifCouleur() {
      if (couleur.value === "") {
        return false;
      } else {
        var colonne3 = nouvelleLigne.insertCell(3);
        colonne3.innerHTML += tbl[i].couleur;
      }
    };

    function verifPoids() {
      if (isNaN(poids.value) === false && poids.value !== "") {
        var colonne4 = nouvelleLigne.insertCell(4);
        colonne4.innerHTML += tbl[i].poids;

        var colonne5 = nouvelleLigne.insertCell(5);
        colonne5.innerHTML += '<button class="btnSupp">Supprimer</button>';
      } else {
        return false;
      }
    };

    function verifForm() {
      var nomOk = verifNom();
      var prixOk = verifPrix();
      var couleurOk = verifCouleur();
      var poidsOk = verifPoids();

      if (nomOk && prixOk && couleurOk && poidsOk) {
          return true;
      } else {
        alert("Veuillez remplir correctement tous les champs");

        return false;
      }
    };

    verifForm();

    // fonction Supprimer
    var btnSupp = document.querySelectorAll('.btnSupp');

    for (var k = btnSupp.length - 1; k < btnSupp.length; k++) {
      btnSupp[k].addEventListener("click", function(e) {
        var target = e.target || e.srcElement;
        suppRow = target.parentNode.parentNode.rowIndex;
        document.getElementById('table').deleteRow(suppRow);
      })
    }
  };

  // effacer les champs à chaque saisie
  var input = document.querySelectorAll('input');
  for (var j = 0; j < input.length; j++) {
    input[j].value = input[j].defaultValue;
  };

};

document.getElementById("btnValider").onclick = function() {
  saisirProduit();

  // supprime l'élément précedent dans le tableau JS
  tbl.splice(0, 1);
};

// saisirProduit();
