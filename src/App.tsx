import { useState } from "react";
import "./App.css";
import { PokemonDetails } from "./componentes/PokemonDetails";
import { PokemonsList } from "./componentes/PokemonsList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  const [selectedPokemonId, setSelectedPokemonId] = useState<number>();
  
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <div>
          <h1>Pokémons List</h1>
          <PokemonsList onPokemonClick={setSelectedPokemonId} />
        </div>
        <div>
          <h1>Pokémon Detail</h1>
          <PokemonDetails id={selectedPokemonId} />
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  );
}

export default App;
