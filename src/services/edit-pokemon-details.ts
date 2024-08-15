export interface PokemonData {
  name: string;
}

async function editPokemonDetails(id: number, pokemonData: PokemonData) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts/" + id,
    {
      method: "patch",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokemonData),
    }
  );
  const data = await response.json();

  return data;
}

export { editPokemonDetails };
