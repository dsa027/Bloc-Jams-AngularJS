---
title: BlocJams-Angular
short-description: A Web-based, single page application song player written in AngularJS
---
![Logo](https://bloc-jams-angular-dsa027.herokuapp.com/assets/images/bloc_jams_logo.png)

[GitHub](https://github.com/dsa027/Bloc-Jams-AngularJS)

# Summary

  A music player written with CDN-Hosted AngularJS.

# Explanation

  Streams, via [Buzz audio](http://buzz.jaysalvat.com/), songs located on the site. There are five songs in total, but they are called random names and contained within 12 randomly named albums. Albums are shown in the Collections tab.

  Songs, Albums, and Artists may be searched for at the top-right of any page. Tap on one of the results in the dynamic list to visit the album.

  Add to a playlist, or create a new one, by selecting a song in the Album view. Playlists are viewed in the Playlist tab. This tab allows you to play a playlist, delete a playlist, and delete a song from a playlist.

  The application is generally broken down by
  - [Home](https://bloc-jams-angular-dsa027.herokuapp.com/) - home page with hero, marketing info, and navigation.
  + [Collection](https://bloc-jams-angular-dsa027.herokuapp.com/collection) - this is where albums are all kept.
  + Album - head into the Collection tab and choose from 12 albums.
  + [Playlists](https://bloc-jams-angular-dsa027.herokuapp.com/playlists) - Lets the user make their own collections of songs.
  + Search - located in the upper-right corner of every page, search albums by Song name, Album name or Artist.
  + PlayerBar - song controls: play, pause, seek, next, previous

# Problem

  This application, with less functionality, was originally written in JavaScript and JQuery and then again in React. This project was done with minimal instruction and included writing it in AngularJS while adding playlist and search functionality.

# Solution

  This project shows the practical application of several technologies: AngularJS, JavaScript, Node.js, JQuery, Buzz, HYML, CSS.

### Technical description:

#### AngularJS:
- Controllers:
  - [AlbumCtrl](https://github.com/dsa027/Bloc-Jams-AngularJS/blob/master/app/scripts/controllers/AlbumCtrl.js)
    - Controls an album or playlist of songs
    - Access to SongPlayer, Playlist, Album, Search

  - [CollectionCtrl](https://github.com/dsa027/Bloc-Jams-AngularJS/blob/master/app/scripts/controllers/CollectionCtrl.js)
    - Controls the album collection page
      - Access to Fixtures, SongPlayer, Album, Search

  - [LandingCtrl](https://github.com/dsa027/Bloc-Jams-AngularJS/blob/master/app/scripts/controllers/LandingCtrl.js)
    - Controls the home page
    - Access to Search

  - [PlayerBarCtrl](https://github.com/dsa027/Bloc-Jams-AngularJS/blob/master/app/scripts/controllers/PlayerBarCtrl.js)
    - Controls the embedded playback controller: play, pause, seek, next, previous
    - Access to SongPlayer, Album

  - [PlaylistsCtrl](https://github.com/dsa027/Bloc-Jams-AngularJS/blob/master/app/scripts/controllers/PlaylistsCtrl.js)
    - Controls the Playlists
    - Access to Playlist, Search

  - [SearchCtrl](https://github.com/dsa027/Bloc-Jams-AngularJS/blob/master/app/scripts/controllers/SearchCtrl.js)
    - Controls the embedded search bar
    - Access to Search

- Directives
  - [playlistSelect](https://github.com/dsa027/Bloc-Jams-AngularJS/blob/master/app/scripts/directives/playlistSelect.js)
    - Dialog to create a new playlist and/or select one
    - Empty scope
    - Access to Playlist
  - [searchResults](https://github.com/dsa027/Bloc-Jams-AngularJS/blob/master/app/scripts/directives/searchResults.js)
    - Show search bar and results
    - Empty scope
  - [seekBar](https://github.com/dsa027/Bloc-Jams-AngularJS/blob/master/app/scripts/directives/seekBar.js)
    - Embeds a seek bar. E.g., song seek, volume control
    - Scope: onChange: '&'
      - Callback for changes in seek bar
  - [yesoDialog](https://github.com/dsa027/Bloc-Jams-AngularJS/blob/master/app/scripts/directives/yesNoDialog.js)
    - Shows a dialog for getting a positive/negative response to a given question. E.g., Are you sure you want to ...?
    - Scope:
      - handleNo - Negative choice function callback
      - handleYes - Positive choice function callback
      - leave - leave and cleanup


- Filters
  - [secondsToMMSS](https://github.com/dsa027/Bloc-Jams-AngularJS/blob/master/app/scripts/filters/secondsToMMSS.js)

- Services  
  - [Album](https://github.com/dsa027/Bloc-Jams-AngularJS/blob/master/app/scripts/services/Album.js)
    - Factory
    - Provides getter and setter for the album.

  - [Fixtures](https://github.com/dsa027/Bloc-Jams-AngularJS/blob/master/app/scripts/services/Fixtures.js)
    - Factory
    - Initializes the 12 albums. Random album names with the five static songs but with random names
    - Performs the search for search bar functionality

  - [Playlist](https://github.com/dsa027/Bloc-Jams-AngularJS/blob/master/app/scripts/services/Playlist.js)
    - Factory
    - Access to Fixtures, SongPlayer, and Album  
    - CRUD functionality for playlists and playlist entries
    - Sets up a playlist as a dynamic album when selected

  - [Search](https://github.com/dsa027/Bloc-Jams-AngularJS/blob/master/app/scripts/services/Search.js)
    - Factory
    - Access to Fixtures, SongPlayer, and Album  
    - Gets search results via Fixtures
    - Goes to the Album when search result is selected

  - [SongPlayer](https://github.com/dsa027/Bloc-Jams-AngularJS/blob/master/app/scripts/services/SongPlayer.js)
    - Factory
    - Access to Album
    - Interface to Buzz audio

# Results

  This iteration of BlocJams fulfilled all requirement plus a few more bells and whistles. There are minor bugs to still fix and some enhancements would make the app even better.

# Conclusion
  ToDos
  - Stream from other source
  - Database of songs
