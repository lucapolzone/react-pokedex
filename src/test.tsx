import styled from 'styled-components';

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

interface PokemonPictureProps {
  image: string; // Definisci il tipo di prop 'image'
}

const PokemonPicture: React.FC<PokemonPictureProps> = ({ image }) => {
  return (
    <PokemonPictureWrapper>
      <PokemonSprite src={image} alt="pokemon" />
    </PokemonPictureWrapper>
  );
};

export default PokemonPicture;
