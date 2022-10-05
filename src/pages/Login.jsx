import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';

export default class Login extends React.Component {
  state = {
    userName: '',
    canEnter: true,
    loading: false,
    requisicao: false,
  };

  verificarUser = () => {
    const { userName } = this.state;
    const minTamanho = 3;
    const bateuTamanhoMin = userName.length >= minTamanho;
    this.setState({ canEnter: !bateuTamanhoMin });
  };

  mudarEstado = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.verificarUser();
    });
  };

  mudarRequisicao = () => {
    this.salvarEMudarPage();
    return <Redirect to="/search" />;
  };

  salvarEMudarPage = async () => {
    const { userName } = this.state;

    this.setState({ loading: true });
    await createUser({ name: userName })
      .then(() => { this.setState({ requisicao: true }); });
    this.setState({ loading: false });
  };

  render() {
    const { canEnter, loading, requisicao } = this.state;
    if (requisicao === true) {
      return <Redirect to="/search" />;
    }
    const conteudoLogin = (
      <div data-testid="page-login" className="loginPage">
        <header>
          <h1>TrybeTunes</h1>
        </header>
        <div className="paginaLogin">
          <div className="blocoNomeLogin">
            <p className="nomeLogin">Login</p>
          </div>
          <form className="formLogin">
            <input
              id="userName"
              name="userName"
              type="text"
              className="nomeUsuario"
              data-testid="login-name-input"
              placeholder="Nome de Usuário"
              onChange={ this.mudarEstado }
            />
            <button
              type="button"
              id="buttonLogin"
              className="loginButton"
              data-testid="login-submit-button"
              disabled={ canEnter }
              onClick={ this.mudarRequisicao }
            >
              Entrar
            </button>
          </form>
        </div>
      </div>);
    return (
      <div>
        {
          loading ? <Loading /> : conteudoLogin
        }
      </div>
    );
  }
}
