import React, { Component } from 'react';
import Header from '../components/Header';

class Album extends Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-album">Album</div>
      </div>
    );
  }
}

export default Album;
