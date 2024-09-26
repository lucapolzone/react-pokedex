// Funzione getter: carica lo stato dal local storage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('pokemonState');
    if (serializedState === null) {
      return undefined; // Se non c'è stato salvato, Redux inizializza con lo stato di default
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Errore nel caricamento dello stato dal local storage", err);
    return undefined;
  }
};

// Funzione setter: salva lo stato nel local storage
export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('pokemonState', serializedState);
  } catch (err) {
    console.error("Impossibile salvare lo stato nel local storage", err);
  }
};

// Funzione getter per la cache dei suggerimenti
export const loadSuggestionCache = () => {
  try {
    const serializedCache = localStorage.getItem('pokemonSuggestionCache');
    if (serializedCache === null) {
      return {}; // Se non c'è cache salvata, ritorna un oggetto vuoto
    }
    return JSON.parse(serializedCache);
  } catch (err) {
    console.error("Errore nel caricamento della cache dei suggerimenti dal local storage", err);
    return {};
  }
};

// Funzione setter per salvare la cache dei suggerimenti
export const saveSuggestionCache = (cache: any) => {
  try {
    const serializedCache = JSON.stringify(cache);
    localStorage.setItem('pokemonSuggestionCache', serializedCache);
  } catch (err) {
    console.error("Impossibile salvare la cache dei suggerimenti nel local storage", err);
  }
};
