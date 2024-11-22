import styled from 'styled-components';
import PokemonStats from './PokemonStats';
import { Pokemon } from '../api/fetchPokemon';

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


// interfaccia per la prop 'pokemon'
interface PokemonDetailsProps {
  pokemon: Pokemon | null;
  backgroundColor?: string; // background color prop
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon, backgroundColor }) => {

  // Controllo se il Pokémon è null
  if (!pokemon) {
    return (
      <DetailList $backgroundColor={backgroundColor}>
        <p>Seleziona un Pokémon per vedere i dettagli</p>
      </DetailList>
    );
  }

  return (
    <DetailList $backgroundColor={backgroundColor}>
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

    </DetailList>
  );
};


export default PokemonDetails;
