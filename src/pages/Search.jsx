import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../Components/Loading';
import CardAlbum from '../Components/CardAlbum';

class Search extends React.Component {
  state = {
    nomeArtista: '',
    canSearch: true,
    loading: false,
    pesquisaFeita: false,
    albuns: [],
  };

  verificarUser = () => {
    const { nomeArtista } = this.state;
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

  buscarArtista = () => {
    const { nomeArtista } = this.state;
    this.setState({ loading: true });
    searchAlbumsAPI(nomeArtista)
      .then((data) => this.setState({ albuns: data }))
      .then(() => this.setState({ pesquisaFeita: true }));
  };

  render() {
    const { canSearch, loading, pesquisaFeita, albuns, nomeArtista } = this.state;
    const formularioDePesquisa = (
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
          onClick={ this.buscarArtista }
        >
          Pesquisar
        </button>
      </form>);
    const todosOsAlbuns = (
      <div>
        {formularioDePesquisa}
        <p>
          {`Resultado de álbuns de: ${nomeArtista}`}
        </p>
        <ul>
          {
            albuns.map((cadaAlbum) => (
              <Link
                to={ `/album/${cadaAlbum.collectionId}` }
                key={ cadaAlbum.collectionName }
              >
                <CardAlbum
                  collectionId={ cadaAlbum.collectionId }
                  imagem={ cadaAlbum.artworkUrl100 }
                  nomeAlbum={ cadaAlbum.collectionName }
                  nomeDoArtista={ cadaAlbum.artistName }
                />
              </Link>
            ))
          }
        </ul>
      </div>
    );
    const carregarInfos = loading ? <Loading /> : formularioDePesquisa;
    const mostrarAlbuns = albuns.length > 0
      ? todosOsAlbuns : <p>Nenhum álbum foi encontrado</p>;
    return (
      <div data-testid="page-search">
        <Header />
        {
          pesquisaFeita ? mostrarAlbuns : carregarInfos
        }
      </div>
    );
  }
}

export default Search;
