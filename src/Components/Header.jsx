import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    loading: true,
    nomeUsuario: '',
  };

  componentDidMount() {
    this.montarCabecalho();
  }

  montarCabecalho = async () => {
    const { loading } = this.state;
    console.log(loading);
    await this.pegarUserName()
      .then(() => { this.setState({ loading: false }); });
  };

  pegarUserName = async () => {
    const { nomeUsuario } = this.state;
    console.log(nomeUsuario);
    const infoUsuario = await getUser();
    const nomeUser = infoUsuario.name;
    this.setState({ nomeUsuario: nomeUser });
  };

  render() {
    const { loading, nomeUsuario } = this.state;
    this.montarCabecalho();
    const cabecalho = (
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
        <p data-testid="header-user-name">{ nomeUsuario }</p>
      </header>);
    return (
      <div>
        {
          loading ? <Loading /> : cabecalho
        }
      </div>
    );
  }
}

export default Header;
