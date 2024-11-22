import axios from 'axios';

interface PokemonResult {
  name: string;
}


// Interfaccia per descrivere la struttura di un Pokémon
export interface Pokemon {
  id: number;
  name: string;
  types: Array<{ type: { name: string } }>;
  height: number;
  weight: number;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  sprites: {
    front_default: string;
    back_default: string;
  };
}


const fetchPokemon = async (pokemonName: string) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    return response.data; // Restituisce i dati del Pokémon
  } catch (error) {
    console.error("Errore nel fetching del Pokémon:", error);
    throw error; // Propaga l'errore
  }
};

const fetchPokemonSuggestions = async (pokemonName: string) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`); // Ottieni un elenco di Pokémon
    const filteredPokemon = response.data.results.filter((pokemon: PokemonResult) =>
      pokemon.name.startsWith(pokemonName.toLowerCase())
    );
    return filteredPokemon; // Restituisce l'elenco filtrato dei Pokémon
  } catch (error) {
    console.error("Errore nel fetching dei suggerimenti Pokémon:", error);
    throw error; // Propaga l'errore
  }
};

export { fetchPokemon, fetchPokemonSuggestions }; // Esporta entrambe le funzioni
