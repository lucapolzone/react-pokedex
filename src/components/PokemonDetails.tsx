import styled from 'styled-components';
import PokemonStats from './PokemonStats';

const DetailList = styled.ul<{ $backgroundColor?: string }>`
  padding: var(--small-size);
  background-color: ${(props) => props.$backgroundColor || 'rgb(184, 184, 184)'}; /* usa la prop o un valore di default */
  /*$backgroundColor col dollaro perché è una transient props* /
  min-height: 242px;
`;

// Interfaccia per il tipo Pokémon
interface PokemonType {
  type: {
    name: string;
  };
}


interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}


// interfaccia per la prop 'pokemon'
interface PokemonDetailsProps {
  pokemon: {
    name: string;
    types: PokemonType[]; // Usa l'interfaccia PokemonType
    height: number;
    weight: number;
    stats: PokemonStat[];
  };
  backgroundColor?: string; // background color prop
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon, backgroundColor }) => {
  return (
    <DetailList $backgroundColor={backgroundColor}>
      {pokemon && pokemon.name ? (
        <>
          <li><strong>Name: </strong>{pokemon.name}</li>
          <li><strong>Type: </strong>{pokemon.types.map((type: PokemonType) => type.type.name).join(', ')}</li>
          <li><strong>Height: </strong>{pokemon.height}</li>
          <li><strong>Weight: </strong>{pokemon.weight} lbs</li>
          <br />
          <li><strong>Stats</strong></li>
          {/* Passo le statistiche al componente PokemonStats */}
          <PokemonStats stats={pokemon.stats.map((stat) => ({
            name: stat.stat.name,  // Estraggo il nome della statistica
            base_stat: stat.base_stat // Estraggo il valore base
          }))} />
        </>
      ) : (
        <p>&nbsp;</p>
      )}
    </DetailList>
  );
};


export default PokemonDetails;
