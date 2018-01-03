(function() {
  function SongPlayer(Fixtures) {
    /**
     * @desc Just something to return from this service when invoked
     * @type {Object}
     */
    const SongPlayer = {}

    /**
     * @desc This holds the current Album
     * @type {Object}
     */
    let currentAlbum = Fixtures.getAlbum()

    /**
     * @desc The song that's playing/paused in BuzzObject
     * @type {Object}
     */
    SongPlayer.currentSong = null

    /**
     * @desc Buzz object audio file
     * @type {Object}
     */
    let currentBuzzObject = null

    /**
     * @function pauseSong
     * @desc If the song is different than what's currently playing, set the
     * new song via setSong(song) and the play the song via playSong(song).
     * If the song is the same and is paused, play the song via playSong(song).
     * @param {Object} song
     */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong
      if (SongPlayer.currentSong !== song) {
        this.setSong(song)
        this.playSong(song)
      }
      else if (SongPlayer.currentSong === song && SongPlayer.currentSong) {
        if (currentBuzzObject.isPaused()) {
          this.playSong(song)
        }
      }
    }

    /**
     * @function pauseSong
     * @desc Pauses the current song and sets song.playing to false so that the correct
     * html & css will show the play ionicon
     * @param {Object} song
     */
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong
      currentBuzzObject.pause()
      song.playing = false
    }

    /**
     * @function playSong
     * @desc Plays the current song and sets song.playing to true so that the correct
     * html & css will show the pause ionicon
     * @param {Object} song
     */
    SongPlayer.playSong = function(song) {
      currentBuzzObject.play()
      song.playing = true
    }

    /**
     * @function getSongIndex
     * @desc Gets the index of the song object passed in within the
     * Fixture album
     * @param {Object} song
     */
    const getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song)
    }

    /**
     * @function prev
     * @desc Determine the previous song using this song's index. If we're
     * past the beginning of the songs (index < 0) stop the song and
     * set as not playing. Otherwise, set the song to the index and play it.
     */
    SongPlayer.previous = function() {
      if (!SongPlayer.currentSong) return

      let currentSongIndex = getSongIndex(SongPlayer.currentSong)
      currentSongIndex--

      if (currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null
      }
      else {
        const song = currentAlbum.songs[currentSongIndex]
        this.setSong(song)
        this.playSong(song)
      }
    }

    /**
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
     * @return the empty SongPlayer object
     */
    SongPlayer.setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop()
        SongPlayer.currentSong.playing = null
      }
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      })
      SongPlayer.currentSong = song
    }

    return SongPlayer
  }

  angular
     .module('blocJams')
     .factory('SongPlayer', ['Fixtures', SongPlayer])
 })();
