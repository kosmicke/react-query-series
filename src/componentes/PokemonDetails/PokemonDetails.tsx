import { useEffect, useState } from "react";
import {
  getPokemonDetails,
  type PokemonDetails,
} from "../../services/get-pokemon-details";

import "./PokemonDetails.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editPokemonDetails, type PokemonData } from "../../services/edit-pokemon-details";

interface PokemonDetailProps {
  id: number | undefined;
}

function PokemonDetail(props: PokemonDetailProps) {
  const { id } = props;

  const [editName, setEditName] = useState("");

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({ 
    queryKey: ["pokemon", id], 
    queryFn: () => getPokemonDetails(id!),
    enabled: !!id
  });

  const updateMutation = useMutation<void, Error, PokemonData>({
    mutationFn: async(pokemonData) => {
      await editPokemonDetails(pokemonData)
    }, 
    onSuccess: (_, variables) => {
      // queryClient.invalidateQueries({
      //   queryKey: ["pokemon", variables.id]
      // })

      queryClient.setQueryData<PokemonDetails>(["pokemon", id], (oldData) => {

        if(!oldData) return;

        return {
          ...oldData,
          name: variables.name
        }
      })

      window.alert(`Pokemon ${variables.name} atualizado com sucesso!`)
    },
    onError: (error) => {
      console.error(error)
      window.alert("Erro ao atualizar o pokemon")
    },
  });

  useEffect(() => {
    setEditName("");
    updateMutation.reset();
  }, [id]);

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
      <div className="pokemon-detail__form">
        <input 
          type="text" 
          placeholder="Novo nome"  
          value={editName} 
          onChange={e => setEditName(e.target.value)}
        />
        <button  onClick={()=> updateMutation.mutate({id, name: editName}) }>
          Salvar
        </button>
      </div>
      {updateMutation.isPending && <p>Atualizando...</p>}
      {updateMutation.isError && <p>Erro ao atualizar o pokemon</p>}
      {updateMutation.isSuccess && <p>Pokemon atualizado com sucesso!</p>}
    </div>
  );
}

export default PokemonDetail;
