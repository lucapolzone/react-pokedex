import axios from 'axios';

const fetchPokemon = async (pokemonName: string) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    return response.data; // Restituisce i dati del Pokémon
  } catch (error) {
    console.error("Errore nel fetching del Pokémon:", error);
    throw error; // Propaga l'errore
  }
};

export default fetchPokemon;
