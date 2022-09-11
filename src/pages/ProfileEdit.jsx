import React from 'react';
import Header from '../Components/Header';

export default class ProfileEdit extends React.Component {
  mudarEstado = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.verificarUser();
    });
  };

  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <form>
          <label htmlFor="nome">
            Nome de Usuário:
            <input
              type="email"
              name="nome"
              id="nome"
              data-testid="edit-input-name"
              onChange={ this.mudarEstado }
            />
          </label>
          <label htmlFor="email">
            Email de Usuário:
            <input
              type="text"
              name="email"
              id="email"
              data-testid="edit-input-email"
              onChange={ this.mudarEstado }
            />
          </label>
          <label htmlFor="description">
            Descrição de Usuário:
            <input
              type="text"
              name="description"
              id="description"
              data-testid="edit-input-description"
              onChange={ this.mudarEstado }
            />
          </label>
          <label htmlFor="imagem">
            Imagem de Usuário:
            <input
              type="text"
              name="imagem"
              id="imagem"
              data-testid="edit-input-image"
              onChange={ this.mudarEstado }
            />
          </label>
          <button type="button">Salvar</button>
        </form>
      </div>
    );
  }
}
