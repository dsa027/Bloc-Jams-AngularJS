(function() {
  function Fixtures(Collection) {
    const Fixtures = {}

    const albumPicasso = {
      title: 'The Colors',
      artist: 'Pablo Picasso',
      label: 'Cubism',
      year: '1881',
      albumArtUrl: '/assets/images/album_covers/01.png',
      songs: [
        { title: 'Blue', duration: '161.71', audioUrl: '/assets/music/blue' },
        { title: 'Green', duration: '103.96', audioUrl: '/assets/music/green' },
        { title: 'Red', duration: '268.45', audioUrl: '/assets/music/red' },
        { title: 'Pink', duration: '153.14', audioUrl: '/assets/music/pink' },
        { title: 'Magenta', duration: '374.22', audioUrl: '/assets/music/magenta' }
      ]
    }

    const albumMarconi = {
      title: 'The Telephone',
      artist: 'Guglielmo Marconi',
      label: 'EM',
      year: '1909',
      albumArtUrl: '/assets/images/album_covers/20.png',
      songs: [
        { title: 'Hello, Operator?', duration: '161.71', audioUrl: '/assets/music/blue' },
        { title: 'Ring, ring, ring', duration: '103.96', audioUrl: '/assets/music/green' },
        { title: 'Fits in your pocket', duration: '268.45', audioUrl: '/assets/music/red' },
        { title: 'Can you hear me now?', duration: '153.14', audioUrl: '/assets/music/pink' },
        { title: 'Wrong phone number', duration: '374.22', audioUrl: '/assets/music/magenta' }
      ]
    }

    Fixtures.collection = []

    Fixtures.getAlbum = function() {
      if (!Collection.album) {
        Collection.album = albumPicasso
      }
      return Collection.album
    }

    Fixtures.getCollection = function(number=12) {
      Fixtures.collection = []
      while (--number >= 0) {
        let newAlbum = Object.assign({}, (number % 2 === 0) ? albumPicasso : albumMarconi)
        newAlbum.title += " - " + number
        Fixtures.collection.push(newAlbum)
      }

      return Fixtures.collection
    }

    return Fixtures
  }

  angular
    .module('blocJams')
    .factory('Fixtures', ['Collection', Fixtures]);

 })();
