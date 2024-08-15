import { useEffect, useState } from "react";
import {
  getPokemonsList,
  type PokemonListItem,
} from "../../services/get-pokemons-list";
import "./PokemonsList.css";

interface PokemonsListProps {
  onPokemonClick: (pokemonId: number) => void;
}

function PokemonsList(props: PokemonsListProps) {
  const { onPokemonClick } = props;

  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();

  const fetchPokemons = async () => {
    setIsLoading(true);
    try {
      const pokemons = await getPokemonsList();
      setPokemons(pokemons);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("An error occurred"));
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!pokemons.length) {
    return <p>No Pokémon.</p>;
  }

  return (
    <div>
      <ul className="pokemon-list">
        {pokemons.map((pokemon) => (
          <li key={pokemon.name} onClick={() => onPokemonClick(pokemon.id)}>
            {pokemon.name}
          </li>
        ))}
      </ul>
      {/* <div className="pokemon-list__pagination">
        <button>Previous</button>
        <span>Page 1</span>
        <button>Next</button>
      </div> */}
    </div>
  );
}

export default PokemonsList;
