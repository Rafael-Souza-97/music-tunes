import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    artist: '',
    album: '',
    img: '',
    explicit: '',
    musics: [],
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
  }

  render() {
    const { artist, album, img, explicit, musics } = this.state;

    return (
      <div>
        <Header />
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
              <MusicCard songs={ tracks.previewUrl } />
            </div>
          ))
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
