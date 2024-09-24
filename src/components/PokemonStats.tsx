import styled from 'styled-components';

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

const Stat = styled.div`
  background-color: blue; 
  padding: 5px; height: 100%;
`;

const Stat1 = styled(Stat)`width: 40%;`;
const Stat2 = styled(Stat)`width: 60%;`;
const Stat3 = styled(Stat)`width: 70%;`;
const Stat4 = styled(Stat)`width: 80%;`;
const Stat5 = styled(Stat)`width: 30%;`;
const Stat6 = styled(Stat)`width: 90%;`;


const PokemonStats = () => {
  return (
    <Stats>
      <StatsLi>
        <small>hp</small>
        <WrapperStat>
          <Stat1 />
        </WrapperStat>
      </StatsLi>
      <StatsLi>
        <small>attack</small>
        <WrapperStat>
          <Stat2 />
        </WrapperStat>
      </StatsLi>
      <StatsLi>
        <small>defense</small>
        <WrapperStat>
          <Stat3 />
        </WrapperStat>
      </StatsLi>
      <StatsLi>
        <small>special-attack</small>
        <WrapperStat>
          <Stat4 />
        </WrapperStat>
      </StatsLi>
      <StatsLi>
        <small>special-defense</small>
        <WrapperStat>
          <Stat5 />
        </WrapperStat>
      </StatsLi>
      <StatsLi>
        <small>speed</small>
        <WrapperStat>
          <Stat6 />
        </WrapperStat>
      </StatsLi>
    </Stats>
  );
};

export default PokemonStats;
