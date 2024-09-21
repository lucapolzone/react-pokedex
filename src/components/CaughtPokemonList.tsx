import styled from 'styled-components';

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
  return (
    <List>
      <h2>Pokemon catturati</h2>
      <Ul>
        <Li>
          <PokemonName>Pikachu</PokemonName>
          <Controllers>
            <i className="fa-solid fa-eye"></i>
            <i className="fa-solid fa-circle-xmark"></i>
          </Controllers>
        </Li>
        <Li>
          <PokemonName>Charmander</PokemonName>
          <Controllers>
            <i className="fa-solid fa-eye"></i>
            <i className="fa-solid fa-circle-xmark"></i>
          </Controllers>
        </Li>
        <Li>
          <PokemonName>Bulbasaur</PokemonName>
          <Controllers>
            <i className="fa-solid fa-eye"></i>
            <i className="fa-solid fa-circle-xmark"></i>
          </Controllers>
        </Li>
        <Li>
          <PokemonName>Squirtle</PokemonName>
          <Controllers>
            <i className="fa-solid fa-eye"></i>
            <i className="fa-solid fa-circle-xmark"></i>
          </Controllers>
        </Li>
        <Li>
          <PokemonName>Rattata</PokemonName>
          <Controllers>
            <i className="fa-solid fa-eye"></i>
            <i className="fa-solid fa-circle-xmark"></i>
          </Controllers>
        </Li>
        <Li>
          <PokemonName>Spearow</PokemonName>
          <Controllers>
            <i className="fa-solid fa-eye"></i>
            <i className="fa-solid fa-circle-xmark"></i>
          </Controllers>
        </Li>
        <Li>
          <PokemonName>Snake</PokemonName>
          <Controllers>
            <i className="fa-solid fa-eye"></i>
            <i className="fa-solid fa-circle-xmark"></i>
          </Controllers>
        </Li>
      </Ul>
    </List>
  );
};

export default CaughtPokemonList;
