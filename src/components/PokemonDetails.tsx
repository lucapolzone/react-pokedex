import styled from 'styled-components';
import PokemonStats from './PokemonStats';


const DetailList = styled.ul`
  padding: var(--small-size);
  background-color: white;
`;

const PokemonDetails = () => {
  return (
    <DetailList>
      <li><strong>Name: </strong>Pikachu</li>
      <li><strong>Type: </strong>electric</li>
      <li><strong>Height: </strong>4''</li>
      <li><strong>Weight: </strong>60 lbs</li>
      <br />
      <li><strong>Stats</strong></li>

      <PokemonStats />
  </DetailList>
  );
};

export default PokemonDetails;
