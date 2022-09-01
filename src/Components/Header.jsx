import React from 'react';
import { PropTypes } from 'prop-types';

class Header extends React.Component {
  render() {
    const { nomeCabecalho } = this.props;
    return (
      <header data-testid="header-component">
        <p>Cabeçalho</p>
        <p data-testid="header-user-name">{ nomeCabecalho }</p>
      </header>
    );
  }
}

Header.propTypes = {
  nomeCabecalho: PropTypes.string.isRequired,
};

export default Header;
