import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

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
      <header data-testid="header-component">
        <div>Header</div>
        <p data-testid="header-user-name">{ `Olá, ${userName}` }</p>
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>

      </header>
    );
  }
}

export default Header;
