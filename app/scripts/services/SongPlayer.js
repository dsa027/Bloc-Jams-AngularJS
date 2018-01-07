(function() {
  function SongPlayer($rootScope, Fixtures) {
    /**
     * @desc The object into which we put properties and functions
     * @type {Object}
     */
    const SongPlayer = {}

    /**
     * @desc This holds the current Album
     * @type {Object}
     */
    SongPlayer.currentAlbum = Fixtures.getAlbum()

    /**
     * @desc The song that's playing/paused in BuzzObject
     * @type {Object}
     */
    SongPlayer.currentSong = null

    /**
     * @desc Current playback time (in seconds) of currently playing song
     * @type {Number}
     */
    SongPlayer.currentTime = null;

    /**
     * @desc Volume of song player
     * @type {Number}
     */
    SongPlayer.volume = 80;

    /**
     * @desc Controls whether the sounds is muted or not
     * @type {Boolean}
     */
    this.isMuted = false

    /**
     * @desc Buzz object audio file
     * @type {Object}
     */
    let currentBuzzObject = null

    /**
     * @function init
     * @desc Reinistializes SongPlayer properties
     */
    SongPlayer.init = function init() {
      SongPlayer.currentAlbum = Fixtures.getAlbum()
      SongPlayer.currentSong = null
      SongPlayer.currentTime = null
      SongPlayer.currentBuzzObject = null
      this.isMuted = false
    }

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
      return SongPlayer.currentAlbum.songs.indexOf(song)
    }

    /**
     * @function stopSong
     * @desc Stop the currently playing song and set the song's
     * playing property to null
     */
    const stopSong = function() {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null
    }

    /**
     * @function previous
     * @desc Determine the previous song using this song's index. If we're
     * past the beginning of the songs (index < 0) stop the song and
     * set as not playing. Otherwise, set the song to the index and play it.
     */
    SongPlayer.previous = function() {
      if (!SongPlayer.currentSong) return

      let currentSongIndex = getSongIndex(SongPlayer.currentSong)
      currentSongIndex--

      if (currentSongIndex < 0) {
        stopSong()
      }
      else {
        const song = SongPlayer.currentAlbum.songs[currentSongIndex]
        this.setSong(song)
        this.playSong(song)
      }
    }

    /**
     * @function next
     * @desc Determine the next song using this song's index. If we're
     * past the end of the songs (index > number of songs-1) stop the song and
     * set as not playing. Otherwise, set the song to the index and play it.
     */
    SongPlayer.next = function() {
      if (!SongPlayer.currentSong) return

      let currentSongIndex = getSongIndex(SongPlayer.currentSong)
      currentSongIndex++

      if (currentSongIndex >= SongPlayer.currentAlbum.songs.length) {
        stopSong()
      }
      else {
        const song = SongPlayer.currentAlbum.songs[currentSongIndex]
        this.setSong(song)
        this.playSong(song)
      }
    }

    /**
     * @function setCurrentTime
     * @desc Set current time (in seconds) of currently playing song.
     * Called from seekBar.js via the call `scope.onChange({value: newValue})`
     * where onChange === player_bar on-change attribute:
     * `on-change="playerBar.songPlayer.setCurrentTime(value)"`
     * @param {Number} time
     */
    SongPlayer.setCurrentTime = function(time) {
      if (currentBuzzObject) {
        currentBuzzObject.setTime(time);
      }
    };

    /**
     * @function setVolume
     * @desc Set the buzz player's volume. See setCurrentTime for more info.
     * @param {Number} volume
     */
    SongPlayer.setVolume = function(volume) {
      SongPlayer.volume = volume
      if (currentBuzzObject) {
        currentBuzzObject.setVolume(volume)
      }
    }

    /**
      @function muteSound
      @desc Mutes/unmutes the song player's sound depending on this.isMuted
     */
    SongPlayer.muteSound = function() {
      if (!currentBuzzObject) return

      this.isMuted = !this.isMuted

      if (this.isMuted) currentBuzzObject.mute()
      else currentBuzzObject.unmute()

      this.muteStyle = this.isMuted ? {'color' : 'red'} : {'color' : 'white'}
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
        currentBuzzObject.unbind('timeupdate')
        currentBuzzObject.unbind('ended')
        if (!SongPlayer.currentSong) {
          SongPlayer.currentSong = {}
        }
        SongPlayer.currentSong.playing = null
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      })

      // current time event handler
      currentBuzzObject.bind('timeupdate', function() {
        $rootScope.$apply(function() {
          SongPlayer.currentTime = currentBuzzObject.getTime()
        })
      })

      // end of play event handler for continuous play with circular queue
      currentBuzzObject.bind('ended', function() {
        let idx = getSongIndex(SongPlayer.currentSong)
        idx++
        if (idx >= SongPlayer.currentAlbum.songs.length) {
          idx = 0
        }
        const song = SongPlayer.currentAlbum.songs[idx]
        SongPlayer.setSong(song)
        SongPlayer.playSong(song)
      })

      SongPlayer.currentSong = song
    }

    return SongPlayer
  }

  angular
     .module('blocJams')
     .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer])
 })();
