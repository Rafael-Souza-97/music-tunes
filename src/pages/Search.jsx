import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  state = {
    isSearchButtonDisabled: true,
    inputSearch: '',
    loadingSearch: false,
    artistArray: [],
  };

  onInputSearchChange = ({ target }) => {
    const maxNumber = 2;
    if (target.value.length >= maxNumber) {
      this.setState({ isSearchButtonDisabled: false, inputSearch: target.value });
    } else {
      this.setState({ isSearchButtonDisabled: true });
    }
  }

  handleSearch = async () => {
    const { inputSearch } = this.state;
    this.setState({ loadingSearch: true });
    const requisition = await searchAlbumsAPI(inputSearch);
    this.setState({ artistArray: requisition, loadingSearch: false });
  }

  render() {
    const {
      isSearchButtonDisabled,
      loadingSearch,
      artistArray,
      inputSearch,
    } = this.state;

    return (
      <div>
        <Header />
        <div data-testid="page-search">
          {
            loadingSearch ? <Loading />
              : (
                <>
                  <form>
                    <label htmlFor="inputArtistBand">
                      <input
                        type="text"
                        placeholder="Pesquisar artista/banda"
                        name="inputArtistBand"
                        data-testid="search-artist-input"
                        onChange={ this.onInputSearchChange }
                      />
                    </label>

                    <button
                      type="button"
                      data-testid="search-artist-button"
                      disabled={ isSearchButtonDisabled }
                      onClick={ this.handleSearch }
                    >
                      Enviar
                    </button>
                  </form>
                  {
                    artistArray.length > 0 ? (
                      <div>
                        <h3>
                          {`Resultado de álbuns de: ${inputSearch}`}
                        </h3>
                        {
                          artistArray.map((item, index) => (
                            <div key={ index } className="albuns">
                              <p>{ item.artistName }</p>
                              <p>{ item.collectionName }</p>
                              <img
                                src={ item.artworkUrl100 }
                                alt={ item.collectionName }
                              />
                              <p>{ item.releaseDate }</p>
                              <Link
                                type="button"
                                to={ `/album/${item.collectionId}` }
                                data-testid={ `link-to-album-${item.collectionId}` }
                              >
                                Ver Músicas
                              </Link>
                            </div>
                          ))
                        }
                      </div>)
                      : (
                        <p>
                          Nenhum álbum foi encontrado
                        </p>
                      )
                  }
                </>
              )
          }
        </div>
      </div>
    );
  }
}

export default Search;
