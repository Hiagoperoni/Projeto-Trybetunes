import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    carregando: false,
    musicasSalvas: '',
  };

  pegarMusicas = async (trackId) => {
    const { arrayMusicas } = this.props;
    this.setState({ carregando: true });
    const musicaEscolhida = arrayMusicas.filter((aMusica) => aMusica.trackId === trackId);
    await addSong(musicaEscolhida);
    localStorage.setItem(trackId, true);
    this.setState({ carregando: false });
  };

  verificarSeEstaMarcada = (trackId) => {
    if (localStorage.getItem(trackId)) {
      return true;
    }
  };

  recuperarListaSalva = async () => {
    const { musicasSalvas } = this.state;
    const listaDeSalvas = await getFavoriteSongs();
    this.setState({ musicasSalvas: listaDeSalvas });
    console.log(musicasSalvas);
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { carregando } = this.state;
    const montarPagina = (
      <div>
        <h4>{trackName}</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favoritar">
          Favorita
          <input
            id="favoritar"
            type="checkbox"
            checked={ this.verificarSeEstaMarcada(trackId) }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ () => this.pegarMusicas(trackId) }
          />
        </label>
      </div>);
    return (
      <div>
        {
          carregando ? <Loading /> : montarPagina
        }
        <button type="button" onClick={ this.recuperarListaSalva }>Salvas</button>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  arrayMusicas: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
