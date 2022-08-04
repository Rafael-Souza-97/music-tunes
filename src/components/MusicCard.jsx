import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    isLoading: false,
  }

  render() {
    const { isLoading } = this.state;
    const { songs, trackId, favorites, tracks, handleChange } = this.props;

    return (
      <div>
        {
          isLoading ? <Loading /> : (
            <section>
              <div className="audioPlayer">
                <audio data-testid="audio-component" src={ songs } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>
              </div>

              <div className="favorites">
                <label htmlFor="check">
                  Favorita
                  <input
                    type="checkbox"
                    name="checked"
                    id="check"
                    data-testid={ `checkbox-music-${trackId}` }
                    checked={ favorites }
                    onChange={ (event) => handleChange(tracks, event) }
                  />
                </label>
              </div>
            </section>
          )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  handleChange: PropTypes.func.isRequired,
  favorites: PropTypes.bool.isRequired,
  trackId: PropTypes.number.isRequired,
  tracks: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  songs: PropTypes.string.isRequired,
};

export default MusicCard;
