import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  state = {
    nomeArtista: '',
    canSearch: true,
  };

  verificarUser = () => {
    const { nomeArtista, canSearch } = this.state;
    console.log(canSearch);
    const minTamanho = 2;
    const bateuTamanhoMin = nomeArtista.length >= minTamanho;
    this.setState({ canSearch: !bateuTamanhoMin });
  };

  mudarEstado = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.verificarUser();
    });
  };

  render() {
    const { canSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="nomeArtista">
            Buscar Album:
            <input
              type="text"
              id="nomeArtista"
              name="nomeArtista"
              data-testid="search-artist-input"
              onChange={ this.mudarEstado }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ canSearch }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
