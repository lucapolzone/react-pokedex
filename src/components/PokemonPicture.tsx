import styled from 'styled-components';
import { useEffect, useState } from 'react';

const PokemonPictureWrapper = styled.div`
  margin: var(--medium-size) 0;
  margin-top: var(--small-size);
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid salmon;
  background-color: #90f9ef;
  width: 100%;
  height: 200px;
  color: red;
`;

// const notFoundPokemon = styled.h3``;


const PokemonSprite = styled.img`
  display: block;
  max-width: 200px;
  height: 100%;
`;


// interfaccia corretta per la prop image
interface PokemonPictureProps {
  frontImage: string | null; // prop per l'immagine frontale
  backImage: string | null;  // prop per l'immagine posteriore
  notFound: boolean;  // aggiungo una prop per gestire se il pokemon non è stato trovato
}

const PokemonPicture: React.FC<PokemonPictureProps> = ({ frontImage, backImage, notFound }) => {
  const [image, setImage] = useState<string | null>(frontImage); // Stato per l'immagine corrente

  useEffect(() => {
    setImage(frontImage); // Imposta l'immagine frontale immediatamente
   
    if (frontImage && backImage) {
      const interval = setInterval(() => {
        setImage(prevImage => (prevImage === frontImage ? backImage : frontImage));
      }, 2000); // cambia immagine ogni 2 secondi

      return () => clearInterval(interval); // cleanup per evitare memory leaks
    }
  }, [frontImage, backImage]); // esegui quando cambia frontImage o backImage


  return (
    <PokemonPictureWrapper>
      { notFound ? (
        <h3>Nessun Pokémon trovato</h3>
      ) : (
        image ? <PokemonSprite src={image} alt="pokemon" /> : <p>&nbsp;</p>
      )}
    </PokemonPictureWrapper>
  );
};

export default PokemonPicture;

