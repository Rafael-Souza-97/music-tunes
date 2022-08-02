import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { songs } = this.props;

    return (
      <audio data-testid="audio-component" src={ songs } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
    );
  }
}

MusicCard.propTypes = {
  songs: PropTypes.string.isRequired,
};

export default MusicCard;
