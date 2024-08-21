import { useState } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PokemonDetails } from "./componentes/PokemonDetails";
import { PokemonsList } from "./componentes/PokemonsList";

// Criando uma instância do QueryClient
const queryClient = new QueryClient();

function App() {
  const [selectedPokemonId, setSelectedPokemonId] = useState<number>();
  return (
    // Passando o client para o QueryClientProvider
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
    </QueryClientProvider>
  );
}

export default App;