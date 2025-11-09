export default class ApiPokeService {

    api = 'https://pokeapi.co/api/v2/';

    async visualizar() {

        const response = await fetch(this.api + 'pokemon?limit=78&offset=0');

        if(!response.ok) {
            throw new Error('Erro ao consultar API');
        }

        const data = await response.json();

        return data.results;
    }
    
    async visualizarPorUrl(url)
    {
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error('Erro ao consultar API');
        }

        const data = await response.json();

        return data;
    }

    async visalizarTipoPorNome(name)
    {
        const response = await fetch(api + `type/${name}`);

        if(!response.ok) {
            throw new Error('Erro ao consultar API');
        }

        const data = await response.json();

        return data;
    }
}