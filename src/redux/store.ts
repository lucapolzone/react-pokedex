import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemonSlice'; // di default è nameReducer. "pokemon" lo prende da pokemonSlice.ts -> //nome dello slice

const store = configureStore({ //configureStore accetta un oggetto di configurazione.
  reducer: { // chiave con l'oggetto di configurazione
    pokemon: pokemonReducer, 
    //do un nome alla chiave. per chiarezza gli do "pokemon", il nome dello slice
    //pokemonReducer è il reducer associato a quello slice, che dentro avrà le sue azioni relative.
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>; //ReturnType è funzione integrata di typescript. Specifica il tipo di return di una funzione
// export type AppDispatch = typeof store.dispatch; forse non mi serve
// RootState e AppDispatch sono elementi typescript ma usati con Redux
// type RootState definisce il tipo dello stato globale
// type AppDispatch definisce il tipo delle azioni per modificare lo stato globale
