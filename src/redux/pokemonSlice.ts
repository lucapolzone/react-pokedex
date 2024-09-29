// createSlice, crea uno slice ovvero una porzione dello stato con la sua logica di aggiornamento (azioni e reducer).
//PayloadAction: è un tipo TypeScript di Redux che rappresenta un'azione in Redux con un payload (dati che passano con l'azione). È utile per tipizzare le azioni che modificano lo stato.
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface: Una struttura in TypeScript per l'oggetto. Specifica le proprietà e i loro tipi.
export interface PokemonState {
  caughtPokemons: string[]; // array di nomi di pokemon catturati
  currentPokemon: any | null; // dati del pokemon cercato

}

const initialState: PokemonState = { // sintassi typescript: costante initialState, tipo PokemonState
  caughtPokemons: ['Pikachu', 'Charmander', 'Bulbasaur', 'Spearow', 'Rattata', 'Squirtle', 'Ekans', ], // pokemon iniziali catturati
  currentPokemon: null, // inizialmente nessun pokemon selezionato

};

const pokemonSlice = createSlice({
  name: 'pokemon', //nome dello slice
  initialState, //stato iniziale dello slice, definito precedentemente
  reducers: { 
    // il reducer contiene le azioni e aggiorna lo stato dello slice
    // si usa "reducers" perchè altrimenti mi da errore, ma è più corretto concettualemente "reducer" al singolare

    //Azione per aggiungere un nuovo pokemon catturato
    //catchPokemon nome dell'azione
    catchPokemon: (state, action: PayloadAction<string>) => { //PayloadAction è un tipo generico, PayloadAction<string> è un tipo specifico 
      state.caughtPokemons.push(action.payload); //state arriva da createSlice
    },

    //Azione per rimuovere un pokemon dalla lista
    //deletePokemon nome dell'azione
    deletePokemon: (state, action: PayloadAction<string>) => {
      state.caughtPokemons = state.caughtPokemons.filter(
        (pokemon) => pokemon !== action.payload
      );
      // console.log(state.caughtPokemons); 
    },

    // Imposta i dati del pokemon cercato
    setCurrentPokemon: (state, action: PayloadAction<any>) => {
      state.currentPokemon = action.payload; 
    },

    resetPokemon: (state) => {
      state.currentPokemon = null; // azzera lo stato
    },
    
    // Azione per svuotare la lista
    clearCaughtPokemons: (state) => {
      state.caughtPokemons = [];  
    },
  },
});

// createSlice crea le azioni con lo stesso nome dei reducer. 
//Estraggo le azioni dall'oggetto pokemonSlice.actions.
export const { catchPokemon, deletePokemon, setCurrentPokemon, resetPokemon, clearCaughtPokemons } = pokemonSlice.actions;

export default pokemonSlice.reducer;

