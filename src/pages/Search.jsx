import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    isSearchButtonDisabled: true,
  };

  onInputSearchChange = ({ target }) => {
    const maxNumber = 2;
    if (target.value.length >= maxNumber) {
      this.setState({ isSearchButtonDisabled: false });
    } else {
      this.setState({ isSearchButtonDisabled: true });
    }
  }

  render() {
    const { isSearchButtonDisabled } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          <input
            type="text"
            name="inputArtistBand"
            data-testid="search-artist-input"
            onChange={ this.onInputSearchChange }
          />

          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isSearchButtonDisabled }
            // onClick={ this.handleSubmit }
          >
            Enviar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
