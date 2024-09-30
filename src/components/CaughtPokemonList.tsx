import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux'; //hooks di redux con react. useSelector: accede allo stato del Redux store. useDispatch: fornisce una funzione che invia actions allo store.
import { RootState } from '../redux/store';
import { deletePokemon, clearCaughtPokemons } from '../redux/pokemonSlice';
import { saveState } from '../redux/localStorage';
import { useState } from 'react';
import Modal from 'react-modal';
import PokemonDetails from './PokemonDetails';

// Assegno la modale all'elemento #root
Modal.setAppElement('#root');

const List = styled.div`
  padding: 2rem;
  background-color: white;
  max-height: 535px;
  overflow-y: auto;
`;

const Ul = styled.ul`
  margin-top: var(--medium-size);
`;

const Li = styled.li`
  margin: var(--small-size) 0;
  display: flex;
  justify-content: space-between;
`;

const PokemonName = styled.small``;


const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between; 
`;


const ButtonResetList = styled.button`
  padding: 0.4rem;
  font-size: 1rem;
`;


const Controllers = styled.div`
  .fa-eye {
    color: blue;
    margin-right: 8px;
    cursor: pointer;
  }

  .fa-circle-xmark {
    color: red;
    cursor: pointer;
  }
`;

const ModalElWrapper = styled.div`
  text-align: center;
`;

const ModalPokemonImg = styled.img`
  width: 170px;
`;

const ModalButton = styled.button`
  margin-top: var(--small-size);
  background-color: blue;
  color: #fff;
  padding: 0.6rem;
`;


// Componente statico CaughtPokemonList
const CaughtPokemonList = () => {
  const caughtPokemons = useSelector((state: RootState) => state.pokemon.caughtPokemons); //laa funzione prende state come argomento e restituisce state.pokemon.caughtPokemons.
  // console.log(caughtPokemons);
  
  const dispatch = useDispatch();

  // console.log("Redux actions:",pokemonSlice.actions);

  // Stato per gestire l'apertura della modale e il pokemon selezionato
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  
  const handleClearList = () => {
    dispatch(clearCaughtPokemons());  // Dispatch dell'azione per svuotare la lista
    saveState({ pokemon: { caughtPokemons: [], currentPokemon: null } });  
  };

  const openModal = async (pokemonName: string) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await res.json();
    setSelectedPokemon(data);  // Imposta i dettagli del pokemon selezionato
    setIsModalOpen(true);      // Apre la modale
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  // Stili per la modale
  const modalStyle = {
    content: {
      width: '450px',
      height: 'fit-content',
      margin: 'auto',
      padding: '1rem',
      borderRadius: '10px',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };


  return (
    <List>
      <TopWrapper>
        <h2>Pokemon catturati</h2>
        <ButtonResetList onClick={handleClearList}>
          <i className="fa-solid fa-trash-can"></i><small>&nbsp; Svuota lista</small>
          </ButtonResetList>
      </TopWrapper>
      <Ul>
      {caughtPokemons.map((pokemon) => (
        <Li key={pokemon}>
          <PokemonName>{pokemon}</PokemonName>
          <Controllers>
            <i className="fa-solid fa-eye" onClick={() => openModal(pokemon)}></i>
            <i className="fa-solid fa-circle-xmark" onClick={() => dispatch(deletePokemon(pokemon))}></i>
          </Controllers>
        </Li>
      ))}
      </Ul>

      {/* Modale dettagli del pokemon */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={modalStyle}>
        {selectedPokemon && (
          <>
          <ModalElWrapper>
            <ModalPokemonImg
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
              />
          </ModalElWrapper>
            {/* Viene passato il colore di background come prop */}
            <PokemonDetails pokemon={selectedPokemon} backgroundColor="#fff" />
          </>
        )}
        <ModalElWrapper>
          <ModalButton onClick={closeModal}>Chiudi</ModalButton>
        </ModalElWrapper>
      </Modal>
    </List>
  );
};

export default CaughtPokemonList;
