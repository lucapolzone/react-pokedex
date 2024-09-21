// import styled from 'styled-components';

const PokemonSearch = () => {
  return (
      <>
        <input type="search" placeholder="Cerca un pokemon" name="pokemon-search" id="pokemon-search" />
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <button type="submit">CATCH!</button>
      </>
  );
};

export default PokemonSearch;
