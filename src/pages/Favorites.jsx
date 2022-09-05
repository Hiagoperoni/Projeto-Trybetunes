import React from 'react';
import Header from '../Components/Header';

export default class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>Favourites</p>
      </div>
    );
  }
}
