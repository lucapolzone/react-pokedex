import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux'; //hooks di redux con react. useSelector: accede allo stato del Redux store. useDispatch: fornisce una funzione che invia actions allo store.
import { RootState } from '../redux/store';
import { deletePokemon } from '../redux/pokemonSlice';
// import { pokemonSlice } from '../redux/pokemonSlice';


const List = styled.div`
  padding: 2rem;
  background-color: white;
`;

const Ul = styled.ul`
  margin-top: var(--medium-size);
`;

const Li = styled.li`
  margin: var(--small-size) 0;
  display: flex;
  justify-content: space-between;
`;

const PokemonName = styled.small``;

const Controllers = styled.div`
  .fa-eye {
    color: blue;
    margin-right: 8px;
    cursor: pointer;
  }

  .fa-circle-xmark {
    color: red;
    cursor: pointer;
  }
`;

// Componente statico CaughtPokemonList
const CaughtPokemonList = () => {
  const caughtPokemons = useSelector((state: RootState) => state.pokemon.caughtPokemons); //laa funzione prende state come argomento e restituisce state.pokemon.caughtPokemons.
  console.log(caughtPokemons);
  
  const dispatch = useDispatch();

  // console.log("Redux actions:",pokemonSlice.actions);

  return (
    <List>
      <h2>Pokemon catturati</h2>
      <Ul>
      {caughtPokemons.map((pokemon) => (
        <Li key={pokemon}>
          <PokemonName>{pokemon}</PokemonName>
          <Controllers>
            <i className="fa-solid fa-eye"></i>
            <i className="fa-solid fa-circle-xmark" onClick={() => dispatch(deletePokemon(pokemon))}></i>
          </Controllers>
        </Li>
      ))}
      </Ul>
    </List>
  );
};

export default CaughtPokemonList;
