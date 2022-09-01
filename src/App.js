import React from 'react';
import Content from './Content';
import { getUser } from './services/userAPI';
import Header from './Components/Header';
import Loading from './Components/Loading';

class App extends React.Component {
  state = {
    nomeDoUsuario: '',
    carregando: false,
  };

  async componentDidMount() {
    const { carregando } = this.state;
    this.setState({ carregando: true });
    await this.pegarUserName();
    this.setState({ carregando: false });
  }

  pegarUserName = async () => {
    const { nomeDoUsuario } = this.state;
    console.log(nomeDoUsuario);
    const infoUsuario = await getUser();
    const nomeUsuario = infoUsuario.name;
    this.setState({ nomeDoUsuario: nomeUsuario });
  };

  render() {
    const { nomeDoUsuario, carregando } = this.state;
    const numMin = 3;
    const cabecalho = (
      <div>
        {nomeDoUsuario.length >= numMin ? (
          <Header nomeCabecalho={ nomeDoUsuario } />
        ) : (
          <Header />
        )}
      </div>);
    return (
      <div>
        <div>
          {
            carregando ? <Loading /> : cabecalho
          }
        </div>
        <Content />
      </div>
    );
  }
}

export default App;
