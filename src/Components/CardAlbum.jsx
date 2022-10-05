import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardAlbum extends Component {
  render() {
    const { imagem, nomeAlbum, nomeDoArtista, collectionId } = this.props;
    return (
      <section data-testid={ `link-to-album-${collectionId}` }>
        <img src={ imagem } alt={ nomeAlbum } className="imgAlbum" />
        <h3 className="nomeAlbum">{ nomeAlbum }</h3>
        <h5 className="nomeArtista">{ nomeDoArtista }</h5>
      </section>
    );
  }
}

CardAlbum.propTypes = {
  imagem: PropTypes.string.isRequired,
  nomeAlbum: PropTypes.string.isRequired,
  nomeDoArtista: PropTypes.string.isRequired,
  collectionId: PropTypes.string.isRequired,
};

export default CardAlbum;
