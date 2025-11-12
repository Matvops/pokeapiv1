import ApiPokeService from "../api/main.js";


window.addEventListener('load', async () => {

    const pokeService = new ApiPokeService();

    const listPokemons = document.querySelector('#list-pokemons');

    let types = new Set();

    async function gerarCards() {

        try {

            const pokemons = await pokeService.visualizar();

            const pokemonsByUrl = await Promise.all(visualizarPokemons(pokemons));

            criaCardPokemon(pokemonsByUrl);

            const typesByUrl = await Promise.all(visualizarTipos());
            
            criarCardTipos(typesByUrl);

        } catch (error) {
            console.error(error);
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

            if (pokemon.types.includes('fire')) {
                item.classList.add('bg-danger');
                image.classList.add('bg-danger-subtle');
            } else if (pokemon.types.includes('grass') || pokemon.types.includes('bug')) {
                item.classList.add('bg-success');
                image.classList.add('bg-success-subtle');
            } else if (pokemon.types.includes('water')) {
                item.classList.add('bg-info');
                image.classList.add('bg-info-subtle');
            } else if (pokemon.types.includes('poison')) {
                item.classList.add('poison-color');
                image.classList.add('poison-color-subtle')
            } else if (pokemon.types.includes('electric')) {
                item.classList.add('bg-warning');
                image.classList.add('bg-warning-subtle');
            } else if (pokemon.types.includes('ground')) {
                item.classList.add('ground-color');
                image.classList.add('ground-color-subtle')
            } else if (pokemon.types.includes('fairy')) {
                item.classList.add('fairy-color');
                image.classList.add('fairy-color-subtle');
            } else {
                item.classList.add('bg-dark');
                image.classList.add('bg-secondary');
            }

            item.appendChild(image);
            item.appendChild(title);


            const divTypes = document.createElement('div');
            divTypes.classList.add('d-flex', 'flex-wrap', 'justify-content-center', 'gap-3')
            item.appendChild(divTypes);

            pokemon.types.forEach(type => {
                const typeCard = document.createElement('a');
                typeCard.textContent = type;
                typeCard.setAttribute('href', `#${type}`);
                typeCard.classList.add('text-center', 'type-color-text', 'fs-5', 'd-inline', 'text-decoration-none', 'pb-2')
                divTypes.appendChild(typeCard);
            })


            listPokemons.appendChild(item);
        });

    }

    function visualizarTipos() {

        const typesValue = [...types.values()];

        let typesByUrl = typesValue.map(async (type) => {

            const response = await pokeService.visalizarTipoPorNome(type);

            const typeData = {
                name: null,
                double_damage_to: null,
                double_damage_from: null,
                no_damage_to: null,
                no_damage_from: null,
                half_damage_to: null,
                half_damage_from: null
            };

            typeData.name = response.name;
            typeData.double_damage_to = response.damage_relations.double_damage_to?.map(item => item.name);
            typeData.double_damage_from = response.damage_relations.double_damage_from?.map(item => item.name);
            typeData.no_damage_to = response.damage_relations.no_damage_to?.map(item => item.name);
            typeData.no_damage_from = response.damage_relations.no_damge_from?.map(item => item.name);
            typeData.half_damage_to = response.damage_relations.half_damage_to?.map(item => item.name);
            typeData.half_damage_from = response.damage_relations.half_damage_from?.map(item => item.name);

            return typeData;
        });

        return typesByUrl;
    }

    function criarCardTipos(types) {

        const listTypes = document.querySelector('#list-types');
        types.forEach(type => {

            const item = document.createElement('li');
            item.setAttribute('id', type.name);
            item.classList.add('flex', 'flex-column', 'gap-3', 'py-4', 'px-3', 'rounded-sm', 'shadow-xs', 'bg-white', 'fw-medium')

            
            const title = document.createElement('h2');
            title.classList.add('fs-4', 'fw-semibold', 'text-black');
            title.textContent = type.name;

            const no_damage_to = document.createElement('p');

            no_damage_to.textContent = `No damage to: ${type.no_damage_to ?? 'none'}`;

            const no_damage_from = document.createElement('p');

            no_damage_from.textContent = `No damage from: ${type.no_damage_from ?? 'none'}`;

            const half_damage_to = document.createElement('p');

            half_damage_to.textContent = `Half damage to: ${type.half_damage_to ?? 'none'}`;


            const half_damage_from = document.createElement('p');

            half_damage_from.textContent = `Half damage from: ${type.half_damage_from ?? 'none'}`;

            const double_damage_to = document.createElement('p');

            double_damage_to.textContent = `Double damage to: ${type.double_damage_to ?? 'none'}`;

            const double_damage_from = document.createElement('p');

            double_damage_from.textContent = `Double damage from: ${type.double_damage_from ?? 'none'}`;

            item.appendChild(title);
            item.appendChild(no_damage_to);
            item.appendChild(no_damage_from);
            item.appendChild(half_damage_to);
            item.appendChild(half_damage_from);
            item.appendChild(double_damage_to);
            item.appendChild(double_damage_from);

            listTypes.appendChild(item);
        });

    }

    await gerarCards()

});