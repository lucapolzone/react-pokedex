import { useState } from 'react';
import fetchPokemon from '../api/fetchPokemon';
import { fetchPokemonSuggestions } from '../api/fetchPokemon';

const PokemonSearch = ({ setPokemonData }: { setPokemonData: (data: any) => void }) => {
  const [pokemonName, setPokemonName] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]); // Stato per i suggerimenti

  const handleSearch = async () => {
    if (pokemonName.trim() === '') return;
    try {
      const result = await fetchPokemon(pokemonName);
      setPokemonData(result); // Passa i dati a App.tsx
    } catch (error) {
      console.error('Errore nella ricerca del Pokémon:', error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(); // Chiama la funzione di ricerca se il tasto è "Enter"
    }
  };

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPokemonName(value);
    
    // Ottieni suggerimenti solo se ci sono almeno 1 carattere
    if (value.length > 0) {
      try {
        const results = await fetchPokemonSuggestions(value);
        setSuggestions(results.slice(0, 3)); // Limita i suggerimenti a 3
      } catch (error) {
        console.error('Errore nel fetching dei suggerimenti:', error);
      }
    } else {
      setSuggestions([]); // Se non c'è input, resetta i suggerimenti
    }
  };

  // Funzione per selezionare un suggerimento
  const handleSuggestionClick = (suggestion: string) => {
    setPokemonName(suggestion);
    setSuggestions([]); // Nascondi i suggerimenti dopo la selezione
  };

  return (
    <>
      <input
        type="search"
        placeholder="Cerca un pokemon"
        value={pokemonName}
        onChange={handleChange} // Cambia da onChange a handleChange
        onKeyDown={handleKeyDown}
      />
      <button type="button" onClick={handleSearch}>
        <i className="fa-solid fa-magnifying-glass"></i>
        Cerca
      </button>
      <button type="submit">CATCH!</button>

      {/* Mostra i suggerimenti */}
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion) => (
            <li key={suggestion.name} onClick={() => handleSuggestionClick(suggestion.name)}>
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default PokemonSearch;
