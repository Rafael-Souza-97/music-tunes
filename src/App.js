import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import PageNotFound from './pages/PageNotFound';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>TrybeTunes</p>

        <Switch>
          <Route exact path="/" render={ () => <Login /> } />
          <Route exact path="/search" render={ () => <Search /> } />
          <Route exact path="/album/:id" render={ () => <Album /> } />
          <Route exact path="/favorites" render={ () => <Favorites /> } />
          <Route exact path="/profile" render={ () => <Profile /> } />
          <Route exact path="/profile/edit" render={ () => <ProfileEdit /> } />
          <Route render={ () => <PageNotFound /> } />
        </Switch>
      </div>
    );
  }
}

export default App;
