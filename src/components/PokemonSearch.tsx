import { useState } from 'react';
import fetchPokemon from '../api/fetchPokemon';

const PokemonSearch = () => {
  const [pokemonName, setPokemonName] = useState(''); // Stato per gestire l'input dell'utente

  const handleSearch = async () => {
    if (pokemonName.trim() === '') return; // Evita chiamate se l'input è vuoto
    try {
      const result = await fetchPokemon(pokemonName); // Chiama l'API usando il nome del Pokémon
      console.log(result); 
    } catch (error) {
      console.error('Errore nella ricerca del Pokémon:', error);
    }
  };

  return (
    <>
      <input
        type="search"
        placeholder="Cerca un pokemon"
        name="pokemon-search"
        id="pokemon-search"
        value={pokemonName} // Collega lo stato dell'input all'input dell'utente
        onChange={(e) => setPokemonName(e.target.value)} // Aggiorna lo stato con l'input dell'utente
      />
      <button type="button" onClick={handleSearch}> {/* Chiama la funzione di ricerca quando si preme il pulsante */}
        <i className="fa-solid fa-magnifying-glass"></i>
        Cerca
      </button>
      <button type="submit">CATCH!</button>
    </>
  );
};

export default PokemonSearch;
