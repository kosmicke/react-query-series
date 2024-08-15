import { useState } from "react";
import "./App.css";
import { PokemonDetails } from "./componentes/PokemonDetails";
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
        <PokemonDetails id={selectedPokemonId} />
      </div>
    </div>
  );
}

export default App;
