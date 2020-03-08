import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import Button from '../../../components/Button';
import { ButtonDiv, ContainerButtonSearch, TopContainer } from '../styles';

export default function Top({
  setSearchValue,
  handleSearch,
  handleCadastrar,
  searchValue,
}) {
  return (
    <TopContainer>
      <strong>Gerenciando encomendas</strong>
      <ContainerButtonSearch>
        <label htmlFor="search">
          <MdSearch color="#ccc" size={22} />
          <input
            id="search"
            type="text"
            value={searchValue}
            placeholder="Buscar encomenda"
            onChange={e => {
              setSearchValue(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </label>

        <ButtonDiv>
          <Button
            buttonType="button"
            saveButton
            icon="add"
            handleClick={handleCadastrar}
          >
            Cadastrar
          </Button>
        </ButtonDiv>
      </ContainerButtonSearch>
    </TopContainer>
  );
}
Top.propTypes = {
  setSearchValue: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleCadastrar: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
};

Top.defaultProps = {
  searchValue: '',
};
