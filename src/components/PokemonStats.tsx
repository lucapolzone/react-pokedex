import styled from 'styled-components';

// wrapper per il contenitore delle statistiche
const Stats = styled.ul``;

const StatsLi = styled.li`
  display: flex;
  justify-content: space-between;
`;

const WrapperStat = styled.div`
  border: 1px solid blue;
  background-color: white; 
  width: 250px; 
  height: 12px;
`;

const Stat = styled.div<{ width: number }>`
  background-color: blue; 
  padding: 5px;
  width: ${(props) => props.width}%; 
  height: 100%;
`;

// Interfaccia per le props
interface PokemonStatsProps {
  stats: { name: string; base_stat: number }[]; // Riceve un array di oggetti con nome e valore base_stat
}

const MAX_STAT_VALUE = 255; // Valore massimo per una statistica

const PokemonStats: React.FC<PokemonStatsProps> = ({ stats }) => {
  return (
    <Stats>
      {stats.map((stat) => (
        <StatsLi key={stat.name}>
          <small>{stat.name}</small>
          <WrapperStat>
            <Stat width={(stat.base_stat / MAX_STAT_VALUE) * 125} /> {/* Calcola la larghezza in base alla percentuale */}
          </WrapperStat>
        </StatsLi>
      ))}
    </Stats>
  );
};

export default PokemonStats;
