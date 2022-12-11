import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import Logo from './Logo';
import '../styles/Header.css';

class Header extends Component {
  state = {
    userName: '',
    loadingHeader: false,
  }

  componentDidMount = async () => {
    this.setState({ loadingHeader: true });
    const obj = await getUser();
    this.setState({ userName: obj.name, loadingHeader: false });
  }

  render() {
    const { userName, loadingHeader } = this.state;

    if (loadingHeader) return <Loading />;

    return (
      <header data-testid="header-component" className="header">
        <div className="container">
          <Logo />
          <p data-testid="header-user-name"  className="user">{ `Olá, ${userName}!` }</p>
        </div>

        <div className="link">
          <Link to="/search" data-testid="link-to-search" className="home">Home</Link>
          <Link to="/favorites" data-testid="link-to-favorites" className="favoritos">Favoritos</Link>
          <Link to="/profile" data-testid="link-to-profile" className="perfil">Perfil</Link>
        </div>
      </header>
    );
  }
}

export default Header;
