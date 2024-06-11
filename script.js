/*A partir del siguiente archivo: https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json
Crea un pokédex, es decir una página web donde puedas consultar pokemones, y leer información sobre cada pokemon que se muestre.
La página web debe:
Mostrar una lista en tarjetas de todos los pokemones en el json. Las tarjetas deben mostrar el nombre y tipo de cada Pokémon (tipo agua, tipo fuego, tipo venenoso, etc.)
Permitir que, al hacer click sobre la tarjeta de un pokemon, se despliegue más información, como el peso, sus movimientos (ataques), etc. De preferencia empleando un modal.
El sitio web debe tener un buscador de pokemones, donde puedas filtrar pokemones por nombre.
Cosas a tener en cuenta:
Diseño libre (Bootstrap, materialize, o tu propio css)
Uso de clases e instancias.
EcmaScript 6
Repo en Github (Github pages es un plus)*/

/*class Pokemon {
    constructor(id, name, type, weight, moves) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.weight = weight;
        this.moves = moves;
    }
    createCard() {
        const card = document.createElement('div');
        card.classList.add('col-sm-6', 'col-md-4', 'col-lg-3');
        card.innerHTML = `
            <div class="card pokemon-card" data-bs-toggle="modal" data-bs-target="#pokemonModal" onclick="showPokemonDetails(${this.id})">
                <div class="card-body">
                    <h5 class="card-title">${this.name}</h5>
                    <p class="card-text">${this.type.map(t => `<span class="pokemon-type ${t.toLowerCase()}">${t}</span>`).join(' ')}</p>
                </div>
            </div>
        `;
        return card;
    }
    static fromJSON(json) {
        return new Pokemon(json.id, json.name, json.type, json.weight, json.moves);
    }
}

let pokemons = [];

document.addEventListener("DOMContentLoaded", () => {
    const pokemonContainer = document.getElementById('pokemon-container');
    const searchInput = document.getElementById('search-input');

    const http = require('http');
const httpProxy = require('http-proxy');

const targetUrl = 'https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json';
const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
proxy.web(req, res, { target: targetUrl });
});

server.listen(8080, () => {
console.log('Proxy server is running on port 8080');
});

const url = 'http://localhost:8080';


    const displayPokemons = (pokemonList) => {
        pokemonContainer.innerHTML = "";
        pokemonList.forEach(pokemon => {
            const pokemonCard = pokemon.createCard(); 
            pokemonContainer.appendChild(pokemonCard);
        }); 
    }

    searchInput.addEventListener('input', () => {
        const filteredPokemons = pokemons.filter(pokemon => 
            pokemon.name.toLowerCase().includes(searchInput.value.toLowerCase())
        );
        displayPokemons(filteredPokemons);
    })
})*/
class Pokemon {
    constructor(id, name, type, weight, abilities, image) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.weight = weight;
        this.abilities = abilities;
        this.image = image; 
    }

    createCard() {
        const card = document.createElement('div');
        card.classList.add('col-sm-6', 'col-md-4', 'col-lg-3');
        card.innerHTML = `
            <div class="card pokemon-card" data-bs-toggle="modal" data-bs-target="#pokemonModal" onclick="showPokemonDetails(${this.id})">
            <img src="${this.image}" class="card-img-top" alt="${this.name}">
                <div class="card-body">
                    <h5 class="card-title">${this.name}</h5>
                    <p class="card-text">${this.type.map(t => `<span class="pokemon-type ${t.toLowerCase()}">${t}</span>`).join(' ')}</p>
                </div>
            </div>
        `;
        return card;
    }

    static fromJSON(json) {
        return new Pokemon(json.id, json.name, json.type, json.weight, json.abilities || [], json.ThumbnailImage);
    }
}

let pokemons = [];

document.addEventListener("DOMContentLoaded", () => {
    const pokemonContainer = document.getElementById('pokemon-container');
    const searchInput = document.getElementById('search-input');

    fetch('pokemons.json')  // Asegúrate de que el archivo JSON está en la misma carpeta que tu script
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        pokemons = data.map(pokemonData => Pokemon.fromJSON(pokemonData));
        displayPokemons(pokemons);
    })
    .catch(error => console.error('Error fetching the pokemons:', error));

    /*fetch('pokemons.json')  // Changed to local file
        .then(response => response.json())
        .then(data => {
            pokemons = data.map(pokemonData => Pokemon.fromJSON(pokemonData));
            displayPokemons(pokemons);
        })
        .catch(error => console.error('Error fetching the pokemons:', error));*/

    const displayPokemons = (pokemonList) => {
        pokemonContainer.innerHTML = "";
        pokemonList.forEach(pokemon => {
            const pokemonCard = pokemon.createCard();
            pokemonContainer.appendChild(pokemonCard);
        });
    };

    searchInput.addEventListener('input', () => {
        const filteredPokemons = pokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchInput.value.toLowerCase())
        );
        displayPokemons(filteredPokemons);
    });
});

function showPokemonDetails(pokemonId) {
    const pokemon = pokemons.find(p => p.id === pokemonId);
    const modalTitle = document.getElementById('pokemonModalLabel');
    const modalBody = document.getElementById('pokemon-details');


    if (!pokemon) {
        modalTitle.textContent = "Pokémon no encontrado";
        modalBody.innerHTML = "<p>No se pudo encontrar la información del Pokémon.</p>";
        return;
    }

    modalTitle.textContent = pokemon.name;
    modalBody.innerHTML = `
        <img src="${pokemon.image}" class="img-fluid mb-3" alt="${pokemon.name}">
        <p><strong>Peso:</strong> ${pokemon.weight}</p>
        <p><strong>:</strong> ${pokemon.abilities.join(', ')}</p>
    `;
}




