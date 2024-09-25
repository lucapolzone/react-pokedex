import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // importa il RootState

const PokemonPictureWrapper = styled.div`
  margin: var(--medium-size) 0;
  display: flex;
  justify-content: center;
  border: 5px solid salmon;
  background-color: #90f9ef;
  width: 100%;
  height: 200px;
`;

const PokemonSprite = styled.img`
  display: block;
  max-width: 200px;
`;

const PokemonPicture: React.FC = () => {
  const pokemon = useSelector((state: RootState) => state.pokemon.currentPokemon); // seleziona il pokemon dal Redux store

  return (
    <PokemonPictureWrapper>
      {pokemon ? (
        <PokemonSprite src={pokemon.sprites.front_default} alt="pokemon" />
      ) : (
        <p>&nbsp;</p>
      )}
    </PokemonPictureWrapper>
  );
};

export default PokemonPicture;

