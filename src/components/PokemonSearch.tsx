import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPokemon, fetchPokemonSuggestions } from '../api/fetchPokemon';
import { setCurrentPokemon, resetPokemon } from '../redux/pokemonSlice'; // Importa l'azione
import { loadSuggestionCache, saveSuggestionCache } from '../redux/localStorage'; // Importa le funzioni del localStorage
import styled from 'styled-components'; // Importa styled-components


const SuggestionList = styled.ul`
  background-color: rgba(255, 255, 255, 0.8); /* Colore di sfondo semitrasparente */
  position: absolute; /* Posizione assoluta per sovrapporre l'input */
  z-index: 1;
  width: 100%;
  max-width: 199px;
`;

const InputSearch = styled.input`
  width: 100%;
  max-width: 200px;
`;

const SuggestionItem = styled.li`
  padding: 2px 0;
  padding-left: 0.5rem;
  cursor: pointer; /* Cambia il cursore al passaggio del mouse */
  &:hover {
    background-color: rgba(255, 0, 0, 0.1); /* Colore di sfondo al passaggio del mouse */
  }
`;

const PokemonSearch = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]); // Stato per i suggerimenti
  const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<typeof setTimeout> | null>(null); // Stato per gestire il debounce
  
  // suggestionCache è l'oggetto che salva le ricerche in cache
  const [suggestionCache, setSuggestionCache] = useState<{ [key: string]: any[] }>({}); 
  
  const dispatch = useDispatch(); // hook di redux

  useEffect(() => {
    // al montaggio del componente carica la cache dei suggerimenti dal local storage
    const cachedSuggestions = loadSuggestionCache();
    setSuggestionCache(cachedSuggestions);
  }, []);

  // Funzione per effettuare la ricerca di un Pokémon
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

  // Funzione per gestire i cambiamenti dell'input e il debounce
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    setPokemonName(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout); // Pulisci il timeout precedente
    }

    // Imposta un nuovo timeout per il debounce
    const newTimeout = setTimeout(async () => {
      if (value.length > 0) {
        // Controlla se il suggerimento esiste già nella cache
        if (suggestionCache[value]) {
          console.table("Suggerimenti trovati in cache:", suggestionCache[value]);
          setSuggestions(suggestionCache[value]); // Usa i suggerimenti dalla cache
        } else {
          try {
            const results = await fetchPokemonSuggestions(value);
            const newSuggestions = results.slice(0, 3); // Mostra solo i primi 3 suggerimenti

            // Aggiorna lo stato e la cache
            setSuggestionCache((prevCache) => {
              const updatedCache = { ...prevCache, [value]: newSuggestions };
              saveSuggestionCache(updatedCache); // Salva la cache nel local storage
              return updatedCache;
            });

            setSuggestions(newSuggestions); // Aggiorna i suggerimenti visualizzati
          } catch (error) {
            console.error('Errore nel fetching dei suggerimenti:', error);
          }
        }
      } else {
        setSuggestions([]); // Se l'input è vuoto, non mostra suggerimenti
      }
    }, 300); // Timeout di 300 ms prima di chiamare l'API

    setDebounceTimeout(newTimeout); // Salva il nuovo timeout
  };

  // Funzione per selezionare un suggerimento
  const handleSuggestionClick = (suggestion: string) => {
    setPokemonName(suggestion);
    setSuggestions([]); // Nascondi i suggerimenti dopo la selezione
  };

  // Funzione per resettare lo stato
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
      <InputSearch
        type="search"
        placeholder="Cerca un pokemon"
        value={pokemonName}
        onChange={handleChange} // Cambia da onChange a handleChange
        onKeyDown={handleKeyDown}
      />
      {/* Mostra i suggerimenti */}
      {suggestions.length > 0 && (
        <SuggestionList>
          {suggestions.map((suggestion) => (
            <SuggestionItem key={suggestion.name} onClick={() => handleSuggestionClick(suggestion.name)}>
              {suggestion.name}
            </SuggestionItem>
          ))}
        </SuggestionList>
        )}      
      <button type="button" onClick={handleSearch}>
        <i className="fa-solid fa-magnifying-glass"></i>
        Cerca
      </button>
      <button type="submit">CATCH!</button>
      <button type="button" onClick={handleReset}>RESET</button>

    </>
  );
};

export default PokemonSearch;
