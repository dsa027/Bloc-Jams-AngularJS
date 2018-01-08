(function() {
  function Playlist(Fixtures, SongPlayer) {
    let Playlist = {}

    Playlist.fixtures = Fixtures
    Playlist.songPlayer = SongPlayer

    Playlist.showPlaylist = false
    Playlist.index = -1
    Playlist.song = ""
    Playlist.album = ""
    Playlist.selectedPlaylist = ""
    Playlist.newPlaylist = ""
    Playlist.playlisted = false

    Playlist.objectKeys = Object.keys

    Playlist.list = {
      'Playlist #1': [
        'Jianbing:Smooth',
        'Jianbing:Mack The Knife',
        'Booth:Uptown Funk!',
        'Lumbersexual:Bette Davis Eyes',
        'Lumbersexual:Endless Love',
        'Etsy:I Gotta Feeling'

      ],
      'Playlist #2': [
        'Mlkshk:Yeah!',
        'Mlkshk:Un-Break My Heart',
        'Etsy:Party Rock Anthem'
      ],
      'Playlist #3': [],
    }

    // initialize for next playlist to play
    const initList = function initList() {
      Playlist.index = -1
      Playlist.song = ""
      Playlist.album = ""
      Playlist.selectedPlaylist = ""
    }

    // this is how the playlist is shown. Need to make a fake
    // album with songs from the playlist retrieved from their
    // respective albums
    Playlist.playThisPlaylist = function playThisPlaylist(key) {
      const newAlbum = {
        title: key,
        artist: 'Song Streamer',
        label: 'N/A',
        year: '2018',
        albumArtUrl: '/assets/images/album_covers/userpic.jpg',
        songs: getSongs(key) // get songs from albums in playlist
      }
      // set this playlist "album" as the setAlbum album so it will
      // show on the album page.
      Playlist.fixtures.setAlbum(newAlbum)
      // set the SongPlayer album to this made up album
      Playlist.songPlayer.currentAlbum = newAlbum
    }

    // get playlist songs from the albums they appear in. return the list of songs
    const getSongs = function getSongs(key) {
      // we need the collection to get the songs which will be empty
      // unless we've visited the collection (e.g., need this if coming
      // straight from playlist page)
      if (Playlist.fixtures.collection.length === 0) {
        Playlist.fixtures.getCollection()
      }
      const songs = []
      // for each song in the playlist
      Playlist.list[key].forEach(entry => {
        let albumSong = undefined, foundAlbum = undefined, foundSong = undefined

        // break apart the key into album/song
        albumSong = Playlist.unPlaylistKey(entry)

        // see if this is the album we're looking for
        foundAlbum = Playlist.fixtures.collection.find(album => {
          return album.title === albumSong[0]
        })

        // if found album, see if song is in the album
        if (foundAlbum) {
          foundSong = foundAlbum.songs.find(song => {
            return song.title === albumSong[1]
          })
        }

        // album/song found, add to array
        if (foundSong) {
          songs.push(foundSong)
        }
      })

      // return array of songs in playlist
      return songs
    }

    // TODO: extremely inefficient considering it gets called dozens of times
    // as the mouse moves over each song.
    // Checks to see if a song is playlisted (appears in any playlist)
    Playlist.isPlaylisted = function isPlaylisted(album, index) {
      Playlist.playlisted = false
      let keys = Object.keys(Playlist.list)
      // each playlist
      keys.forEach(key => {
        // get index of song in this playlist
        let i = Playlist.list[key].indexOf(
          playlistKey(album.title, album.songs[index].title)
        )
        // found, set property for ng-show in view
        if (i != -1) {
          Playlist.playlisted = true
          return true
        }
      })

      return false
    }

    // called when use clicks on a song in the album page to add it to a playlist
    Playlist.handlePlaylistClick = function handlePlaylistClick(index, song, album) {
      initList()
      Playlist.showPlaylist = !Playlist.showPlaylist
      if (Playlist.showPlaylist) {
        setSelectedPlaylist()
        Playlist.index = index
        Playlist.song = song
        Playlist.album = album
      }
    }

    // if we don't have this, then Playlist.selectedPlaylist will
    // show at the top of the <select>
    const setSelectedPlaylist = function setSelectedPlaylist() {
      let keys = Object.keys(Playlist.list)
      Playlist.selectedPlaylist = keys ? keys[0] : ""
    }

    // TODO: get rid of this and use the song object instead
    const playlistKey = function playlistKey(albumTitle, songTitle) {
      return albumTitle + ":" + songTitle
    }

    // TODO: get rid of this and use the song object instead
    Playlist.unPlaylistKey = function unPlaylistKey(key) {
      return key.split(':')
    }

    // select a playlist for a song
    Playlist.selectPlaylist = function selectPlaylist() {
      if (Playlist.selectedPlaylist) {
        Playlist.showPlaylist = false // will close the dialog
        Playlist.list[Playlist.selectedPlaylist].push(  // add song to playlist
          playlistKey(Playlist.album.title, Playlist.song.title)
        )
      }
    }

    // add a new playlist
    Playlist.addPlaylist = function addPlaylist() {
      let keys = Object.keys(Playlist.list)
      if (keys.includes(Playlist.newPlaylist)) {
        Playlist.newPlaylist = "Can't add duplicate"
        return
      }
      Playlist.list[Playlist.newPlaylist] = [] // empty playlist
      Playlist.newPlaylist = "" // will clear the view also

    }

    // delete an entire playlist
    Playlist.deletePlaylist = function deletePlaylist() {
      // TODO
      delete Playlist.list[Playlist.selectedPlaylist]
      setSelectedPlaylist()
    }

    // delete a song from playlist(s)
    Playlist.deleteFromPlaylist = function deleteFromPlaylist(playlist=null, albumSong=null) {
      // if we're coming from playlist, we need to init several
      // properties that are already set if coming from album
      if (playlist != null && albumSong != null) {
        const albumSongSplit = Playlist.unPlaylistKey(albumSong)
        Playlist.album = {}
        Playlist.song = {}
        Playlist.selectedPlaylist = playlist
        Playlist.album.title = albumSongSplit[0]
        Playlist.song.title = albumSongSplit[1]
      }

      // run thru all playlists and delete this song
      let keys = Object.keys(Playlist.list)
      keys.forEach(key => {
        let i = Playlist.list[key].indexOf(
          playlistKey(Playlist.album.title, Playlist.song.title)
        )
        if (i != -1) {
          Playlist.list[Playlist.selectedPlaylist].splice(i, 1)
          Playlist.showPlaylist = false
        }
      })
    }

    // for the 'X' in the upper right corner of the playlist select dialog
    Playlist.exit = function exit() {
      Playlist.showPlaylist = false
    }

    return Playlist
  }

angular
   .module('blocJams')
   .factory('Playlist', ['Fixtures', 'SongPlayer', Playlist])
})();
