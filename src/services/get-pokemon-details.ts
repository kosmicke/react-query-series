export interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

async function getPokemonDetails(id: number) {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
  const data = await response.json();

  return data as PokemonDetails;
}

export { getPokemonDetails };
