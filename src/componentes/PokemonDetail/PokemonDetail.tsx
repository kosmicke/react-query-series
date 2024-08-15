import { useEffect, useState } from "react";
import {
  getPokemonDetails,
  PokemonDetails,
} from "../../services/get-pokemon-details";

import "./PokemonDetail.css";

interface PokemonDetailProps {
  id: number | undefined;
}

function PokemonDetail(props: PokemonDetailProps) {
  const { id } = props;

  const [pokemon, setPokemon] = useState<PokemonDetails>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();

  const fetchPokemon = async (pokemonId: number) => {
    setIsLoading(true);
    try {
      const data = await getPokemonDetails(pokemonId);
      setPokemon(data);
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
    if (id) {
      fetchPokemon(id);
    }
  }, [id]);

  if (!id) {
    return <p>No pokémon selected.</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!pokemon) {
    return <h2>No pokemon found.</h2>;
  }

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>
        <strong>Height</strong>: {pokemon.height}
      </p>
      <p>
        <strong>Weight</strong>: {pokemon.weight}
      </p>
      <p>
        <strong>Abilities</strong>:
      </p>
      <ul>
        {pokemon.abilities.map((ability) => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ul>
      {/* <div className="pokemon-detail__form">
        <input type="text" placeholder="Novo nome" />
        <button>Salvar</button>
      </div> */}
    </div>
  );
}

export default PokemonDetail;
