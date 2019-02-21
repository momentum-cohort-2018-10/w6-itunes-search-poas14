let searchButton = document.getElementById('search-button')
let searchField = document.getElementById('search-field')
let chooseSong = document.querySelectorAll('search-results')

//event listeners for search
searchButton.addEventListener('click', function (event) {
    searchApi()
})

searchField.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      searchApi()
    }
  })

function searchApi (event) {
    $.ajax({
        url: 'https://itunes.apple.com/search',
        jsonp: "callback",
        data: {
            media: 'music',
            term: searchField.value
        },
        dataType: "jsonp",
        success: function (coin) {
            let searchResults = document.getElementById('search-results')
            searchResults.innerHTML= ''
            for (let food of coin.results) {
                //Creating elements of each song
                let songItem = document.createElement('div')
                let songName = document.createElement('div')
                let songPreview = document.createElement('audio')
                let songArt = document.createElement('img')
                let songSource = document.createElement('source')
                let songInfo = document.createElement('div')
                let songArtist = document.createElement('div')
                //CSS template classes
                songArt.classList.add('trumpet')
                songItem.classList.add('song-list','fl','w-50','w-25-m','w-20-l','pa2')
                songItem.classList.add('grow','dib','f3-ns','no-underline','black-90')
                songArt.classList.add('w-100','db','outline','black-10')
                songInfo.classList.add('mt2','f6','lh-copy')
                songName.classList.add('ml0','gray','truncate','w-100')
                songArtist.classList.add('m10','black','truncate','w-100')
                
                //song name, artist, and link.
                songName.innerText = food.trackName
                songArtist.innerText = food.artistName

                //song music url and info
                songSource.src = food.previewUrl
                songSource.type = "audio/mpeg"
                songPreview.controls = true
                songPreview.classList.add('w-100','music')
                songPreview.appendChild(songSource)

                //song artwork
                songArt.src = food.artworkUrl100.replace('100x100','550x550')
                songArt.appendChild(songPreview)

                //putting items into the correct divs
                songItem.appendChild(songArt)
                songItem.appendChild(songInfo)
                songInfo.appendChild(songName)
                songInfo.appendChild(songArtist)
                searchResults.appendChild(songItem)
            }
            let songPicture = $('.trumpet')
            console.log(songPicture)
            $('.trumpet').on('click', play_song)
        }
    })
}


function play_song () {
    let chosenSong = event.target
    console.log(chosenSong)
    let songDisplay = chosenSong.firstChild
    songDisplay.autoplay = true
    console.log(songDisplay)
    let playMusic = document.getElementById('play-music')
    playMusic.innerHTML = ""
    $(songDisplay).clone().appendTo(playMusic)
}

