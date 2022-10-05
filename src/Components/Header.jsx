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
    await this.pegarUserName()
      .then(() => { this.setState({ loading: false }); });
  };

  pegarUserName = async () => {
    const infoUsuario = await getUser();
    const nomeUser = infoUsuario.name;
    this.setState({ nomeUsuario: nomeUser });
  };

  render() {
    const { loading, nomeUsuario } = this.state;
    this.montarCabecalho();
    const cabecalho = (
      <header data-testid="header-component" className="headerGeral">
        <div className="nomesHeader">
          <h1>TrybeTunes</h1>
          <p data-testid="header-user-name" className="nomeUsuario">{ nomeUsuario }</p>
        </div>
        <div className="linksHeader">
          <Link to="/search" data-testid="link-to-search" className="navLinks">
            <p>Buscar</p>
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites" className="navLinks">
            <p>Musicas Favoritas</p>
          </Link>
          <Link to="/profile" data-testid="link-to-profile" className="semBorda">
            <p>Perfil</p>
          </Link>
        </div>
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
