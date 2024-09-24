import styled from 'styled-components';
import PokemonStats from './PokemonStats';

const DetailList = styled.ul`
padding: var(--small-size);
background-color: white;
`;

// Definisci le props per ricevere i dati del Pokémon
const PokemonDetails = ({ pokemon }: { pokemon: any }) => {
  // Verifica che l'oggetto pokemon esista e che abbia le proprietà necessarie
  if (!pokemon || !pokemon.name || !pokemon.types) {
    return <p>Inserisci il nome di un pokemon.</p>;
  }

  return (
    <DetailList>
      <li><strong>Name: </strong>{pokemon.name}</li>
      <li><strong>Type: </strong>{pokemon.types.map((type: any) => type.type.name).join(', ')}</li>
      <li><strong>Height: </strong>{pokemon.height}</li>
      <li><strong>Weight: </strong>{pokemon.weight}</li>
      <br />
      <li><strong>Stats</strong></li>
      
      <PokemonStats />
    </DetailList>
  );
};

export default PokemonDetails;