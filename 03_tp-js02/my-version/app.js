var tpStock = (function() {
    var tbl, ref, nom, prix, couleur, poids, btnSupp, btnValider;

    function getId(id) {
      return document.getElementById(id);
    }

    ref = 0;
    nom = getId('nom');
    prix = getId('prix');
    couleur = getId('couleur');
    poids = getId('poids');
    btnValider = getId('btnValider');

    function getNewProduct() {
      btnValider.addEventListener('click', function() {

        var Produit = function() {
          this.ref = ref,
            this.nom = nom.value,
            this.prix = prix.value,
            this.couleur = couleur.value,
            this.poids = poids.value
        }

        var nvoProduit = new Produit({
          ref: ref++,
          nom: nom,
          prix: prix,
          couleur: couleur,
          poids: poids
        })

        if ((isNaN(nvoProduit.prix && nvoProduit.poids) === false) && ((nvoProduit.nom && nvoProduit.prix && nvoProduit.couleur && nvoProduit.poids) !== "")) {
          tbl.push(nvoProduit);
        } else {
          alert('Veuillez remplir correctement les champs');
          ref--;
        }

        for (var i = tbl.length - 1; i < tbl.length; i++) {
          var newRow = document.querySelector("tbody").insertRow(-1);

          if ((isNaN(nvoProduit.prix && nvoProduit.poids) === false) && ((nvoProduit.nom && nvoProduit.prix && nvoProduit.couleur && nvoProduit.poids) !== "")) {
            var col0 = newRow.insertCell(0);
            col0.innerHTML += 'ref ' + tbl[i].ref;
          }
          var col1 = newRow.insertCell(1);
          col1.innerHTML += tbl[i].nom;
          var col2 = newRow.insertCell(2);
          col2.innerHTML += tbl[i].prix + '	&euro;';
          var col3 = newRow.insertCell(3);
          col3.innerHTML += tbl[i].couleur;
          var col4 = newRow.insertCell(4);
          col4.innerHTML += tbl[i].poids + ' g';
          var col5 = newRow.insertCell(5);
          col5.innerHTML += '<button class="btnSupp">Supprimer</button>';

          var btnSupp = document.querySelectorAll('.btnSupp');
          for (var k = btnSupp.length - 1; k < btnSupp.length; k++) {
            btnSupp[k].addEventListener("click", function(e) {
              var target = e.target || e.srcElement;
              suppRow = target.parentNode.parentNode.rowIndex;
              document.getElementById('table').deleteRow(suppRow);
            })
          }
          tbl.splice(0, 1);
        }

        var input = document.querySelectorAll('input');
        for (var j = 0; j < input.length; j++) {
          input[j].value = input[j].defaultValue;
        };
      })
    };

    window.onload = function() {
      tbl = [];
      getNewProduct();
      console.log(tbl);
    }
  }
  ());
