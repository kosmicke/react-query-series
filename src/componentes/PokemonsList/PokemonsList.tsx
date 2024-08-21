import { getPokemonsList } from "../../services/get-pokemons-list";
import "./PokemonsList.css";
import { useQuery } from "@tanstack/react-query";

interface PokemonsListProps {
  onPokemonClick: (pokemonId: number) => void;
}

function PokemonsList(props: PokemonsListProps) {
  const { onPokemonClick } = props;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pokemons"],
    queryFn: getPokemonsList,
  });

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data?.length) {
    return <p>No pokémons found.</p>;
  }

  return (
    <div>
      <ul className="pokemon-list">
        {data.map((pokemon) => (
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