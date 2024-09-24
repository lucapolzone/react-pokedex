import { useState } from 'react';
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
  const [pokemonData, setPokemonData] = useState<any>(null); // Stato per memorizzare i dati del Pokémon

  return (
    <>
      <Wrapper>
        <h1>Pokedex</h1>
        <Main>
          <LeftContainer>
            {/* Passa il setter per PokemonData */}
            <PokemonSearch setPokemonData={setPokemonData} /> 
            
            {/* PokemonPictureWrapper statico, immagine dinamica */}
            <PokemonPicture image={pokemonData ? pokemonData.sprites.front_default : null} />
            
            {/* Mostra i dettagli solo se c'è pokemonData */}
            {pokemonData && <PokemonDetails pokemon={pokemonData} />}
          </LeftContainer>
          <RightContainer>
            <CaughtPokemonList />
          </RightContainer>
        </Main>
      </Wrapper>
    </>
  );
}

export default App;
