import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import '../styles/Search.css';

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
    this.setState({ loadingSearch: true, isSearch: true });
    const requisition = await searchAlbumsAPI(inputSearch);
    this.setState({ artistArray: requisition, loadingSearch: false, isSearch: false });
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
        <div data-testid="page-search" className="body-search">
          {
            loadingSearch ? <Loading />
              : (
                <>
                  <form className="form-search"> 
                    <label htmlFor="inputArtistBand">
                      <input
                        type="text"
                        placeholder="Pesquisar artista/banda"
                        name="inputArtistBand"
                        data-testid="search-artist-input"
                        onChange={ this.onInputSearchChange }
                        className="input-search"
                      />
                    </label>

                    <button
                      className="button-search"
                      type="buttoninput-search"
                      data-testid="search-artist-button"
                      disabled={ isSearchButtonDisabled }
                      onClick={ this.handleSearch }
                    >
                      Pesquisar
                    </button>
                  </form>
                  {
                    artistArray.length > 0 ? (
                      <div className="results">
                        <h3>
                          {`${inputSearch} álbuns`}
                        </h3>
                        <div className="album-container">
                        {
                            artistArray.map((item, index) => (
                              <div key={ index } className="albuns">
                                <p className="artist">{ item.artistName }</p>
                                <p className="album-name">{ item.collectionName }</p>
                                <Link
                                  className="see-more"
                                  type="button"
                                  to={ `/album/${item.collectionId}` }
                                  data-testid={ `link-to-album-${item.collectionId}` }
                                >
                                    <img
                                      src={ item.artworkUrl100 }
                                      alt={ item.collectionName }
                                      className="album-img"
                                    />
                                  Ver Músicas
                                </Link>
                              </div>
                          ))
                        }
                        </div>
                      </div>)
                      :
                        <p>
                        </p>
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
