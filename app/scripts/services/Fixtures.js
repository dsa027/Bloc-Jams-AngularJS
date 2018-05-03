(function() {
  function Fixtures() {
    const Fixtures = {}

    // Fixtures.songPlayer = SongPlayer

    const titles = "Lorem ipsum dolor amet etsy lumbersexual mlkshk normcore photo booth adaptogen jianbing mumblecore gluten-free vape YOLO pop-up".split(' ')
    const names = ["Margaret Thatcher", "Queen Elizabeth II", "Rosa Parks", "Oprah Winfrey", "Eva Peron", "Winston Churchill", "Barack Obama", "J.K.Rowling", "Haile Selassie", "Marilyn Monroe", "Abraham Lincoln", "John F. Kennedy", "Martin Luther King", "Nelson Mandela", "Bill Gates", "Muhammad Ali ", "Mahatma Gandhi"]
    const songTitles = ["Smooth", "Mack The Knife", "How Do I Live", "Party Rock Anthem", "I Gotta Feeling", "Macarena (Bayside Boys Mix)", "Physical", "You Light Up My Life", "Hey Jude", "We Belong Together", "Uptown Funk!", "Un-Break My Heart", "Yeah!", "Bette Davis Eyes", "Endless Love", "Tonight's The Night (Gonna Be Alright)", "Foolish Games/You Were Meant For Me"]

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

    Fixtures.collection = []

    // put initial cap on a string
    const initCap = function initCap(str) {
      return str[0].toUpperCase() + str.substring(1)
    }

    // return leading 0 double-digits of numbr
    const doubleDigit = function doubleDigit(number) {
      return ((number <= 9) ? ("0" + number) : number)
    }

    // circular queue for song title
    let songTitleIdx = -1
    const getSongTitle = function getSongTitle() {
      songTitleIdx = ++songTitleIdx % songTitles.length
      return songTitles[songTitleIdx]
    }

    // TODO: use actual database?
    // Mimic db search
    Fixtures.search = function search(term) {
      if (!Fixtures.collection || Fixtures.collection.length === 0) {
        Fixtures.getCollection()
      }
      const search = []
      term = term.toLowerCase()
      Fixtures.collection.forEach(album => {
        if (album.title.toLowerCase().includes(term) ||
            album.artist.toLowerCase().includes(term) ||
            album.songs.filter(song => {
              return song.title.toLowerCase().includes(term)
            }
          )
        )
          search.push(album)
      })

      return search
    }

    // make our very own collection out of albumPicasso,
    // titles, names, and songTitles
    Fixtures.getCollection = function(number=12) {
      // reset so albums always have the same songs
      songTitleIdx = -1
      // TODO: we'll do a limited number for now, but should be any number
      if (number > titles.length) number = titles.length
      Fixtures.collection = []
      // populate all albums
      while (--number >= 0) {
        // make a copy of albumPicasso
        let newAlbum = JSON.parse(JSON.stringify(albumPicasso))
        newAlbum.albumArtUrl = //album art
            "/assets/images/album_covers/" + doubleDigit(number + 1) + ".png"
        newAlbum.title = initCap(titles[number]) // title
        newAlbum.artist = names[number] // artist
        // songs
        for (let i = 0; i < newAlbum.songs.length; i++) {
          newAlbum.songs[i].title = getSongTitle()
        }

        Fixtures.collection.push(newAlbum)
      }

      return Fixtures.collection
    }

    return Fixtures
  }

  angular
    .module('blocJams')
    .factory('Fixtures', [Fixtures]);

 })();
