import ApiPokeService from "../api/main.js";


window.addEventListener('load', async () => {

    const pokeService = new ApiPokeService();

    const listPokemons = document.querySelector('#list-pokemons');

    let pokemons = new Array();
    let types = new Set();

    async function gerarCards() {

        try {

            pokemons = await pokeService.visualizar();

            const pokemonsByUrl = await Promise.all(visualizarPokemons(pokemons));

            criaCardPokemon(pokemonsByUrl);

            return pokemonsByUrl;

        } catch (error) {
            console.error(error.message);
        }

    }

    function visualizarPokemons(pokemons) {

        
        let pokemonsByUrl = pokemons.map(async (pokemon) => {
            
            const response = await pokeService.visualizarPorUrl(pokemon.url);

            const pokemonData = {
                id: null,
                name: null,
                image: null,
                types: [],
            }

            pokemonData.name = response.name;
            pokemonData.id = response.id;
            pokemonData.image = response.sprites.front_default;
            response.types.forEach(data => {
                types.add(data.type.name);
                pokemonData.types.push(data.type.name);
            })

            return pokemonData;

        }) 
        
        return pokemonsByUrl;
    }

    function criaCardPokemon(pokemons) {

        pokemons.forEach(pokemon => {
            const item = document.createElement('li');

            item.setAttribute('id', pokemon.id);
            item.classList.add('flex-1', 'w-25', 'd-flex', 'justify-content-center', 'flex-column', 'rounded', 'shadow');

            const image = document.createElement('img');
            image.src = pokemon.image;
            image.classList.add('rounded-top')

            const title = document.createElement('h2');
            title.textContent = pokemon.name;
            title.classList.add('text-center', 'py-2', 'title-color-text')

            if(pokemon.types.includes('fire')) {
                item.classList.add('bg-danger');
                image.classList.add('bg-danger-subtle');
            } else if(pokemon.types.includes('grass') || pokemon.types.includes('bug')) {
                item.classList.add('bg-success');
                image.classList.add('bg-success-subtle');
            } else if(pokemon.types.includes('water')) {
                item.classList.add('bg-info');
                image.classList.add('bg-info-subtle');
            } else if(pokemon.types.includes('poison')) {
                item.classList.add('poison-color');
                image.classList.add('poison-color-subtle')
            } else if(pokemon.types.includes('electric')) {
                item.classList.add('bg-warning');
                image.classList.add('bg-warning-subtle');
            } else if(pokemon.types.includes('ground')) {
                item.classList.add('ground-color');
                image.classList.add('ground-color-subtle')
            }  else if(pokemon.types.includes('fairy')) {
                item.classList.add('fairy-color'); 
                image.classList.add('fairy-color-subtle');
            }  else {
                item.classList.add('bg-dark');
                image.classList.add('bg-secondary');
            } 
            
            item.appendChild(image);
            item.appendChild(title);

            
            const divTypes = document.createElement('div');
            divTypes.classList.add('d-flex', 'flex-wrap', 'justify-content-center', 'gap-3')
            item.appendChild(divTypes);

            pokemon.types.forEach(type => {
                const typeCard = document.createElement('p');
                typeCard.textContent = type;
                typeCard.classList.add('text-center', 'type-color-text', 'fs-5', 'd-inline')
                divTypes.appendChild(typeCard);
            })


            listPokemons.appendChild(item);
        });

    }

await gerarCards()

});