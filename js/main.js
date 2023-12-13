const listPokemon = document.querySelector("#listPokemon");
const buttonHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/"

for (let i=1; i<=151; i++){
    fetch(URL+i)
        .then((Response) => Response.json())
        .then(data => showPokemon(data))
    }

function showPokemon(Pokemon){
    let types = Pokemon.types.map(type => `<p class="${type.type.name} type">${type.type.name}</p>`);
    types = types.join('');

    let heightFixed = parseFloat(Pokemon.height);
    console.log(heightFixed)

    let pokemonId = Pokemon.id.toString();
    if (pokemonId.length === 1){
        pokemonId = "00" + pokemonId;
    }
    else if (pokemonId.length === 2){
        pokemonId = "0" + pokemonId;
    }

    const div = document.createElement("div");
    div.classList.add("Pokemon");
    div.innerHTML = `
        <div class="pokemon">
            <p class="pokemon-id-back">#${pokemonId}</p>
            <div class="pokemon-image">
                <img src=${Pokemon.sprites.front_default} alt=${Pokemon.name} class="center">
            </div>
            <div class="pokemon-info">
                <div class="container-name">
                    <p class="pokemon-id">#${pokemonId}</p>
                    <h2 class="pokemon-name">${Pokemon.name}</h2>
                </div>
                <div class="pokemon-types">
                    ${types}
                </div>
                <div class="pokemon-stats">
                    <p class="stat">${Pokemon.height}m</p>
                    <p class="stat">${Pokemon.weight}kg</p>
                </div>
            </div>
        </div>`;
        listPokemon.append(div);
}

buttonHeader.forEach(button => button.addEventListener("click", (event) => {
    const buttonId = event.currentTarget.id;

    listPokemon.innerHTML = "";

    for (let i=1; i<=151; i++){
        fetch(URL+i)
            .then((Response) => Response.json())
            .then(data => {

                if(buttonId === "ver-todos"){
                    showPokemon(data)
                }
                else{
                    const types = data.types.map(type => type.type.name);
                    if(types.some(type => type.includes(buttonId))){
                        showPokemon(data)
                    }
                }
            })
        }
}))