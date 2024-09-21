import styled from 'styled-components';

// Definizione degli Styled Components
const ListContainer = styled.div`
  padding: 2rem;
  background-color: white;
  border: 2px solid #ccc;
  border-radius: 8px;
  max-width: 300px;
`;

const ListTitle = styled.h2`
  font-size: 1.5rem;
  color: darkred;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const PokemonList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PokemonItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const PokemonName = styled.small`
  font-size: 1rem;
  color: #333;
`;

const Controllers = styled.div`
  display: flex;
  align-items: center;

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
  return (
    <ListContainer>
      <ListTitle>Pokemon catturati</ListTitle>
      <PokemonList>
        <PokemonItem>
          <PokemonName>Pikachu</PokemonName>
          <Controllers>
            <i className="fa-solid fa-eye"></i>
            <i className="fa-solid fa-circle-xmark"></i>
          </Controllers>
        </PokemonItem>
        <PokemonItem>
          <PokemonName>Charmander</PokemonName>
          <Controllers>
            <i className="fa-solid fa-eye"></i>
            <i className="fa-solid fa-circle-xmark"></i>
          </Controllers>
        </PokemonItem>
        <PokemonItem>
          <PokemonName>Bulbasaur</PokemonName>
          <Controllers>
            <i className="fa-solid fa-eye"></i>
            <i className="fa-solid fa-circle-xmark"></i>
          </Controllers>
        </PokemonItem>
        {/* Aggiungi qui altri Pokémon statici se desideri */}
      </PokemonList>
    </ListContainer>
  );
};

export default CaughtPokemonList;
