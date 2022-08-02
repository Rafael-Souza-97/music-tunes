import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

getUser().then((a) => console.log(a));

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
        <p data-testid="header-user-name">{ userName }</p>
      </header>
    );
  }
}

export default Header;
