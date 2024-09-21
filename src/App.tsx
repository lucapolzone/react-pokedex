import styled from 'styled-components';
import CaughtPokemonList from './components/CaughtPokemonList';


const Container = styled.div`
  margin: 20px;
  border: 1px solid red;
`;

function App() {
  return (
    <>
      <h1>My Pokedex</h1>

      <Container>
        <CaughtPokemonList />
        {/* Qui andranno i miei componenti  */}
      </Container>
    </>
  )
}

export default App
