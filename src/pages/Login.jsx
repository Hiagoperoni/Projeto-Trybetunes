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
    const { userName, canEnter } = this.state;
    console.log(canEnter);
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
    const { requisicao } = this.state;
    console.log(requisicao);
    this.salvarEMudarPage();
    return <Redirect to="/search" />;
  };

  salvarEMudarPage = async () => {
    const { userName, requisicao } = this.state;
    console.log(requisicao);
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
      <div data-testid="page-login">
        <p>Login</p>
        <form>
          <input
            id="userName"
            name="userName"
            type="text"
            data-testid="login-name-input"
            onChange={ this.mudarEstado }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ canEnter }
            onClick={ this.mudarRequisicao }
          >
            Entrar
          </button>
        </form>
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
