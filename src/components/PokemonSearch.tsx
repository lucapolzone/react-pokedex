import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPokemon, fetchPokemonSuggestions } from '../api/fetchPokemon';
import { setCurrentPokemon, resetPokemon } from '../redux/pokemonSlice'; // Importa l'azione

const PokemonSearch = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]); // Stato per i suggerimenti
  const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<typeof setTimeout> | null>(null); // Stato per gestire il debounce
  const dispatch = useDispatch(); // hook di redux

  const handleSearch = async () => {
    if (pokemonName.trim() === '') return;
    try {
      const result = await fetchPokemon(pokemonName);
      dispatch(setCurrentPokemon(result)); // salva i dati nel redux store
    } catch (error) {
      console.error('Errore nella ricerca del Pokémon:', error);
    }
  };

  // Funzione per gestire l'evento di pressione dei tasti
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(); // Chiama la funzione di ricerca se il tasto è "Enter"
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPokemonName(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout); // Pulisci il timeout precedente
    }

    // Imposta un nuovo timeout
    const newTimeout = setTimeout(async () => {
      if (value.length > 0) {
        try {
          const results = await fetchPokemonSuggestions(value);
          setSuggestions(results.slice(0, 3));
        } catch (error) {
          console.error('Errore nel fetching dei suggerimenti:', error);
        }
      } else {
        setSuggestions([]);
      }
    }, 300); // Aspetta 300 ms

    setDebounceTimeout(newTimeout); // Salva il nuovo timeout
  };

  // Funzione per selezionare un suggerimento
  const handleSuggestionClick = (suggestion: string) => {
    setPokemonName(suggestion);
    setSuggestions([]); // Nascondi i suggerimenti dopo la selezione
  };

  const handleReset = () => {
    setPokemonName(''); // svuota l'input search
    setSuggestions([]); // svuota i suggerimenti
    dispatch(resetPokemon()); // resetta lo stato globale di Redux
  };

  useEffect(() => {
    // Cleanup al momento della dismounting
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

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
      <button type="button" onClick={handleReset}>RESET</button>

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
