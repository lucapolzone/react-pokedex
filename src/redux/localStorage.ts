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
