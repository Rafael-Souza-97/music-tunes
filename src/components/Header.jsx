import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  state = {
    userName: '',
    loadingHeader: false,
  }

  async componentDidMount() {
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
        <p>{ userName }</p>
      </header>
    );
  }
}

export default Header;
