import styled from 'styled-components';

const PokemonPictureWrapper = styled.div`
  margin: var(--medium-size) 0;
  margin-top: var(--small-size);
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

// interfaccia corretta per la prop image
interface PokemonPictureProps {
  image: string | null; // tipo della prop 'image'
}

const PokemonPicture: React.FC<PokemonPictureProps> = ({ image }) => {

  return (
    <PokemonPictureWrapper>
      { image ? (
          <PokemonSprite src={image} alt="pokemon" />
        ) : (
          <p>&nbsp;</p>
        ) 
      }
    </PokemonPictureWrapper>
  );
};

export default PokemonPicture;

