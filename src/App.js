import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';

import Login from './components/Login.js';
import Profile from './components/Profile.js';
import Settings from './components/Settings.js';
import Home from './components/Home.js';
import Playing from './components/Playing.js';
import Favorites from './components/Favorites.js';
import Albums from './components/Albums.js';
import AlbumPage from './components/AlbumPage.js';
import PlayLists from './components/PlayLists.js';
import AppNav from './components/AppNav.js';
import AppSearch from './components/AppSearch.js';
import PlayQueue from './components/PlayQueue.js';
import PrivateRoute from "./components/PrivateRoute";

import {
  dummyFavorites,
  dummyPlaylists,
  dummyPlaylistById,
  dummyPlaylistTracks
} from './utils/dummyData.js';



export default function App() {
  // Song Playing
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(true);
  function playAudio() {
    document.getElementById('audioPlayer').play();
    document.getElementById('playButton').classList.add('uk-hidden');
    document.getElementById('pauseButton').classList.remove('uk-hidden');
    setPlaying(true);
    setPaused(false);
  }
  // Song Paused
  function pauseAudio() {
    document.getElementById('audioPlayer').pause();
    document.getElementById('pauseButton').classList.add('uk-hidden');
    document.getElementById('playButton').classList.remove('uk-hidden');
    setPlaying(false);
    setPaused(true);
  }

  // Data States
  const [dataFavorites, setDataFavorites] = useState(dummyFavorites);
  const [dataPlaylists, setDataPlaylists] = useState(dummyPlaylists);
  const [dataPlaylistById, setDataPlaylistById] = useState(dummyPlaylistById);
  const [dataPlaylistTracks, setDataPlaylistTracks] = useState(dummyPlaylistTracks);

  return (
    <div className='App'>
      <Switch>
        <Route path='/login' render={props =>
          <Login />
        } />

        <Route path='/' render={props =>

          <div>
            <PrivateRoute path='/albums' component={Albums} />
            <PrivateRoute path='/playlists' component={PlayLists} />
            <PrivateRoute path='/playing' paused={paused} playing={playing} component={Playing} />
            <PrivateRoute path='/favorites' favorites={dataFavorites} component={Favorites} />
            <PrivateRoute path='/profile' testProp={'passed the props'} component={Profile} />
            <PrivateRoute path='/settings' component={Settings} />

            <Route path='/albumID123456789'>
              <AlbumPage />
            </Route>


            <Route path='/home'>
              <Home />
            </Route>

            <PlayQueue />
            <footer className="app-footer">
              <AppNav playAudio={playAudio} pauseAudio={pauseAudio} />
            </footer>
            <AppSearch />

          </div>
        } />
      </Switch>
    </div>
  );
}