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

  salvarEMudarPage = async () => {
    const { userName, requisicao } = this.state;
    this.setState({ loading: true });
    await createUser({ name: userName });
    console.log(requisicao);
    this.setState({ requisicao: true });
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
            // onClick={
            //   () => { createUser({ name: userName }); this.setState({ loading: true }); }
            // }
            onClick={ this.salvarEMudarPage }
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
