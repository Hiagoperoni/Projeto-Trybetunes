import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import Loading from '../Components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    nomeArtista: '',
    imagemAlbum: '',
    nomeAlbum: '',
    todasAsMusicas: [],
    musicasSalvas: '',
    carregando: false,
  };

  componentDidMount() {
    this.pegarObjetoMusicas();
    this.recuperarListaSalva();
  }

  recuperarListaSalva = async () => {
    this.setState({ carregando: true });
    const listaDeSalvas = await getFavoriteSongs();
    this.setState({ musicasSalvas: listaDeSalvas });
    listaDeSalvas.forEach(({ trackId }) => localStorage.setItem(trackId, true));
    this.setState({ carregando: false });
    const { musicasSalvas } = this.state;
    console.log(musicasSalvas);
  };

  pegarObjetoMusicas = async () => {
    const { match: { params: { id } } } = this.props;
    const arrayMusicas = [];
    await getMusics(id)
      .then((data) => {
        this.setState({
          nomeArtista: data[0].artistName,
          imagemAlbum: data[0].artworkUrl100,
          nomeAlbum: data[0].collectionName,
        }); arrayMusicas.push(data);
      });
    const novoArrayMusicas = arrayMusicas[0];
    const arrayDefinitivo = novoArrayMusicas.filter((cadaUma) => cadaUma.trackId);
    this.setState({ todasAsMusicas: arrayDefinitivo });
  };

  render() {
    const { nomeArtista, imagemAlbum,
      nomeAlbum, todasAsMusicas, carregando } = this.state;
    const montarTudo = (
      <div className="albumPage">
        <div className="dadosAlbum">
          <img src={ imagemAlbum } alt={ nomeAlbum } className="imgAlbum2" />
          <p data-testid="artist-name" className="artistName">
            Artist Name:
            {' '}
            {nomeArtista}
          </p>
          <p data-testid="album-name" className="artistName">
            Collection Name:
            {' '}
            {nomeAlbum}
          </p>
        </div>
        <div className="musicas">
          {
            todasAsMusicas.map((cadaMusica) => (
              <div key={ cadaMusica.trackName } className="cadaMusica">
                <MusicCard
                  img={ cadaMusica.artworkUrl100 }
                  arrayMusicas={ todasAsMusicas }
                  key={ cadaMusica.trackName }
                  trackName={ cadaMusica.trackName }
                  previewUrl={ cadaMusica.previewUrl }
                  trackId={ cadaMusica.trackId }
                />
              </div>))
          }
        </div>
      </div>
    );
    return (
      <div data-testid="page-album">
        <Header />
        {
          carregando ? <Loading /> : montarTudo
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
};

export default Album;
