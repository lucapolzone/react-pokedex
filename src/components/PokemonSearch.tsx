import { useState } from 'react';
import fetchPokemon from '../api/fetchPokemon';

const PokemonSearch = ({ setPokemonData }: { setPokemonData: (data: any) => void }) => {
  const [pokemonName, setPokemonName] = useState('');

  const handleSearch = async () => {
    if (pokemonName.trim() === '') return;
    try {
      const result = await fetchPokemon(pokemonName);
      setPokemonData(result); // Passa i dati a App.tsx
    } catch (error) {
      console.error('Errore nella ricerca del Pokémon:', error);
    }
  };

  return (
    <>
      <input
        type="search"
        placeholder="Cerca un pokemon"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
      />
      <button type="button" onClick={handleSearch}>
        <i className="fa-solid fa-magnifying-glass"></i>
        Cerca
      </button>
      <button type="submit">CATCH!</button>
    </>
  );
};

export default PokemonSearch;
