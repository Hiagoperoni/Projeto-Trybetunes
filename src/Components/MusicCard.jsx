import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    carregando: false,
    adicionouFavoritas: false,
  };

  pegarMusicas = async (trackId) => {
    const { arrayMusicas } = this.props;
    this.setState({ carregando: true });
    const musicaEscolhida = arrayMusicas.filter((aMusica) => aMusica.trackId === trackId);
    await addSong(musicaEscolhida);
    localStorage.setItem('checked', true);
    this.setState({ carregando: false });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { carregando, adicionouFavoritas } = this.state;
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
            checked={ localStorage.getItem('checked') }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ () => this.pegarMusicas(trackId) }
          />
        </label>
      </div>);
    // const carregarPagina = carregando ? <Loading /> : montarPagina;
    return (
      <div>
        {/* {
          adicionouFavoritas ? montarPagina : carregarPagina
        } */}
        {
          carregando ? <Loading /> : montarPagina
        }
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
