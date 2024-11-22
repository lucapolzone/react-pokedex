import { configureStore } from '@reduxjs/toolkit'; //configureStore: funzione per configurare lo store di Redux
import { loadState, saveState } from './localStorage'; // funzioni per caricare e salvare lo stato dal local storage
import { PokemonState } from './pokemonSlice'; // Importa l'interfaccia
import pokemonReducer from './pokemonSlice'; //importa il reducer

const preloadedState: { pokemon: PokemonState } = loadState();

// definisco lo Store di Redux
const store = configureStore({ 
    //configureStore prevede un oggetto "reducer" che mappa la chiave (nominata in questo caso pokemon) al suo reducer  
    reducer: { 
      pokemon: pokemonReducer, 
    },
    preloadedState,
});

console.log(store.getState());

// Ogni volta che lo stato cambia, salvalo nel local storage
store.subscribe(() => {
  saveState({
    pokemon: store.getState().pokemon, // Salva solo la parte relativa ai Pokémon
  });
});

export default store;

export type RootState = ReturnType<typeof store.getState>; //ReturnType è funzione integrata di typescript. Specifica il tipo di return di una funzione
// export type AppDispatch = typeof store.dispatch; forse non mi serve
// RootState e AppDispatch sono elementi typescript ma usati con Redux
// type RootState definisce il tipo dello stato globale
// type AppDispatch definisce il tipo delle azioni per modificare lo stato globale

/*

Store
└ State (stato globale di redux)
   └ chiave: pokemon
     └ pokemonSlice
        └ pokemonReducer
           └ actions
   └ chiave (un'altra chiave)
     └ altroSlice
       └ altroReducer
         └ Altre azioni

*/