import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PageAlbum from './pages/PageAlbum';
import PageEditProfile from './pages/PageEditProfile';
import PageError from './pages/PageError';
import PageFavorites from './pages/PageFavorites';
import PageLogin from './pages/PageLogin';
import PageProfile from './pages/PageProfile';
import PageSearch from './pages/PageSearch';

export default class Content extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/search" component={ PageSearch } />
          <Route exact path="/album/:id" component={ PageAlbum } />
          <Route exact path="/favorites" component={ PageFavorites } />
          <Route exact path="/profile" component={ PageProfile } />
          <Route exact path="/profile/edit" component={ PageEditProfile } />
          <Route exact path="/" component={ PageLogin } />
          <Route exact path="/*" component={ PageError } />
        </Switch>
      </main>
    );
  }
}
