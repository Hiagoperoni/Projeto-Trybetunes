import React from 'react';
import { getUser } from '../services/userAPI';

export class Header extends React.Component {
  render() {
    return (
      <header data-testid="header-component">
        <p>TrybeTunes</p>
        <p data-testid="header-user-name">{ getUser }</p>
      </header>
    );
  }
}

export default Header;
