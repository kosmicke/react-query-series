export interface PokemonListItem {
  id: number;
  name: string;
  url: string;
}

async function getPokemonsList() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await response.json();

  const list = data.results.map((pokemon: Omit<PokemonListItem, "id">) => {
    return {
      ...pokemon,
      id: pokemon.url.split("/").slice(-2)[0],
    };
  });

  return list as PokemonListItem[];
}

export { getPokemonsList };
