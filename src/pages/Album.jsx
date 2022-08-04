import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Album extends Component {
  state = {
    artist: '',
    album: '',
    img: '',
    explicit: '',
    musics: [],
    favorites: [],
    isLoading: false,
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const requisition = await getMusics(id);
    const collection = requisition.find((album) => album);
    const songs = requisition.filter((music) => music.kind);
    this.setState({
      artist: collection.artistName,
      album: collection.collectionName,
      img: collection.artworkUrl100,
      explicit: collection.collectionExplicitness,
      musics: songs,
    });
    this.localStorageFavorites();
  }

  localStorageFavorites = async () => {
    this.setState({ isLoading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favorites: favoriteSongs, isLoading: false });
  }

  handleChange = async (tracks, { target }) => {
    const { checked } = target;
    this.setState({ isLoading: true }, async () => {
      if (checked) {
        await addSong(tracks);
      } else {
        await removeSong(tracks);
      }
      this.localStorageFavorites();
    });
  }

  render() {
    const { artist, album, img, explicit, musics, isLoading, favorites } = this.state;

    return (
      <div>
        <Header />
        {
          isLoading ? <Loading /> : (
            <div>
              <div data-testid="page-album">
                <h1 data-testid="artist-name">{ artist }</h1>
                <img src={ img } alt={ album } />
                <h6>{ explicit }</h6>
                <h3 data-testid="album-name">{ album }</h3>
              </div>
              {
                musics.map((tracks) => (
                  <div key={ tracks.trackId }>
                    <h5>{ tracks.trackName }</h5>
                    <img src={ tracks.artworkUrl60 } alt={ tracks.trackId } />
                    <MusicCard
                      songs={ tracks.previewUrl }
                      trackId={ tracks.trackId }
                      handleChange={ this.handleChange }
                      favorites={ favorites
                        .some((item) => item.trackId === tracks.trackId) }
                      tracks={ tracks }
                    />
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
