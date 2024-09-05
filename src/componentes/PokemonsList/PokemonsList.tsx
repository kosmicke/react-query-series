import { useEffect, useState } from "react";
import {
  getPokemonsList,
} from "../../services/get-pokemons-list";
import "./PokemonsList.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface PokemonsListProps {
  onPokemonClick: (pokemonId: number) => void;
}

const limit = 20;

function PokemonsList(props: PokemonsListProps) {
  const { onPokemonClick } = props;

  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(0)

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => {
      const offset = (page - 1) * limit
      return getPokemonsList({ limit, offset });
    },
  })

  useEffect(() => {
    if(page < maxPage){
      const nextPage = page + 1
      const offset = (nextPage - 1) * limit
  
      queryClient.prefetchQuery({
        queryKey: ["pokemons", nextPage],
        queryFn: () => getPokemonsList({ limit, offset }),
      })
    }
  }, [maxPage, page, queryClient])

  useEffect(() => {
    if (data) {
      setMaxPage(Math.ceil(data.count / limit))
    }
  },[data])

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data?.results.length) {
    return <p>No pokémons found.</p>;
  }

  return (
    <div>
      <ul className="pokemon-list">
        {data.results.map((pokemon) => (
          <li key={pokemon.name} onClick={() => onPokemonClick(pokemon.id)}>
            {pokemon.name}
          </li>
        ))}
      </ul>
      <div className="pokemon-list__pagination">
        <button 
          disabled={page <= 1} 
          onClick={() => setPage(prev => prev-1)}>
            Previous
        </button>
        <span>Page {page}/{maxPage}</span>
        <button 
          disabled={page >= maxPage} 
          onClick={() => setPage(prev => prev+1)}
          >
            Next
        </button>
      </div>
    </div>
  );
}

export default PokemonsList;
