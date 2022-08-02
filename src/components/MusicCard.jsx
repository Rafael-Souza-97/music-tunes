import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    checked: false,
    isLoading: false,
  }

  componentDidMount = async () => {
    await this.onClickCheck();
  }

  onClickCheck = async () => {
    this.setState({ isLoading: true });
    const { trackId } = this.props;
    await addSong(trackId);
    this.setState({ isLoading: false });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ [name]: value });
  }

  render() {
    const { isLoading, checked } = this.state;
    const { songs, trackId } = this.props;

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
                    checked={ checked }
                    onChange={ this.handleChange }
                    onClick={ this.onClickCheck }
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
  songs: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
