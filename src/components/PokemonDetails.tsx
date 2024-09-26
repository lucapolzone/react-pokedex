import styled from 'styled-components';
import PokemonStats from './PokemonStats';

const DetailList = styled.ul`
  padding: var(--small-size);
  background-color: rgb(184, 184, 184);
  min-height: 242px;
`;

// interfaccia corretta per la prop 'pokemon'
interface PokemonDetailsProps {
  pokemon: any; // da tipizzare meglio
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon }) => {
  return (
    <DetailList>
      {pokemon && pokemon.name ? (
        <>
          <li><strong>Name: </strong>{pokemon.name}</li>
          <li><strong>Type: </strong>{pokemon.types.map((type: any) => type.type.name).join(', ')}</li>
          <li><strong>Height: </strong>{pokemon.height}</li>
          <li><strong>Weight: </strong>{pokemon.weight}</li>
          <br />
          <li><strong>Stats</strong></li>
          <PokemonStats />
        </>
      ) : (
        <p>&nbsp;</p>
      )}
    </DetailList>
  );
};


export default PokemonDetails;
