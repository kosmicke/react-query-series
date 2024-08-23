export interface PokemonListItem {
  id: number;
  name: string;
  url: string;
}

export interface Response {
  results: PokemonListItem[];
  count: number
}

export interface Params {
  limit: number;
  offset: number;
}

async function getPokemonsList(params: Params) {
  const { limit, offset } = params;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const data = await response.json();

  const results = data.results.map((pokemon: Omit<PokemonListItem, "id">) => {
    return {
      ...pokemon,
      id: pokemon.url.split("/").slice(-2)[0],
    };
  });

  return {
    results,
    count: data.count,
  } as Response
}

export { getPokemonsList };
