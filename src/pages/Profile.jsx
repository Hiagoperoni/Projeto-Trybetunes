import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends React.Component {
  state = {
    nome: '',
    email: '',
    image: '',
    description: '',
    carregar: false,
  };

  componentDidMount() {
    this.pegarInfos();
  }

  pegarInfos = async () => {
    this.setState({ carregar: true });
    const infosPerfil = await getUser();
    (this.setState({
      nome: infosPerfil.name,
      email: infosPerfil.email,
      image: infosPerfil.image,
      description: infosPerfil.description,
    }));
    this.setState({ carregar: false });
  };

  render() {
    const { nome, email, image, description, carregar } = this.state;
    const telaPerfil = (
      <div data-testid="page-profile">
        <div>
          <img src={ image } alt="foto-perfil" data-testid="profile-image" />
          <Link to="/profile/edit">
            <button type="button">Editar perfil</button>
          </Link>
        </div>
        <div>
          <h3>Nome</h3>
          <p>{ nome }</p>
        </div>
        <div>
          <h3>Email</h3>
          <h4>{ email }</h4>
        </div>
        <div>
          <h3>Descrição</h3>
          <h4>{ description }</h4>
        </div>
      </div>);
    return (
      <div>
        <Header />
        {
          carregar ? <Loading /> : telaPerfil
        }
      </div>
    );
  }
}
