import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/Login.css'
import Logo from '../components/Logo';

class Login extends Component {
  state = {
    loginName: undefined,
    isLoginButtonDisabled: true,
    loading: false,
  };

  onInputChange = ({ target }) => {
    const maxNumber = 3;
    if (target.value.length >= maxNumber) {
      this.setState({ isLoginButtonDisabled: false, loginName: target.value });
    } else {
      this.setState({ isLoginButtonDisabled: true });
    }
  }

  handleSubmit = async () => {
    this.setState({ loading: true });
    const { loginName } = this.state;
    await createUser({ name: loginName });
    const { history } = this.props;
    history.push('/search');
  }

  render() {
    const { isLoginButtonDisabled, loading } = this.state;

    if (loading) return <Loading />;

    return (
      <div data-testid="page-login" className="body">
          <form className="form">
          <Logo />
          <label htmlFor="loginValue">
            <input
              type="text"
              name="loginValue"
              data-testid="login-name-input"
              id="loginName"
              placeholder="Digite o seu nome"
              className="input"
              onChange={ this.onInputChange }
            />
          </label>

          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isLoginButtonDisabled }
            className="button"
            onClick={ this.handleSubmit }
          >
            Enviar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
