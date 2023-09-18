console.log("script chargé");

const selectElement = document.querySelector("select");
const detailsButton = document.querySelector("#details");
const retourButton = document.querySelector("#retour");



function NomPokemon() {
  const Api = `https://pokebuildapi.fr/api/v1/pokemon/`;

  //liaison api pokemon//

  fetch(Api)
    .then((response) => response.json())
    .then((data) => {
      // Parcourez les données pour créer des options dans le select
      data.forEach((pokemon) => {
        const option = document.createElement("option");
        option.value = pokemon.name; // Assurez-vous que "name" correspond au nom du Pokémon dans les données
        option.textContent = pokemon.name;
        selectElement.appendChild(option);
      });
    });
}

NomPokemon();

function getValues(event) {
  event.preventDefault();

  const selectedPokemon = selectElement.value;

  const Api2 = `https://pokebuildapi.fr/api/v1/pokemon/${selectedPokemon}`;

  //liaison api pokemon//

  fetch(Api2)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(
        "h2"
      ).textContent = `Voici les informations de ${selectedPokemon}`;
      document.querySelector("img").setAttribute("src", data.image);
      let arrayP = document.querySelectorAll(".resultat>p");
      let arrayTypes = [];
      data.apiTypes.forEach((type) => {
        arrayTypes.push(type.name);
      });
      let stringTypes = arrayTypes.join("/");
      console.log(stringTypes);

      let arrayEvolutions = [];
      data.apiEvolutions.forEach((evolutions) => {
        arrayEvolutions.push(evolutions.name);
      });
      let stringEvolutions = arrayEvolutions.join("/");
      console.log(stringEvolutions);

      arrayP[0].textContent = `Élement: ${stringTypes}`;
      arrayP[1].textContent = `Évolution: ${stringEvolutions}`;

      document.querySelector("#details").style.visibility = "visible";


      detailsButton.addEventListener("click", () => {
       

        const main= document.getElementById("main");

        while (main.firstChild) {
          main.removeChild(main.firstChild);
        }
        
        const statsApi = `https://pokebuildapi.fr/api/v1/pokemon/${selectedPokemon}/`;
        
        fetch(statsApi)
          .then((response) => response.json())
          .then((statsData) => {
            // Traitez les données des statistiques ici

        

            const option3 = document.createElement("h1");
            option3.textContent =("Les statistique :");
            main.appendChild(option3);
           
            const option2 = document.createElement("div");
            option2.textContent =("Points de vie : " +statsData.stats.HP);
            main.appendChild(option2);

            const option4 = document.createElement("div");
            option4.textContent =("Attaque : " +statsData.stats.attack);
            main.appendChild(option4);

            const option5 = document.createElement("div");
            option5.textContent =("Défense : " +statsData.stats.defense);
            main.appendChild(option5);

            const option6 = document.createElement("div");
            option6.textContent =("Attaque spécial : " +statsData.stats.special_attack);
            main.appendChild(option6);

            const option7 = document.createElement("div");
            option7.textContent =("Défense spécial : " +statsData.stats.special_defense);
            main.appendChild(option7);

            const option8 = document.createElement("div");
            option8.textContent =("Vitesse : " +statsData.stats.speed);
            main.appendChild(option8);


           
           
            console.log(statsData);

            //............................
            console.log(statsData.stats.HP);
           
            console.log("Le bouton retour est censé être visible maintenant.");
            
          retourButton.style.visibility = "visible";

           
          });
      });
    });
}

const FElement = document.querySelector("form");
FElement.addEventListener("submit", getValues);

// Modifiez l'écouteur d'événements du bouton "retour" pour qu'il ne soit visible que si les statistiques sont affichées
retourButton.addEventListener("click", () => {

  window.location.href = "index.html";
 
 
});
