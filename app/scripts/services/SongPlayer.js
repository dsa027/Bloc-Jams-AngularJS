(function() {
  function SongPlayer() {
    const SongPlayer = {}

    let currentSong = null
    /**
     * @desc Buzz object audio file
     * @type {Object}
     */
    let currentBuzzObject = null

    SongPlayer.play = function(song) {
      if (currentSong !== song) {
        setSong(song)
        currentBuzzObject.play()
        song.playing = true
      }
      else {
        if (currentBuzzObject.isPaused()) {
          currentBuzzObject.play()
          song.playing = true
        }
      }
    }

    SongPlayer.pause = function(song) {
      currentBuzzObject.pause()
      song.playing = false
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
