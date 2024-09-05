export interface PokemonData {
  name: string;
  id: number;
}

async function editPokemonDetails(pokemonData: PokemonData) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts/" + pokemonData.id,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: pokemonData.name }),
    }
  );
  const data = await response.json();

  return data;
}

export { editPokemonDetails };
