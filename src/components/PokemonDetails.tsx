import styled from 'styled-components';
import PokemonStats from './PokemonStats';

const DetailList = styled.ul`
  padding: var(--small-size);
  background-color: rgb(184, 184, 184);
  min-height: 242px;
`;

// interfaccia per la prop 'pokemon'
interface PokemonDetailsProps {
  pokemon: {
    name: string;
    types: { type: { name: string } }[]; // array di tipi di pokemon
    height: number;
    weight: number;
    stats: { base_stat: number; stat: { name: string } }[]; // array di statistiche
  };
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon }) => {
  return (
    <DetailList>
      {pokemon && pokemon.name ? (
        <>
          <li><strong>Name: </strong>{pokemon.name}</li>
          <li><strong>Type: </strong>{pokemon.types.map((type: any) => type.type.name).join(', ')}</li>
          <li><strong>Height: </strong>{pokemon.height}</li>
          <li><strong>Weight: </strong>{pokemon.weight} lbs</li>
          <br />
          <li><strong>Stats</strong></li>
          {/* Passo le statistiche al componente PokemonStats */}
          <PokemonStats stats={pokemon.stats.map((stat: any) => ({
            name: stat.stat.name,
            base_stat: stat.base_stat
          }))} />
        </>
      ) : (
        <p>&nbsp;</p>
      )}
    </DetailList>
  );
};


export default PokemonDetails;
