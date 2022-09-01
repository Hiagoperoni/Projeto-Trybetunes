import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

class Header extends React.Component {
  render() {
    const { nomeCabecalho } = this.props;
    return (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search">
          <p>Buscar</p>
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites">
          <p>Musicas Favoritas</p>
        </Link>
        <Link to="/profile" data-testid="link-to-profile">
          <p>Perfil</p>
        </Link>
        <p data-testid="header-user-name">{ nomeCabecalho }</p>
      </header>
    );
  }
}

Header.propTypes = {
  nomeCabecalho: PropTypes.string.isRequired,
};

export default Header;
