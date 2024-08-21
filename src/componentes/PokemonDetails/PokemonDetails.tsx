import { getPokemonDetails } from "../../services/get-pokemon-details";

import "./PokemonDetails.css";
import { useQuery } from "@tanstack/react-query";

interface PokemonDetailProps {
  id: number | undefined;
}

function PokemonDetail(props: PokemonDetailProps) {
  const { id } = props;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => getPokemonDetails(id!),
    enabled: !!id,
  });

  if (!id) {
    return <p>No pokémon selected.</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <h2>No pokemon found.</h2>;
  }

  return (
    <div>
      <h2>{data.name}</h2>
      <img src={data.sprites.front_default} alt={data.name} />
      <p>
        <strong>Height</strong>: {data.height}
      </p>
      <p>
        <strong>Weight</strong>: {data.weight}
      </p>
      <p>
        <strong>Abilities</strong>:
      </p>
      <ul>
        {data.abilities.map((ability) => (
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