import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemon, fetchPokemonSuggestions } from '../api/fetchPokemon';
import { setCurrentPokemon, resetPokemon, catchPokemon } from '../redux/pokemonSlice'; // Importa l'azione
import { loadSuggestionCache, saveSuggestionCache } from '../redux/localStorage'; // Importa le funzioni del localStorage
import styled from 'styled-components'; // importa styled-components
import { RootState } from '../redux/store'; // importa RootState per accedere allo stato globale


// Interfaccia per un suggerimento di pokemon
interface Suggestion {
  name: string;
}


const SuggestionList = styled.ul`
  background-color: rgba(255, 255, 255, 0.8);
  position: absolute;
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
  cursor: pointer; 
  &:hover {
    background-color: rgba(255, 255, 0, 0.4); 
  }
`;

const WarningWrapper = styled.div`
  height: 30px;
  border: 1px solid rgb(170, 0, 0);
`;

const AlreadyCaughtMessage = styled.small`
  display: inline-block;
  color: yellow;
  padding-top: 0.5rem;
`;

interface PokemonSearchProps {
  setNotFound: (notFound: boolean) => void;  // aggiungo una prop per gestire lo stato di 'not found'
}

const PokemonSearch: React.FC<PokemonSearchProps> = ({ setNotFound }) => {
  const [pokemonName, setPokemonName] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]); // Stato per i suggerimenti
  const [debounceTimeout, setDebounceTimeout] = useState<ReturnType<typeof setTimeout> | null>(null); // Stato per gestire il debounce
  const [showWarning, setShowWarning] = useState(false); // Nuovo stato per visualizzare o nascondere il messaggio
  
  // suggestionCache è l'oggetto che salva le ricerche in cache
  const [suggestionCache, setSuggestionCache] = useState<{ [key: string]: Suggestion[] }>({}); 
  
  const dispatch = useDispatch(); // hook di redux

  const currentPokemon = useSelector((state: RootState) => state.pokemon.currentPokemon); // Accedi al pokemon attualmente visualizzato
  const caughtPokemons = useSelector((state: RootState) => state.pokemon.caughtPokemons); // Accedi ai pokemon catturati

  useEffect(() => {
    // al montaggio del componente carica la cache dei suggerimenti dal local storage
    const cachedSuggestions = loadSuggestionCache();
    setSuggestionCache(cachedSuggestions);
  }, []);

  // Funzione per effettuare la ricerca di un pokemon
  const handleSearch = async () => {
    if (pokemonName.trim() === '') return;
    try {
      const result = await fetchPokemon(pokemonName);
      dispatch(setCurrentPokemon(result)); // salva i dati nel redux store
      setNotFound(false);  // pokemon trovato
    } catch (error) {
      console.error('Errore nella ricerca del pokemon:', error);
      dispatch(setCurrentPokemon(null));  // Resetta il pokemon corrente se non viene trovato
      setNotFound(true); // pokemon trovato
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
    const value = event.target.value.trim().toLowerCase();
    setPokemonName(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout); // Pulisci il timeout precedente
    }

    // Imposta un nuovo timeout per il debounce
    const newTimeout = setTimeout(async () => {
      if (value.length > 0) {
        // Controlla se il suggerimento esiste già nella cache
        if (suggestionCache[value]) {
          const suggestionNames = suggestionCache[value].map(suggestion => suggestion.name);
          console.log("Suggerimenti trovati in cache:", suggestionNames);
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
    setShowWarning(false); // Nascondoil messaggio di avviso al reset
    setNotFound(false);  // Resetta lo stato di 'not found' al reset
  };

  // Funzione per catturare il pokemon corrente
  const handleCatch = () => {
    if (currentPokemon) {
      if (caughtPokemons.includes(currentPokemon.name)) {
        setShowWarning(true); // Mostra il messaggio se il pokemon è già stato catturato

        // Nascondi il messaggio dopo 5 secondi
        setTimeout(() => {
          setShowWarning(false);
        }, 5000);
      } else {
        dispatch(catchPokemon(currentPokemon.name)); // Usa il nome del pokemon corrente
        setShowWarning(false); // Nascondi il messaggio se il pokemon viene catturato
      }
    }
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
      <button type="submit" onClick={handleCatch}>CATCH!</button>
      <button type="button" onClick={handleReset}>RESET</button>
      
      <WarningWrapper>
        {/* Mostra il messaggio di avviso se il pokemon è già stato catturato */}
        {showWarning && <AlreadyCaughtMessage>Hai già catturato questo pokemon!</AlreadyCaughtMessage>}
      </WarningWrapper>
    </>
  );
};

export default PokemonSearch;
