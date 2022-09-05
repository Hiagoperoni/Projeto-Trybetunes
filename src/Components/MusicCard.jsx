import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    loading: false,
  };

  // salvarNosFavoritos = () => {
  //   const { trackId } = this.props;
  //   this.setState({ loading: true })
  //     .then(() => addSong(trackId))
  //     .then(() => this.setState({ loading: false }));
  // };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    // const { loading } = this.state;
    // if (loading === true) {
    //   return <Loading />;
    // }
    return (
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
        <p>{trackId}</p>
        {/* <input type="checkbox" onChecked={ this.salvarNosFavoritos() } /> */}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;
