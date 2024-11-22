import styled from 'styled-components';
import CaughtPokemonList from './components/CaughtPokemonList';
import PokemonSearch from './components/PokemonSearch';
import PokemonPicture from './components/PokemonPicture';
import PokemonDetails from './components/PokemonDetails';
import { useSelector } from 'react-redux'; // per accedere allo stato di redux
import { RootState } from './redux/store'; // per ottenere il tipo dello stato globale
import { useState } from 'react';

import './App.css';
import { Container, Row, Col } from 'styled-bootstrap-grid';

const Wrapper = styled.div`
  margin-top: var(--small-size);
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
  width: 100%;
  border-right: 3px solid salmon;
  // border-top-left-radius: 20px;
  // border-bottom-left-radius: 20px;
  `;
  
  const RightContainer = styled(BaseContainer)`
  width: 100%;
  border-left: 3px solid salmon;
  // border-top-right-radius: 20px;
  // border-bottom-right-radius: 20px;
`;


// gestisce entrambi i componenti che dipendono dallo stesso stato
const ReduxSyncWrapper = ({ notFound }: { notFound: boolean }) => {
  // Uso di useSelector per estrarre lo stato attuale del Pokémon da Redux
  const pokemon = useSelector((state: RootState) => state.pokemon.currentPokemon);

  return (
    <>
      {/* passa lo stato a entrambi i componenti */}
      <PokemonPicture 
        frontImage={pokemon ? pokemon.sprites.front_default : null} 
        backImage={pokemon ? pokemon.sprites.back_default : null} 
        notFound={notFound} 
        />
      <PokemonDetails pokemon={pokemon} />
    </>
  );
};


function App() {
  const [notFound, setNotFound] = useState(false);  // stato per gestire se il pokemon non è stato trovato

  return (
    <>
      <Wrapper>
        <h1>Pokedex</h1>
        <Main>
        <Container>
          <Row>
            <Col col={12} md={6} style={{ paddingLeft: 0, paddingRight: 0, marginRight: 0 }}>
              <LeftContainer>
                <PokemonSearch setNotFound={setNotFound} />
                <ReduxSyncWrapper notFound={notFound} />
              </LeftContainer>
            </Col>
            <Col col={12} md={6} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <RightContainer>
                <CaughtPokemonList />
              </RightContainer>
            </Col>
          </Row>
        </Container>
        </Main>
      </Wrapper>
    </>
  )
}

export default App
