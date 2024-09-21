import styled from 'styled-components';
import Pikachu from '../assets/pikachu.jpg';

const PokemonPictureWrapper = styled.div`
  margin: var(--medium-size) 0;
  display: flex;
  justify-content: center;
  border: 5px solid salmon;
  background-color: rgb(184, 184, 184);
`;

const PokemonSprite = styled.img`
  display: block;
  width: 100%;
  max-width: 200px;
`;

const PokemonPicture = () => {
  return (
    <PokemonPictureWrapper>
      <PokemonSprite src={Pikachu} />
    </PokemonPictureWrapper>
  );
};

export default PokemonPicture;
