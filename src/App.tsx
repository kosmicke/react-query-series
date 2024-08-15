import { useState } from "react";
import "./App.css";
import { PokemonDetail } from "./componentes/PokemonDetail";
import { PokemonsList } from "./componentes/PokemonsList";

function App() {
  const [selectedPokemonId, setSelectedPokemonId] = useState<number>();
  return (
    <div className="app">
      <div>
        <h1>Pokémons List</h1>
        <PokemonsList onPokemonClick={setSelectedPokemonId} />
      </div>
      <div>
        <h1>Pokémon Detail</h1>
        <PokemonDetail id={selectedPokemonId} />
      </div>
    </div>
  );
}

export default App;
