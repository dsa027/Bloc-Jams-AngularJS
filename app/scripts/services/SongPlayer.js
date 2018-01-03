(function() {
  function SongPlayer() {
    /**
     * @desc Just something to return from this service when invoked
     * @type {Object}
     */
    const SongPlayer = {}

    /**
     * @desc The song that's playing/paused in BuzzObject
     * @type {Object}
     */
    let currentSong = null
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
      if (currentSong !== song) {
        setSong(song)
        playSong(song)
      }
      else {
        if (currentBuzzObject.isPaused()) {
          playSong(song)
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
      currentBuzzObject.pause()
      song.playing = false
    }

    /**
     * @function playSong
     * @desc Plays the current song and sets song.playing to true so that the correct
     * html & css will show the pause ionicon
     * @param {Object} song
     */
    SongPlayer.playSong(song) {
      currentBuzzObject.play()
      song.playing = true
    }

    /**
     * @function setSong
     * @desc Stops currently playing song and loads new audio file as currentBuzzObject
     * @param {Object} song
     */
    SongPlayer.setSong(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop()
        currentSong.playing = null
      }
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      })
      currentSong = song
    }

    return SongPlayer
  }

  angular
     .module('blocJams')
     .factory('SongPlayer', SongPlayer)
 })();
