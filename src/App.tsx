import styled from 'styled-components';
import CaughtPokemonList from './components/CaughtPokemonList';
import PokemonSearch from './components/PokemonSearch';
import PokemonPicture from './components/PokemonPicture';
import PokemonDetails from './components/PokemonDetails';

import './App.css';


const Wrapper = styled.div`
  margin: var(--small-size);
`;

const Main = styled.main`
  margin: var(--small-size);
  display: flex;
  justify-content: center;
`;

const BaseContainer = styled.div`
  padding: var(--medium-size);
  background-color: rgb(170, 0, 0);
  border: 6px solid salmon;
  width: 550px;
  padding-bottom: var(--medium-size);
`;

const LeftContainer = styled(BaseContainer)`
  border-right: 3px solid salmon;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

const RightContainer = styled(BaseContainer)`
  border-left: 3px solid salmon;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;

function App() {
  return (
    <>
      {/* Qui andranno i miei componenti  */}
      <Wrapper>
        <h1>Pokedex</h1>
        <Main>
          <LeftContainer>
            <PokemonSearch />
            <PokemonPicture />
            <PokemonDetails>
            </PokemonDetails>
          </LeftContainer>
          <RightContainer>
            <CaughtPokemonList />
          </RightContainer>
        </Main>
      </Wrapper>
    </>
  )
}

export default App
