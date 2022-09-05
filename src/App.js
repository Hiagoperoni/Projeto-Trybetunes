import React from 'react';
import Content from './Content';
// import { getUser } from './services/userAPI';

class App extends React.Component {
  // pegarUserName = async () => {
  //   const { nomeDoUsuario } = this.state;
  //   console.log(nomeDoUsuario);
  //   const infoUsuario = await getUser();
  //   const nomeUsuario = infoUsuario.name;
  //   this.setState({ nomeDoUsuario: nomeUsuario });
  // };

  render() {
    return (
      <div>
        <Content />
      </div>
    );
  }
}

export default App;
