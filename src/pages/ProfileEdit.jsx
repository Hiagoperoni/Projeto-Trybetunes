import React from 'react';
import Header from '../Components/Header';

export default class ProfileEdit extends React.Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <p>Edit Profile</p>
      </div>
    );
  }
}
